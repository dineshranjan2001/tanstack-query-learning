import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePostById, getAllPosts, getPaginatedPosts } from "../apis/post";
import { Link } from "react-router-dom";
import { useState } from "react";

const Posts = () => {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  // without pagination
  // const { status, isPending, data, error, isError } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getAllPosts,
  //   //gcTime: 1000,
  //   //staleTime: 5000,
  //   //refetchInterval:1000,w
  //   //retchIntervalInBackground:true
  // });

  // with pagination
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPaginatedPosts(page),
    placeholderData: keepPreviousData,
  });

  //delete api
  const deleteMutation = useMutation({
    // 1st way
    mutationFn: (postId) => deletePostById(postId),
    onSuccess: (successData, id) => {
      queryClient.setQueryData(["posts", page], (currentItem) => {
        return currentItem.filter((post) => post?.id !== id);
      });
    },

    // 2nd way
    // mutationFn: deletePostById,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["posts",page] });
    // },
  });

  if (isPending) return <p>Loding</p>;
  if (isError) return <p>Error: {error?.message || "Something went wrong."}</p>;

  return (
    <>
      <div className="m-5">
        {data?.map((post) => (
          <div
            className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-5 last:mb-0"
            key={post?.id}
          >
            <Link to={`/posts/${post?.id}`} className="block ">
              <div className="border-b border-b-gray-200 pb-3">
                <h2 className="text-2xl font-bold text-gray-700 capitalize">
                  ID:{post?.id}
                  <br /> {post?.title}
                </h2>
              </div>
              <div className="pt-4 text-gray-600">
                <p>{post?.body}</p>
              </div>
            </Link>
            <div>
              <button
                onClick={() => deleteMutation.mutate(post?.id)}
                className="mt-5 bg-gray-900 text-white font-semibold rounded-full px-6 py-1 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* button section */}
        <div className="flex gap-2 mt-5 justify-end">
          <button
            disabled={page === 0 ? true : false}
            onClick={() => setPage((prev) => Math.max(prev - 5, 0))}
            className="bg-gray-900 text-white font-semibold rounded-full px-6 py-1 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
          >
            Prev
          </button>
          <span className="bg-gray-900 text-white font-semibold rounded-full px-6 py-1">
            {page / 5 + 1}
          </span>
          <button
            onClick={() => setPage((prev) => Math.max(prev + 5, 5))}
            className="bg-gray-900 text-white font-semibold rounded-full px-6 py-1 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Posts;
