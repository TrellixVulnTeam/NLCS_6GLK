import React, { useContext, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useCookies } from 'react-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../css/Musicplayer.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { FaRandom } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import AppContext from './AppContext';
export default function Musicplayer({ song }) {
  const { state, dispatch } = useContext(AppContext);
  const [cookies, setCookie] = useCookies(['currentSong']);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(false);
  const [styles, api] = useSpring(() => ({loop: true,
    to: [
      { rotateZ: 0 },
    ],
    from: { rotateZ: 360 },
    config: {duration: 10000}}));
  const songOfPlaylistPlaying = state.songOfPlaylistPlaying;
  const name = song[0].name;
  const user = song[0].user.name;
  const img = song[0].img;
  const audio = song[0].audio;
  const $ = document.querySelector.bind(document);
  const player = $(".control-player");
  const progress = $("#progress-bar");
  const btnVolum = $("#volum");
  const volum = $('.volum');
  const btnMute = $("#mute");
  const progressVolum = $("#progress-volum");
  const playBtn = $(".btn-toggle-play");
  const audioP = $("#audio");
  const repeatBtn = $(".btn-repeat");
  const ramdomBtn = $(".btn-random");
  const nextBtn = $(".btn-next");
  const prevBtn = $(".btn-prev");
  useEffect(() => {
    try {
      if (audioP !== null) {
        audioP.currentTime = cookies.cTime;
        console.log("PLAY");
        if (audioP.play() !== undefined) {
          audioP.play();
        } else {
          console.log("ERROR");
        }
      } else {
        console.log("ERR");
      }
    } catch (error) {
      console.log(error);
    }
  }, [audioP, cookies]);

  if (player === null) {
    alert("Loading!!!");
  } else {
    if (audioP === null) {
      alert("Đang load audio!!!");
    }
    else {
      // Xử lý play và pause
      playBtn.onclick = () => {
        if (state.isPlaying) {

          if (audioP.pause() !== undefined) {
            audioP.pause();
          }
        } else {

          if (audioP.play() !== undefined) {
            audioP.play();
          }
        }
      }
      audioP.onplay = () => {
        try {
          dispatch({ type: "IS_PLAYING", payload: state.isPlaying });
          player.classList.add("playing");
          api.resume();
        } catch (error) {
          console.log(error);
        }
      }
      audioP.onpause = () => {
        try {
          dispatch({ type: "IS_PAUSE", payload: state.isPlaying });
          player.classList.remove("playing");
          api.pause();
        } catch (error) {
          console.log(error);
        }
      };
       // Xử lý cập nhật thanh tiến trình bài hát
      audioP.ontimeupdate = async () => {
        try {
          if (audioP.duration) {
            setCookie('cTime', audioP.currentTime, { path: '/' });
            const progressPercent = Math.floor(
              (audioP.currentTime / audioP.duration) * 100
            );
            // khi seek === true tức là ta đang thực hiện sự thay đổi thanh tiến trình
            if (!seek) {
              progress.value = progressPercent;
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      // Xử lý next
      nextBtn.onclick = () => {
        try {
          if (state.isRandom) {
            randomSong();
          } else {
            nextSong();
          }
          if (audioP.play() !== undefined) {
            audioP.play();
          } else {
            console.log("ERROR");
          }

          if (progress !== undefined) {
            progress.value = 0;
          } else {
            console.log("progress is undefined");
          }
        } catch (error) {
          console.log(error);
        }
      };
      // Xử lý prev
      prevBtn.onclick = () => {
        try {
          if (state.isRandom) {
            randomSong();
          } else {
            prevSong();
          }
          if (audioP.play() !== undefined) {
            audioP.play();
          } else {
            console.log("ERROR");
          }
          if (progress !== undefined) {
            progress.value = 0;
          } else {
            console.log("progress is undefined");
          }
        } catch (error) {
          console.log(error);
        }
      };

      // Xử lý khi seek trên thanh tiến trình. Khắc phục lỗi khi ta thực hiện sự kiện seek do sự kiện onupdatetime luôn chạy
      // nên khiến cho thanh tiến trình bị giật khi ta seek
      progress.onmousedown = () => {
        try {
          setSeek(true);
        } catch (error) {
          console.log(error);
        }
      }
      progress.onmouseup = () => {
        try {
          setSeek(false);
        } catch (error) {
          console.log(error);
        }
      }
      progress.onchange = async (e) => {
        try {
          console.log("Change!!!");
          if (audioP !== undefined) {
            const seekTime = parseFloat(audioP.duration / 100) * e.target.value;
            audioP.currentTime = seekTime;
            setCookie('cTime', audioP.currentTime, { path: '/' });
          } else {
            console.log("ERROR");
          }
        } catch (error) {
          console.log(error);
        }
      };
      btnVolum.onclick = () => {
        try {
          if (audioP !== undefined && volum !== undefined) {
            audioP.muted = true;
            volum.classList.add("setVolum");
          } else {
            console.log("ERROR");
          }
        } catch (error) {
          console.log(error);
        }
      };

      btnMute.onclick = () => {
        try {
          if (audioP !== undefined && volum !== undefined) {
            audioP.muted = false;
            volum.classList.remove("setVolum");
          } else {
            console.log("ERROR");
          }
        } catch (error) {
          console.log(error);
        }

      }
      progressVolum.onchange = () => {
        try {

          if (progressVolum.value === 0) {
            btnVolum.click();
            volum.classList.add("setVolum");
          }
          audioP.volume = parseFloat(progressVolum.value);
          console.log("Volum " + audioP.volume);
        } catch (error) {
          console.log(error);
        }
      };
      audioP.onended = () => {
        try {
          if (state.isRepeat) {
            if (audioP.play() !== undefined) {
              audioP.play();
            } else {
              console.log("ERROR");
            }
          } else {
            nextBtn.click();
          }
        } catch (error) {
          console.log(error);
        }
      };

      repeatBtn.onclick = () => {
        try {
          if (state.isRandom) {
            player.classList.remove("randomMode");
            dispatch({ type: "OFF_RANDOMMODE", });
            player.classList.add("repeateMode");
            dispatch({ type: "ON_REPEATEMODE", });
          } else {
            if (state.isRepeat) {
              player.classList.remove("repeateMode");
              dispatch({ type: "OFF_REPEATEMODE", });
            } else {
              player.classList.add("repeateMode");
              dispatch({ type: "ON_REPEATEMODE", });
            }
          }

        } catch (error) {
          console.log(error);
        }
      };
      ramdomBtn.onclick = () => {
        try {
          if (state.isRepeat) {
            player.classList.remove("repeateMode");
            dispatch({ type: "OFF_REPEATEMODE", });
            player.classList.add("randomMode");
            dispatch({ type: "ON_RANDOMMODE", });
          } else {
            if (state.isRandom) {
              player.classList.remove("randomMode");
              dispatch({ type: "OFF_RANDOMMODE", });
            } else {
              player.classList.add("randomMode");
              dispatch({ type: "ON_RANDOMMODE", });
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

    }
  }

  // Xử lý khi ấn next

  const nextSong = async () => {
    try {
      var tmp = index;
      tmp++;
      setIndex(tmp);
      if (index >= songOfPlaylistPlaying.length - 1) {
        setIndex(0);
        tmp = 0;
      }
      let song = songOfPlaylistPlaying[tmp];
      setCookie('cTime', 0, { path: '/' });
      setCookie('cIndex', tmp, { path: '/' });
      dispatch({ type: "PLAYING_SONG", payload: { song } });
    } catch (error) {
      console.log(error);
    }
  };

    // Xử lý khi ấn prev

  const prevSong = async () => {
    try {
      var tmp = index;
      tmp--;
      setIndex(tmp);
      if (tmp < 0) {
        setIndex(songOfPlaylistPlaying.length - 1);
        tmp = songOfPlaylistPlaying.length - 1;
      }
      let song = songOfPlaylistPlaying[tmp];
      setCookie('cTime', 0, { path: '/' });
      setCookie('cIndex', tmp, { path: '/' });
      dispatch({ type: "PLAYING_SONG", payload: { song } });
    } catch (error) {
      console.log(error);
    }
  };

   // Xử lý random mode

  const randomSong = async () => {
    try {
      var tmp;
      do {
        tmp = Math.floor(Math.random() * songOfPlaylistPlaying.length);
      } while (tmp === index);
      setIndex(tmp);
      let song = songOfPlaylistPlaying[tmp];
      setCookie('cTime', 0, { path: '/' });
      setCookie('cIndex', tmp, { path: '/' });
      dispatch({ type: "PLAYING_SONG", payload: { song } });
    } catch (error) {
      console.log(error);
    }
  };
  
  // Xử lý menu media của chrome

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: `${name}`,
      artist: `${user}`,
      album: 'Whenever You Need Somebody',
      artwork: [
        { src: require("../public/uploads/img/song/" + img).default,   sizes: '96x96',   type: 'image/png' },
      ]
    });
    navigator.mediaSession.setActionHandler('previoustrack', function() {
      prevBtn.click();
    });
    navigator.mediaSession.setActionHandler('nexttrack', function() {
      nextBtn.click();
    });
  }

  // Xử lý sự kiện trên bàn phím
  
  window.addEventListener("keydown", function (event) {
    if(event.key === ' '){
      if(playBtn !== null){
        playBtn.click();
      }
    }
  }, true);
  


  return (
    <div>
      {state.playingPlaylist === null ?
        (
          <>
            <Navbar
              className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom h-auto mr-lg-4 ml-lg-4 mt-4">
              <div className="player">
                <div className="dashboard">
                  <div className="header-player">
                  <animated.div style={styles}>
                      <img src={require("../public/uploads/img/song/" + img).default
                      } id="CD" alt="img" />
                    </animated.div>
                    <div className="heading"> 
                      <h4 style={{color:"#517AA3", fontSize:"18px"}}>{name}</h4>
                      <h5 style={{color:"#517AA3", fontSize:"16px"}}>{user}</h5>
                    </div>
                  </div>
                  <div className="control-player">
                    <div className="control">
                      <div className="btn-control btn-repeat" style={{ display: "none" }}>
                        <Link to="#"><FaRedo /></Link>
                      </div>
                      <div className="btn-control btn-prev" style={{ display: "none" }}>
                        <Link to="#"><FaStepBackward /></Link>
                      </div>
                      <div className="btn-control btn-toggle-play"  >
                        <div style={{ cursor: "pointer", color: "#007BFF" }}><FaPlay className="icon-play" /><FaPause className="icon-pause" />
                        </div>
                      </div>
                      <div className="btn-control btn-next" style={{ display: "none" }} >
                        <Link
                        ><FaStepForward />
                        </Link>
                      </div>
                      <div className="btn-control btn-random" style={{ display: "none" }}>
                        <Link to="#"><FaRandom /></Link>
                      </div>
                    </div>
                    <div className="progress">
                      <input id="progress-bar" type="range" defaultValue={0} step={1} min={0} max={100} />
                    </div>
                  </div>
                  <div className="volum">
                  <div style={{ cursor: "pointer", color: "#007BFF" }}><FaVolumeUp id="volum" className="icon-volum" /><FaVolumeMute id="mute" className="icon-mute" /></div>
                    <div className="progress-bar">
                      <input id="progress-volum" type="range" defaultValue={0.5} step={0.1} min={0} max={1} />
                    </div>
                  </div>
                  <audio id="audio" src={require("../public/uploads/audio/" + audio).default

                  } />
                </div>
              </div>
            </Navbar>
          </>

        ) : (
          <>
            <Navbar
              className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom h-auto mr-lg-4 ml-lg-4 mt-4">
              <div className="player">
                <div className="dashboard">
                  <div className="header-player">
                    <animated.div style={styles}>
                      <img src={require("../public/uploads/img/song/" + img).default
                      } id="CD" alt="img" />
                    </animated.div>
                    <div className="heading"> 
                      <h4 style={{color:"#517AA3", fontSize:"18px"}}>{name}</h4>
                      <h5 style={{color:"#517AA3", fontSize:"16px"}}>{user}</h5>
                    </div>
                  </div>
                  <div className="control-player">
                    <div className="control">
                      <div className="btn-control btn-repeat">
                        <div style={{ cursor: "pointer", color: "#007BFF" }}><FaRedo /></div>
                      </div>
                      <div className="btn-control btn-prev"

                      >
                        <div style={{ cursor: "pointer", color: "#007BFF" }}><FaStepBackward /></div>
                      </div>
                      <div className="btn-control btn-toggle-play"  >
                        <div style={{ cursor: "pointer", color: "#007BFF" }}><FaPlay className="icon-play" /><FaPause className="icon-pause" />
                        </div>
                      </div>
                      <div className="btn-control btn-next" >
                        <div style={{ cursor: "pointer", color: "#007BFF" }}> <FaStepForward /></div>
                      </div>
                      <div className="btn-control btn-random">
                        <div style={{ cursor: "pointer", color: "#007BFF" }}><FaRandom /></div>
                      </div>
                    </div>
                    <div className="progress">
                      <input id="progress-bar" type="range" defaultValue={0} step={1} min={0} max={100} />
                    </div>
                  </div>
                  <div className="volum">
                    <div style={{ cursor: "pointer", color: "#007BFF" }}><FaVolumeUp id="volum" className="icon-volum" /><FaVolumeMute id="mute" className="icon-mute" /></div>
                    <div className="progress-bar">
                      <input id="progress-volum" type="range" defaultValue={0.5} step={0.1} min={0} max={1} />
                    </div>
                  </div>
                  <audio id="audio" src={require("../public/uploads/audio/" + audio).default}
                  />
                </div>
              </div>
            </Navbar>
          </>
        )
      }
    </div>
  )
}
