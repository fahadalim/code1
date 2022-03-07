const express = require('express');

const app = express();

app.use(logger);

app.get("/books",(req,res)=>{
    return res.send({ route: "/books"})

});

app.use(checkPermission);

app.get("/libraries",checkPermission("librarian"),(req,res)=>{
    return res.send({ route: "/libraries", permission: true})
});

app.get("/authors",checkPermission("author"),(req,res)=>{
    return res.send({ route: "/authors", permission: true})
});


function logger(req,res,next){
    next();
}

function checkPermission(librarian){
    return function logger(req,res,next){
        if(req.path === "/libraries")
        {
            req.permission=true
            return next()
        }
    }
}
function checkPermission(author){
    return function logger(req,res,next){
        if(req.path === "/authors")
        {
            req.permission=true
            return next()
        }
    }
}

app.listen(5000,()=>{
    console.log("listening")
})