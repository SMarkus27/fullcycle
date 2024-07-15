const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const config = {
    host: "mysql",
    user: "root",
    password: "root",
    database: "nodedb"
}


async function connection() {
    try {
        const connection = await mysql.createConnection(config)
        return connection;
    }
    catch (error) {
        throw error;
    }
}

async function createTable() {
    try {
        const conn = await connection();
        conn.query("CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(ID))")
    }
    catch (error) {
        throw error;
    }
}

async function createPeople() {
    try {
        const conn = await connection();
        conn.query('INSERT INTO people(name) VALUES("Marcus")')
    }
    catch (error) {
        throw error;
    }
}

async function getPeople() {
    try {
        const conn = await connection();
        const [data] = await conn.query("SELECT name FROM people");
        return data
    }
    catch (error) {
        throw error;
    }
}
app.get("/", async (req, res) => {
    await createTable();
    await createPeople();

    const data = await getPeople();
    data.map(item => {
        console.log(item.name)})
    res.send(`<h1>Full Cycle Rocks</h1>
    <ul>${data.map(item => `<li>${item.name}</li>`).join("")}</ul>
`)
})


app.listen(port, () => {
    console.log("Server started on port: ", port);
})