import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../apis/post";
import { useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const navigate=useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post_details",id],
    queryFn: () => getPostById(id),
  });
  if (isPending) return <p>Loding</p>;
  if (isError)
    return <p>|Error : {error?.message || "Something went wrong."}</p>;
  return (
    <>
      <div className="m-5 ">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-5 last:mb-0">
          <div className="border-b border-b-gray-200 pb-3">
            <h2 className="text-2xl font-bold text-gray-700 capitalize">
              ID:{data?.id} <br />{data?.title}
            </h2>
          </div>
          <div className="pt-4 text-gray-600">
            <p>{data?.body}</p>
            <div className="mt-5">
                <button
                onClick={()=>navigate(-1)} 
                className="bg-gray-900 text-white px-5 py-3 font-semibold cursor-pointer rounded-full hover:bg-gray-800 transition-all active:scale-95">Go Back</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
