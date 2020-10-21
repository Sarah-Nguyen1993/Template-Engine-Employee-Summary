const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//employees array store employees' info
const employees = [];

//questions for manager
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

//questions for employees
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
        name: "school",
        message: "Attending school: "
    },
    {
        type: "confirm",
        name: "repeat",
        message: "Do you want to add more members?"
    
    }   
];

//start the app by asking manager's info using managerQuestions
function managerInfo(){
    inquirer.prompt(managerQuestions).then(res =>{
        const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
        //push manager to employees array
        employees.push(manager);
        //ask if the manager wants to add more members
        if (res.addMember === true){
            //if yes run employeeInfo()
            employeeInfo();
        }
        else{
            //if no create the html with manager's info
            fs.writeFile(outputPath,render(employees), function(err){
                if(err){
                    throw err
                }
                else{
                    console.log("Successfully created a html")
                }
            }) 
        }
    })
}

managerInfo();

//after the manager, ask employees' info by using employeeQuestions
function employeeInfo(){
    inquirer.prompt(employeeQuestions).then(res => {
        if (res.role === "Engineer"){
            const engineer = new Engineer(res.name, res.id, res.email, res.github);
            //push engineer to employees array
            employees.push(engineer);
        }
        else{
            const intern = new Intern(res.name, res.id, res.email, res.school);
            //push intern to employees array
            employees.push(intern);
        }
        //if wants add more members, run employeeInfo()
        if (res.repeat === true){
            employeeInfo();
        }
        else{
            // if not, create html file
           fs.writeFile(outputPath,render(employees), function(err){
               if(err){
                   throw err
               }
               else{
                   console.log("Successfully created a html")
               }
           }) 
        }
    })
}


