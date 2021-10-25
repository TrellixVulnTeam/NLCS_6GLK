import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import PlaylistItem from "./PlaylistItem";
import "../css/PlaylistsLists.css";
import AppContext from './AppContext';
export default function PlaylistList() {
    const { state } = useContext(AppContext);
    const { playlists } = state;
    const newPlaylists = playlists;

    return (
        <div>
        <Container className="playlist-section" >
            <div className="heading">
                <h3 style={{ fontWeight: "500", borderTop: "solid #FFFFFF 2px",color:"#517AA3", fontSize:"30px" }}>PLAYLIST</h3>
            </div>
            <div className="row mt-4">
                {newPlaylists.length === 0 ? (
                    <>

                    </>
                ) : (
                    <>{
                        newPlaylists.map(playlist => (
                            <div className="col-xl-3"  key={playlist.id}>
                                <PlaylistItem playlist={playlist} />
                            </div>
                        ))
                    }
                    </>
                )
                }
            </div>
        </Container>
        </div>
    )
}
