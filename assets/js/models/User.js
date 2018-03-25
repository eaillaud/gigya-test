class User {

    constructor() {
        let properties  = ["UID", "UIDSig", "timestamp", "loginProvider", "loginProviderUID", "nickname", "photoURL", "thumbnailURL", "firstName", "lastName", "gender", "birthDay", "birthMonth", "birthYear", "email", "country", "state", "city", "zip", "profileURL", "proxiedEmail", "providers"];
        for (let i = 0; i < properties.length; i++) {
            this[properties[i]] = '';
        }
    }

    fillDataUserFromUrl() {
        let urlParamsArr = {};
        let urlParams = document.location.search.substr(1).split("&");

        for (let i = 0; i < urlParams.length; i++) {
            let ret = urlParams[i].toString().split("=");
            this[ret[0]] = decodeURIComponent(ret[1]);
        }
    }

    static generateParamsUrl(user) {
        let parameters = ["UID", "UIDSig", "timestamp", "loginProvider", "loginProviderUID", "nickname", "photoURL", "thumbnailURL", "firstName", "lastName", "gender", "birthDay", "birthMonth", "birthYear", "email", "country", "state", "city", "zip", "profileURL", "proxiedEmail", "providers"];
        let appendUrl = '';
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

    static getConnections(user) {
        let result = '';
        let providers = user.providers;
        for (let i = 0; i < providers.length; i++) {
            result = result + providers[i] + ',';
        }
        if (result != '') {
            result = result.slice(0, -1);
        }
        return result;
    }
}