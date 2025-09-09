import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { AlertTriangle, Clock, Phone, MapPin, Droplets, CheckCircle, TrendingUp } from 'lucide-react';
import { adminAPI } from '../../lib/api';
import LoadingSpinner from '../common/LoadingSpinner';

const EmergencyCenter = ({ emergencies, onRefetch }) => {
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleCloseEmergency = async (emergencyId) => {
    setLoading(true);
    try {
      await adminAPI.closeEmergency(emergencyId);
      setShowConfirmDialog(false);
      setSelectedEmergency(null);
      onRefetch();
    } catch (error) {
      console.error('Error closing emergency:', error);
      alert('Failed to close emergency. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEscalateEmergency = async (emergencyId) => {
    setLoading(true);
    try {
      await adminAPI.escalateEmergency(emergencyId);
      setShowConfirmDialog(false);
      setSelectedEmergency(null);
      onRefetch();
    } catch (error) {
      console.error('Error escalating emergency:', error);
      alert('Failed to escalate emergency. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const openConfirmDialog = (emergency, action) => {
    setSelectedEmergency(emergency);
    setActionType(action);
    setShowConfirmDialog(true);
  };

  return (
    <div className="space-y-8">
      {/* Emergency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Critical</p>
              <p className="text-2xl font-bold text-red-700">
                {emergencies.filter(e => e.urgency === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">High</p>
              <p className="text-2xl font-bold text-orange-700">
                {emergencies.filter(e => e.urgency === 'high').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active</p>
              <p className="text-2xl font-bold text-green-700">
                {emergencies.filter(e => e.status === 'active').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Response Time</p>
              <p className="text-2xl font-bold text-blue-700">12m</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Active Emergencies */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Active Emergencies</h2>
          <Badge className="bg-red-100 text-red-800">{emergencies.length}</Badge>
        </div>

        {emergencies.length === 0 ? (
          <Card className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">No active emergencies</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {emergencies.map((emergency) => (
              <Card
                key={emergency.id}
                className={`p-6 hover:shadow-lg transition-all duration-300 ${
                  emergency.urgency === 'critical' ? 'border-red-300 bg-red-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getUrgencyIcon(emergency.urgency)}
                      <Badge className={`${getUrgencyColor(emergency.urgency)} border`}>
                        {emergency.urgency.toUpperCase()}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-800">
                        {emergency.status}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {emergency.patient_name}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Droplets className="w-4 h-4 text-red-500" />
                          <span className="text-gray-600">Blood Group:</span>
                          <span className="font-medium">{emergency.blood_group}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{emergency.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-600">Time Elapsed:</span>
                          <span className="font-medium">{emergency.time_elapsed}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">Contact:</span>
                          <span className="font-medium">{emergency.contact}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>Required:</strong> {emergency.required_units} units
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Description:</strong> {emergency.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => openConfirmDialog(emergency, 'escalate')}
                      className="bg-orange-600 hover:bg-orange-700 text-white whitespace-nowrap"
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Escalate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openConfirmDialog(emergency, 'close')}
                      className="border-green-600 text-green-600 hover:bg-green-50 whitespace-nowrap"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Close
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === 'escalate' ? (
                <>
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  Escalate Emergency
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Close Emergency
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            {selectedEmergency && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    actionType === 'escalate' ? 'bg-orange-100' : 'bg-green-100'
                  }`}>
                    {actionType === 'escalate' ? (
                      <TrendingUp className="w-8 h-8 text-orange-600" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedEmergency.patient_name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedEmergency.blood_group} • {selectedEmergency.location}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg text-center ${
                  actionType === 'escalate' ? 'bg-orange-50' : 'bg-green-50'
                }`}>
                  <p className={`text-sm mb-4 ${
                    actionType === 'escalate' ? 'text-orange-700' : 'text-green-700'
                  }`}>
                    {actionType === 'escalate'
                      ? 'This will escalate the emergency to critical level and notify all available donors immediately.'
                      : 'Are you sure you want to close this emergency? This action cannot be undone.'
                    }
                  </p>
                  
                  <div className="flex justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmDialog(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => 
                        actionType === 'escalate'
                          ? handleEscalateEmergency(selectedEmergency.id)
                          : handleCloseEmergency(selectedEmergency.id)
                      }
                      disabled={loading}
                      className={
                        actionType === 'escalate'
                          ? 'bg-orange-600 hover:bg-orange-700'
                          : 'bg-green-600 hover:bg-green-700'
                      }
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        actionType === 'escalate' ? 'Escalate' : 'Close Emergency'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencyCenter;