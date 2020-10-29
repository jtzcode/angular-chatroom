import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Socket } from 'ngx-socket-io';
import { Log } from '../types/logging';

export class Authorization {
    constructor(private socket: Socket) {
        
    }
    public IdToken: string;
    public AccessToken: string;
    public Expired: number;
    public Email: string;

    @Log()
    public SetFromAuthResult(authResult: any): void {
        if (authResult && authResult.accessToken && authResult.idToken) {
            this.AccessToken = authResult.accessToken;
            this.IdToken = authResult.idToken;
            this.Expired = (authResult.expiresIn * 1000) + Date.now();
            this.Email = authResult.idTokenPayload.email;
            this.socket.emit("loggedOn", this.Email);
        }
    }

    @Log()
    public Clear(): void {
        this.socket.emit("loggedOff", this.Email);
        this.IdToken = '';
        this.AccessToken = '';
        this.Expired = 0;
        this.Email = '';
    }

    public get IsAuthenticated(): boolean {
        return this.AccessToken && this.Expired > Date.now();
    }
}