<img width="1689" height="789" alt="image" src="https://github.com/user-attachments/assets/16fde01b-ff19-44d9-83bb-3ea9b78f59a9" />
<img width="1649" height="777" alt="image" src="https://github.com/user-attachments/assets/0f260d55-47f7-43c9-b9b9-f2861dbc9685" />

<img width="760" height="800" alt="image" src="https://github.com/user-attachments/assets/3352b2e9-1aee-4f37-9efc-2b554e070677" />
# BloodBridge AI: An AI-Powered Platform for Thalassemia Care

## 🏆 Mission: Towards a Thalassemia-Free India by 2030

**BloodBridge AI** is a comprehensive, multi-platform solution designed to tackle the critical challenge of providing consistent, life-saving blood transfusions for Thalassemia patients in India. By leveraging AI, real-time communication, and a gamified user experience, we aim to bridge the gap between compassionate donors and patients in constant need.

Our platform addresses the entire lifecycle of thalassemia care, from intelligent donor engagement and emergency response to long-term patient support through the innovative **Blood Bridge** system.

---

## ✨ Key Features

Our system is a fusion of an intelligent chatbot backend and a modern, role-based web application.

### 1. AI-Powered WhatsApp Chatbot
The primary point of contact for users, providing unparalleled accessibility.
- **🤖 AI-Powered Message Routing:** Uses Google Gemini to understand user intent (donor registration, patient onboarding, emergency) and routes them to the correct workflow.
- **🩸 Emergency Blood Request System:** A smart, automated system that identifies and sequentially notifies the best-matched donors during emergencies.
- **❤️ Blood Bridge Coordination:** An innovative system that creates dedicated, rotational donor pools for specific Thalassemia patients, ensuring a reliable and predictable blood supply.
- **📈 Predictive Donor Engagement:** Proactively re-engages inactive donors and reminds eligible donors when their cooldown period is over, drastically reducing donor fatigue and churn.
- **❓ Automated FAQ Handling:** A RAG (Retrieval-Augmented Generation) system answers common questions and escalates sensitive medical queries to human volunteers.

### 2. Blood Management Web Portal
A comprehensive web application with dedicated portals for all stakeholders.
- **👑 Admin Dashboard:** A powerful mission control center for NGOs and hospitals. Admins can view real-time analytics, manage all users, create and manage Blood Bridges, oversee active emergencies, and handle escalated communications.
- **💖 Donor Portal:** An engaging dashboard designed to retain donors. Donors can track their impact (lives saved, points earned), view their donation history, manage their availability, and see their rank on a community leaderboard.
- **💚 Patient Portal:** A supportive space for patients to view their health timeline, see their connected Blood Bridge donors, and manage their transfusion schedules.
- **🕹️ Donor Gamification System:** A system of badges, leaderboards, and milestones to recognize and reward frequent donors, fostering a sense of community and friendly competition.

---

## 🚀 Getting Started

To run the complete BloodBridge AI platform locally, you will need to run three separate services: the **Backend (Node.js)**, the **Frontend (React)**, and the **ML Service (Python)**.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer)
- [Python](https://www.python.org/) (v3.8 or newer)
- [npm](https://www.npmjs.com/)
- A Supabase account with a PostgreSQL database.

### 1. Backend Setup (The Brain)

The Node.js server handles the main application logic, API, and WhatsApp bot integration.

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
#    - Copy the contents of .env.example (if provided) or a previous .env file
#    - Create a new file named .env
#    - Fill in your DATABASE_URL, JWT_SECRET, and WhatsApp/Meta credentials.

# 4. Run the development server
npm run dev

Your backend will now be running, typically on http://localhost:3001.

2. ML Service Setup (The AI Engine)

The Python service handles donor scoring and the RAG-based FAQ system.

code
Bash
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
# 1. Navigate to the ml_services directory
cd ml_services

# 2. (Recommended) Create and activate a Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Set up environment variables
#    - Create a .env file and add your DATABASE_URL (same as the backend).

# 5. Run the FastAPI server
uvicorn main:app --reload

Your ML service will now be running, typically on http://localhost:8000.

3. Frontend Setup (The Face)

The React application provides the user interface for all portals.

code
Bash
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Verify environment variables
#    - The .env file should contain REACT_APP_BACKEND_URL=http://localhost:3001
#    - This tells the frontend to talk to your local Node.js backend.

# 4. Run the development server
npm start```
Your browser will automatically open to `http://localhost:3000`.

### 4. Database Setup (The Memory)

Your backend requires a PostgreSQL database.
1.  Create a project on [Supabase](https://supabase.com/).
2.  In the **SQL Editor**, run the complete schema script provided in `db.txt` to create all necessary tables, functions, and indexes.
3.  Run the provided "demo data" SQL script to populate your database with users and activity for a rich demo experience.
4.  Copy your database **Connection Pooler URI** into the `DATABASE_URL` variable in your backend's `.env` file.

---

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express.js
-   **Frontend:** React, Tailwind CSS, ShadCN/UI Components
-   **Database:** PostgreSQL (managed by Supabase)
-   **AI / ML:** Python, FastAPI, Google Gemini, Sentence-Transformers
-   **Real-time Communication:** Meta's WhatsApp API

---

##  Demo Credentials

You can use the following credentials to explore the different portals:

| Role    | Phone Number      | Password        |
|---------|-------------------|-----------------|
| **Admin** | `+918000000000`   | `admin123`      |
| **Donor** | `+919876543210`   | `mumbai o+`     |
| **Patient** | `+911234567890` | `delhi a+`      |

*(Note: Donor and Patient passwords are their `city` and `blood_group` in lowercase, separated by a space.)*
