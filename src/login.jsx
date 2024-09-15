
function Login(){
    function googleLogin(){
        window.location.href="https://accounts.google.com/o/oauth2/auth?client_id=729323296910-9o00iiu7jsmmdqhffrsrluifa6fc6ias.apps.googleusercontent.com&redirect_uri=http://localhost:5000/callback&scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code";
    }

    function githubLogin(){
        window.location.href="https://github.com/login/oauth/authorize?client_id=Ov23li2EL1x3HzTvFS7y&redirect_uri=http://localhost:5000/callback/github&scope=read:user";
    }

    return (
        <div>
          <h1>Login to Access the Private Page</h1>
          <button onClick={googleLogin}>Login with Google</button>
          <button onClick={githubLogin}>Login with Github</button>
        </div>
    )
}

export default Login;