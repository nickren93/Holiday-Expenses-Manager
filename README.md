# Holiday Expenses Manager
*A React + Flask full-stack application for tracking holiday-based and category-based expenses.*

---

## Overview

**Holiday Expenses Manager** is a full-stack expense-tracking application built with:

- **React (Frontend)**
- **Flask + SQLAlchemy (Backend)**
- **SQLite / PostgreSQL** compatible database
- RESTful API architecture
- Custom form validation (Yup + Flask validators)

The app allows users to:

- Create and manage **holidays** (with year-based grouping)
- Log **expenses** associated with both a **holiday** and a **category**
- View expenses grouped by **Holiday → Year**
- View expenses grouped by **Category**
- Edit and delete expenses from multiple contexts
- Automatically maintain correctness of state across Holidays/Categories
- Fully authenticated workflow (Signup → Login → Dashboard)

---

## Key Features

### User Accounts
- Signup / Login / Logout
- Secure password hashing using **bcrypt**
- Session-based authentication

### Holiday Management
- Holidays grouped automatically by **year**
- Creating a new expense can **auto-create** a new holiday
- Holidays update dynamically when expenses change
- Automatic deletion of holidays with zero expenses

### Category Management
- All expenses assigned to a category
- Auto-create new categories when logging an expense
- Categories disappear automatically when empty
- Category-specific expense list view

### Expense Management
- Create, edit, and delete expenses
- Validation on amount, date, year, holiday, and category
- Editing an expense updates **all related lists** (holiday + category + combined state)
- Prevents invalid dates (must match chosen holiday year)
- Prevents zero-dollar entries

### Fully Synced Navigation
- Homepage dashboard
- My Holidays (grouped by year)
- My Categories
- Holiday → Expense detail views
- Category → Expense detail views
- Smart state updates without hard refresh

---

## Tech Stack

### Frontend
- React  
- React Router  
- Context API  
- Formik + Yup  
- Custom reusable components  
- CSS modules and custom theming  

### Backend
- Flask  
- Flask-RESTful  
- Flask-SQLAlchemy  
- Flask-Migrate  
- Flask-Marshmallow  
- Bcrypt  

### Database
- SQLite (development)  
- PostgreSQL (production-ready)  

---

## Project Structure
Holiday-Expenses-Manager/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── styles/
│ │ ├── pages/
│ │ └── App.js
│ └── package.json
│
├── server/ # Flask backend
│ ├── app.py
│ ├── models.py
│ ├── config.py
│ ├── seed.py
│ └── migrations/
│
├── README.md
└── requirements.txt

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/Holiday-Expenses-Manager.git
cd Holiday-Expenses-Manager
```


### 2. Backend Setup

#### Create virtual environment:
```bash
cd server
pipenv install
pipenv shell
```

#### Initialize database:
```bash
flask db init
flask db migrate -m "Initial tables"
flask db upgrade
```

#### Run Flask server:
```bash
flask run
```

### 3. Frontend Setup

#### Open a new terminal:
```bash
cd client
npm install
npm start
```

Frontend runs at: http://localhost:3000
Backend runs at: http://localhost:5555
