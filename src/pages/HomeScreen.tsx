import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Hash, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [idNumber, setIdNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleScanQR = () => {
    navigate('/scanner');
  };

  const handleIdSearch = () => {
    if (idNumber.trim()) {
      navigate(`/verify/${idNumber.trim()}`);
    }
  };

  const handleNameSearch = () => {
    if (searchName.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchName.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">Surakshit Bharat</h1>
            <p className="text-sm opacity-90">सुरक्षित भारत</p>
          </div>
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/ad1e8fdd-35ea-4fb1-9545-043f729eb2c0.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <p className="text-sm opacity-80 mt-2">
          Verify delivery personnel and service workers instantly
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://miaoda-site-img.s3cdn.medo.dev/images/b7963aa2-3281-4707-b626-dd4232339b72.jpg"
          alt="Verified Delivery Person"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex items-center gap-2 bg-verified/90 text-verified-foreground px-4 py-2 rounded-lg w-fit">
            <div className="w-2 h-2 bg-verified-foreground rounded-full animate-pulse-green" />
            <span className="font-semibold text-sm">Verified Workers Only</span>
          </div>
        </div>
      </div>

      {/* Verification Methods */}
      <div className="flex-1 p-6 space-y-4 -mt-8">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Choose Verification Method
        </h2>

        {/* Scan QR Code */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 animate-slide-up border-2"
          onClick={handleScanQR}
          style={{ animationDelay: '0.1s' }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <QrCode className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Scan QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Scan worker's QR code for instant verification
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enter ID Number */}
        <Card 
          className="border-2 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Hash className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Enter ID Number</h3>
                  <p className="text-sm text-muted-foreground">
                    Type worker's ID for verification
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., SW001, ZM002"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleIdSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleIdSearch} disabled={!idNumber.trim()}>
                    Verify
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search by Name */}
        <Card 
          className="border-2 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Search className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Search by Name</h3>
                  <p className="text-sm text-muted-foreground">
                    Find worker by their name
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter worker name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleNameSearch} disabled={!searchName.trim()}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-1 h-4 bg-saffron" />
          <div className="w-1 h-4 bg-background border-x border-border" />
          <div className="w-1 h-4 bg-green" />
          <span className="ml-2">Powered by Surakshit Bharat</span>
        </div>
      </div>
    </div>
  );
}
