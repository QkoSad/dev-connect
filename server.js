const express = require('express');
const connectDB= require('./config/db')
<<<<<<< HEAD
=======
const path = require('path')
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
const app = express();

connectDB();

app.use(express.json({extended:false}));
<<<<<<< HEAD
app.get('/',(req,res)=> res.send('API Running'));
=======
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb

app.use('/api/users', require('./routers/api/users'))
app.use('/api/auth', require('./routers/api/auth'))
app.use('/api/profile', require('./routers/api/profile'))
app.use('/api/posts', require('./routers/api/posts'))
<<<<<<< HEAD
=======
// Serve static assets in production
if (process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req, res)=>[
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
    ])
}
>>>>>>> cc38df43629d64ca77f694c971a13a026b3afcfb
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));