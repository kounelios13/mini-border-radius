#Demo

##Create a generator 
You have 6  ways to  create a generator
1. ```var generator=new Generator("#sample")```
2. ```var generator=new Generator(["#sample","10em","10em",200,'green']);```
3. ```var generator=new Generator("#sample","#custom_generator_object");```
4. ```var generator=new Generator("#sample","#custom_generator_object");```
5. ```var generator=new Generator("#sample","#custom_generator_object",true);```
6. ```var generator =new Generator("#sample",null,true);```
##.init(options)
```var options=["15em","15em",200,'#fa8103'] ```
 ```generator.init(["15em","15em",200,'#fa8103']);```
##.setStep(value)
1. ```generator.setStep(-100);```
2. ``` generator.setStep(100);```
###Wrong way
``` generator.setStep('100a'); ```
**Throws an error!!!**
##.setMax(max)
1. ``` generator.setMax(100); ```
2. ``` generator.setMax(-100); ```
##.setSize(height,width)
```generator.setSize("12em","12em");```
##.setBackground(bg,true)
1. ```generator.setBackground('red')```
2. ```generator.setBackground("#faa718");```
3. ```generator.setBackground("rgb(20,98,12)");```
4. ```generator.setBackground("rgba(20,187,87,0.9");```
5. ```generator.setBackground("url('path/to/image.png')no-repeat center center fixed");```
6.  ```generator.setBackground('red',true)```
7.  ```generator.setBackground('',true)```
8.  ```generator.setBackground(null,true)```
    
##.downloadFavourites()
``` generator.downloadFavourites ```