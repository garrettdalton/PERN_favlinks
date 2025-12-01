const express = require('express')

const app = express()
//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const path = require('path')

const db = require('./queries')

const PORT = 9001

//host react app as static files
app.use(express.static(path.resolve(__dirname, '../PERN-API/favlinks/build/')))

//routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../PERN-API/favlinks/build/', 'index.html'))
})
//CRUD
//Create
app.post('/new', db.createLink)
//Read
app.get('/links', db.getLinks)
//Update
app.put('/links/:id', db.updateLink)
//Delete
app.delete('/links/:id', db.deleteLink)


//starting express
app.listen(PORT, ()=>{
    console.log(`The app is running on port ${PORT}.`)

})