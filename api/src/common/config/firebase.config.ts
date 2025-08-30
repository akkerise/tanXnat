import firebaseAdmin from 'firebase-admin';
import * as path from 'path';

const serviceAccount = require(
  path.join(__dirname, '../../../serviceAccountKey.json'),
);
const res = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  // databaseURL:
  //   process.env.FIREBASE_DATABASE_URL ||
  //   'https://lotushrm-544e5-default-rtdb.firebaseio.com',
});
const firebaseMessaging = res.messaging();
export const firebaseAuth = res.auth();
export default firebaseMessaging;
