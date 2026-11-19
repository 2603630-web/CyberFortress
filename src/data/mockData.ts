import { PhishingEmail, ModuleMetadata, SecurityEvent, UserStats, CtfChallenge } from '../types';

export const initialUserStats: UserStats = {
  securityScore: 82,
  modulesCompleted: 1,
  totalModules: 6,
  eventsAnalyzed: 126,
  xp: 650,
  blockedAttacks: 42887,
  threatLevel: 'LOW THREAT',
  cyberRisk: 14,
  accuracy: 88,
};

export const modulesList: ModuleMetadata[] = [
  {
    id: 'phishing',
    title: 'Phishing Awareness Simulator',
    shortDesc: 'Identify suspicious emails, spear-phishing cues, spoofed domains and urgent social engineering attacks.',
    iconName: 'MailWarning',
    badge: 'LIVE DEMO AVAILABLE',
    status: 'ACTIVE',
    estimatedDuration: '10 Mins',
    difficulty: 'Beginner',
    tags: ['Email Security', 'Social Engineering', 'URL Inspection'],
    overview: 'Test your threat analysis skills against simulated real-world cyber fraud, credential harvesters, and legitimate enterprise notices.',
    keyFeatures: [
      'Realistic email client with header inspection',
      'Real-time link destination analyzer',
      'Instant pedagogical forensic report',
      'XP point rewards and accuracy tracking'
    ]
  },
  {
    id: 'attack-defense',
    title: 'Attack & Defense Simulator',
    shortDesc: 'Interactive node network demonstrating live Brute Force, DDoS, and Firewall mitigation controls.',
    iconName: 'ShieldAlert',
    badge: 'COMING SOON',
    status: 'COMING_SOON',
    estimatedDuration: '15 Mins',
    difficulty: 'Intermediate',
    tags: ['Network Security', 'DDoS Mitigation', 'WAF Rules'],
    overview: 'Simulate live cyber adversaries targeting web nodes and deploy rate limiting, firewalls, and account lockouts in real-time.',
    keyFeatures: [
      'Visual interactive network topology (Attacker -> WAF -> Gateway -> Server)',
      'Brute Force and SYN Flood simulation paths',
      'Toggleable defensive policies (WAF, Rate Limiting, Geo-blocking)',
      'Real-time packet loss and threat drop metrics'
    ]
  },
  {
    id: 'password',
    title: 'Password Security Checker',
    shortDesc: 'Entropy analysis, dictionary collision detector, and zero-storage password strength generator.',
    iconName: 'KeyRound',
    badge: 'COMING SOON',
    status: 'COMING_SOON',
    estimatedDuration: '8 Mins',
    difficulty: 'Beginner',
    tags: ['Cryptography', 'Entropy', 'Credential Defense'],
    overview: 'Evaluate password resiliency strictly client-side against common hash cracking dictionaries, pattern analysis, and brute-force estimate times.',
    keyFeatures: [
      'Zero-transmission client-side entropy calculator',
      'Crack time estimation using cluster GPU power simulations',
      'Common pattern and keyboard walk detector',
      'Cryptographically secure memorable passphrase generator'
    ]
  },
  {
    id: 'mfa',
    title: 'MFA Demonstration Hub',
    shortDesc: 'Step-by-step interactive comparison of Password-only, SMS OTP, Authenticator TOTP, and FIDO2 keys.',
    iconName: 'SmartphoneCheck',
    badge: 'COMING SOON',
    status: 'COMING_SOON',
    estimatedDuration: '12 Mins',
    difficulty: 'Beginner',
    tags: ['Zero Trust', 'FIDO2 / WebAuthn', 'TOTP Authentication'],
    overview: 'Experience firsthand how stolen credentials fail when protected by Time-based One Time Passwords and cryptographic hardware tokens.',
    keyFeatures: [
      'Interactive side-by-side credential compromise scenario',
      'Mock Authenticator App with rolling 30-second TOTP token generator',
      'Man-in-the-Middle (MitM) session hijacking resilience breakdown',
      'Passkey and hardware key cryptographic handshake explainer'
    ]
  },
  {
    id: 'soc',
    title: 'Mini SOC Dashboard & Incident Response',
    shortDesc: 'Enterprise triage console with SIEM event correlation, severity filtering, and containment playbook.',
    iconName: 'Terminal',
    badge: 'LIVE DEMO AVAILABLE',
    status: 'ACTIVE',
    estimatedDuration: '20 Mins',
    difficulty: 'Advanced',
    tags: ['SIEM', 'Incident Response', 'Threat Hunting'],
    overview: 'Step into the shoes of an L2 SOC Analyst to triage high-priority telemetry alerts, investigate lateral movement, and quarantine infected hosts.',
    keyFeatures: [
      'Real-time filterable Syslog and NetFlow telemetry stream',
      'Incident severity scoring matrix (Critical, High, Medium, Low)',
      'Integrated NIST 800-61 incident response containment workflow',
      'Automated root-cause analysis and forensic timeline'
    ]
  },
  {
    id: 'ctf',
    title: 'CyberFortress CTF Challenge Arena',
    shortDesc: 'Gamified puzzle arena with flag submissions, cipher decoders, mock log forensics, and leaderboard.',
    iconName: 'Trophy',
    badge: 'LIVE DEMO AVAILABLE',
    status: 'ACTIVE',
    estimatedDuration: '25 Mins',
    difficulty: 'Intermediate',
    tags: ['Capture The Flag', 'Forensics', 'Cryptography'],
    overview: 'Solve safe, hand-crafted cybersecurity puzzles, find hidden flags formatted as CS{...}, and climb the regional student leaderboard.',
    keyFeatures: [
      'Flag submission verification engine',
      'Base64, Caesar, and Hex decoding sandbox',
      'Interactive hint system with point deduction mechanics',
      'Live dynamic leaderboard with peer standings'
    ]
  },
  {
    id: 'learning',
    title: 'Learning Center & Achievements',
    shortDesc: 'CIA Triad masterclass, threat glossary, verifiable certificate generation, and XP badges.',
    iconName: 'GraduationCap',
    badge: 'BONUS MODULE',
    status: 'COMING_SOON',
    estimatedDuration: '30 Mins',
    difficulty: 'Beginner',
    tags: ['ICT Curriculum', 'CIA Triad', 'Certification'],
    overview: 'Structured pedagogical modules covering essential cyber hygiene, security frameworks, and a verifiable digital certificate for course presentations.',
    keyFeatures: [
      'Comprehensive CIA Triad interactive breakdown',
      'Visual threat dictionary with interactive vector diagrams',
      'Collectible badges (Phish Hunter, Firewall Warden, SOC Defender)',
      'Downloadable completion certificate for presentation'
    ]
  }
];

export const samplePhishingEmails: PhishingEmail[] = [
  {
    id: 'email-1',
    senderName: 'Microsoft 365 Security Team',
    senderEmail: 'security-alert@micros0ft-support-portal.net',
    recipient: 'analyst@enterprise-sentinel.org',
    subject: 'CRITICAL ALERT: Your Microsoft 365 Account will be suspended in 10 minutes!',
    date: 'Today, 09:15 AM',
    difficulty: 'Beginner',
    isPhishing: true,
    category: 'Credential Harvester / Urgent Coercion',
    bodyText: `Dear User,\n\nWe detected suspicious login activity originating from an unverified IP address in Moscow, Russia (185.220.101.5).\n\nTo prevent unauthorized access, your organizational account will be PERMANENTLY SUSPENDED within 10 minutes unless you re-verify your identity immediately.\n\nPlease click the secure verification link below and submit your current domain credentials to retain access.`,
    ctaText: 'Verify Account Credentials Immediately',
    ctaTargetUrl: 'https://login.micros0ft-verify.net/auth/session-token?id=984321',
    realDisplayUrl: 'https://login.micros0ft-verify.net/... [ATTACKER SERVER]',
    indicators: [
      'Domain Typosquatting: "micros0ft-support-portal.net" replaces letter "o" with digit "0".',
      'Artificial Urgency: "Suspended in 10 minutes" is designed to trigger panic and bypass critical thinking.',
      'Credential Demand: Legitimate security teams never ask you to click an email link to re-enter sensitive credentials.',
      'Unsigned Sender Headers: Failed SPF / DMARC authentication check.'
    ],
    explanation: 'This is a classic credential harvesting attack. Cybercriminals craft high-urgency threats of immediate service loss so victims rush to click fraudulent login clones before verifying the sender domain.',
    educationalTip: 'Always hover over links to inspect the destination URL. If the domain does not strictly match the genuine provider (e.g. microsoft.com), it is 100% malicious.'
  },
  {
    id: 'email-2',
    senderName: 'GitHub Security',
    senderEmail: 'security-advisories@github.com',
    recipient: 'analyst@enterprise-sentinel.org',
    subject: '[Security Advisory] High-severity vulnerability in dependency: express-jwt',
    date: 'Today, 08:42 AM',
    difficulty: 'Intermediate',
    isPhishing: false,
    category: 'Legitimate System Advisory',
    bodyText: `Hi @analyst,\n\nA security advisory has been published affecting one or more repositories in your organization:\n\nSeverity: High (CVSS 7.8)\nVulnerability: Insecure signature verification in express-jwt versions < 8.4.1\nFix available: Upgrade to version 8.4.2\n\nYou do not need to reply to this email. You can review the details directly on GitHub under your repository Security tab or via the advisory link below.`,
    ctaText: 'View Advisory on GitHub.com',
    ctaTargetUrl: 'https://github.com/advisories/GHSA-jw7v-98x4-74qp',
    realDisplayUrl: 'https://github.com/advisories/GHSA-jw7v-98x4-74qp',
    indicators: [
      'Official Sender Domain: Matches @github.com with verified DKIM and SPF cryptographic signatures.',
      'No Artificial Coercion: No panic-inducing deadlines, no threats of immediate account termination.',
      'Direct Navigation Option: Email instructs user they can navigate independently through their repository.',
      'No Credential Input Required: Links directly to a public security advisory without login prompts.'
    ],
    explanation: 'This is a genuine security notification. It communicates technical vulnerability details without requesting passwords, gift cards, or immediate coercive actions.',
    educationalTip: 'Legitimate automated security alerts typically give clear, calm technical advisories and offer internal in-app navigation routes.'
  },
  {
    id: 'email-3',
    senderName: 'David Sterling (CEO)',
    senderEmail: 'david.sterling.ceo.office@gmail.com',
    recipient: 'analyst@enterprise-sentinel.org',
    subject: 'Confidential: Need urgent assistance with vendor payment cards',
    date: 'Today, 07:18 AM',
    difficulty: 'Intermediate',
    isPhishing: true,
    category: 'Executive Impersonation (CEO Fraud / BEC)',
    bodyText: `Hey, are you at your desk?\n\nI am currently in an all-day confidential board meeting and cannot take calls right now. We have an urgent overseas client meeting starting in 30 minutes and I need to send them 5 Apple / Google Play digital gift cards ($200 each) as contract closing incentives.\n\nCould you please purchase these right away with company expense or your card? I will have finance wire you full reimbursement plus a bonus by 4:00 PM today. Send the codes directly to my personal email here.\n\nPlease keep this strictly between us until the contract is signed.\n\nThanks,\nDavid Sterling\nChief Executive Officer`,
    ctaText: 'Reply Directly to Personal Email',
    ctaTargetUrl: 'mailto:david.sterling.ceo.office@gmail.com',
    realDisplayUrl: 'mailto:david.sterling.ceo.office@gmail.com',
    indicators: [
      'Public Freemail Address: CEO purportedly emailing from a free @gmail.com address rather than company domain.',
      'Unusual Payment Method: Demanding gift cards for enterprise contract incentives is the hallmark of BEC (Business Email Compromise).',
      'Isolation Tactic: "Keep this strictly between us" and "cannot take phone calls" prevents the employee from verifying via official channels.',
      'Bypassing Procurement: Urging personal funds with promise of delayed reimbursement.'
    ],
    explanation: 'This is Business Email Compromise (BEC). Attackers impersonate senior executives to exploit organizational hierarchy and pressure subordinates into irreversible financial transfers.',
    educationalTip: 'Never execute financial requests or purchase gift cards based solely on email. Always establish secondary out-of-band confirmation (such as a voice call or verified internal Slack).'
  },
  {
    id: 'email-4',
    senderName: 'Internal HR Benefits Portal',
    senderEmail: 'notifications@company-benefits-review2026.org',
    recipient: 'analyst@enterprise-sentinel.org',
    subject: 'Mandatory Action: Updated 2026 Health & Compensation Adjustments',
    date: 'Yesterday, 04:30 PM',
    difficulty: 'Advanced',
    isPhishing: true,
    category: 'Targeted Spear Phishing / HR Bait',
    bodyText: `All Employees,\n\nPlease find attached the approved annual compensation adjustments and 2026 health insurance coverage updates.\n\nDue to updated labor compliance policies, every employee must sign into the external portal and confirm their direct deposit routing information and emergency contacts before this Friday to avoid payroll processing delays.\n\nAccess your personalized compensation breakdown below:`,
    ctaText: 'Review My Compensation Breakdown',
    ctaTargetUrl: 'https://portal.company-benefits-review2026.org/login?dept=it&emp=9420',
    realDisplayUrl: 'https://portal.company-benefits-review2026.org/... [PHISHING DOMAIN]',
    indicators: [
      'Lookalike Third-Party Domain: The organization uses .com/.org internal subdomains, but this uses an external unregistered domain.',
      'Targeted Sensitive Data Request: Demanding direct deposit and routing details.',
      'Threat of Payroll Delay: Creates severe emotional pressure regarding paycheck receipt.',
      'Generic Greeting: "All Employees" instead of personalized organizational identifiers.'
    ],
    explanation: 'Sophisticated attackers often weaponize HR topics like bonuses, layoffs, or salary adjustments because they target universally high emotional curiosity and fear.',
    educationalTip: 'Corporate HR systems are accessed through bookmark-verified internal SSO portals, never through obscure third-party links received unexpectedly in emails.'
  },
  {
    id: 'email-5',
    senderName: 'Google Workspace Team',
    senderEmail: 'no-reply@accounts.google.com',
    recipient: 'analyst@enterprise-sentinel.org',
    subject: 'Security Alert: New sign-in detected on your Google Account',
    date: 'Yesterday, 01:12 PM',
    difficulty: 'Beginner',
    isPhishing: false,
    category: 'Legitimate System Alert',
    bodyText: `Your Google Account was just signed into from a new Windows workstation.\n\nDetails:\n• Device: Chrome on Windows 11\n• Location: Lahore, Pakistan\n• Time: Oct 15, 2026, 1:12 PM (UTC+5)\n\nIf this was you, you can safely disregard this message. If you do not recognize this activity, please review your recent devices immediately in your Google Account Security Dashboard.`,
    ctaText: 'Check Activity on Google Accounts',
    ctaTargetUrl: 'https://myaccount.google.com/notifications',
    realDisplayUrl: 'https://myaccount.google.com/notifications',
    indicators: [
      'Authentic Google Domain: Rooted in official @accounts.google.com and points to myaccount.google.com.',
      'Neutral Informative Tone: Gives device/location facts without urgent panic or countdown timers.',
      'Safe Default Option: Clearly mentions "If this was you, you can safely disregard this message".',
      'Valid Cryptographic Signatures: Full SPF, DKIM, and DMARC passes.'
    ],
    explanation: 'Legitimate identity providers send informative sign-in alerts when a new device authenticates. They give actionable device metadata and link to canonical account hubs.',
    educationalTip: 'Authentic security notices will not threaten account deletion if you simply took the legitimate sign-in action.'
  },
  {
    id: 'email-6',
    senderName: 'DHL Express International',
    senderEmail: 'shipment-tracking@dhl-customs-parcel-clearance.cc',
    recipient: 'analyst@enterprise-sentinel.org',
    subject: 'Package Delivery #DHL-9948210: Customs duty required before final delivery',
    date: '2 Days Ago',
    difficulty: 'Intermediate',
    isPhishing: true,
    category: 'Malware / Delivery Phishing',
    bodyText: `Notice of Delivery Exception:\n\nYour international package (Tracking ID: DHL-882-9941) could not be delivered to your registered delivery address due to an unpaid customs tariff of $3.45.\n\nFailure to clear this fee within 48 hours will result in the package being returned to the overseas sender or destroyed.\n\nPlease download and print your official customs clearance receipt and barcode voucher below:`,
    ctaText: 'Download Customs Clearance Voucher (PDF.exe)',
    ctaTargetUrl: 'https://dhl-customs-parcel-clearance.cc/vouchers/delivery_receipt.pdf.exe',
    realDisplayUrl: 'https://dhl-customs-parcel-clearance.cc/receipt.pdf.exe [MALWARE DETECTED]',
    indicators: [
      'Double File Extension: The download ends in ".pdf.exe", which disguises an executable Trojan as a PDF document.',
      'Unofficial TLD Domain: Uses ".cc" top-level domain instead of the genuine "dhl.com" portal.',
      'Micro-Transaction Lure: $3.45 is a small amount intentionally chosen so users pay or click without second thought.',
      'Unsolicited Delivery Notice: User never placed an international shipment under this tracking code.'
    ],
    explanation: 'Delivery scams are prevalent worldwide. They entice users to download malicious payloads disguised as receipts or input credit card credentials into lookalike phishing forms.',
    educationalTip: 'Always verify unexpected delivery alerts directly on the courier’s official mobile app or website using their known tracking tool.'
  }
];

export const mockSecurityEvents: SecurityEvent[] = [
  {
    id: 'EVT-9042',
    time: '10:08:41',
    type: 'SYN Flood Anomaly',
    sourceIp: '185.191.171.42',
    target: 'Edge-WAF-01',
    severity: 'HIGH',
    status: 'BLOCKED',
    details: 'Exceeded 12,000 req/sec threshold from single ASN. Automatic rate limiting rule triggered.'
  },
  {
    id: 'EVT-9041',
    time: '10:06:19',
    type: 'SSH Brute-Force Attempt',
    sourceIp: '45.155.205.233',
    target: 'Bastion-Host-04',
    severity: 'CRITICAL',
    status: 'BLOCKED',
    details: '142 consecutive failed root password attempts. IP blacklisted in firewall table for 24h.'
  },
  {
    id: 'EVT-9040',
    time: '10:02:55',
    type: 'TLS Handshake Mismatch',
    sourceIp: '194.26.29.112',
    target: 'Auth-Gateway',
    severity: 'MEDIUM',
    status: 'DETECTED',
    details: 'Legacy SSLv3 handshake negotiation rejected by modern crypto suite.'
  },
  {
    id: 'EVT-9039',
    time: '09:58:12',
    type: 'DNS Exfiltration Beacon',
    sourceIp: '10.0.4.88',
    target: 'External DNS (1.1.1.1)',
    severity: 'HIGH',
    status: 'REVIEWED',
    details: 'High-entropy TXT records query pattern detected. Machine isolated for sandbox forensic triage.'
  },
  {
    id: 'EVT-9038',
    time: '09:51:04',
    type: 'Legitimate L7 API Inspection',
    sourceIp: '172.16.20.15',
    target: 'Core-API-Cluster',
    severity: 'OK',
    status: 'RESOLVED',
    details: 'Regular microservice health probe validated successfully.'
  }
];

export const threatTrendData = [
  { time: '4:00', value: 8900, critical: 120, blocked: 8700 },
  { time: '4:10', value: 9200, critical: 110, blocked: 9000 },
  { time: '4:20', value: 11400, critical: 230, blocked: 11100 },
  { time: '4:30', value: 14800, critical: 410, blocked: 14200 },
  { time: '4:40', value: 10200, critical: 180, blocked: 9900 },
  { time: '4:50', value: 9100, critical: 95, blocked: 8950 },
  { time: '5:00', value: 10500, critical: 140, blocked: 10300 },
  { time: '5:10', value: 12100, critical: 190, blocked: 11800 },
  { time: '5:20', value: 15900, critical: 510, blocked: 15300 },
  { time: '5:30', value: 11200, critical: 210, blocked: 10900 },
  { time: '5:40', value: 9800, critical: 130, blocked: 9600 },
  { time: '5:50', value: 10400, critical: 160, blocked: 10150 },
  { time: '6:00', value: 11800, critical: 220, blocked: 11500 },
  { time: '6:10', value: 14200, critical: 380, blocked: 13700 },
  { time: '6:20', value: 10600, critical: 170, blocked: 10350 },
  { time: '6:30', value: 9400, critical: 120, blocked: 9200 },
  { time: '6:40', value: 10100, critical: 150, blocked: 9900 },
  { time: '6:50', value: 12400, critical: 260, blocked: 12050 },
  { time: '7:00', value: 15800, critical: 490, blocked: 15200 },
  { time: '7:10', value: 12200, critical: 240, blocked: 11900 },
  { time: '7:20', value: 10100, critical: 130, blocked: 9900 },
  { time: '7:30', value: 9700, critical: 110, blocked: 9500 },
  { time: '7:40', value: 11200, critical: 210, blocked: 10900 },
  { time: '7:50', value: 13600, critical: 340, blocked: 13150 },
  { time: '8:00', value: 16400, critical: 560, blocked: 15700 },
  { time: '8:10', value: 12800, critical: 280, blocked: 12400 },
  { time: '8:20', value: 10500, critical: 150, blocked: 10250 },
  { time: '8:30', value: 9900, critical: 120, blocked: 9700 },
  { time: '8:40', value: 11500, critical: 220, blocked: 11200 },
  { time: '8:50', value: 14100, critical: 390, blocked: 13600 },
  { time: '9:00', value: 17200, critical: 620, blocked: 16450 },
  { time: '9:10', value: 13100, critical: 290, blocked: 12700 },
  { time: '9:20', value: 10800, critical: 160, blocked: 10550 },
  { time: '9:30', value: 10200, critical: 130, blocked: 10000 },
  { time: '9:40', value: 11900, critical: 240, blocked: 11550 },
  { time: '9:50', value: 14700, critical: 430, blocked: 14150 },
  { time: '10:00', value: 16800, critical: 580, blocked: 16100 }
];

export const mockCtfChallenges: CtfChallenge[] = [
  {
    id: 'ctf-1',
    title: 'Base64 Decryption Challenge',
    category: 'Cryptography',
    difficulty: 'Beginner',
    points: 25,
    description: 'An intercepted network packet contained an obfuscated authentication token encoded in Base64.',
    prompt: 'Decode the following Base64 string to retrieve the hidden flag: `Q3N7Q3liZXJGb3J0cmVzc0Jhc2U2NF9EZWNvZGVkfQ==`',
    hint: 'Use a standard Base64 decoder or JavaScript atob() function.',
    correctFlag: 'CS{CyberFortressBase64_Decoded}',
    explanation: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. Decoding the ciphertext reveals the plain text flag.'
  },
  {
    id: 'ctf-2',
    title: 'Log Forensics: Brute Force Detection',
    category: 'Log Forensics',
    difficulty: 'Intermediate',
    points: 40,
    description: 'Analyze the SSH authentication logs of the bastion gateway to find the attacker’s successful password guess or flag indicator.',
    prompt: 'Examine the logs:\n`10:01:21 SSH Failed root (185.220.101.4)`\n`10:01:25 SSH Failed root (185.220.101.4)`\n`10:01:30 SSH SUCCESS root (185.220.101.4) [Flag: CS{BruteForce_Detected_2026}]`\nWhat is the extracted flag?',
    hint: 'Look closely at the successful authentication log entry bracketed by the attacker IP.',
    correctFlag: 'CS{BruteForce_Detected_2026}',
    explanation: 'Security log analysis allows SOC analysts to correlate brute-force attempts and identify when an attacker successfully breached an account.'
  },
  {
    id: 'ctf-3',
    title: 'Phishing Header Inspection',
    category: 'Phishing Analysis',
    difficulty: 'Beginner',
    points: 20,
    description: 'Inspect the received email headers to find the malicious sender domain spoofing Microsoft.',
    prompt: 'A suspicious email header shows:\n`From: support@micros0ft-security-update.com`\nWhat is the exact typo-squatted domain name used in the attacker address?',
    hint: 'Look at the spelling of microsoft in the sender domain.',
    correctFlag: 'micros0ft-security-update.com',
    explanation: 'Attackers frequently replace letters with visually similar numbers or characters (typosquatting) to deceive unsuspecting users.'
  },
  {
    id: 'ctf-4',
    title: 'MFA & Cryptographic Protocols Quiz',
    category: 'Security Quiz',
    difficulty: 'Advanced',
    points: 50,
    description: 'Test your advanced knowledge of Zero Trust authentication standards and FIDO2 hardware tokens.',
    prompt: 'Which authentication standard uses public-key cryptography and is completely immune to phishing attacks even if the user enters credentials on a malicious site? (Enter acronym e.g. FIDO2)',
    hint: 'It is a W3C web authentication standard often using USB hardware keys or biometrics.',
    correctFlag: 'FIDO2',
    explanation: 'FIDO2 / WebAuthn binds cryptographic credentials to the specific origin domain, making phishing attacks impossible because the malicious site cannot forge the origin signature.'
  }
];
