import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getFirestore, collection, getDocs, doc, updateDoc
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadDoctorVerifications() {
  const container = document.getElementById('admin-root');
  container.innerHTML = '<h2>Pending Doctor Verifications</h2>';
  const querySnapshot = await getDocs(collection(db, "verifications"));

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const card = document.createElement('div');
    card.className = 'post';
    card.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>License:</strong> ${data.license}</p>
      <p><strong>Institution:</strong> ${data.institution}</p>
      <button onclick="approveDoctor('${docSnap.id}')">Approve</button>
    `;
    container.appendChild(card);
  });
}

window.approveDoctor = async function(id) {
  const docRef = doc(db, "verifications", id);
  await updateDoc(docRef, { status: "approved" });
  alert("Doctor approved.");
  loadDoctorVerifications();
};

loadDoctorVerifications();