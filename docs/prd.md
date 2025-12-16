# Surakshit Bharat Mobile App Requirements Document

## 1. Application Overview

### 1.1 Application Name
Surakshit Bharat (सुरक्षित भारत)\n
### 1.2 Application Description
A national gig worker verification platform for India that enables residents to instantly verify delivery personnel, service workers, and other gig economy workers through QR code scanning or ID lookup. The app provides real-time verification status, background check information, and employment details to ensure visitor safety.

### 1.3 Application Type
Mobile Application (iOS & Android via React Native)

## 2. Core Features
\n### 2.1 Resident Features (No Login Required)
- Quick verification through three methods: QR code scanning, ID number entry, or name search
- Instant verification result display with worker photo and status\n- View worker profile including police verification, employment history, and ratings
- Allow entry or report issue functionality
- Share verification results via WhatsApp
- Offline verification cache\n
### 2.2 Worker Features
- Phone OTP login\n- Display personal QR code for scanning
- Profile completion status tracking
- Visit history timeline
\n### 2.3 Admin Preview\n- Company login portal
- Police verification dashboard
\n## 3. Screen Structure

### 3.1 Screen 1: Splash Screen\n- Surakshit Bharat logo with tricolor loading animation
- Bilingual tagline: 'हर विज़िटर सत्यापित | Every Visitor Verified'
\n### 3.2 Screen 2: Home/Main Verification Screen
- Full-screen hero image featuring delivery person with verification badge
- Three large white card options:
  -'Scan QR Code' (opens camera)
  - 'Enter ID Number' (input field)
  - 'Search by Name' (search bar)
\n### 3.3 Screen 3: Verification Result Screen\n- Full-screen verified worker photo with green overlay
- Worker name and verification status badge
- Key information: Company name, ID number, rating, last verified time
- Status indicators: Police Verified, Aadhaar Linked, Risk Level\n- Large status badge: 'SAFE TO ALLOW' or warning status
- Bottom action buttons: 'Allow Entry', 'Report Issue', 'View Full Profile'

### 3.4 Screen 4: Worker Profile Screen
- Professional worker photo
- Verification details:
  - Police Verification status
  - Employment information (company, duration)
  - Background check status\n  - Visit history count
- Timeline of recent verifications with timestamps and resident names
- Large QR code display with instruction text

### 3.5 Screen 5: QR Scanner Screen
- Camera view with overlay frame
- Fade-in animation for scanner interface
- Instant result transition
\n### 3.6 Screen 6: Report Issue Modal
- Issue reporting form\n- Category selection\n- Submit functionality
\n### 3.7 Screen 7: Admin Dashboard Preview
- Company/Police login interface
- Basic dashboard overview
\n## 4. Technical Implementation\n
### 4.1 Technology Stack
- Framework: React Native with TypeScript
- Deployment: Expo\n- Key Libraries:
  - react-native-reanimated (animations)
  - react-native-linear-gradient (gradients)
  - react-native-shadow-2 (shadows)
  - @shopify/flash-list (scrolling)
  - react-native-vision-camera (QR scanning)

### 4.2 Mock Data
- Worker1: Rahul Kumar (Swiggy delivery partner)
- Worker 2: Priya Sharma (Zomato delivery partner)
- Worker 3: Rajesh (AePS Agent)

### 4.3 API Integration
- Mock JSON data structure for verification results
- Offline caching mechanism
\n## 5. Design Specifications

### 5.1 Color Palette
- Primary: #000000 (black)
- Secondary: #FFFFFF (white)\n- Accent (Verified): #10B981 (green)\n- Warning (Pending): #F59E0B (orange)
- Danger (Blacklisted): #EF4444 (red)

### 5.2 Typography
- Heading: SF Pro Display Bold (24-32pt)
- Body: SF Pro Text Regular (16pt)
- Caption: SF Pro Text Medium (14pt)
\n### 5.3 Visual Style
- Monochromatic black and white base with vibrant full-screen images
- Minimalist aesthetic with clean text hierarchy
- Card-based layout with smooth transitions
- iOS-style shadows and rounded corners
- Subtle linear gradients for depth

### 5.4 Animations\n- Cards slide up from bottom with smooth easing
- Status badges pulse green when verified
- QR scanner overlay fades in
- Profile cards expand with scale and shadow increase\n- Haptic feedback on button interactions

### 5.5 UI Components
- Large white cards with shadow elevation
- iOS-style navigation with large titles\n- Skeleton loading states
- Pull-to-refresh functionality
- Dynamic Type support for accessibility
- Automatic dark mode toggle
\n## 6. App Store Information

### 6.1 App Icon
Tricolor shield with checkmark symbol

### 6.2 App Store Name
Surakshit Bharat - Verify Instantly

### 6.3 Splash Screen
Bilingual text: 'Surakshit Bharat' in Hindi and English with tricolor elements

## 7. Deliverables

- Complete React Native project structure
- Full implementation code for all 7 screens
- Design system documentation (colors, typography, shadows)
- Mock API integration with JSON data
- package.json with all required dependencies
- README with Expo setup and deployment instructions
- Deployable to Expo in 5 minutes