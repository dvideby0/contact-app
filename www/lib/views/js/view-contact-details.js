/**
 * Created with PhpStorm.
 * User: Richard Brookfield
 * Date: 8/19/14
 * Time: 7:31 PM
 */

var title = 'cDetails'; // View name for pub/sub

function SpecialMessage(event){ // Event handler for new messages
    var array = event.message.detailsURL.split('/'); // Get the API endpoint for the Contact Details
    var html = ''; // Create string to concatenate HTML and add to DOM at once. This reduces reflows.
    mApp.callAPI('get', 'Contacts/id/' + array[array.length -1], '', 'Error', function(data){ // API call to get additional contact details
        html += '<div class="list"><div class="item item-text-wrap"><div class="row">'; // Create a list view

        // Begin section for image, name, company and favorite
        html += '<div class="col col-33"><img class="img-large" src="' + event.message.smallImageURL + '" alt="" data-echo="' + data.largeImageURL + '"></div>'; // leverage pre-loading of cached low-res img as high res loads (using echo.js)
        html += '<div class="col col-50">' +
            '<div class="sub-title">Name</div>' +
            '<div class="sub-value">' + event.message.name + '</div>' +
            '<div class="sub-title">Company</div>' +
            '<div class="sub-value">' + event.message.company + '</div>' +
            '</div> ';
        if(data.favorite){html += '<div class="col col-25 icon favorite ion-star"></div>';} //Handle if Favorite
        html += '</div></div>';

        // Begin Phone, Address, Birthday and Email
        html += '<div class="item item-divider">Phone</div>';
        if(event.message.phone.work){html += '<div class="item"><div class="row"><div class="col col-70">' + event.message.phone.work + '</div><div class="col col-30 right sub-title">Work</div></div></div>';} //Check to see if phone number type is available
        if(event.message.phone.home){html += '<div class="item"><div class="row"><div class="col col-70">' + event.message.phone.home + '</div><div class="col col-30 right sub-title">Home</div></div></div>';} //Check to see if phone number type is available
        if(event.message.phone.mobile){html += '<div class="item"><div class="row"><div class="col col-70">' + event.message.phone.mobile + '</div><div class="col col-30 right sub-title">Mobile</div></div></div>';} //Check to see if phone number type is available
        html += '<div class="item item-divider">Address</div>';
        html += '<div class="item"><div class="row"><div class="col">' + data.address.street + '</div></div>';
        html += '<div class="row"><div class="col">' + data.address.city + ', ' + data.address.state + '</div></div></div>';
        html += '<div class="item item-divider">Birthday</div>';
        var d = new Date(0); //convert epoch time to UTC string and split to re-arrange
        d = d.toUTCString(event.message.birthdate).replace(/,/g, '').split(' ');
        html += '<div class="item">' + d[2] + ' ' + d[1] + ', ' + d[3] +'</div>';
        html += '<div class="item item-divider">Email</div>';
        html += '<div class="item">' + data.email + '</div></div>';
        $('#contact-details').html(html); // Add HTML string to DOM
        echo.init(); // Initialize echo to pre-load images
    });
}