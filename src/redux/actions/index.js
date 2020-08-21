export const REQUEST_ALL_ALBUMS = "REQUEST_ALBUMS";
export const REQUEST_USERS = "REQUEST_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_ALL_ALBUMS = "RECEIVE_ALBUMS";
export const REQUEST_PHOTOS = "REQUEST_PHOTOS";
export const RECEIVE_PHOTOS = "RECEIVE_PHOTOS";
export const REQUEST_FAILED = "REQUEST_FAILED";

export const requestAllAlbums = () => ({
  type: REQUEST_ALL_ALBUMS,
});

export const receiveAllAlbums = (albums) => ({
  type: RECEIVE_ALL_ALBUMS,
  albums,
});

export const requestFailed = (errorMessage) => ({
  type: REQUEST_FAILED,
  errorMessage,
});

export const requestUsers = () => ({
  type: REQUEST_USERS,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});
export const requestPhotos = (albumId) => ({
  type: REQUEST_PHOTOS,
  albumId,
});

export const receivePhotos = (photos) => ({
  type: RECEIVE_PHOTOS,
  photos,
});

export const fetchAllAlbums = () => (dispatch) => {
  dispatch(requestAllAlbums());
  return fetch("https://jsonplaceholder.typicode.com/albums/")
    .then((response) => response.json())
    .then((json) => dispatch(receiveAllAlbums(json)))
    .catch(() =>
      dispatch(
        requestFailed(
          "Failed retrieving the Users albums, please try again later"
        )
      )
    );
};

export const fetchUsers = () => (dispatch) => {
  dispatch(requestUsers());
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => dispatch(receiveUsers(json)))
    .catch(() =>
      dispatch(
        requestFailed("Failed retrieving the Users, please try again later")
      )
    );
};

export const fetchPhotos = (albumId) => (dispatch) => {
  dispatch(requestPhotos(albumId));
  return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then((response) => response.json())
    .then((json) => dispatch(receivePhotos(json)))
    .catch(() =>
      dispatch(
        requestFailed(
          "Failed retrieving the albums photos, please try again later"
        )
      )
    );
};
