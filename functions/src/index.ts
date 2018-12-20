import * as functions from 'firebase-functions';
import { isArray, isNumber } from 'util';

//Sample BioMetric JSON
const sampleBioData = {
  userID: 6243819361,
  metrics: {
    hr: [89, 72, 77, 75,78],
    gsr: [100, 102, 105, 109, 88],
    temp: [36, 37, 37, 36, 37]
  },
  time: 5
};

//Sample ML JSON
const sampleMLData = {
  snapshot: [[],[],[]]
};

interface Metrics{
  hr: Array<number>;
  gsr: Array<number>;
  temp: Array<number>;
}

interface BioData {
  userid: number;
  metrics: Metrics;
  time:number
}

interface Response{
  code: number;
  body: any
}

interface dbBioData {
  metrics: Metrics;
  time: number;
}

//Initialize firestore
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

//Add cloud functions here

/*  This function is called with the **biometric** data JSON as an argument.
*   This data will be stored on the MIST database.
*/
export const onBioStore = functions.https.onRequest((req, res) => {
  let data: BioData = req.body;
  if(data === null){
    res.send({
      code: 401,
      body: 'No valid data'
    });
  }
  else{
    if(checkValidData(data)){
      let doc = db.collection('biometrics').doc(data.userid);
      doc.get()
        .then((dbdoc) => {
          if(!dbdoc.exists){
            doc.set({metrics: data.metrics, time: data.time});
            res.send({
              code: 200,
              body: "Success! Created new data!"
            });
          }
          else{
            doc.update({metrics: data.metrics, time: data.time});
            res.send({
              code: 201,
              body: "Success! Updated data!"
            });
          }
        })
        .catch((err) => {
          console.log("\nError occurred: " + err)
          res.send({
            code: 402,
            body: err
          });
        });
    }
    else{
      res.send({
        code: 403,
        body: "Invalid data!"
      });
    }
  }
});

/*  This function is called with the **ML snapshot** in JSON format as an
*   argument. This data will be stored on the MIST database.
*/
export const onMLStore = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to retrieve
*   **biometric** data for that user.
*/
export const onBioGet = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to retrieve
*   **ML snapshot** data for that user.
*/
export const onMLGet = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to delete a user's
*   **biometric** data from the MIST database.
*/
export const onBioDelete = functions.https.onRequest((req, res) => {

});

/*  This function is called with a unique 10-digit userID to delete a user's
*   **ML snapshot** data from the MIST database.
*/
export const onMLDelete = functions.https.onRequest((req, res) => {

});

//  Helpers

//  Checks if BioMetric data is in a valid JSON format
const checkValidData = (data: BioData): boolean => {
  if(isNumber(data.userid)){
    if(isNumber(data.time)){
      let metrics = data.metrics;
      if(isArray(metrics.gsr)){
        if(isArray(metrics.temp)){
          if(isArray(metrics.hr)){
            return true;
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
};