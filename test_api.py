import unittest
import json
from app import app, init_db

class CyberFortressApiTestCase(unittest.TestCase):
    def setUp(self):
        """Set up test client and initialize database."""
        app.config['TESTING'] = True
        self.client = app.test_client()
        init_db()

    def test_get_alerts(self):
        """Test GET /api/alerts returns simulated security events."""
        response = self.client.get('/api/alerts')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        self.assertIn('id', data[0])
        self.assertIn('severity', data[0])

    def test_triage_alert(self):
        """Test POST /api/alerts/triage updates alert status."""
        payload = {'id': 'EVT-9042', 'status': 'BLOCKED'}
        response = self.client.post('/api/alerts/triage', 
                                    data=json.dumps(payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data.get('success'))
        self.assertEqual(data.get('status'), 'BLOCKED')

    def test_get_challenges(self):
        """Test GET /api/challenges returns CTF puzzles."""
        response = self.client.get('/api/challenges')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        self.assertIn('title', data[0])
        self.assertIn('points', data[0])

    def test_submit_challenge_correct(self):
        """Test POST /api/challenge/submit with correct flag awards points."""
        payload = {'challenge_id': 'ctf-1', 'flag': 'CS{CyberFortressBase64_Decoded}'}
        response = self.client.post('/api/challenge/submit',
                                    data=json.dumps(payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data.get('success'))
        self.assertGreater(data.get('pointsAwarded'), 0)

    def test_submit_challenge_incorrect(self):
        """Test POST /api/challenge/submit with incorrect flag fails."""
        payload = {'challenge_id': 'ctf-1', 'flag': 'WRONG_FLAG'}
        response = self.client.post('/api/challenge/submit',
                                    data=json.dumps(payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data.get('success'))
        self.assertEqual(data.get('pointsAwarded'), 0)

    def test_get_user_score(self):
        """Test GET /api/user/score returns user points."""
        response = self.client.get('/api/user/score')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('points', data)
        self.assertIn('username', data)

if __name__ == '__main__':
    unittest.main()
