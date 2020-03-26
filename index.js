const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require("body-parser")
require ('dotenv').config();

const getAPI = require('./lib/getAPI');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: "layouts",
    extname: 'hbs'
}))

app.set('view engine', '.hbs')

app.get('/', (req, res) =>{
    res.render("index");
});

app.post("/", async(req, res) =>{
    let id = req.body.id

    let data = await getAPI.getType(id)
    let name = data.name;
    let damage = data.damage_relations;

    let ddamfromcount = damage.double_damage_from.length
    let ddamfromlist = []
    let a;
    for (a = 0; a < ddamfromcount; a++) {
        ddamfromlist.push(damage.double_damage_from[a].name);
    }
    
    let ddamtocount = damage.double_damage_to.length
    let ddamtolist = []
    let b;
    for (b = 0; b < ddamtocount; b++) {
        ddamtolist.push(damage.double_damage_to[b].name);
    }

    let hdamfromcount = damage.half_damage_from.length
    let hdamfromlist = []
    let c;
    for (c = 0; c < hdamfromcount; c++) {
        hdamfromlist.push(damage.half_damage_from[c].name);
    }

    let hdamtocount = damage.half_damage_to.length
    let hdamtolist = []
    let d;
    for (d = 0; d < hdamtocount; d++) {
        hdamtolist.push(damage.half_damage_to[d].name);
    }

    let nodamfromcount = damage.no_damage_from.length
    let nodamfromlist = []
    let e;
    for (e = 0; e < nodamfromcount; e++) {
        nodamfromlist.push(damage.no_damage_from[e].name);
    }

    let nodamtocount = damage.no_damage_to.length
    let nodamtolist = []
    let f;
    for (f = 0; f < nodamtocount; f++) {
        nodamtolist.push(damage.no_damage_to[f].name);
    }

    res.render('index', {name, ddamfromlist, ddamtolist, hdamfromlist, hdamtolist, nodamfromlist, nodamtolist})
})


app.listen(3000, () =>{
    console.log("Server is listening")
})
