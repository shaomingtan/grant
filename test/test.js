const firebase = require("@firebase/testing");
const projectId = "grant-1cf9a";
var assert = require('assert');

// Init firebase test app
const firebaseTestApp = () => firebase.initializeTestApp({ projectId }).firestore();

// Clear emulator firestore before testing
beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId });
});

// Define collections reference here. TODO: Move this somewhere else so it can be shared with code
const refUser = (db) => db.collection('users');

// Sample test
describe("Sample test", () => {
    it("user name can be set", async () => {
        const db = firebaseTestApp(null);
        await refUser(db).doc("huat").set({name:"huat"})

        const userRef = await db.collection("users").doc("huat").get()
        const userData = await userRef.data()

        assert.equal(userData.name, "huat");
    });
});