let pendingTask = [
   
]
const completedTask = []

function renderTasks(){
    pendingTask.forEach(task => {
        const block = document.createElement("tr")
        block.classList.add(`tr-${task.id}`)
        block.innerHTML = `
            <td>${task.title}</td>
            <td>
                <div class="desc">${task.desc}</div>

                <div class="update">
                    <input type="text" class="update upd-${task.id}"/>
                    <button class="save-${task.id}">save</button>
                </div>
                
            </td>
            <td>
            <button class="del" data-id="${task.id}">x</button>
            <button class="edit" data-id="${task.id}">&#9998</button>
            <button class="checked" data-id="${task.id}">&checkmark;</button>
            </td>
        `
        document.querySelector("tbody").append(block)
    })
}

renderTasks()

document.getElementById("frm").addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title").value
    if(title != ""){
        const desc = document.getElementById("desc").value
        const data = {
            id: pendingTask.length + 1,
            title,
            desc
        }
        pendingTask.push(data)
        document.querySelector("tbody").innerHTML = ""
        renderTasks()
    }
})

function renderCompletedTask(){
    completedTask.forEach(task => {
        const block = document.createElement("tr")
        block.classList.add("completed")
        block.classList.add(`tr-${task.id}`)
        block.innerHTML = `
            <td>${task.title}</td>
            <td>
                <div class="desc">${task.desc}</div> 
            </td>
            <td>
                <button class="del" data-id="${task.id}">x</button>
                <p>completed &CenterDot; <span>${task.date} &CenterDot; ${task.time}</span></p>
            </td>
        `
        document.querySelector("tbody").append(block)
    })
}

document.querySelector("tbody").addEventListener("click", e => {
    if(e.target.classList.contains("del")){
        const {id} = e.target.dataset
        const newTask = pendingTask.filter(task => task.id != id)
        pendingTask = newTask
        document.querySelector("tbody").innerHTML = ""
        renderTasks()
    }

    if(e.target.classList.contains("edit")){
        const {id} = e.target.dataset
        const container = document.querySelector(`.tr-${id}`)
        container.classList.add("isupdating")
        const upd = document.querySelector(`.upd-${id}`)
        const tt = pendingTask.find(task => task.id == id)
        upd.value = tt.desc

        // save
        const save = document.querySelector(`.save-${id}`)
        save.addEventListener("click", e => {
            const matchingItem = pendingTask.find(task => task.id == id)
            matchingItem.desc = upd.value
            container.classList.remove("isupdating")
            document.querySelector("tbody").innerHTML = ""
            renderTasks()
        })
    }
    if(e.target.classList.contains("checked")){
        const {id} = e.target.dataset
        const completed = pendingTask.find(task => task.id == id)
        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()
        completed.time = time
        completed.date = date
        completedTask.push(completed)

        const newTask = pendingTask.filter(task => task.id != id)
        pendingTask = newTask
        document.querySelector("tbody").innerHTML = ""
        renderTasks()
        renderCompletedTask()
    }
})