import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Star, Phone, MapPin, Clock, Eye, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { findWorkerById } from '@/data/mockData';
import type { Worker } from '@/types';
import ReportIssueDialog from '@/components/ReportIssueDialog';
import SOSButton from '@/components/SOSButton';

export default function VerificationResultScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const foundWorker = findWorkerById(id);
        setWorker(foundWorker || null);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying worker...</p>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <XCircle className="w-20 h-20 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Worker Not Found</h2>
        <p className="text-muted-foreground text-center mb-6">
          No worker found with ID: {id}
        </p>
        <Button onClick={() => navigate('/home')}>
          Back to Home
        </Button>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (worker.verificationStatus) {
      case 'verified':
        return 'bg-verified text-verified-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'blacklisted':
        return 'bg-danger text-danger-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (worker.verificationStatus) {
      case 'verified':
        return <CheckCircle2 className="w-6 h-6" />;
      case 'pending':
        return <AlertTriangle className="w-6 h-6" />;
      case 'blacklisted':
        return <XCircle className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (worker.verificationStatus) {
      case 'verified':
        return 'SAFE TO ALLOW';
      case 'pending':
        return 'VERIFICATION PENDING';
      case 'blacklisted':
        return 'DO NOT ALLOW';
      default:
        return 'UNKNOWN STATUS';
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
        <div>
          <h1 className="text-xl font-bold">Verification Result</h1>
          <p className="text-sm opacity-90">सत्यापन परिणाम</p>
        </div>
      </div>

      {/* Worker Photo with Status Overlay */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={worker.photo}
          alt={worker.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${worker.verificationStatus === 'verified' ? 'bg-verified/20' : worker.verificationStatus === 'pending' ? 'bg-warning/20' : 'bg-danger/20'}`} />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div className={`${getStatusColor()} px-4 py-2 rounded-full flex items-center gap-2 shadow-lg ${worker.verificationStatus === 'verified' ? 'animate-pulse-green' : ''}`}>
            {getStatusIcon()}
            <span className="font-bold text-sm">{worker.verificationStatus.toUpperCase()}</span>
          </div>
        </div>

        {/* Worker Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent p-6">
          <h2 className="text-3xl font-bold text-foreground mb-1">{worker.name}</h2>
          {worker.nameHindi && (
            <p className="text-xl text-muted-foreground mb-2">{worker.nameHindi}</p>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="font-semibold text-foreground">{worker.rating}</span>
            </div>
            <Badge variant="secondary">{worker.company}</Badge>
            <Badge variant="outline">ID: {worker.idNumber}</Badge>
          </div>
        </div>
      </div>

      {/* Main Status Card */}
      <div className="p-6 space-y-4">
        <Card className={`${getStatusColor()} border-0 shadow-lg`}>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              {getStatusIcon()}
              <h3 className="text-2xl font-bold">{getStatusText()}</h3>
            </div>
            <p className="text-sm opacity-90">
              Last verified: {worker.lastVerified}
            </p>
          </CardContent>
        </Card>

        {/* Verification Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg text-foreground mb-3">Verification Status</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                {worker.policeVerified ? (
                  <CheckCircle2 className="w-5 h-5 text-verified" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <span className="text-sm">Police Verified</span>
              </div>
              
              <div className="flex items-center gap-2">
                {worker.aadhaarLinked ? (
                  <CheckCircle2 className="w-5 h-5 text-verified" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <span className="text-sm">Aadhaar Linked</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant={worker.riskLevel === 'low' ? 'default' : worker.riskLevel === 'medium' ? 'secondary' : 'destructive'}
                  className="text-xs"
                >
                  {worker.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{worker.employmentDuration}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold text-lg text-foreground mb-3">Contact Information</h3>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">{worker.phone}</span>
            </div>
            
            {worker.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-sm">{worker.address}</span>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">{worker.visitCount} total visits</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant={worker.verificationStatus === 'verified' ? 'default' : 'secondary'}
            className="w-full"
            size="lg"
            disabled={worker.verificationStatus === 'blacklisted'}
          >
            Allow Entry
          </Button>
          
          <ReportIssueDialog workerId={worker.idNumber} workerName={worker.name} />
        </div>

        {/* Face Verification Button */}
        <Button
          variant="default"
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => navigate(`/face-verify/${worker.idNumber}`)}
        >
          <Scan className="w-4 h-4 mr-2" />
          Verify Face | चेहरा सत्यापित करें
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/profile/${worker.idNumber}`)}
        >
          View Full Profile
        </Button>

        {/* SOS Button */}
        <SOSButton
          workerId={worker.idNumber}
          workerName={worker.name}
          location="Current Location"
          variant="button"
          className="w-full"
        />
      </div>
    </div>
  );
}
