import express from 'express';
import morgan from 'morgan';
// require('dotenv').config();
import * as dotenv from 'dotenv';

dotenv.config();
import { MongoClient } from 'mongodb';
import { mongoConnect } from './services/db.js';
import { getAllBook } from './services/books.crud.js';

// let TASKS = [
//     { id: 1, name: 'Task 1' },
//     { id: 2, name: 'Task 2' },
// ];

//mongoConnect();

const PORT = process.env.PORT || 2345;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use((req, resp, next) => {
    resp.port = PORT;
    next();
});

app.use(express.static('public'));

app.get('/books', async (req, resp) => {
    //mongoConnect();
    const allbooks = await getAllBook();
    resp.send(allbooks);
});

//console.log(getAllBook());

// app.get('/tasks', (req, resp) => {
//     // devolver las tareas
//     resp.json(TASKS);
// });

// app.get('/tasks/:id', (req, resp, next) => {
//     // devolver las tareas
//     const result = TASKS.find((item) => +item.id === +req.params.id);
//     if (result) {
//         resp.json(result);
//     } else {
//         next(new Error('Tarea no existente'));
//     }
// });

// app.post('/tasks', (req, resp) => {
//     req.body;
//     console.log(req.body);
//     const newId = Math.max(...TASKS.map((item) => item.id)) + 1;
//     const newTask = { ...req.body, id: newId };
//     TASKS.push(newTask);
//     console.log(TASKS);
//     resp.json(newTask);
// });

// app.patch('/tasks/:id', (req, resp) => {
//     const index = TASKS.findIndex((item) => +item.id === +req.params.id);
//     TASKS[index] = { ...TASKS[index], ...req.body };
//     resp.json(TASKS[index]);
// });
// // app.put();
// app.delete('/tasks/:id', (req, resp) => {
//     const initialLength = TASKS.length;
//     TASKS = TASKS.filter((item) => +item.id !== +req.params.id);
//     resp.json({ deleteItems: TASKS.length === initialLength - 1 ? 1 : 0 });
// });

// // eslint-disable-next-line no-unused-vars
// app.use((err, req, resp, next) => {
//     console.log(err);
//     resp.json({ error: err.message });
// });

app.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT);
});
