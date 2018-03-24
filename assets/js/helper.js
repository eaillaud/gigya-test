function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function generateParamsUrl(user) {
    var parameters = ["UID", "UIDSig", "timestamp", "loginProvider", "loginProviderUID", "nickname", "photoURL", "thumbnailURL", "firstName", "lastName", "gender", "birthDay", "birthMonth", "birthYear", "email", "country", "state", "city", "zip", "profileURL", "proxiedEmail", "providers"];
    var appendUrl = '';
    for (i = 0; i < parameters.length; i++) {
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
    var countLogin = getCookie('count-login');
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

function setConnections(user) {
    var result = '';
    var providers = user.providers;
    for (var i = 0; i < providers.length; i++) {
        var result = result + providers[i] + ',';
    }
    if (result != '') {
        result = result.slice(0, -1);
    }
    setCookie('current-connections', result, 30);
}

function getConnections() {
    var currentConnections = getCookie('current-connections');
    return currentConnections;
}

function displayConnections() {
    var currentConnections = getConnections();
    document.getElementById('showCurrentConnections').innerHTML = 'Please remember that you are currengly logged in with: ' + currentConnections;
}

function myOnLoad(evt) {
    displayConnections();
}

function myOnConnectionAdded(evt) {
    setConnections();
}

function shareMeNow(){
    // Constructing a UserAction Object
    var act = new gigya.socialize.UserAction();
    act.setTitle("Hi friends! Try this amazing login NOW!");
    act.setLinkBack("http://localhost:8085/a.html");
    act.setDescription("This is my Description");   // Setting Description
    act.addActionLink("Read More", "http://localhost:8085/a.html");  // Adding Action Link

// Adding a Media Item (image)
    act.addMediaItem( { type: 'image', src: 'https://demo.gigya.com/images/300x250_myoss_3frames-lg.gif', href: 'https://demo.gigya.com/about.php' });

    var params =
        {
            userAction:act
            ,showMoreButton: true // Enable the "More" button and screen
            ,showEmailButton: true // Enable the "Email" button and screen
        };

// Show the "Share" dialog
    gigya.socialize.showShareUI(params);
}

