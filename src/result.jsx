import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

function Result(){
    const navigate=useNavigate();
    const location=useLocation();
    const {followingStatus}=location.state||{};

    function navHome(){
        navigate("/");
    }

    useEffect(() => {
        if (!followingStatus) {
            navigate("/");
        }
    }, [followingStatus, navigate]);

    return(
        <div id="resultDiv">
            <p id="result">Thanks for following byte!</p>
            <button id="resultBtn" onClick={navHome}>Home Page</button>
        </div>
    )
}

export default Result;