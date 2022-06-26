import express from 'express';
import firebaseAdmin from 'firebase-admin'
import getHandlers from './handlers'
import getRepo from './repo'

const app = express();
const port = 3000;

const firebaseConfig = {projectId: ""};

const firebaseApp = firebaseAdmin.initializeApp(firebaseConfig);
// Configuring to use local emulator for purpose of assignment
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
const db = firebaseAdmin.firestore(firebaseApp)
const repo = getRepo.init(db)
const handlers = getHandlers.init(repo)

app.get('/households', async (req, res) => {
  const result = await handlers.getHouseHolds()
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