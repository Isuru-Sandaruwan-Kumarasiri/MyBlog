import { useContext, useState } from "react";
import { UserContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BlogContext } from "../Pages/BlogPage";

const CommentField = ({ action }) => {
  let {
    blog,
    blog: {
      _id,
      author: { _id: blog_author },
      commentss,
      activity,
      activity: { total_comments, total_parent_comments },
    },
    setBlog,
    setTotalParentCommentsLoaded
  } = useContext(BlogContext); //author:{_id:blog_author}} rename _id to blog_author

  let {
    userAuth: { access_token, username, fullname, profile_img },
  } = useContext(UserContext);

  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (!access_token) {
      return toast.error("Login first to leave a comment.");
    }

    if (!comment.length) {
      return toast.error("Write something to leave a comment...");
    }

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/add-comment",
        {
          _id,
          blog_author,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        //console.log(data);
        setComment("");
        data.commented_by = {
          personal_info: { username, profile_img, fullname },
        };

        let newCommentArr;

        data.childrenLevel = 0;

        newCommentArr = [data];

        let parentCommentIncrement = 1;

        setBlog({
          ...blog,
          commentss: { ...commentss, results: newCommentArr },
          activity: {
            ...activity,
            total_comments: total_comments + 1,
            total_parent_comments:
              total_parent_comments + parentCommentIncrement,
          },
        });

        setTotalParentCommentsLoaded(preVal=>!preVal +
            parentCommentIncrement
        )
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Toaster />
      <textarea
        name=""
        id=""
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Leave a comment..."
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto "
      ></textarea>

      <button className="btn-dark mt-5 px-10" onClick={handleComment}>
        {action}
      </button>
    </>
  );
};
export default CommentField;
