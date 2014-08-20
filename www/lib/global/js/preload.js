/**
 * Created with PhpStorm.
 * User: Richard Brookfield
 * Date: 8/19/14
 * Time: 6:17 PM
 */

var cDetails = new steroids.views.WebView("views/contact-details.html"); // Function to pre-load views and store them in local storage. This is used by the mApp.openView function
cDetails.preload({}, {
    onSuccess: function() {
        localStorage.setItem('cDetails', JSON.stringify(cDetails));
    }
});