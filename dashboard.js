document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.querySelector('.button');
    logoutButton.addEventListener('click', function () {
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    const navLinks = document.querySelectorAll('.maincontent nav a');
    const indicator = document.querySelector('.maincontent nav .indicator');
    const contentCards = document.querySelectorAll('.content-card');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const activeLink = document.querySelector('.maincontent nav a.active');
            if (activeLink) {
                activeLink.classList.remove('active');
            }
            this.classList.add('active');
            moveIndicator(this);
            showContent(this.getAttribute('data-content'));
        });
    });

    function moveIndicator(element) {
        const rect = element.getBoundingClientRect();
        const navRect = element.parentElement.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left - navRect.left}px`;
    }

    function showContent(contentId) {
        contentCards.forEach(card => {
            card.classList.remove('active');
            if (card.id === contentId) {
                card.classList.add('active');
            }
        });
    }

    // Initialize the indicator position and show the first content
    const activeLink = document.querySelector('.maincontent nav a.active') || navLinks[0];
    if (activeLink) {
        activeLink.classList.add('active');
        moveIndicator(activeLink);
        showContent(activeLink.getAttribute('data-content'));
    }
});