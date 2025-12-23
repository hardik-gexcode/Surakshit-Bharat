# Surakshit Bharat - Application Screens Summary

## Screen Flow

```
Splash Screen (/)
    ↓ (auto-redirect after 2.5s)
Home Screen (/home)
    ↓ (3 verification methods)
    ├─→ QR Scanner Screen (/scanner)
    │       ↓
    │   Verification Result (/verify/:id)
    │
    ├─→ Enter ID → Verification Result (/verify/:id)
    │
    └─→ Search by Name → Search Results (/search)
                              ↓
                    Verification Result (/verify/:id)
                              ↓
                    Worker Profile (/profile/:id)
```

## Screen Details

### 1. Splash Screen (/)
- **Purpose:** App introduction and branding
- **Features:**
  - Surakshit Bharat logo with tricolor animation
  - Bilingual tagline (Hindi + English)
  - Animated tricolor loading spinner
  - Auto-redirect to home after 2.5 seconds
- **Design:** Minimalist with Indian flag colors

### 2. Home Screen (/home)
- **Purpose:** Main entry point for verification
- **Features:**
  - App header with logo
  - Hero image of verified delivery person
  - Three verification method cards:
    1. Scan QR Code (camera icon)
    2. Enter ID Number (with input field)
    3. Search by Name (with search field)
  - Footer with tricolor branding
- **Design:** Card-based layout with slide-up animations

### 3. QR Scanner Screen (/scanner)
- **Purpose:** Scan worker QR codes
- **Features:**
  - Camera view simulation with overlay frame
  - Scanner corners animation
  - File upload option for QR code images
  - Manual ID entry fallback
  - Demo worker ID quick access buttons
  - Instructions card
- **Design:** Full-screen scanner with green accent corners

### 4. Verification Result Screen (/verify/:id)
- **Purpose:** Display worker verification status
- **Features:**
  - Full-screen worker photo with status overlay
  - Animated verification badge (pulse effect for verified)
  - Worker name (English + Hindi)
  - Rating and company information
  - Large status card (SAFE TO ALLOW / WARNING / DO NOT ALLOW)
  - Verification details:
    - Police Verified status
    - Aadhaar Linked status
    - Risk Level badge
    - Employment duration
  - Contact information (phone, address)
  - Visit count
  - Action buttons:
    - Allow Entry
    - Report Issue
    - View Full Profile
- **Design:** Status-based color coding (green/orange/red)

### 5. Worker Profile Screen (/profile/:id)
- **Purpose:** Detailed worker information
- **Features:**
  - Profile header with photo and basic info
  - Verification details card:
    - Worker ID
    - Risk level
    - Police verification status
    - Aadhaar link status
    - Background check status
    - Employment duration
    - Last verified timestamp
  - Contact information card:
    - Phone number
    - Address
    - Emergency contact
  - Visit history timeline:
    - Recent visits with dates/times
    - Location details
    - Resident names
    - Purpose of visit
  - QR code display:
    - Large scannable QR code
    - Bilingual instructions
- **Design:** Scrollable profile with organized sections

### 6. Search Results Screen (/search)
- **Purpose:** Display search results for worker name queries
- **Features:**
  - Search bar with real-time search
  - Results count display
  - Worker cards with:
    - Profile photo
    - Name (English + Hindi)
    - Rating and visit count
    - Company badge
    - Worker ID
    - Verification badges
  - Empty state for no results
  - Click to view verification details
- **Design:** List view with animated card entries

### 7. Report Issue Dialog (Modal)
- **Purpose:** Report concerns about workers
- **Features:**
  - Issue category dropdown:
    - Suspicious Behavior
    - Rude Conduct
    - Unauthorized Access
    - Theft or Missing Items
    - Safety Concern
    - Fake Identity
    - Other
  - Description textarea
  - Confidentiality notice
  - Submit/Cancel actions
  - Success toast notification
- **Design:** Modal dialog with form validation

## Key Components

### Status Badges
- **Verified:** Green with checkmark, pulse animation
- **Pending:** Orange with warning icon
- **Blacklisted:** Red with X icon

### Navigation
- Back buttons on all sub-screens
- Automatic routing based on actions
- Deep linking support for direct verification

### Animations
- Tricolor spinner on splash screen
- Slide-up animations for cards
- Pulse effect for verified badges
- Fade-in transitions
- Smooth page transitions

## Mock Data

### Workers
1. **Rahul Kumar (SW001)**
   - Company: Swiggy
   - Rating: 4.8
   - Status: Verified
   - Visits: 247

2. **Priya Sharma (ZM002)**
   - Company: Zomato
   - Rating: 4.9
   - Status: Verified
   - Visits: 189

3. **Rajesh Yadav (AE003)**
   - Company: AePS Banking Agent
   - Rating: 4.6
   - Status: Verified
   - Visits: 412

## Color System

### Primary Colors
- Black (#000000) - Primary actions, text
- White (#FFFFFF) - Background, cards
- Green (#10B981) - Verified status
- Orange (#F59E0B) - Warning status
- Red (#EF4444) - Danger/Blacklisted status

### Tricolor (Indian Flag)
- Saffron (#FF9933) - Top stripe
- White (#FFFFFF) - Middle stripe
- Green (#138808) - Bottom stripe

## Typography
- **Headings:** Bold, 24-32px
- **Body:** Regular, 16px
- **Captions:** Medium, 14px
- **Bilingual:** English + Hindi (Devanagari script)

## Responsive Design
- Mobile-first approach
- Touch-friendly buttons (min 44px)
- Optimized for portrait orientation
- Smooth scrolling
- Pull-to-refresh ready

## Accessibility
- High contrast text
- Large touch targets
- Clear visual hierarchy
- Status indicators with icons
- Bilingual support

## Future Enhancements (Not Implemented)
- Real camera QR scanning
- Live database integration
- Push notifications
- Offline mode with caching
- Admin dashboard
- Worker login portal
- Real-time updates
- WhatsApp sharing
- Multi-language support beyond Hindi/English
