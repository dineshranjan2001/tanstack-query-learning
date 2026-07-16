import axios from "axios";
import { BASE_URL } from "./baseurl";

const getAllPosts = async () => {
  const getAllPosts = await axios.get(`${BASE_URL}/posts`);
  return getAllPosts.data;
};

const getPaginatedPosts = async (page) => {
  const getPaginatedPosts = await axios.get(`${BASE_URL}/posts?_start=${page}&_limit=5`);
  return getPaginatedPosts.data;
};

const getPostById = async (postId) => {
  const getPostDetails = await axios.get(`${BASE_URL}/posts/${postId}`);
  return getPostDetails.data;
};

const deletePostById=async(postId)=>{
    console.log("post id ",postId);
    const deletedPostData=await axios.delete(`${BASE_URL}/posts/${postId}`);
    return deletedPostData.data;
}
export { getAllPosts, getPostById ,getPaginatedPosts,deletePostById};
