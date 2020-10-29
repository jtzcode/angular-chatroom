import mongoose from 'mongoose';
import { ModelType } from "./database";
import { IMessageSchema, MessageModel } from "./messages";

export abstract class DataAccessBase<T extends mongoose.Document> {
    private model: ModelType;
    protected constructor(model: ModelType) {
        this.model = model;
    }

    Add(item: T): Promise<boolean> {
        return new Promise<boolean>((callback, error) => {
            this.model.create(item, (err: unknown, result: T) => {
                if (err) {
                    error(err);
                }
                callback(!result);
            });
        });
    }

    GetAll(conditions: any, fields: unknown): Promise<unknown[]> {
        return new Promise<T[]>((callback, error) => {
            this.model.find(conditions, fields, (err: unknown, result: any[]) => {
                if (err) {
                    error(err);
                }
                if (result) {
                    callback(result);
                }
                
            });
        });
    }
}

export class MessageDataAccess extends DataAccessBase<IMessageSchema> {
    constructor() {
        super(MessageModel);
    }
}