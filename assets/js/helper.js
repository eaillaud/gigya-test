function loggedTimes() {
    var cookie = new Cookies('count-login');
    countLogin = cookie.getCookie();
    if (countLogin != '') {
        document.getElementById("loggedTimes").innerText = "Hooray, you logged in already " + countLogin + " times!";
    }
}

function displayConnections() {
    let cookie = new Cookies('current-connections');
    let currentConnections = cookie.getCookie();
    document.getElementById('showCurrentConnections').innerHTML = 'Please remember that you are currently logged in with: ' + currentConnections;
}

function setConnections(user){
    let cookie = new Cookies('current-connections');
    cookie.value = User.getConnections(user);
    cookie.expiration = 30;
    cookie.setCookie();
}

function shareMeNow(){
    // Constructing a UserAction Object
    let myGigya = new MyGigya();
    myGigya.userAction = new gigya.socialize.UserAction();
    myGigya.userAction.setTitle("Hi friends! Try this amazing login NOW!");
    myGigya.userAction.setLinkBack("http://localhost:8085/a.html");
    myGigya.userAction.setDescription("This is my Description");   // Setting Description
    myGigya.userAction.addActionLink("Read More", "http://localhost:8085/a.html");  // Adding Action Link
    // Adding a Media Item (image)
    myGigya.userAction.addMediaItem( { type: 'image', src: 'https://demo.gigya.com/images/300x250_myoss_3frames-lg.gif', href: 'https://demo.gigya.com/about.php' });
    myGigya.showMoreButton = true;
    myGigya.showEmailButton = true;
    myGigya.shareMe();
}

