import { Injectable } from '@angular/core';
import { Request, XHRBackend, XHRConnection } from '@angular/http';

@Injectable()
export class ApiBackendService extends XHRBackend {
    createConnection(request: Request): XHRConnection {
        console.log('cr: ' + request.withCredentials);
        if (request.url.startsWith('/')) {
            request.url = 'http://localhost:9000' + request.url;     // prefix base url
        }
        return super.createConnection(request);
    }
}

export let apiBackendProvider = { provide: XHRBackend, useClass: ApiBackendService }
