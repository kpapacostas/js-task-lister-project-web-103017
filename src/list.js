/*
list is responsible for creating a single list component
*/

const List = (() => {
  let id = 1
  let allLists = []
  return class List {
    constructor(title) {
      this.title = title
      this.id = id++
      this.tasks = []
      allLists.push(this)
    }

  static all(){
    // let allPromise = fetch
    // allPromise.then((lists) => setLastId)
    // return fetch('http://localhost:3000/lists');
    return allLists
  }

  static create(list){
    const params = {
      method: 'POST',
      // headers: {
      //     'Accept': 'application/json, text/plain, */*',
      //     'Content-Type': 'application/json'
      //   }
      body: JSON.stringify(list.title)
    }
    return fetch('http://localhost:3000/lists', params)
  }


  }
})()
