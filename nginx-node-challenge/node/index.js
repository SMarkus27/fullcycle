const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const config = {
    host: "mysql",
    user: "root",
    password: "root",
    database: "nodedb"
}


const conn = mysql.createConnection(config)
conn.query("CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(ID));")
conn.query('INSERT INTO people(name) VALUES("Marcus")')
conn.end()


async function getPeople() {
    const mysql = require("mysql2/promise");

    try {
        const conn = await mysql.createConnection(config);
        const [data] = await conn.query("SELECT name FROM people");
        return data
    }
    catch (error) {
        throw error;
    }
}

app.get("/", async (req, res) => {


    const data = await getPeople();
    res.send(`<h1>Full Cycle Rocks</h1>
    <ul>${data.map(item => `<li>${item.name}</li>`).join("")}</ul>
`)
})


app.listen(port, () => {
    console.log("Server started on port: ", port);
})


// connection()
// createTable()
// createPeople()

