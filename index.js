const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mysql = require('mysql2'); // Import mysql2

//Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rishabh10',
  database: 'library'
});


// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database with ID:', connection.threadId);
});

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/signup', (req,res) => {
    res.render('signup.ejs');
})
app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/signup', async (req, res) => {
  try {
    // Insert user into the database
    const user = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      phone_no: req.body.phone_no,
      password: req.body.password
    };
    
    console.log("user",user);
    console.log('{req.body.name} is id and {req.body.name} is name, {req.body.email} is email, {req.body.password} is password');
    const query = 'INSERT INTO users (id, name, email, phone_no, password) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [user.id,user.name, user.email, user.phone_no, user.password], (err, results) => {
      if (err) {
        console.error('Error inserting user into the database:', err.stack);
        res.redirect('/signup');
        return;
      }
      console.log('User registered successfully:');
      res.redirect('/login');
    });
  } catch (err) {
    console.error('Error hashing password:', err.stack);
    res.redirect('/register');
  }
});

// app.post('/signup', (req, res) => {
//   res.send('signup.ejs');
// });


app.listen(3000, (req,res) => {
    console.log("Server is running at port 3000");
})
