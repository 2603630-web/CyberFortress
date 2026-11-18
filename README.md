# CyberFortress Sentinel — Interactive Cybersecurity Platform

> **Category:** ICT / Cybersecurity Education  
> **Brand & Design:** Inspired by QueryTel Sentinel & Reference UI  
> **Platform:** React 19 + TypeScript + Vite + Tailwind CSS  

---

## 🚀 Running the Prototype Locally

The prototype server is running live at:
**[http://localhost:5173/](http://localhost:5173/)**

To run or rebuild manually:
```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 🛡️ Prototype Feature Highlights

### 1. Sentinel Command Center Dashboard (Pixel-Matched to Reference UI)
- **Top Metric Status Ribbon:**
  - `Global Cyber Risk` (14 Low Threat) with circular progress meter
  - `MTTD` & `MTTR` (0 min)
  - `KILL CHAIN: NONE`
  - `DEBT: 0`
  - `IDENTITY RISK: LOW (0 fails)`
  - `AI SHIELD: ACTIVE`
  - `BLOCKED: 42,887` & `CASES: 0`
- **Secondary Stat Cards Row:**
  - `Security Events` (46,954, +12%)
  - `Critical Issues` (752, -2%)
  - `Warnings` (2,566, +5%)
  - `Normal Ops` (42,887, OK)
  - `IPS Attacks` (1,773, ACTIVE)
  - `Auth Failures` (34, MONITOR)
  - `App Control` (507, SCANNING)
- **Central Analytics Grid:**
  - **Threat Landscape:** Segmented Donut Chart showing 46.2k total events across Operational, Critical, and Warning thresholds
  - **Attack Vectors:** Vertical bar chart comparing IPS, SSL, DNS, Auth, and App incidents
  - **Top Egress Destinations:** Radial ring breakdown with 44.4k total events (AU, CA, DE, GB, IE, IN, NL, PK, SG, US)
  - **Most Active Firewall:** Magenta/pink frequency distribution chart peaking at 14.8k req/sec
  - **Infrastructure Health:** Real-time node monitors for Edge Gateway, DPI Inspection Cluster, Core Vault, and Standby Failover
- **Advanced Temporal Intelligence:**
  - Smooth multi-layer SVG wave area chart tracking 6-hour threat trends (4:00 to 10:00) with interactive hover crosshairs
- **Neural Awareness & L7 Inspection:**
  - Live AI quote card, 99.2% stable system entropy bar
  - Working `>_ CONSOLE` button opening an interactive diagnostic terminal
  - Working `AUDIT >` button opening a NIST SP 800-53 / ISO 27001 compliance audit modal

### 2. Featured Interactive Demo Module: Phishing Awareness Simulator (PRD Feature 1)
- **Simulated Corporate Inbox:**
  - 6 realistic scenarios: Urgent 365 Account Suspension, Legitimate GitHub CVE Advisory, CEO Gift Card BEC Scam, HR Benefits Phish, Google Workspace Sign-In, and DHL Package Delivery Trojan
- **Live Forensic Inspection:**
  - Header inspection (SPF, DKIM, Sender domain typosquatting)
  - Safe Link Sandbox: Hovering over action buttons reveals real hidden target URLs in real-time
- **Gamified Scoring:**
  - Classify as "Mark Legitimate" or "Report as Phishing"
  - Instant pedagogical feedback card with indicator breakdown and defensive takeaways
  - Confetti celebration, +50 XP reward, and live accuracy score updates that reflect on the Sentinel Dashboard!

### 3. Future Roadmap Modules ("Coming Soon")
- **Attack & Defense Simulator:** Interactive WAF mitigation toggle teaser
- **Password Security Checker:** Real-time client-side entropy strength meter teaser
- **MFA Demonstration Hub:** TOTP and FIDO2 authentication comparison preview
- **Mini SOC Console & Incident Response:** SIEM event logs and containment playbook
- **CTF Challenge Arena:** Flag submission sandbox with immediate feedback
- **Learning Center:** CIA Triad and verifiable academic certificate preview
- **Early Access Notification Form:** Working subscriber simulation for students and evaluators

### 4. Interactive AI Quick Copilot (Ctrl+K / ⌘K)
- Autonomous cybersecurity assistant with instant queries for threat analysis, phishing detection indicators, and kill chain definitions.

---

## 🎓 Recommended Presentation Flow for Your Teacher / Mam

1. **Start on Landing View:** Click "Landing View" in the top bar to show the cinematic hero with animated cyber fortress logo, "Defend the Digital World" headline, and the 6+1 modular architecture.
2. **Switch to Sentinel Dashboard:** Click "Explore CyberFortress Sentinel" to reveal the full-fledged SOC command center matching your reference UI.
3. **Showcase AI Copilot & Terminal:**
   - Click `QUICK COPILOT` (or press `Ctrl+K`) and select *"Explain the Threat Landscape donut chart"*.
   - Click `>_ CONSOLE` under Neural Awareness and type `status` or `scan` to demonstrate live CLI diagnostics.
   - Click `AUDIT >` to show the academic compliance report (Grade AAA).
4. **Demonstrate the Active Phishing Lab:**
   - Click "Launch Demo Lab" (or select Phishing Simulator from the left sidebar).
   - Select the urgent Microsoft email, hover over the action button to demonstrate the hidden typosquatted link `micros0ft-verify.net`.
   - Click **"Report as Phishing"** to trigger the confetti celebration, earn +50 XP, and show the pedagogical feedback card.
   - Return to the dashboard to show that the stats and learning score have updated in real time.
5. **Preview Upcoming Modules:** Click on "Attack & Defense" or "Password Checker" in the sidebar to demonstrate the planned architecture, interactive teaser sandboxes, and early-access roadmap for version 2.0.
