# CyberFortress Technical Documentation & Architecture Guide

**Project Name:** CyberFortress — Interactive Cyber Attack Detection, Simulation & Awareness Platform  
**Academic Program:** BS Cybersecurity — First Semester (ICT Semester Project)  
**Assigned Role (Member 3):** SOC Dashboard, CTF & Integration Developer  

---

## 1. Executive Summary
CyberFortress is an interactive cybersecurity educational platform designed to help users understand common cyber threats, experience controlled attack simulations, and learn practical defensive techniques. 

As **Member 3**, the core focus encompassed building the Mini SOC Dashboard, implementing the CTF Challenge Arena, designing simulated security event data structures, integrating Flask with SQLite, and performing end-to-end system testing and technical documentation.

---

## 2. System Architecture
CyberFortress follows a robust three-layer architecture:

```text
                    ┌────────────────────────┐
                    │      USER / BROWSER    │
                    └───────────┬────────────┘
                                │
                        HTTP / REST APIs
                                │
                                ▼
                    ┌────────────────────────┐
                    │      FLASK SERVER      │
                    │        (app.py)        │
                    └───────────┬────────────┘
                                │
                         SQL Queries
                                │
                                ▼
                    ┌────────────────────────┐
                    │     SQLITE DATABASE    │
                    │   (cyberFortress.db)   │
                    └────────────────────────┘
```

1. **Presentation Layer (Frontend):** Built with React (TypeScript), Tailwind CSS, and Lucide icons. Renders the Mini SOC Dashboard, CTF Challenge Arena, and interactive simulations with smooth SVG/Chart.js telemetry trendlines.
2. **Application Layer (Backend):** Built with Python Flask (`app.py`). Handles routing, REST API communication, flag/answer validation, and score tracking.
3. **Data Layer (Database):** Powered by SQLite (`cyberFortress.db`). Stores users, security telemetry events, CTF challenges, and user scores securely.

---

## 3. Database Schema (`cyberFortress.db`)

### 3.1 `users` Table
Stores user account profiles and cumulative points.
- `id` (INTEGER, Primary Key)
- `username` (TEXT, Unique)
- `password_hash` (TEXT, Werkzeug hashed)
- `points` (INTEGER, Default: 180)
- `created_at` (DATETIME)

### 3.2 `security_events` Table
Stores Mini SOC Dashboard telemetry alerts.
- `id` (TEXT, Primary Key)
- `time` (TEXT)
- `type` (TEXT)
- `source_ip` (TEXT)
- `target` (TEXT)
- `severity` (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `OK`)
- `status` (`BLOCKED`, `DETECTED`, `REVIEWED`, `RESOLVED`)
- `details` (TEXT)

### 3.3 `ctf_challenges` Table
Stores Capture The Flag puzzles and validation flags.
- `id` (TEXT, Primary Key)
- `title` (TEXT)
- `category` (`Cryptography`, `Log Forensics`, `Phishing Analysis`, `Security Quiz`)
- `difficulty` (`Beginner`, `Intermediate`, `Advanced`)
- `points` (INTEGER)
- `description` (TEXT)
- `prompt` (TEXT)
- `hint` (TEXT)
- `correct_flag` (TEXT)
- `explanation` (TEXT)

### 3.4 `ctf_scores` Table
Records user challenge completions and point awards.
- `id` (INTEGER, Primary Key)
- `user_id` (INTEGER)
- `challenge_id` (TEXT)
- `score` (INTEGER)
- `completion_date` (DATETIME)

---

## 4. Flask REST API Reference

| Endpoint | Method | Description | Request Body Example |
|---|---|---|---|
| `/api/alerts` | `GET` | Retrieve all security event telemetry | — |
| `/api/alerts/triage` | `POST` | Update security event status (`BLOCKED`, `REVIEWED`) | `{"id": "EVT-9042", "status": "BLOCKED"}` |
| `/api/challenges` | `GET` | Fetch all CTF puzzles and prompts | — |
| `/api/challenge/submit` | `POST` | Validate CTF flag and award points | `{"challenge_id": "ctf-1", "flag": "CS{...}"}` |
| `/api/user/score` | `GET` | Fetch active user profile points | — |

---

## 5. Security & Hardening Measures
1. **SQL Injection Defense:** All SQLite queries utilize parameterized placeholders (`?`), completely eliminating SQL injection vectors.
2. **XSS & Injection Protection:** User input (`searchQuery`, flag submissions) is strictly sanitized and compared as plain text. All rendered content uses React JSX auto-escaping.
3. **Credential Security:** User passwords are cryptographically hashed using Werkzeug (`generate_password_hash`).
4. **Input Validation:** Request bodies are validated for key presence before database execution.

---

## 6. Functional Testing & Verification
- **TypeScript Type Checking (`tsc --noEmit`):** Passed with **0 errors**.
- **Production Build (`vite build`):** Compiled successfully.
- **Python Syntax Compilation (`py_compile app.py`):** Passed with **0 errors**.
- **API Testing:** Verified `/api/alerts`, `/api/challenges`, and `/api/challenge/submit` return correct JSON payloads and update SQLite state accurately.
