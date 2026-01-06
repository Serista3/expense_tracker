# 💸 Expense Tracker

![Project Banner](https://github.com/user-attachments/assets/9ca403b7-82aa-4880-96f5-bb1dadbab3c6)

> **Web Application สำหรับบันทึกและวางแผนการเงินส่วนบุคคล** ช่วยให้คุณวิเคราะห์พฤติกรรมการใช้จ่ายและตั้งเป้าหมายทางการเงินได้อย่างมีประสิทธิภาพ

[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

🔗 **Live Demo:** [Click Here to View App](https://expense-tracker-alpha-one-81.vercel.app/)

---

## ✨ Features (คุณสมบัติเด่น)

### 📊 Dashboard & Analytics
- **Visual Analysis:** แสดงกราฟสรุปรายรับ-รายจ่าย แยกตามหมวดหมู่ เข้าใจง่ายด้วย Chart.js
- **Monthly Budgeting:** ระบบตั้งงบประมาณรายเดือนพร้อมแจ้งเตือนสถานะการใช้เงิน

### 📝 Transaction Management
- **CRUD Operations:** สร้าง, อ่าน, แก้ไข, และลบรายการธุรกรรมได้อย่างรวดเร็ว
- **Advanced Filtering:** ค้นหารายการตามหมวดหมู่, ช่วงเวลา หรือคำค้นหา
- **Pagination:** รองรับข้อมูลจำนวนมากด้วยระบบแบ่งหน้า

### ⚙️ Utilities & UX
- **Responsive Design:** รองรับการใช้งานสมบูรณ์แบบทั้งบน Mobile, Tablet และ Desktop
- **Data Persistence:** บันทึกข้อมูลอัตโนมัติด้วย **Local Storage** (ข้อมูลไม่หายเมื่อรีเฟรช)
- **Import/Export:** รองรับการนำเข้าและส่งออกข้อมูลเพื่อสำรองข้อมูล
- **Dark Mode:** ถนอมสายตาด้วยโหมดกลางคืน

---

## 🛠️ Installation

หากต้องการรันโปรเจคนี้ในเครื่องของคุณ (Local Environment)

**Prerequisites:** Node.js (v16+), Git

```bash
# 1. Clone the repository
git clone [https://github.com/Serista3/expense_tracker.git](https://github.com/Serista3/expense_tracker.git)

# 2. Enter the directory
cd expense_tracker

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

## 🏬 Project Structure
โครงสร้างไฟล์ถูกออกแบบโดยเน้นความ Modular และ Scalable
```structure
src/
├── components/         # Reusable Components
│   ├── chart/          # กราฟแสดงผล (Chart.js wrapper)
│   ├── common/         # ปุ่ม, Input และ UI พื้นฐาน
│   ├── layout/         # Navbar, Sidebar, Layout wrappers
│   └── transaction/    # Logic การจัดการรายการเงิน
├── composables/        # Shared Logic (Vue Composables)
├── views/              # หน้าหลัก (Pages)
└── assets/             # Static files & Tailwind config
```

## 📚 Technical Highlights (สิ่งที่ได้เรียนรู้)
โปรเจคนี้เน้นการประยุกต์ใช้ Vue 3 Composition API และ Modern CSS Framework:
- State Management: การจัดการข้อมูลที่ซับซ้อนระหว่าง Component ด้วย ref
- Composable Pattern: แยก Logic ที่ใช้ซ้ำ (เช่น การคำนวณเงินรวม, การจัดการ Local Storage) ออกเป็น Composable functions
- Optimized Performance: ใช้ computed และ watch เพื่อลดการคำนวณที่ไม่จำเป็น
- Responsive Layout: ใช้ TailwindCSS Grid/Flexbox จัดการหน้าจอที่หลากหลายโดยไม่ต้องเขียน Custom CSS เยอะ

## 🚀 Roadmap
- เพิ่มระบบ Authentication (Login/Register)
- เชื่อมต่อ Backend/Database จริง (Firebase/Supabase)
- Export เป็น PDF

## 🧑‍💼 Contact
หากมีข้อเสนอแนะหรือพบปัญหาในการใช้งาน สามารถติดต่อได้ที่: 📧 Email: stacla5282@gmail.com
