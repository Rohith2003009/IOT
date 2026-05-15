// Signup//
let signupform = document.getElementById("signupform");

if (signupform) {
    signupform.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        let pattern =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        // Empty field check
        if (name === "" || email === "" || password === "") {
            alert("Please fill all fields");
            return;
        }

        // Password validation
        if (!pattern.test(password)) {
            alert(
                "Password must be at least 8 characters long and contain one letter, one number, and one special character"
            );
            return;
        }

        let user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Signup successful!");
        window.location.href = "login.html";
    });
}


// Login
let loginform = document.getElementById("loginform");

if (loginform) {
    loginform.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        let storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("No user found. Please sign up first.");
            return;
        }

        let user = JSON.parse(storedUser);

        if (email === user.email && password === user.password) {
            alert("Login successful!!");
            localStorage.setItem("loggedInUser", "true");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
        }
    });
}


//javascript for changing the heading after login
let heading = document.getElementById("welcomemessage");

if(heading){
    //firstt get theuser details
    let user = JSON.parse(localStorage.getItem("user"));
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    //if the user exists then change the welcome message
    if(user && loggedInUser){
        heading.innerHTML = "Welcome " + user.name + "!...";
    }
}

//protecting the Tasks.html form opeingi without login //
let currentPage = window.location.pathname;
if(currentPage.includes("task.html")){
 let loginStatus = localStorage.getItem("loggedInUser");

    if (!loginStatus) {
        alert("Please log in to access this page.");
        window.location.href = "login.html";
    }
}


// Logout functionality
let logoutbtn = document.getElementById("logoutbtn");
if (logoutbtn) {
    logoutbtn.addEventListener("click", function (e) {
        localStorage.removeItem("loggedInUser");
        alert("Are you sure you want to logout? Press Ok to logout.");
        window.location.href = "index.html"; 
    })

}


// To hide login and signup links after login
let loginLink = document.getElementById("loginLink");
let signupLink = document.getElementById("signupLink");
let logoutLink = document.getElementById("logoutbtn");

//checking if login is true or false//
let loginStatus = localStorage.getItem("loggedInUser");

if (loginStatus == "true") {
    if (loginLink) {
        loginLink.style.display = "none";
    } 
    if (signupLink) {
        signupLink.style.display = "none";
    } 
} else {
    if (loginLink) {
    logoutLink.style.display = "none";
   }
}


// Dynamycally adding Tasks in the task.html 
let addButton = document.getElementById("addTaskbtn");

if(addButton) {
    showTasks();
    addButton.addEventListener("click", function(){
        let task = document.getElementById("taskInput").value;
        if (task == ""){
            alert("Enter the task first!..");
            return;
        };
        // 
        let taskArray = JSON.parse(localStorage.getItem("task")) || [];
        taskArray.push(task)
        localStorage.setItem("task",JSON.stringify(taskArray));
        taskInput.value="";
        showTasks();
    });
}
  /* showing task in html page */
  function showTasks(){
    let taskList = document.getElementById("taskList");
    if(!taskList){
        return ;
    }

    taskList.innerHTML = "";
    let taskArray = JSON.parse(localStorage.getItem("task")) || [];

    for(let i=0; i<taskArray.length; i++){
        taskList.innerHTML += `
        <tr>
            <td>${taskArray[i]}</td>
            <td>
                <button onClick="deleteTask(${i})">Delete</Button>
            </td>
        </tr>
        `;
    }
}
function deleteTask(index){

    let taskArray = JSON.parse(localStorage.getItem("task")) || [];

    taskArray.splice(index, 1);

    localStorage.setItem("task", JSON.stringify(taskArray));

    showTasks();
}