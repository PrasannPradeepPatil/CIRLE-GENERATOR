window.onload = function () {

    var canvas = document.getElementById('canvasGrid');
    var ctx = canvas.getContext('2d');
    let center = null;
    let movingMouse;
    let endCoordinate = null;
    let radius;
    let parameterFurthestOutsideBlue = null;
    let parametersFurthestInsideBlue = null;
    let innerRedCircleRadius = null;
    let outerRedCircleRadius = null;
    let gridSquares = [];
    let blueSquares = [];
    let popUpAlert = false;



    //Updating canvas with colours 
    function updateCanvas() {
        ctx.clearRect(0, 0, 430, 430);
        fillCanvas();
    }
    


    //Fills the canvas  with gridSquares
    function fillCanvas() {
        for (let i = 1; i <= gridSquares.length - 1; i++) {
            if (endCoordinate) {
                if (getBlueSquares(i)) {
                    ctx.fillStyle = "blue";
                }
                else {
                    ctx.fillStyle = "gray";
                }
            }
            else {
                ctx.fillStyle = "gray";
            }
            ctx.fillRect(gridSquares[i].x, gridSquares[i].y, 10, 10);
        }
        if (endCoordinate) {
            genareteRedCircles();
        }
    }


    //Returns whether square at index is close enough to the circle to be coloured blue 
    function getBlueSquares(index) {
        let point;
        for (let i = 0; i < 360; i += 5) {
            point = getPointOnCircle(i * (Math.PI / 180), radius);
            if (isPointInSquare(point, gridSquares[index])) {
                getFurthestBlueSquareFromCircle(index, point);
                if (!blueSquares.includes(gridSquares[index])) {
                    blueSquares.push(gridSquares[index]);
                }
                return true;
            }
        }
        return false;
    }


    // Creates blue circle
    function generateBlueCircle() {
        updateCanvas();
        if (endCoordinate) {
            radius = getDistance(center.x, center.y, endCoordinate.x, endCoordinate.y);
        }
        else {
            radius = getDistance(center.x, center.y, movingMouse.x, movingMouse.y);
        }

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        return;
    }


    // Creates red circles
    function genareteRedCircles() {

        outerRedCircleRadius = radius;
        innerRedCircleRadius = radius;

        let innerRadius = insideRedCircleRadius(innerRedCircleRadius);
        let outerRadius = outsideRedCircleRadius(outerRedCircleRadius);
     
        if (outerRadius <= 0 || innerRadius<=0){
            if(!popUpAlert){
                alert('Make sure you click and DRAG the mouse to set the radius!');
                popUpAlert = true;
            }
            location.reload();
        }

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.arc(center.x, center.y, innerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.arc(center.x, center.y, outerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        return;
    }




    //Returns radius of outer red circle
    function outsideRedCircleRadius(r) {
        for (let i = 0; i < blueSquares.length; i++) {
            for (let k = 0; k < 360; k += 5) {
                point = getPointOnCircle(k * (Math.PI / 180), r);

                if (isPointInSquare(point, blueSquares[i])) {
                    outerRedCircleRadius += 1;
                    return outsideRedCircleRadius(outerRedCircleRadius);
                }
            }
        }
        return outerRedCircleRadius;
    }


    //Returns radius of inner red Circle
    function insideRedCircleRadius(r) {
        for (let i = 0; i < blueSquares.length; i++) {
            for (let k = 0; k < 360; k += 5) {
                point = getPointOnCircle(k * (Math.PI / 180), r);

                if (isPointInSquare(point, blueSquares[i])) {
                    innerRedCircleRadius -= 1;
                    return insideRedCircleRadius(innerRedCircleRadius);
                }
            }
        }
        return innerRedCircleRadius;
    }


    // Returns  the point on circle 
    function getPointOnCircle(angle, r) {
        return {
            x: center.x + (Math.cos(angle) * r),
            y: center.y + (Math.sin(angle) * r),
            width: 1,
            height: 1
        }
    }


    // Returns whether point is present in the square
    function isPointInSquare(point, square) {
        if (point.x < square.x + square.width &&
            point.x + point.width > square.x &&
            point.y < square.y + square.height &&
            point.y + point.height > square.y) {
            return true;
        }
    }


    // Return the blue gridSquares with the furthest distance inside and outside of circle
    function getFurthestBlueSquareFromCircle(index, point) {

        let newDistance = getDistance(point.x, point.y, gridSquares[index].x, gridSquares[index].y);
        if (isInsideCircle(index)) {
            if (parametersFurthestInsideBlue === null || parametersFurthestInsideBlue.distance < newDistance) {
                parametersFurthestInsideBlue = {
                    theSquare: gridSquares[index],
                    circlePoint: point,
                    distance: newDistance
                }
            }
            else {
                if (parameterFurthestOutsideBlue === null || parameterFurthestOutsideBlue.distance < newDistance) {
                    parameterFurthestOutsideBlue = {
                        theSquare: gridSquares[index],
                        circlePoint: point,
                        distance: newDistance
                    }
                }
            }
        }
    }


    //Return if square is inside the circle
    function isInsideCircle(index) {
        let centerOfSquareX = gridSquares[index].x + 10;
        let centerOfSquareY = gridSquares[index].y + 10;
        let formula = ((centerOfSquareX - center.x) * (centerOfSquareX - center.x)) + ((centerOfSquareY - center.y) * (centerOfSquareY - center.y));
        if (Math.sqrt(formula) < radius) {
            return true;
        }
        return false;
    }


    // Returns the distance between two coordinates
    function getDistance(x1, y1, x2, y2) {
        return Math.hypot(x1 - x2, y1 - y2);
    }

    //Genaretes an array of object having points x, y, height,width of each square
    function getSquareArray() {

        let counter = 1;
        let x_ptr = 20
        

        while(x_ptr <= 400){
            let y_ptr = 20
            while(y_ptr <= 400){
                gridSquares[counter] = {
                    x: x_ptr,
                    y: y_ptr,
                    width: 20,
                    height: 20
                }
                y_ptr = y_ptr + 20;
                counter++;
            }
            x_ptr = x_ptr + 20;
            
        }
        
        
        
        
    }

    

 

    //#################################DRIVER CODE#########################################################################


    
    
    getSquareArray();
    fillCanvas();

    //Mouse click event
    canvas.onmousedown = function (e) {
        updateCanvas();
        blueSquares = [];
        endCoordinate = null;
        center = {
            x: e.offsetX,
            y: e.offsetY
        }

        // When mouse is dragged
        this.onmousemove = function (e) {
            movingMouse = {
                x: e.offsetX,
                y: e.offsetY
            }
            generateBlueCircle()
        }
    }


    //Mouse release event
    canvas.onmouseup = function (e) {
        endCoordinate = {
            x: e.offsetX,
            y: e.offsetY
        }


        generateBlueCircle();
    }
}




