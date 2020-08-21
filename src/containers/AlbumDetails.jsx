import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./../redux/actions/index";
import PhotoCard from "./../components/PhotoCard";
import Pagination from "./../components/Pagination";
import "./../styles/albumDetails.scss";

const AlbumDetails = ({
  title,
  fetchPhotos,
  match: { params },
  errorMessage,
  isFetching,
  photosFetched,
}) => {
  const [photos, setPhotos] = useState([]);
  const [showPerPage, setShowPerPage] = useState(9);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    fetchPhotos(params.albumId);
  }, []);

  useEffect(() => {
    setPhotos(photosFetched);
  }, [photosFetched]);

  const renderPhotos = () => {
    if (!photos) return null;
    return photos
      .slice(pagination.start, pagination.end)
      .map(({ id, thumbnailUrl, title }) => (
        <PhotoCard key={id} url={thumbnailUrl} title={title} />
      ));
  };

  return isFetching || !!errorMessage ? (
    <div>{errorMessage || "Loading Album's Details..."}</div>
  ) : (
    <>
      <div className="detail-container">
        <h1>{params.title}</h1>
        <h3>Uploaded by: {params.username}</h3>
        <div className="photo-grid">{renderPhotos()}</div>
      </div>
      <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={photos.length}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    isFetching: state.isFetching,
    photosFetched: state.photos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPhotos: (albumId) => dispatch(actions.fetchPhotos(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetails);
