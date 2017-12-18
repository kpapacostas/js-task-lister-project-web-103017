document.addEventListener('DOMContentLoaded', () => {

  const listSubmit = document.getElementById('list-submit')
  const taskSubmit = document.getElementById('task-submit')
  getLists().then((lists) => lists.forEach((l) => createNewListBox(l)))

  listSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    //GET LIST NAME
    let listName = document.getElementById('new-list-title').value
    let newList = new List(listName)
    List.create(newList)

    let newListBox = createNewListBox(newList)
  })

  taskSubmit.addEventListener('click', (e) =>{
      e.preventDefault()
      let list = document.getElementById('parent-list').value
      let description = document.getElementById('new-task-description').value
      let priority = document.getElementById('new-task-priority').value

      createTask(list, description, priority)

    })



//HELPER METHODS FOR LIST CREATION
  function createNewListBox(nl){
    let newListBox = newBox(nl)

    let titleEl = document.createElement('H2')
    newListBox.append(titleEl)

    let deleteBtn = createDeleteBtn()
    titleEl.append(deleteBtn, ` ${nl.title}`)
    deleteListener(deleteBtn, newListBox.id)

    let ul = document.createElement('UL')
    ul.id = `${nl.title} tasks`
    newListBox.append(ul)

    let listEl = document.getElementById('lists')
    listEl.appendChild(newListBox)

    addListToDropDown(nl.title)
    return newListBox
  }

  //create helper methods
      function newBox(nl){
        let newListBox = document.createElement('DIV')
        newListBox.className = "lists"
        newListBox.id = nl.title
        return newListBox
      }

      function createDeleteBtn(listName){
        let deleteBtn = document.createElement('BUTTON')
        deleteBtn.innerHTML = 'X'
        deleteBtn.className = 'delete-list'
        return deleteBtn
      }



  function addListToDropDown(listName) {
    let parentList = document.getElementById('parent-list')
    let option = document.createElement('OPTION')
    option.id =`${listName}-option`
    option.innerHTML = listName
    parentList.add(option)
  }

  function deleteListener(db, title){
    db.addEventListener('click', (e) =>{
      document.getElementById(title).remove()
      document.getElementById(`${title}-option`).remove()
      let index = List.all().findIndex((l) => {return l.title === title})
      List.all().splice(index, 1)

    })
  }

//HELPER METHODS FOR TASK CREATION
  function createTask(listName, description, priority){
    let list = List.all().find((l) => {return l.title === listName})
    let newTask = new Task(list, description, priority)
    let listEl = document.getElementById('listName')
    let ul = document.getElementById(`${list.title} tasks`)
    ul.innerHTML += `
      <li>Task: ${newTask.description}<br> Priority: ${newTask.priority}</li>
    `
  }


//FETCH METHODS
  function getLists() {
    return fetch('http://localhost:3000/lists')
      .then((response) => response.json())
      .then((json) => json.map((list) => new List(list.title)) )
  }

})
