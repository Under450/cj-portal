// Firebase config — same as FMM frontend
const firebaseConfig = {
  apiKey: "AIzaSyCToSDWiFy0zjDo4Amfe4_IV8z7N54jrQU",
  authDomain: "forward-my-mail.firebaseapp.com",
  projectId: "forward-my-mail",
  storageBucket: "forward-my-mail.firebasestorage.app",
  messagingSenderId: "933044287958",
  appId: "1:933044287958:web:fa3a707dbec62b24e74c77"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

const ALLOWED_UID = 'pY80AVfY9teBlcBD8b8EUo3rORm2';

// Auth gate — redirect to login if not authorised
auth.onAuthStateChanged(user => {
  if (!user || user.uid !== ALLOWED_UID) {
    if (!window.location.pathname.endsWith('/login.html')) {
      window.location.href = 'login.html';
    }
  }
});

// Helper to call functions
async function callFn(name, data = {}) {
  try {
    const result = await functions.httpsCallable(name)(data);
    return result.data;
  } catch (err) {
    console.error(`${name} failed:`, err);
    return null;
  }
}

// Badge tracking — mark tile as viewed
async function markViewed(key) {
  await callFn('panelMarkViewed', { key });
}

// Format helpers
function formatGBP(amount) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  }).format(amount);
}

function formatTime(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const now = new Date();
  const mins = Math.floor((now - d) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
