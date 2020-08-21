import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "./../redux/actions/index";

import Card from "./../components/Card";

import "./../styles/albums.scss";
import Pagination from "../components/Pagination";

const Albums = ({
  isFetching,
  errorMessage,
  albumsFetched,
  fetchAllAlbums,
  fetchUsers,
  users,
}) => {
  const [albums, setAlbums] = useState([]);
  const [flag, setFlag] = useState(false);
  const [showPerPage, setShowPerPage] = useState(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    fetchAllAlbums();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0 && albumsFetched.length > 0) {
      let count = 0,
        i;
      const modifiedAlbums = [];
      for (i = 1; i <= albumsFetched.length; i++) {
        modifiedAlbums.push({
          ...albumsFetched[i - 1],
          username: users[count].name,
        });
        if (i % 10 === 0) {
          count++;
        }
      }
      setAlbums(modifiedAlbums);
    }
  }, [albumsFetched, users]);

  useEffect(() => {
    setFlag(true);
  }, [albums.length]);

  const renderAlbums = () => {
    if (!albums) return null;
    console.log(albums);
    return albums
      .slice(pagination.start, pagination.end)
      .map(({ title, id, username }) => (
        <Card
          key={id}
          link={`/details/${id}/${username}/${title}`}
          title={title}
          name={username}
        />
      ));
  };

  return isFetching || !!errorMessage || !flag ? (
    <div>{errorMessage || "Loading Albums..."}</div>
  ) : (
    <>
      <div className="albums">
        <h1>List of Albums</h1>
        {flag && renderAlbums()}
      </div>
      <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={albums.length}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    isFetching: state.isFetching,
    albumsFetched: state.albums,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllAlbums: () => dispatch(actions.fetchAllAlbums()),
  fetchUsers: () => dispatch(actions.fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
