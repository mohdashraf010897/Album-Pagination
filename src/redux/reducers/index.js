import {
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_ALL_ALBUMS,
  RECEIVE_ALL_ALBUMS,
  REQUEST_FAILED,
  REQUEST_PHOTOS,
  RECEIVE_PHOTOS,
} from "../actions";

export const initialState = {
  isFetching: false,
  errorMessage: null,
  users: [],
  albums: [],
  photos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        users: [],
      };
    case RECEIVE_USERS:
      const { users } = action;
      return {
        ...state,
        isFetching: false,
        users,
      };
    case REQUEST_ALL_ALBUMS:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        albums: [],
      };
    case RECEIVE_ALL_ALBUMS:
      const { albums } = action;
      return {
        ...state,
        isFetching: false,
        albums,
      };
    case REQUEST_PHOTOS:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
        photos: [],
      };
    case RECEIVE_PHOTOS:
      const { photos } = action;
      return {
        ...state,
        isFetching: false,
        photos,
      };
    case REQUEST_FAILED:
      const { errorMessage } = action;
      return {
        ...state,
        isFetching: false,
        errorMessage,
      };
    default:
      return state;
  }
};
