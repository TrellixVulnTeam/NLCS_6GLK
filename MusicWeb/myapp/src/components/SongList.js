import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import SongItem from "./SongItem";
import AppContext from './AppContext';
import "../css/PlaylistsLists.css";
export default function SongList() {
    const { state } = useContext(AppContext);
    const { songs } = state;
    const newSongs = songs;
    return (
        <div>
             <Container className="playlist-section" >
                <div className="heading">
                    <h3 style={{ fontWeight: "500", borderTop: "solid #FFFFFF 2px",color:"#517AA3", fontSize:"30px" }}>SONG</h3>
                </div>
                <div className="row mt-4">
                    {newSongs.map((song) => (
                        <div className="col-xl-3"  key={song.id}>
                            <SongItem song={song} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
