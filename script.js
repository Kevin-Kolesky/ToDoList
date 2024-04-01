
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
//*/
////////////////

/*
btnAdd = document.getElementById('add-button');
let isRendered = 1;
let items = JSON.parse(localStorage.getItem('items')) || [];
let UpdateState = false;

function addItem(){
    let item = document.getElementById('todo-input').value;
    
    if( item == "" ) {
        alert( "To-Do item can not be empty!" );
        document.getElementById('todo-input').focus() ;
        return;
     }

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));

    const list = document.getElementById('todo-list');
    let HTMLString = `
        <li class="list-item" id="item${items.length - 1}">
        ${item}
        <button id="delete${items.length - 1}" class="delete-button">x</button>
        <button id="edit${items.length - 1}" class="edit-button">✎</button>      
        </li> 
    `; 
    list.insertAdjacentHTML('beforeend', HTMLString);
    
    if (UpdateState === false ){
        btnAdd.addEventListener('click', addItem);
    } else{
        btnAdd.addEventListener('click', () => editItem(id))
    }
}

function displayItems() {
    const list = document.getElementById('todo-list');
    list.innerHTML = ''; // Clear previous items

    items.forEach((item, index) => {
        let HTMLString = `
            <li class="list-item" id="item${index}">
            ${item}
            <button id="delete${index}" class="delete-button">x</button>
            <button id="edit${index}" class="edit-button">✎</button>
            </li> 
        `;
        list.insertAdjacentHTML('beforeend', HTMLString);
    });
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        const id = event.target.id.replace('edit', ''); // Remove "edit" text from the ID
        let item = document.getElementById('todo-input');
        item.focus();
        UpdateState = true;
        if (UpdateState === false ){
            btnAdd.addEventListener('click', addItem);
        } else{
            btnAdd.addEventListener('click', () => editItem(id))
        }
    }
});

function editItem(id){
    let  newText = document.getElementById('todo-input').value;
    if (newText !== "") {
        items[id] = newText;
        localStorage.setItem('items', JSON.stringify(items));
        displayItems();
        UpdateState = false;
  }else{
    alert( "To-Do item can not be empty!" );
    document.getElementById('todo-input').focus() ;
    return;
  }
}


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const id = event.target.id.replace('delete', ''); // Remove "delete" text from the ID
        document.getElementById(`item${id}`).remove();
        
        items.splice(id, 1);
        localStorage.setItem('items', JSON.stringify(items));
        isRendered--;

        // Update IDs of subsequent items after deletion
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach((button, index) => {
            if (index >= id) {
                button.id = index;
                button.parentElement.id = `item${index}`;
            }
        });
    }
});

// Display items when the page loads
window.addEventListener('load', displayItems);


*/