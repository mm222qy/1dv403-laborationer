"use strict";

var messageboard = {

    
    messages: [],

    init: function() {
        // Hämtar ut element "button" och "message" till variabeler   
        var button = document.getElementById("button");
        var textArea = document.getElementById("message");
       
        button.onclick = messageboard.createMessage;

        //Lägger en händelsehanterare på onkeydown på elementet "message"
        textArea.onkeydown = function(e) {
            if (!e) {
                e = window.event;
            }
            // Om man trycker ner enter och shift samtidigt så kommer det inte hända nått     
            if (e.keyCode === 13 && e.shiftKey === false) {
                messageboard.createMessage();
                return false;
            }
        };

    },

    // Skapar ny meddelandebox
    createMessage: function() {
        // Tar elementet 'message' värde och sätter i variabel messageValue
        var messageValue = document.getElementById("message").value;
        // Kan inte skicka in tomt meddellande
        if ("" === messageValue) {
            return false;
        }
        var mess = new Message(messageValue, new Date());
        // Lägger i den ny skapade meddelandet med texten och datumet sist i arrayen
        messageboard.messages.push(mess);
        // Anropar renderMessages för att skriva ut meddelandena
        messageboard.renderMessages();
    },

    // Funktionen skriver ut meddelande                                
    renderMessage: function(messageID) {
        var messagearea = document.getElementById("messagearea");
        // Skapar p-tagg för inmatad text
        var p = document.createElement("p");
        p.className = "value";
        p.innerHTML = messageboard.messages[messageID].getHTMLText();
        // Skapar div-taggen
        var div = document.createElement("div");
        // Lägger in p-taggen i div
        div.appendChild(p);
        div.className = "message";
        // Lägger i div i messagearea
        messagearea.appendChild(div);

        var buttonsDiv = document.createElement("div");
        buttonsDiv.className = "buttons";

       
        var time = document.createElement("p");
        time.className = "clock";
        time.appendChild(document.createTextNode(messageboard.messages[messageID].getDateText()));

        var imageDelete = document.createElement("img");
        imageDelete.setAttribute("src", "delete.png");

        var linkDelete = document.createElement("a");
        linkDelete.setAttribute("href", "#");
        linkDelete.className = "pictures";
        // Lägger img-taggen i a-taggen
        linkDelete.appendChild(imageDelete);

        var imageClock = document.createElement("img");
        imageClock.setAttribute("src", "clock.png");
        // Skapar länken på klock-knappen
        var linkClock = document.createElement("a");
        linkClock.setAttribute("href", "#");
        linkClock.className = "pictures";
        // Lägger img-taggen i a-taggen
        linkClock.appendChild(imageClock);

        // Lägger i linkDelete och linkClock i div-taggen buttonsDiv
        buttonsDiv.appendChild(linkClock);
        buttonsDiv.appendChild(linkDelete);

        // Lägger in tidsstämpeln i div-taggen buttonsDiv
        buttonsDiv.appendChild(time);

        // Lägger in buttonsDiv i div-taggen message
        div.appendChild(buttonsDiv);

        // Anropar funktionen removeMessage som ska ta bort meddelande ifall man klickar på ta-bort knappen
        imageDelete.onclick = function() {
            messageboard.removeMessage(messageID);
        };

        // Anropar funktionen viewTime som ska visa tiden ifall man klickar på tid knappen
        imageClock.onclick = function() {
            messageboard.viewTime(messageID);
        };

    },

     
    removeMessage: function(messageID) {
        
        var userconfirmAnswer = confirm("Är du säker på att du vill radera meddelandet?");
        if (userconfirmAnswer) {
           
            messageboard.messages.splice(messageID, 1);
            // För att det ska synas att man har tagit bort meddelandet får man skriva ut dem på nytt
            messageboard.renderMessages();
        }
    },

    viewTime: function(messageID) {
        alert("Ditt meddelande skapades " + messageboard.messages[messageID].getDate().toLocaleDateString() + " klockan " + messageboard.messages[messageID].getDate().toLocaleTimeString());
    },

    // Funktionen skriver ut alla meddelande
    renderMessages: function() {
        // Rensar textfältet
        document.getElementById("message").value = "";
        // Ta bort alla meddelande
        document.getElementById("messagearea").innerHTML = "";
        // Gör så att räknaren börjar från noll
        document.getElementById("messagecounter").innerHTML = messageboard.messages.length;

        // For-loopar antalet meddelande i arrayen och vi gör renderMessage för att rita ut alla meddelande
        for (var i = 0; i < messageboard.messages.length; ++i) {
            messageboard.renderMessage(i);
        }
    }

};

window.onload = messageboard.init;