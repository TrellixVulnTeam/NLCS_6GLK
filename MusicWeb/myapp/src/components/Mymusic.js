import React, { useContext } from 'react';
import "../css/Mymusic.css";
import AppContext from './AppContext';
import { Link } from "react-router-dom";

export default function Mymusic() {
    const { state,  } = useContext(AppContext);
    const { user } = state;
 

    return (
        <div className="container-mymusic">
            <div className="text-center">
                <img src={require("../public/uploads/img/user/" + state.img).default} alt="avatar" id="avatar" />
                <h2>{user}</h2>
            </div>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link to='/mymusic/song' className="nav-link">My Song</Link>
                </li>
                <li className="nav-item">
                    <Link to='/mymusic/playlist' className="nav-link">My Playlist</Link>
                </li>
                <li className="nav-item">
                    <Link to='/mymusic/upload' className="nav-link">Upload My Song</Link>
                </li>
                <li className="nav-item">
                    <Link to='/mymusic/create' className="nav-link">Create My PLaylists</Link>
                </li>
            </ul>
           

        </div>
    )
}