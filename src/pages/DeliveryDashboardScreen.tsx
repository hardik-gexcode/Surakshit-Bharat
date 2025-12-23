import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { QrCode, User, History, FileText, LogOut, CheckCircle, Clock } from 'lucide-react';
import { useEffect } from 'react';

export default function DeliveryDashboardScreen() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useRoleAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'delivery') {
      navigate('/delivery/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const profileCompletion = user.status === 'verified' ? 100 : 80;

  const menuItems = [
    {
      id: 'profile',
      title: 'My Profile',
      titleHindi: 'मेरी प्रोफ़ाइल',
      description: `${profileCompletion}% Complete`,
      icon: User,
      color: 'bg-primary',
      path: '/delivery/profile'
    },
    {
      id: 'qr',
      title: 'MY QR CODE',
      titleHindi: 'मेरा QR कोड',
      description: 'Show to residents',
      icon: QrCode,
      color: 'bg-verified',
      path: '/delivery/qr',
      highlight: true
    },
    {
      id: 'history',
      title: 'Visit History',
      titleHindi: 'विज़िट इतिहास',
      description: '247 visits today',
      icon: History,
      color: 'bg-warning',
      path: '/delivery/history'
    },
    {
      id: 'documents',
      title: 'Documents',
      titleHindi: 'दस्तावेज़',
      description: user.status === 'verified' ? 'All verified' : 'Upload pending',
      icon: FileText,
      color: 'bg-muted',
      path: '/delivery/documents'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Delivery Dashboard</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                logout();
                navigate('/role-selection');
              }}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                {user.status === 'verified' && (
                  <div className="absolute -bottom-1 -right-1 bg-verified rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.company} Delivery</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={user.status === 'verified' ? 'default' : 'secondary'} className="bg-verified">
                    {user.status === 'verified' ? '✓ VERIFIED' : '⚠ PENDING'}
                  </Badge>
                  <Badge variant="outline">ID: {user.workerId}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                  item.highlight ? 'border-2 border-verified' : ''
                }`}
                onClick={() => navigate(item.path)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`${item.color} p-3 rounded-full`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {item.highlight && (
                      <Badge className="bg-verified">IMPORTANT</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-4">{item.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {item.titleHindi}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Today's Summary | आज का सारांश</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold text-verified">247</p>
                <p className="text-sm text-muted-foreground">Deliveries</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold text-warning">8.5</p>
                <p className="text-sm text-muted-foreground">Hours Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
