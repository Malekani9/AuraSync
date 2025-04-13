const root = document.getElementById('root');

function Login() {
  const form = document.createElement('form');
  const title = document.createElement('h2');
  title.textContent = 'Log in to AuraSync';
  form.appendChild(title);

  form.innerHTML += `
    <label for="username">Username</label>
    <input id="username" type="text" required />

    <label for="password">Password</label>
    <input id="password" type="password" required />

    <button type="submit" style="margin-top: 1rem;">Login</button>
  `;

  form.onsubmit = (e) => {
    e.preventDefault();
    const username = form.querySelector('#username').value.trim();
    const password = form.querySelector('#password').value.trim();

    if (username === 'AVERIC.0.0' && password === 'gemini1997') {
      alert('Welcome back, AVERIC. Developer access granted.');
      window.location.href = 'admin.html';
    } else {
      alert('Standard user login. Feature coming soon or ask for access.');
    }
  };

  return form;
}

root.appendChild(Login());