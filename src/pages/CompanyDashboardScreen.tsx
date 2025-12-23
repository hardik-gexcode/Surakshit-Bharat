import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { Users, TrendingUp, AlertCircle, LogOut, FileUp } from 'lucide-react';
import { useEffect } from 'react';
import { companyStats } from '@/data/mockAuth';

export default function CompanyDashboardScreen() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useRoleAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'company') {
      navigate('/company/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const stats = user.company?.toLowerCase() === 'swiggy' ? companyStats.swiggy : companyStats.zomato;
  const verificationPercentage = Math.round((stats.verified / stats.totalStaff) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{user.company} Admin Panel</h1>
              <p className="text-sm text-muted-foreground">कंपनी प्रशासक पैनल</p>
            </div>
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

      {/* Stats Overview */}
      <div className="p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overview | सारांश</CardTitle>
            <CardDescription>Company statistics and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-3xl font-bold text-primary">{stats.totalStaff}</p>
                <p className="text-sm text-muted-foreground">Total Staff</p>
              </div>
              <div className="text-center p-4 bg-verified/10 rounded-lg">
                <p className="text-3xl font-bold text-verified">{verificationPercentage}%</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <p className="text-3xl font-bold text-warning">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold">{stats.todayVerifications}</p>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-primary"
            onClick={() => navigate('/company/staff')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="bg-primary p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl mt-4">Staff Management</CardTitle>
              <CardDescription>कर्मचारी प्रबंधन</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View, approve, and manage all staff members
              </p>
              <Button className="w-full mt-4">
                Manage Staff
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/company/bulk-upload')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="bg-verified p-3 rounded-full">
                  <FileUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl mt-4">Bulk Upload</CardTitle>
              <CardDescription>बल्क अपलोड</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upload multiple staff members at once
              </p>
              <Button variant="outline" className="w-full mt-4">
                Upload CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Verification Trends</CardTitle>
                <TrendingUp className="w-5 h-5 text-verified" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Week</span>
                  <span className="font-bold text-verified">+12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Month</span>
                  <span className="font-bold text-verified">+28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Year</span>
                  <span className="font-bold text-verified">+156%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Incident Reports</CardTitle>
                <AlertCircle className="w-5 h-5 text-danger" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-danger/10 rounded">
                  <span className="text-sm">New Reports</span>
                  <span className="font-bold text-danger">{stats.incidentReports}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">Under Review</span>
                  <span className="font-bold">5</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">Resolved</span>
                  <span className="font-bold text-verified">23</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
