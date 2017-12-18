/*
task is responsible for creating a single task object
*/
const Task = (() => {
  let id = 1
  return class Task {
    constructor(list, description, priority) {
      this.description = description
      this.priority = priority
      this.id = id++
      this.listId = list.id
      list.tasks.push(this)
    }
  }

})()
