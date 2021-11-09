window.onload = function () {

    var canvas = document.getElementById('canvasGrid');
    var ctx = canvas.getContext('2d');
    let gridSquares = [];
    let blueSquares = [];
    let clickedCoordinate = null;

    //Updating canvas with colours
    function updateCanvas() {
        ctx.clearRect(0, 0, 430, 430);
        fillCanvas();
    }



    //Fills the canvas  with gridSquares
    function fillCanvas() {
        for (let i = 1; i <= gridSquares.length-1; i++) {

            if (blueSquares.includes(gridSquares[i])) {
                ctx.fillStyle = "blue";
            }
            else {
                ctx.fillStyle = "gray";
            }
            ctx.fillRect(gridSquares[i].x, gridSquares[i].y, 10, 10);
        }
    }



    //Returns whether square at index is close enough to the circle to be coloured blue 
    function getBlueSquare(coordinate) {
        for (let i = 1; i < gridSquares.length; i++) {
            if (isPointInSquare(coordinate, gridSquares[i])) {
                blueSquares.push(gridSquares[i]);
                updateCanvas();
            }
        }
    }


    // Generates blue circle 
    function generateCircle() {
        let center = getCenterCoordinates();
        let distances = [];
        for (let i = 0; i < blueSquares.length; i++) {
            distances.push(getDistance(blueSquares[i], center));
        }
        let radius = getAverageDistance(distances);

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        return;
    }

    // Generates blue ellipse 
    function generateEllipse() {
        let center = getCenterCoordinates();
        let distances = [];
        let firstQuadSquares = 0;
        let secondQuadSquares = 0;
        let isFirst = false;
        let rotation = 0;

        for (let i = 0; i < blueSquares.length; i++) {
            distances.push(getDistance(blueSquares[i], center));

            if(blueSquares[i].x < center.x && blueSquares[i].y < center.y)
            {
                firstQuadSquares++;
            }
            else if(blueSquares[i].x < center.x && blueSquares[i].y > center.y)
            {
                secondQuadSquares++;
            }
        }

        let radius1 = getAverageDistance(distances);

        if(firstQuadSquares > secondQuadSquares)
            isFirst = true;

        if(isFirst)
            rotation = (3 * Math.PI) / 4;
        else
            rotation = (Math.PI) / 4;

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.ellipse(center.x, center.y, radius1, radius1 + 50, rotation, 0, 2 * Math.PI);
        ctx.stroke();
        return;
    }


    // Checks if point selected is on square
    function isPointInSquare(point, square) {
        if (point.x < square.x + square.width &&
            point.x + point.width > square.x &&
            point.y < square.y + square.height &&
            point.y + point.height > square.y) {
            return true;
        }
    }


    // Returns the average center coordinate of blue gridSquares
    function getCenterCoordinates() {
        return {
            x: getXAverage(),
            y: getYAverage()
        }
    }


    // Gets the average X coordinates of blue gridSquares
    function getXAverage() {
        let sum = 0;
        for (let i = 0; i < blueSquares.length; i++) {
            sum += blueSquares[i].centerOfSquare.x;
        }
        return (sum / blueSquares.length);
    }


    //Returns the average Y coordinates of blue gridSquares
    function getYAverage() {
        let sum = 0;
        for (let i = 0; i < blueSquares.length; i++) {
            sum += blueSquares[i].centerOfSquare.y;
        }
        return (sum / blueSquares.length);
    }


    //Returns the distance between two points
    function getDistance(square, center) {
        return Math.hypot(square.centerOfSquare.x - center.x, square.centerOfSquare.y - center.y);
    }


    //Returns the average distance between the center and the blue gridSquares
    function getAverageDistance(distances) {
        let sum = 0;
        for (let i = 0; i < distances.length; i++) {
            sum += distances[i];
        }
        return (sum / distances.length);
    }

    //Genaretes an array of object having points x y , height , width and centre of each square
    function getSquareArray() {
            let counter = 1;
            for (let i = 20; i <= 400; i += 20) {
                for (let j = 20; j <= 400; j += 20) {
                    gridSquares[counter] = {
                        x: i,
                        y: j,
                        width: 20,
                        height: 20,
                        centerOfSquare: {
                            x: i + 10,
                            y: j + 10
                        }
                    }
                    counter++;
                }
            }
    }
    
    

    //#################################DRIVER CODE#########################################################################

    getSquareArray();
    fillCanvas();

    //Mouse click event
    canvas.onmousedown = function (e) {
        updateCanvas();
        clickedCoordinate = {
            x: e.offsetX,
            y: e.offsetY,
            width: 1,
            height: 1
        }
        getBlueSquare(clickedCoordinate);
    }


    document.getElementById("generateCircle").onclick = function () {
        generateCircle();
    }

    document.getElementById("generateEllipse").onclick = function () {
        generateEllipse();
    }

    document.getElementById("refresh").onclick = function () {
        location.reload();
    }


if(canvas.getContext) 
{
  var ctx = canvas.getContext('2d');
  //drawEllipse(ctx, 10, 10, 100, 60);
  //drawEllipseByCenter(ctx, 60,40,20,10);
}

function drawEllipseByCenter(ctx, cx, cy, w, h) {
  drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
}

function drawEllipse(ctx, x, y, w, h) {
  var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  //ctx.closePath(); // not used correctly, see comments (use to close off open path)
  ctx.stroke();

}
}