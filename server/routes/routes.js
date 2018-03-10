const express = require('express');
const router = express.Router();
const Songs = require('../models/songs');

//Set Homepage
router.get('/', (req, res) => res.redirect('/songs'));

//get songs from DB
router.get('/songs', (req, res) => {
  Songs.find({}, (err, songs) => {
    err ? console.log('error '+err) : res.json({songs})});
});

//Create new song to DB
router.post('/song',(req, res) => {
  const { title, embed, pdf, artist } = req.body,
    success = {message:'Success'},
    duplicate = {message: 'Duplicate'};

    Songs.findOne({
        'title': { $regex: new RegExp("^" + title.toLowerCase(), "i")},
        'artist': { $regex: new RegExp("^" + artist.toLowerCase(), "i")}
    }).exec((err, resp)=>
        {
            if(resp === null){
                Songs.create({ title, embed, pdf, artist }, (err) => res.json(success))
            }else if(resp !=null){
                console.log('tae '+ resp)
                res.json(duplicate)
            }
        }
    );

    
  
});

module.exports = router;