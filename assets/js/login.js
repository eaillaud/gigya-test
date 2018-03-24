function initLogin() {
    loggedTimes();
    var urlData = getUrlData();
    if (urlData != '' && urlData['error'] === 'nologin') {
        document.getElementById("errorLogin").style = "display:block";
    }
}

function DisplayEventMessageLogin(eventObj) {
    var modal = document.getElementById('myModal');
    var countLogin = getCookie('count-login');
    if (countLogin === '') {
        countLogin = 1;
    } else {
        countLogin = parseInt(countLogin) + 1;
    }
    setCookie('count-login', countLogin, 30);
    setConnections(eventObj.user);
    var paramsUrl = generateParamsUrl(eventObj.user);
    var redirectUrl = "http://localhost:8085/b.html" + paramsUrl;
    //eventObj.user.email = '';
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
    var context = {
        msg: 'This is my params.context.msg'
    };
    var params = {
        showTermsLink: false,
        headerText: "Please Login using one of the following providers:",
        height: 300,
        width: 483,
        cid: '',
        containerID: "loginDiv",
        UIConfig: '<config><body><texts color="#DFDFDF"></texts><controls><snbuttons buttonsize="45"></snbuttons></controls><background background-color="transparent"></background></body></config>',
        buttonsStyle: 'fullLogo',
        redirectURL: "",
        context: context,
    };
    /*params['onLogin'] = function (evt) {
        var countLogin = getCookie('count-login');
        if (countLogin === '') {
            countLogin = 1;
        } else {
            countLogin = parseInt(countLogin) + 1;
        }
        setCookie('count-login', countLogin, 30);
        evt.user.email = '';
        if (evt.user.email === '') {
            modal.style.display = "block";
        }
    };*/

    gigya.socialize.addEventHandlers({
        onLogin: DisplayEventMessageLogin
    });

    gigya.socialize.showLoginUI(params);
}