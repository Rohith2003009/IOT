// Signup
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
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
        }
    });
}


// Welcome Message
let heading = document.getElementById("heading");

if (heading) {
    let storedUser = localStorage.getItem("user");

    if (storedUser) {
        let user = JSON.parse(storedUser);
        heading.textContent = "Welcome " + user.name + "!";
    }
}