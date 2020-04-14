const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

module.exports = server;

// readme

server.post("/api/accounts", (req, res) => {
    db("accounts")
    .insert({ name: req.body.name, budget: req.body.budget })
    .then(count => {
        console.log(count); 
        res.status(200).json({ message: `Successfully created! ID#${count}`}); 
    })
    .catch(error => {
        console.log(error); 
        res.status(500).json({ errorMessage: error }); 
    })
})

server.get("/api/accounts", (req, res) => {
    db
    .select('*')
    .from('accounts')
    .then(budget => {
        console.log(budget); 
        res.status(200).json({ data: budget }); 
    })
    .catch(error =>  {
        console.log(error); 
        res.status(500).json({ error: error.message });
    })
});

server.get("/api/accounts/:id", (req, res) => {
    db
    .select('*')
    .from("accounts")
    .where({ id: req.params.id })
    .then(account => {
        if(account.length > 0){
            console.log(account); 
            res.status(200).json({ account }); 
        } else {
            console.log("No record found!"); 
            res.status(404).json({ error: "No records found!" })
        }
        
    })
    .catch(error => {
        console.log(error); 
        res.status(404).json({ error }); 
    })
})

server.put("/api/accounts/:id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    .update({ name: req.body.name, budget: req.body.budget })
    .then(response => {
        if(response > 0){
            console.log(`Successfully updated! ${response}`); 
            res.status(200).json({ message: response })
        } else {
            console.log(`Record was not updated! It may not exist.`); 
            res.status(500).json({ errorMessage: `Record was not updated! It may not exist.` }); 
        }        
    })
    .catch(error => {
        console.log(`Error! ${error}`); 
        res.status(500).json({ errorMessage: error }); 
    })
})

server.delete("/api/accounts/:id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count){
            console.log(count, " record successfully deleted!"); 
            res.status(200).json({ messsage: `${count} record successfully deleted` }); 
        } else {
            console.log("Record not deleted!"); 
            res.status(500).json({ errorMessage: "Record not deleted!" })
        }
        
    })
})



server.post("/api/accounts", (req, res) => {
    console.log(req); 
    res.status(200).json({ req }); 
})

server.put("/api/accounts", (req, res) => {
    console.log(req); 
    res.status(200).json({ req }); 
})