class Cookies {

    constructor(cname,cvalue,exdays) {
        this.name = cname;
        this.value = cvalue;
        this.expiration = exdays;
    }

    setCookie() {
        var d = new Date();
        d.setTime(d.getTime() + (this.expiration * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = this.name + "=" + this.value + ";" + expires + ";path=/";
    }

    getCookie() {
        var name = this.name + "=";
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

    deleteCookie() {
        document.cookie = this.name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}