# HireSight

### AI Career Intelligence Platform for Students & Freshers

HireSight is a **full-stack SaaS-style platform** that helps students and early-career developers get **objective, explainable feedback** on their resumes, job fit, and interview readiness — all in one place.

> Built as a **portfolio-grade production system**, not a demo.

---

## Key Features

### Resume Intelligence
- PDF resume upload (Cloudinary)
- Skill extraction & heuristic scoring
- Resume history with detailed breakdown
- Explainable scoring (no black-box ML)

### Job Matching
- Browse curated job listings
- Match jobs against a selected resume
- Resume-based compatibility scoring

### AI Interview Simulation
- Role-based interview questions
- Session-safe interview flow
- One-time interview submission (no partial writes)
- AI-generated **markdown feedback**
- Interview history & detailed review

### Authentication
- Email & password login
- Google OAuth (Passport)
- Stateless JWT auth via HTTP-only cookies

### Dashboard
- Resume-first command center
- Latest resume score & skills
- Job matches computed dynamically

---

## Design Philosophy

- **MVP first, no over-engineering**
- **Deterministic & explainable logic**
- **Production-style architecture**
- **Locked decisions before coding**

---

## Architecture Overview

```
Frontend (Next.js)
   |
   |  HTTPS + Cookies (JWT)
   v
Backend (Node.js + Express)
   |
   |—— PostgreSQL (Users, Auth) → Prisma
   |
   |—— MongoDB (Resumes, Jobs, Interviews) → Mongoose
   |
   |—— Cloudinary (PDF Storage)
   |
   |—— LLM (Interview Feedback)
````

### Why SQL + NoSQL?

* **PostgreSQL** → Structured, relational auth data
* **MongoDB** → Flexible, document-heavy interview & resume data

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React + TypeScript
* Tailwind CSS
* shadcn/ui
* react-dropzone
* react-markdown

### Backend

* Node.js + Express
* TypeScript
* Prisma (PostgreSQL)
* Mongoose (MongoDB)
* Passport (Google OAuth)
* JWT (cookie-based auth)

### Infrastructure

* PostgreSQL (Docker → Neon)
* MongoDB Atlas
* Cloudinary (PDF storage)
* Render (Backend)
* Vercel (Frontend)

---

## Authentication Flow

1. User logs in (Email/Password or Google)
2. Backend issues JWT
3. JWT stored in **HTTP-only cookie**
4. Frontend uses `credentials: "include"`
5. No refresh tokens (MVP decision)

---

## Interview Persistence (Important Design Decision)

**Problem:**
Users abandoning interviews can pollute DB with partial data.

**Solution (Locked):**

* `POST /interview/start` → **NO DB WRITE**
* `POST /interview/submit` → **SINGLE DB WRITE**

**Frontend**

* Interview state stored in `sessionStorage`
* Resume logic based on `answers.length`

This guarantees **clean, reliable interview data**.

---

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/hiresight.git
cd hiresight
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=4000
DATABASE_URL=postgresql://...
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=development
```

Run:

```bash
npx prisma migrate dev
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

Run:

```bash
npm run dev
```

---

## Deployment

### Backend (Render)

* Uses PostgreSQL (Neon)
* Uses MongoDB Atlas
* Prisma migrations via:

```bash
npx prisma migrate deploy
```

### Frontend (Vercel)

* Root directory: `/frontend`
* Environment:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

### OAuth Redirect URI

```text
https://api.yourdomain.com/api/auth/google/callback
```

---

## Testing Strategy

* Backend APIs tested via Postman
* Frontend tested through full user flows:

  * Auth
  * Resume upload/delete
  * Job matching
  * Interview start → submit → feedback

---

## Known MVP Limitations

* No rate limiting (planned)
* Minimal validation
* No recruiter-side features
* No subscription or payments
* No ML embeddings / ATS parsing

---

## Roadmap

### Short Term

* Zod validation
* Rate limiting
* Interview score breakdown
* Better empty states

### Long Term

* Recruiter dashboard
* Resume version comparison
* Shareable interview reports
* ATS-style resume analysis
* Subscription model

---

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch
3. Commit with clear messages
4. Open a PR with explanation

Please keep changes:

* Simple
* Deterministic
* Aligned with MVP goals

---

## Why HireSight?

HireSight is not a tutorial project.

It demonstrates:

* Real SaaS architecture
* Thoughtful data modeling
* Auth done right
* Explainable AI usage
* Production deployment discipline

---

## License

[MIT License](LICENSE)

---

### Author

Built by **Kumar Sidharth**
For learning, portfolio, and real-world engineering practice.

