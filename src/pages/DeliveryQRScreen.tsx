import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useToast } from '@/hooks/use-toast';

export default function DeliveryQRScreen() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useRoleAuth();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'delivery') {
      navigate('/delivery/login');
      return;
    }

    if (canvasRef.current && user) {
      QRCode.toCanvas(
        canvasRef.current,
        user.workerId || user.id,
        {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [user, isAuthenticated, navigate]);

  const handleShare = () => {
    toast({
      title: 'Share QR Code',
      description: 'QR code sharing functionality',
    });
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${user?.workerId}-qr-code.png`;
      link.href = url;
      link.click();
      toast({
        title: 'QR Code Downloaded',
        description: 'Your QR code has been saved',
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/delivery/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold ml-4">My QR Code</h1>
        </div>
      </div>

      {/* QR Code Display */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Show This to Residents</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              निवासियों को यह दिखाएं
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {/* QR Code */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <canvas ref={canvasRef} className="mx-auto" />
            </div>

            {/* Worker Info */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.company}</p>
                </div>
              </div>
              <Badge className="bg-verified">ID: {user.workerId}</Badge>
              <Badge variant="outline" className="ml-2">✓ Verified</Badge>
            </div>

            {/* Instructions */}
            <div className="w-full p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Instructions | निर्देश:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Show this QR code to residents for instant verification</li>
                <li>• निवासियों को तुरंत सत्यापन के लिए यह QR कोड दिखाएं</li>
                <li>• Keep your phone screen brightness high</li>
                <li>• अपने फोन की स्क्रीन की चमक अधिक रखें</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleShare}
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={handleDownload}
                className="w-full bg-verified hover:bg-verified/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate(`/verify/${user.workerId}`)}
          >
            View My Public Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
