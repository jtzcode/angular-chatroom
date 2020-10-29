import { Mongo } from "./database/database";
import socket from 'socket.io';


@Mongo("http://localhost:27017/ng-chatroom")
export class SocketServer {
    public Start() {
        const appSocket = socket(3000);
        this.onConnect(appSocket);
    }

    private onConnect(io: socket.Server) {
        io.on('connection', (socket: any) => {

        });
    }
}

new SocketServer().Start();