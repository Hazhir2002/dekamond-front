# 🌐 Dekamond Frontend (Next.js)

This is the **frontend** for the Business Metrics AI Agent, built using **Next.js**. It connects to the FastAPI backend to send business data, receive insights, and display actionable recommendations.

---

## 🚀 Features

- 📈 Input daily sales, cost, and customer data
- ⚙️ Sends requests to the FastAPI backend
- 📊 Displays profit, CAC, and strategic recommendations
- ⚡ Built with Next.js and React

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

Using **pnpm** (recommended):

```bash
pnpm install
```

Or using **npm**:

```bash
npm install
```

---

### 2️⃣ Run the Development Server

Using **pnpm**:

```bash
pnpm run dev
```

Or using **npm**:

```bash
npm run dev
```

---

## 🔗 Backend API

Make sure the FastAPI backend is running at:

```
http://localhost:8000
```

> If you're making requests from the frontend to the backend, ensure CORS is configured correctly in FastAPI.

---

## 🧠 API Endpoint Used

**POST** `/analyze`

Sends today and yesterday’s business data to the backend and receives:

- ✅ Profit/loss summary
- ⚠️ Alerts (e.g., high CAC)
- 📌 Recommendations

---

## 🛠 Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/) 
- [Tailwind CSS](https://tailwindcss.com/) *

