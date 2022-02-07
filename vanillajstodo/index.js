const tasks = []
let nextId = 1
const tasksContainer = document.querySelector('.tasks-list')

const addTask = () => {
    const title = document.getElementById('title').value.trim()
    if(!title) return
    const date = new Date();
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const formattedDate = `${day}.${month}.${date.getFullYear()}`
    tasks.push({
        id: nextId++,
        title: title,
        date: formattedDate,
        status: false
    })
    document.getElementById('title').value = ''
    renderTasks()
}

const removeTask = (id) => {
    const index = tasks.findIndex(task => task.id === id)
    tasks.splice(index, 1)
    renderTasks()
}

const toggleStatus = (id) => {
    const index = tasks.findIndex(task => task.id === id)
    tasks[index].status = !tasks[index].status
    renderTasks()
}

const renderTasks = () => {
    tasksContainer.innerHTML = ''
    if(tasks.length === 0) {
        tasksContainer.innerHTML = `<p>No tasks yet!</p>`
        return
    }
    for(const task of tasks) {
        tasksContainer.innerHTML += `<div class="task">
            <div class="field">
                <span>Title</span>
                <p>${task.title}</p>
            </div>
            <div class="field">
                <span>Date</span>
                <p>${task.date}</p>
            </div>
            <div class="field status">
                <button onclick="removeTask(${task.id})">Delete</button>
                <button onclick="toggleStatus(${task.id})">${task.status ? 'Not ready' : 'Ready'}</button>
            </div>
        </div>`
    }
}

renderTasks()