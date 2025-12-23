import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Building2 } from 'lucide-react';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { useToast } from '@/hooks/use-toast';

export default function CompanyLoginScreen() {
  const navigate = useNavigate();
  const { login } = useRoleAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing Fields',
        description: 'Please enter both email and password',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    
    const success = await login({
      email: email,
      password: password,
      role: 'company'
    });

    setLoading(false);

    if (success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome to Company Dashboard',
      });
      navigate('/company/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password',
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
          <h1 className="text-xl font-bold ml-4">Company Admin Login</h1>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Company Admin Login</CardTitle>
            <CardDescription>
              कंपनी प्रशासक लॉगिन
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Company Email | कंपनी ईमेल</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password | पासवर्ड</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login | लॉगिन'}
            </Button>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-2">Demo Credentials:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium">Swiggy Admin:</p>
                  <p className="text-xs text-muted-foreground">Email: admin@swiggy.com</p>
                  <p className="text-xs text-muted-foreground">Password: admin123</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-medium">Zomato Admin:</p>
                  <p className="text-xs text-muted-foreground">Email: admin@zomato.com</p>
                  <p className="text-xs text-muted-foreground">Password: admin123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
