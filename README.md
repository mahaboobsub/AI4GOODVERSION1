<img width="1689" height="789" alt="image" src="https://github.com/user-attachments/assets/16fde01b-ff19-44d9-83bb-3ea9b78f59a9" />
<img width="1649" height="777" alt="image" src="https://github.com/user-attachments/assets/0f260d55-47f7-43c9-b9b9-f2861dbc9685" />
<img width="760" height="800" alt="image" src="https://github.com/user-attachments/assets/3352b2e9-1aee-4f37-9efc-2b554e070677" />

# BloodBridge AI: An AI-Powered Platform for Thalassemia Care

## 🏆 Mission: Towards a Thalassemia-Free India by 2030

**BloodBridge AI** is a comprehensive, multi-platform solution designed to tackle the critical challenge of providing consistent, life-saving blood transfusions for Thalassemia patients in India. By leveraging AI, real-time communication, and a gamified user experience, we aim to bridge the gap between compassionate donors and patients in constant need.

---

## 🛠️ Tech Stack

**Frontend**
- **Framework:** React.js (Create React App + Craco for Webpack override)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Forms & Validation:** React Hook Form, Zod
- **Routing:** React Router DOM

**Backend (API Layer)**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Scheduling:** Node-cron (Predictive Engagement)
- **Authentication:** JSON Web Tokens (JWT)
- **WhatsApp Integration:** Meta Webhooks API

**ML & AI Services (Python Layer)**
- **Framework:** FastAPI, Uvicorn
- **Machine Learning:** Scikit-learn, PyTorch, Sentence-Transformers
- **Generative AI:** Google Gemini 2.0 Flash (`@google/generative-ai` package)

**Database Layer**
- **DBMS:** PostgreSQL
- **Managed Provider:** Supabase

---

## 🏗️ System Architecture

The project is built around a hybrid microservices architecture with a dedicated ML cluster:
1. **Frontend (React)**: Handles administrative operations, patient analytics, and donor portals.
2. **Backend (Node.js API)**: Orchestrates the core business logic, serves REST endpoints, listens continuously to Meta WhatsApp webhooks, and schedules chron jobs.
3. **ML Service (FastAPI)**: Python-based microservice that calculates donor reliability scores using ML models and performs RAG logic with Sentence-Transformers for answering medical FAQs over vectors.
4. **Data Persistence**: A scalable PostgreSQL database managing highly relational state maps of users and dynamically evolving rotary "Blood Bridges".

---

## 🔁 Data Flow

1. **User Request (WhatsApp):** A user sends a WhatsApp message.
2. **Incoming Webhook:** The message hits the Node.js API `POST /webhook` endpoint.
3. **Intent Detection (AI):** Node.js dispatches the raw text to Gemini 2.0 Flash to deduce intent (e.g., "Need blood", "Willing to donate", "Inquiry").
4. **RAG / ML Processing:** 
    - *If Inquiry:* Routes to the Python ML Service for semantic retrieval using vector embeddings against the knowledge base.
    - *If Blood Need:* Calls the Python ML Service to determine the highest predictive score of available donors.
5. **Business Logic & DB:** The Node API persists requests, assigns Blood Bridges, and records transactions in the Supabase PostgreSQL database.
6. **Action Execution:** Back-end schedules automated WhatsApp meta messages (OTPs, notifications) bridging the nearest optimal matches.
7. **Frontend Syncing:** Live statuses are viewed directly on the Admin/Patient React web application drawing from the DB.

---

## 📂 Component Hierarchy (Frontend)

The frontend organizes features broadly around user roles under the `src/pages` and `src/components` tree:
- **`App.js`**: Core setup and routing wrapper.
- **`pages/`**:
  - `Landing.jsx`: Initial public pitch and routing logic.
  - `Login.jsx`: Uniform entry point handling multiple roles.
  - `AdminPortal.jsx`: Dashboard for system managers (NGOs, hospitals) to monitor Blood Bridges.
  - `DonorPortal.jsx`: Personalized gamified donor interface with impact metrics.
  - `PatientPortal.jsx`: Tracking platform for patients seeing assigned donors and statuses.
- **`components/`**: Reusable primitives built via Shadcn (Dialogs, Accords, Dropdowns) ensuring highly standardized design language.

---

## 🤔 Technical Design Decisions

- **Polyglot Microservices:** Keeping the ML prediction layer isolated in Python leverages the maturity of `scikit-learn` and `sentence-transformers`, while Node.js seamlessly manages the highly concurrent IO demands of WhatsApp Webhooks.
- **Scheduled Engagement (Chron Jobs):** Relying on preemptive node-cron routines avoids cold starts. The system calculates upcoming donation eligibilities overnight and cues Meta API messages without human intervention.
- **Webhook Raw Body Verification:** Employs raw buffer overrides to safely generate HMAC crypto signatures guaranteeing secure integrations with Meta's systems.
- **Rotational Mechanism (Blood Bridges):** Moving from random broadcasting to a predictable queue mechanism, guaranteeing that Thalassemia patients have an uninterrupted cycle of targeted donors.

---

## 🗄️ Why Supabase? (Database Decision)

Supabase was chosen specifically because:
1. **Native PostgreSQL Engine:** The platform is deeply relational (Patients vs. Blood Bridges vs. Donor Allocations vs. Rotations).
2. **pgvector Integration:** Enables natively querying vector embeddings inside the database (vital for the RAG FAQ functionality) without needing a secondary disparate vector database like Pinecone.
3. **Simplicity and Security:** Easily integrates with `pg` on Node backend with instant scalability and native authentication features should the project pivot to them over JWT.

---

## 🧠 Why Gemini 2.0 Flash?

1. **Extremely Low Latency:** Required for seamless chatbot conversations where sub-second replies dictate user retention. 2.0 Flash executes conversational paths exceptionally faster.
2. **High Structured Generation Consistency:** The WhatsApp payload logic depends heavily on returning exact JSON objects containing intent properties (Blood groups, City schemas) that Gemini 2.0 Flash reliably yields out-of-the-box.
3. **Cost Efficiency at Scale:** When managing thousands of unstructured SMS intents daily, Flash ensures computing costs remain heavily optimized without compromising on reasoning accuracy.

---

## 📊 Database Schema

Designed utilizing robust PL/pgSQL architectures within:
- **`users` & `patients`**: Entities defining system participants alongside gamification stats (`gamification_points`, `streak_count`, `last_ml_score`).
- **`emergency_requests`**: Location-aware requests mapping needs back to patients.
- **`blood_bridges` & `bridge_members`**: The heart of the platform forming relational groupings. Tracks the `rotation_position` for continuous donor sequencing.
- **`knowledge_base`**: Stores text and their corresponding `<vec>` `embedding` for semantic FAQS.
- **Custom Functions**: E.g. `find_donors_for_bridge()` scoring heuristics based on ML inputs + constraints.

---

## 🖼️ Template Engine

The stack leverages **JSX (React)** heavily on the frontend to define the DOM. 
The backend avoids standard HTML/Template engines (like EJS/Pug) because it is fully abstracted as a **headless JSON REST API**. Messaging "templates" are structured purely as configuration payloads interfacing primarily natively with Meta's interactive WhatsApp message structures.

---

## 🤖 AI Integration

- **NLP Router (Gemini):** Transforms raw user messages into strict backend parameters. 
- **Predictive Scoring:** Machine Learning (Python/Scikit-learn) is engaged continuously to track past behavior patterns and compute a single `last_ml_score`, favoring donors statistically likely to show up.
- **RAG FAQ (SentenceTransformers):** Uses embedded semantics mapping to find contextual matching questions the user isn't even asking 1-to-1 against the DB's `knowledge_base` table.

---

## 📁 Folder Structure

```text
/
├── backend/                  # Node.js + Express API Layer
│   ├── src/
│   │   ├── config/           # Envs and Constants
│   │   ├── controllers/      # Webhook & Core REST Logic
│   │   ├── middleware/       # Verifications & Guards
│   │   ├── routes/           # Express Routers
│   │   ├── services/         # Orchestration & Chron Tasks
│   │   └── utils/            # Helpers
│   ├── package.json
│   └── server.js             # API Entry point
├── frontend/                 # React UI Application
│   ├── public/
│   ├── src/
│   │   ├── components/       # UI Components + Shadcn
│   │   ├── context/          # React State contexts
│   │   ├── hooks/            # Custom Hooks
│   │   ├── lib/              # Utils and Axios interceptors
│   │   ├── pages/            # View specific components
│   │   └── index.js
│   ├── craco.config.js       # Required for Tailwind
│   └── package.json
├── ml_services/              # Python FastAPI + ML Layer
│   ├── main.py               # Application Entry
│   └── requirements.txt
├── dbschme992025             # Supabase raw SQL queries
└── README.md
```

---

## 🚀 Getting Started

To run the complete BloodBridge AI platform locally, you will need to run three separate services: the **Backend (Node.js)**, the **Frontend (React)**, and the **ML Service (Python)**.

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- PostgreSQL / Supabase account 

### 1. Setup Database
1. Create a project in [Supabase](https://supabase.com).
2. Execute the entire SQL script found in `dbschme992025` inside the Supabase SQL editor to create the schema and stored procedures.
3. Retrieve your PostgreSQL connection string.

### 2. Configure Environment Variables
You'll need configuration across services. 

1. Within `backend/`:
Create a `.env` file containing the following:
```env
PORT=3001
JWT_SECRET=super_secret_jwt_key
DATABASE_URL=postgres://[user]:[password]@[host]:[port]/[db]
GEMINI_API_KEY=your_gemini_key
ML_SERVICE_URL=http://localhost:8000
WHATSAPP_TOKEN=your_meta_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_APP_SECRET=your_app_secret
WHATSAPP_VERIFY_TOKEN=webhook_verify_token
ADMIN_DEMO_PHONE=+918000000000
```

2. Within `ml_services/`:
Create a `.env` file holding the `DATABASE_URL` matching the backend.

### 3. Start Backend Layer
```bash
cd backend
npm install
npm run dev
```

### 4. Start ML Layer
```bash
cd ml_services
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 5. Start Frontend Layer
```bash
cd frontend
npm install
npm start
```
Browser will launch at `http://localhost:3000`.

---

## 🔐 Environment Variables Summary

| Variable | Location | Purpose |
|----------|----------|----------|
| `PORT` | Backend | The port the Node server listers on |
| `DATABASE_URL` | Backend / ML | Postgres connection string for full DB queries |
| `GEMINI_API_KEY` | Backend | Authentication for parsing text using Google Flash |
| `ML_SERVICE_URL` | Backend | Pointer to the Python API instance |
| `WHATSAPP_TOKEN` | Backend | Bearer token for outbound Meta SMS functions |
| `WHATSAPP_APP_SECRET` | Backend | Used to cryptographically secure the incoming Meta Webhook body |
| `JWT_SECRET` | Backend | String used for generating portal authentication tokens |
| `REACT_APP_BACKEND_URL` | Frontend | (If explicitly defined) targets local API `http://localhost:3001` |
