
let items = JSON.parse(localStorage.getItem('items')) || [];
let UpdateState = false;
const btnAdd = document.getElementById('add-button');

function addItem() {
    let item = document.getElementById('todo-input').value;

    if (item === "") {
        alert("To-Do item can not be empty!");
        document.getElementById('todo-input').focus();
        return;
    }

    if (UpdateState === false) {
        items.push(item);
    } else {
        let id = UpdateState;
        items[id] = item;
        UpdateState = false;
    }

    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
    document.getElementById('todo-input').value = '';
}

function displayItems() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    items.forEach((item, index) => {
        let HTMLString = `            
            <li class="list-group-item text-white list-group-item-action bg-secondary" id="item${index}">
                <button type="button" class="delete-button btn-close btn-close-white float-end" aria-label="Close" id="edit${index}"></button>
                <p class="card-text text-truncate">${item}</p>
                <button type="button" class="edit-button btn btn-warning float-start" id="edit${index}">✎</button>
          </li> 
        `;
        list.insertAdjacentHTML('beforeend', HTMLString);
        btnAdd.innerHTML = 'Add';
    });

    // Attach event listeners for edit and delete buttons
    document.querySelectorAll('.edit-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            UpdateState = index; // Set the update state to the index of the item being edited
            document.getElementById('todo-input').value = items[index]; // Fill input with current item text
            btnAdd.innerHTML = 'Update';
            document.getElementById('todo-input').focus();
        });
    });

    document.querySelectorAll('.delete-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            displayItems(); // Update display after deletion
        });
    });
}

btnAdd.addEventListener('click', addItem);

// Display items when the page loads
window.addEventListener('load', displayItems);