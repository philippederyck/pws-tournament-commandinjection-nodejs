/****************************************************
 *                      README                      *
 ****************************************************
 *
 * The application should launch automatically when this StackBlitz
 * environment loads. To edit the code, you can make changes in the 
 * editor and save your changes. They will automatically be redeployed.
 * 
 * To run custom system commands, you can terminate the running server in 
 * the terminal pane, giving you a shell on StackBlitz. To relaunch the
 * application, simply run `npm start`.
 */


const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Route for displaying the login form
app.get('/', (req, res) => {
    res.send(getForm(false))
});

// Route for handling the login logic 
app.get('/login', (req, res) => {
    console.log("Logging failed login attempt to system log file ...")
    exec(`echo "Incorrect entry, ${req.ip}, ${decodeURIComponent(req.originalUrl)}" >> error.log`)
    res.send(getForm(true, req.query.username, req.query.password))
});

app.listen(port, () => {
    console.log(`Vulnerable app listening at port ${port}`);
});

function getForm(showError, username = "", password = "") {
    let form = `
        <html><body class="p-5">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <div class="container">
            <h2>Login Form</h2>
            <form action="/login" method="GET">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" class="form-control" id="username" placeholder="Enter username" name="username" value="${username}">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="password" value="${password}">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        </body></html>
    `;

    if(showError) {
        form = form.replace(`<div class="container">`, `<div class="container">
        <div class="alert alert-danger" role="alert">
            Login failed
        </div>`)
    }
    return form;
}