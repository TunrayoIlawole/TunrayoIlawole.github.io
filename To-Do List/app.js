const form = document.querySelector('#itemForm');
const inputItem = document.querySelector('#itemInput');
const btnClear = document.querySelector('#clear-items');
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');

let todoList = [];

// add items to the list
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const itemName = inputItem.value;

    if(itemName.length === 0) {
        feedback.innerHTML = `You can't submit an empty value`;
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(function() {
            feedback.classList.remove('showItem')
        }, 3000);
    }

    else {
        todoList.push({
            itemName: itemName
        });
        setLocalStorage(todoList);
        getItems(todoList);
    }

    itemInput.value = '';
});

const handleItems = (itemName) => {
    const items = itemList.querySelectorAll('.item');

    items.forEach(item=> {
        //complete item
        if (item.querySelector('.item-name').textContent === itemName) {
            item.querySelector('.complete-item').addEventListener('click', () => {
                item.querySelector('.item-name').classList.toggle('completed');
                // item.classList.toggle('visibility');
            });

            // edit the todo item
            item.querySelector('.edit-item').addEventListener('click', () => {
                inputItem.value = itemName;
                itemList.removeChild(item);

                // leave only the edited items in the todo list
                todoList = todoList.filter(item => {
                    return item.itemName !== itemName;
                });
            });

            // delete todo Items
            item.querySelector('.delete-item').addEventListener('click', () => {
                itemList.removeChild(item);

                todoList = todoList.filter(item => {
                    return item.itemName !== itemName;
                });
            });
        }
    })
}

const getItems = (todoList) => {
    itemList.innerHTML = '';

    todoList.forEach(item => {
        itemList.insertAdjacentHTML('beforeend', `<div class = "item">
        <h3 class = "item-name">${item.itemName}</h3>

        <div class="item-icons">
            <a href="#" class="complete-item item-icon"><i class="far fa-check-circle"></i></a>
            <a href="#" class="edit-item item-icon"><i class="far fa-edit"></i></a>
            <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
    </div>`);

    handleItems(item.itemName);
    })
}

const getLocalStorage = () => {
    const todoStorage = localStorage.getItem('todoList');
    if(todoStorage === 'undefined' || todoStorage === null) {
        todoList = [];
    }
    else {
        todoList = JSON.parse(todoStorage);
        getItems(todoList)
    }
}

const setLocalStorage = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

getLocalStorage();



// clear items from the list
btnClear.addEventListener('click', () => {
    todoList = [];
    localStorage.clear();
    getItems(todoList);
});