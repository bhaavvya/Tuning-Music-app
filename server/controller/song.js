
const Song = require("../models/song.js")
const createsong = async (req,res)=>{
    const {title,artist,language,album,imgUrl , songsUrl} = req.body;
    if(!imgUrl || !songsUrl){
        res.status(400);
        throw new Error("img url & song url fields are required ")
    }
    try {
        const song = await Song.create({
            title,
            artist,
            language,
            album,
            imgUrl,
            songsUrl
           
        })
        res.status(201).json({
            success:true,
            song,
        })
        
    } catch (error) {
        console.log(error)
        res.status(400)
        throw error;
    }
}
module.exports = createsong