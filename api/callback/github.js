const fetch=require('node-fetch');
require('dotenv').config();

export default async function handler(req,res){

    const code=req.query.code;
    const client_id_github=process.env.GITHUB_CLIENT_ID;
    const client_secret_github=process.env.GITHUB_CLIENT_SECRET;

    if(!code){
        return res.status(400).send("Authorization code is missing");
    }

    const tokenUrl="https://github.com/login/oauth/access_token";
    const data={
        client_id:client_id_github,
        client_secret:client_secret_github,
        code:code,
        redirect_uri:"https://youtube-github-authentication.vercel.app/api/callback/github"
    }

    fetch(tokenUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        body:new URLSearchParams(data).toString(),
    })
    .then(async (response) => {
        const contentType = response.headers.get("content-type");

        if (contentType.includes("application/json")) {
            return response.json();
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            const text = await response.text();
            return Object.fromEntries(new URLSearchParams(text));
        } else {
            throw new Error("Unexpected content type: " + contentType);
        }
    })
    .then((tokenData)=>{
        if (tokenData.error) {
            console.log(tokenData.access_token);
            return res.status(400).json({ error: tokenData.error });
        }
        const oauthToken = tokenData.access_token;

        res.redirect(`https://youtube-github-authentication.vercel.app/src/callback/callback_github?oauthToken=${oauthToken}`);
    })
    .catch((error) => {
        console.error('Error exchanging code for token:', error);
        res.status(500).send('Error exchanging code for token');
    });
}