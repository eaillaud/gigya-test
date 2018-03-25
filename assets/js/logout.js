function initLogout() {
    var currentConnections = getConnections();
    if (currentConnections === '') {
        window.location = "http://localhost:8085/a.html?error=nologin";
    } else {
        showData();
        showConnection();
    }
}

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
        document.getElementById("userLoginProvider").innerText = "Thank you to login with " + user.loginProvider;
    }
}

function showConnection() {
    let myGigya = new MyGigya();
    myGigya.headerText = 'Get Fully Connected!';
    myGigya.containerID = 'showConnectionDiv';
    myGigya.height = 100;
    myGigya.width = 520;
    myGigya.UIConfig = '<config><body><texts color="white" size="20px"></texts><controls><snbuttons buttonsize="60"></snbuttons></controls><background background-color="transparent" frame-color="transparent"></background></body></config>';
    myGigya.showTermsLink = false;
    myGigya.showEditLink = false;
    myGigya.onLoad = myOnLoad;
    myGigya.onConnectionAdded = myOnConnectionAdded;
    myGigya.showAddConnections();
}

function executeLogout(response) {
    if (response.errorCode == 0) {
        window.location = "http://localhost:8085/a.html"
    }
    else {
        alert('Error :' + response.errorMessage);
    }
}

function simpleLogout() {
    let cookie = new Cookies('current-connections');
    cookie.deleteCookie();
    gigya.socialize.logout({callback: executeLogout});
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
