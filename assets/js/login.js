function initLogin() {
    loggedTimes();
    let user = new User();
    user.fillDataUserFromUrl();
    if (user != '' && user['error'] === 'nologin') {
        document.getElementById("errorLogin").style = "display:block";
    }
}

function DisplayEventMessageLogin() {
    /* Update counter for login access */
    let cookie = new Cookies('count-login');
    var countLogin = cookie.getCookie();
    if (countLogin === '') {
        countLogin = 1;
    } else {
        countLogin = parseInt(countLogin) + 1;
    }
    cookie.value = countLogin;
    cookie.expiration = 30;
    cookie.setCookie();

    /* Update current connected providers */
    let currentConnections = User.getConnections(e.user);
    cookie = new Cookies('current-connections', currentConnections, 30);
    cookie.setCookie();
    var paramsUrl = User.generateParamsUrl(e.user);
    var redirectUrl = "http://localhost:8085/b.html" + paramsUrl;

    /* modal logic if email is missing*/
    var modal = document.getElementById('myModal');
    eventObj.user.email = '';
    if (eventObj.user.email === '') {
        modal.style.display = "block";
        document.getElementById("confirmButton").onclick = function (ev) {
            document.getElementById("confirmButton").href = redirectUrl;
        }
    } else {
        window.location = redirectUrl;
    }
}

function login() {
    document.getElementById("errorLogin").style = "display:none";
    let myGigya = new MyGigya();
    myGigya.showTermsLink = false;
    myGigya.headerText = "Please Login using one of the following providers:";
    myGigya.height = 300;
    myGigya.width = 483;
    myGigya.containerID = "loginDiv";
    myGigya.UIConfig = '<config><body><texts color="#DFDFDF"></texts><controls><snbuttons buttonsize="45"></snbuttons></controls><background background-color="transparent"></background></body></config>';
    myGigya.buttonsStyle = 'fullLogo';
    /* Add Event Handler*/
    myGigya.onLogin = DisplayEventMessageLogin;
    /* Show Gigya Login*/
    myGigya.showLoginUI();
}