import { Container, Row, Col } from "react-bootstrap";
import OneSongCard from "./OneSongCard";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getResultAction } from "../redux/actions";

const mapStateToProps = (state) => ({
  result: state.search.result,
});

const mapDispatchToProps = (dispatch) => ({
  getResult: (search) => {
    dispatch(getResultAction(search));
  },
});

const MainBody = (props) => {
 

  useEffect(() => {
    if (props.searchQuery) {
      props.getResult(props.searchQuery);
    } else {
      props.setSearchQuery("queen");
    }
  }, [props.searchQuery]);



  return (
    <Container fluid className="px-5 my-4">
      <div className="top-bumper"></div>
      <h2 className="h2-main">Recently played</h2>


        <Row id="main-section-recent">
          {props.searchQuery.length &&
            props.result.map((song) => (
              <OneSongCard
                key={song.id}
                albumId={song.album.id}
                artistId={song.artist.id}
                songId = {song.id}
                image={song.album.cover_medium}
                title={song.title}
                artist={song.artist.name}
                setCurrentSong={props.setCurrentSong}
                song={song}
              />
            ))}
        </Row>
        <div className="bottom-bumper"></div>
      </Container>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(MainBody);
