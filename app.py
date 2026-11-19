import os
import sqlite3
import webbrowser
from flask import Flask, render_template, send_from_directory, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder='dist', template_folder='dist')
DB_NAME = 'cyberFortress.db'

def init_db():
    """Initialize SQLite database with required tables and seed sample data."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Users Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            points INTEGER DEFAULT 180,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Security Events Table (SOC Dashboard)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS security_events (
            id TEXT PRIMARY KEY,
            time TEXT NOT NULL,
            type TEXT NOT NULL,
            source_ip TEXT NOT NULL,
            target TEXT NOT NULL,
            severity TEXT NOT NULL,
            status TEXT NOT NULL,
            details TEXT NOT NULL
        )
    ''')

    # CTF Challenges Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ctf_challenges (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            points INTEGER NOT NULL,
            description TEXT NOT NULL,
            prompt TEXT NOT NULL,
            hint TEXT NOT NULL,
            correct_flag TEXT NOT NULL,
            explanation TEXT NOT NULL
        )
    ''')

    # User Results / Scores Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ctf_scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            challenge_id TEXT,
            score INTEGER,
            completion_date DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Seed default security events if empty
    cursor.execute('SELECT COUNT(*) FROM security_events')
    if cursor.fetchone()[0] == 0:
        default_events = [
            ('EVT-9042', '10:08:41', 'SYN Flood Anomaly', '185.191.171.42', 'Edge-WAF-01', 'HIGH', 'BLOCKED', 'Exceeded 12,000 req/sec threshold from single ASN. Automatic rate limiting rule triggered.'),
            ('EVT-9041', '10:06:19', 'SSH Brute-Force Attempt', '45.155.205.233', 'Bastion-Host-04', 'CRITICAL', 'BLOCKED', '142 consecutive failed root password attempts. IP blacklisted in firewall table for 24h.'),
            ('EVT-9040', '10:02:55', 'TLS Handshake Mismatch', '194.26.29.112', 'Auth-Gateway', 'MEDIUM', 'DETECTED', 'Legacy SSLv3 handshake negotiation rejected by modern crypto suite.'),
            ('EVT-9039', '09:58:12', 'DNS Exfiltration Beacon', '10.0.4.88', 'External DNS (1.1.1.1)', 'HIGH', 'REVIEWED', 'High-entropy TXT records query pattern detected. Machine isolated for sandbox forensic triage.'),
            ('EVT-9038', '09:51:04', 'Legitimate L7 API Inspection', '172.16.20.15', 'Core-API-Cluster', 'OK', 'RESOLVED', 'Regular microservice health probe validated successfully.')
        ]
        cursor.executemany('INSERT OR REPLACE INTO security_events VALUES (?, ?, ?, ?, ?, ?, ?, ?)', default_events)

    # Seed default CTF challenges if empty
    cursor.execute('SELECT COUNT(*) FROM ctf_challenges')
    if cursor.fetchone()[0] == 0:
        default_challenges = [
            ('ctf-1', 'Base64 Decryption Challenge', 'Cryptography', 'Beginner', 25, 'An intercepted network packet contained an obfuscated authentication token encoded in Base64.', 'Decode the following Base64 string to retrieve the hidden flag: `Q3N7Q3liZXJGb3J0cmVzc0Jhc2U2NF9EZWNvZGVkfQ==`', 'Use a standard Base64 decoder or JavaScript atob() function.', 'CS{CyberFortressBase64_Decoded}', 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. Decoding the ciphertext reveals the plain text flag.'),
            ('ctf-2', 'Log Forensics: Brute Force Detection', 'Log Forensics', 'Intermediate', 40, 'Analyze the SSH authentication logs of the bastion gateway to find the attacker’s successful password guess or flag indicator.', 'Examine the logs:\n10:01:21 SSH Failed root (185.220.101.4)\n10:01:30 SSH SUCCESS root (185.220.101.4) [Flag: CS{BruteForce_Detected_2026}]', 'Look closely at the successful authentication log entry bracketed by the attacker IP.', 'CS{BruteForce_Detected_2026}', 'Security log analysis allows SOC analysts to correlate brute-force attempts and identify when an attacker successfully breached an account.'),
            ('ctf-3', 'Phishing Header Inspection', 'Phishing Analysis', 'Beginner', 20, 'Inspect the received email headers to find the malicious sender domain spoofing Microsoft.', 'A suspicious email header shows:\nFrom: support@micros0ft-security-update.com\nWhat is the exact typo-squatted domain name used in the attacker address?', 'Look at the spelling of microsoft in the sender domain.', 'micros0ft-security-update.com', 'Attackers frequently replace letters with visually similar numbers or characters (typosquatting) to deceive unsuspecting users.'),
            ('ctf-4', 'MFA & Cryptographic Protocols Quiz', 'Security Quiz', 'Advanced', 50, 'Test your advanced knowledge of Zero Trust authentication standards and FIDO2 hardware tokens.', 'Which authentication standard uses public-key cryptography and is completely immune to phishing attacks even if the user enters credentials on a malicious site? (Enter acronym e.g. FIDO2)', 'It is a W3C web authentication standard often using USB hardware keys or biometrics.', 'FIDO2', 'FIDO2 / WebAuthn binds cryptographic credentials to the specific origin domain, making phishing attacks impossible because the malicious site cannot forge the origin signature.')
        ]
        cursor.executemany('INSERT OR REPLACE INTO ctf_challenges VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', default_challenges)

    # Seed default user if empty
    cursor.execute('SELECT COUNT(*) FROM users')
    if cursor.fetchone()[0] == 0:
        hashed_pw = generate_password_hash('cybersecure2026')
        cursor.execute('INSERT INTO users (username, password_hash, points) VALUES (?, ?, ?)', ('CyberAnalyst', hashed_pw, 250))

    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """Retrieve all simulated security events from SQLite."""
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM security_events')
    rows = cursor.fetchall()
    conn.close()

    alerts = []
    for row in rows:
        alerts.append({
            'id': row['id'],
            'time': row['time'],
            'type': row['type'],
            'sourceIp': row['source_ip'],
            'target': row['target'],
            'severity': row['severity'],
            'status': row['status'],
            'details': row['details']
        })
    return jsonify(alerts)

@app.route('/api/alerts/triage', methods=['POST'])
def triage_alert():
    """Update security event status in SQLite."""
    data = request.json
    event_id = data.get('id')
    new_status = data.get('status')

    if not event_id or not new_status:
        return jsonify({'error': 'Missing id or status'}), 400

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('UPDATE security_events SET status = ? WHERE id = ?', (new_status, event_id))
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'id': event_id, 'status': new_status})

@app.route('/api/challenges', methods=['GET'])
def get_challenges():
    """Retrieve all CTF challenges from SQLite."""
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT id, title, category, difficulty, points, description, prompt, hint, explanation FROM ctf_challenges')
    rows = cursor.fetchall()
    conn.close()

    challenges = []
    for row in rows:
        challenges.append({
            'id': row['id'],
            'title': row['title'],
            'category': row['category'],
            'difficulty': row['difficulty'],
            'points': row['points'],
            'description': row['description'],
            'prompt': row['prompt'],
            'hint': row['hint'],
            'explanation': row['explanation']
        })
    return jsonify(challenges)

@app.route('/api/challenge/submit', methods=['POST'])
def submit_challenge():
    """Validate CTF challenge flag, update score, and record result."""
    data = request.json
    challenge_id = data.get('challenge_id')
    submitted_flag = data.get('flag')

    if not challenge_id or not submitted_flag:
        return jsonify({'error': 'Missing challenge_id or flag'}), 400

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('SELECT correct_flag, points FROM ctf_challenges WHERE id = ?', (challenge_id,))
    row = cursor.fetchone()

    if not row:
        conn.close()
        return jsonify({'error': 'Challenge not found'}), 404

    correct_flag, points = row[0], row[1]
    is_correct = (submitted_flag.strip() == correct_flag)

    if is_correct:
        # Update user points (default user ID 1)
        cursor.execute('UPDATE users SET points = points + ? WHERE id = 1', (points,))
        cursor.execute('INSERT INTO ctf_scores (user_id, challenge_id, score) VALUES (1, ?, ?)', (challenge_id, points))
        conn.commit()

    # Get updated user score
    cursor.execute('SELECT points FROM users WHERE id = 1')
    user_row = cursor.fetchone()
    total_points = user_row[0] if user_row else 180

    conn.close()

    return jsonify({
        'success': is_correct,
        'pointsAwarded': points if is_correct else 0,
        'totalPoints': total_points
    })

@app.route('/api/user/score', methods=['GET'])
def get_user_score():
    """Fetch current user score and stats."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('SELECT username, points FROM users WHERE id = 1')
    row = cursor.fetchone()
    conn.close()

    if row:
        return jsonify({'username': row[0], 'points': row[1]})
    return jsonify({'username': 'CyberAnalyst', 'points': 180})

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('dist', filename)

if __name__ == '__main__':
    print("====================================================")
    print("   Starting CyberFortress Sentinel (Flask Server)...")
    print("====================================================")
    print("Opening browser at http://localhost:5000/ ...")
    webbrowser.open('http://localhost:5000/')
    app.run(host='0.0.0.0', port=5000, debug=True)
