import mongoose, { Schema } from 'mongoose';

export interface IMessageSchema extends mongoose.Document {
    room: string;
    messageText: string;
    received: Date;
}

export const MessageSchema = new Schema({
    room: String,
    messageText: String,
    received: Date
});

export const MessageModel = mongoose.model<IMessageSchema>('message', MessageSchema, 'messages', false);