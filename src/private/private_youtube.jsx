import { useState, useEffect } from 'react';

function PrivateYoutube() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);

    useEffect(() => {
    const oauthToken = localStorage.getItem('oauthToken');
    if (oauthToken) {
        setIsLoggedIn(true);
        checkSubscription(oauthToken);
    }
    }, []);

    function checkSubscription(oauthToken) {
        fetch('https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&forChannelId=UCgIzTPYitha6idOdrr7M8sQ&mine=true', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${oauthToken}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.items && data.items.length > 0) {
                setSubscriptionStatus(true);
            } else {
                setSubscriptionStatus(false);
            }
        })
        .catch((error) => {
            console.error('Error while checking subscription: ', error);
            setSubscriptionStatus(false);
        });
    }

    if (!isLoggedIn) {
    return <div>Logging in...</div>;
    }

    return (
    <div>
        <h1>Private Page</h1>
        {subscriptionStatus === null && <p>Checking subscription status...</p>}
        {subscriptionStatus === true && <p>You are subscribed to the channel.</p>}
        {subscriptionStatus === false && <p>You are not subscribed to the channel.</p>}
    </div>
    );
}

export default PrivateYoutube;