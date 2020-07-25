// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db


// utilizar o obj do banco de dados para nossas operaçoes

// db.serialize(() =>{
//     //criar tabela com comandos SQL
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values =[
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQDC-9JVygFVIoOKstiPXxiw60-yM5xxjWtKkm8G-sQiXKpcLY&usqp=CAU",
//         "Papersider",
//         "Guilherme Gemballa, Jardim America",
//         "Num 260",
//         "Santa Catarina",
//         "Rio do sul",
//         "Papéis e papelãop"
//     ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     //consultar os dados da tabela
//      db.all(`SELECT * FROM places`, function(err, rows){
//         if(err){
//             return console.log(err)
//         }
    
//         console.log("aqui estão seus registros")
//         console.log(rows)
//     }) 

    //Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
    //         if(err){
    //             return console.log(err)
    //         }
    //         console.log("registro deletado com sucesso")
    // }) 



// })