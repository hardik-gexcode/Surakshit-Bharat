import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { ArrowLeft, Shield, AlertTriangle, Eye, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { findWorkerById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function PolicePersonDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAuthenticated } = useRoleAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'police') {
      navigate('/police/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user || !id) return null;

  const worker = findWorkerById(id);

  if (!worker) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Worker not found</p>
            <Button onClick={() => navigate('/police/dashboard')} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBlacklist = () => {
    toast({
      title: 'Worker Blacklisted',
      description: `${worker.name} has been added to blacklist`,
      variant: 'destructive'
    });
  };

  const handleUnderWatch = () => {
    toast({
      title: 'Added to Watch List',
      description: `${worker.name} is now under surveillance`,
    });
  };

  const handleClear = () => {
    toast({
      title: 'Status Cleared',
      description: `${worker.name} has been cleared`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/police/search')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="ml-4">
              <h1 className="text-xl font-bold">Person Details</h1>
              <p className="text-sm text-muted-foreground">व्यक्ति विवरण</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Profile Card */}
        <Card className={`mb-6 ${worker.status === 'blacklisted' ? 'border-danger border-2' : ''}`}>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={worker.photo}
                  alt={worker.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                {worker.status === 'blacklisted' && (
                  <div className="absolute -top-2 -right-2 bg-danger rounded-full p-2">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{worker.name}</h2>
                <p className="text-muted-foreground">{worker.nameHindi}</p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Badge variant="outline">{worker.id}</Badge>
                  <Badge variant="outline">{worker.company}</Badge>
                  <Badge className={
                    worker.riskLevel === 'high' ? 'bg-danger' :
                    worker.riskLevel === 'medium' ? 'bg-warning' : 'bg-verified'
                  }>
                    {worker.riskLevel.toUpperCase()} RISK
                  </Badge>
                  {worker.status === 'blacklisted' && (
                    <Badge className="bg-danger">BLACKLISTED</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Verification Status | सत्यापन स्थिति</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className={`w-5 h-5 mr-2 ${worker.policeVerified ? 'text-verified' : 'text-muted-foreground'}`} />
                <span>Police Verification</span>
              </div>
              <Badge className={worker.policeVerified ? 'bg-verified' : 'bg-muted'}>
                {worker.policeVerified ? 'Verified' : 'Pending'}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className={`w-5 h-5 mr-2 ${worker.aadhaarLinked ? 'text-verified' : 'text-muted-foreground'}`} />
                <span>Aadhaar Linked</span>
              </div>
              <Badge className={worker.aadhaarLinked ? 'bg-verified' : 'bg-muted'}>
                {worker.aadhaarLinked ? 'Linked' : 'Not Linked'}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary" />
                <span>Background Check</span>
              </div>
              <Badge className="bg-verified">Completed</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Contact Information | संपर्क जानकारी</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{worker.phone}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{worker.address}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Emergency Contact</p>
              <p className="font-medium">{worker.emergencyContact}</p>
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Activity Summary | गतिविधि सारांश</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold">{worker.totalVisits}</p>
                <p className="text-sm text-muted-foreground">Total Visits</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold">{worker.rating}</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold">{worker.employmentDuration}</p>
                <p className="text-sm text-muted-foreground">Employment</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Criminal History */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-danger">Criminal History | आपराधिक इतिहास</CardTitle>
          </CardHeader>
          <CardContent>
            {worker.status === 'blacklisted' ? (
              <div className="p-4 bg-danger/10 rounded-lg">
                <p className="font-semibold text-danger">⚠️ Criminal Record Found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This person has been flagged for suspicious activities and is currently blacklisted.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-verified/10 rounded-lg">
                <p className="font-semibold text-verified">✓ No Criminal Record</p>
                <p className="text-sm text-muted-foreground mt-2">
                  No criminal history found in the database.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Police Actions | पुलिस कार्रवाई</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {worker.status !== 'blacklisted' && (
              <Button
                className="w-full bg-danger hover:bg-danger/90"
                onClick={handleBlacklist}
              >
                <Shield className="w-4 h-4 mr-2" />
                Add to Blacklist
              </Button>
            )}
            <Button
              className="w-full bg-warning hover:bg-warning/90"
              onClick={handleUnderWatch}
            >
              <Eye className="w-4 h-4 mr-2" />
              Add to Watch List
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleClear}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Clear Status
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
