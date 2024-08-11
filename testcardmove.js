document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.editbutton');
    const saveButtons = document.querySelectorAll('.savebutton');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const parent = this.closest('.yourdeadlines, .teamdeadlines');
            const view = parent.querySelector('#view');
            const editScreen = parent.querySelector('#editscreen');

            view.classList.remove('active');
            editScreen.classList.add('active');

            // Use setTimeout to wait for the fade-out transition to complete
        //     setTimeout(() => {
        //         view.style.display = 'none';
        //         editScreen.style.display = 'block';
        //         view.classList.remove('fade-out');
        //         editScreen.classList.remove('fade-in');
        //     }, 500); // Match the duration of the CSS transition
            });
    });
    saveButtons.forEach(button => {
        button.addEventListener('click', async function () {
            console.log('Save button clicked');
            const parent = this.closest('.yourdeadlines, .teamdeadlines');
            const view = parent.querySelector('#view');
            const editScreen = parent.querySelector('#editscreen');
            const inputs = editScreen.querySelectorAll('input');
            const data = {
                username: '',
                deadlines: []
            };

            // Determine if it's a team deadline or user deadline
            if (parent.classList.contains('teamdeadlines')) {
                data.username = 'team_deadline';
            } else {
                data.username = sessionStorage.getItem('username');
            }

            // Collect deadlines data
            inputs.forEach(input => {
                if (input.classList.contains('deadlinedate')) {
                    data.deadlines.push({
                        date: input.value,
                        info: input.nextElementSibling.value
                    });
                }
            });

            try {
                const response = await fetch('/save-deadlines', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Deadlines saved successfully');

                    // Add fade-out class to editScreen and fade-in class to view
                    editScreen.classList.remove('active');
                    view.classList.add('active');
                } else {
                    alert('Failed to save deadlines');
                    editScreen.classList.add('active');
                    view.classList.remove('active');
                }
            } catch (error) {
                console.error('Error saving deadlines:', error);
                alert('An error occurred while saving deadlines');
            }
        });
    });
});