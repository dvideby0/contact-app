/**
 * Created with PhpStorm.
 * User: Richard Brookfield
 * Date: 8/19/14
 * Time: 5:59 PM
 */

// Set the WebView background color to white (effective on iOS only)
steroids.view.setBackgroundColor("#FFFFFF");

var mApp = mApp || {}; //create mApp object

mApp.domain = 'https://solstice.applauncher.com/external/'; //Default domain for API calls

mApp.openView = function(view) {
    steroids.layers.push({view: JSON.parse(localStorage.getItem(view)), keepLoading:false, navigationBar: false}); // Opens a new view by passing in a view's name. All preloaded views are stored in local storage
};


mApp.postMessage = function(view, message){
    window.postMessage({view:view, message: message}); //Method for sending messages back and forth between views. Works similar to a pub/sub model
};

mApp.messageReceived = function(event) { // Function for when a view receives a message
    if(event.data.view == title){
        SpecialMessage(event.data);
    }
};

mApp.callAPI = function(type, resource, data, errMsg, callback){ //generic ajax function for making API calls
    $.ajax({
        type: type.toUpperCase(),
        url: this.domain + resource,
        data: data,
        contentType: 'application/json',
        timeout: 30000,
        cache: false,
        success: function(data){
            callback(data);
        },
        error: function(xhr, type){
            if(errMsg){
                navigator.notification.alert(errMsg, null, 'Error');
            }
        }
    });
};

mApp.init = function(){ // Make all views begin listening for messages
    window.addEventListener("message", this.messageReceived);
};
mApp.init();