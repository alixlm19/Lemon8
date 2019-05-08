function createCanvas(width, height) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.backgroundColor = "#DCDCDC";
    document.body.appendChild(canvas);
    return canvas;
}
