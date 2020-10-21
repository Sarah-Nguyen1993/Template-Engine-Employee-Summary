const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];
const managerQuestions = [
    {
        type: "loop",
        name: "name",
        message: "Manager's name: "
    },
    {
        type: "input",
        name: "id",
        message: "Manager's id: "
    },
    {
        type: "input",
        name: "email",
        message: "Manager's email: "
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Manager's office number: "
    },
    {
        type: "confirm",
        name: "addMember",
        message: "Do you have any team member to add?",
    }
];
const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Employee's name: "
    },
    {
        type: "input",
        name: "id",
        message: "Employee's id: "
    },
    {
        type: "input",
        name: "email",
        message: "Employee's email: "
    },
    {
        type: "list",
        name: "role",
        message: "What is his/her role?",
        choices: ["Engineer", "Intern"]
    },
    {
        when: res => {
            return res.role === "Engineer"
        },
        type: "input",
        name: "github",
        message: "GitHub user name: "
    },
    {
        when: res => {
            return res.role === "Intern"
        },
        type: "input",
        name: "github",
        message: "Attending school: "
    },
    {
        type: "confirm",
        name: "repeat",
        message: "Do you want to continue"
    
    }   
];

function managerInfo(){
    inquirer.prompt(managerQuestions).then(res =>{
        var newMember = new Manager(res.name, res.id, res.email, res.officeNumber);
        employees.push(newMember);
        if (res.addMember === true){
            employeeInfo();
        }
        else{
            return;
        }
    })
}
managerInfo()
function employeeInfo(){
    inquirer.prompt(employeeQuestions).then(res => {
        if (res.role === "Engineer"){
            var newMember = new Engineer(res.name, res.id, res.email, res.github);
        }
        else{
            var newMember = new Intern(res.name, res.id, res.email, res.school);
        }

        employees.push(newMember);

        if (res.repeat === true){
            employeeInfo();
        }
        else{
            return;
        }
    })
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
