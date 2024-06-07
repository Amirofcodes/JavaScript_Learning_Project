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

// Function to validate form inputs
function validateForm(event) {
    event.preventDefault();
    let errors = [];
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('mail').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[!?#]).{8,}$/;

    if (!prenom) {
        errors.push("Prénom est requis.");
    }
    if (!nom) {
        errors.push("Nom est requis.");
    }
    if (!email || !emailRegex.test(email)) {
        errors.push("Email est requis et doit respecter un format de mail.");
    }
    if (!tel || !phoneRegex.test(tel)) {
        errors.push("Téléphone est requis et doit contenir uniquement des chiffres avec une longueur maximale de 10.");
    }
    if (!password || !passwordRegex.test(password)) {
        errors.push("Mot de passe est requis, doit avoir au moins 8 caractères et contenir au moins un caractère spécial (!, ?, #).");
    }

    const erreurDiv = document.getElementById('erreur');
    if (errors.length > 0) {
        erreurDiv.innerHTML = errors.join('<br>');
        erreurDiv.style.display = 'block';
    } else {
        erreurDiv.style.display = 'none';
        alert('Formulaire soumis avec succès!');
        // Submit the form programmatically if no errors
        document.getElementById('form').submit();
    }
}

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

// Calculator functionality
let calculatorDisplay;
let currentInput = '';
let previousInput = '';
let operator = '';

function initializeCalculator() {
    calculatorDisplay = document.getElementById('calculator-display');
    calculatorDisplay.value = '0';
    calculatorDisplay.focus();

    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    calculatorDisplay.addEventListener('keydown', handleKeyPress);
}

function handleButtonClick(event) {
    const value = event.target.innerText;

    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } else if (value === 'CE') {
        resetCalculator();
    } else if (value === '±') {
        toggleSign();
    } else if (value === '=') {
        calculateResult();
    } else {
        handleOperator(value);
    }
}

function handleKeyPress(event) {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        handleNumber(key);
    } else if (key === 'Delete') {
        resetCalculator();
    } else if (key === '=' || key === 'Enter') {
        event.preventDefault();
        calculateResult();
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        event.preventDefault();
        handleOperator(key);
    }
}

function handleNumber(value) {
    if (currentInput.includes('.') && value === '.') return;

    currentInput = currentInput === '0' ? value : currentInput + value;
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === '') return;

    if (previousInput !== '') {
        calculateResult();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (currentInput === '' || previousInput === '') return;

    let result;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function toggleSign() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function updateDisplay() {
    calculatorDisplay.value = currentInput === '' ? '0' : currentInput;
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

    document.getElementById('form').addEventListener('submit', validateForm);

    // Initialize the calculator
    initializeCalculator();
});
