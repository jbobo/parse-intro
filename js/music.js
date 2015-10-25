// Initialize Parse app
Parse.initialize("lRqSrXBEDeLBcFaVzuBnQeuzx4ul78EMy6GICqbT", "xeP2HKBUN0cbNwYuM0bKnt2H327CvOuVk6xKcBXo");

// Create a new sub-class of the Parse.Object, with name "Music"

var Music = Parse.Object.extend('Music')

// Create a new instance of your Music class 

//var MusicI = new Music()

// Set a property 'band' equal to a band name

//MusicI.set('band', '')

//<objectName>.set('<property>', '<returnedValue>')
//we set the value of the property to an <emtyString> '' because we will be settig it with the form input later, 
//plus it shows an empty form initially 

// Set a property 'website' equal to the band's website

//MusicI.set('website', '') 
    
// Set a property 'song' equal to a song

//MusicI.set('song', '')

// Save your instance of your song -- and go see it on parse.com!

//MusicItem.save()

// Click event when form is submitted
$('form').submit(function() {

	// Create a new instance of your Music class 
	
	var MusicItem = new Music()
	
	// For each input element, set a property of your new instance equal to the input's value

	/*MusicItem.set('band', '');

	MusicItem.set('website', '');

	MusicItem.set('song', '');*/
    
    $(this).find('input').each(function(){
        MusicItem.set($(this).attr('id'), $(this).val());
        $(this).val('');
    })
	// After setting each property, save your new instance back to your database

	//MusicItem.save()
    //return false
	MusicItem.save(null, {
        sucess:getData 
    })
	return false
})

// Write a function to get data
var getData = function() {

	// Set up a new query for our Music class
    var query = new Parse.Query(Music) 
	// Set a parameter for your query -- where the website property isn't missing
    query.notEqualTo('website', '')
	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
    query.find({
        success:function(resuls) {
            buildlist(results)
        }
    })
}

// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	$('ol').empty()
	// Loop through your data, and pass each element to the addItem function
    data.forEach(function(d){
        addItem(d);
    })
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
    var website = item.get('website')
    var band = item.get('band')
    var song = item.get('song')
	// Append li that includes text from the data item
    var li = $('<li>Check out ' + band + ', their best song is ' + song + '</li>')
	// Time pending, create a button that removes the data item on click
    //create a button with a <span> element -using a bootstrap class to show the X 
	var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>')
    //click funtion on the button to destroy the item, then recall getdata
    button.click(function() {
        item.destroy({
            success:getData
        })    
    })
    //append the button to the li, then the li to the ol -not sure why he added these last 3 bits...
    li.append(button);
    $('ol').append(li);
}
// Call your getData function when the page loads
getData()

