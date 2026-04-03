
# 🏦 Finance Pulse: Modern Analytics Dashboard

> **Live Demo:** [(https://finance-pulse-dashboard.netlify.app/)](https://finance-pulse-dashboard.netlify.app)


A high-performance, responsive Personal Finance Dashboard built with **React 18**, **Vite**, and **Tailwind CSS**. This project was developed as a technical assessment to demonstrate proficiency in state management, data visualization, and Role-Based Access Control (RBAC).

---


## 🛠️ Core Tech Stack
- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS v4 (Mobile-first, Utility-first)
- **State Management:** React Context API (Global Store)
- **Charts:** Recharts (SVG-based responsive visualizations)
- **Icons:** Lucide-React

---

## ✨ Key Features & Functionality

### 1. Unified State Management
Utilized the **React Context API** to create a central "source of truth" for transaction data. This ensures that when a transaction is added, the **Total Balance**, **Income/Expense Cards**, and **Trend Charts** update instantly without page reloads.

### 2. Simulated RBAC (Role-Based Access Control)
Implemented a dynamic UI that adapts based on the selected user role:
- **Admin:** Full access to view data and add/edit transactions through a controlled form.
- **Viewer:** Read-only access. The "Add Transaction" interface is gracefully hidden to prevent unauthorized state changes.

### 3. Data Visualization (Requirement 1)
- **Balance Trend:** A Line Chart showing the progression of transaction values over time.
- **Spending Breakdown:** A Donut/Pie Chart categorizing expenses to identify high-spending areas.

### 4. Smart Insights (Requirement 4)
- **Top Expense Category:** Automatically calculated logic to identify where the most money is being spent.
- **Real-time Filtering:** A high-performance search bar that filters the transaction ledger by category name.

---

## 📈 Engineering Decisions & Best Practices

- **Performance Optimization:** Used `useMemo` hooks to calculate financial statistics. This prevents expensive recalculations on every re-render, ensuring a smooth 60fps UI experience.
- **Component-Driven Development:** Structured the app into modular, reusable components (e.g., `StatCard`, `FinancialCharts`) for better scalability and maintainability.
- **Conditional Rendering:** Leveraged React's conditional rendering to handle "Empty States"—if no transactions match a search filter, the user is given clear visual feedback.
- **Modern CSS:** Utilized Tailwind's latest features for a professional, "SaaS-style" aesthetic with smooth transitions and hover effects.

---

## 📦 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Vaishnavi-Kharwade16/finance-pulse-dashboard.git](https://github.com/Vaishnavi-Kharwade16/finance-pulse-dashboard.git) 
