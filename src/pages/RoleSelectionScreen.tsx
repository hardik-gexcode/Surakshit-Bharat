import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { User, Truck, Building2, Shield } from 'lucide-react';

export default function RoleSelectionScreen() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'resident',
      title: 'Resident',
      titleHindi: 'निवासी',
      description: 'Verify delivery persons & workers',
      descriptionHindi: 'डिलीवरी व्यक्ति और कर्मचारियों को सत्यापित करें',
      icon: User,
      color: 'bg-verified',
      path: '/home'
    },
    {
      id: 'delivery',
      title: 'Delivery Person',
      titleHindi: 'डिलीवरी व्यक्ति',
      description: 'Access your profile & QR code',
      descriptionHindi: 'अपनी प्रोफ़ाइल और QR कोड देखें',
      icon: Truck,
      color: 'bg-warning',
      path: '/delivery/login'
    },
    {
      id: 'company',
      title: 'Company Admin',
      titleHindi: 'कंपनी प्रशासक',
      description: 'Manage staff & verifications',
      descriptionHindi: 'कर्मचारियों और सत्यापन का प्रबंधन करें',
      icon: Building2,
      color: 'bg-primary',
      path: '/company/login'
    },
    {
      id: 'police',
      title: 'Police Admin',
      titleHindi: 'पुलिस प्रशासक',
      description: 'Law enforcement dashboard',
      descriptionHindi: 'कानून प्रवर्तन डैशबोर्ड',
      icon: Shield,
      color: 'bg-danger',
      path: '/police/login'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Surakshit Bharat
          </h1>
          <p className="text-lg text-muted-foreground">
            सुरक्षित भारत
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            हर विज़िटर सत्यापित | Every Visitor Verified
          </p>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="flex-1 p-6 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-8">
          Select Your Role
          <span className="block text-lg text-muted-foreground mt-1">
            अपनी भूमिका चुनें
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
                onClick={() => navigate(role.path)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`${role.color} p-4 rounded-full`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {role.titleHindi}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      {role.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {role.descriptionHindi}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Demo Credentials:</p>
          <p className="mt-2">Delivery: Phone: 9876543210, OTP: 123456</p>
          <p>Company: Email: admin@swiggy.com, Password: admin123</p>
          <p>Police: ID: MH01-12345, OTP: 123456</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-sm text-muted-foreground border-t">
        <p>© 2025 Surakshit Bharat | Making India Safer</p>
      </div>
    </div>
  );
}
