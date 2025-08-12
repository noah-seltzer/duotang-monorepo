import { useEffect, useRef } from 'react'
import { combine, getToken } from './util'
import { useMsal } from '@azure/msal-react'
import type { IPublicClientApplication } from '@azure/msal-browser'

const options = {
    sdk: '8.0',
    entry: {
        oneDrive: {
            files: {}
        }
    },
    authentication: {},
    messaging: {
        origin: window.location.origin,
        channelId: '27'
    }
}

const baseUrl = import.meta.env.VITE_HORIZON_SHAREPOINT_URL || 'https://onedrive.live.com'

async function createOneDriveWindow(instance: IPublicClientApplication, iframeDocument: Document): Promise<void> {
    let port: MessagePort
    async function messageListener(message: MessageEvent): Promise<void> {
        switch (message.data.type) {
            case 'notification':
                if (message.data.data.notification === 'page-loaded') {
                    // here we know that the browser page is loaded and ready for user interaction
                }

                console.log(message.data)
                break

            case 'command':
                // all commands must be acknowledged
                port.postMessage({
                    type: 'acknowledge',
                    id: message.data.id
                })

                // this is the actual command specific data from the message
                const command = message.data.data

                // command.command is the string name of the command
                switch (command.command) {
                    case 'authenticate':
                        // the first command to handle is authenticate. This command will be issued any time the browser requires a token
                        // 'getToken' represents a method that can take a command and return a valid auth token for the requested resource
                        const token = await getToken(command, instance)

                        if (typeof token !== 'undefined') {
                            // we report a result for the authentication via the previously established port
                            port.postMessage({
                                type: 'result',
                                id: message.data.id,
                                data: {
                                    result: 'token',
                                    token: token
                                }
                            })
                        }

                        break

                    case 'open':
                        // here we have intercepted an "open" command and can handle it within our application

                        // let the browser know that the open command was handled (required)
                        port.postMessage({
                            type: 'result',
                            id: message.data.id
                        })

                        break

                    default:
                        // we have hit a command we do not support
                        console.log(
                            `Unsupported command: ${JSON.stringify(command)}`
                        )
                        break
                }

                break
        }
    }
    // this adds a listener to the current (host) window, which the popup or embed will message when ready
    window.addEventListener('message', (event) => {
        // we validate the message is for us, win here is the same variable as above
        if (event.source) {
            const message = event.data

            // the channelId is part of the configuration options, but we could have multiple browsers so that is supported via channels
            if (
                message.type === 'initialize' &&
                message.channelId === options.messaging.channelId
            ) {
                // grab the port from the event
                port = event.ports[0]

                // add an event listener to the port (example implementation is in the next section)
                port.addEventListener('message', messageListener)

                // start ("open") the port
                port.start()

                // tell the browser to activate
                port.postMessage({
                    type: 'activate'
                })
            }
        }
    })

    // we need to get an authentication token to use in the form below (more information in auth section)
    const authToken = await getToken(
        {
            resource: baseUrl,
            command: 'authenticate',
            type: 'SharePoint'
        },
        instance
    )

    // now we need to construct our query string
    // options: These are the browser configuration, see the schema link for a full explaination of the available options
    const queryString = new URLSearchParams({
        fileBrowser: JSON.stringify(options)
    })

    const url = combine(baseUrl, `_layouts/15/fileBrowser.aspx?${queryString}`)
    const form = iframeDocument.createElement('form')
    form.setAttribute('action', url)
    form.setAttribute('method', 'POST')
    iframeDocument.body.append(form)

    const input = iframeDocument.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', 'access_token')
    input.setAttribute('value', authToken)
    form.appendChild(input)

    form.submit()
}

export function Picker() {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const { instance } = useMsal()

    useEffect(() => {
        if (!iframeRef.current?.contentDocument) return
        createOneDriveWindow(instance, iframeRef.current.contentDocument)
    }, [iframeRef])

    return <iframe className='w-full h-96' ref={iframeRef}></iframe>
}
