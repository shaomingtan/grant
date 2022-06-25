import express from 'express';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import getHandlers from './handlers'
import getRepo from './repo'

const app = express();
const port = 3000;

const firebaseConfig = {projectId: ""};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const repo = getRepo.init(db)
const handlers = getHandlers.init(repo)

app.get('/households', async (req, res) => {
  const result = await handlers.getHouseHold()
  res.json(result);
});
// app.post('/household', async (req, res) => {})
// app.patch('/household', async (req, res) => {})
// app.delete('/household', async (req, res) => {})

// app.get('/households', async (req, res) => {
//   res.send('Hello World!');
// });
// app.post('/person', async (req, res) => {})
// app.patch('/person', async (req, res) => {})
// app.delete('/person', async (req, res) => {})

// app.post('/household/${householdID}/member', async (req, res) => {})
// app.delete('/household/${householdID}/member/', async (req, res) => {})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});