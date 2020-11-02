import { Mongo } from "./database/database";
import socket = require('socket.io');
import { MessageDataAccess } from "./database/dataAccessBase";
import { IMessageSchema } from "./database/messages";


@Mongo("http://localhost:27017/ng-chatroom")
export class SocketServer {
    constructor(private dataAccess: MessageDataAccess = new MessageDataAccess()) {

    }
    public Start() {
        const appSocket = socket(3000);
        this.onConnect(appSocket);
    }

    private onConnect(io: socket.Server) {
        io.on('connection', (socket: any) => {
            let lastRoom: string = '';
            socket.on('joinRoom', (room: string) => {
                if (lastRoom !== '') {
                    socket.leave(lastRoom);
                }
                if (room !== '') {
                    socket.join(room);
                }
                this.dataAccess.GetAll({ room: room }, { messageText: 1, _id: 0}).then((messages: string[]) => {
                    socket.emit('allMessages', messages);
                });
                lastRoom = room;
            });

            socket.on('message', (msg: string) => {
                this.WriteMessages(io, msg, lastRoom);
            });

            socket.on('loggedOn', (msg: any) => {
                io.sockets.in('secret').emit('userLogon', {user: msg, time: new Date()});
            });
        });
    }

    private WriteMessages(io: socket.Server, message: string, room: string) {
        this.SaveToDatabase(message, room).then(() => {
            if (room !== '') {
                io.sockets.in(room).emit('message', message);
                return;
            }
            io.emit('message', message);
        });
    }

    private async SaveToDatabase(message: string, room: string) {
        const model: IMessageSchema = <IMessageSchema> {
            messageText: message,
            received: new Date(),
            room: room
        }

        try {
            await this.dataAccess.Add(model);
        } catch (e) {
            console.log(`Unable to save message: ${message}`);
        }
    }
}

new SocketServer().Start();