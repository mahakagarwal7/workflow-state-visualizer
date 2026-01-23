# workflow-state-visualizer
A vanilla JavaScript, DOM-driven web application that visualizes workflow state transitions.

The project is in three states:-
1)State(data):- what the app knows
2)Logic(rules):- how the app behaves
3)DOM(UI) :- what the user sees



# Workflow State Visualizer

A vanilla JavaScript, DOM-driven web application that visualizes workflow state transitions through dynamic UI updates and client-side state management.





 Features Implemented

- Add new work items dynamically
- Visualize workflow stages (Draft, Review, Approved)
- Move items between valid workflow states
- Enforce workflow transition rules
- Activity history log showing state changes with timestamps
- Client-side state persistence using LocalStorage
- Input validation and edge-case handling
- Clean and readable user interface


This project heavily uses DOM manipulation concepts, including:

- `document.querySelector` and `querySelectorAll`
- `document.createElement`
- Dynamic element creation and removal
- `appendChild` and `remove`
- `dataset` for linking DOM elements with application state
- Event handling using `addEventListener`
- Event delegation for dynamically created elements
- Conditional rendering based on application state

---



- HTML5
- CSS3 (Flexbox)
- Vanilla JavaScript (ES6)
- Browser LocalStorage API



How to Run the Project?

1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. Start adding and managing workflow items

No additional setup is required.






 Demo

A short demo video is included to showcase:
- Adding items
- Moving items between workflow stages
- Activity history updates
- State persistence on page refresh





Built as part of the **Web Dev II (Batch 2029) Final Project** using core JavaScript and DOM manipulation.
