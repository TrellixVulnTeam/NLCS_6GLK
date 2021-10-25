import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';
export default function AddSongToPlaylistItem({playlist}) {
    return (
        <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label={playlist.name} />
        </Form.Group>
    )
}
