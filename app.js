const bodyParser = require('body-parser');
const express = require('express');
const { redirect } = require('express/lib/response');
const app = express();
const date = require(__dirname + '/date.js');
console.log(date.getday());
console.log(date.getdate());

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'))

let new_task = "";
let TaskList = [];
let worklist = [];

app.get('/', (req, res) => {
    res.render('list', { dayvalue: date.getdate(),taskArray:TaskList});
});

app.post('/', function (req, res) {
    console.log(req.body);
    let list = req.body.list;
    let item = req.body.task;
    console.log('received list=' + list);
    if(list == "Work"){
        console.log('received in work...list=' + list)
        worklist.push(item);
        res.redirect('/work');
        res.send();
    }
    else{
        console.log('received in regular...list=' + list);
        TaskList.push(item);
        res.redirect('/');
        res.send();
    }
})

app.get('/work', (req, res) => {
    res.render('list', { dayvalue: "Work List", taskArray:worklist});
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(3000, () => {
    console.log(`Example app listening on port 3000!`);
});