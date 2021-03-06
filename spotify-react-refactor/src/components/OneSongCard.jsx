import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Comments from "./Comments";

import { Link } from "react-router-dom";

import { connect } from 'react-redux'
import { addToLikedAction, removeFromLikedAction, addSongToPlaylistAction } from '../redux/actions'
import { useState } from "react";
import { useParams } from "react-router-dom";

const mapStateToProps = (state) => ({
    liked: state.favourites.liked,
    all: state.playlists.all
  })

const mapDispatchToProps = (dispatch) => ({
   
    addToLiked: (songL) => {
      dispatch(addToLikedAction(songL))
    },
    removeFromLiked: (songL) => {
      dispatch(removeFromLikedAction(songL))
    },
    addSongToPlaylist: (playlist) => {
      dispatch(addSongToPlaylistAction(playlist))
    }
  })




const OneSongCard = (props) => {

  const params = useParams()

  const [show, setShow] = useState(false);

  const [playlist, setPlaylist] = useState(undefined)

  return (
  <>
    <Col
      xs={12}
      md={6}
      lg={4}
      xl={3}
      className="mt-3"
      onClick={() => {
        props.setCurrentSong(props.song);
      }}
    >
      <div className="card-main pb-1">
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="imagewrapper">
              <div className="son">
                <img
                  className="px-3 py-3 card-image-main"
                  src={props.image}
                  alt="album-img"
                />
              </div>
              <div className="son2 d-flex justify-content-end align-items-end">
                <div className="playbutton mb-3 mr-3">
                  <div className="arrow-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link to={`/album/${props.albumId}`}>
          <h6 className="px-2 my-1 card-title">{props.title}</h6>
        </Link>
        <div className="d-flex justify-content-between" >
        <Link to={`/artist/${props.artistId}`}>
          <p className="card-description-main my-2 px-2 ">{props.artist}</p>
        </Link>
          <div>
            {!params.playlistName &&
        <i className="bi bi-plus-square-fill mr-2 like-heart-button" onClick={()=> setShow(true)}></i>}
        {props.liked.indexOf(props.song) === -1 ?
        <i className="bi bi-heart mr-2 like-heart-button" onClick={()=> {props.addToLiked(props.song)}}></i>:
        <i className="bi bi-heart-fill mr-2 like-heart-button" onClick={()=>{props.removeFromLiked(props.liked.indexOf(props.song))}}></i>
        }
        </div>
        </div>
        <Modal show={show} onHide={()=> setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add song to playlist</Modal.Title>
        </Modal.Header>
        {props.all.map(playlist => { return <Button className="m-2" variant="primary" onClick={()=>{ setPlaylist(playlist.name)}}>{playlist.name}</Button>})}
        <Modal.Footer>
        <Button className="m-2" variant="success" onClick={()=>{props.addSongToPlaylist({name:playlist, song: props.song}); setShow(false) }}>Add to playlist</Button>
        </Modal.Footer>
      </Modal>
          <Comments albumId={props.albumId} songId={props.songId} />
      </div>
    </Col>
  </>
)}

export default connect(mapStateToProps, mapDispatchToProps)(OneSongCard)
