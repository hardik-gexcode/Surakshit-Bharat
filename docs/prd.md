# Surakshit Bharat Mobile App Requirements Document

## 1. Application Overview

### 1.1 Application Name
Surakshit Bharat (सुरक्षित भारत)

### 1.2 Application Description
A comprehensive national gig worker verification platform for India featuring4 separate role-based dashboards: Residents (instant verification), Delivery Persons (profile management), Company Admins (staff oversight), and Police Super Admins (risk monitoring). The platform enables real-time verification through QR code scanning, ID lookup, and name search while maintaining complete background check records and visit logs.

### 1.3 Application Type
Mobile Application (iOS & Android via React Native + Expo) with Node.js Backend

## 2. User Roles & Dashboard Structure

### 2.1 Role1: Resident Dashboard (No Login Required)
**Access**: Direct app launch\n**Primary Function**: Instant worker verification
\n### 2.2 Role 2: Delivery Person Dashboard (Phone OTP Login)
**Access**: Phone number + OTP verification
**Primary Function**: Profile management and QR code display

### 2.3 Role 3: Company Admin Dashboard (Email + Password Login)
**Access**: Company email + password
**Primary Function**: Staff management and bulk operations

### 2.4 Role 4: Police Super Admin Dashboard (Police ID + OTP Login)
**Access**: Police ID + OTP verification
**Primary Function**: Global search and risk monitoring

## 3. Complete Screen Structure (12 Screens)

### 3.1 Screen 1: Splash Screen
- Surakshit Bharat logo with tricolor loading animation (Lottie)
- Bilingual tagline: 'हर विज़िटर सत्यापित | Every Visitor Verified'
-3-second display duration
- Auto-transition to Role Selection

### 3.2 Screen 2: Role Selection Screen
- Four large card buttons:\n  - Resident (Verify Instantly)
  - Delivery Person (My Profile)
  - Company Admin (Manage Staff)
  - Police (Law Enforcement)
- Each card with role-specific icon and description
\n### 3.3 Resident Flow (4 Screens)
\n**Screen 3: Main Verification Screen**
- Full-screen hero image: delivery person with verification badge
- App title: SURAKSHIT BHARAT\n- Subtitle: हर विज़िटर सत्यापित\n- Three large white cards with shadow:\n  -🔍 SCAN QR CODE (opens camera)
  - 📱 ENTER ID (input field for ID number)
  - 👤 SEARCH NAME (search bar)
\n**Screen 4: Verification Result Screen**
- Full-screen verified worker photo with green overlay
- Worker name and verification status badge
- Key information display:
  - Company name (e.g., Swiggy)\n  - ID number (e.g., SB123456)
  - Rating and last verified time
  - Status indicators: Police Verified, Aadhaar Linked, Risk Level
- Large status badge:'SAFE TO ALLOW' (green) or warning status (yellow/red)
- Bottom action buttons: 'Allow Entry', 'Report Issue', 'View Full Profile'
- Share button for WhatsApp\n
**Screen 5: Worker Profile Detail Screen**
- Professional worker photo\n- Verification details section:\n  - Police Verification status
  - Employment information (company, duration)
  - Background check status
  - Visit history count
- Timeline of recent verifications with timestamps and resident names
- Large QR code display with instruction text

**Screen 6: Report Issue Modal**
- Issue category selection dropdown
- Description text area
- Photo upload option
- Submit button
\n### 3.4 Delivery Person Flow (5 Screens)

**Screen 7: Delivery Login Screen**
- Phone number input field
- 'Send OTP' button
- OTP verification input (6 digits)
- 'Verify' button
\n**Screen 8: Delivery Dashboard**
- Profile photo circle at top
- Worker name and company\n- Status badge:✅ VERIFIED or ⚠ PENDING\n- Four main cards:
  - 👤 My Profile (completion percentage: 80%)
  - 📱 MY QR CODE (large green button)
  - 📋 Visit History (count: 247 today)
  - ⚙️ Documents (upload status)

**Screen 9: My QR Code Screen**
- Massive scannable QR code (center)
- Instruction text: 'Show this to Residents'
- Profile summary below QR:\n  - Name, Company, ID number
  - Verification status
- Share button (WhatsApp integration)

**Screen 10: Profile Edit Screen**
- Editable fields:
  - Profile photo upload
  - Personal information
  - Employment details
  - Document uploads (Aadhaar, Police Verification)
- Save button
- Profile completion progress bar

**Screen 11: Visit History Screen**
- Searchable list with @shopify/flash-list
- Each entry shows:
  - Resident name
  - Timestamp
  - Location
  - Verification status
- Pull-to-refresh functionality
\n### 3.5 Company Admin Flow (4 Screens)
\n**Screen 12: Company Admin Login**
- Company email input\n- Password input\n- 'Login' button\n- Forgot password link

**Screen 13: Company Dashboard**\n- Company name header (e.g., SWIGGY ADMIN PANEL)\n- Key metrics cards:
  - Total Staff: 2,347
  - Verified: 89%
  - Pending: 11%
- Four main cards:
  - 📊 Today's Verifications: 1,247
  - 👥 Staff Management (main button)
  - 📈 Verification Trends (chart)
  - 🚨 Incident Reports (2 New)

**Screen 14: Staff List Screen**
- Search bar at top
- Filter buttons: All | Verified | Pending | Rejected
- Scrollable staff list with:
  - Worker photo
  - Name and status (✓ Verified / ⚠ Pending)\n  - Company name
  - Action buttons: Approve / Reject / View
- Pagination or infinite scroll

**Screen 15: Bulk Upload Screen**
- CSV file upload area
- Template download button
- Upload instructions
- Progress indicator
- Success/error message display

### 3.6 Police Super Admin Flow (4 Screens)

**Screen 16: Police Login**\n- Police ID input
-'Send OTP' button
- OTP verification input
- 'Login' button

**Screen 17: Police Risk Dashboard**
- Header: LAW ENFORCEMENT PANEL
- Alert metrics:
  - High Risk: 17
  - Blacklisted: 43
  - Under Watch: 89
- Global search bar (Name/Phone/ID)
- Quick filter buttons:\n  - 🔴 Blacklisted
  - 🟡 High Risk
  - ✅ All Clear
- Recent activity feed

**Screen 18: Global Search Results**
- Search results list
- Each entry shows:
  - Worker photo
  - Name and ID
  - Risk level indicator
  - Current company
  - Last verification time
- Tap to view full detail

**Screen 19: Person Detail (Police View)**
- Complete worker profile
- Criminal history section
- Full visit logs timeline
- Risk score calculation display
- Action buttons:\n  - Blacklist\n  - Mark Under Watch
  - Clear Status
- Notes section for police comments

## 4. Technical Implementation
\n### 4.1 Frontend Technology Stack
- Framework: React Native with TypeScript
- Deployment: Expo\n- Key Libraries:
  - react-native-reanimated@3.15.1 (animations)
  - react-native-linear-gradient (gradients)
  - react-native-shadow-2 (shadows)\n  - @shopify/flash-list (optimized scrolling)
  - react-native-vision-camera (QR scanning)
  - react-native-haptic-feedback (tactile feedback)
  - lottie-react-native (splash animation)

### 4.2 Backend Technology Stack
- Runtime: Node.js\n- Framework: Express\n- Database: PostgreSQL
- Authentication: JWT tokens
\n### 4.3 API Endpoints (15+ Required)

**Authentication Routes:**
- POST /api/auth/login/resident (no auth required)
- POST /api/auth/login/delivery (phone + OTP)
- POST /api/auth/login/company (email + password)
- POST /api/auth/login/police (police ID + OTP)

**Resident Routes:**
- GET /api/verify/:id (verify by ID)
- GET /api/verify/qr/:qrCode (verify by QR scan)
- GET /api/verify/search?name=xxx (search by name)
- POST /api/report-incident (report issue)
\n**Delivery Person Routes:**\n- GET /api/delivery/profile (get own profile)
- PUT /api/delivery/profile (update profile)
- GET /api/delivery/qr-code (generate QR)\n- GET /api/delivery/visit-history (get visit logs)
- POST /api/delivery/upload-docs (upload documents)\n
**Company Admin Routes:**
- GET /api/company/staff-list (get all staff)
- POST /api/company/bulk-upload (CSV upload)
- PUT /api/company/approve-staff/:id (approve worker)
- PUT /api/company/reject-staff/:id (reject worker)
- GET /api/company/analytics (dashboard metrics)

**Police Routes:**
- GET /api/police/global-search?query=xxx (search anyone)
- GET /api/police/risk-dashboard (get risk metrics)
- PUT /api/police/blacklist-user/:id (blacklist worker)
- PUT /api/police/watch-user/:id (mark under watch)
- GET /api/police/person-detail/:id (full profile)

### 4.4 Database Schema
\n**Users Table:**
- id, role (resident/delivery/company/police), phone, email, password_hash, status, created_at\n
**VerificationProfiles Table:**
- id, user_id, full_name, photo_url, company_name, worker_id, police_verified, aadhaar_linked, risk_level, rating, last_verified_at

**VisitLogs Table:**
- id, worker_id, resident_id, timestamp, location, verification_status\n
**Incidents Table:**
- id, worker_id, reporter_id, description, category, status, created_at

**Companies Table:**
- id, name, admin_user_ids, total_staff, verified_count, pending_count\n
### 4.5 Mock Data (Pre-populated)
- Worker1: Rahul Kumar (Swiggy, Verified, SB123456)
- Worker 2: Priya Sharma (Zomato, Pending docs, SB123457)
- Worker 3: Rajesh Kumar (AePS Agent, High Risk, SB123458)
- 50+ visit logs
- 10 incident reports
- 3 companies (Swiggy, Zomato, AePS)
\n### 4.6 Offline Functionality
- Cache last 50 verifications using AsyncStorage
- Offline QR code display for delivery persons
- Queue incident reports for sync when online

## 5. Design Specifications

### 5.1 Color Palette
- Primary Black: #000000
- White: #FFFFFF
- Verified Green: #10B981
- Pending Yellow: #F59E0B
- Danger Red: #EF4444\n- Tricolor Saffron: #FF9933
- Tricolor Green: #138808

### 5.2 Typography
- Heading: SF Pro Display Bold (iOS) / Roboto Bold (Android), 24-32pt
- Body: SF Pro Text Regular (iOS) / Roboto Regular (Android), 16pt
- Caption: SF Pro Text Medium (iOS) / Roboto Medium (Android), 14pt

### 5.3 Visual Style (Dribbble Travel App Match)
- Monochromatic black and white base with vibrant full-screen worker images
- Minimalist aesthetic with clean text hierarchy
- Large white cards with iOS-style shadows (elevation 4-8)
- Rounded corners: 16px for cards, 12px for buttons
- Subtle linear gradients for depth on hero sections

### 5.4 Animations & Interactions
- Cards slide up from bottom with smooth easing (300ms)
- Status badges pulse green when verified (infinite loop)
- QR scanner overlay fades in (200ms)
- Profile cards expand with scale (1.0 → 1.05) and shadow increase on press
- Haptic feedback on all button interactions
- Skeleton loading states for all data fetching
- Pull-to-refresh with custom tricolor spinner

### 5.5 UI Components
- Large white cards with shadow elevation\n- iOS-style navigation with large titles
- Bottom tab navigation for multi-screen dashboards
- Dynamic Type support for accessibility
- Automatic dark mode toggle (system preference)
\n## 6. App Store Information

### 6.1 App Icon
Tricolor shield with checkmark symbol in center

### 6.2 App Store Name
Surakshit Bharat - Verify Instantly

### 6.3 App Store Description\nNational gig worker verification platform. Scan QR codes to instantly verify delivery persons, service workers, and gig economy professionals. Features police verification, background checks, and real-time safety alerts.\n
## 7. Deployment & Setup

### 7.1 Frontend Deployment
- Command: npx expo start\n- Hot Module Replacement enabled
- Live reload for development
\n### 7.2 Backend Deployment
- Command: npm run dev
- Environment variables in .env file (mock JWT secrets included)
- Docker Compose for PostgreSQL database

### 7.3 One-Command Setup
- Clone repository
- Run setup script: ./setup.sh
- Frontend and backend start automatically
- Mock data seeded in database

## 8. Deliverables

### 8.1 Project Structure
```
surakshit-bharat/
├── frontend/ (React Native + Expo)
│   ├── src/screens/ (19 screen files)
│   ├── src/components/ (Design system components)
│   ├── src/services/ (API calls)
│   ├── src/navigation/ (Role-based navigation)
│   ├── App.tsx\n│   └── package.json
├── backend/ (Node.js + Express)
│   ├── src/routes/ (API routes)
│   ├── src/models/ (Database models)
│   ├── src/controllers/ (Business logic)
│   ├── src/middleware/ (Auth, validation)
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
- All 19 screen implementations
- Complete design system with reusable components
- Full backend API with 15+ endpoints
- Database schema with relationships
- Authentication middleware
- Mock data seeding scripts
- Expo configuration for deployment

### 8.3 Documentation
- README with setup instructions
- API documentation
- Database schema diagram
- Design system guidelines
\n## 9. Additional Features

### 9.1 Push Notifications
- Delivery persons receive verification request notifications
- Company admins receive staff approval notifications
- Police receive high-risk alerts

### 9.2 WhatsApp Integration
- Share verification results via WhatsApp
- Share QR codes via WhatsApp
\n### 9.3 Bilingual Support
- All UI text in Hindi + English
- Language toggle in settings
- Default language based on device settings

### 9.4 Accessibility
- VoiceOver/TalkBack support\n- Dynamic Type support
- High contrast mode
- Haptic feedback for visually impaired users