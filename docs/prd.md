# Surakshit Bharat Mobile App Requirements Document (Updated)

## 1. Application Overview

### 1.1 Application Name
Surakshit Bharat (सुरक्षित भारत)\n
### 1.2 Application Description
A comprehensive national gig worker verification platform for India featuring4separate role-based dashboards: Residents (instant verification with face scanning), Delivery Persons (profile management with registration and document upload), Company Admins (staff oversight with risk alerts), and Police Super Admins (risk monitoring with SOS notifications). The platform enables real-time verification through QR code scanning, face recognition, ID lookup, and name search while maintaining complete background check records and visit logs.

### 1.3 Application Type
Mobile Application (iOS & Android via React Native + Expo) with Node.js Backend

## 2. User Roles & Dashboard Structure

### 2.1 Role1: Resident Dashboard (No Login Required)
**Access**: Direct app launch\n**Primary Function**: Instant worker verification via QR code, ID lookup, name search, and face scanning
\n### 2.2 Role 2: Delivery Person Dashboard (Phone OTP Login + Registration)
**Access**: Phone number + OTP verification OR new user registration
**Primary Function**: Profile management, document upload, and QR code display

### 2.3 Role 3: Company Admin Dashboard (Email + Password Login)
**Access**: Company email + password\n**Primary Function**: Staff management, bulk operations, and risk alert monitoring

### 2.4 Role 4: Police Super Admin Dashboard (Police ID + OTP Login)
**Access**: Police ID + OTP verification
**Primary Function**: Global search, risk monitoring, and SOS alert management

## 3. Complete Screen Structure (17 Screens)

### 3.1 Screen 1: Splash Screen
- Surakshit Bharat logo with tricolor loading animation (Lottie)
- Bilingual tagline: 'हर विज़िटर सत्यापित | Every Visitor Verified'
- 3-second display duration
- Auto-transition to Role Selection

### 3.2 Screen 2: Role Selection Screen
- Four large card buttons:\n  - Resident (Verify Instantly)
  - Delivery Person (My Profile)
  - Company Admin (Manage Staff)
  - Police (Law Enforcement)
- Each card with role-specific icon and description
\n### 3.3 Resident Flow (5 Screens)
\n**Screen 3: Main Verification Screen**
- Full-screen hero image: delivery person with verification badge
- App title: SURAKSHIT BHARAT\n- Subtitle: हर विज़िटर सत्यापित\n- Four large white cards with shadow:\n  - 🔍SCAN QR CODE (opens camera)
  - 📱 ENTER ID (input field for ID number)
  - 👤 SEARCH NAME (search bar)
  - 📸 SCAN FACE (opens face recognition camera)
\n**Screen 4: Face Scanning Screen**
- Full-screen camera view with face detection overlay
- Oval guide frame for face positioning
- Instruction text: 'Position face within frame'\n- Real-time face detection indicator
- Capture button (auto-capture when face detected)
- Cancel button to return to main screen
- Processing animation during verification

**Screen 5: Verification Result Screen**
- Full-screen verified worker photo with green overlay
- Worker name and verification status badge
- Key information display:
  - Company name (e.g., Swiggy)\n  - ID number (e.g., SB123456)
  - Rating and last verified time
  - Status indicators: Police Verified, Aadhaar Linked, Risk Level
  - Face Match Score (if verified via face scan)
- Large status badge: 'SAFE TO ALLOW' (green) or warning status (yellow/red)
- Bottom action buttons: 'Allow Entry', 'Report Issue', 'View Full Profile', '🚨 SOS Alert'
- Share button for WhatsApp
\n**Screen 6: Worker Profile Detail Screen**
- Professional worker photo\n- Verification details section:\n  - Police Verification status
  - Employment information (company, duration)
  - Background check status\n  - Visit history count
- Timeline of recent verifications with timestamps and resident names
- Large QR code display with instruction text\n- Risk indicators and alerts history

**Screen 7: Report Issue / SOS Modal**
- Issue category selection dropdown (includes'Emergency/SOS' option)
- Description text area\n- Photo upload option
- Priority level selector (Normal/Urgent/Emergency)
- Submit button\n- Emergency SOS button (red, prominent) that triggers immediate alerts to police and company

### 3.4 Delivery Person Flow (7 Screens)

**Screen 8: Delivery Login/Registration Screen**
- Tab switcher: 'Login' | 'Register'
- **Login Tab:**
  - Phone number input field
  - 'Send OTP' button
  - OTP verification input (6 digits)
  - 'Verify' button
- **Register Tab:**
  - Full name input\n  - Phone number input
  - Company selection dropdown
  - 'Send OTP' button
  - OTP verification input\n  - 'Create Account' button
\n**Screen 9: Registration Document Upload Screen**
- Welcome message for new users
- Document upload sections:
  - 📄 Aadhaar Card (front and back)
  - 🆔 PAN Card (optional)
  - 📸 Profile Photo\n  - 🏢 Company ID Card
  - 👮 Police Verification Certificate (if available)
- Each section with:\n  - Upload button
  - Preview thumbnail
  - Delete/Replace option
- Progress indicator showing completion percentage
-'Submit for Verification' button (enabled when mandatory docs uploaded)
- 'Skip for Now' option (profile marked as incomplete)

**Screen 10: Delivery Dashboard**
- Profile photo circle at top
- Worker name and company\n- Status badge: ✅ VERIFIED or ⚠ PENDING or📄 DOCUMENTS REQUIRED
- Five main cards:
  - 👤 My Profile (completion percentage: 80%)
  - 📱 MY QR CODE (large green button)
  - 📋 Visit History (count: 247today)
  - ⚙️ Documents (upload status with action button)
  - 🚨 SOS Alert (emergency button)
\n**Screen 11: My QR Code Screen**
- Massive scannable QR code (center)\n- Instruction text: 'Show this to Residents'
- Profile summary below QR:\n  - Name, Company, ID number
  - Verification status
- Share button (WhatsApp integration)

**Screen 12: Profile Edit Screen**
- Editable fields:
  - Profile photo upload
  - Personal information
  - Employment details\n  - Emergency contact
- Save button
- Profile completion progress bar

**Screen 13: Document Management Screen**
- List of all uploaded documents with status:\n  - ✅ Verified
  - ⏳ Under Review
  - ❌ Rejected (with reason)
  - 📤 Not Uploaded
- Upload/Replace buttons for each document
- Document expiry date display (for time-sensitive docs)
- Resubmit option for rejected documents

**Screen 14: Visit History Screen**
- Searchable list with @shopify/flash-list
- Each entry shows:
  - Resident name
  - Timestamp
  - Location
  - Verification status\n- Pull-to-refresh functionality
\n### 3.5 Company Admin Flow (5 Screens)
\n**Screen 15: Company Admin Login**
- Company email input
- Password input
- 'Login' button
- Forgot password link
\n**Screen 16: Company Dashboard**
- Company name header (e.g., SWIGGY ADMIN PANEL)
- Key metrics cards:
  - Total Staff: 2,347
  - Verified: 89%
  - Pending: 11%
  - 🚨 Active Alerts: 3
- Five main cards:
  - 📊 Today's Verifications: 1,247
  - 👥 Staff Management (main button)
  - 📈 Verification Trends (chart)\n  - 🚨 Risk Alerts (2 High Risk, 1 SOS)
  - 📄 Document Approvals (15Pending)

**Screen 17: Staff List Screen**
- Search bar at top
- Filter buttons: All | Verified | Pending | Rejected | High Risk
- Scrollable staff list with:
  - Worker photo
  - Name and status (✓ Verified / ⚠ Pending /🚨 High Risk)
  - Company name
  - Risk indicator badge
  - Action buttons: Approve / Reject / View / Review Docs
- Pagination or infinite scroll\n
**Screen 18: Risk Alert Dashboard**
- Real-time alert feed with priority levels:\n  - 🔴 SOS Emergency (immediate action required)
  - 🟠 High Risk Worker Detected
  - 🟡 Incident Report Filed
  - 🔵 Document Verification Failed
- Each alert shows:
  - Worker name and photo
  - Alert type and timestamp
  - Location (if available)
  - Action buttons: View Details / Contact Worker / Notify Police
- Filter by alert type and date range
- Mark as resolved option

**Screen 19: Bulk Upload Screen**
- CSV file upload area
- Template download button
- Upload instructions
- Progress indicator
- Success/error message display

### 3.6 Police Super Admin Flow (5 Screens)

**Screen 20: Police Login**
- Police ID input\n- 'Send OTP' button
- OTP verification input
- 'Login' button

**Screen 21: Police Risk Dashboard**
- Header: LAW ENFORCEMENT PANEL
- Alert metrics:
  - 🚨 Active SOS: 2
  - High Risk: 17
  - Blacklisted: 43
  - Under Watch: 89
- Global search bar (Name/Phone/ID/Face)
- Quick filter buttons:\n  - 🔴 SOS Alerts
  - 🔴Blacklisted
  - 🟡 High Risk
  - ✅ All Clear
- Recent activity feed with real-time updates

**Screen 22: SOS Alert Management Screen**
- Priority-sorted list of SOS alerts
- Each alert displays:
  - Alert timestamp and location
  - Resident name and contact
  - Worker name and photo
  - Company name\n  - Alert description
  - Current status: Active / Responded / Resolved
- Action buttons:\n  - Call Resident
  - Call Worker
  - Dispatch Unit
  - Mark Resolved
  - View Full Details
- Map view showing alert locations
- Filter by status and time range

**Screen 23: Global Search Results**
- Search results list (supports face image upload for face search)
- Each entry shows:
  - Worker photo
  - Name and ID
  - Risk level indicator
  - Current company
  - Last verification time
  - Alert history count
- Tap to view full detail

**Screen 24: Person Detail (Police View)**
- Complete worker profile\n- Criminal history section
- Full visit logs timeline
- Risk score calculation display\n- Alert history with timestamps
- Document verification status
- Action buttons:\n  - Blacklist
  - Mark Under Watch
  - Clear Status
  - Send Warning
- Notes section for police comments

## 4. Technical Implementation

### 4.1 Frontend Technology Stack
- Framework: React Native with TypeScript
- Deployment: Expo\n- Key Libraries:
  - react-native-reanimated@3.15.1(animations)
  - react-native-linear-gradient (gradients)
  - react-native-shadow-2 (shadows)
  - @shopify/flash-list (optimized scrolling)
  - react-native-vision-camera (QR scanning and face capture)
  - react-native-face-detection (face recognition)
  - react-native-haptic-feedback (tactile feedback)
  - lottie-react-native (splash animation)
  - react-native-document-picker (document upload)
  - react-native-image-picker (photo capture)
  - react-native-push-notification (alert notifications)
  - @react-native-firebase/messaging (push notifications)

### 4.2 Backend Technology Stack
- Runtime: Node.js\n- Framework: Express\n- Database: PostgreSQL
- Authentication: JWT tokens
- Face Recognition: Face-api.js or AWS Rekognition
- File Storage: AWS S3 or local storage for documents
- Real-time Notifications: Socket.io or Firebase Cloud Messaging
\n### 4.3 API Endpoints (25+ Required)

**Authentication Routes:**
- POST /api/auth/login/resident (no auth required)
- POST /api/auth/login/delivery (phone + OTP)
- POST /api/auth/register/delivery (new user registration)
- POST /api/auth/verify-otp (OTP verification)
- POST /api/auth/login/company (email + password)
- POST /api/auth/login/police (police ID + OTP)
\n**Resident Routes:**
- GET /api/verify/:id (verify by ID)
- GET /api/verify/qr/:qrCode (verify by QR scan)
- GET /api/verify/search?name=xxx (search by name)
- POST /api/verify/face (verify by face image)
- POST /api/report-incident (report issue)
- POST /api/sos-alert (trigger SOS emergency alert)
\n**Delivery Person Routes:**\n- GET /api/delivery/profile (get own profile)
- PUT /api/delivery/profile (update profile)
- POST /api/delivery/upload-document (upload Aadhaar, PAN, etc.)
- GET /api/delivery/documents (get all uploaded documents)
- DELETE /api/delivery/document/:id (delete document)
- GET /api/delivery/qr-code (generate QR)\n- GET /api/delivery/visit-history (get visit logs)
- POST /api/delivery/sos-alert (trigger SOS from delivery person)

**Company Admin Routes:**
- GET /api/company/staff-list (get all staff)
- POST /api/company/bulk-upload (CSV upload)
- PUT /api/company/approve-staff/:id (approve worker)
- PUT /api/company/reject-staff/:id (reject worker)
- GET /api/company/analytics (dashboard metrics)
- GET /api/company/risk-alerts (get risk and SOS alerts)
- PUT /api/company/resolve-alert/:id (mark alert as resolved)
- GET /api/company/pending-documents (get staff with pending doc approvals)
- PUT /api/company/approve-document/:id (approve uploaded document)
- PUT /api/company/reject-document/:id (rejectdocument with reason)

**Police Routes:**
- GET /api/police/global-search?query=xxx (search anyone)
- POST /api/police/face-search (search by face image)
- GET /api/police/risk-dashboard (get risk metrics)
- GET /api/police/sos-alerts (get all SOS alerts)
- PUT /api/police/respond-sos/:id (mark SOS as responded)
- PUT /api/police/resolve-sos/:id (mark SOS as resolved)
- PUT /api/police/blacklist-user/:id (blacklist worker)
- PUT /api/police/watch-user/:id (mark under watch)
- GET /api/police/person-detail/:id (full profile)
- POST /api/police/send-warning/:id (send warning to worker)

### 4.4 Database Schema

**Users Table:**
- id, role (resident/delivery/company/police), phone, email, password_hash, status, created_at, emergency_contact

**VerificationProfiles Table:**
- id, user_id, full_name, photo_url, face_encoding (for face recognition), company_name, worker_id, police_verified, aadhaar_linked, risk_level, rating, last_verified_at, document_status\n
**Documents Table:**\n- id, user_id, document_type (aadhaar/pan/company_id/police_cert), file_url, upload_date, verification_status (pending/approved/rejected), rejection_reason, expiry_date

**VisitLogs Table:**
- id, worker_id, resident_id, timestamp, location, verification_status, verification_method (qr/id/name/face)\n
**Incidents Table:**
- id, worker_id, reporter_id, description, category, priority (normal/urgent/emergency), status, created_at\n
**SOSAlerts Table:**
- id, worker_id, resident_id, company_id, alert_type, description, location, timestamp, status (active/responded/resolved), responding_officer_id, resolution_notes

**RiskAlerts Table:**
- id, worker_id, alert_type (high_risk/document_failed/incident_report), severity, description, timestamp, status, resolved_by, resolved_at

**Companies Table:**
- id, name, admin_user_ids, total_staff, verified_count, pending_count, active_alerts_count\n
### 4.5 Mock Data (Pre-populated)
- Worker1: Rahul Kumar (Swiggy, Verified, SB123456, all documents approved)
- Worker 2: Priya Sharma (Zomato, Pending docs, SB123457, Aadhaar uploaded)
- Worker 3: Rajesh Kumar (AePS Agent, High Risk, SB123458, police verification pending)
- 50+ visit logs\n- 10 incident reports
- 3 SOS alerts (1 active, 2 resolved)
- 5 risk alerts\n- 3 companies (Swiggy, Zomato, AePS)
- Sample face encodings for face recognition testing

### 4.6 Offline Functionality
- Cache last50 verifications using AsyncStorage
- Offline QR code display for delivery persons
- Queue incident reports and SOS alerts for sync when online
- Store uploaded documents locally until network available

### 4.7 Real-time Notification System
- **SOS Alert Triggers:**
  - Immediate push notification to police dashboard
  - SMS alert to nearest police station
  - Push notification to company admin
  - Email alert to company management
- **Risk Alert Triggers:**
  - Push notification to company admin when high-risk worker detected
  - Push notification to police when blacklisted worker attempts verification
- **Document Status Notifications:**
  - Push notification to delivery person when documents approved/rejected
  - Push notification to company admin for pendingdocument reviews
\n## 5. Design Specifications

### 5.1 Color Palette
- Primary Black: #000000
- White: #FFFFFF
- Verified Green: #10B981
- Pending Yellow: #F59E0B
- Danger Red: #EF4444\n- SOS Emergency Red: #DC2626
- Tricolor Saffron: #FF9933
- Tricolor Green: #138808

### 5.2 Typography
- Heading: SF Pro Display Bold (iOS) / Roboto Bold (Android), 24-32pt
- Body: SF Pro Text Regular (iOS) / Roboto Regular (Android), 16pt
- Caption: SF Pro Text Medium (iOS) / Roboto Medium (Android), 14pt
\n### 5.3 Visual Style
- Monochromatic black and white base with vibrant full-screen worker images
- Minimalist aesthetic with clean text hierarchy
- Large white cards with iOS-style shadows (elevation 4-8)
- Rounded corners: 16px for cards, 12px for buttons
- Subtle linear gradients for depth on hero sections
- Red pulsing animation for SOS buttons
- Face scanning overlay with green detection frame

### 5.4 Animations & Interactions
- Cards slide up from bottom with smooth easing (300ms)
- Status badges pulse green when verified (infinite loop)
- QR scanner overlay fades in (200ms)
- Face detection frame animates when face detected
- Profile cards expand with scale (1.0 → 1.05) and shadow increase on press
- Haptic feedback on all button interactions
- SOS button vibrates on press with strong haptic feedback
- Skeleton loading states for all data fetching
- Pull-to-refresh with custom tricolor spinner
- Document upload progress bar with percentage

### 5.5 UI Components
- Large white cards with shadow elevation\n- iOS-style navigation with large titles
- Bottom tab navigation for multi-screen dashboards
- Dynamic Type support for accessibility
- Automatic dark mode toggle (system preference)
- Emergency SOS button with prominent red styling
- Document upload cards with preview thumbnails
- Face scanning camera overlay with guide frame
\n## 6. App Store Information

### 6.1 App Icon
Tricolor shield with checkmark symbol in center

### 6.2 App Store Name
Surakshit Bharat - Verify Instantly

### 6.3 App Store Description
National gig worker verification platform with face recognition. Scan QR codes or faces to instantly verify delivery persons, service workers, and gig economy professionals. Features police verification, background checks, document management, real-time safety alerts, and SOS emergency response system.

## 7. Deployment & Setup

### 7.1 Frontend Deployment
- Command: npx expo start\n- Hot Module Replacement enabled
- Live reload for development
\n### 7.2 Backend Deployment
- Command: npm run dev
- Environment variables in .env file (mock JWT secrets, AWS credentials, FCM keys)
- Docker Compose for PostgreSQL database
- Face recognition model setup

### 7.3 One-Command Setup
- Clone repository
- Run setup script: ./setup.sh
- Frontend and backend start automatically
- Mock data seeded in database
- Face recognition models downloaded

## 8. Deliverables

### 8.1 Project Structure
```
surakshit-bharat/\n├── frontend/ (React Native + Expo)
│   ├── src/screens/ (24 screen files)
│   ├── src/components/ (Design system components)
│   ├── src/services/ (API calls, face recognition)
│   ├── src/navigation/ (Role-based navigation)
│   ├── src/utils/ (face detection helpers)
│   ├── App.tsx\n│   └── package.json
├── backend/ (Node.js + Express)
│   ├── src/routes/ (API routes)
│   ├── src/models/ (Database models)
│   ├── src/controllers/ (Business logic)
│   ├── src/middleware/ (Auth, validation)
│   ├── src/services/ (Face recognition, notifications)
│   ├── src/uploads/ (Document storage)
│   ├── server.ts
│   └── package.json
├── database/ (SQL schema + seed data)
│   ├── schema.sql
│   └── seed.sql
├── docker-compose.yml
├── .env.example
└── README.md (5-minute setup guide)
```

### 8.2 Complete Code Files
- All24 screen implementations
- Complete design system with reusable components
- Full backend API with 25+ endpoints
- Database schema with relationships
- Authentication middleware
- Face recognition integration
- Document upload and storage system
- Real-time notification system
- SOS alert management system
- Mock data seeding scripts
- Expo configuration for deployment

### 8.3 Documentation
- README with setup instructions
- API documentation
- Database schema diagram
- Design system guidelines
- Face recognition implementation guide
- Notification system documentation
\n## 9. Additional Features

### 9.1 Push Notifications
- Delivery persons receive verification request notifications
- Delivery persons receive document approval/rejection notifications
- Company admins receive staff approval notifications
- Company admins receive SOS and risk alert notifications
- Police receive high-risk alerts and SOS emergency notifications
- Residents receive confirmation after successful verification

### 9.2 WhatsApp Integration
- Share verification results via WhatsApp
- Share QR codes via WhatsApp
- Send SOS alert details via WhatsApp to emergency contacts
\n### 9.3 Bilingual Support
- All UI text in Hindi + English
- Language toggle in settings
- Default language based on device settings

### 9.4 Accessibility
- VoiceOver/TalkBack support\n- Dynamic Type support
- High contrast mode
- Haptic feedback for visually impaired users
- Audio alerts for SOS emergencies

### 9.5 Security Features
- End-to-end encryption for face data
- Secure document storage with encryption
- Audit logs for all verification activities
- Two-factor authentication for company and police logins
- Automatic session timeout
- Biometric authentication option (fingerprint/face unlock)

### 9.6 Analytics & Reporting
- Verification trends dashboard
- Risk pattern analysis
- SOS response time metrics
- Document approval turnaround time
- Worker performance ratings
- Company-wise verification statistics