import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { Search, AlertTriangle, Shield, Eye, LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { policeStats } from '@/data/mockAuth';
import NotificationBell from '@/components/NotificationBell';

export default function PoliceDashboardScreen() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useRoleAuth();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'police') {
      navigate('/police/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/police/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickFilters = [
    { label: 'Blacklisted', count: policeStats.blacklisted, color: 'bg-danger', path: '/police/search?filter=blacklisted' },
    { label: 'High Risk', count: policeStats.highRisk, color: 'bg-warning', path: '/police/search?filter=high-risk' },
    { label: 'Under Watch', count: policeStats.underWatch, color: 'bg-primary', path: '/police/search?filter=under-watch' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold flex items-center">
                <Shield className="w-5 h-5 mr-2 text-danger" />
                Law Enforcement Panel
              </h1>
              <p className="text-sm text-muted-foreground">कानून प्रवर्तन पैनल</p>
            </div>
            <div className="flex items-center gap-2">
              <NotificationBell />
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
      </div>

      {/* Officer Info */}
      <div className="p-6">
        <Card className="mb-6 border-danger">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">Police ID: {user.policeId}</p>
                <Badge className="bg-danger mt-2">Authorized Officer</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Global Search | वैश्विक खोज</CardTitle>
            <CardDescription>Search by name, phone, or worker ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter name, phone, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} className="bg-danger hover:bg-danger/90">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Risk Dashboard */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Risk Dashboard | जोखिम डैशबोर्ड</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-danger/10 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-danger mx-auto mb-2" />
                <p className="text-3xl font-bold text-danger">{policeStats.highRisk}</p>
                <p className="text-sm text-muted-foreground">High Risk</p>
              </div>
              <div className="text-center p-4 bg-danger/20 rounded-lg">
                <Shield className="w-8 h-8 text-danger mx-auto mb-2" />
                <p className="text-3xl font-bold text-danger">{policeStats.blacklisted}</p>
                <p className="text-sm text-muted-foreground">Blacklisted</p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <Eye className="w-8 h-8 text-warning mx-auto mb-2" />
                <p className="text-3xl font-bold text-warning">{policeStats.underWatch}</p>
                <p className="text-sm text-muted-foreground">Under Watch</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold">{policeStats.totalVerifications}</p>
                <p className="text-sm text-muted-foreground">Total Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Filters | त्वरित फ़िल्टर</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickFilters.map((filter) => (
                <Card
                  key={filter.label}
                  className="cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => navigate(filter.path)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg">{filter.label}</p>
                        <p className="text-sm text-muted-foreground">{filter.count} persons</p>
                      </div>
                      <div className={`${filter.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold">{filter.count}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity | हाल की गतिविधि</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold text-sm">New incident report</p>
                  <p className="text-xs text-muted-foreground">Worker ID: SW001 - 2 hours ago</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold text-sm">Background check completed</p>
                  <p className="text-xs text-muted-foreground">Worker ID: ZM002 - 5 hours ago</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-danger/10 rounded-lg">
                <div>
                  <p className="font-semibold text-sm text-danger">High risk alert</p>
                  <p className="text-xs text-muted-foreground">Worker ID: AE003 - 1 day ago</p>
                </div>
                <Button size="sm" variant="destructive">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
