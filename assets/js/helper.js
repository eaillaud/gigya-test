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

function generateParamsUrl(user) {
    var parameters = ["UID","UIDSig","timestamp","loginProvider","loginProviderUID","nickname","photoURL","thumbnailURL","firstName","lastName","gender","birthDay","birthMonth","birthYear","email","country","state","city","zip","profileURL","proxiedEmail","providers"];
    var appendUrl = '';
    for (i=0; i<parameters.length ; i++) {
        if(user[parameters[i]]!='') {
            appendUrl += parameters[i] + '=' + user[parameters[i]] + '&';
        }
    }
    if(appendUrl!='') {
        appendUrl ='?' + appendUrl.slice(0,-1);
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