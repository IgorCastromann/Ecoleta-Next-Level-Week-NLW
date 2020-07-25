//lembrar de sempre dar Ctrl + C (para cancelar as coisas pra instalar)
// ctrl + L
// sempre usar npm
// npm start


const express = require("express")
const server = express()


//pegar o banco de dados
const db = require("./database/db")

// configurar pasta publica (public)
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))


// utiizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
// configurar caminhos da minha apicação
//página inicial
// req: requisição
// res: resposta
server.get("/", (req, res) =>{
   return res.render("index.html", { title:"Wilber"})
    
})

server.get("/create-point", (req, res) =>{
   //req.query: query strings da nossa url
   // console.log(req.query)


   return res.render("create-point.html",)
    
})

//O ERRO ESTA AQUI-------------------------------------------------------------------------------------------------------------
server.post("/savepoint", (req, res) =>{
   //req.body: o corpo do nosso form
  //inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values =[
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
         
            return res.render("create-point.html", {error: true})
        }
        console.log("cadastrado com sucesso")
        console.log(this)

         // console.log(req.body)
         return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)



  
})

server.get("/search", (req, res) =>{

   const search = req.query.search

   if(search == ""){
      //pesquisa vazia
       return res.render("search-results.html", { total: 0})




        }

        //     if (search.includes('all'){
        //     db.all(`SELECT * FROM places`, function(err, rows){
        //         if(err){
        //             return console.log(err)
        //         }
    
        //         const total = rows.length
    
        //         //mostrar a pagina html com os dados do banco de dados
        //         return res.render("search-results.html", {places: rows, total: total})
        //          }) 
            
        // })
   //pegar os dados do banco de dados
   db.all(`SELECT * FROM places WHERE city LIKE  '%${search}%'`, function(err, rows){
              if(err){
                  return console.log(err)
              }
          
              const total = rows.length

              //mostrar a pagina html com os dados do banco de dados
              return res.render("search-results.html", {places: rows, total: total})
          })  
        
  
     
 })


//ligar o servidor
server.listen(3000)