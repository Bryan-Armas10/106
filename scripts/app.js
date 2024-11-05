// function to save work
function saveTask(){
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    let taskToSave = new Task(title, desc, color, date, status, budget);
    console.log(taskToSave);

    // Display the task on the screen
    displayTask(taskToSave);

    // Save the task to the server (POST)
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response){
            console.log("Task saved successfully", response);
        },
        error: function(error){
            console.log("Error saving task", error);
        }
    });
}

// Function to load tasks from the server (GET)
function loadTask() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/Bryan/",  // Filter tasks by username
        success: function(response){
            let data = JSON.parse(response);
            console.log(data);
            
            // Show user tasks
            for (let i = 0; i < data.length; i++) {
                let task = data[i];
                displayTask(task);
            }
        },
        error: function(error){
            console.log("Error loading tasks", error);
        }
    });
}

// Function to display the task on the screen
function displayTask(taskToSave) {
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
    `;
    $("#list").append(syntax);
}

// Function to delete all tasks from a user
function deleteAllTasks() {
    $.ajax({
        type: "DELETE",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Bryan/",  // Delete all tasks for 'Bryan'
        success: function(response){
            console.log("All tasks deleted");
            $("#list").empty();  // clear screen
        },
        error: function(error){
            console.log("Error deleting tasks", error);
        }
    });
}

// Function to initialize button behavior and load tasks on startup
function init() {
    console.log("Application started");
    
    // Task save event
    $("#btnSave").click(saveTask);
    
    // Event to delete all tasks
    $("#btnDeleteAll").click(deleteAllTasks);
    
    // Load tasks at startup
    loadTask();
}

// Run initialization on page load
window.onload = init;
