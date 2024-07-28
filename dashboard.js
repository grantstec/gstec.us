document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.querySelector('.button');
    logoutButton.addEventListener('click', function () {
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    const navLinks = document.querySelectorAll('.maincontent nav a');
    const indicator = document.querySelector('.maincontent nav .indicator');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const activeLink = document.querySelector('.maincontent nav a.active');
            if (activeLink) {
                activeLink.classList.remove('active');
            }
            this.classList.add('active');
            moveIndicator(this);
        });
    });

    function moveIndicator(element) {
        const rect = element.getBoundingClientRect();
        const navRect = element.parentElement.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left - navRect.left}px`;
    }

    // Initialize the indicator position
    const activeLink = document.querySelector('.maincontent nav a.active');
    if (activeLink) {
        moveIndicator(activeLink);
    }
});