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
            window.alert("jQuery is loaded, after " + tookTime + " milliseconds!");
        });
    });
})();

function myJSON(){

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

}

function init(){
	var btn = document.createElement("BUTTON");        // Create a <button> element
	var t = document.createTextNode("CLICK ME");       // Create a text node
	btn.appendChild(t);                                // Append the text to <button>
	btn.onclick = function(){
		myJSON();
		
		var imgDiv = document.createElement("div");
		imgDiv.setAttribute("id", "images");

		document.body.appendChild(para);
		document.body.appendChild(imgDiv);
	}
	document.body.appendChild(btn);
}
