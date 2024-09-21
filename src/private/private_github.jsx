import { useState, useEffect } from 'react';

function PrivateGithub() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username,setUsername]=useState("");
    const [followingStatus, setFollowingStatus] = useState(null);

    useEffect(() => {
    const oauthToken = localStorage.getItem('oauthToken');
    if (oauthToken) {
        setIsLoggedIn(true);
        checkUsername(oauthToken);
    }
    }, []);

    useEffect(() => {
        if (username) {
            const oauthToken = localStorage.getItem('oauthToken');
            if (oauthToken) {
                checkFollowing(oauthToken, username);
            }
        }
    }, [username]);

    function checkFollowing(oauthToken,username) {
        fetch(`https://api.github.com/users/${username}/following/bytemait`, {
            method: 'GET',
            headers: {
            Accept:"application/vnd.github+json",
            Authorization: `Bearer ${oauthToken}`,
            },
        })
        .then((data) => {
            if(data.status==204){
                setFollowingStatus(true);
            }
            else{
                setFollowingStatus(false);
            }
        })
        .catch((error) => {
            console.error('Error while checking subscription: ', error);
            setFollowingStatus(false);
        });
    }

    function checkUsername(oauthToken){
        fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(userData => {
            setUsername(userData.login);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }

    function showAlert(){
        alert("Reload the page after following");
    }

    if (!isLoggedIn) {
    return <div>Logging in...</div>;
    }

    return (
    <div>
        <h1>Private Page</h1>
        {followingStatus === null && <p>Checking following status...</p>}
        {followingStatus === true && <p>You are following the account.</p>}
        {followingStatus === false && <><p>You are not following the account.</p><a href="https://github.com/bytemait" onClick={showAlert}>Follow here</a></>}
    </div>
    );
}

export default PrivateGithub;