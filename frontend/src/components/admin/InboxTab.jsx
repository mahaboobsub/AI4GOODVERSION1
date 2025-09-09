import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { MessageSquare, Clock, User, Stethoscope, Users, CheckCircle, Flag } from 'lucide-react';
import { adminAPI } from '../../lib/api';
import LoadingSpinner from '../common/LoadingSpinner';

const InboxTab = ({ messages, onRefetch }) => {
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const handleResolveMessage = async (messageId) => {
    setLoading(true);
    try {
      await adminAPI.resolveMessage(messageId);
      setShowMessageDialog(false);
      setSelectedMessage(null);
      onRefetch();
    } catch (error) {
      console.error('Error resolving message:', error);
      alert('Failed to resolve message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSenderIcon = (senderType) => {
    switch (senderType) {
      case 'patient':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'doctor':
        return <Stethoscope className="w-4 h-4 text-blue-600" />;
      case 'donor':
        return <User className="w-4 h-4 text-purple-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'medical':
        return 'bg-red-50 text-red-700';
      case 'appointment':
        return 'bg-blue-50 text-blue-700';
      case 'emergency':
        return 'bg-orange-50 text-orange-700';
      case 'general':
        return 'bg-gray-50 text-gray-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const flaggedMessages = messages.filter(m => m.status === 'flagged');
  const resolvedMessages = messages.filter(m => m.status === 'resolved');

  return (
    <div className="space-y-8">
      {/* Inbox Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Flagged</p>
              <p className="text-2xl font-bold text-red-700">{flaggedMessages.length}</p>
            </div>
            <Flag className="w-8 h-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Critical</p>
              <p className="text-2xl font-bold text-orange-700">
                {messages.filter(m => m.priority === 'critical').length}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Resolved</p>
              <p className="text-2xl font-bold text-green-700">{resolvedMessages.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Response Time</p>
              <p className="text-2xl font-bold text-blue-700">2.5h</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Flagged Messages */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Flag className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Flagged Messages</h2>
          <Badge className="bg-red-100 text-red-800">{flaggedMessages.length}</Badge>
        </div>

        {flaggedMessages.length === 0 ? (
          <Card className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">No flagged messages</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {flaggedMessages.map((message) => (
              <Card
                key={message.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedMessage(message);
                  setShowMessageDialog(true);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getSenderIcon(message.sender_type)}
                      <Badge className={getPriorityColor(message.priority)}>
                        {message.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getCategoryColor(message.category)}>
                        {message.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {message.timestamp}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {message.subject}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-600">From:</span>
                      <span className="font-medium text-gray-900">{message.sender_name}</span>
                      <span className="text-sm text-gray-500">({message.sender_type})</span>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-2">
                      {message.message}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResolveMessage(message.id);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
                      disabled={loading}
                    >
                      {loading ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Message Details
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            {selectedMessage && (
              <div className="space-y-6">
                {/* Message Header */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    {getSenderIcon(selectedMessage.sender_type)}
                    <Badge className={getPriorityColor(selectedMessage.priority)}>
                      {selectedMessage.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getCategoryColor(selectedMessage.category)}>
                      {selectedMessage.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedMessage.subject}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span><strong>From:</strong> {selectedMessage.sender_name}</span>
                      <span><strong>Type:</strong> {selectedMessage.sender_type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedMessage.timestamp}
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setShowMessageDialog(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleResolveMessage(selectedMessage.id)}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Resolving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Resolved
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InboxTab;