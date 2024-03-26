btnAdd = document.getElementById('add-button');
let isRendered = 1;
let items = JSON.parse(localStorage.getItem('items')) || [];

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
}

btnAdd.addEventListener('click', addItem);

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
        let newText = prompt('Edit item:', "");
        if (newText !== "") {
            items[id] = newText;
            localStorage.setItem('items', JSON.stringify(items));
            displayItems();
      }else{
        alert( "To-Do item can not be empty!" );
        document.getElementById('todo-input').focus() ;
        return;
      }
    }
});

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