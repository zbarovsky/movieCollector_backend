require('dotenv'),config();
const Express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const db = require('./models');
const isLoggedIn = require('./middleware/isLoggedIn');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const methodOverride = require('method-override');

// App Setup
const app = Express();
app.use(Express.urlencoded({extended: false}));
app.use(Express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());
app.use(methodOverride('_method'));

// create new instance of sequelizeStore
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 120
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

// initialize and link flash messages and passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.use;

    next()
})

// ROUTES
app.get('/', function(req, res){
    res.render('index')
})

// Routes (Controllers)
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/lists', require('./routes/lists'));
app.use('/movies', require('./routes/movies'));


app.listen(process.env.PORT || 3000, function() {
    console.log('With my toes on port ${process.env.PORT}, its such a lovely view')
})