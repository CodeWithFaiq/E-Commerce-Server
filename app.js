const { json } = require('body-parser');
const express=require('express');
const mongoose=require('mongoose');
const userApiRouter=require('./Routes/api/users');
const userAuth=require('./Routes/userAuth');
const session=require('express-session')
const config=require('config');
const cookie=require('cookie-parser')
const expressLayout=require('express-ejs-layouts')
const serverAuth=require('./Routes/userServerAuth');
const productRouter=require('./Routes/products');
const categoryApiRouter=require('./Routes/api/categories')
const categoryRouter=require('./Routes/category')
const reviewsRouter=require('./Routes/api/reviews');
const productApiRouter=require('./Routes/api/products');
const ratingRouter=require('./Routes/api/rating');
const orderApiRouter=require('./Routes/api/orders')
const SearchRouter=require('./Routes/Search')
const paymentApiRouter=require('./Routes/api/payments')


const cors=require('cors')

const app=express();


app.use(json());
app.use(express.urlencoded({extended:false}));
app.use(cookie());
app.use(cors());
app.use(express.static('Public'))
app.use(session({
    saveUninitialized:false,
    secret:config.get('SessionSecret'),
    cookie:{maxAge:90000000},
    resave:false
}));
app.set('view engine','ejs');
app.use((req,res,next)=>{
res.locals.user=req.session.user;
next();
})
app.use(expressLayout);
app.use('/', serverAuth);


app.get('/',(req,res)=>{
    res.render('Home');
})
app.use('/api/users',userApiRouter);
app.use('/user',userAuth);
app.use('/products',productRouter);
app.use('/api/categories',categoryApiRouter);
app.use('/category',categoryRouter);
app.use('/api/products',productApiRouter);
app.use('/api/reviews',reviewsRouter);
app.use('/api/ratings',ratingRouter)
app.use('/api/orders',orderApiRouter);
app.use('/Search',SearchRouter);
app.use('/api/payments',paymentApiRouter);






mongoose.set('strictQuery',false).connect('mongodb://127.0.0.1/E-Commerce').then(()=>{
    console.log('Successfully Connected to Mongoose');
}).catch((e)=>{
    console.log(e);
})



app.listen(5000);