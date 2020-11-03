import mongoose from 'mongoose';


export function Mongo(connection: string) {
    return (constructor: Function) => {
        mongoose.connect(connection, { useNewUrlParser: true }, (e: unknown) => {
            if (e) {
                console.log(`Unable to connect to DB: ${e}`);
            } else {
                console.log('Connected to DB');
            }
        });
    };
}

export type ModelType = mongoose.Model<mongoose.Document>;