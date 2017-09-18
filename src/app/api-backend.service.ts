import { Injectable } from '@angular/core';
import { Request, XHRBackend, XHRConnection } from '@angular/http';

@Injectable()
export class ApiBackendService extends XHRBackend {
    createConnection(request: Request): XHRConnection {
        if (request.url.startsWith('/')) {
            request.url = this.frontPart() + request.url;     // prefix base url
        }
        return super.createConnection(request);
    }
    frontPart(): string {
        return 'http://localhost:9000';
    }
}

export let apiBackendProvider = { provide: XHRBackend, useClass: ApiBackendService }
