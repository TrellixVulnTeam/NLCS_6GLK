import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import AppContext from './AppContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
export default function DetailSong() {
  const params = useParams()
  const { state, dispatch } = useContext(AppContext);
  const [setCookie] = useCookies(['currentSong']);
  const [DetailSong, SetDetailSong] = useState([]);
  useEffect(() => {
    if (params.id) {
      state.songs.forEach(song => {
        if (song.id === params.id) {
          SetDetailSong(song)
        }
      })
    }
  }, [params.id, state.songs]);

  let date = new Date(DetailSong.createdAt);
  if (DetailSong.length === 0) return null;
  const $ = document.querySelector.bind(document);
  const audioP = $("#audio");
  const player = $(".control-player");
  const progress = $("#progress-bar");

  const playingSong = async (song) => {
    try {
      if(song !== undefined){
        dispatch({ type: "PLAYING_SONG", payload: { song } });
        setCookie('cTrol', false, { path: '/' });
        dispatch({ type: "IS_PAUSE", payload: state.isPlaying });
        player.classList.remove("playing");
        setCookie('cTime', 0, { path: '/' });
        if (audioP !== undefined) {
          audioP.play();
          progress.value = 0;
        }
      }else{
        alert("Đang load audio!!!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Container className="playlist-section" >
        <Row>
          <Col>
            <Card style={{ marginTop: '50px', marginBottom: "30px" }}>
              {typeof (DetailSong.img) !== 'undefined' ? (
                <>
                  <div
                    onClick={() => playingSong(DetailSong)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Img variant="top" src={require("../public/uploads/img/song/" + DetailSong.img).default}
                      width={300}
                      height={300}
                    />
                  </div>

                </>
              ) : (
                <>

                </>
              )
              }
            </Card>
            <div style={{ backgroundColor: "#F8F9FA", padding: "10px", textAlign: "center", width: "250px", borderRadius: "5px" }} >
              <h5>
                {DetailSong.name}
              </h5>
            </div>
          </Col>
          <Col>
            <Card style={{ marginTop: '50px' }}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}><h6>Thông Tin Bài Hát</h6></Card.Title>
                <Card.Text>
                  Tác giả:  {DetailSong.user.name}  <br />
                  Thời gian thêm: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `} <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </>
  )
}
