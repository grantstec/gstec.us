document.addEventListener('DOMContentLoaded', function () {
    const editButtons = document.querySelectorAll('.editbutton');
    const saveButtons = document.querySelectorAll('.savebutton');
    const views = document.querySelectorAll('#view');
    const editScreens = document.querySelectorAll('#editscreen');

    // Ensure view sections are displayed by default
    views.forEach(view => {
        view.style.display = 'block';
    });

    // Ensure edit screens are hidden by default
    editScreens.forEach(editScreen => {
        editScreen.style.display = 'none';
    });

    console.log('Edit buttons:', editButtons);
    console.log('Save buttons:', saveButtons);

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('Edit button clicked');
            const parent = this.closest('.yourdeadlines, .teamdeadlines');
            const view = parent.querySelector('#view');
            const editScreen = parent.querySelector('#editscreen');

            // Add fade-out class to view and fade-in class to editScreen
            view.classList.add('fade-out');
            editScreen.classList.add('fade-in');

            // Use setTimeout to wait for the fade-out transition to complete
            setTimeout(() => {
                view.style.display = 'none';
                editScreen.style.display = 'block';
                view.classList.remove('fade-out');
            }, 500); // Match the duration of the CSS transition
        });
    });

    saveButtons.forEach(button => {
        button.addEventListener('click', async function () {
            console.log('Save button clicked');
            const parent = this.closest('.yourdeadlines, .teamdeadlines');
            const view = parent.querySelector('#view');
            const editScreen = parent.querySelector('#editscreen');
            const inputs = editScreen.querySelectorAll('input');
            const data = {};

            inputs.forEach(input => {
                data[input.className] = input.value;
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
                    editScreen.classList.add('fade-out');
                    view.classList.add('fade-in');

                    // Use setTimeout to wait for the fade-out transition to complete
                    setTimeout(() => {
                        editScreen.style.display = 'none';
                        view.style.display = 'block';
                        editScreen.classList.remove('fade-out');
                    }, 500); // Match the duration of the CSS transition
                } else {
                    alert('Error saving deadlines');
                    
                    // Add fade-out class to editScreen and fade-in class to view
                    editScreen.classList.add('fade-out');
                    view.classList.add('fade-in');

                    // Use setTimeout to wait for the fade-out transition to complete
                    setTimeout(() => {
                        editScreen.style.display = 'none';
                        view.style.display = 'block';
                        editScreen.classList.remove('fade-out');
                    }, 500); // Match the duration of the CSS transition
                }
            } catch (error) {
                alert('Error saving deadlines: ' + error.message);
                
                    // Add fade-out class to editScreen and fade-in class to view
                    editScreen.classList.add('fade-out');
                    view.classList.add('fade-in');

                    // Use setTimeout to wait for the fade-out transition to complete
                    setTimeout(() => {
                        editScreen.style.display = 'none';
                        view.style.display = 'block';
                        editScreen.classList.remove('fade-out');
                    }, 500); // Match the duration of the CSS transition
            }
        });
    });
});