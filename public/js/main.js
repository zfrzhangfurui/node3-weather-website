fetch("http://localhost:3000/detail?address=melbourne").then((res) => {
	res.json().then((data) => {
		console.log(data);
	});
});
