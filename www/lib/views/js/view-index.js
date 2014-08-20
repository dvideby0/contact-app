
var title = 'index'; // View name for pub/sub
var messageObj; // Global for this view that allows for sending object to other views
mApp.callAPI('get', 'contacts.json', '', 'Error', function(data){ // API call to get contact list
    messageObj = data;
    var html =''; // Create string to concatenate HTML and add to DOM at once. This reduces reflows.
    for(var i=0; i<data.length; i++){ // loop through array of contacts
        html += '<a class="item item-thumbnail-left" href="javascript:mApp.postMessage(\'cDetails\', messageObj[' + i + ']); mApp.openView(\'cDetails\');">' + // these anchors act as list items that when clicked pass a message to the cDetails view containing the current contact object. It also opens the cDetails view
            '<img class="img-small" src="' + data[i].smallImageURL + '">' +
            '<h2 class="contact-name">' + data[i].name + '</h2>';
        if(data[i].phone.work){html += '<div class="row tel-small"><div class="col">Work:</div><div class="col">' + data[i].phone.work + '</div></div>'} //Check to see if phone number type is available
        if(data[i].phone.home){html += '<div class="row tel-small"><div class="col">Home:</div><div class="col">' + data[i].phone.home + '</div></div>'} //Check to see if phone number type is available
        if(data[i].phone.mobile){html += '<div class="row tel-small"><div class="col">Mobile:</div><div class="col">' + data[i].phone.mobile + '</div></div>'} //Check to see if phone number type is available
        html +='</a>';
    }
    $('#contact-list').html(html); // Add HTML string to DOM
});