const request = require("request");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./geocode");
const app = express();
console.log();
// geocode("melbourne", (err, res) => {
// 	console.log(err);
// 	console.log(res);
// });

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");

const viewPath = path.join(__dirname, "../templates/views"); //set view Path dynamically in order to use it in hbs/handlebar
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Furui",
	});
});
app.get("/products", (req, res) => {
	console.log(req.query.search);
	if (!req.query.search) {
		res.send({
			error: "you must provide a search term",
		});
	}
	res.send({
		title: "Weather",
		name: "",
	});
});

app.get("/detail", (req, res) => {
	console.log(req.query.address);
	if (!req.query.address) {
		return res.send({
			error: "You must provide a address",
		});
	}

	geocode(
		req.query.address,
		(geoErr, { latitude, longitude, location } = {}) => {
			console.log(geoErr);
			//console.log(geoRes);
			res.send({
				latitude,
				longitude,
				location,
			});
		}
	);

	//res.send({ address: req.query.address });
	// res.render("detail",
	// // {
	// // 	title: "detail",
	// // 	name: "Zhang",
	// // 	address: "kelamayi",
	// // }

	// );
});
app.get("*", (req, res) => {
	res.render("404", {});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
