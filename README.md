# Beneficiary Management System

A comprehensive Angular-based web application for managing beneficiaries with role-based access control, authentication, and rating system.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [User Stories](#user-stories)
- [API Documentation](#api-documentation)
- [Components Overview](#components-overview)
- [Authentication & Authorization](#authentication--authorization)
- [Deployment & CI/CD](#deployment--cicd)

## 🎯 Overview

The Beneficiary Management System is a modern web application built with Angular 17 that allows organizations to manage beneficiaries effectively. The system provides different access levels for administrators and beneficiaries, enabling secure user management, profile handling, and a rating system for beneficiaries.

## ✨ Features

- **User Authentication & Authorization**
  - Role-based access control (Admin, Beneficiary)
  - JWT token-based authentication
  - Route guards for protected routes

- **Beneficiary Management**
  - Create, read,  beneficiary profiles
  - Advanced search and filtering capabilities
  - Rating system for beneficiaries
  - Profile management with detailed information

- **Admin Features**
  - User management and approval system
  - Pending request management
  - Creation beneficiaries

- **Modern UI/UX**
  - Responsive design with Bootstrap 5
  - PrimeNG components for enhanced UI
  - FontAwesome icons

## 🛠 Technology Stack

### Frontend
- **Angular 17** - Main framework
- **TypeScript** - Programming language
- **Bootstrap 5** - CSS framework
- **Tailwind CSS** - Utility-first CSS framework
- **PrimeNG** - UI component library
- **FontAwesome** - Icon library
- **RxJS** - Reactive programming library

### Backend Integration
- **Angular In-Memory Web API** - Mock backend for development
- **HTTP Client** - API communication
- **Express.js** - Server-side rendering support

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── models/             # Data models
│   │   ├── services/           # Core services
│   │   ├── guards/             # Route guards
│   │   └── interceptors/       # HTTP interceptors
│   ├── modules/
│   │   ├── auth/               # Authentication module
│   │   └── beneficiaries/      # Beneficiary management module
│   └── shared/                 # Shared components, pipes, directives
├── assets/                     # Static assets
│   └── i18n/                   # Internationalization files
└── environments/               # Environment configurations
```

## 📖 User Stories

### 🔐 Authentication & User Management

#### Story 1: User Registration
**As a** new user  
**I want to** register for an account  
**So that** I can access the beneficiary management system

**Acceptance Criteria:**
- User can fill out registration form with username, email, and password
- System validates email format and password strength
- New registrations are added to pending requests for admin approval
- User can  login  after confirmation from admin

#### Story 2: User Login
**As a** registered user  
**I want to** log into the system  
**So that** I can access my dashboard and features

**Acceptance Criteria:**
- User can enter username and password
- System authenticates credentials
- Successful login redirects to appropriate dashboard based on role
- Invalid credentials show appropriate error message
- JWT token is stored for session management

#### Story 3: Admin User Approval
**As an** administrator  
**I want to** approve or reject pending user registrations  
**So that** I can control system access

**Acceptance Criteria:**
- Admin can view list of pending registration requests
- Admin can approve or reject each request
- Approved users can log in to the system
- Rejected users cant log in to the system

### 👥 Beneficiary Management

#### Story 4: View Beneficiary List
**As a** user  
**I want to** view a list of all beneficiaries  
**So that** I can browse available beneficiaries

**Acceptance Criteria:**
- Display paginated list of beneficiaries
- Show key information: name, age, gender, rating
- Implement search functionality by name 
- Include sorting options (name, age, rating)
- Responsive design for mobile and desktop

#### Story 5: Add New Beneficiary
**As an** administrator  
**I want to** add new beneficiaries to the system  
**So that** they can be included in the management platform

**Acceptance Criteria:**
- Form includes: name, age, gender, contact info, budget, power
- All required fields are validated
- Email format validation
- Age must be a positive number
- Budget and power must be numeric values
- Success message displayed after creation



### ⭐ Rating System

#### Story6: Rate Beneficiary
**As a** logged-in user  
**I want to** rate beneficiaries  
**So that** I can provide feedback on their performance

**Acceptance Criteria:**
- Rating scale from 1 to 5 stars
- Users cannot rate themselves
- One rating per user per beneficiary
- Real-time update of average rating

#### Story7: View Beneficiary Ratings
**As a** user  
**I want to** see beneficiary ratings and reviews  
**So that** I can make informed decisions

**Acceptance Criteria:**
- Display average rating prominently
- Show number of total ratings
- Rating breakdown by star level
- Sort beneficiaries by rating




### 📱 Responsive Design

#### Story 8: Mobile Accessibility
**As a** mobile user  
**I want to** access all features on my mobile device  
**So that** I can manage beneficiaries on the go

**Acceptance Criteria:**
- All pages are mobile-responsive
- Touch-friendly interface elements
- Optimized performance on mobile networks
- Consistent functionality across devices
- Mobile-specific navigation patterns

## 🔗 API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Authenticate user and receive access token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "Admin | Beneficiary"
  },
  "token": "jwt_token_string"
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid credentials
- `400` - Invalid request format

#### POST /api/auth/logout
Log out current user and invalidate token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Successfully logged out"
}
```

### User Management Endpoints

#### POST /api/users
Create new user (registration).

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "Admin | Beneficiary"
}
```

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "Admin | Beneficiary",
  "status": "pending"
}
```

#### GET /api/users/pending
Get all pending user registration requests (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "Admin | Beneficiary",
    "requestDate": "ISO_date_string",
    "status": "pending"
  }
]
```

#### PUT /api/users/:id/approve
Approve pending user registration (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "User approved successfully",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "Admin | Beneficiary",
    "status": "approved"
  }
}
```

### Beneficiary Management Endpoints

#### GET /api/beneficiaries
Retrieve all beneficiaries with optional filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for name or email
- `sortBy` (optional): Field to sort by (name, age, rating)
- `sortOrder` (optional): asc or desc

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "age": "number",
      "gender": "Male | Female | Other",
      "contactInfo": {
        "email": "string",
        "phone": "string",
        "address": "string"
      },
      "budget": "number",
      "power": "number",
      "ratings": {
        "totalScore": "number",
        "numberOfRatings": "number"
      }
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalItems": "number",
    "itemsPerPage": "number"
  }
}
```

#### GET /api/beneficiaries/:id
Retrieve specific beneficiary by ID.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "age": "number",
  "gender": "Male | Female | Other",
  "contactInfo": {
    "email": "string",
    "phone": "string",
    "address": "string"
  },
  "budget": "number",
  "power": "number",
  "ratings": {
    "totalScore": "number",
    "numberOfRatings": "number"
  }
}
```

#### POST /api/beneficiaries
Create new beneficiary (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "string",
  "age": "number",
  "gender": "Male | Female | Other",
  "contactInfo": {
    "email": "string",
    "phone": "string",
    "address": "string (optional)"
  },
  "budget": "number",
  "power": "number"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "age": "number",
  "gender": "Male | Female | Other",
  "contactInfo": {
    "email": "string",
    "phone": "string",
    "address": "string"
  },
  "budget": "number",
  "power": "number",
  "ratings": {
    "totalScore": 0,
    "numberOfRatings": 0
  }
}
```

#### PUT /api/beneficiaries/:id
Update existing beneficiary.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "string (optional)",
  "age": "number (optional)",
  "gender": "Male | Female | Other (optional)",
  "contactInfo": {
    "email": "string (optional)",
    "phone": "string (optional)",
    "address": "string (optional)"
  },
  "budget": "number (optional)",
  "power": "number (optional)"
}
```

#### DELETE /api/beneficiaries/:id
Delete beneficiary (Admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Beneficiary deleted successfully"
}
```

### Rating System Endpoints

#### POST /api/beneficiaries/:id/rate
Rate a beneficiary.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "raterId": "string",
  "rating": "number (1-5)"
}
```

**Response:**
```json
{
  "message": "Rating submitted successfully",
  "beneficiary": {
    "id": "string",
    "ratings": {
      "totalScore": "number",
      "numberOfRatings": "number"
    }
  }
}
```

#### GET /api/beneficiaries/:id/rating/:raterId
Get user's rating for specific beneficiary.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "rating": "number | null"
}
```

### Error Responses

All endpoints may return the following error responses:

#### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request format or missing required fields",
  "details": [
    "Specific validation error messages"
  ]
}
```

#### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

#### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions for this operation"
}
```

#### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Requested resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## 🧩 Components Overview

### Core Components

#### AuthService
Handles user authentication, token management, and user session state.

**Key Methods:**
- `login(username, password)` - Authenticate user
- `logout()` - Clear user session
- `registerBeneficiary(payload)` - Register new beneficiary
- `getCurrentUser()` - Get current authenticated user

#### BeneficiaryService
Manages all beneficiary-related operations and API calls.

**Key Methods:**
- `getAllBeneficiaries()` - Fetch all beneficiaries
- `getBeneficiaryById(id)` - Fetch specific beneficiary
- `createBeneficiary(payload)` - Create new beneficiary
- `updateBeneficiary(id, payload)` - Update beneficiary
- `deleteBeneficiary(id)` - Delete beneficiary
- `rateBeneficiary(raterId, targetId, rating)` - Submit rating

### Feature Modules

#### Authentication Module
- **AuthFormComponent** - Login and registration forms
- **AuthGuard** - Protect routes requiring authentication
- **RoleGuard** - Protect routes based on user roles

#### Beneficiaries Module
- **ListBeneficiariesComponent** - Display beneficiary list with search/filter
- **AddBeneficiaryComponent** - Form for creating new beneficiaries
- **ProfileBeneficiaryComponent** - Display and edit beneficiary details
- **RatingDialogComponent** - Modal dialog for rating submission
- **PendingRequestsComponent** - Admin interface for user approvals

### Shared Components

#### Navigation
- **NavbarComponent** - Main navigation bar
- **FooterComponent** - Application footer

#### Utility Components
- **SpinnerComponent** - Loading indicator
- **NotFoundComponent** - 404 error page

#### Layout Components
- **LayoutComponent** - Main application layout wrapper

### Directives

#### HasRoleDirective
Conditionally show/hide elements based on user role.

```html
<button *hasRole="'Admin'">Admin Only Button</button>
```

#### HighlightOnDirective
Add hover effects and styling to elements.

### Pipes

#### SearchPipe
Filter arrays based on search criteria.

```html
{{ beneficiaries | search:'name':'searchTerm' }}
```

#### SortPipe
Sort arrays by specified field and order.

```html
{{ beneficiaries | sort:'name':'asc' }}
```

## 🔐 Authentication & Authorization

### JWT Token Management
- Tokens are stored in localStorage
- Automatic token inclusion in HTTP requests via interceptors
- Token expiration handling with automatic logout

### Role-Based Access Control
- **Admin Role**: Full access to all features
  - User management and approval
  - CRUD operations on beneficiaries
  - System administration
  
- **Beneficiary Role**: Limited access
  - View beneficiary list
  - Rate other beneficiaries

### Route Protection
```typescript
{
  path: 'admin',
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['Admin'] }
}
```

## 🚀 Deployment & CI/CD

### Automated CI/CD Pipeline

This project is configured with automated deployment to DigitalOcean App Platform. The application automatically deploys to the production environment when changes are pushed to the `main` branch.

#### 🌐 Live Application
**Production URL:** https://hammerhead-app-owbjh.ondigitalocean.app/

#### 📋 CI/CD Workflow

The deployment process follows these steps:

1. **Code Push to Main Branch**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Automatic Deployment Trigger**
   - DigitalOcean App Platform detects changes in the main branch
   - Automatically starts the build and deployment process
   - No manual intervention required

3. **Build Process**
   - Installs dependencies: `npm install`
   - Runs production build: `npm run build`
   - Optimizes assets and creates distribution files
   - Runs any configured tests (optional)

4. **Deployment Process**
   - Deploys the built application to DigitalOcean servers
   - Updates the live application at the production URL
   - Performs health checks to ensure successful deployment

