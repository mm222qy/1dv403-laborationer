"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		if (str === "")
		{
			throw new Error("Skriv in en sträng!")
		}
		
		var myarr = [i];
		myarr = str.split("");
		var i = 0;
		
		for (i; i < str.length; i+=1) 
		{
			if (myarr[i] === myarr[i].toLowerCase() )
			{	myarr[i] = myarr[i].toUpperCase();	}  
			
			else 
			{	myarr[i] = myarr[i].toLowerCase();	}  
		}
		
		str = myarr.toString();
		str = str.split("a").join("#"); 
		str = str.split("A").join("#");
		str = str.split(",").join("");
		
		return [str];		
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};