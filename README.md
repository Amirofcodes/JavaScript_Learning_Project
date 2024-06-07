# JavaScript Learning Project

Welcome to my first JavaScript project! This project includes a digital clock, a shopping list, a registration form, and a calculator. The purpose of this project is to learn and demonstrate fundamental JavaScript concepts.

## Project Features

### Digital Clock
- **Description**: Displays the current time, updated every second.
- **Interactivity**: The clock moves away from the cursor when hovered over and resets to its initial position above the title when double-clicked.
- **Implementation**: Uses `setInterval` to update the clock every second and event listeners to track mouse movements and reposition the clock.

### Shopping List
- **Description**: Allows users to add, delete, and download items in a shopping list.
- **Interactivity**: 
  - Add items using the "OK" button.
  - Remove the last item using the "Supprime" button.
  - Download the list as a text file using the "Télécharger" button.
- **Implementation**: Utilizes event listeners for button clicks to manage the shopping list items.

### Formulaire d'inscription
- **Description**: A registration form with validation for each input field.
- **Fields**: Prénom, Nom, Email, Téléphone, Mot de passe.
- **Validation**: 
  - Prénom, Nom: Required.
  - Email: Required and must be in a valid email format.
  - Téléphone: Required, must be numeric and have a maximum length of 10.
  - Mot de passe: Required, must be at least 8 characters long and contain at least one special character (!, ?, #).
- **Implementation**: Form validation on submit, with error messages displayed in a div. Uses regex for validation checks.

### Calculator
- **Description**: A basic calculator that performs arithmetic operations.
- **Operations**: Addition, Subtraction, Multiplication, Division, Modulo.
- **Additional Functions**: 
  - Toggle positive/negative sign.
  - Support for decimal numbers.
  - Reset (CE) functionality.
- **Interactivity**: 
  - Supports button clicks for operations.
  - Supports keyboard input for operations and reset (Delete key).
- **Implementation**: Event listeners for button clicks and keydown events to handle calculator operations and updates the display.

### Navigation Bar
- **Buttons**:
  - **Toggle Background Color**: Changes the background color randomly with a fade effect.
  - **Toggle Sound Effects**: Enables or disables sound effects.
  - **Reload Page**: Reloads the page.
- **Implementation**: Uses event listeners to toggle functionalities and reload the page.

### Popup Explanations
- **Description**: Displays simplified explanations of the JavaScript code when hovering over specific elements.
- **Interactivity**: Popups appear when the cursor is over the navigation bar, the shopping list container, or the clock title.
- **Implementation**: Event listeners show and hide the popup with explanations.

## Upcoming Features

### Advanced Form and Calculator Features
- **Description**: Enhance the form with real-time validation feedback and add advanced calculator functions like square roots and exponents.
- **Implementation**: Utilize JavaScript event listeners and DOM manipulation to provide a more interactive user experience.

## How to Run the Project

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/JavaScript_Learning_Project.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd JavaScript_Learning_Project
    ```

3. **Open `index.html` in a web browser** to see the project in action.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests with improvements.

## License

This project is licensed under the MIT License.
