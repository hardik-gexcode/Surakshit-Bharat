import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { ArrowLeft, Search, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { workers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function CompanyStaffListScreen() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useRoleAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'company') {
      navigate('/company/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  // Filter workers by company
  const companyStaff = workers.filter(w => w.company === user.company);
  const filteredStaff = companyStaff.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (workerId: string, workerName: string) => {
    toast({
      title: 'Staff Approved',
      description: `${workerName} has been approved`,
    });
  };

  const handleReject = (workerId: string, workerName: string) => {
    toast({
      title: 'Staff Rejected',
      description: `${workerName} has been rejected`,
      variant: 'destructive'
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
              onClick={() => navigate('/company/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="ml-4">
              <h1 className="text-xl font-bold">Staff Management</h1>
              <p className="text-sm text-muted-foreground">कर्मचारी प्रबंधन</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-verified">{companyStaff.filter(w => w.status === 'verified').length}</p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold text-warning">{companyStaff.filter(w => w.status === 'pending').length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-2xl font-bold">{companyStaff.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Staff List */}
        <div className="space-y-4">
          {filteredStaff.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No staff members found</p>
              </CardContent>
            </Card>
          ) : (
            filteredStaff.map((worker) => (
              <Card key={worker.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={worker.photo}
                      alt={worker.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{worker.name}</h3>
                          <p className="text-sm text-muted-foreground">{worker.nameHindi}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{worker.id}</Badge>
                            <Badge
                              variant={
                                worker.status === 'verified'
                                  ? 'default'
                                  : worker.status === 'pending'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                              className={
                                worker.status === 'verified'
                                  ? 'bg-verified'
                                  : worker.status === 'pending'
                                  ? 'bg-warning'
                                  : 'bg-danger'
                              }
                            >
                              {worker.status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {worker.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                              {worker.status === 'blacklisted' && <XCircle className="w-3 h-3 mr-1" />}
                              {worker.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm">
                            <span className="text-warning mr-1">★</span>
                            <span className="font-bold">{worker.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{worker.totalVisits} visits</p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/profile/${worker.id}`)}
                        >
                          View Profile
                        </Button>
                        {worker.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-verified hover:bg-verified/90"
                              onClick={() => handleApprove(worker.id, worker.name)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(worker.id, worker.name)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
