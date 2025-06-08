document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.cadastro-form');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');

  const params = new URLSearchParams(window.location.search);
  const emailFromUrl = params.get('email');
  if (emailFromUrl) {
    emailInput.value = emailFromUrl;
    emailInput.readOnly = true;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) return alert('Preencha todos os campos.');

    if (localStorage.getItem(email)) {
      alert('Esse e-mail já está cadastrado. Faça login.');
      return window.location.href = 'index.html';
    }

    const novoUsuario = { email, password };
    localStorage.setItem(email, JSON.stringify(novoUsuario));

    window.location.href = 'index.html';
  });
});
