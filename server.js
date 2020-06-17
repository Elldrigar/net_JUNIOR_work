const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

//SERVE STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
   //SET STATIC FOLDER
   app.use(express.static('client/build'));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
