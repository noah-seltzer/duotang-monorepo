import type { IMsalContext } from '@azure/msal-react'
import { loginRequest } from '../data/auth-config'
import type { AccountInfo, IPublicClientApplication } from '@azure/msal-browser'

const baseUrl = 'https://onedrive.live.com/picker'

export const openMSFilePicker = async (
    instance: IPublicClientApplication,
    accounts: AccountInfo[]
) => {
    const win = window.open('', 'Picker', 'width=1080,height=680')

    const token = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
    })
    // we need to get an authentication token to use in the form below (more information in auth section)
    // const authToken = await getToken({
    //     resource: baseUrl,
    //     command: "authenticate",
    //     type: "SharePoint",
    // });

    // to use an iframe you can use code like:
    // const frame = document.getElementById("iframe-id");
    // const win = frame.contentWindow;

    // now we need to construct our query string
    // options: These are the picker configuration, see the schema link for a full explaination of the available options
    const queryString = new URLSearchParams({
        filePicker: JSON.stringify(options),
        locale: 'en-us'
    })

    // Use MSAL to get a token for your app, specifying the resource as {baseUrl}.
    const accessToken = await getToken(baseUrl)

    // we create the absolute url by combining the base url, appending the _layouts path, and including the query string
    const url = baseUrl + `/_layouts/15/FilePicker.aspx?${queryString}`

    // create a form
    const form = win.document.createElement('form')

    // set the action of the form to the url defined above
    // This will include the query string options for the picker.
    form.setAttribute('action', url)

    // must be a post request
    form.setAttribute('method', 'POST')

    // Create a hidden input element to send the OAuth token to the Picker.
    // This optional when using a popup window but required when using an iframe.
    const tokenInput = win.document.createElement('input')
    tokenInput.setAttribute('type', 'hidden')
    tokenInput.setAttribute('name', 'access_token')
    tokenInput.setAttribute('value', accessToken)
    form.appendChild(tokenInput)

    // append the form to the body
    win.document.body.append(form)

    // submit the form, this will load the picker page
    form.submit()
}
