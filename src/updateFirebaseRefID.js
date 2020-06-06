import dotenv from 'dotenv';
import firebase from 'firebase';
import { readLog, newLog, setLog } from './log';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.FIREBASE_PROJECT_ID
};

const updateFirebaseRefID = async (logFile) => {

  try {
    '[updateFirebaseRefID] ready to update doc.reference on firebase';
    const bunkoApp = firebase.initializeApp(firebaseConfig);
    const db = bunkoApp.firestore();
    ('[updateFirebaseRefID] firebase.initializeApp succeed');
    const targets = await readLog(logFile);
    if (!targets) return;
    if (targets.length <= 0) {
      console.log('[updateFirebaseRefID] No need to update');
      return null;
    } 
    console.log(
      `[updateFirebaseRefID] read log file [${logFile}.json] succeed, need update [${targets.length}] docs`
    );
    let refLogFileData = [];
    for (const [index, target] of targets.entries()) {
      console.log(`[updateFirebaseRefID] target (${index+1}/${targets.length})\tID:${target.oldID}`);
      const querySnapshot = await db
        .collection('docs')
        .where('reference', '==', `ghost://${target.oldID}`)
        .limit(1)
        .get();
      await querySnapshot.forEach(async function(doc) {
        console.log('[updateFirebaseRefID] target found\tID: ', doc.id);
        const washingtonRef = db.collection('docs').doc(doc.id);
        await washingtonRef.update({
          reference: `ghost://${target.newID}`
        });
        refLogFileData.push({
          id: doc.id,
          orgReference: doc.data().reference,
          newReference: `ghost://${target.newID}`,
        });
      });
    }
    if (refLogFileData.length > 0) {
      console.log('[updateFirebaseRefID] successfully updated! now logging ...' );
      const refLogFileName = newLog('ref');
      await setLog(refLogFileData, refLogFileName);
      console.log(`[updateFirebaseRefID] set log successfully! \t log name :[${refLogFileName}.json]`);
    } else {
      console.log('[updateFirebaseRefID] no updated' );
    }
    console.log('[updateFirebaseRefID] END');
    process.exit();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = updateFirebaseRefID;
