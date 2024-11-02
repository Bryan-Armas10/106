function saveTask(){
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    let taskToSave = new Task(title,desc,color,date,status,budget);
    console.log(taskToSave);

    displayTask(taskToSave);
}

function displayTask(taskToSave){
    let syntax = `
    <div class="task-container" style="border-color:${taskToSave.color}">
        <div class="task">
            <div class="info">
                <h5>${taskToSave.title}</h5>
                <p>${taskToSave.description}</p>
            </div>

            <div class="status">${taskToSave.status}</div>

            <div class="date-budget">
                <span>${taskToSave.date}</span>
                <span>${taskToSave.budget}</span>
            </div>
        </div>
    </div>
    `

    $("#list").append(syntax)
}

function init()
{
    console.log("init");    
    $("#btnSave").click(saveTask);
}

window.onload = init;