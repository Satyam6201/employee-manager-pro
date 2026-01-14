# 🚀 TeamFlow: Employee Management Pro

A high-performance, full-stack Employee Management System built for modern businesses. Streamline your workforce administration with a secure, animated, and responsive interface.

🔗 **Live Demo:** [https://employee-manager-pro-chi.vercel.app/](https://employee-manager-pro-chi.vercel.app/)  
📁 **GitHub Repo:** [https://github.com/Satyam6201/employee-manager-pro](https://github.com/Satyam6201/employee-manager-pro)

---

## 🛠️ Tech Stack

### Frontend & Core
* ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) **Next.js 14** (App Router)
* ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript**
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**
* ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) **Framer Motion** (Animations)

### Backend & Database
* ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) **Prisma ORM**
* ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) **Neon PostgreSQL** (Serverless)
* ![Auth](https://img.shields.io/badge/NextAuth.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white) **NextAuth.js** (Secure Authentication)

---

## 📂 File Structure Overview

```text
src/
├── app/                  # Next.js 14 App Router (Core Pages)
│   ├── api/              # Backend API routes (Auth, Employees, Registration)
│   ├── dashboard/        # Main Admin Dashboard with CRUD pages
│   ├── login/            # Authentication: Sign-in page
│   ├── register/         # Authentication: User signup page
│   ├── layout.tsx        # Global layout & Providers wrapper
│   └── page.tsx          # Landing/Hero page
├── components/           # Reusable UI components (Forms, Navbar, Table)
├── hooks/                # Custom React hooks (e.g., useEmployees for data fetching)
├── lib/                  # Library configurations (Prisma client instance)
├── types/                # TypeScript interfaces and global definitions
└── middleware.ts         # Route protection and Auth logic
```

# ✨ Key Features
- Secure Auth: User registration and login powered by NextAuth.js.
- Database Cloud: High-speed data operations using Neon Serverless PostgreSQL.
- Complete CRUD: Add, Edit, View, and Delete employees seamlessly.
- Dynamic UI: Smooth transitions using Framer Motion and responsive layouts with Tailwind.
- Optimized Build: Custom build pipeline for Prisma client generation on Vercel.
