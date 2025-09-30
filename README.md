# 📊 Insta-Analytics  

Insta-Analytics is a powerful **Instagram Analytics Dashboard** built with the **MERN stack** + **Tailwind CSS** + **Acternity UI**.  
It allows users to **scrape Instagram profiles** and view a **personalized dashboard** with:  
- In-depth **stats** on followers, engagement, and activity.  
- **Post-level image analysis** powered by AI.  
- Beautiful, responsive UI for a smooth experience.  

---

## 🚀 Tech Stack  
- **Frontend:** React + Vite + Tailwind CSS + Acternity UI  
- **Backend:** Node.js + Express.js + MongoDB  
- **Authentication:** JWT  
- **Media Handling:** Cloudinary  
- **Scraping:** Apify  

---

## 📂 Project Structure  

This project has **two main folders**:  

Insta-Analytics/
│
├── frontend/ # React + Vite + Tailwind + Acternity UI
│
└── backend/ # Express + MongoDB + APIs


🎥 **Watch the folder structure overview here:**  
[Google Drive Video Link](https://drive.google.com/file/d/1xCOS7CJW0h0lAPlbuJINq8cYkyknjm-K/view?usp=sharing)

---

## ⚙️ Environment Variables  

### **Frontend (.env)**  
```env
VITE_BACKEND_URL=http://localhost:5000
```
---

### **Backend (.env)**  

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
APIFY_TOKEN=your_apify_token
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```
---

## 🛠️ Installation & Setup
```
Clone the repository:

git clone https://github.com/your-username/insta-analytics.git
cd insta-analytics

Frontend Setup
cd frontend
npm install
npm run dev

Backend Setup
cd backend
npm install
npm run dev

🎯 Features

📈 Personalized Instagram analytics dashboard.

🖼️ Post image analysis with AI-powered scoring.

🔐 Secure authentication & protected routes.

☁️ Cloudinary integration for media storage.

🌐 Real-time scraping using Apify.

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📜 License

This project is licensed under the MIT License.
```