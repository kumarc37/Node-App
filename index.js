const express = require('express');
var bodyParser = require('body-parser');  
let db=[{
        id:1,
        title:'Book 1',
        author:'Dilli'
    },
    {
        id:2,
        title:'Book 2',
        author:'Vikram'
    },
    {
        id:3,
        title:'Book 3',
        author:'Rolex'
    }
]

const app = express()

app.use(
    express.urlencoded({
      extended: true,
    })
  );
  
app.use(express.json());

//app.use(bodyParser.urlencoded({extended:true}))
app.get('/books',(req,res)=>{
    res.json(db)
})
app.post('/books/',(req,res)=>{
    console.log(req.body)
    db.push(req.body);
    res.send('Book added to db successfully'+req.body)
})
app.get('/books/:id',(req,res)=>{
    if(req.params.id){
        const result = db.filter(book=>book.id===(+req.params.id))
        if(result.length>0)
            res.json(result)
        else
            res.send("Book didn't found with the given id");
    }else{
        res.send("Book didn't found with the given id");
    }
})
app.put('/books/:id',(req,res)=>{
    if(req.params.id){
        try{
            const result = db.filter(book=>book.id===(+req.params.id))
            if(result.length>0)
            {
                const results= db.map(book=>{
                    if(book.id===(+req.params.id))
                    {
                        return {...book,...req.body}
                    }
                    else
                        return book;
                });
                db = results;
                res.send(`Book with ${req.params.id} updated successfully...`)
            }
            else
                res.send("Book didn't found with the given id");
        }
        catch(err){
            res.json({
                message:err.message
            })
        }
    }
})

app.delete('/books/:id',(req,res)=>{
    if(req.params.id){
        const result = db.filter(book=>book.id===(+req.params.id))
        if(result.length>0)
        {
            const results = db.filter(book=>book.id!==(+req.params.id))
            db = results;
            res.json({
                status:'Success',
                message:'Book Deleted Successfully...'
            })
        }
        else
            res.send("Book didn't found with the given id");
    }
})

app.listen(8000,()=>{
    console.log('server listening on port 8000')
})