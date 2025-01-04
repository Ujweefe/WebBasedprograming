const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const icon = themeToggle.querySelector('i');

function toggleTheme() {
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-fill');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
if (savedTheme === 'light') {
    icon.classList.remove('bi-moon-fill');
    icon.classList.add('bi-sun-fill');
}

themeToggle.addEventListener('click', toggleTheme); 