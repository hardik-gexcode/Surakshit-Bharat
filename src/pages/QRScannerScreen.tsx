import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function QRScannerScreen() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate QR code scanning - in a real app, you'd decode the QR code
      setScanning(true);
      setTimeout(() => {
        // Simulate successful scan - redirect to first worker
        navigate('/verify/SW001');
      }, 1500);
    }
  };

  const handleManualEntry = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Scan QR Code</h1>
          <p className="text-sm opacity-90">QR कोड स्कैन करें</p>
        </div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Scanner Frame */}
          <div className="relative aspect-square bg-card rounded-2xl overflow-hidden border-4 border-primary mb-6 animate-fade-in">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://miaoda-site-img.s3cdn.medo.dev/images/f59c834b-c334-4205-8273-c09a31ddbb42.jpg"
                alt="QR Scanner"
                className="w-full h-full object-cover opacity-50"
              />
              {scanning && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Scanner corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-verified" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-verified" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-verified" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-verified" />

            {/* Scanning line animation */}
            {!scanning && (
              <div className="absolute inset-x-0 top-1/2 h-1 bg-verified/50 animate-pulse" />
            )}
          </div>

          {/* Instructions */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <QrCode className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">How to scan:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Position QR code within the frame</li>
                    <li>Hold steady for automatic scan</li>
                    <li>Or upload QR code image below</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Button */}
          <div className="space-y-3">
            <label htmlFor="qr-upload">
              <input
                id="qr-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={scanning}
              />
              <Button
                variant="outline"
                className="w-full"
                disabled={scanning}
                asChild
              >
                <span className="flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-5 h-5" />
                  Upload QR Code Image
                </span>
              </Button>
            </label>

            <Button
              variant="secondary"
              className="w-full"
              onClick={handleManualEntry}
              disabled={scanning}
            >
              Enter ID Manually
            </Button>
          </div>

          {/* Demo IDs */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Worker IDs:</p>
            <div className="flex flex-wrap gap-2">
              {['SW001', 'ZM002', 'AE003'].map((id) => (
                <Button
                  key={id}
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/verify/${id}`)}
                  className="text-xs"
                >
                  {id}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
