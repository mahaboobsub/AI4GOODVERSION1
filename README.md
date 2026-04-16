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
- **Scheduling & Services:** Node-cron (Predictive Engagement via `EngagementService` and `BridgeCoordinationService`)
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
- **`blood_bridges` & `bridge_members`**: The heart of the platform forming relational groupings. Tracks the `rotation_position` for continuous donor sequencing managed by the `BridgeCoordinationService`.
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

## 🖥️ UI Layouts Overview

The platform offers multiple tailored interfaces designed for different user roles (Admin, Donor, Patient), all wrapped within a responsive, modern React application.

**1. Landing Page (`/`)**
- A public-facing pitch page outlining the mission of BloodBridge AI.
- Features dynamic public statistics (e.g., lives saved, active bridges) fetched statically or incrementally.
- Navigation points guiding users to register via WhatsApp or login to the portals.

**2. Authentication/Login (`/login`)**
- A unified entry point for all roles.
- Accepts phone numbers and passwords.
- On successful authentication, the backend issues a JWT, and the frontend dynamically routes the user to their respective dashboard (`/admin`, `/donor`, or `/patient`) based on their stored `user_type`.

**3. Admin Portal (`/admin`)**
- **Dashboard Hub:** Visual metrics regarding total bridged patients, overall system health, and blood group distributions.
- **Emergency Management:** View real-time emergency blood requests and manually `close` or `escalate` them.
- **Patient & Bridge Management:** List of Thalassemia patients. Admins can manually click "Create Bridge" to execute the PL/pgSQL matching functions from the frontend UI.
- **Inbox:** A view of unresolved intents where Gemini couldn't fully fulfill a user's WhatsApp query or categorized it as requiring human intervention. Admins can "resolve" these.

**4. Donor Portal (`/donor`)**
- **Gamification Profile:** Displays the donor's `gamification_points`, `streak_count`, badges, and past donations.
- **Availability Toggle:** A core UI element allowing the donor to pause alerts (snooze/DND) if they are traveling or temporarily ineligible.
- **Current Bridge Status:** Shows if the donor is actively allocated to a patient rotation sequence.

**5. Patient Portal (`/patient`)**
- A tracking interface giving patients peace of mind.
- Shows their personal assigned "Blood Bridge", the rotation sequence, and historical transfusion dates.

---

## 🔌 API Flows: Frontend to Backend

The frontend communicates with the Node.js Express backend using standard REST APIs with JWT Bearer authentication. 

### Public Routes
- `POST /api/admin/login`: Authenticates phone/password credentials and issues a JWT along with user role info.
- `GET /api/public/stats`: Fetches non-sensitive aggregate system data for the landing page.

### Admin Routes (Protected: Admin Role)
- `GET /api/admin/stats`: Retrieves high-level dashboard metrics.
- `GET /api/admin/stats/blood-groups`: Aggregates the availability of donors partitioned by blood groups.
- `GET /api/admin/patients`: List of registered patients needing bridges.
- `GET /api/admin/emergencies`: Polls or retrieves unfulfilled blood requests.
- `GET /api/admin/leaderboard`: Ranks top donors by gamification points.
- `GET /api/admin/inbox`: Fetches unresolved manual intervention messages.
- `POST /api/admin/patients/:patientId/create-bridge`: Triggers the complex database function to hunt and assemble an optimal group of donors into a bridge for a specific patient.
- `POST /api/admin/emergencies/:requestId/close`: Resolves a fulfilled emergency request.
- `POST /api/admin/emergencies/:requestId/escalate`: Triggers fallback protocols for failing emergency requests.
- `GET /api/admin/bridges/:bridgeId/members`: Lists specific donors sitting within a rotational bridge.
- `DELETE /api/admin/bridges/members/:memberId`: Evicts a donor from a continuous rotation (e.g., if they opted out).

### Donor Routes (Protected: Donor Role)
- `GET /api/donor/dashboard`: Serves personalized gamification stats, donation history, and badge accomplishments.
- `PUT /api/donor/availability`: Updates the `availability_status` or `snooze_until` fields for that specific donor.

### Patient Routes (Protected: Patient Role)
- `GET /api/patient/dashboard`: Retrieves the patient's individual treatment timeline, next expected transfusion, and their assigned Bridge metadata.

### ML Service Routes (Internal Backend to Python API)
- `POST /predict`: Sends donor parameters (snoozes, historical response times) to receive a reliability score index.
- `POST /rag/query`: Sends user WhatsApp FAQs string to the Sentence-Transformers pipeline, fetching contextual matches from `knowledge_base` vectors.

---

## 🗄️ In-Depth Database Schema (Supabase PostgreSQL)

The system revolves around heavily interconnected nodes guaranteeing precise routing of medical requirements.

1. **`users` (Donors & Admins)**
   - Core fields: `phone` (Unique), `name`, `blood_group`, `city`, `user_type` (donor, patient, admin).
   - Engagement fields: `availability_status` (available, unavailable, on_hold), `dnd_status`, `snooze_until`.
   - Gamification & ML: `gamification_points`, `streak_count`, `last_ml_score` (calculated heavily via Python service caching).

2. **`patients`**
   - Details: `condition`, `status` (pending_opt_in, active, bridged), `last_transfusion_date`, `frequency_in_days` (driving the node-cron scheduler).

3. **`blood_bridges` & `bridge_members`**
   - `blood_bridges`: Links a `patient_id` to a unique rotational group. Tracks `rotation_position` so the system knows whose turn it is next month.
   - `bridge_members`: Resolves the M:N relationship mapping `donor_id` to `bridge_id`. Maintains the exact sequence (`position`) the donor holds in the rotation queue.

4. **`emergency_requests`**
   - Active needs pinging the system outside regular cycles, holding `units_needed`, `hospital_name`, `latitude`/`longitude`, and an expiring `short_code` for WhatsApp confirmations.

5. **`donor_responses`**
   - Audit trail mapping a `donor_id` matching an `emergency_request`. Handles short-lived `otp` validation directly inside the database table preventing race-conditions.

6. **`knowledge_base` (pgvector)**
   - A minimalist semantic table holding `content` and `embedding` (`JSONB` parsed into PgVector) ensuring rapid vector distance calculations for inbound natural language questions.

7. **PL/pgSQL Functions**
   - `find_donors_for_bridge`: A critical procedure that filters donors entirely on DB-level constraints (ignoring DND, matching cities, sorting by `last_ml_score`) guaranteeing instant allocation with minimal node memory footprints.

---

## 🧐 Deep-Dive Technical FAQs

**Q: How does the system prevent WhatsApp race conditions when multiple donors accept the same emergency?**
**A:** The database acts as the strict source of truth. When a broadcast is sent, multiple users might reply "YES". The system leverages the `donor_responses` table with unique constraints. The first response executing an update validates the remaining required units and commits the transaction. If the transaction spots `units_needed = 0`, subsequent accepts are gracefully rejected by the Node API and a "Thank you, but the requirement is met" message is queued to the Meta API.

**Q: Why separate the ML microservice in Python instead of using TensorFlow.js within Node?**
**A:** While TensorFlow.js exists, Python offers vastly superior tooling (`scikit-learn`, `Sentence-Transformers`, DataFrame operations), specifically for NLP and predictive heuristics frameworks. Isolating it guarantees that heavy tensor matrix multiplication blocks don't hog the primary Node.js event-loop, which must stay lightning fast to respond to thousands of concurrent asynchronous WhatsApp incoming webhook payloads seamlessly.

**Q: In the database schema, why track `last_ml_score` instead of calculating it live per bridge request?**
**A:** Calculating predictive scoring requires aggregating a donor's historical response times, skip rates, and demographic models. Computing this on-the-fly for millions of users during an emergency is inefficient. We use a batch-processing cron-job during off-peak hours that pushes calculated scores to the `last_ml_score` column. The `find_donors_for_bridge` stored procedure then just performs a basic `ORDER BY last_ml_score DESC` integer sort, achieving near zero latency matching.

**Q: How does the system securely handle automated chron tasks without relying on external triggers like AWS EventBridge?**
**A:** The Node API initializes `node-cron` listeners on server start (`EngagementService`). It pulls `patients` where `last_transfusion_date + frequency_in_days` nears today. To prevent a crashed server from losing schedules, or multiple server instances sending dupes, the DB uses a pessimistic locking model `SELECT ... FOR UPDATE` when grabbing due patients, processing the WhatsApp Queue, and immediately updating `last_transfusion_date` to complete the cycle.

**Q: Why bypass an ORM and use raw PL/pgSQL for donor routing?**
**A:** Using an ORM (like Prisma/Sequelize) requires pulling all potential donors into Node.js memory just to filter them by constraints and ML scores. Wrapping this into a native PL/pgSQL function (`find_donors_for_bridge`) restricts data movement. Node.js sends the parameters, and PostgreSQL does all the heavy memory filtering internally, spitting back only the exact 5 UUIDs required—drastically cutting network IO overheads.

**Q: How does the AI (Gemini 2.0 Flash) handle unpredictable or ambiguous typos in WhatsApp messages?**
**A:** Instead of rigid regex, we pass the raw user text string to Gemini alongside a STRICT system prompt defining expected JSON schemas (`zod`/Type constraints). If a user types "I nd blud in delih a pos", Gemini acts as an autonomous NLP router. It infers "Delhi" as the city, "A+" as the blood group, and "blood_request" as the intent, returning a sanitized JSON object our backend easily parses. If the confidence is too low, Gemini reverts with an `"intent": "unknown"`, dropping the payload safely into the Admin's `inbox_messages` table for manual review.

---

## 📞 The WhatsApp Integration Engine

**How it works structurally:**
The entire end-user experience (for Donors and Patients) runs without requiring app downloads. The system relies natively on the **Meta WhatsApp Cloud API**.
1. **Webhook Listener:** The Node.js server maintains a single `POST /webhook` endpoint that continuously listens for incoming SMS payloads from Meta.
2. **Crypto-Validation:** Meta secures this by signing the body with a `SHA256 HMAC`. The Node.js middleware intercepts the raw binary buffer of the request, validates the crypto-hash computationally against the `WHATSAPP_APP_SECRET`, and then parses the JSON. This categorically rejects malicious forged webhook calls.
3. **Interactive Payloads:** The backend heavily utilizes WhatsApp "Interactive Messages" (Buttons and List forms). Rather than forcing a donor to type arbitrary "Yes" or "No" responses which are prone to typos, the system pushes tracked, structured button payloads to their phone.
4. **Session-less Architecture:** REST APIs via Webhooks are entirely stateless. To overcome this, the backend constructs session context from the inbound `phone` number, routing the intent based on whether the number is relationally mapped in the database to a Donor, Patient, Admin, or unregistered user.

---

## 🧠 Core Algorithms Used and Why

**1. Hybrid Constraint & ML Matchmaking Algorithm (Donor Routing)**
- **Algorithm Type:** Heuristic Filtering + ML Descending Sort Strategy.
- **Why it's used:** Relying purely on an AI LLM to pick donors is a "black box" risk in critical healthcare. So, we first run a strict **deterministic numerical filter** (e.g., Must be in same City, exact Blood Match, NOT on a snooze period, NOT currently active in another bridge). Once this pool is filtered, we sort them by a pre-calculated **ML Reliability Score Index**.
- **How it works:** Implemented natively within `dbschme992025` via the `find_donors_for_bridge` PL/pgSQL function. This mathematically returns the top N donors with the highest probability to physically show up, while completely obeying hard medical constraints.

**2. RAG (Retrieval-Augmented Generation) with K-Nearest Neighbors**
- **Algorithm Type:** Vector Distance calculation (K-Nearest Neighbors approach using Cosine Similarity).
- **Why it's used:** Keyword matching (e.g., `LIKE '%blood%'`) fails dramatically for conversational FAQs (e.g., searching "Does it hurt?" against "Donation safety"). 
- **How it works:** When a user asks a medical question on WhatsApp, the Python ML layer uses `Sentence-Transformers` to map the English string into a high-dimensional dense vector. Supabase's `pgvector` extension then rigorously scans all embeddings in the `knowledge_base` table, fetching the geometrically closest text snippet (highest contextual match) and generates a human-readable response.

**3. Autoregressive Intent Extraction (LLM Routing)**
- **Algorithm Type:** Few-Shot Prompted NLP via Google Gemini 2.0 Flash.
- **Why it's used:** Real-world SMS chat is notoriously chaotic with typos, Hinglish slang, and mixed contexts. Traditional RegExp completely fails here.
- **How it works:** The raw text chunk is fed to the Gemini LLM algorithm enforcing a strict **JSON Schema format**. The LLM acts entirely as a robust structural router, extracting Named Entities (NER) like cities and blood groups, avoiding arbitrary logic branches in Node.js.

---

## ✨ Key Platform Features Powered By Algorithms

1. **Continuous "Blood Bridges":** Unlike generic broadcast models that spam the whole city, our rotational algorithm locks a fixed subset of targeted Donors to a specific Patient indefinitely. It automatically iterates a `rotation_position` pointer, so Donor A is called in Month 1, and Donor B in Month 2 seamlessly.
2. **Predictive Silence (Snoozing):** The algorithm tracks biological 90-day cooldown rules inherently. If you donate, the node-cron automatically injects a `snooze_until` timestamp exactly 90 days out, structurally protecting donors from being pinged when legally ineligible.
3. **Automated Escalation Protocol:** If an emergency request fails to gather its required `units_needed` using the optimal localized ML Matches within a time window, an automated background service geometrically "escalates" the radius, recursively expanding the algorithm's city/network limits.

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
> [!NOTE]
> If you encounter a `'craco' is not recognized` error, you can install the CLI globally using `npm install -g @craco/craco` or simply run `npx craco start`.

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
