import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllPosts, getPaginatedPosts } from "../apis/post";
import { Link } from "react-router-dom";
import { useState } from "react";

const Posts = () => {
 
  const [page,setPage]=useState(0);

  // const { status, isPending, data, error, isError } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getAllPosts,
  //   //gcTime: 1000,
  //   //staleTime: 5000,
  //   //refetchInterval:1000,w
  //   //retchIntervalInBackground:true
  // });


  const {data,isPending,error,isError}=useQuery({
    queryKey:['posts',page],
    queryFn:()=>getPaginatedPosts(page),
    placeholderData:keepPreviousData
  })

  return (
    <>
      <div className="m-5">
        {data?.map((post) => (
          <Link to={`/posts/${post?.id}`} key={post?.id} className="block mb-5 last:mb-0">
            <div
              className="bg-gray-50 p-4 rounded-xl border border-gray-200 "
            >
              <div className="border-b border-b-gray-200 pb-3">
                <h2 className="text-2xl font-bold text-gray-700 capitalize">
                  ID:{post?.id}<br/> {post?.title}
                </h2>
              </div>
              <div className="pt-4 text-gray-600">
                <p>{post?.body}</p>
              </div>
            </div>
          </Link>
        ))}

        {/* button section */}
        <div className="flex gap-2">
          <button 
          disabled={page===0?true:false}
          onClick={()=>setPage((prev)=>Math.max(prev-5,0))}
          className="bg-gray-900 text-white font-semibold rounded-full px-6 py-1 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer">Prev</button>
          <span className="bg-gray-900 text-white font-semibold rounded-full px-6 py-1">{(page/5)+1}</span>
          <button 
          onClick={()=>setPage((prev)=>Math.max(prev+5,5))}
          className="bg-gray-900 text-white font-semibold rounded-full px-6 py-1 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer">Next</button>
        </div>
      </div>
    </>
  );
};

export default Posts;
