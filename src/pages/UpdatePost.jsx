import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../apis/post";

const UpdatePost = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    id: "",
    title: "",
    body: "",
  });

  // fetch the data
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post_details", id],
    queryFn: () => getPostById(id),
  });

  //Populate form once data is fetched
  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);


  

  const updatePostMutation = useMutation({
    mutationFn: ({ postId, postData }) => updatePost(postId, postData),
    onSuccess: (successData, variables) => {
      queryClient.setQueryData(
        ["post_details", variables?.postId],
        successData,
      );

      // Refetch all posts queries
      //   queryClient.invalidateQueries({
      //     queryKey: ["posts"],
      //   });

      queryClient.setQueriesData({ queryKey: ["posts"] }, (oldPosts) => {
        if (!oldPosts) return oldPosts;

        return oldPosts.map((post) =>
          post.id === successData.id ? { ...post, ...successData } : post,
        );
      });

      navigate("/posts");
    },
  });

  if (isPending) return <p>Loding...</p>;
  if (isError) return <p>{`${error?.message}|| Something went wrong.`}</p>;

  const handleUpdate = (e) => {
    e.preventDefault();
    updatePostMutation.mutate({ postId: id, postData });
  };
  return (
    <>
      <div className="flex justify-center items-center my-10">
        <form
          onSubmit={handleUpdate}
          className="bg-gray-50 border border-gray-200 px-8 py-8 rounded-2xl w-xl"
        >
          <div className="border-b border-b-gray-200 pb-2">
            <h4 className="text-2xl font-semibold text-gray-600">
              Update Post Details
            </h4>
          </div>
          <div className="flex flex-col mt-2">
            <label
              htmlFor="post-id"
              className="text-lg font-semibold text-gray-600"
            >
              Post Id
            </label>
            <input
              type="text"
              id="post-id"
              disabled={true}
              value={postData?.id}
              className="border border-gray-200 rounded-xl p-2 outline-0 focus:border-gray-300 transition-all"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label
              htmlFor="post-title"
              className="text-lg font-semibold text-gray-600"
            >
              Post Title
            </label>
            <input
              type="text"
              id="post-title"
              value={postData?.title}
              onChange={(e) =>
                setPostData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="border border-gray-200 rounded-xl p-2 outline-0 focus:border-gray-300 transition-all"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label
              htmlFor="post-desc"
              className="text-lg font-semibold text-gray-600"
            >
              Post Description
            </label>
            <textarea
              id="post-desc"
              value={postData?.body}
              onChange={(e) =>
                setPostData((prev) => ({ ...prev, body: e.target.value }))
              }
              className="border border-gray-200 rounded-xl px-2 py-4 outline-0 focus:border-gray-300 transition-all"
            />
          </div>
          <div>
            <button
              disabled={updatePostMutation.isPending}
              className="mt-5 bg-gray-900 text-white font-semibold rounded-full px-6 py-1 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
            >
              {updatePostMutation.isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
