fetch("/detail?address=melbourne").then((res) => {
	res.json().then((data) => {
		console.log(data);
	});
});
