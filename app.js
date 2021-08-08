var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to Mongoose
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection;

app.get('/', (req, res) => {
    res.send('Please use either /api/books or /api/genres');
});

app.get('/api/genres', (req, res) => {
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

app.post('/api/genres', (req, res) => {
    var genre = req.body;
    Genre.addGenre(genre, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

app.get('/api/books', (req, res) => { 
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

app.get('/api/books/:_id', (req, res) => {
    Book.getBookById(req.params._id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});