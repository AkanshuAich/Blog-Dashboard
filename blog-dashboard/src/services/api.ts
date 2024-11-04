import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = () => axios.get(`${API_URL}/posts`);
export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const fetchComments = (postId: number) => axios.get(`${API_URL}/posts/${postId}/comments`);
export const addComment = (postId: number, name: string, body: string) =>
  axios.post(`${API_URL}/posts/${postId}/comments`, { name, body });
