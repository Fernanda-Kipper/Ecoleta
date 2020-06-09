const express = require("express")
const server = express()


//pegar o banco de dados

const db = require("./database/db.js")

// configurando a pasta pública
server.use(express.static("public"))

//habilitar o uso deo req.body
server.use(express.urlencoded({extended: true}))

//utilizando template engine (deixando html smart)

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurando caminhos da minha aplicação
//página inicial
server.get("/", (req, res) => {
    return res.render("index.html")
})



server.get("/create_point", (req, res) => {
    // re.query: Query strings da nossa url, aquelas q ficam com varios simbolos
    // console.log(req.query)


    return res.render("create_point.html")
})

server.post("/save-point", (req, res) => {

   // req.body : O corpo do nosso formulário 

   //inserir dados no banco de dados
    const query = `
    INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);`

    const values =  [
        req.body.image,
        req.body.name, 
        req.body.address, 
        req.body.number,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    return res.render("create_point.html", {saved: true})
})


server.get("/search", (req, res) => {

    const city_search = req.query.search

    if(city_search == "")
    {
        //pesquisa vazia
        return res.render("search.html", {total:0})
    }
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${city_search}%'`, function(err, rows) { 
        if(err) {
            console.log(err)
        }

    const total = rows.length
    //mostrar a página html com os dados do banco de dados
    return res.render("search.html", {places : rows, total: total})
    })
})
//ligar o servidor
server.listen(3000)
