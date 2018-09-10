const addItems = document.querySelector('.add-items'),
      itemsList = document.querySelector('.plates'),
      items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(event) {
    event.preventDefault();
    const text = (this.querySelector('[name=item]')).value,
           item = {
              text,
              done: false
            };
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type ="text" class="editInput" data-index="${i}" maxlength="20">
                <input type="checkbox" class="checkbox" id="item${i}" data-index="${i}" ${plate.done ? 'checked' : ''}>
                <label for="item${i}">${plate.text}</label>
                <img class ="edit" src ='img/edit.png' data-index=${i} onclick="editFunc(event)">
                <img class ="save" src="img/save.png" data-index=${i} onclick="saveFunc(event)">
                <img class ="delete" src="img/delete.png" data-index=${i} onclick="deleteFunc(event)">
            </li>
        `;
    }).join('');
}

function toggleDone(event) {
  if (!event.target.matches('input')) return
    const el = event.target,
        index = el.dataset.index;
          items[index].done = !items[index].done;
          localStorage.setItem('items', JSON.stringify(items));
}

function deleteFunc(e) {
    items.splice(e.target.dataset.index,1);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function editFunc(e) {
  const index = e.target.dataset.index,
        label = document.querySelectorAll('label')[index],
        editIcon = document.querySelectorAll('.edit')[index],
        saveIcon = document.querySelectorAll('.save')[index],
        editInput = document.querySelectorAll('.editInput')[index];
    editInput.style.display = 'inline-block';
    editInput.value = label.innerText;
    saveIcon.style.display = 'block';
    editIcon.style.display = 'none';
}

function saveFunc(e) {
  const index = e.target.dataset.index,
        label = document.querySelectorAll('label')[index],
        saveIcon = document.querySelectorAll('.save')[index],
        editIcon = document.querySelectorAll('.edit')[index],
        editInput = document.querySelectorAll('.editInput')[index];
    editIcon.style.display = 'block';
    saveIcon.style.display = 'none';
    editInput.style.display = 'none';
    label.innerHTML = editInput.value;
    items[index].text = label.innerText;
    if(editInput.value === ''){
        return deleteFunc(e) ;
    }
    localStorage.setItem('items', JSON.stringify(items))

}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);