//initialize function called when the script loads
function initialize(){
    cities();
	addColumns();
	addEvents();
};

var cityPop = [
	{ 
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];

//function to create a table with cities and their populations
function cities(){

    //create the table element
    var table = document.createElement("table");

    //create a header row
    var headerRow = document.createElement('tr');

    //add the "City" and "Population" columns to the header row
    headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")

    //add the row to the table
    table.appendChild(headerRow);
 
    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        table.insertAdjacentHTML('beforeend',rowHtml);
    };

    document.querySelector("#myDiv").appendChild(table);
};


// Creates function which adds column to existing table for city size
function addColumns(){
    
    document.querySelectorAll('tr').forEach(function(row, i){
		
		// Creates header for City Size column using If/Else loop
    	if (i == 0){
			
    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');

    	} else {
			
			// Creates variable citySize, which varies for each row based on population size
    		var citySize;

				// If/Else loop to assign a citySize value for each row
				if (cityPop[i-1].population <= 100000) { 
					citySize = 'Small';

				} else if ((cityPop[i-1].population <= 500000) && (cityPop[i-1].population >= 100000)){
					citySize = 'Medium';

				} else {
					citySize = 'Large';
				};
				
			// Inserts citySize variable for each row to the table	
			row.insertAdjacentHTML('beforeend', '<td>'+citySize+'</td>');
    	};
    });
}; 


// Creates function which adds events
function addEvents(){
	
	//  Selects table as element and creates event listener when the mouse is over the table
	document.querySelector("table").addEventListener("mouseover", function(){
		
		// Creates variable color, and adds string as its value
		var color = "rgb(";
		
		// For loop to assign a random RGB color value to the color variable
		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
			};
		
		document.querySelector("table").style.color = color;
		};

		// Creates function that creates a pop-up when the table is clicked on
		function clickme(){

			alert('Hey, you clicked me!');
			};

		document.querySelector("table").addEventListener("click", clickme)
	})
};

//call the initialize function when the DOM has loaded
document.addEventListener('DOMContentLoaded',initialize);


// Defines function debugAjax (similar to jsAjax, just named differently)
function debugAjax(){
	
	// Retrieves MegaCities.geojson, converts the contents to a usable form, then sends contents to callback function
	fetch("data/MegaCities.geojson")
	.then(conversion)	
	.then(function(response) {
			debugCallback(response);
		})

};

// Defines function conversion to convert contents of geojson to usable format
function conversion(response) {
	return response.json();
};

// Defines debugCallback function to format contents from conversion function
function debugCallback(response) {
	document.querySelector("#myDiv").insertAdjacentHTML('beforeend', '<br>' + 'GeoJSON data: ' + '</br>' + JSON.stringify(response));
};

// Loads contents of debugAjax when window loads 
window.onload = debugAjax();

