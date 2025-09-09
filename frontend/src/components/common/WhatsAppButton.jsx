import React, { useState } from 'react';
import { MessageCircle, X, CheckCircle, Users, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const WhatsAppButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-500" />
              WhatsApp Integration
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                WhatsApp Bot is Live in Production!
              </h3>
              <p className="text-gray-600">
                Our intelligent WhatsApp bot for appointment scheduling,
                emergency alerts, and donor coordination is currently active
                in production environments.
              </p>
              <div className="bg-green-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span><strong>Instant notifications</strong> for appointments</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Users className="w-4 h-4" />
                  <span><strong>Donor coordination</strong> & matching</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Activity className="w-4 h-4" />
                  <span><strong>Emergency blood requests</strong> & alerts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <MessageCircle className="w-4 h-4" />
                  <span><strong>Seamless communication</strong> between all parties</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <strong>Demo Note:</strong> WhatsApp integration is fully functional in production.
                This demo showcases the UI integration points and feature overview.
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;