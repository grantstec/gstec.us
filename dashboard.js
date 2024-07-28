function startCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    if (!countdownElement) {
        console.error('Countdown element not found');
        return;
    }
    const targetDate = new Date('June 5, 2025 11:00:00').getTime();
    console.log('Target date:', targetDate);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        console.log('Time remaining:', distance);

        if (distance < 0) {
            countdownElement.innerHTML = "EXPIRED";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display the timer immediately
}

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

    startCountdown();

    function moveIndicator(element) {
        const rect = element.getBoundingClientRect();
        const navRect = element.parentElement.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left - navRect.left}px`;
    }

    function showContent(contentId) {
        contentCards.forEach(card => {
            card.classList.remove('active');
        });
    
        setTimeout(() => {
            contentCards.forEach(card => {
                if (card.id === contentId) {
                    card.classList.add('active');
                }
            });
        }, 500); 
    }
    

    const activeLink = document.querySelector('.maincontent nav a.active') || navLinks[0];
    if (activeLink) {
        activeLink.classList.add('active');
        moveIndicator(activeLink);
        showContent(activeLink.getAttribute('data-content'));
    }
});