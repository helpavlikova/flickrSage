//
// SAGE2 application: flickr
// by: Ja Prvni <josef.cerha@gmail.com>
//
// Copyright (c) 2018
//
// Anonymous "self-invoking" function
(function() {
    var startingTime = new Date().getTime();
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 20);
        }
    };

    // Start polling...
    checkReady(function($) {
        $(function() {
            var endingTime = new Date().getTime();
            var tookTime = endingTime - startingTime;
           // window.alert("jQuery is loaded, after " + tookTime + " milliseconds!");
        });
    });
})();
"use strict";
/* global  */

var flickr = SAGE2_App.extend({
	init: function(data) {
		// Create div into the DOM
		this.SAGE2Init("div", data);
		// Set the DOM id
		this.element.id = "div_" + data.id;
		// Set the background to black
		this.element.style.backgroundColor = 'white';
		
		//muj skvely dodatek--------------------------------------------------------------------------------------------------------------			
		
		var elem = document.createElement("p");
		var node = document.createTextNode("Hello world");
		elem.appendChild(node);
		this.element.appendChild(elem);
		
			
		var imgDiv = document.createElement("div");
		imgDiv.setAttribute("id", "images");
		this.element.appendChild(imgDiv);
		
		this.myJSON();
		//konec meho skveleho dodatku------------------------------------------------------------------------------------
		
		//this.element.appendChild(this.container);
		// move and resize callbacks
		this.resizeEvents = "continuous"; // onfinish
		// this.moveEvents   = "continuous";

		// SAGE2 Application Settings
		//
		// Control the frame rate for an animation application
		this.maxFPS = 2.0;
		// Not adding controls but making the default buttons available
		this.controls.finishedAddingControls();
		this.enableControls = true;

	},

	myJSON: function(){

		//window.alert("ziju");
	
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=375cec3b8ff5d999144523998b8a6449&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1",
		  "method": "GET",
		  "headers": {}
		}
	
		$.ajax(settings).done(function (data) {
			console.log(data);
			$.each( data.photos.photo, function( i, gp ) {
	
				var farmId = gp.farm;
				var serverId = gp.server;
				var id = gp.id;
				var secret = gp.secret;
	
				console.log(farmId + ", " + serverId + ", " + id + ", " + secret);
	
				//  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
	
				$("#images").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');
	
			});
		});
	
	},
	
	draw: function(date) {
		console.log('flickr> Draw with state value', this.state.value);
	},

	resize: function(date) {
		// Called when window is resized
		this.refresh(date);
	},

	move: function(date) {
		// Called when window is moved (set moveEvents to continuous)
		this.refresh(date);
	},

	quit: function() {
		// Make sure to delete stuff (timers, ...)
	},

	event: function(eventType, position, user_id, data, date) {
		if (eventType === "pointerPress" && (data.button === "left")) {
			// click
		} else if (eventType === "pointerMove" && this.dragging) {
			// move
		} else if (eventType === "pointerRelease" && (data.button === "left")) {
			// click release
		} else if (eventType === "pointerScroll") {
			// Scroll events for zoom
		} else if (eventType === "widgetEvent") {
			// widget events
		} else if (eventType === "keyboard") {
			if (data.character === "m") {
				this.refresh(date);
			}
		} else if (eventType === "specialKey") {
			if (data.code === 37 && data.state === "down") {
				// left
				this.refresh(date);
			} else if (data.code === 38 && data.state === "down") {
				// up
				this.refresh(date);
			} else if (data.code === 39 && data.state === "down") {
				// right
				this.refresh(date);
			} else if (data.code === 40 && data.state === "down") {
				// down
				this.refresh(date);
			}
		}
	}
});
