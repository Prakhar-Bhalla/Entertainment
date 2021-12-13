const connect = require("./config/db");

const app = require(".");

app.listen(2700, async() => {
    console.log("listening port 2700");
    await connect();
})