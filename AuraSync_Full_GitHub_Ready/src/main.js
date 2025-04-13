import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getFirestore, collection, addDoc
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "FAKE_KEY_REPLACE",
  authDomain: "aurasync-app.firebaseapp.com",
  projectId: "aurasync-app",
  storageBucket: "aurasync-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const root = document.getElementById('root');

function Signup() {
  const form = document.createElement('form');

  const title = document.createElement('h2');
  title.textContent = 'Create an AuraSync Account';
  form.appendChild(title);

  form.innerHTML += `
    <label for="name">Name</label>
    <input id="name" type="text" required />

    <label for="email">Email</label>
    <input id="email" type="email" required />

    <label for="password">Password</label>
    <input id="password" type="password" required />

    <label for="role">Signup As</label>
    <select id="role">
      <option value="user">User</option>
      <option value="doctor">Doctor</option>
    </select>

    <div id="doctorFields" style="display: none;">
      <label for="license">Medical License Number</label>
      <input id="license" type="text" />

      <label for="institution">Institution</label>
      <input id="institution" type="text" />

      <label for="idUpload">Upload ID (PDF or Image)</label>
      <input id="idUpload" type="file" accept=".pdf,image/*" />
      <small style="color:lightgray;">Your file is encrypted and securely stored. Admins only.</small>
    </div>

    <button type="submit" style="margin-top: 1rem;">Register</button>
  `;

  form.querySelector('#role').onchange = (e) => {
    const doctorFields = form.querySelector('#doctorFields');
    doctorFields.style.display = e.target.value === 'doctor' ? 'block' : 'none';
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const role = form.querySelector('#role').value.trim();

    const data = {
      name,
      email,
      role,
      license: role === 'doctor' ? form.querySelector('#license').value.trim() : '',
      institution: role === 'doctor' ? form.querySelector('#institution').value.trim() : '',
      timestamp: new Date()
    };

    if (role === 'doctor') {
      await addDoc(collection(db, 'verifications'), data);
      alert('Doctor signup received. Verification pending.');
    } else {
      alert(`User ${name} registered successfully.`);
    }

    form.reset();
    form.querySelector('#doctorFields').style.display = 'none';
  };

  return form;
}

root.appendChild(Signup());