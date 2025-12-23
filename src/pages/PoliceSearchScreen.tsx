import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRoleAuth } from '@/contexts/RoleAuthContext';
import { ArrowLeft, Search, AlertTriangle, Shield } from 'lucide-react';
import { workers } from '@/data/mockData';

export default function PoliceSearchScreen() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useRoleAuth();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const filter = searchParams.get('filter');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'police') {
      navigate('/police/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  // Filter workers based on search query or filter
  let filteredWorkers = workers;
  
  if (filter === 'blacklisted') {
    filteredWorkers = workers.filter(w => w.status === 'blacklisted');
  } else if (filter === 'high-risk') {
    filteredWorkers = workers.filter(w => w.riskLevel === 'high');
  } else if (filter === 'under-watch') {
    filteredWorkers = workers.filter(w => w.riskLevel === 'medium');
  } else if (searchQuery) {
    filteredWorkers = workers.filter(w =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.phone.includes(searchQuery)
    );
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/police/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge className="bg-danger">HIGH RISK</Badge>;
      case 'medium':
        return <Badge className="bg-warning">MEDIUM RISK</Badge>;
      default:
        return <Badge className="bg-verified">LOW RISK</Badge>;
    }
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
              onClick={() => navigate('/police/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="ml-4">
              <h1 className="text-xl font-bold">Search Results</h1>
              <p className="text-sm text-muted-foreground">खोज परिणाम</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name, phone, or ID..."
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

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Found {filteredWorkers.length} result{filteredWorkers.length !== 1 ? 's' : ''}
            {filter && ` for "${filter.replace('-', ' ')}"`}
            {searchQuery && !filter && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredWorkers.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No results found</p>
              </CardContent>
            </Card>
          ) : (
            filteredWorkers.map((worker) => (
              <Card
                key={worker.id}
                className={`hover:shadow-md transition-shadow ${
                  worker.status === 'blacklisted' ? 'border-danger border-2' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={worker.photo}
                        alt={worker.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      {worker.status === 'blacklisted' && (
                        <div className="absolute -top-1 -right-1 bg-danger rounded-full p-1">
                          <AlertTriangle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{worker.name}</h3>
                          <p className="text-sm text-muted-foreground">{worker.nameHindi}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge variant="outline">{worker.id}</Badge>
                            <Badge variant="outline">{worker.company}</Badge>
                            {getRiskBadge(worker.riskLevel)}
                            {worker.status === 'blacklisted' && (
                              <Badge className="bg-danger">
                                <Shield className="w-3 h-3 mr-1" />
                                BLACKLISTED
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Phone:</p>
                          <p className="font-medium">{worker.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Visits:</p>
                          <p className="font-medium">{worker.totalVisits}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Police Verified:</p>
                          <p className="font-medium">{worker.policeVerified ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Aadhaar:</p>
                          <p className="font-medium">{worker.aadhaarLinked ? 'Linked' : 'Not Linked'}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/police/person/${worker.id}`)}
                          className="bg-danger hover:bg-danger/90"
                        >
                          View Full Details
                        </Button>
                        {worker.status !== 'blacklisted' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/verify/${worker.id}`)}
                          >
                            Public Profile
                          </Button>
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
