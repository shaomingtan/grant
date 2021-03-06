import express from 'express';
import firebaseAdmin from 'firebase-admin'
import getHandlers from './handlers'
import getRepo from './repo'

const app = express();
app.use(express.json());
const port = 3000;

const firebaseConfig = {projectId: "grant-1cf9a"};

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

app.post('/household', async (req, res) => {
  try {
    await handlers.addHouseHold(req.body)
    return res.sendStatus(200)
  } catch (e) {
    console.log("error", e)
    return res.sendStatus(500)
  }
})

app.get('/household/:houseHoldID', async (req, res) => {
  try {
    const {houseHoldID}=req.params
    const result = await handlers.getHouseHold(houseHoldID)
    res.json(result);
  } catch (e) {
    console.log("error", e)
    return res.sendStatus(500)
  }
});

app.post('/member', async (req, res) => {

  const result = await handlers.addMember(req.body)
  res.status(result.status)
  return res.send(result.message)
})

app.get('/member/:memberID', async (req, res) => {
  try {
    const {memberID}=req.params
    const result = await handlers.getMember(memberID)
    res.json(result);
  } catch (e) {
    console.log("error", e)
    return res.sendStatus(500)
  }
});

// Add member to household endpoint
app.post('/household/:houseHoldID/member/:memberID', async (req, res) => {
    const {houseHoldID,memberID}=req.params
    const result = await handlers.addMemberToHouseHold({houseHoldID,memberID})
    res.status(result.status)
    return res.send(result.message)
})

app.get('/search', async (req, res) => {
  await handlers.search(req.query)
  return res.sendStatus(200)
});

// app.patch('/household', async (req, res) => {})
// app.delete('/household', async (req, res) => {})
// app.patch('/member', async (req, res) => {})
// app.delete('/member', async (req, res) => {})

// app.delete('/household/${householdID}/member/', async (req, res) => {})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});