import express from "express"
import mySql from "mysql"



import cors from "cors"



const app=express()
app.use(express.json())
app.use(cors())

let db

const initializeDB=()=>{
    db=mySql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"demoproject"
})

}

initializeDB()

// <=sqlite Query=>
// app.post("/adduser", async (request, response) => {
//     const { name, password } = request.body;
//     const hashedpassword=await bcrypt.hash(password, 15)
   

//    const selectQuery=`SELECT * FROM Logindata WHERE name=?`
//    db.query(selectQuery, [name], async(err, dbuser)=>{
//     if(err){
//         console.log(`select query error ${err.message}`)
//     }
//     if(!dbuser){
//     const insertQuery=`INSERT INTO Logindata (name, password) VALUES(?, ?)`
//     db.run(insertQuery, [name, hashedpassword], function(err){
//         if(err){
//             console.log(`inser query error ${err.message}`)
//         }
//             const lastId=`the user id :${this.lastID}`
//             response.send(lastId)
        
//         })
//     }else{
//         console.log("user already exists")
//     }
//    })
//    })



   
//    app.post("/login", async(req, res)=>{

//     const {name, password}=req.body
//     const selectQuery=`SELECT * FROM Logindata WHERE name=?`
//     db.get(selectQuery, [name], async(err, dbuser)=>{
//         if(err){
//             console.log(`select query error:${err.message}`)
//             res.send(err.message)
//         }
//         if(dbuser===undefined){
//             res.status(400);
//             res.send(`"Invalid user"`) 
//         }
//         else
//         {
//             const comparepassword=await bcrypt.compare(password, dbuser.password)
           
//             if(comparepassword===true){
//                 const payload={
//                     name:name
//                 }
//                 const jwtToken=  jwt.sign(payload, "my_secret_token")
                
//                 res.send({jwtToken})
               
//             }else{
//                 res.status(400)
//                 res.send(`"Incorrect password"`)
               
//             }
//         }
//     })
//    })

app.post("/adduser", async(request, response) => {
    const { name, id } = request.body;


    response.send({id:name})
    // try {
    //     const selectQuery = `SELECT * FROM userdetails WHERE name=?`;
        
    //     // Using Promise to handle the asynchronous nature of db.query()
    //     db.query(selectQuery, [name], (err, dbuser) => {
    //         if (err) {
    //             console.error(err);
    //             response.status(500).send("Internal Server Error");
    //             return;
    //         }
            
    //         // Check if dbuser is empty (user doesn't exist)
    //         if (dbuser.length === 0) {
    //             const insertQuery = `INSERT INTO userdetails (id, name) VALUES (?, ?)`;
    //             // Insert the new user
    //             db.query(insertQuery, [id, name], (err, result) => {
    //                 if (err) {
    //                     console.error(err);
    //                     response.status(500).send("Internal Server Error");
    //                     return;
    //                 }
    //                 const lastId = `the user id: ${result.insertId}`;
    //                 response.send(lastId);
    //             });
    //         } else {
    //             console.log("User already exists");
    //             response.status(409).send("User already exists");
    //         }
    //     });
    // } catch (err) {
    //     console.error(`Error: ${err.message}`);
    //     response.status(500).send("Internal Server Error");
    // }
});




   app.get("/" , async (req, res)=>{
    const updateQuery=`SELECT * FROM userdetails`
    db.query(updateQuery, (err, data)=>{
        if(err){
            console.log(`delete query error ${err.message}`)
        }else{
            res.send(data)
        }
    })
   
   })

   app.get("/user/:id", async(req, res)=>{
    const userid=req.params.id
    const updateQuery=`SELECT * FROM userdetails WHERE id=?`
    db.query(updateQuery, [userid], (err, data)=>{
        if(err){
            console.log(`delete query error ${err.message}`)
        }else{
            res.send(data)
        }
    })
   })

//  <=sqlite Query=>
//    app.put("/user/:id", async(req, res)=>{
//     const userid=req.params.id
//     const {name, password}=req.body
//     const updateQuery=`UPDATE Logindata SET name=?, password=? WHERE id=?`
//     db.run(updateQuery, [name, password, userid], (err)=>{
//         if(err){
//             console.log(`update query error ${err.message}`)
//         }else{
//             res.send("updated")
//         }
//     })
//    })


app.put("/user/:id", async (req, res)=>{
    const userid=req.params.id
    const {name}=req.body
    const updateQuery=`UPDATE userdetails SET name=? WHERE id=?`
    db.query(updateQuery, [name, userid], (err)=>{
        if(err){
            console.log(`update query error ${err.message}`)
        }else{
            res.send("updated")
        }
    })
   })


   app.delete("/user/:id", async(req, res) => {
    const userId = req.params.id;
    const deleteQuery = `DELETE FROM userdetails WHERE id=?`;

    db.query(deleteQuery, [userId], (err, result) => {
        if (err) {
            console.error(`Error deleting user: ${err.message}`);
            res.status(500).send("Internal Server Error");
            return;
        }
        
        if (result.affectedRows > 0) {
            res.send(`User with ID ${userId} deleted successfully`);
        } else {
            res.status(404).send(`User with ID ${userId} not found`);
        }
    });
});





app.listen(1000, ()=>{
    console.log("server is started in 1000")
})