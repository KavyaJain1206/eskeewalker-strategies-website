# EskeeWalker Strategies — React + FastAPI

## Frontend (Vite + React 18)

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build      # production build → dist/
```

## Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The Vite dev server proxies `/api/*` → `http://localhost:8000`.

## Pages & routes

| Route | Page |
|---|---|
| `/` | Home |
| `/work` | Work (filterable grid) |
| `/ai-creative-studio` | AI Creative Studio |
| `/sustainability` | Sustainability Communication |
| `/courses` | AI Courses |
| `/about` | About |
| `/contact` | Contact (form → POST /api/contact) |

## Contact form email (optional)

Set env vars before running uvicorn:

```
SMTP_HOST=smtp.gmail.com
SMTP_USER=youraddress@gmail.com
SMTP_PASS=your_app_password
```

Without these, submissions are logged to console only.
