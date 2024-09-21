import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

function Result(){
    const navigate=useNavigate();
    const location=useLocation();
    const {followingStatus}=location.state||{};

    useEffect(() => {
        if (!followingStatus) {
            navigate("/");
        }
    }, [followingStatus, navigate]);

    return(
        <p id="result">Thanks for following byte!</p>
    )
}

export default Result;