# Surakshit Bharat - Complete Screen Documentation

## Overview
Surakshit Bharat is a comprehensive worker verification system with **4 separate user dashboards** for different roles. Total: **19 screens**.

---

## 🎯 Role Selection Flow

### 1. Splash Screen (`/`)
- **Purpose**: App loading screen with Indian tricolor animation
- **Duration**: 2.5 seconds
- **Next**: Automatically redirects to Role Selection

### 2. Role Selection Screen (`/role-selection`)
- **Purpose**: Choose user role
- **Options**:
  - 👤 **Resident** - Verify delivery persons & workers (No login required)
  - 🚚 **Delivery Person** - Access profile & QR code (Phone OTP login)
  - 🏢 **Company Admin** - Manage staff & verifications (Email + Password)
  - 🛡️ **Police Admin** - Law enforcement dashboard (Police ID + OTP)

---

## 👤 RESIDENT DASHBOARD (6 Screens) - No Login Required

### 3-8. Resident Screens
- Home, QR Scanner, Verification Result, Worker Profile, Search Results
- Same as before, no changes needed

---

## 🚚 DELIVERY PERSON DASHBOARD (5 Screens)

### 9. Delivery Login (`/delivery/login`)
- Phone OTP authentication
- Demo: 9876543210 / OTP: 123456

### 10. Delivery Dashboard (`/delivery/dashboard`)
- Profile summary, stats, quick access to QR/Profile/History

### 11. Delivery QR Screen (`/delivery/qr`)
- Large scannable QR code with download/share

---

## 🏢 COMPANY ADMIN DASHBOARD (4 Screens)

### 12. Company Login (`/company/login`)
- Email + Password
- Demo: admin@swiggy.com / admin123

### 13. Company Dashboard (`/company/dashboard`)
- Stats, staff management, incident reports

### 14. Company Staff List (`/company/staff`)
- Search, filter, approve/reject staff

---

## 🛡️ POLICE DASHBOARD (4 Screens)

### 15. Police Login (`/police/login`)
- Police ID + OTP
- Demo: MH01-12345 / 123456

### 16. Police Dashboard (`/police/dashboard`)
- Global search, risk dashboard, quick filters

### 17. Police Search (`/police/search`)
- Search results with law enforcement details

### 18. Police Person Detail (`/police/person/:id`)
- Complete profile with criminal history and police actions

---

## 🎯 Demo Credentials

| Role | Credentials |
|------|-------------|
| Resident | No login required |
| Delivery | Phone: 9876543210, OTP: 123456 |
| Company | admin@swiggy.com / admin123 |
| Police | MH01-12345 / 123456 |

**Built with**: React + TypeScript + Tailwind CSS + shadcn/ui + Vite
