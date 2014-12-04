"use strict";

var makePerson = function(persArr){


	var names = [];
    var ages = [];
    var agesSum = 0;
    
    for (var i=0; i<persArr.length; i+=1){
        names.push(persArr[i].name);
        ages.push(persArr[i].age);
        agesSum+=ages[i];
    }
    
    names.sort(function(a,b)
    {
        return a.localeCompare(b);
    });
    
    ages.sort();
    
    var averageAge = agesSum/ages.length;
    averageAge = Math.round(averageAge);
    
    var result = {
        names:  names.join(", "),
        minAge: ages[0],
        maxAge: Math.max.apply(Math, ages),
        averageAge: averageAge
    };

    return result;
}