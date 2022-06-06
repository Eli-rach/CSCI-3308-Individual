var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
var pgp = require('pg-promise')();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));



app.use(bodyParser.json());  
const dev_dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
};

const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10 
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}


var db = pgp(dbConfig);


app.get("/", (req, res)=>{
    // console.log("at main");
    res.render("main");
});
app.get("/main", (req, res)=>{
    res.render("main");
});
app.get("/searches", (req, res)=>{
    var getDrinks = `SELECT * FROM drinks`;
		db.task('get-everything', task => {
			return task.any(getDrinks);
		}).then(data=>{
            res.render('searches',{
                drinks:data,
             });
            }).catch(error=>{
                console.log('home page error', error);
			    res.render('searches', {
				drinks:null,
            })
        })
    // res.render("searches");
});

app.post('/main', (res,req)=>{
    // console.log(req);    

    console.log("req.req.body: ", req.req.body);
    var drinkName = req.req.body.drinkName;
    var drinkImg = req.req.body.drinkImg;
    var drinkCategory = req.req.body.drinkCategory;
    var drinkIsAlc = req.req.body.drinkIsAlc;
    var drinkDirections = req.req.body.directions;
    console.log(drinkName);
    console.log(drinkImg);
    console.log(drinkCategory);
    console.log(drinkIsAlc);
    console.log(drinkDirections);
    console.log(drinkDirections.length)
    for(let i = 0; i <drinkDirections.length; i++){
        if(drinkDirections[i]="'"){
        drinkDirections=drinkDirections.replace("'","\"");
        i++;
        }
    }
    for(let i = 0; i <drinkDirections.length; i++){
        if(drinkDirections[i]="."){
        drinkDirections=drinkDirections.replace("\"","''");
        i++;
        }
    }
   var insertStatement = `INSERT INTO drinks(drinkName,drinkImg,drinkCategory,drinkIsAlc,directions) VALUES ('${drinkName}', '${drinkImg}', '${drinkCategory}', '${drinkIsAlc}', '${drinkDirections}');`;

    db.task('get-everything', task => {
		return task.batch([
			task.any(insertStatement),
        ]);
	}).then(data=>{
        console.log("save done");
        req.render('main');
    }).catch( err => {
		console.log('save error', err);
		req.render('main');
	});
    // // console.log(drinkName);
    // // console.log(drinkImg);
    // // console.log(drinkCategory);
    // // console.log(drinkIsAlc);
    // // console.log(drinkDirections);

});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
module.exports = server;

// https://individual-project-cn.herokuapp.com
