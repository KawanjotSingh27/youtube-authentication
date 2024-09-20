import './styles/login.css'

function Login(){

    const youtubeclientId=import.meta.env.VITE_YOUTUBE_CLIENT_ID
    const githubclientId = import.meta.env.VITE_GITHUB_CLIENT_ID

    function googleLogin(){
        window.location.href=`https://accounts.google.com/o/oauth2/auth?client_id=${youtubeclientId}&redirect_uri=http://localhost:5000/callback/youtube&scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code`;
    }

    function githubLogin(){
        window.location.href=`https://github.com/login/oauth/authorize?client_id=${githubclientId}y&redirect_uri=https://youtube-github-authentication-backend.onrender.com/callback/github&scope=read:user`;
    }

    return (
        <div id="main">
          <p>Login to Access the Private Page</p>
          <div id="buttons">
            <button id="youtube" onClick={googleLogin}>Login with Google</button>
            <button id="github" onClick={githubLogin}>Login with Github</button>
          </div>
        </div>
    )
}

export default Login;