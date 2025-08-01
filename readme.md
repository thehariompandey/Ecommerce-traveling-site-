# 🧭 Wandurlust

A dynamic travel listing and exploration web application built using **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can browse, create, edit, and delete travel listings, complete with images and interactive maps.

---

## 🚀 Features

- 🔐 User Authentication (Register/Login/Logout)
- 🧳 Create, edit, and delete travel listings
- 🗺️ View listing location on interactive maps (Mapbox)
- 🖼️ Upload and manage listing images (Cloudinary)
- 📝 Review system for listings
- 🧹 Clean and responsive UI using Bootstrap
- 🛡️ Secure and production-ready (Sanitization, error handling)

---

## 📸 Demo

> Hosted on **Render**  
[🔗 Live Website](https://your-wandurlust-link.com)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, Bootstrap
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js
- **File Uploads**: Multer + Cloudinary
- **Geocoding & Maps**: Mapbox
- **Hosting**: Render

---

## 🧑‍💻 Installation

1. **Clone the repo**

```bash
git clone https://github.com/your-username/wandurlust.git
cd wandurlust



## 2.Install dependencies
npm install


## 3.Set up environment variables

Create a .env file in the root directory and add:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

MAPBOX_TOKEN=your_mapbox_token

DB_URL=your_mongo_connection_string
SECRET=session_secret_key
Run the app


npx nodemon app.js
Visit: http://localhost:3000

## 🧪 Folder Structure
wandurlust/
│
├── app.js                 # Entry point
├── routes/                # Route definitions
├── models/                # Mongoose schemas
├── public/                # Static files (CSS/JS)
├── views/                 # EJS templates
├── middleware/            # Auth and custom middleware
├── utils/                 # Cloudinary & Mapbox utils
├── .env                   # Environment variables
├── .gitignore
└── README.md


## 📌 To-Do / Future Improvements
Search/filter listings

Email verification

Booking system integration

Improve responsive layout

Progressive Web App (PWA) features
