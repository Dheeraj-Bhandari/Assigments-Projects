const msalParams = {
    auth: {
        authority: "https://login.microsoftonline.com/consumers",
       
        clientId: "1620a102-220d-45c2-a00d-fb0b1cb54fd6",
        redirectUri: "https://one-drive-picker-by-dheeraj.netlify.app/"
    },
}

const app = new msal.PublicClientApplication(msalParams);

async function getToken() {

    let accessToken = "";

    authParams = { scopes: ["OneDrive.ReadWrite"] };

    try {

        // see if we have already the idtoken saved
        const resp = await app.acquireTokenSilent(authParams);
        accessToken = resp.accessToken;

    } catch (e) {

        // per examples we fall back to popup
        const resp = await app.loginPopup(authParams);
        app.setActiveAccount(resp.account);

        if (resp.idToken) {

            const resp2 = await app.acquireTokenSilent(authParams);
            accessToken = resp2.accessToken;

        }
    }

    return accessToken;
}
