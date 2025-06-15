document.addEventListener('DOMContentLoaded', () => {
  const email = sessionStorage.getItem('usuarioLogado');
  if (!email) return;

  const userData = localStorage.getItem(email);
  if (!userData) return;

  try {
    const user = JSON.parse(userData);
    if (user.nome) {
      const userNameSpan = document.getElementById('user-name');
      if (userNameSpan) {
        userNameSpan.textContent = user.nome;
      }
    }
  } catch (e) {
    
  }

  document.querySelectorAll('.recycle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = 'maps-screen.html';
    });
  });
});
