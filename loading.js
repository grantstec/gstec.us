document.addEventListener('DOMContentLoaded', function () {
    const username = sessionStorage.getItem('username');
    if (username) {
        const welcomeText = document.getElementById('welcome-text');
        welcomeText.textContent += ` ${username.toUpperCase()}`;
    }
});
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        mainContent.classList.add('fade-in');

        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.style.display = 'none';
            mainContent.style.opacity = '1'; 
        });
    }, 3000);
});

