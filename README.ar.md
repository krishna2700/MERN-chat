# متجر المنتجات - تطبيق كامل الطبقات

تطبيق متجر منتجات متكامل يعتمد على تقنية MERN (MongoDB, Express, React, Node.js) مع دعم كامل لعمليات CRUD. يمكن إنشاء المنتجات وعرضها وتعديلها وحذفها عبر واجهة برمجة REST API مدعومة بـ MongoDB.

## العرض التجريبي المباشر

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## التقنيات المستخدمة

- **الواجهة الأمامية:** React, Vite
- **الواجهة الخلفية:** Node.js, Express.js
- **قاعدة البيانات:** MongoDB (Mongoose ODM)
- **النشر:** Render.com

## هيكل المشروع

```
├── backend/
│   ├── config/       # الاتصال بقاعدة البيانات
│   ├── controllers/  # منطق المسارات
│   ├── models/       # مخططات Mongoose
│   ├── routes/       # مسارات API
│   └── server.js     # نقطة الدخول
├── frontend/         # تطبيق React
└── package.json
```

## البدء في الاستخدام

### المتطلبات الأساسية

- Node.js v18 أو أحدث
- حساب MongoDB Atlas (أو MongoDB محلي)

### التثبيت

```bash
# استنساخ المستودع
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# تثبيت التبعيات
npm install

# إعداد متغيرات البيئة
# أنشئ ملف .env في المجلد الجذر يحتوي على:
# MONGO_URI=سلسلة_اتصال_mongodb
# PORT=5000

# التشغيل في وضع التطوير
npm run dev
```

## نقاط نهاية API

| الطريقة | المسار             | الوصف                     |
|---------|--------------------|---------------------------|
| GET     | /api/products      | الحصول على جميع المنتجات  |
| POST    | /api/products      | إنشاء منتج جديد           |
| PUT     | /api/products/:id  | تحديث منتج                |
| DELETE  | /api/products/:id  | حذف منتج                  |

## الرخصة

MIT
