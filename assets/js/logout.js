function initLogout() {
    var currentConnections = getConnections();
    if(currentConnections === ''){
        window.location="http://localhost:8085/a.html?error=nologin";
    } else {
        showData();
        showConnection();
    }
}
function showData(){
    var user = getUrlData();
    if(user.firstName != undefined) {
        if(user.lastName != '') {
            document.getElementById("userName").innerText = user.firstName + ' ' + user.lastName;
        } else {
            document.getElementById("userName").innerText = user.firstName;
        }
    } else {
        document.getElementById("userName").innerText = "Gigya Friend!"
    }
    /* if(user.photoURL != undefined) {
        var img = document.createElement("IMG");
        img.src = user.photoURL;
        document.getElementById('imageDiv').appendChild(img);
    } */
    if(user.loginProvider != undefined) {
        document.getElementById("userLoginProvider").innerText = "Thank you to login with " + user.loginProvider;
    }
}
function showConnection() {
    var context = {
        msg:'This is my params.context.msg'
    };

    var params = {
        captionText:'This is my caption text',
        headerText:'Get Fully Connected!',
        containerID: 'showConnectionDiv',
        height: 100, // changing default add-on size
        width: 520,  // changing default add-on size
        UIConfig:'<config><body><texts color="white" size="20px"></texts><controls><snbuttons buttonsize="60"></snbuttons></controls><background background-color="transparent" frame-color="transparent"></background></body></config>',
        showTermsLink:false,
        showEditLink:false,
        context:context
    };

    /*@todo event onLoad is not workin on addEventHandlers */
    params['onLoad'] = myOnLoad;
    gigya.socialize.addEventHandlers({
            onConnectionAdded:myOnConnectionAdded,
        }
    )

    gigya.socialize.showAddConnectionsUI(params);
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
    deleteCookie('current-connections');
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