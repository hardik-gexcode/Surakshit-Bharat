import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Camera, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { findWorkerById } from '@/data/mockData';

export default function FaceVerificationScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null);

  const worker = id ? findWorkerById(id) : null;

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast({
        title: 'Camera Access Denied',
        description: 'Please allow camera access to verify face',
        variant: 'destructive'
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        setCapturing(true);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setCapturing(false);
    setVerificationResult(null);
    startCamera();
  };

  const verifyFace = () => {
    setVerifying(true);

    // Mock face verification (simulate API call)
    setTimeout(() => {
      // Random success/failure for demo (80% success rate)
      const isSuccess = Math.random() > 0.2;
      setVerificationResult(isSuccess ? 'success' : 'failed');
      setVerifying(false);

      if (isSuccess) {
        toast({
          title: 'Face Verified Successfully',
          description: 'The person matches the registered profile',
        });
      } else {
        toast({
          title: 'Face Verification Failed',
          description: 'The person does not match the registered profile',
          variant: 'destructive'
        });
      }
    }, 2000);
  };

  if (!worker) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Worker not found</p>
            <Button onClick={() => navigate('/home')} className="mt-4">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-saffron via-white to-green p-1">
        <div className="bg-background p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/verify/${id}`)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold ml-4">Face Verification</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Worker Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <img
                src={worker.photo}
                alt={worker.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{worker.name}</h2>
                <p className="text-muted-foreground">{worker.company}</p>
                <Badge variant="outline" className="mt-2">{worker.idNumber}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera/Verification Area */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {!capturing ? 'Position Face in Frame' : verificationResult ? 'Verification Result' : 'Verify Face'}
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              {!capturing ? 'चेहरे को फ्रेम में रखें' : verificationResult ? 'सत्यापन परिणाम' : 'चेहरे को सत्यापित करें'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Camera View or Captured Image */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              {!capturing ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-80 border-4 border-verified rounded-full opacity-50"></div>
                  </div>
                </>
              ) : (
                <img
                  src={capturedImage || ''}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Verification Result */}
            {verificationResult && (
              <div className={`p-4 rounded-lg ${
                verificationResult === 'success' ? 'bg-verified/10' : 'bg-danger/10'
              }`}>
                <div className="flex items-center justify-center space-x-2">
                  {verificationResult === 'success' ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-verified" />
                      <div>
                        <p className="font-bold text-verified">Face Verified Successfully</p>
                        <p className="text-sm text-muted-foreground">Person matches registered profile</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-danger" />
                      <div>
                        <p className="font-bold text-danger">Face Verification Failed</p>
                        <p className="text-sm text-muted-foreground">Person does not match profile</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            {!capturing && !verificationResult && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Instructions | निर्देश:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Position the delivery person's face in the oval frame</li>
                  <li>• डिलीवरी व्यक्ति के चेहरे को अंडाकार फ्रेम में रखें</li>
                  <li>• Ensure good lighting and clear visibility</li>
                  <li>• अच्छी रोशनी और स्पष्ट दृश्यता सुनिश्चित करें</li>
                  <li>• Keep the face steady and look at the camera</li>
                  <li>• चेहरे को स्थिर रखें और कैमरे की ओर देखें</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              {!capturing ? (
                <Button
                  className="w-full bg-verified hover:bg-verified/90"
                  onClick={capturePhoto}
                  disabled={!stream}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Photo | फोटो लें
                </Button>
              ) : verificationResult ? (
                <>
                  {verificationResult === 'success' && (
                    <Button
                      className="w-full bg-verified hover:bg-verified/90"
                      onClick={() => navigate(`/verify/${id}`)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Allow Entry | प्रवेश की अनुमति दें
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={retakePhoto}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retake Photo | फिर से फोटो लें
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate(`/verify/${id}`)}
                  >
                    Back to Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full bg-primary"
                    onClick={verifyFace}
                    disabled={verifying}
                  >
                    {verifying ? 'Verifying...' : 'Verify Face | चेहरा सत्यापित करें'}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={retakePhoto}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retake Photo | फिर से फोटो लें
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
