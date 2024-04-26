import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 4000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded ({ extended: true }));

let newTasks =[];
let idCounter = 1;

app.get("/", (req, res) => {
    res.render("index.ejs", { header: "To Do List", newListTasks: newTasks});
});

app.post("/", (req, res) => {
    let tasks = req.body.tasks;
    let newTask = { id: idCounter++, task: tasks};
    newTasks.push(newTask);
    res.redirect("/");    
});

app.post("/remove", (req, res) => {
    const taskId = parseInt(req.body.taskId);
    const taskIndex = newTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        newTasks.splice(taskIndex, 1);
    };
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    const editTaskId = parseInt(req.body.editTaskId);
    const taskIndex = newTasks.findIndex(task => task.id === editTaskId);
    if (taskIndex !== -1) {
        res.render("index.ejs", {header: "Edit Task", task: newTasks[taskIndex]});
    } else {
        res.redirect("/");
    };
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});