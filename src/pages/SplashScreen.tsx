import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Tricolor animated loader */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 rounded-full border-8 border-transparent animate-tricolor-spin"
          style={{
            borderTopColor: 'hsl(var(--saffron))',
            borderRightColor: 'hsl(var(--background))',
            borderBottomColor: 'hsl(var(--green))'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="https://miaoda-site-img.s3cdn.medo.dev/images/ad1e8fdd-35ea-4fb1-9545-043f729eb2c0.jpg"
            alt="Surakshit Bharat Logo"
            className="w-16 h-16 object-contain rounded-full"
          />
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-4xl font-bold text-foreground mb-2 text-center">
        Surakshit Bharat
      </h1>
      <p className="text-2xl text-muted-foreground mb-1 text-center">
        सुरक्षित भारत
      </p>

      {/* Tagline */}
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-foreground">
          हर विज़िटर सत्यापित
        </p>
        <p className="text-lg font-medium text-muted-foreground">
          Every Visitor Verified
        </p>
      </div>

      {/* Tricolor line */}
      <div className="mt-8 w-48 h-1 flex">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-background border-y border-border" />
        <div className="flex-1 bg-green" />
      </div>
    </div>
  );
}
