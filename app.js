const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItems')

Product.belongsTo(User,({constraints : true, onDelete : 'CASCADE'}));
User.hasMany(Product)
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through : CartItem});
Product.belongsToMany(Cart,{through : CartItem});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user => {
        req.user = user;

        next();
    })
    .catch(err =>  console.error(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync({force : true})
    .then(async ()=>{
        // console.log('server running at port 3000')
        // app.listen(3000);
        const data = await User.findByPk(1)
        return data
    })
    .then(user =>{
        if(!user){
            return User.create({name : 'Mudassir', email: 'mudassir@gmail.com'})
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        app.listen(3000)
    }) 
    .catch(err => console.error(err))


