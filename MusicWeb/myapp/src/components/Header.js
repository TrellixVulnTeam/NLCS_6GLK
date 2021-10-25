import React from 'react';
import { useContext, useState } from "react";
import AppContext from "../components/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Header.css";
import { FaSearch } from "react-icons/fa";
import { NavLink, useHistory, Link } from 'react-router-dom';

export default function Header() {
  const logo = "logo.png"
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const { user } = state;
  const [search, setSearch] = useState("");
  var resultPlaylist = [];
  var resultSong = [];
  const signOut = () => {
    localStorage.removeItem("token");
    dispatch({ type: "CURRENT_USER", payload: null });
    history.push("/");
    alert("Đăng xuất thành công!!!");
  }
  const onChangeHandle = (e) => {
    setSearch(e.target.value.toLowerCase())
    return;
  };
  function change_alias(alias) {
    var str = alias;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.trim();
    return str;
  }
  let infor = search;
  infor = infor.trim();
  infor = infor.toString();
  if (infor === ' ' || infor === '') {
  } else {
    for (let x of state.playlists) {
      if (change_alias(x.name).toLowerCase().indexOf(change_alias(infor).toLowerCase()) >= 0) {
        resultPlaylist.push(x);
      }
    }
    for (let x of state.songs) {
      if (change_alias(x.name).toLowerCase().indexOf(change_alias(infor).toLowerCase()) >= 0) {
        resultSong.push(x);
      }
    }
  }
  const drop = () => {
    resultPlaylist.splice(0, resultPlaylist.length);
    resultSong.splice(0, resultSong.length);
    setSearch("")
  }




  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mr-lg-4 ml-lg-4 mt-4 fixed-top">
      <Link to="/#" style={{ marginRight: "50px" }}><img src={require("../public/" + logo).default
      } alt="avatar" id="avatar" width="100px" height="100px" /> </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0 app-search-form" style={{ position: "relative" }} >
          <input className="form-control mr-sm-2 app-input-form" value={search}
            placeholder="Search"
            aria-label="Search"
            onChange={e => onChangeHandle(e)}
          />
          <Link to="/#" className="btn btn-outline-success my-2 my-sm-0 app-btn" type="submit"><FaSearch /></Link>
          <div>
            {resultPlaylist.length === 0 && resultSong.length === 0 ? (
              <>

              </>
            ) : (
              <>
                <div style={{
                  position: "absolute",
                  backgroundColor: "#FFFFFF",
                  overflow: "hidden",
                  display: "block",
                  width: "80%",
                  zIndex: "5",
                  left: "0px",
                  top: "38px",
                  height: "auto",
                  border: "solid #F8F9FA 1px"
                }} >
                  <h5 style={{
                    textAlign: "center",
                    margin: "10px"
                  }}>Playlist</h5>
                  {resultPlaylist.length === 0 ? (
                    <>
                      <h6> Không tìm thấy playlist nào cả :((</h6>
                    </>
                  ) : (
                    <>{
                      resultPlaylist.map(playlist => (
                        <div key={playlist.id}>
                          <Link
                            to={`playlists/detail/${playlist.id}`}
                            className="nav-link"
                            onClick={() => drop()}
                          >{playlist.name}
                          </Link>
                        </div>
                      ))
                    }
                    </>
                  )
                  }
                  <h5 style={{
                    textAlign: "center",
                    margin: "10px"
                  }}>Song</h5>
                  {resultSong.length === 0 ? (
                    <>
                      <h6> Không tìm thất bài hát nào cả :((</h6>
                    </>
                  ) : (
                    <>{
                      resultSong.map(song => (
                        <div key={song.id}>
                          <Link to={`songs/detail/${song.id}`}
                            className="nav-link"
                            onClick={() => drop()}
                          >{song.name}</Link>
                        </div>
                      ))
                    }
                    </>
                  )
                  }

                </div>
              </>
            )

            }
          </div>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item vertical-nav-item">
            <NavLink
              to='/'
              className="nav-link"
              activeClassName="active"
              exact
            >Trang Chủ</NavLink>
          </li>
          <li className="nav-item vertical-nav-item">
            <NavLink
              to='/playlists'
              className="nav-link"
              activeClassName="active"
              exact
            >Playlists</NavLink>
          </li>
          <li className="nav-item vertical-nav-item">
            <NavLink
              to='/songs'
              className="nav-link"
              activeClassName="active"
              exact
            >Song</NavLink>
          </li>
          <li className="nav-item vertical-nav-item">
            {user ? (
              <>
                <NavLink to='/mymusic/song'
                  className="nav-link"
                  activeClassName="active"
                  exact
                >Cá nhân</NavLink>
              </>
            ) : (
              <>
                <NavLink to='/login'
                  className="nav-link"
                  activeClassName="active"
                  exact
                >Cá nhân</NavLink>
              </>
            )
            }
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item">
                <div className="nav-item-avatar">
                  <img src={require("../public/uploads/img/user/" + state.img).default
                  } alt="avatar" id="avatar" />
                  <NavLink to='/mymusic/song' className="nav-link">{user}</NavLink>
                </div>

              </li>
              <li className="nav-item" onClick={() => signOut()}>
                <Link to="/#" className="nav-link" href="#">Đăng Xuất <span className="sr-only">(current)</span></Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to='/login' className="nav-link">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/register' className="nav-link">Register</NavLink>
              </li>
            </>
          )
          }
        </ul>
      </div>
    </nav>
  )
}
