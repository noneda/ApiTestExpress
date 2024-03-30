const exp = require("express")
var app = exp()
var db = require("./sql")


//Get All Data FUsCK YOU
app.get(("/api/") , (req, res , nxt) => {
    var sql = "select * from User"
    var param = []

    db.all(sql,param, (err, rows) => {
        if (err){
            res.status(400).json({"error": err.message})
        }
        res.json(
                    rows
                )
    })
})
//Get One Data selected 
app.get(("/api/:a") , (req, res , nxt) => {
    var sql = "select * from User where id = "+ req.params.a
    var param = []

    db.all(sql,param, (err, rows) => {
        if (err){
            res.status(400).json({"error": err.message})
        }
        res.json({
            "id" : rows[0].id,
            "name": rows[0].name,
            "TpUser": rows[0].TpUser
        })
    })
})

//Todavia no se termina
app.post( "/api", (req, res, nxt ) => {
    let data = req.query.a; let date = req.query.b;var sql = "Insert into User (name, TpUser) values ('"+data+"', "+date+" );"
    console.log(sql)
    db.run(sql, (err) => {
        if (err) {
            res.status(400).json({"error": err.message})
        }
        res.json({
            "Message" : "Succesful"
        })
    })
})
//Error
app.delete("/api", (req, res, nxt) => {
    let data = req.query.a
    var sql = "Delete from User where id = "+data+";"; console.log(sql);
    db.run(sql, (err) => {
        if (err) {
           res.status(400).json({"error":err.message})
        }
        res.json({
            "Message" : "Succesful"
        })
    })
})
//Error
app.put( "/api", (req, res, nxt ) => {
    let data = req.query.a;let date = req.query.b;let dat = req.query.id
    var sql = "Update User set name='"+data+"', TpUser="+date+" where id ="+dat+";";console.log(sql);
    db.run(sql, (err) => {
        if (err) {
            res.status(400).json({"error": err.message})
        }
        res.json({
            "Message" : "Succesful"
        })
    })
})


module.exports = app 