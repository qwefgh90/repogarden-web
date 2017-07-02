import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { REPOSITORIES } from '../mock/mock-repositories';
import { AUTH_RESPOND } from '../mock/mock-user-info';
import { Repository } from '../class/repository';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
            if (connection.request.url.split('?')[0].endsWith('/repositories') && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: REPOSITORIES
                })));
                console.info(JSON.stringify(connection.request));
                return;
            }

            if (connection.request.url.split('?')[0].endsWith('/client') && connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: 'fa53e2edfcd2a6a7bcd7'
                })));
                return;

            }

            if (connection.request.url.split('?')[0].match(/repositories\/([^\/]+)\/([^\/]+)/) != null && connection.request.method === RequestMethod.Put) {
                let matches = connection.request.url.split('?')[0].match(/repositories\/([^\/]+)\/([^\/]+)/);
                let userId = matches[1];
                let repositoryName = matches[2];
                let bodyObject = JSON.parse(connection.request.getBody());
                let repositoryToFind = REPOSITORIES.find(repo => {
                    return repo.name == repositoryName;
                });

                let indexToFind = REPOSITORIES.indexOf(repositoryToFind);
                if (repositoryToFind == undefined) {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 400
                    })));
                } else {
                    if (bodyObject.hasOwnProperty('activated'))
                        REPOSITORIES[indexToFind] = new Repository(repositoryToFind['name'], repositoryToFind['accessLink'], bodyObject['activated'], repositoryToFind['cves']);
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })));
                }
                console.info(JSON.stringify(connection.request));
                return;
            }

            if (connection.request.url.split('?')[0].endsWith('/login') && connection.request.method === RequestMethod.Post) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: AUTH_RESPOND
                })));
                console.info(JSON.stringify(connection.request));
                return;
            }
            if (connection.request.url.split('?')[0].endsWith('/login/oauth/access_token') && connection.request.method === RequestMethod.Post) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: { "access_token": "1234", "scope": "", "token_type": "bearer" }
                })));
            }

            if (connection.request.url.split('?')[0].endsWith('/login/oauth/authorize') && connection.request.method === RequestMethod.Get) {
                let paramsBlock = connection.request.url.split("?")[1];
                let paramArray = paramsBlock.split('&').map(keyValue => {
                    return keyValue.split('=');
                });
                let redirectUrlOption = paramArray.filter(pair => { pair[0] === 'redirect_uri' });
                if (redirectUrlOption.length > 0) {
                    let headers = new Headers();
                    headers.append("location", redirectUrlOption[0][1] + '?code=1234&state=5678');
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 302
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('Redirect url is not supplied.'));
                }
                return;
            }
            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
