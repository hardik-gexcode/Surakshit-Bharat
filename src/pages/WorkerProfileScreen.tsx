import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Star, Phone, MapPin, Clock, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { findWorkerById } from '@/data/mockData';
import type { Worker } from '@/types';
import QRCode from 'qrcode';

export default function WorkerProfileScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const foundWorker = findWorkerById(id);
        setWorker(foundWorker || null);
        
        // Generate QR code
        if (foundWorker) {
          const qrData = JSON.stringify({
            id: foundWorker.idNumber,
            name: foundWorker.name,
            company: foundWorker.company
          });
          
          QRCode.toDataURL(qrData, {
            width: 300,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          }).then(url => {
            setQrCodeUrl(url);
          });
        }
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <XCircle className="w-20 h-20 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Worker Not Found</h2>
        <Button onClick={() => navigate('/home')}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Worker Profile</h1>
          <p className="text-sm opacity-90">कार्यकर्ता प्रोफ़ाइल</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <img 
                src={worker.photo}
                alt={worker.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-border"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{worker.name}</h2>
                {worker.nameHindi && (
                  <p className="text-lg text-muted-foreground mb-2">{worker.nameHindi}</p>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="font-semibold">{worker.rating}</span>
                  <span className="text-sm text-muted-foreground">({worker.visitCount} visits)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{worker.company}</Badge>
                  <Badge 
                    variant={worker.verificationStatus === 'verified' ? 'default' : 'secondary'}
                    className={worker.verificationStatus === 'verified' ? 'bg-verified text-verified-foreground' : ''}
                  >
                    {worker.verificationStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Details */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Worker ID</p>
                <p className="font-semibold">{worker.idNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <Badge 
                  variant={worker.riskLevel === 'low' ? 'default' : worker.riskLevel === 'medium' ? 'secondary' : 'destructive'}
                >
                  {worker.riskLevel.toUpperCase()}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Police Verification</span>
                <div className="flex items-center gap-2">
                  {worker.policeVerified ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-verified" />
                      <span className="text-sm font-medium text-verified">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-destructive" />
                      <span className="text-sm font-medium text-destructive">Not Verified</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Aadhaar Linked</span>
                <div className="flex items-center gap-2">
                  {worker.aadhaarLinked ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-verified" />
                      <span className="text-sm font-medium text-verified">Linked</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-destructive" />
                      <span className="text-sm font-medium text-destructive">Not Linked</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Background Check</span>
                <Badge 
                  variant={worker.backgroundCheckStatus === 'completed' ? 'default' : 'secondary'}
                  className={worker.backgroundCheckStatus === 'completed' ? 'bg-verified text-verified-foreground' : ''}
                >
                  {worker.backgroundCheckStatus}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Employment Duration:</span>
                <span className="font-medium">{worker.employmentDuration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Verified:</span>
                <span className="font-medium">{worker.lastVerified}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{worker.phone}</p>
              </div>
            </div>
            
            {worker.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{worker.address}</p>
                </div>
              </div>
            )}

            {worker.emergencyContact && (
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-medium">{worker.emergencyContact}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Visit History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Visit History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {worker.visitHistory.map((visit, index) => (
                <div key={visit.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-verified" />
                      {index < worker.visitHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-foreground">{visit.location}</p>
                      <p className="text-sm text-muted-foreground">{visit.date} at {visit.time}</p>
                      {visit.residentName && (
                        <p className="text-sm text-muted-foreground">Resident: {visit.residentName}</p>
                      )}
                      {visit.purpose && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {visit.purpose}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* QR Code */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Worker QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {qrCodeUrl && (
                <img 
                  src={qrCodeUrl}
                  alt="Worker QR Code"
                  className="w-64 h-64 border-4 border-border rounded-lg"
                />
              )}
              <p className="text-sm text-muted-foreground text-center mt-4">
                Scan this QR code for instant verification
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                इस QR कोड को तुरंत सत्यापन के लिए स्कैन करें
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
