// for access the property of express
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = 1000;


// public static path

const static_path = path.join(__dirname, "../public");
// set the path for partials and views in templates
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// set hbs expree engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

// register hbs partials and set views path
app.set('views', template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));


// routing and callback function
// app.get("/", (req, res) => {
//     res.sendFile(path.join(static_path, "index"));
// });

app.get("/", (req, res) => {
    res.render("index");
});


app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

// randomally send a response (404 error)
app.use( (req, res) => {
    res.render("404error" ,{
        errorMsg: "Oops! Page not found"
    })
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})