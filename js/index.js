var app = require('./server') 
var HTTP_PORT = 5050

app.listen(HTTP_PORT, () => {
    console.log("Server running in Port = " +HTTP_PORT)
})
