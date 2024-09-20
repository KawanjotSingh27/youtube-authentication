const fetch=require('node-fetch');
require("dotenv").config();

export default async function handler(req,res){

    const code=req.query.code;
    const client_id_youtube=process.env.YOUTUBE_CLIENT_ID;
    const client_secret_youtube=process.env.YOUTUBE_CLIENT_SECRET;

    if(!code){
        return res.status(400).send("Authorization code is missing");
    }

    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const data = {
        client_id: client_id_youtube,
        client_secret: client_secret_youtube,
        redirect_uri: 'http://localhost:5000/callback/youtube',
        grant_type: 'authorization_code',
        code: code,
    };

    fetch(tokenUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
        },
        body: new URLSearchParams(data).toString(),
    })
    .then((response) => response.json())
    .then((tokenData) => {
        if (tokenData.error) {
            return res.status(400).json({ error: tokenData.error });
        }

        const oauthToken = tokenData.access_token;

        res.redirect(`http://localhost:5173/callback/callback_youtube?oauthToken=${oauthToken}`);
        })
    .catch((error) => {
        console.error('Error exchanging code for token:', error);
        res.status(500).send('Error exchanging code for token');
        });
    
}