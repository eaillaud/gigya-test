/**
 * Display login counter
 */
function loggedTimes() {
    let cookie = new Cookies('count-login');
    countLogin = cookie.getCookie();
    if (countLogin != '') {
        document.getElementById("loggedTimes").innerText = "Hooray, you logged in already " + countLogin + " times!";
    }
}

/**
 * Display provider connected
 */
function displayConnections() {
    let cookie = new Cookies('current-connections');
    let currentConnections = cookie.getCookie();
    document.getElementById('showCurrentConnections').innerHTML = 'Please remember that you are currently logged in with: ' + currentConnections;
}

/**
 * Persist provider connected
 * @param user
 */
function setConnections(user){
    let cookie = new Cookies('current-connections');
    cookie.value = User.getConnections(user);
    cookie.expiration = 30;
    cookie.setCookie();
}

/**
 * Utility to replace string credits - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
 * @param oldS
 * @param newS
 * @param fullS
 * @returns {*}
 */
function replaceString(oldS, newS, fullS) {
    for (let i = 0; i < fullS.length; ++i) {
        if (fullS.substring(i, i + oldS.length) == oldS) {
            fullS = fullS.substring(0, i) + newS + fullS.substring(i + oldS.length, fullS.length);
        }
    }
    return fullS;
}

/**
 * Get new provider, iterates arreay of new provider and take the one not present in the cookie
 * @param currentConnectionsArray
 * @param allProviders
 * @returns {*}
 */
function getNewProvider(currentConnectionsArray,allProviders) {
    for (let i = 0; i < currentConnectionsArray.length; ++i) {
        allProviders = replaceString(currentConnectionsArray[i],"",allProviders);
    }
    let result = replaceString(',',"",allProviders);
    return result;
}

function showLoading() {
    document.getElementById("showLoading").style = "display:block";
}

/**
 * Gigya feature to share info on the app
 */
function shareMeNow(){
    // Constructing a UserAction Object
    let myGigya = new MyGigya();
    myGigya.userAction = new gigya.socialize.UserAction();
    myGigya.userAction.setTitle("Hi friends! Try this amazing login NOW!");
    myGigya.userAction.setLinkBack("http://localhost:8085/a.html");
    myGigya.userAction.setDescription("Fastest login ever made!");   // Setting Description
    myGigya.userAction.addActionLink("Read More", "http://localhost:8085/a.html");  // Adding Action Link
    // Adding a Media Item (image)
    myGigya.userAction.addMediaItem( { type: 'image', src: 'assets/images/share-now.png', href: 'http://localhost:8085/a.html' });
    myGigya.showMoreButton = true;
    myGigya.showEmailButton = true;
    myGigya.shareMe();
}

