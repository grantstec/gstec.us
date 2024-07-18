// // Function to update the Spline Viewer's background based on the theme
// function updateSplineViewerBackground(theme) {
//     const splineViewer = document.querySelector('.spline-container');
//     if (splineViewer) {
//       splineViewer.style.backgroundColor = theme === 'dark' ? '#292929' : '#ffffff';
//     }
//   }
  
//   document.addEventListener('DOMContentLoaded', () => {
//     const themeSwitch = document.getElementById('checkbox');
//     // Retrieve the current theme from localStorage or default to 'light'
//     const currentTheme = localStorage.getItem('theme') || 'light';
//     // Apply the current theme
//     document.documentElement.setAttribute('data-theme', currentTheme);
  
//     if (currentTheme === 'dark') {
//       themeSwitch.checked = true;
//       updateSplineViewerBackground('dark');
//     } else {
//       updateSplineViewerBackground('light');
//     }
  
//     // Listener for theme switch toggle
//     themeSwitch.addEventListener('change', function() {
//       let theme = this.checked ? 'dark' : 'light';
//       document.documentElement.setAttribute('data-theme', theme);
//       localStorage.setItem('theme', theme);
//       updateSplineViewerBackground(theme);
//     });
//   });

