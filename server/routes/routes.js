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

// Searching for songs
router.get('/search/:query',(req,res) => {
        const regex = new RegExp(escapeRegex(req.params.query), 'gi');
        Songs.find({$or:[{title: regex}, {artist: regex}]}, (err,result)=>{
            if(err){ console.log(err)}
            else{ res.json(result)}
        })
});

//short listed songs
router.get('/shortList', (req, res) => {
  Songs.find({'checked': 1}, (err, songs) => {
    err ? console.log('error '+err) : res.json({songs})});
});

//Create new song to DB
router.post('/song',(req, res) => {
  const { title, embed, pdf, artist, category } = req.body,
    success = {message:'Success'},
    duplicate = {message: 'Duplicate'};

    Songs.findOne({
        'title': { $regex: new RegExp("^" + title.toLowerCase(), "i")},
        'artist': { $regex: new RegExp("^" + artist.toLowerCase(), "i")}
    }).exec((err, resp)=>
        {
                console.log('b4Error')
            if(resp === null){
                const newembed = embed.split('=');
                Songs.create({ title, embed:newembed[1], pdf, artist, category }, (err) => res.json(success))
            }else if(resp !=null){
                console.log('tae '+ resp)
                res.json(duplicate)
            }
        }
    );
});

//Search for songs
router.post('/song-search',(req, res) => {
    const title = { $regex: new RegExp("^" + req.body.title.toLowerCase(), "i")};

    Songs.find({
        'title': title
    }).exec((err, resp)=>{
        res.json(resp)
    })
})

//Shortlisting Songs
router.put('/song-shortlist/:id/:checked',(req, res) => {
    
    Songs.findByIdAndUpdate(req.params.id, { checked: req.params.checked },
    { new: true },
    
    (err, newSongList) => res.json(newSongList)
  );
})

escapeRegex = (query) => query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");

module.exports = router;