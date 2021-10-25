import React from 'react'
import { Container, Row, Col, Figure } from 'react-bootstrap';

export default function Playlist({ playlist }) {
    console.log("DsaDSADSadasdas");
    return (
        <Container>
            <Row>
                <Col>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src="holder.js/171x180"
                        />
                        <Figure.Caption>
                            Nulla vitae elit libero, a pharetra augue mollis interdum.
                        </Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </Container>
    )
}
