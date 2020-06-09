// importanto a dependência do SQLITE3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto de banco de dados, que irá fazer operações
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizando o objeto db, para nossas ops
//db.serialize(() => {
    //criando tabela com comandos sql
    //db.run(`
        //CREATE TABLE IF NOT EXISTS places(
            //id INTEGER PRIMARY KEY AUTOINCREMENT,
            //image TEXT,
            //name TEXT,
            //address TEXT,
            //address2 TEXT,
            //state TEXT,
            //city TEXT,
            //items TEXT
        //);
    // `)
    // //inserir dados
    // const query = `
    // INSERT INTO places(
    //     image,
    //     name,
    //     address,
    //     address2,
    //     state,
    //     city,
    //     items
    // ) VALUES (?,?,?,?,?,?,?);`

    // const values =  ["https://lh3.https://comofazeremcasa.net/wp-content/uploads/2018/11/22-ideias-de-brinquedo-de-papel-reciclado.jpg.com/HOnppISRn2zCbaePkXR2ynOQM26kyz8GgtGAjV2gjHHqECtlTHzgSiQK6_D9rniYtMbFbKLJWuHb31Y1-qviPKPwh6U=s9999",
    // "Paperside",
    // "Rua do gramal",
    // "569",
    // "Santa Catarina",
    // "Florianópolis",
    // "Papeis e Papelões"]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    // //db.run(query, values, afterInsertData)

    // //consultar dados
    // // * = all
    // db.all(`SELECT * FROM places`, function(err, rows) { 
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    //deletando dados

    db.run(`DELETE FROM places WHERE id = ?`, [14], function(err) {
       if(err) {
            return console.log(err)
         }
        console.log("Registro deletado com sucesso")
     })
//})