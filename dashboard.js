async function fetchDeadlines(username) {
    try {
        const response = await fetch(`/fetchdeadlines?username=${username}`);
        const responseText = await response.text();
        console.log('Response text:', responseText); 
        
        try {
            const jsonResponse = JSON.parse(responseText);
            console.log('Parsed JSON response:', jsonResponse);
            
            if (jsonResponse.results && Array.isArray(jsonResponse.results)) {
                console.log('Results array:', jsonResponse.results); 
                updateDeadlines(jsonResponse.results);
            } else {
                console.error('No deadlines found for the user.');
                updateDeadlines([]); // Clear existing content if no deadlines are found
            }
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            console.error('Response text:', responseText);
        }
    } catch (error) {
        console.error('Error fetching deadlines:', error);
    }
}

function updateDeadlines(deadlines) {
    console.log('Updating deadlines with:', deadlines); 
    const deadlineContainer = document.querySelector('.yourdeadlines');
    deadlineContainer.innerHTML = ''; 

    const heading = document.createElement('h3');
    heading.textContent = 'YOUR DEADLINES';
    deadlineContainer.appendChild(heading);

    if (deadlines.length === 0) {
        const noDeadlinesMessage = document.createElement('div');
        noDeadlinesMessage.textContent = 'NO DEADLINES FOUND.'; 
        deadlineContainer.appendChild(noDeadlinesMessage);
        return;
    }

    // Helper function to parse month-day strings into Date objects
    function parseDate(dateStr) {
        const [month, day] = dateStr.split(' ');
        const monthIndex = new Date(Date.parse(month + " 1, 2023")).getMonth(); // Get month index
        return new Date(new Date().getFullYear(), monthIndex, parseInt(day));
    }

    // Sort deadlines by date
    deadlines.sort((a, b) => {
        const dateA = parseDate(a.user_deadline_date);
        const dateB = parseDate(b.user_deadline_date);
        return dateA - dateB;
    });

    deadlines.forEach(deadline => {
        const deadlineBlock = document.createElement('div');
        deadlineBlock.classList.add('deadlineblock');

        const deadlineDate = document.createElement('div');
        deadlineDate.classList.add('deadlinedate');
        deadlineDate.textContent = deadline.user_deadline_date.toUpperCase(); // reminder convert to uppercase

        const deadlineInfo = document.createElement('div');
        deadlineInfo.classList.add('deadline');
        deadlineInfo.textContent = deadline.user_deadline_info.toUpperCase(); 

        deadlineBlock.appendChild(deadlineDate);
        deadlineBlock.appendChild(deadlineInfo);
        deadlineContainer.appendChild(deadlineBlock);
    });

    setTimeout(() => {
        adjustPaddingBottom();
    }, 1500); //this took three hours
}

//team deadline stuff
async function fetchTeamDeadlines() {
    try {
        const response = await fetch(`/fetchdeadlines?username=team_deadline`);
        const responseText = await response.text();
        console.log('Team Response text:', responseText); 
        
        try {
            const jsonResponse = JSON.parse(responseText);
            console.log('Parsed Team JSON response:', jsonResponse);
            
            if (jsonResponse.results && Array.isArray(jsonResponse.results)) {
                console.log('Team Results array:', jsonResponse.results); 
                updateTeamDeadlines(jsonResponse.results);
            } else {
                console.error('No team deadlines found.');
                updateTeamDeadlines([]); // Clear existing content if no deadlines are found
            }
        } catch (jsonError) {
            console.error('Error parsing Team JSON:', jsonError);
            console.error('Team Response text:', responseText);
        }
    } catch (error) {
        console.error('Error fetching team deadlines:', error);
    }
}

function updateTeamDeadlines(deadlines) {
    console.log('Updating team deadlines with:', deadlines); 
    const teamDeadlineContainer = document.querySelector('.teamdeadlines');
    teamDeadlineContainer.innerHTML = ''; 

    const heading = document.createElement('h3');
    heading.textContent = 'TEAM DEADLINES';
    teamDeadlineContainer.appendChild(heading);

    if (deadlines.length === 0) {
        const noDeadlinesMessage = document.createElement('div');
        noDeadlinesMessage.textContent = 'NO TEAM DEADLINES FOUND.'; 
        teamDeadlineContainer.appendChild(noDeadlinesMessage);
        return;
    }

    // Helper function to parse month-day strings into Date objects
    function parseDate(dateStr) {
        const [month, day] = dateStr.split(' ');
        const monthIndex = new Date(Date.parse(month + " 1, 2023")).getMonth(); // Get month index
        return new Date(new Date().getFullYear(), monthIndex, parseInt(day));
    }

    // Sort deadlines by date
    deadlines.sort((a, b) => {
        const dateA = parseDate(a.user_deadline_date);
        const dateB = parseDate(b.user_deadline_date);
        return dateA - dateB;
    });

    deadlines.forEach(deadline => {
        const deadlineBlock = document.createElement('div');
        deadlineBlock.classList.add('deadlineblock');

        const deadlineDate = document.createElement('div');
        deadlineDate.classList.add('deadlinedate');
        deadlineDate.textContent = deadline.user_deadline_date.toUpperCase(); // reminder convert to uppercase

        const deadlineInfo = document.createElement('div');
        deadlineInfo.classList.add('deadline');
        deadlineInfo.textContent = deadline.user_deadline_info.toUpperCase(); 

        deadlineBlock.appendChild(deadlineDate);
        deadlineBlock.appendChild(deadlineInfo);
        teamDeadlineContainer.appendChild(deadlineBlock);
    });

    // Call adjustPaddingBottom after updating team deadlines
    setTimeout(() => {
        adjustPaddingBottom();
    }, 1500); // Delay to ensure DOM updates are rendered
}

function adjustPaddingBottom() {
    console.log('adjustPaddingBottom function called');
    const deadlineBlocks = document.querySelectorAll('.deadlineblock');
    console.log('Found deadline blocks:', deadlineBlocks);

    deadlineBlocks.forEach(block => {
        const dateElement = block.querySelector('.deadlinedate');
        const deadlineElement = block.querySelector('.deadline');

        if (dateElement && deadlineElement) {
            const dateRect = dateElement.getBoundingClientRect();
            const deadlineRect = deadlineElement.getBoundingClientRect();
            console.log('Date rect:', dateRect);
            console.log('Deadline rect:', deadlineRect);

            if (dateRect.height !== deadlineRect.height) {
                const maxHeight = Math.max(dateRect.height, deadlineRect.height);
                console.log('Max height:', maxHeight);

                const datePadding = (maxHeight - dateRect.height) / 2 + 5;
                const deadlinePadding = (maxHeight - deadlineRect.height) / 2 + 5;

                if (dateRect.height < deadlineRect.height) {
                    dateElement.style.paddingBottom = `${datePadding}px`;
                    deadlineElement.style.paddingBottom = '0px';
                } else {
                    dateElement.style.paddingBottom = '0px';
                    deadlineElement.style.paddingBottom = `${deadlinePadding}px`;
                }

                console.log(`Adjusted padding for date: ${dateElement.outerHTML} Padding: ${datePadding}px`);
                console.log(`Adjusted padding for deadline: ${deadlineElement.outerHTML} Padding: ${deadlinePadding}px`);
            } else {
                console.log('Heights are already equal, no adjustment needed.');
            }
        }
    });
}




document.addEventListener('DOMContentLoaded', function () {
    const username = sessionStorage.getItem('username');
    if (username) {
        fetchDeadlines(username);
    } else {
        console.error('Username not found in sessionStorage');
    }

    // Call fetchTeamDeadlines to fetch team deadlines
    fetchTeamDeadlines();
});

function startCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    if (!countdownElement) {
        console.error('Countdown element not found');
        return;
    }
    const targetDate = new Date('June 5, 2025 11:00:00').getTime();
    // console.log('Target date:', targetDate);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        // console.log('Time remaining:', distance);

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
    updateCountdown();
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

