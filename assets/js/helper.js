function generateParamsUrl(user) {
    var parameters = ["UID", "UIDSig", "timestamp", "loginProvider", "loginProviderUID", "nickname", "photoURL", "thumbnailURL", "firstName", "lastName", "gender", "birthDay", "birthMonth", "birthYear", "email", "country", "state", "city", "zip", "profileURL", "proxiedEmail", "providers"];
    var appendUrl = '';
    for (let i = 0; i < parameters.length; i++) {
        if (user[parameters[i]] != '') {
            appendUrl += parameters[i] + '=' + user[parameters[i]] + '&';
        }
    }
    if (appendUrl != '') {
        appendUrl = '?' + appendUrl.slice(0, -1);
    }
    return appendUrl;
    /*var appendUrl = eventObj.user.UID + '&'
        + eventObj.user.UIDSig + '&'
        + eventObj.user.timestamp + '&'
        + eventObj.user.loginProvider + '&'
        + eventObj.user.loginProviderUID + '&'
        + eventObj.user.nickname + '&'
        + eventObj.user.photoURL + '&'
        + eventObj.user.thumbnailURL + '&'
        + eventObj.user.firstName + '&'
        + eventObj.user.lastName + '&'
        + eventObj.user.gender + '&'
        + eventObj.user.birthDay + '&'
        + eventObj.user.birthMonth + '&'
        + eventObj.user.birthYear + '&'
        + eventObj.user.email + '&'
        + eventObj.user.country + '&'
        + eventObj.user.state + '&'
        + eventObj.user.city + '&'
        + eventObj.user.zip + '&'
        + eventObj.user.profileURL + '&'
        + eventObj.user.proxiedEmail + '&'
        + eventObj.user.providers;*/
}

function loggedTimes() {
    var cookie = new Cookies('count-login');
    countLogin = cookie.getCookie();
    if (countLogin != '') {
        document.getElementById("loggedTimes").innerText = "Hooray, you logged in already " + countLogin + " times!";
    }
}

function getUrlData() {
    var urlParamsArr = {};
    // Parse the URL parameters into urlParamsArr
    var urlParams = document.location.search.substr(1).split("&");

    for (var i = 0; i < urlParams.length; i++) {
        var ret = urlParams[i].toString().split("=");
        urlParamsArr[ret[0]] = decodeURIComponent(ret[1]);
    }
    return urlParamsArr;
}


function getConnections() {
    let cookie = new Cookies('current-connections');
    return cookie.getCookie();
}

function displayConnections() {
    let currentConnections = getConnections();
    document.getElementById('showCurrentConnections').innerHTML = 'Please remember that you are currengly logged in with: ' + currentConnections;
}

function myOnLoad(evt) {
    displayConnections();
}

function myOnConnectionAdded(evt) {
    setConnections(evt.user);
    displayConnections();
}

function shareMeNow(){
    // Constructing a UserAction Object
    let userAction = new gigya.socialize.UserAction();
    userAction.setTitle("Hi friends! Try this amazing login NOW!");
    userAction.setLinkBack("http://localhost:8085/a.html");
    userAction.setDescription("This is my Description");   // Setting Description
    userAction.addActionLink("Read More", "http://localhost:8085/a.html");  // Adding Action Link

    // Adding a Media Item (image)
    act.addMediaItem( { type: 'image', src: 'https://demo.gigya.com/images/300x250_myoss_3frames-lg.gif', href: 'https://demo.gigya.com/about.php' });
    let myGigya = new MyGigya();
    myGigya.userAction = act;
    myGigya.showMoreButton = true;
    myGigya.showEmailButton = true;
    myGigya.shareMe();
}

