function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
window.onload = () => {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
};
