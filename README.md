# 🪙 Hawker

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MySQL-orange)](https://www.mysql.com/)

The **Hawker** is a modern, full-stack digital licensing, monitoring, and compliance web application desired to ease the urban vending system. It is designed to bridge the gap between street vendors, municipal field inspectors, city corporation administrators, and system administrators. Hawker simplifies the license application and renewal workflow, automates field inspections, manages fee payments, and offers a specialized support network for women entrepreneurs.

---

## 🚀 Key Features by User Role

### 👤 Street Vendors
*   **Profile & Document Management:** Upload, update, and manage official business profile details and required documentation (National ID copy, Trade License, photos, etc.).
*   **License Application & Tracking:** Submit applications for new street vending licenses, select desired vending zones on an interactive map, and track real-time verification progress.
*   **Smart Payments:** Secure fee payments with options for dynamic discounts, installments, and online payment history logs.
*   **License Renewal:** Seamless one-click renewal flow with automated status transitions upon payment.
*   **Support & Complaints:** File complaints and submit photographic evidence of issues; track complaint resolutions.
*   **👩‍💼 Women Vendor Support Program:**
    *   **Special Schemes & Grants:** Apply for government/NGO schemes and support grants directly from the dashboard.
    *   **Mentorship Network:** Connect with experienced mentors for business growth.
    *   **Community Forums:** Engage in the community, create posts, read success stories, and share experiences.

### 👮 Field Inspectors
*   **Mobile-Friendly Field Portal:** Access scheduled and in-progress inspections while on the go.
*   **Compliance Assessments:** Rate vendor operations against hygiene, zone boundaries, and license validations.
*   **Report Submissions:** Submit digital inspection reports and recommendations directly to the central database.

### 🏢 City Corporation Admins
*   **Oversight Dashboard:** Review vendor distribution across city zones.
*   **Multi-Step Approval:** Conduct official document reviews and issue final license approvals.
*   **Policy Control:** Manage and enforce municipal compliance regulations.

### 👑 System Admins
*   **System Analytics:** Generate reports on system usage, license distribution, revenue, and active complaints.
*   **Zone Management:** Create, update, and configure vending zones.
*   **Announcements & Feedback:** Broadcast announcements, manage mentorship programs, moderate the community forum, and resolve support requests.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React (v19), Vite, Bootstrap (v5.3), Bootstrap Icons, Framer Motion (Animations), Leaflet (Interactive Maps), Chart.js (Data Analytics) |
| **Backend** | Node.js, Express (v5.2), JWT (Authentication), BcryptJS (Password Hashing), Multer (File Uploads), Nodemailer (Email Notifications) |
| **Database** | MySQL (v8.0+), structured with sequential migration scripts |

---

## 📂 Project Directory Structure

```text
Hawker/
├── Backend/                   # Node.js + Express API
│   ├── src/
│   │   ├── config/            # DB and server configs
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Authentication & file upload middleware
│   │   ├── routes/            # Express routers (auth, admin, vendor, inspector, etc.)
│   │   ├── services/          # Business logic layers
│   │   └── utils/             # Helper modules
│   ├── sql/                   # 37+ sequential SQL schema/migration files
│   ├── run_all_sql_in_order.bat  # Windows Batch migration runner
│   ├── run_all_sql_in_order.ps1  # Windows PowerShell migration runner
│   ├── setup_database.ps1     # Database installer
│   ├── reset_demo_passwords.js# Helper to synchronize demo user passwords
│   └── package.json           # Backend dependencies and run scripts
│
├── Frontend/                  # React 19 SPA
│   ├── src/
│   │   ├── api/               # Axios API client interface
│   │   ├── components/        # Reusable UI components & layouts
│   │   ├── context/           # React contexts (e.g., AuthProvider)
│   │   ├── pages/             # Route components grouped by role
│   │   └── styles/            # Custom theme styling
│   ├── vite.config.js         # Vite configurations
│   └── package.json           # Frontend dependencies and scripts
│
├── hawker.sql                 # Complete database schema dump
└── README.md                  # Project documentation (this file)
```

---

## ⚙️ Initial Setup & Installation

Follow these steps to set up and run the application locally on your machine after cloning.

### 1. Prerequisites
Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [MySQL Server](https://dev.mysql.com/downloads/mysql/) (v8.0 or higher) running locally
*   *Optional:* MySQL Command Line Client added to your system `PATH` (needed for automated migrations)

---

### 2. Database Configuration & Setup

1.  Start your local MySQL service.
2.  Open your database client and verify the connection.
3.  Navigate to the `Backend` directory and copy `.env` from template if needed, or modify/create `.env` using the template below:

#### Backend Environment Variables (`Backend/.env`)
Create a `.env` file in the `/Backend` directory with the following variables:

```env
PORT=8080
CLIENT_URL=http://localhost:5173

# Database configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hawker

# JWT configuration
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRES_IN=2d

# SMTP configurations (For email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=Hawker <your_email@gmail.com>
```

#### Run Database Migrations
You can set up the database schemas and sample datasets using the automated scripts inside the `Backend` directory:

*   **Option A: Windows Batch (Command Prompt)**
    ```cmd
    cd Backend
    run_all_sql_in_order.bat
    ```
*   **Option B: PowerShell (Administrators)**
    ```powershell
    cd Backend
    .\run_all_sql_in_order.ps1 -MySQLPassword "your_mysql_password"
    ```
*   **Option C: Manual Setup**
    If the automated runners are not supported or you are on Linux/macOS, create a database named `hawker` and import the files in `Backend/sql/` sequentially from `01_hawker_schema.sql` to `37_*.sql`, or import the full database dump `hawker.sql` from the root directory:
    ```bash
    mysql -u root -p -e "CREATE DATABASE hawker;"
    mysql -u root -p hawker < hawker.sql
    ```

*   **Option D: Demo Password Alignment**
    After running migrations, run the helper script to align the encrypted hashes of the demo accounts with their clear text passwords:
    ```bash
    node reset_demo_passwords.js
    ```

---

### 3. Backend Setup & Run

1.  Navigate into the `Backend` folder:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server in development mode:
    ```bash
    npm run dev
    ```
    *The backend server will launch at `http://localhost:8080`.*

---

### 4. Frontend Setup & Run

1.  Open a new terminal window and navigate into the `Frontend` folder:
    ```bash
    cd Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `/Frontend` directory to specify the backend API location:
    ```env
    VITE_API_URL=http://localhost:8080
    ```
4.  Start the Vite dev server:
    ```bash
    npm run dev
    ```
    *The frontend will run at `http://localhost:5173`.*

---

## 🔑 Demo Login Credentials

You can use the following default credentials to test the various dashboards and workflows:

| Role | Username / Email | Password | Access Details |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@hawker.gov` | `Admin@123` | Control Panel, Analytics, Zone Editor |
| **Street Vendor (Male)** | `vendor1@hawker.app` | `Vendor@123` | Vendor dashboard, Apply/Renew License, Payments |
| **Street Vendor (Female)** | `vendor2@hawker.app` | `Demo@1234` | Vendor dashboard + Women Support Programs, Mentorship |
| **Field Inspector** | `inspector@hawker.com` | `Inspector123!` | Mobile-friendly inspections portal |
| **City Corp Admin** | `citycorp@hawker.com` | `CityCorp123!` | Review applications, final approval controls |

---

## 📄 License

This project is licensed under the **ISC License**. See the `Backend/package.json` file details.
