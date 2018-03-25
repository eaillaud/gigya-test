class MyGigya {
    constructor() {
    }

    showLoginUI() {
        gigya.socialize.showLoginUI(this);
    }

    showAddConnections() {
        gigya.socialize.showAddConnectionsUI(this);
    }

    shareMe() {
        gigya.socialize.showShareUI(this);
    }
}
