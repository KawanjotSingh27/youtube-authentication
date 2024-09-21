import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Result(){
    const navigate=useNavigate();
    const location=useLocation();
    const {followingStatus}=location.state||{};

    if(!followingStatus){
        navigate("/");
        return null;
    }

    return(
        <p id="result">Thanks for following byte!</p>
    )
}

export default Result;