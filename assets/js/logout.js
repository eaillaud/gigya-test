/**
 * Initialize logout
 */
function initLogout() {
    let cookie = new Cookies('current-connections');
    let currentConnections = cookie.getCookie();
    if (currentConnections === '') {
        window.location = "http://localhost:8085/a.html?error=nologin";
    } else {
        showData();
        showConnection();
    }
}

/**
 * Show user data present in url parameters
 */
function showData() {
    let user = new User();
    user.fillDataUserFromUrl();
    if (user.firstName != undefined) {
        if (user.lastName != '') {
            document.getElementById("userName").innerText = user.firstName + ' ' + user.lastName;
        } else {
            document.getElementById("userName").innerText = user.firstName;
        }
    } else {
        document.getElementById("userName").innerText = "Gigya Friend!"
    }
    /*
    @todo not working on localhost, img are not displayed, workaround: download locally and print them

    if(user.photoURL != undefined) {
        var img = document.createElement("IMG");
        img.src = user.photoURL;
        document.getElementById('imageDiv').appendChild(img);
    }
    */
    if (user.loginProvider != undefined) {
        document.getElementById("userLoginProvider").innerText = "Thank you for logging in with " + user.loginProvider;
    }
}

/**
 * Function to display available connection (use Gigya)
 */
function showConnection() {
    let myGigya = new MyGigya();
    myGigya.headerText = 'Get Fully Connected!';
    myGigya.containerID = 'showConnectionDiv';
    myGigya.height = 100;
    myGigya.width = 520;
    myGigya.UIConfig = '<config><body><texts color="white" size="20px"></texts><controls><snbuttons buttonsize="60"></snbuttons></controls><background background-color="transparent" frame-color="transparent"></background></body></config>';
    myGigya.showTermsLink = false;
    myGigya.showEditLink = false;
    myGigya.onLoad = logoutEventOnLoad;
    myGigya.onConnectionAdded = logoutEventOnConnectionAdded;
    myGigya.showAddConnections();
}

/**
 * Callback for logout
 * @param response
 */
function executeLogout(response) {
    if (response.errorCode == 0) {
        window.location = "http://localhost:8085/a.html"
    }
    else {
        alert('Error :' + response.errorMessage);
    }
}

/**
 * Execute logout from Gigya
 */
function simpleLogout() {
    showLoading();
    let cookie = new Cookies('current-connections');
    cookie.deleteCookie();
    gigya.socialize.logout({callback: executeLogout});
}

/**
 * When gigya is onLoad show the connections updated
 * @param evt
 */
function logoutEventOnLoad(evt) {
    displayConnections();
}

/**
 * When adding new Connection update info and cookies and show a new div with the new connection added
 * @param evt
 */
function logoutEventOnConnectionAdded(evt) {
    let currentConnections = new Cookies('current-connections').getCookie();
    let currentConnectionsArray = currentConnections.split(",");
    let allProviders = User.getConnections(evt.user);
    let newProvider = getNewProvider(currentConnectionsArray,allProviders);
    setConnections(evt.user);
    displayConnections();
    displayNewConnection(newProvider)
}

/**
 * called by logoutEventOnConnectionAdded - needed to display the div with new provider added
 * @param newProvider
 */
function displayNewConnection(newProvider) {
    document.getElementById("showNewConnection").innerText = "Amazing! You added a new connection to " + newProvider;
    $( "#showNewConnection" ).show( "slow", function() {
        // Animation complete.
    });
}
/*
function fullLogout(){
    var uid = getCookie('gigya-uid');
    alert(uid);
    deleteCookie('current-connections');
    <!-- The Gigya Web SDK is required once per page-->
    var params = {
        "UID":"_gid_14hL9Xm4Pt6y1trmpbGYPfASqqOpd3KAqsWy9QnRDzE="
    }
    gigya.accounts.logout(params);
    window.location = "http://localhost:8085/a.html";
}
*/
