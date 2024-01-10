const express = require("express");
const app = express();
const port = 3002;

const morgan = require("morgan")
app.use(morgan("combined"))

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors())

app.listen(port, () => {
    console.log(`My server listening in port ${port}`)
})
app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB")
})

const { MongoClient, ObjectId } = require('mongodb');

client = new MongoClient("mongodb+srv://Truc:862003@penzesilver.cue4fcs.mongodb.net/");
client.connect();

function getAPI(db_, collection_) {
    app.get("/" + collection_, cors(), async (req, res) => {
        const result = await client.db(db_).collection(collection_).find({}).toArray();
        res.send(result);
    })
}

function postAPI(db_, collection_) {
    app.post("/" + collection_, cors(), async (req, res) => {
        await client.db(db_).collection(collection_).insertOne(req.body);
        res.send(req.body)
    })
}

// function getAPI_detailProduct(db_, collection_, _id) {
//     app.get(`/${collection_}/${_id}`, cors(), async (req, res) => {
//         o_id = new ObjectId(_id);
//         const result = await client.db(db_).collection(collection_).find({ _id: o_id }).toArray();
//         res.send(result[0])
//     })
// }

function getAPI_detailUser(db_, collection_, query_) {
    app.get(`/${(collection_).toLowerCase()}/:${query_}`, cors(), async (req, res) => {
        var tg = req.params[query_];
        const result = await client.db(db_).collection(collection_).find({ email: tg }).toArray();
        res.send(result);
    })
}
// customer_Collection = client.db("Users").collection("Customers");
// app.get("/customers/:email", cors(), async (req, res) => {
//     var mail = req.params["email"];
//     const result = await customer_Collection.find({ email: mail }).toArray();
//     res.send(result)
// })

getAPI("Products", "outstanding_products");
getAPI("Products", "newest_products");
getAPI("Products", "bestseller_products");
getAPI("Products", "bepretty");
getAPI("Products", "tet-products");
getAPI("CONTACT", "contactdata")
getAPI("Products", "nhan");
getAPI("Products", "daychuyen");
getAPI("Products", "bongtai");
getAPI("Products", "vongtay");
getAPI("Users", "Customers")
postAPI("CONTACT", "contactdata")
postAPI("Users", "Customers")
getAPI_detailUser("Users", "Customers", "email");
