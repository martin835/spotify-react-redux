import logo from './logo.svg';
import './App.css';
import MyFooter from './components/MyFooter';
import {Container, Row, Col} from "react-bootstrap"
import MySideBar from './components/MySideBar';
import MyNavBar from "./components/MyNavBar"
import MainBody from './components/MainBody';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import BodyArtist from "./components/BodyArtist"
import BodyAlbum from "./components/BodyAlbum"

function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Row className="flex-nowrap">
          <Col xs={2} className="sidebar-bg">
            <MySideBar />
          </Col>
          <Col xs={10}>
            <MyNavBar />
            <Routes>
              <Route path="/" element={<MainBody />} />
              <Route path="/artist" element={<BodyArtist />} />
              <Route path="/album" element={<BodyAlbum />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
