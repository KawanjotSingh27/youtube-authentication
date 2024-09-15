import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CallbackGithub() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('oauthToken');

    if (oauthToken) {
        localStorage.setItem('oauthToken', oauthToken);
        setTimeout(()=>{
            navigate("/private/private_github");
        },1)
    } 
    else {
        console.error('Oauth token error');
    }
  },[]);

  return <div>Wait for Authentication...</div>;
}

export default CallbackGithub;