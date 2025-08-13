document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on system preference
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    themeSwitch.textContent = prefersDark ? '☀️' : '🌙';
    
    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeSwitch.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}); 