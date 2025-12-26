# Surakshit Bharat (सुरक्षित भारत)

## Application Overview

**Surakshit Bharat** is a comprehensive national gig worker verification platform for India with **4 separate user dashboards** for different roles. The system enables residents to verify workers, delivery persons to manage their profiles, companies to manage staff, and police to monitor security risks.

**Tagline:** हर विज़िटर सत्यापित | Every Visitor Verified

## 🎯 Four User Dashboards

### 1. 👤 Resident Dashboard (No Login Required)
- ✅ **Quick Verification** - QR code scanning, ID entry, or name search
- ✅ **Instant Results** - Real-time verification with worker photo and status
- ✅ **Detailed Profiles** - Police verification, employment history, ratings
- ✅ **Safety Actions** - Allow entry or report issue
- ✅ **Visit History** - Timeline of worker's recent visits

### 2. 🚚 Delivery Person Dashboard (Phone OTP Login)
- ✅ **Personal QR Code** - Large scannable QR for residents
- ✅ **Profile Management** - View verification status and details
- ✅ **Visit History** - Track delivery history
- ✅ **Documents** - Access to verification documents
- ✅ **Today's Stats** - Deliveries and active hours

### 3. 🏢 Company Admin Dashboard (Email + Password Login)
- ✅ **Staff Management** - View, approve, reject staff members
- ✅ **Analytics** - Total staff, verification rates, trends
- ✅ **Bulk Upload** - Upload multiple staff at once
- ✅ **Incident Reports** - Monitor and review incidents
- ✅ **Search & Filter** - Find staff by name or ID

### 4. 🛡️ Police Super Admin Dashboard (Police ID + OTP Login)
- ✅ **Global Search** - Search by name, phone, or worker ID
- ✅ **Risk Dashboard** - High risk, blacklisted, under watch
- ✅ **Person Details** - Complete profile with criminal history
- ✅ **Police Actions** - Blacklist, watch list, clear status
- ✅ **Activity Feed** - Recent incidents and alerts

## 📊 Demo Credentials

| Role | Login Method | Credentials |
|------|-------------|-------------|
| **Resident** | None | No login required - direct access |
| **Delivery** | Phone + OTP | Phone: `9876543210`, OTP: `123456` |
| **Company** | Email + Password | Email: `admin@swiggy.com`, Password: `admin123` |
| **Police** | Police ID + OTP | Police ID: `MH01-12345`, OTP: `123456` |

## 📱 Total Screens: 19

1. Splash Screen
2. Role Selection
3-8. Resident Dashboard (6 screens)
9-13. Delivery Dashboard (5 screens)
14-17. Company Dashboard (4 screens)
18-19. Police Dashboard (4 screens)

## Technology Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Library:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **QR Code:** qrcode library
- **Authentication:** Mock authentication with localStorage
- **State Management:** React Context + Hooks

## Design System

### Color Palette
- **Saffron:** Indian flag top color
- **White:** Indian flag middle color
- **Green:** Indian flag bottom color
- **Verified:** Green (#10B981) - Trusted status
- **Warning:** Orange (#F59E0B) - Pending status
- **Danger:** Red (#EF4444) - Blacklisted/High risk
- **Primary:** Blue - Company admin theme

### Typography
- Clean, modern sans-serif fonts
- Large titles for mobile readability
- Bilingual support (English + Hindi)

### Visual Style
- Monochromatic black and white base
- Vibrant full-screen images
- Minimalist aesthetic with clean hierarchy
- Card-based layout with smooth transitions
- iOS-style shadows and rounded corners

## Project Info

## Project Directory

```
├── README.md # Documentation
├── components.json # Component library configuration
├── index.html # Entry file
├── package.json # Package management
├── postcss.config.js # PostCSS configuration
├── public # Static resources directory
│   ├── favicon.png # Icon
│   └── images # Image resources
├── src # Source code directory
│   ├── App.tsx # Entry file
│   ├── components # Components directory
│   ├── context # Context directory
│   ├── db # Database configuration directory
│   ├── hooks # Common hooks directory
│   ├── index.css # Global styles
│   ├── layout # Layout directory
│   ├── lib # Utility library directory
│   ├── main.tsx # Entry file
│   ├── routes.tsx # Routing configuration
│   ├── pages # Pages directory
│   ├── services # Database interaction directory
│   ├── types # Type definitions directory
├── tsconfig.app.json # TypeScript frontend configuration file
├── tsconfig.json # TypeScript configuration file
├── tsconfig.node.json # TypeScript Node.js configuration file
└── vite.config.ts # Vite configuration file
```

## Tech Stack

Vite, TypeScript, React, Supabase

## Development Guidelines

### How to edit code locally?

You can choose [VSCode](https://code.visualstudio.com/Download) or any IDE you prefer. The only requirement is to have Node.js and npm installed.

### Environment Requirements

```
# Node.js ≥ 20
# npm ≥ 10
Example:
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

### Installing Node.js on Windows

```
# Step 1: Visit the Node.js official website: https://nodejs.org/, click download. The website will automatically suggest a suitable version (32-bit or 64-bit) for your system.
# Step 2: Run the installer: Double-click the downloaded installer to run it.
# Step 3: Complete the installation: Follow the installation wizard to complete the process.
# Step 4: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### Installing Node.js on macOS

```
# Step 1: Using Homebrew (Recommended method): Open Terminal. Type the command `brew install node` and press Enter. If Homebrew is not installed, you need to install it first by running the following command in Terminal:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Alternatively, use the official installer: Visit the Node.js official website. Download the macOS .pkg installer. Open the downloaded .pkg file and follow the prompts to complete the installation.
# Step 2: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### After installation, follow these steps:

```
# Step 1: Download the code package
# Step 2: Extract the code package
# Step 3: Open the code package with your IDE and navigate into the code directory
# Step 4: In the IDE terminal, run the command to install dependencies: npm i
# Step 5: In the IDE terminal, run the command to start the development server: npm run dev -- --host 127.0.0.1
# Step 6: if step 5 failed, try this command to start the development server: npx vite --host 127.0.0.1
```

### How to develop backend services?

Configure environment variables and install relevant dependencies. If you need to use a database, please use the official version of Supabase.

## Usage Guide

### Quick Start
1. The app opens with a **Splash Screen** showing the Surakshit Bharat logo with tricolor animation
2. After 2.5 seconds, you'll be redirected to the **Home Screen**

### Verification Methods

#### Method 1: Scan QR Code
1. Click "Scan QR Code" on the home screen
2. Upload a QR code image or use the demo worker IDs (SW001, ZM002, AE003)
3. View instant verification results

#### Method 2: Enter ID Number
1. Type a worker ID in the "Enter ID Number" field (e.g., SW001, ZM002, AE003)
2. Click "Verify" button
3. View verification results with worker details

#### Method 3: Search by Name
1. Type a worker name in the "Search by Name" field (e.g., Rahul, Priya, Rajesh)
2. Click "Search" button
3. Browse search results and select a worker to verify

### Verification Result Screen
- View worker photo with verification status overlay
- See verification badges (Police Verified, Aadhaar Linked, Risk Level)
- Check contact information and visit history
- Actions: "Allow Entry" or "Report Issue"
- View full profile for detailed information

### Worker Profile Screen
- Complete worker information with photo
- Verification details and background check status
- Contact information (phone, address, emergency contact)
- Recent visit history timeline
- Worker's QR code for scanning

### Reporting Issues
1. Click "Report Issue" button on verification result screen
2. Select issue category (Suspicious Behavior, Rude Conduct, etc.)
3. Provide detailed description
4. Submit report for security team review

## Mobile-First Design

This app is optimized for mobile devices with:
- Touch-friendly interface
- Large, tappable buttons
- Smooth animations and transitions
- Responsive design for all screen sizes
- Fast loading and instant feedback

## Demo Data

The app uses mock data for demonstration purposes. In production, this would connect to a real verification database with:
- Live worker verification status
- Real-time background checks
- Actual visit history tracking
- Integration with police verification systems

## Learn More

You can also check the help documentation: Download and Building the app（ [https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en](https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en)）to learn more detailed content.

---

**Copyright © 2025 Surakshit Bharat**

*Making India Safer, One Verification at a Time*
=======
# Surakshit-Bharat
