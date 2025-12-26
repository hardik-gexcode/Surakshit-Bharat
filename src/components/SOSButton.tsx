import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, Shield } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useToast } from '@/hooks/use-toast';

interface SOSButtonProps {
  workerId?: string;
  workerName?: string;
  location?: string;
  variant?: 'button' | 'icon';
  className?: string;
}

export default function SOSButton({ workerId, workerName, location, variant = 'button', className = '' }: SOSButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [sending, setSending] = useState(false);
  const { addNotification } = useNotifications();
  const { toast } = useToast();

  const handleSOSClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmSOS = () => {
    setSending(true);

    // Send SOS notification
    addNotification({
      type: 'sos',
      title: '🚨 EMERGENCY SOS ALERT',
      message: workerId 
        ? `Emergency reported for worker ${workerName} (${workerId}) at ${location || 'Unknown location'}`
        : `Emergency SOS alert triggered at ${location || 'Unknown location'}`,
      workerId,
      workerName,
      location,
      severity: 'critical',
      targetRoles: ['police', 'company']
    });

    setTimeout(() => {
      setSending(false);
      setShowConfirm(false);
      toast({
        title: 'SOS Alert Sent',
        description: 'Emergency services and authorities have been notified',
      });
    }, 1000);
  };

  return (
    <>
      {variant === 'button' ? (
        <Button
          variant="destructive"
          className={`bg-danger hover:bg-danger/90 ${className}`}
          onClick={handleSOSClick}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          SOS Emergency
        </Button>
      ) : (
        <Button
          variant="destructive"
          size="icon"
          className={`bg-danger hover:bg-danger/90 ${className}`}
          onClick={handleSOSClick}
        >
          <AlertTriangle className="w-5 h-5" />
        </Button>
      )}

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-danger">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Confirm Emergency SOS
            </DialogTitle>
            <DialogDescription>
              आपातकालीन SOS की पुष्टि करें
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-danger/10 rounded-lg">
              <p className="font-semibold text-danger mb-2">⚠️ Emergency Alert</p>
              <p className="text-sm text-muted-foreground">
                This will immediately notify:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Local police authorities</li>
                <li>• Company security team</li>
                <li>• Emergency services</li>
              </ul>
            </div>

            {workerId && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold">Worker Information:</p>
                <p className="text-sm text-muted-foreground">Name: {workerName}</p>
                <p className="text-sm text-muted-foreground">ID: {workerId}</p>
                {location && <p className="text-sm text-muted-foreground">Location: {location}</p>}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirm(false)}
                disabled={sending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-danger hover:bg-danger/90"
                onClick={handleConfirmSOS}
                disabled={sending}
              >
                <Shield className="w-4 h-4 mr-2" />
                {sending ? 'Sending...' : 'Send SOS Alert'}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Only use in genuine emergencies. False alarms may result in penalties.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
