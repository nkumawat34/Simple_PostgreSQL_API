require('dotenv').config(); // Load environment variables
const {Client}=require('pg')
const express=require('express')

const app=express()

app.use(express.json())

const con=new Client({
    host:process.env.HOST,
    user:process.env.USER,
    port:process.env.DATABASE_PORT,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

con.connect().then(()=>{
    console.log("Connected Database")
})

app.post('/postdata',(req,res)=>{


    const {name,id}=req.body

    const insert_query='INSERT INTO demotable (name,id) VALUES ($1,$2)'

    con.query(insert_query,[name,id],(err,result)=>{

        if(err)
                {
                    res.send(err)
                }
                else
                {
                    console.log(result)
                    res.send("POSTED DATA")
                }
    })
})

app.get('/fetchdata',(req,res)=>{

    const fecth_query="select * from demotable"
    con.query(fecth_query,(err,result)=>{

        if(err)
                {
                    res.send(err)
                }
                else
                {
                    res.send(result.rows)
                }
    })
})

app.get('/fetchbyid/:id',(req,res)=>{

    const {id}=req.params
    const fetch_query="Select * from demotable where id = $1"
    con.query(fetch_query,[id],(err,result)=>{

        if(err)
                res.send(err)
        else
        {
            res.send(result.rows)
        }    
    })

})

app.put('/update/:id',(req,res)=>{

    const {id}=req.params
    const {name}=req.body

    const update_query="update demotable set name = $1 where id = $2" 
    con.query(update_query,[name,id],(err,result)=>{

        if(err)
                res.send(err)
        else
        {
            res.send("Updated ")
        }    
    })

})

app.delete('/delete/:id',(req,res)=>{

    const {id}=req.params
     const delete_query="delete from demotable where id = $1"
     con.query(delete_query,[id],(err,result)=>{

        if(err)
                res.send(err)
        else
            res.send("Deleted")    
     })
})

app.listen(process.env.SERVER_PORT,()=>{

    console.log("Server is running.......")
})