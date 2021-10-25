import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import AppContext from './AppContext';
import { Container, Row, Col, Figure } from 'react-bootstrap';
import { animated, useSpring } from 'react-spring';
export default function DetailPlaylist() {
    const params = useParams()
    const { state, dispatch } = useContext(AppContext);
    const [DetailPlaylist, SetDetailPlaylist] = useState([]);
    const [control, setControl] = useState(true);
    const [active, setActive] = useState(false);
    const [cookies, setCookie] = useCookies(['currentSong']);
    useEffect(() => {
        if (params.id) {
            state.playlists.forEach(playlist => {
                if (playlist.id === params.id) {
                    SetDetailPlaylist(playlist);
                    dispatch({ type: "PLAYING_PLAYLIST", payload: { playlist } });
                    let newSong = state.songs.filter((song) => {
                        for (const value of playlist.songs)
                            if (song.id === value) {
                                var x = song;
                            }
                        return x;
                    });
                    if (newSong.length === 0) {
                        console.log("NULL");
                    } else {
                        dispatch({ type: "SET_PLAYLIST", payload: { newSong } });
                        let song = newSong[cookies.cIndex];
                        dispatch({ type: "PLAYING_SONG", payload: { song } });

                    }

                }
            })
        }
    }, [params.id, state.playlists, state.songs, dispatch, cookies]);
    const { x } = useSpring({
        from: { x: 0 },
        x: control && active ? 1 : 0,
        config: { duration: 1000 },
    })
    let newSong = [];
    if (DetailPlaylist.length === 0) return null;
    else {
        newSong = state.songs.filter((song) => {
            for (const value of DetailPlaylist.songs) {
                if (song.id === value) {
                    var x = song;
                }
            }
            return x;
        });
    }

    const $ = document.querySelector.bind(document);
    const audioP = $("#audio");
    const progress = $("#progress-bar");
    const player = $(".control-player");
    let date = new Date(DetailPlaylist.createdAt);
    const img = require("../public/uploads/img/playlist/" + DetailPlaylist.img).default;
    const animationClick = (control, active) => {
        setActive(false);
        if (control === false) {
            setControl(true);
            setActive(true);
        } else {
            setControl(false);
            setActive(false);
        }
    }
    const playingSong = async (song) => {
        try {
            if (state.playingSong === null && song !== undefined) {
                dispatch({ type: "PLAYING_SONG", payload: { song } });
                setCookie('cTrol', false, { path: '/' });
                dispatch({ type: "IS_PAUSE", payload: state.isPlaying });
                player.classList.remove("playing");
                const indexSong = newSong.indexOf(song);
                setCookie('cIndex', indexSong, { path: '/' });
                setCookie('cTime', 0, { path: '/' });
                if (audioP !== undefined) {
                    audioP.play();
                }
            } else {
                console.log("reset song!!!");
                dispatch({ type: "RESET_SONG", });
                dispatch({ type: "PLAYING_SONG", payload: { song } });
                setCookie('cTrol', false, { path: '/' });
                dispatch({ type: "IS_PAUSE", payload: state.isPlaying });
                player.classList.remove("playing");
                const indexSong = newSong.indexOf(song);
                setCookie('cIndex', indexSong, { path: '/' });
                setCookie('cTime', 0, { path: '/' });
                if (audioP !== undefined) {
                    audioP.play();
                    progress.value = 0;
                }

            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container className="playlist-section">
            <Row>
                <Col>
                    <div style={{
                        position: "fixed",

                    }}>
                        <div style={{
                            padding: "10px",
                            marginBottom: "10px",
                            marginTop: "10px",
                            display: "block"
                        }}
                        >
                            <h1> <span
                                style={{
                                    padding: "10px",
                                    color: "#68FFFF"
                                }}
                            >{DetailPlaylist.name}</span></h1>
                        </div>
                        <Figure>
                            <Figure.Image
                                width={300}
                                height={300}
                                alt="300x300"

                                src={img}
                            />
                            <Figure.Caption style={{
                                backgroundColor: "#F8F9FA",
                                padding: "10px"

                            }}>
                                <h4>Thông tin </h4>
                                <p>
                                    Tác giả:  {DetailPlaylist.user.name}  <br />
                                    Thời gian thêm: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `} <br />
                                    Tổng bài hát: {newSong.length}
                                </p>
                            </Figure.Caption>
                        </Figure>
                    </div>
                </Col>
                <Col>
                    <Row>
                        <div
                        >
                            <div style={{
                                padding: "10px",
                                marginBottom: "10px",
                                marginTop: "10px",
                                display: "block",
                            }} >
                                <h1> <span
                                    style={{
                                        padding: "10px",
                                        color: "#68FFFF"
                                    }}
                                >Danh sách bài hát</span></h1>
                            </div>
                            {newSong.length === 0 ? (
                                <>
                                    <div style={{
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        backgroundColor: "#F8F9FA",
                                        textAlign: "center",
                                        fontSize: "20px"
                                    }}>
                                        <p>
                                            Rất tiếc danh sách bài hát của bạn đang rỗng :((. Hãy thêm bài hát vào danh sách và trở lại sau nhé!

                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {
                                        newSong.map((song) => (
                                            <Col
                                                style={{
                                                    display: "block",
                                                    backgroundColor: "#68FFFF",
                                                    borderRadius: "10px",
                                                }}
                                                key={song.id}
                                            >
                                                <div className="Playlist" onClick={() => animationClick(control, active)}>
                                                    <div
                                                        onClick={() => playingSong(song)}
                                                        style={{
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            marginTop: "10px"
                                                        }} >
                                                        {song.id === state.playingSong[0].id ? (
                                                            <>
                                                                <animated.div
                                                                    style={{
                                                                        opacity: x.to({ range: [0, 1], output: [0.8, 1] }),
                                                                        backgroundColor: "#F8F9FA",
                                                                        width: "100%",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        margin:"5px",
                                                                        borderRadius:"5px",
                                                                        color:"#22A6A6"
                                                                    }}
                                                                >
                                                                    <Figure.Image
                                                                        width={50}
                                                                        height={50}
                                                                        alt="300x300"
                                                                        src={require("../public/uploads/img/song/" + song.img).default}
                                                                        style={{
                                                                            marginRight: "10px",
                                                                            borderRadius: "50%",
                                                                            marginTop: "10px",
                                                                            padding: "5px"
                                                                        }}
                                                                    />
                                                                    <h6>{song.name}</h6>

                                                                </animated.div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                    <Figure.Image
                                                                        width={50}
                                                                        height={50}
                                                                        alt="300x300"
                                                                        src={require("../public/uploads/img/song/" + song.img).default}
                                                                        style={{
                                                                            marginRight: "10px",
                                                                            borderRadius: "50%",
                                                                            marginTop: "10px"
                                                                        }}
                                                                    />
                                                                    <h6>{song.name}</h6>
                                                            </>
                                                        )
                                                        }

                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </>
                            )
                            }


                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
