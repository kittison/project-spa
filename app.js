
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', express.static(path.join(__dirname, 'public')))
app.use('/emp', express.static(path.join(__dirname, 'public')))
app.use('/customer', express.static(path.join(__dirname, 'public')))
app.use('/services', express.static(path.join(__dirname, 'public')))
app.use('/webhook', express.static(path.join(__dirname, 'public')))


app.use("/axios",express.static('node_modules/axios/dist'));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))

const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const empRoutes = require('./routes/emp');
const customerRoutes = require('./routes/customer');
const webhookRoutes = require('./routes/webhook');
const serviceRoutes = require('./routes/service');


app.use('/admin',adminRoutes);
app.use('/emp',empRoutes);
app.use('/',customerRoutes);
app.use('/login',loginRoutes);
app.use('/customer',customerRoutes);
app.use('/webhook',webhookRoutes);
app.use('/services',serviceRoutes);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A client connected');

    // Example: Handle chat message event
    socket.on('pre_vip', (data) => {
        // console.log('Message received:', data);
        // Broadcast the message to all connected clients
        if (data.id){
            io.emit(`pre_vip_${data.id}`, data);
        }
    });

    // Other event handlers...
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// app.listen(3000);