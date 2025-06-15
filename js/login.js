document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const continueButton = form.querySelector('button[type="submit"]');

  passwordInput.style.display = 'none';
  passwordInput.required = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email) return alert('Por favor, insira seu email.');

    const userData = localStorage.getItem(email);

    if (!userData) {
      window.location.href = `cadastro.html?email=${encodeURIComponent(email)}`;
    } else {
      emailInput.style.display = 'none';
      passwordInput.style.display = 'block';
      passwordInput.required = true;
      passwordInput.focus();

      continueButton.textContent = 'Login';

      form.onsubmit = (event) => {
        event.preventDefault();
        const senha = passwordInput.value.trim();
        if (!senha) return alert('Por favor, insira sua senha.');

        const storedUser = JSON.parse(localStorage.getItem(email));
        if (storedUser.password === senha) {
          sessionStorage.setItem('usuarioLogado', email);
          window.location.href = 'home-page.html';
        } else {
          alert('Senha incorreta. Tente novamente.');
          passwordInput.value = '';
          passwordInput.focus();
        }
      };
    }
  });
});
