import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <div>
                <Link to="/"><img src="" alt="Logo img"></img></Link>
            </div>
            <div>
                <Link to="/room">ROOM</Link>
                <Link to="/service">SERVICE</Link>
                <Link to="/review">REVIEW</Link>
                <Link to="/profile">PROFILE</Link>

            </div>
        </div>
        
    )
}
export default Navbar;