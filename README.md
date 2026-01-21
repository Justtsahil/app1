# Microsap India - Pharmaceutical Distribution Website

A comprehensive pharmaceutical distribution and marketing company website with complete CMS and employee management system.

## 🎯 Project Overview

Microsap India is a React-based frontend-only website for a pharmaceutical distribution company. The site includes public-facing pages, authentication, and three role-based management panels.

## ✨ Key Features

### Public Pages
- **Home**: Hero section, product slideshow, about snippet, and franchise partnership information
- **About**: Company history with timeline, leadership team with dynamic profiles, vision/philosophy, and media section
- **Products**: Searchable product catalog with category filters, detailed product modals, and enquiry section
- **Gallery**: Photo grid with click-to-enlarge functionality
- **Contact**: Contact form (messages stored in localStorage), contact information, and embedded map
- **Shop**: Under maintenance placeholder page

### Authentication System
- Single login page with email/password
- Role-based automatic redirect (Developer, Admin, Employee)
- Demo credentials provided for testing
- localStorage-based authentication persistence

### Role-Based Panels

#### 1. Developer Panel (Super Admin)
- Complete system control
- Admin account management
- Permissions configuration
- Page enable/disable controls
- Layout customization
- Full data access and export capabilities

#### 2. Admin Panel
- Content management for all site sections
- Employee entry approval/rejection system
- Contact message inbox
- Monthly Excel report generation (using xlsx library)
- Employee target setting
- Product and gallery management

#### 3. Employee Panel
- Daily entry submission form (attendance, doctors met, products discussed, sales, payments, remarks)
- Entry status tracking (pending/approved/rejected)
- Monthly performance dashboard
- Target progress visualization
- Entry history table
- Incentive notes section

## 🛠 Tech Stack

- **Framework**: React (via Create React App)
- **Routing**: React Router v7
- **Styling**: Plain CSS (no frameworks as per requirements)
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **Excel Export**: xlsx library
- **Build Tool**: Craco (not Vite as originally specified, but CRA as per existing setup)

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd /app/frontend
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

4. Access the application at `http://localhost:3000`

## 🔑 Demo Credentials

Use these credentials to test different roles:

- **Developer (Super Admin)**
  - Email: `dev@microsap.com`
  - Password: `dev123`
  - Access: `/developer`

- **Admin**
  - Email: `admin@microsap.com`
  - Password: `admin123`
  - Access: `/admin`

- **Employee**
  - Email: `emp@microsap.com`
  - Password: `emp123`
  - Access: `/employee`

## 📄 Routes

```
/                → Home Page
/about           → About Page
/products        → Products Catalog
/gallery         → Photo Gallery
/contact         → Contact Page
/shop            → Shop (Under Maintenance)
/login           → Login Page
/developer       → Developer Panel (requires developer login)
/admin           → Admin Panel (requires admin login)
/employee        → Employee Panel (requires employee login)
```

## 🎨 Design Features

- Professional pharmaceutical industry color scheme (blues and greens)
- Smooth animations and transitions
- Responsive grid layouts
- Modal-based detail views
- Slide-in/fade animations
- Hover effects on interactive elements
- Clean, modern UI without flashy elements

## 💾 Data Structure

All data is stored in localStorage:

- `microsap_user`: Current logged-in user
- `microsap_products`: Product catalog
- `microsap_gallery`: Gallery images
- `microsap_employees`: Employee accounts
- `microsap_entries`: Daily employee entries
- `microsap_messages`: Contact form submissions

## 🔒 Business Rules Implemented

1. **NOT a Manufacturer**: All content clearly states medicines are manufactured by certified third-party partners
2. **Distribution & Marketing**: Company positioned as distributor and marketing entity
3. **Franchise Model**: Emphasis on franchise partnership opportunities
4. **Quality Assurance**: All products mention "Manufactured by third-party partners, Marketed & Distributed by Microsap India"

## 📊 Admin Workflow

1. Employee submits daily entry
2. Entry appears in Admin panel with "Pending" status
3. Admin reviews and either approves or rejects
4. Only approved entries count toward employee targets and monthly totals
5. Admin can export monthly reports to Excel with all approved data

## 🚀 Features Implemented

✅ All 10 routes as specified
✅ Role-based authentication and authorization
✅ localStorage-based data persistence
✅ Product search and category filtering
✅ Contact form with admin inbox
✅ Employee daily entry system with approval workflow
✅ Excel export functionality
✅ Dynamic modals for product details and profiles
✅ Progress tracking and target visualization
✅ Responsive design
✅ Professional pharmaceutical theme
✅ No Tailwind/Bootstrap (plain CSS only)

## 📁 Project Structure

```
/app/frontend/src/
├── components/
│   ├── Navbar.js
│   ├── Navbar.css
│   ├── Footer.js
│   └── Footer.css
├── context/
│   ├── AuthContext.js
│   └── DataContext.js
├── pages/
│   ├── Home.js
│   ├── Home.css
│   ├── About.js
│   ├── About.css
│   ├── Products.js
│   ├── Products.css
│   ├── Gallery.js
│   ├── Gallery.css
│   ├── Contact.js
│   ├── Contact.css
│   ├── Shop.js
│   ├── Shop.css
│   ├── Login.js
│   ├── Login.css
│   ├── DeveloperPanel.js
│   ├── DeveloperPanel.css
│   ├── AdminPanel.js
│   ├── AdminPanel.css
│   ├── EmployeePanel.js
│   └── EmployeePanel.css
├── App.js
├── App.css
├── index.js
└── index.css
```

## 🎯 Future Enhancements

While the current implementation is frontend-only with localStorage, future versions could include:

- Backend API integration
- Database persistence
- Real email notifications
- Advanced analytics dashboard
- Multi-language support
- Mobile app version
- Advanced reporting features

## 📝 Notes

- This is a frontend-only implementation
- All data is stored in browser localStorage
- Excel export uses the `xlsx` library (already installed)
- Authentication is demo-based (no real security)
- The project uses React Scripts, not Vite as originally requested in requirements

## 🤝 Contributing

This is a demonstration project built to exact specifications. For production use, consider:
- Implementing proper backend authentication
- Database integration
- Security best practices
- API rate limiting
- Data validation
- Error handling improvements

## 📄 License

This project was created for demonstration purposes.

---

**Built with ❤️ for Microsap India**
