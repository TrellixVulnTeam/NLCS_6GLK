import React from 'react'
import { Container } from 'react-bootstrap';
import "../css/PlaylistsLists.css";
export default function NotFound() {
    return (
        <div>
             <Container className="playlist-section" >
                <div style={{
                    margin: "0 auto",
                    textAlign: "center",
                    border: "2px solid #F8F9FA",
                    color:"#517AA3", fontSize:"18px"
                }}>Tôi rất tiếc trang bạn tìm kiếm không tồn tại :( vui lòng xem lại url của bạn!</div>
            </Container>
        </div>
    )
}
