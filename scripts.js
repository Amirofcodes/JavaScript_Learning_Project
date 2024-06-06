// Clock functionality
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    
    const clockDiv = document.getElementById('horloge');
    clockDiv.innerHTML = time;
}

// Update the clock every second
setInterval(updateClock, 1000);

const initialClockPosition = {
    left: '50%',
    top: '30%' // Adjusted to accommodate the navigation bar
};

const moveSound = new Audio('move.mp3');
const resetSound = new Audio('reset.mp3');
let soundEnabled = true;
let bgColorInterval;
const initialBackgroundColor = '#f0f0f0'; // Define the initial background color explicitly

// Function to move the clock
function moveClock(event) {
    const clockDiv = document.getElementById('horloge');
    const clockRect = clockDiv.getBoundingClientRect();
    
    // Get the current mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // Calculate the distance between the clock and the mouse position
    const clockX = clockRect.left + clockRect.width / 2;
    const clockY = clockRect.top + clockRect.height / 2;
    const distanceX = mouseX - clockX;
    const distanceY = mouseY - clockY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const escapeDistance = 150; // Minimum distance from the cursor to the clock
    
    // If the cursor is within the escape distance, move the clock
    if (distance < escapeDistance) {
        const angle = Math.atan2(distanceY, distanceX);
        const moveX = Math.cos(angle) * escapeDistance;
        const moveY = Math.sin(angle) * escapeDistance;

        // Calculate new position
        let newX = mouseX - moveX;
        let newY = mouseY - moveY;

        // Ensure the clock stays within the window boundaries
        const minX = 0;
        const minY = 0;
        const maxX = window.innerWidth - clockRect.width;
        const maxY = window.innerHeight - clockRect.height;

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        // Set the new position of the clock
        clockDiv.style.left = `${newX}px`;
        clockDiv.style.top = `${newY}px`;

        // Play move sound if enabled
        if (soundEnabled) {
            moveSound.play();
        }
    }
}

// Function to reset clock position
function resetClockPosition() {
    const clockDiv = document.getElementById('horloge');
    clockDiv.style.left = initialClockPosition.left;
    clockDiv.style.top = initialClockPosition.top;

    // Play reset sound if enabled
    if (soundEnabled) {
        resetSound.play();
    }
}

// Function to change background color
function randomBackgroundColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33EC'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

// Function to toggle background color change
function toggleBackgroundColor() {
    const toggleButton = document.getElementById('toggle-bg-color');
    if (bgColorInterval) {
        clearInterval(bgColorInterval);
        bgColorInterval = null;
        document.body.style.backgroundColor = initialBackgroundColor;
        toggleButton.classList.remove('toggle-on');
    } else {
        bgColorInterval = setInterval(randomBackgroundColor, 5000);
        toggleButton.classList.add('toggle-on');
    }
}

// Function to toggle sound effects
function toggleSoundEffects() {
    soundEnabled = !soundEnabled;
    const toggleButton = document.getElementById('toggle-sound');
    toggleButton.classList.toggle('toggle-on', soundEnabled);
}

// Function to reload the page
function reloadPage() {
    location.reload();
}

// Function to show the popup with a simplified explanation of the JS code
function showPopup(event, explanation) {
    const popup = document.getElementById('popup');
    popup.innerText = explanation;
    popup.style.left = `${event.clientX + 10}px`;
    popup.style.top = `${event.clientY + 10}px`;
    popup.style.display = 'block';
}

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// Add event listener to track mouse movement
document.addEventListener('mousemove', moveClock);

// Add event listener to reset clock position on double-click
document.addEventListener('dblclick', resetClockPosition);

// Initialize the clock display
updateClock();

// Shopping list functionality
document.addEventListener('DOMContentLoaded', (event) => {
    const addButton = document.getElementById('addButton');
    const deleteButton = document.getElementById('deleteButton');
    const downloadButton = document.getElementById('downloadButton');
    const itemInput = document.getElementById('itemInput');
    const shoppingList = document.getElementById('shoppingList');
    const toggleBgColorButton = document.getElementById('toggle-bg-color');
    const toggleSoundButton = document.getElementById('toggle-sound');
    const reloadPageButton = document.getElementById('reload-page');
    const clockTitle = document.getElementById('clock-title');
    const shoppingListContainer = document.getElementById('shopping-list-container');
    const navbar = document.querySelector('nav');

    const clockExplanation = "Clock: This code updates the clock every second and moves the clock away when the cursor is near.";
    const shoppingListExplanation = "Shopping List: This code adds, removes, and downloads items in the shopping list.";
    const navbarExplanation = "Navbar: This code toggles background color, toggles sound effects, and reloads the page.";

    clockTitle.addEventListener('mouseover', (event) => showPopup(event, clockExplanation));
    clockTitle.addEventListener('mouseout', hidePopup);

    shoppingListContainer.addEventListener('mouseover', (event) => showPopup(event, shoppingListExplanation));
    shoppingListContainer.addEventListener('mouseout', hidePopup);

    navbar.addEventListener('mouseover', (event) => showPopup(event, navbarExplanation));
    navbar.addEventListener('mouseout', hidePopup);

    addButton.addEventListener('click', function() {
        const itemText = itemInput.value.trim();
        if (itemText !== "") {
            const listItem = document.createElement('li');
            listItem.textContent = itemText;
            shoppingList.appendChild(listItem);
            itemInput.value = "";
        }
    });

    deleteButton.addEventListener('click', function() {
        const lastItem = shoppingList.lastElementChild;
        if (lastItem) {
            shoppingList.removeChild(lastItem);
        }
    });

    downloadButton.addEventListener('click', function() {
        const items = document.querySelectorAll('#shoppingList li');
        const itemList = Array.from(items).map(item => item.textContent).join('\n');
        const blob = new Blob([itemList], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'shopping_list.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    toggleBgColorButton.addEventListener('click', toggleBackgroundColor);
    toggleSoundButton.addEventListener('click', toggleSoundEffects);
    reloadPageButton.addEventListener('click', reloadPage);
});
