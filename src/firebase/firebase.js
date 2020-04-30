import app from "firebase/app"
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

class firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.app = app;
        this.auth = app.auth();
        this.db = app.firestore();
    }
}

const firebase = new firebase();
export default firebase;