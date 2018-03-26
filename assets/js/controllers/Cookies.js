class Cookies {

    constructor(cname,cvalue,exdays) {
        this.name = cname;
        this.value = cvalue;
        this.expiration = exdays;
    }

    setCookie() {
        let d = new Date();
        d.setTime(d.getTime() + (this.expiration * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = this.name + "=" + this.value + ";" + expires + ";path=/";
    }

    getCookie() {
        let name = this.name + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
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