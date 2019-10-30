const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient


const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-app'


MongoClient.connect(connectionUrl, { useNewUrlParser: true ,useUnifiedTopology: true}, (error,client) => {
    if (error) {
        return console.log("Error occured while connecting!");
    }
    
    const db = client.db(databaseName)
    // db.collection("tasks").find({completed: false}).toArray((error,tasks)=>{
    //     console.log(tasks);
        
    // });
    db.collection("tasks").findOne({completed: true}, (error,task) => {
        console.log(task)  
    })

    
})



// MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
//     if (error) {
//        return console.log("An error occured while connecting to mongoDb")
//     }
//         const db = client.db(databaseName)
//         db.collection('users').insertOne({
//             name: 'Mutluhan',
//             age: 20 
//         }, (error, result) =>{
//             if (error) {
//                 return console.log("Unable to insert user");
//             }

//             console.log(result.ops);
            
//         })
        
       
// })


// MongoClient.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true},(error, client) =>{
//     if (error) {
//         return console.log("An error occured while trying to connect database !");
//     }
//     console.log("Connection successfully established.");
//     const db = client.db(databaseName);


//     // db.collection('tasks').insertMany([
//     //     {
//     //         description:'Clean the house',
//     //         completed: true
//     //     },{
//     //         description: 'Water the plants',
//     //         completed: false
//     //     },{
//     //         description: 'wash the dishes',
//     //         completed: true
//     //     }
//     // ], (error, result)=>{
//     //     if (error) {
//     //         return console.log("An error occured during insertion");
//     //     }
//     //     console.log(result.ops);
        
//     // })

// })


