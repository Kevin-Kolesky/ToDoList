
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
                
                <p class="card-text text-truncate">${item}</p>

                <button type="button" class="edit-button btn btn-warning float-start" id="edit${index}">
                    <?xml version="1.0" ?>
                    <svg class="feather feather-edit" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>

                <button type="button"  class="delete-button danger-button btn-danger btn" aria-label="Close" id="edit${index}">
                    <?xml version="1.0" ?>
                    <svg class="feather feather-trash" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
          </li> 
        `;
        list.insertAdjacentHTML('beforeend', HTMLString);
        btnAdd.innerHTML = 'Add';
        btnAdd.classList.add('btn-primary');
        btnAdd.classList.remove('btn-success');
    });

    // Attach event listeners for edit and delete buttons
    document.querySelectorAll('.edit-button').forEach((button, index) => {
        button.addEventListener('click', function() {
            UpdateState = index; // Set the update state to the index of the item being edited
            document.getElementById('todo-input').value = items[index]; // Fill input with current item text
            btnAdd.innerHTML = 'Update';
            btnAdd.classList.remove('btn-primary');
            btnAdd.classList.add('btn-success');
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