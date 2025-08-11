import { PublicClientApplication, type Configuration, type IPublicClientApplication } from "@azure/msal-browser";
import type { IAuthenticateCommand } from "./types";

const msalParams: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_MS_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MS_TENANT_ID}/`,
        redirectUri: 'https://localhost:5173',
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true, // set to true for IE 11
    },
}

// const app = new PublicClientApplication(msalParams);

export async function getToken(command: IAuthenticateCommand, instance: IPublicClientApplication): Promise<string> {
    let accessToken = "";
    const authParams = { scopes: [`${combine(command.resource, ".default")}`] };
    
    await instance.initialize();

    try {

        // see if we have already the idtoken saved
        const resp = await instance.acquireTokenSilent(authParams!);
        accessToken = resp.accessToken;

    } catch (e) {
        console.log('e', e)
        // per examples we fall back to popup
        // const resp = await app.loginPopup(authParams!);
        // app.setActiveAccount(resp.account);

        // if (resp.idToken) {

        //     const resp2 = await app.acquireTokenSilent(authParams!);
        //     accessToken = resp2.accessToken;

        // } else {

        //     // throw the error that brought us here
        //     throw e;
        // }
    }

    return accessToken;
}


/**
 * Combines an arbitrary set of paths ensuring and normalizes the slashes
 *
 * @param paths 0 to n path parts to combine
 */
 export function combine(...paths: (string | null | undefined)[]): string {

    return paths
        .filter(path => typeof path === "string" && path !== null)
         
        .map(path => path!.replace(/^[\\|/]/, "").replace(/[\\|/]$/, ""))
        .join("/")
        .replace(/\\/g, "/");
}
