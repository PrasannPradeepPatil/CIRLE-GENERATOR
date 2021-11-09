# Neocis Software Assesment

## Steps to Run Code
Run the index.html file which is the acess file which contains the link to part1 and part 2 html files


## Part 1
### Problem
The system should start with a single window containing a 20x20 grid :
All points should start out grey.  The user can then click to place the center of a circle, and then drag to set its radius, similar to various graphics programs.  The circle should be drawn on the screen as the mouse moves with the button pressed.When the user releases the mouse button, the program should highlight the points (make them blue) that correspond to the edge of the circle, in such a way that there is a continuous single line of points which most closely approximate the location of the edge of the circle.Then, two additional circles should be created corresponding to the largest and smallest radius of the highlighted points such that the area between the two red circles is minimized but also enclose all parts of all highlighted points.



### Solution
A square array is created which holds all the squares to be filled
When a user clicks the grid it is set as the centre. We store this centre.
When the user releases the mouse after dragging we store the endCoordinate.
Now as we have the coordinates saved we call generateBlueCircle generateRedCircle functions which will generate our circles
If we encounter an end coordinate ;then in that case  getBlueSquares function checks whether square should be blue.This information
is pushed into blueSquares array.At the same time we also set the furthest blue square on both the indside and the outside  of the blue circle.
Then we use the CreateRedCircles.This function calls the insideRedCircleRadius and outsideRedCircleRadius which helps to calculate of the red inside and red outside circle radius.
With this we have generated both the red and the blue circle

-----

## Part 2
### Problem
User can toggle the individual points on the grid on and off.  A button at the bottom of the window called “Generate Circle”.  When the user clicks the “Generate” button, generate a circle that best fits the highlighted points. Create an iterative, geometric least squares-based algorithm that does not rely on an external library or code to find the best fit. Document each step of the algorithm in detail, including your reasoning for each step


### Solution 
A square array is generated which is used to fill our canvas grid
When the user clicks a point all the parameters are saved into an object which is sent to the getBlueSquares function.
The above function finds squares corresponding to the point in our square arrays.Then we pass those array ito blue square array
Now the blue square array will contain all the squares that are to be coloured as blue
These grids are coloured blue when we call the updateCanvas function which in turn calls the fillCanvas function

When the user clicks the button "generate Circle" then the function generateCircle is called 
Calculating radius:
This function finds the centre point of the circe.This function calculates the average X and Y coordinates for all the grid's blue squares
Then we find the difference between the centre and blue square. We store this difference in an array which is used to find the average distance.
We use this difference as the radius to create blue circle at centre point

When the user clicks the button "generate Ellipse" then the function generateEllipse is called 
Calculating radius 1:
This function finds the centre point of the ellipse.This function calculates the average X and Y coordinates for all the grid's blue squares
Then we find the difference between the centre and blue square. We store this difference in an array which is used to find the average distance.
We use this difference as the radius to create blue circle at centre point
Calculating radius 2:
We add 50 to radius1.This was my intution for finding the major axis radius
Calculating rotation:
If there are more blue circles in the 1st qudrant then we take the rotation as 3*pi/4 else we take the rotation as pi/4


