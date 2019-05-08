function createCanvas(width, height) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.backgroundColor = "#DCDCDC";
    document.body.appendChild(canvas);
    return canvas;
}

function backColor() {
	c = arguments; //color arguments
	
	if(c.length === 1) {								//Case 1: Only 1 argument was given 
		if(typeof(c[0]) === "number") {					//Case 1a: color
			console.log(`a${c[0]}`);
			context.style.backgroundColor = `${colorModel}(${c[0]}, ${c[0]}, ${c[0]})`;
		} else if (typeof(c[0]) === "string") {
			context.style.backgroundColor = c[0];
		}
	} else if(c.length === 3) {
		context.style.backgroundColor = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
	} else if(c.length === 4) {
		context.style.backgroundColor = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;
	}
	return arguments;
}
