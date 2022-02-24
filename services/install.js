import { mongoConnect } from './db.js';
//import dataJSON from 'books.json'; //cuando se importa de un fichero json, se le puede poner el nombre que queramos, aqui le hemos puesto dataJSON
import dataJSON from './books.js';

//este fichero instalará la base de datos

async function install() {
    const collection = 'books';
    const { mongoClient, dbCoders } = await mongoConnect();

    const booksCollection = dbCoders.collection(collection);
    //booksCollection. // todo lo que se puede hacer aquí (ver lo que autocompleta, es el corazón de mongodb)
    const result = await booksCollection.insertMany(dataJSON);
    mongoClient.close();
    return result;
}

console.log(install());
