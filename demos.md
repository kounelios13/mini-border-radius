#Demo

##Create a generator 
You have 6 ways to  create a generator
1. ```var generator=new Generator("#sample")```
2. ```var generator=new Generator(["#sample","10em","10em",200,'green']);```
3. ```var generator=new Generator("#sample","#custom_generator_object");```
4. ```var generator=new Generator("#sample","#custom_generator_object");```
5. ```var generator=new Generator("#sample","#custom_generator_object",enable_bootstrap_container=true);```
6. ```var generator =new Generator("#sample",null,enable_bootstrap_containe=true);```
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