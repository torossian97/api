# UBC MIST Biometric data API

**This software is under development and is not functional at the moment.**
**To contribute, you must follow these steps**

- Clone this repository
- Install npm and Node.js. Instructions are [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- On command line/terminal, navigate into the root directory of this repository and type `npm install -g`
- Various scripts have been added to package.json and can be run directly for building, running tests, etc.
- More on this soon.

# Current description/skeleton

- Firstly, a seperate file must be made which includes the SQL database login credentials and the script to
log into the database and start a session. It must be called on by the main file. Maybe include session start/stop
methods in a class in that connection file. It will make calling on it easy from the main file. Then, I think the
first functions we want to create is GET and SET. They don't have to be called that, but essentially this is what
each of them should do:

- GET: Get a desired piece of data from the SQL database. The parameters it should take are flexible, but the first
thing I am thinking of is (TABLE_NAME, ROW_NAME(optional), COLUMN_NAME(optional)). This should return a JSON opbject
with all the information that should be parseble to the app.

- SET: Sets the data into the database through parameters such as (TABLE_NAME, JSON), where the JSON is generated by
the app. I'm not sure whether or not SQL can take raw JSON and convert it on it's own, but that is something to look
into. If not, I suppose the API will also have to parse the JSON and send individual queries for each row to the DB.

This should summarize the skeleton of the API, feel free to add to it.
