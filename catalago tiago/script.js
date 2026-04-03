const button = document.getElementById('theme-toggle');

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  button.setAttribute('aria-label', theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro');
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
};

const profileLinks = document.querySelectorAll('.profiles a[data-name][data-img]');
profileLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const { name, img } = link.dataset;
    if (name) localStorage.setItem('perfilAtivoNome', name);
    if (img) localStorage.setItem('perfilAtivoImagem', img);
    const target = link.getAttribute('href');
    if (target) {
      window.location.href = target;
    }
  });
});

button.addEventListener('click', toggleTheme);
applyTheme(getPreferredTheme());
