const sql = require("sqlite3");
const fs = require("fs")
var filepath = '../sql/DTBS.db'

if (fs.existsSync(filepath)) {
    console.log("Filepath FOUND")
    var db = new sql.Database(filepath)
}else{
    console.log("Filepath NO FOUND")
    var db = new sql.Database(filepath, (err) => {
        if (err) {
            return console.error(err.message)
        }

    });
    console.log("Create Database")
    db.exec("create table User(id integer primary key autoincrement, name text, TpUser int);")
    console.log("Create table")
    db.run("Insert into User (name , TpUser) values ('admin', 1)", (err) => {
        if (err){
            console.error(err.message)
        }
        console.log("Admin Create")
    })
    console.log("SQLite Running")
}

module.exports = db