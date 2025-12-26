import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Truck } from 'lucide-react';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { useToast } from '@/hooks/use-toast';

export default function DeliveryLoginScreen() {
  const navigate = useNavigate();
  const { login } = useRoleAuth();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (!phone || phone.length < 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number',
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
      phone: phone,
      otp: otp,
      role: 'delivery'
    });

    setLoading(false);

    if (success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      navigate('/delivery/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid phone number or OTP',
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
          <h1 className="text-xl font-bold ml-4">Delivery Person Login</h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-warning p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Delivery Person Login</CardTitle>
            <CardDescription>
              डिलीवरी व्यक्ति लॉगिन
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number | फ़ोन नंबर</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                disabled={otpSent}
              />
            </div>

            {!otpSent ? (
              <Button
                className="w-full"
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
                  className="w-full"
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
                  Change Phone Number
                </Button>
              </>
            )}

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">Phone: 9876543210</p>
              <p className="text-xs text-muted-foreground">OTP: 123456</p>
              <p className="text-xs text-muted-foreground mt-2">Or</p>
              <p className="text-xs text-muted-foreground">Phone: 9876543211</p>
              <p className="text-xs text-muted-foreground">OTP: 123456</p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Don't have an account?
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/delivery/register')}
              >
                Create New Account | नया खाता बनाएं
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
