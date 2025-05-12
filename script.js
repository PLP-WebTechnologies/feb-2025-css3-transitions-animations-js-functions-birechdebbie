

// Initialize user preferences
let userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
  theme: 'light',
  animationSpeed: 1,
  fontSize: 16
};

// Apply saved preferences on page load
function applyPreferences() {
  // Theme
  document.body.className = userPreferences.theme;
  document.documentElement.style.setProperty('--animation-speed', `${userPreferences.animationSpeed}s`);
  document.body.style.fontSize = `${userPreferences.fontSize}px`;

  // Update UI controls to match saved values
  document.querySelector('#speed-slider').value = userPreferences.animationSpeed;
  document.querySelector('#font-size').value = userPreferences.fontSize;
}

// Save preferences to localStorage
function savePreferences() {
  localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

// Toggle theme (single function)
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("themeIcon");

  // Update theme
  userPreferences.theme = userPreferences.theme === 'light' ? 'dark' : 'light';
  body.className = userPreferences.theme;

  // Update icon
  icon.classList.toggle('fa-moon', userPreferences.theme === 'dark');
  icon.classList.toggle('fa-sun', userPreferences.theme === 'light');

  // Trigger animations
  icon.classList.add('spin');
  setTimeout(() => icon.classList.remove('spin'), 1000);

  // Ripple effect
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  document.getElementById("themeBtn").appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  // Save preferences
  savePreferences();
}

// Event listeners
document.getElementById("themeBtn").addEventListener("click", toggleTheme);
document.querySelector('#speed-slider').addEventListener('input', (e) => {
  userPreferences.animationSpeed = e.target.value;
  document.documentElement.style.setProperty('--animation-speed', `${e.target.value}s`);
  savePreferences();
});
document.querySelector('#font-size').addEventListener('change', (e) => {
  userPreferences.fontSize = e.target.value;
  document.body.style.fontSize = `${e.target.value}px`;
  savePreferences();
});

// Initialize on load
applyPreferences();