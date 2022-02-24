import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

export async function mongoConnect() {
    const user = process.env.DBUSER;
    const password = process.env.DBPASSWD;
    const dbName = process.env.DBNAME;
    const uri = `mongodb+srv://${user}:${password}@cluster0.znp1w.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    console.log(uri);

    const mongoClient = new MongoClient(uri);
    const mongoConnect = await mongoClient.connect();
    const dbCoders = mongoConnect.db(); //devuelve la base de datos

    //necesitamos que devuelva el cliente y la base de datos, por tanto:
    // console.log(mongoClient, dbCoders);
    return { mongoClient, dbCoders };
}

mongoConnect();

export async function booksConnect() {
    const collection = 'books';
    const { mongoClient, dbCoders } = await mongoConnect();
    const booksCollection = dbCoders.collection(collection);
    return { mongoClient, booksCollection };
}
