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
##.setStep(value)
Set the curent step for each slider inside a generator.Chainable:Yes
##.setSize(height,width)  
Sets the size of a generator.Chainable:Yes
##.setBackground(color,true)
Sets the background color of a generator.When true is passed as second argument a random color will be selected.Chainable:Yes
##.init(options)
This function accepts a list of 4 default options:height,width,max_value,default_background.Chainable:Yes
##.getCode()
Gets the code generated from a miniRadiusGenerator.Chainable:No
##.getId()
Returns the id of the host div.Chainable:No
##.addToFavourites()
Adds the curent code produced by the generator into a list.Chainable:Yes
##.getFavourites()
Returns favourites list.Chainable:No
##.removeFavourites()
Removes favourites.Chainable:Yes
##.toggleFavourites()
Toggle the list of favourites created by the current generator.Chainable:Yes
##.downloadFavourites()
Download favourites.In order for this to work you need [FileSaver.js](https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2014-11-29/FileSaver.min.js).Chainable:Yes
##.enablePreview()
When you execute this method you are able to preview any border radius in your current favourites list just by clicking it.Chainable:Yes
#.enableBootstrapContainer
Replace the current container of the generator with a bootstrap panel.Chainable:No
<<<<<<< HEAD
If you want to know wheter a method is chaiable you can call the isChainable() function and pass the name of the method as an argument and you will get true or false.
For example: isChainable("activateGenerator") will return true
=======

###If you want to know wheter a function is chainable or not you can call the the isChainable function and pass the name of the function you want to know about.You will get a true or false.
For exampe:
    ```isChainable("getId")``` will return false.
>>>>>>> origin/manual_book
