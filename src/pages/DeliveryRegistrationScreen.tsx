import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DeliveryRegistrationScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    name: '',
    nameHindi: '',
    company: '',
    email: '',
    address: '',
    emergencyContact: '',
    aadhaarNumber: '',
    aadhaarFile: null as File | null,
    photoFile: null as File | null,
    policeVerificationFile: null as File | null
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (!formData.phone || formData.phone.length < 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive'
      });
      return;
    }
    
    setOtpSent(true);
    toast({
      title: 'OTP Sent',
      description: 'Enter 123456 to verify (demo)',
    });
  };

  const handleVerifyOTP = () => {
    if (formData.otp === '123456') {
      setStep(2);
      toast({
        title: 'Phone Verified',
        description: 'Please complete your profile',
      });
    } else {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the correct OTP',
        variant: 'destructive'
      });
    }
  };

  const handleFileUpload = (field: 'aadhaarFile' | 'photoFile' | 'policeVerificationFile', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (file) {
      toast({
        title: 'File Uploaded',
        description: `${file.name} uploaded successfully`,
      });
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name || !formData.company || !formData.aadhaarNumber) {
      toast({
        title: 'Missing Information',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.aadhaarFile || !formData.photoFile) {
      toast({
        title: 'Missing Documents',
        description: 'Please upload Aadhaar card and photo',
        variant: 'destructive'
      });
      return;
    }

    // Mock registration success
    toast({
      title: 'Registration Successful',
      description: 'Your account is pending verification. You will be notified once approved.',
    });

    setTimeout(() => {
      navigate('/delivery/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step === 1 ? navigate('/delivery/login') : setStep(1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold ml-4">Create Delivery Account</h1>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-warning p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">
              {step === 1 ? 'Verify Phone Number' : 'Complete Your Profile'}
            </CardTitle>
            <CardDescription>
              {step === 1 ? 'फ़ोन नंबर सत्यापित करें' : 'अपनी प्रोफ़ाइल पूरी करें'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number | फ़ोन नंबर *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    maxLength={10}
                    disabled={otpSent}
                  />
                </div>

                {!otpSent ? (
                  <Button className="w-full" onClick={handleSendOTP}>
                    Send OTP | OTP भेजें
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP | OTP दर्ज करें *</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={formData.otp}
                        onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                        maxLength={6}
                      />
                    </div>

                    <Button
                      className="w-full"
                      onClick={handleVerifyOTP}
                      disabled={formData.otp.length !== 6}
                    >
                      Verify & Continue | सत्यापित करें और जारी रखें
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Personal Information */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name | पूरा नाम *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameHindi">Name in Hindi | हिंदी में नाम</Label>
                  <Input
                    id="nameHindi"
                    type="text"
                    placeholder="हिंदी में नाम दर्ज करें"
                    value={formData.nameHindi}
                    onChange={(e) => setFormData(prev => ({ ...prev, nameHindi: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company | कंपनी *</Label>
                  <Select value={formData.company} onValueChange={(value) => setFormData(prev => ({ ...prev, company: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Swiggy">Swiggy</SelectItem>
                      <SelectItem value="Zomato">Zomato</SelectItem>
                      <SelectItem value="Amazon">Amazon</SelectItem>
                      <SelectItem value="Flipkart">Flipkart</SelectItem>
                      <SelectItem value="Dunzo">Dunzo</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email | ईमेल</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address | पता *</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact | आपातकालीन संपर्क *</Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    placeholder="Enter emergency contact number"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  />
                </div>

                {/* Document Upload */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-4">Upload Documents | दस्तावेज़ अपलोड करें</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="aadhaarNumber">Aadhaar Number | आधार नंबर *</Label>
                      <Input
                        id="aadhaarNumber"
                        type="text"
                        placeholder="Enter 12-digit Aadhaar number"
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, aadhaarNumber: e.target.value }))}
                        maxLength={12}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadhaarFile">Aadhaar Card (PDF/Image) *</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="aadhaarFile"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('aadhaarFile', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById('aadhaarFile')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {formData.aadhaarFile ? formData.aadhaarFile.name : 'Upload Aadhaar'}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photoFile">Your Photo *</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="photoFile"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('photoFile', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById('photoFile')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {formData.photoFile ? formData.photoFile.name : 'Upload Photo'}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="policeVerificationFile">Police Verification (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="policeVerificationFile"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('policeVerificationFile', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById('policeVerificationFile')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {formData.policeVerificationFile ? formData.policeVerificationFile.name : 'Upload Certificate'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" onClick={handleSubmit}>
                  Submit Registration | पंजीकरण जमा करें
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  * Required fields | आवश्यक फ़ील्ड
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
