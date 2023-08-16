import * as api from '../api';
export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
  
      dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  }
  export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
      dispatch({ type: 'CREATE', payload: data });
      return data; // Return the created post data from the server response
    } catch (error) {
      console.log(error.message);
    }
  };