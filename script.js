btnAdd = document.getElementById('add-button');
let isRendered = 0;

function addItem(){
    let item = document.getElementById('todo-input').value;
    
    let items = JSON.parse(localStorage.getItem('items'));
    if (items !== null){ 
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        items = JSON.parse(localStorage.getItem('items'));
    }else{
        let items = [item];
        localStorage.setItem('items', JSON.stringify(items));   
    }
    
    console.log(items);
    for (i=isRendered; i<=items.length-1; i++){
        let HTMLString = `
        <li class="list-item" id="item${i}">${items[i]} <button id=${i} class="delete-button">x</button></li> 
        `; 
        const list = document.getElementById('todo-list');
        list.insertAdjacentHTML('beforeend', HTMLString);
    }
    isRendered = i;
    deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.id;
            document.getElementById(`item${id}`).remove();
            
            delete items[id];
            localStorage.setItem('items', JSON.stringify(items));
            items = JSON.parse(localStorage.getItem('items'));
            isRendered--;
        });
    });
}

btnAdd.addEventListener('click',addItem);