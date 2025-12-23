import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield } from 'lucide-react';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { useToast } from '@/hooks/use-toast';

export default function PoliceLoginScreen() {
  const navigate = useNavigate();
  const { login } = useRoleAuth();
  const { toast } = useToast();
  const [policeId, setPoliceId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (!policeId) {
      toast({
        title: 'Invalid Police ID',
        description: 'Please enter a valid Police ID',
        variant: 'destructive'
      });
      return;
    }
    
    setOtpSent(true);
    toast({
      title: 'OTP Sent',
      description: 'Enter 123456 to login (demo)',
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    
    const success = await login({
      policeId: policeId,
      otp: otp,
      role: 'police'
    });

    setLoading(false);

    if (success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome to Police Dashboard',
      });
      navigate('/police/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid Police ID or OTP',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/role-selection')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold ml-4">Police Admin Login</h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md border-danger">
          <CardHeader className="text-center">
            <div className="mx-auto bg-danger p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Police Admin Login</CardTitle>
            <CardDescription>
              पुलिस प्रशासक लॉगिन
            </CardDescription>
            <div className="mt-2 px-4 py-2 bg-danger/10 rounded-lg">
              <p className="text-xs text-danger font-semibold">
                🔒 Authorized Personnel Only
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="policeId">Police ID | पुलिस आईडी</Label>
              <Input
                id="policeId"
                type="text"
                placeholder="Enter Police ID (e.g., MH01-12345)"
                value={policeId}
                onChange={(e) => setPoliceId(e.target.value)}
                disabled={otpSent}
              />
            </div>

            {!otpSent ? (
              <Button
                className="w-full bg-danger hover:bg-danger/90"
                onClick={handleSendOTP}
              >
                Send OTP | OTP भेजें
              </Button>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP | OTP दर्ज करें</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>

                <Button
                  className="w-full bg-danger hover:bg-danger/90"
                  onClick={handleLogin}
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? 'Verifying...' : 'Login | लॉगिन'}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp('');
                  }}
                >
                  Change Police ID
                </Button>
              </>
            )}

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">Police ID: MH01-12345</p>
              <p className="text-xs text-muted-foreground">OTP: 123456</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
