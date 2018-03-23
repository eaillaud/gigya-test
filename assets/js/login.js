function login() {
    var modal = document.getElementById('myModal');

    var context = {
        msg: 'This is my params.context.msg'
    };
    var params = {
        showTermsLink: false, // 'terms' link is hidden
        headerText: "Please Login using one of the following providers:", // adding header text
        height: 300, // changing default add-on size
        width: 700,  // changing default add-on size
        cid: '',
        containerID: "loginDiv", // The add-on will embed itself inside the "loginDiv" DIV (will not be a popup)

        // Changes to the default design of the add-on's design

        //     Background color is changed to purple, text color to gray and button size is set to 40 pixels:
        UIConfig: '<config><body><texts color="#DFDFDF"></texts><controls><snbuttons buttonsize="40"></snbuttons></controls><background background-color="#6380ae"></background></body></config>',

        // Change the buttons design style to the 'fullLogo' style:
        buttonsStyle: 'fullLogo',

        // After successful login - the user will be redirected to "https://www.MySite.com/welcome.html" :
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
        onLogin: DisplayEventMessage
    });

    function DisplayEventMessage(eventObj) {
        var countLogin = getCookie('count-login');
        if (countLogin === '') {
            countLogin = 1;
        } else {
            countLogin = parseInt(countLogin) + 1;
        }
        setCookie('count-login', countLogin, 30);
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


    gigya.socialize.showLoginUI(params);
}