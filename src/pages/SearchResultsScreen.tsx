import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { searchWorkersByName } from '@/data/mockData';
import type { Worker } from '@/types';

export default function SearchResultsScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');
  const [results, setResults] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const name = searchParams.get('name');
    if (name) {
      setSearchTerm(name);
      performSearch(name);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const performSearch = (name: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundWorkers = searchWorkersByName(name);
      setResults(foundWorkers);
      setLoading(false);
    }, 500);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
        <div className="flex-1">
          <h1 className="text-xl font-bold">Search Workers</h1>
          <p className="text-sm opacity-90">कार्यकर्ता खोजें</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Enter worker name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={!searchTerm.trim()}>
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Results Found</h3>
            <p className="text-muted-foreground mb-6">
              No workers found matching "{searchParams.get('name')}"
            </p>
            <Button variant="outline" onClick={() => navigate('/home')}>
              Back to Home
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Found {results.length} {results.length === 1 ? 'worker' : 'workers'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing results for "{searchParams.get('name')}"
              </p>
            </div>

            {results.map((worker, index) => (
              <Card 
                key={worker.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/verify/${worker.idNumber}`)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={worker.photo}
                      alt={worker.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground truncate">
                            {worker.name}
                          </h3>
                          {worker.nameHindi && (
                            <p className="text-sm text-muted-foreground truncate">
                              {worker.nameHindi}
                            </p>
                          )}
                        </div>
                        {worker.verificationStatus === 'verified' && (
                          <CheckCircle2 className="w-5 h-5 text-verified flex-shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm font-semibold">{worker.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({worker.visitCount} visits)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {worker.company}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {worker.idNumber}
                        </Badge>
                        {worker.policeVerified && (
                          <Badge 
                            variant="default"
                            className="text-xs bg-verified text-verified-foreground"
                          >
                            Police Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
