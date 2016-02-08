# Generator methods
Each generator has some methods:


##.activateGenerator()
This is the main function that activates the generator.Chainable:Yes.
##.deactivateGenerator()
This function resets and deactivates the generator so before executing that method be sure you have saved somewhere the code produced by the generator.Chainable:Yes.
##.reset()
Resets any slider inside a generator and set the border radius property of the object used by the generator to 0.Chainable:Yes
##.replaceObject(object,restrict_size)
Replace the default object where border radius is applied with another one.If you want the new object to have the same size as the previous one pass true as the second parameter in the function. .Chainable:Yes
##.setMax(value)
Set the max value for all the sliders inside a generator. Chainable:Yes
##.setSize(height,width)  
Sets the size of a generator.Chainable:Yes
##.setBackground(color)
Sets the background color of a generator.Chainable:Yes
##.init(options)
This function accepts a list of 4 default options:height,width,max_value,default_background.Chainable:Yes
##.getCode()
Gets the code generated from a miniRadiusGenerator.Chainable:No
##.getId()
Returns the id of the host div.Chainable:No