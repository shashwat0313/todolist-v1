const bodyParser = require('body-parser');
const express = require('express');
const { redirect } = require('express/lib/response');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'))

let new_task = "";
let TaskList = [];

var today = new Date();
app.get('/', (req, res) => {
    res.render('list', { dayvalue: today.toLocaleDateString('en-IN', { weekday: 'long' }), taskArray:TaskList});
});

app.post('/', function (req, res) {
    if(req.body.task == ''){
        res.redirect('/');
        return;
    }
    if(TaskList.length == 15){
        TaskList = [];
        console.log("array was full so it has been emptiedl.");
    }
    else{
        TaskList.push(req.body.task);
    }
    // console.log(TaskList[TaskList.length-1]);
    // console.log("received", JSON.stringify(req.body.task));
    res.render('list', { dayvalue: today.toLocaleDateString('en-IN', { weekday: 'long' }), taskArray:TaskList});
    res.send();
})

app.listen(3000, () => {
    console.log(`Example app listening on port 3000!`);
});