# फुल-स्टैक प्रोडक्ट स्टोर

एक पूर्ण MERN (MongoDB, Express, React, Node.js) प्रोडक्ट स्टोर एप्लिकेशन जिसमें पूर्ण CRUD कार्यक्षमता है। MongoDB द्वारा समर्थित एक स्वच्छ REST API के माध्यम से उत्पादों को बनाया, पढ़ा, अपडेट और हटाया जा सकता है।

## लाइव डेमो

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## तकनीकी स्टैक

- **फ्रंटएंड:** React, Vite
- **बैकएंड:** Node.js, Express.js
- **डेटाबेस:** MongoDB (Mongoose ODM)
- **डिप्लॉयमेंट:** Render.com

## प्रोजेक्ट संरचना

```
├── backend/
│   ├── config/       # डेटाबेस कनेक्शन
│   ├── controllers/  # रूट लॉजिक
│   ├── models/       # Mongoose स्कीमा
│   ├── routes/       # API रूट्स
│   └── server.js     # एंट्री पॉइंट
├── frontend/         # React एप्लिकेशन
└── package.json
```

## शुरुआत करें

### आवश्यकताएं

- Node.js v18+
- MongoDB Atlas अकाउंट (या लोकल MongoDB)

### इंस्टॉलेशन

```bash
# रिपोजिटरी क्लोन करें
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# डिपेंडेंसी इंस्टॉल करें
npm install

# एनवायरनमेंट वेरिएबल सेट करें
# रूट डायरेक्टरी में .env फाइल बनाएं:
# MONGO_URI=आपकी_mongodb_कनेक्शन_स्ट्रिंग
# PORT=5000

# डेवलपमेंट मोड में चलाएं
npm run dev
```

## API एंडपॉइंट्स

| मेथड   | एंडपॉइंट           | विवरण                  |
|--------|--------------------|------------------------|
| GET    | /api/products      | सभी प्रोडक्ट प्राप्त करें |
| POST   | /api/products      | प्रोडक्ट बनाएं          |
| PUT    | /api/products/:id  | प्रोडक्ट अपडेट करें     |
| DELETE | /api/products/:id  | प्रोडक्ट हटाएं          |

## लाइसेंस

MIT
