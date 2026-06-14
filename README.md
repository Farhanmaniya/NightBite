# 🌙 NightBite — Food Delivery Web Application

<div align="center">

![NightBite Banner](https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop)

**A full-stack food delivery web application built with the MERN stack.**  
Order your favourite food, track orders, and manage everything from a powerful admin panel.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Author](#-author)

---

## 🍔 Overview

NightBite is a single-restaurant food delivery web application that allows customers to browse the menu, add items to cart, apply coupons, and place orders online. The platform includes a complete admin panel for managing menu items, orders, users, coupons, and site settings.

Built as an internship project at **MBIT, Gujarat** under mentor guidance.

---

## ✨ Features

### 👤 User Side
- 🔐 JWT-based authentication (register/login)
- 🏠 Home page with featured, popular & new items
- 🍽️ Full menu with category filter and search
- 🛒 Cart with quantity management
- 🎟️ Coupon code with discount validation
- 💳 Razorpay payment integration (test mode)
- 💵 Cash on delivery option
- 📦 Order history with real-time status
- 👤 Profile management with address saving
- 📧 Contact Us with email notification
- 📄 Terms & Conditions page
- 🌐 Browse without login

### 🛡️ Admin Panel
- 📊 Dashboard with real-time stats (orders, revenue, users, menu items)
- 📦 Order management with status updates
- 🍽️ Menu management with Cloudinary image upload
- 👥 User management with search
- 🎟️ Coupon management (create, toggle, delete)
- ⚙️ Site settings (hero headline, food emojis)
- 🔒 Role-based access control

### 🔧 Technical
- ✅ Protected routes (frontend + backend)
- ✅ Cloudinary image optimization (800x600, auto quality)
- ✅ Toast notifications
- ✅ Loader / Splash screen
- ✅ Responsive design
- ✅ 404 page
- ✅ Auto coupon deactivation on max uses
- ✅ Address auto-save from profile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS, Context API, React Router |
| **Backend** | Node.js, Express.js, REST API, MVC Architecture |
| **Database** | MongoDB Atlas, Mongoose |
| **Auth** | JWT, bcryptjs |
| **Images** | Cloudinary, Multer, Streamifier |
| **Payment** | Razorpay (test mode) |
| **Email** | Nodemailer (Gmail) |
| **Icons** | Lucide React, React Icons |
| **Notifications** | React Hot Toast |

---

## 📁 Project Structure

```
nightbite/
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── api/
│       │   └── axios.js        # Axios instance with interceptors
│       ├── components/
│       │   ├── admin/
│       │   │   ├── AdminLayout.jsx
│       │   │   └── AdminSidebar.jsx
│       │   ├── Button.jsx
│       │   ├── CategoryStrip.jsx
│       │   ├── Footer.jsx
│       │   ├── Hero.jsx
│       │   ├── Input.jsx
│       │   ├── Loader.jsx
│       │   ├── MenuCard.jsx
│       │   ├── Navbar.jsx
│       │   ├── OfferBanner.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── SplashScreen.jsx
│       ├── context/
│       │   └── CartContext.jsx  # Global cart state
│       ├── pages/
│       │   ├── admin/
│       │   │   ├── AdminCoupons.jsx
│       │   │   ├── AdminLogin.jsx
│       │   │   ├── AdminMenu.jsx
│       │   │   ├── AdminOrders.jsx
│       │   │   ├── AdminSettings.jsx
│       │   │   └── AdminUsers.jsx
│       │   ├── Cart.jsx
│       │   ├── Contact.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Menu.jsx
│       │   ├── NotFound.jsx
│       │   ├── Orders.jsx
│       │   ├── Profile.jsx
│       │   ├── Signup.jsx
│       │   └── Terms.jsx
│       ├── App.js
│       └── index.js
│
└── backend/                    # Node.js + Express API
    ├── config/
    │   ├── cloudinary.js
    │   ├── db.js
    │   ├── nodemailer.js
    │   └── razorpay.js
    ├── controllers/
    │   ├── authController.js
    │   ├── contactController.js
    │   ├── couponController.js
    │   ├── menuController.js
    │   ├── orderController.js
    │   ├── paymentController.js
    │   └── settingsController.js
    ├── middleware/
    │   ├── auth.js             # protect + adminOnly
    │   └── upload.js           # multer memoryStorage
    ├── models/
    │   ├── Coupon.js
    │   ├── MenuItem.js
    │   ├── Order.js
    │   ├── SiteSettings.js
    │   └── User.js
    ├── routes/
    │   ├── authRoute.js
    │   ├── contactRoute.js
    │   ├── couponRoute.js
    │   ├── menuRoute.js
    │   ├── orderRoute.js
    │   ├── paymentRoute.js
    │   └── settingsRoute.js
    ├── utils/
    │   └── uploadToCloudinary.js
    ├── .env
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Razorpay account (test mode)
- Gmail account (for Nodemailer)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Farhanmaniya/nightbite.git
cd nightbite
```

**2. Setup Backend**
```bash
cd backend
npm install
```

**3. Setup Frontend**
```bash
cd frontend
npm install
```

**4. Add environment variables** (see below)

**5. Run Backend**
```bash
cd backend
npm run dev
```

**6. Run Frontend**
```bash
cd frontend
npm start
```

---

## 🔐 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Frontend `.env`
```env
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/profile` | Protected |
| PUT | `/api/auth/profile` | Protected |
| GET | `/api/auth/users` | Admin |
| GET | `/api/auth/dashboard` | Admin |

### Menu
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/menu` | Public |
| GET | `/api/menu/:id` | Public |
| POST | `/api/menu` | Admin |
| PUT | `/api/menu/:id` | Admin |
| DELETE | `/api/menu/:id` | Admin |

### Orders
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/orders` | Protected |
| GET | `/api/orders/my` | Protected |
| GET | `/api/orders/all` | Admin |
| PUT | `/api/orders/:id` | Admin |

### Coupons
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/coupons/validate` | Protected |
| GET | `/api/coupons` | Admin |
| POST | `/api/coupons` | Admin |
| PUT | `/api/coupons/:id` | Admin |
| DELETE | `/api/coupons/:id` | Admin |

### Payment
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/payment/create-order` | Protected |
| POST | `/api/payment/verify` | Protected |

### Other
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/contact` | Public |
| GET | `/api/settings` | Public |
| PUT | `/api/settings` | Admin |

---

## 👨‍💻 Author

**Farhan Maniya**  
3rd Year Computer Engineering Student  
Madhuben & Bhanubhai Institute of Technology (MBIT), Gujarat

- 📧 farhanmaniya3578@gmail.com
- 🔗 [www.linkedin.com/in/farhan-maniya-9428222a6](#)
- 🐙 [https://github.com/Farhanmaniya](#)

---

<div align="center">
  Made with ❤️ in Gujarat, India 🇮🇳
  <br/>
  <b>🌙 NightBite — Good food, fast delivery.</b>
</div>
