# Cap's FITNESS Website

A premium, app-like fitness coaching website with client intake, pricing, about, and blog functionality.

## Features

### 1. Landing Page (/)
- Modern hero section with gym-themed background
- Four navigation cards leading to:
  - Client Intake Form
  - Pricing Plans
  - About Us
  - Fitness Blog

### 2. Client Intake Form (/intake)
- 5-step multi-page form with progress indicator
- **Step 1: Personal Details** - Name, age, gender, phone, email
- **Step 2: Body & Lifestyle** - Height, weight, sleep, sitting hours, stress level (slider), activity level (with tooltip)
- **Step 3: Health Information** - Medical conditions, medications (conditional), surgeries (conditional), doctor consultation
- **Step 4: Goals & Training** - Primary goal, short/long term goals, motivation, training style, days per week, equipment (conditional for home training)
- **Step 5: Nutrition** - Eating pattern, foods loved/avoided (tag system), additional notes
- **Review Page** - Summary of all inputs with edit buttons for each step
- **Success Page** - Confirmation screen after submission
- Form data is automatically posted to Google Sheets via Apps Script API

### 3. Pricing Page (/pricing)
- Three coaching tiers: Starter ($99), Pro ($199), Elite ($399)
- Feature comparison for each plan
- Call-to-action buttons linking to intake form
- Custom plan inquiry section

### 4. About Page (/about)
- Company mission and story
- Core values with icons (Results-Driven, Personalized Care, Science-Based, Excellence)
- Why Choose Us section with 4 key differentiators
- CTA to complete intake

### 5. Fitness Blog (/blog)
- Displays all published blog posts
- Posts show: title, category badge, excerpt, author, date
- "Admin" button to access admin dashboard
- Seeded with 3 sample posts

### 6. Admin Dashboard (/admin)
- Create new blog posts with form (title, author, category, content)
- View and manage all published posts
- Delete posts functionality
- Facebook-style post management interface

## Technical Stack

### Frontend
- React with TypeScript
- Wouter for routing
- Tailwind CSS + Shadcn UI components
- TanStack Query for data fetching
- Framer Motion-ready for animations

### Backend
- Express.js API
- In-memory storage for blog posts
- Google Sheets integration for intake form submissions

### API Endpoints
- `POST /api/submit-intake` - Submit intake form to Google Sheets
- `GET /api/blog-posts` - Fetch all blog posts
- `GET /api/blog-posts/:id` - Fetch single blog post
- `POST /api/blog-posts` - Create new blog post
- `DELETE /api/blog-posts/:id` - Delete blog post

## Environment Variables
- `GOOGLE_SHEETS_API_URL` - Google Apps Script endpoint for intake submissions
- `GOOGLE_SHEETS_API_SECRET` - Secret key for authentication (CapSecret2025)

## Data Schema

### IntakeForm Data
All intake form fields are collected and sent to Google Sheets with:
- `_secret`: Authentication secret
- `formId`: "cap_form_v1"
- All form fields (name, age, email, goals, etc.)

### Blog Posts
- id: UUID
- title: string
- content: string
- author: string
- category: string (Fitness Tips, Nutrition, Strength Training, Recovery, Motivation, Workouts)
- imageUrl: string (optional)
- createdAt: timestamp

## Design Principles
- Purple/pink gradient theme for Cap's FITNESS brand
- Mobile-first responsive design
- Card-based UI with hover effects
- Smooth transitions between steps
- Premium fitness app aesthetic
- Clean typography (Inter/Poppins)

## Getting Started
1. Update `GOOGLE_SHEETS_API_URL` environment variable with your actual Apps Script URL
2. Run `npm run dev` to start development server
3. Visit homepage to navigate to different sections
4. Use /admin to create blog posts
5. Complete intake form to test Google Sheets integration
