// connect to postgres using the node-postgres package

const POOL = require('pg').Pool

const pool = new POOL({
    user:'garrett',
    host: 'localhost',
    database: 'favlinks',
    password: 'pw',
    port: 5432
})

//create all the functions that will be our request handlers in our express server



// CRUD
//CREATE
const createLink = (request, response) =>{
    // take the data the user passes us and insert it into our table
    const name = request.body.name
    const URL = request.body.URL

    pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING id',
         [name, URL],
         (error, results) => {
            if(error){
                throw error
         }
         response.status(201).send(`Link added with ID: ${results.rows[0].id}`)
    })
}

//READ
const getLinks = (req, res) => {
    //get back all the data currently in the database
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
}

//UPDATE
const updateLink = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, URL } = request.body

    pool.query(
        'UPDATE links SET name = $1, url = $2 WHERE id = $3',
        [name, URL, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Link modified with ID: ${id}`)
        }
    )
}

//DELETE
const deleteLink = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Link deleted with ID: ${id}`)
    })
}



module.exports = {
    getLinks,
    createLink,
    updateLink,
    deleteLink
}