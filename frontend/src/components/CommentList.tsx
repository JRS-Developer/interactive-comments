import CommentItem from "./CommentItem";
import { CommentsData } from "../types/types";

interface Props extends CommentsData {
  isReplyList?: boolean;
}

const CommentList = ({ comments, currentUser, isReplyList }: Props) => {
  const defaultClass = "flex flex-col gap-4";

  const className = isReplyList
    ? `${defaultClass} pl-8 border-l-2 ml-8`
    : defaultClass;

  return (
    <ul className={className}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
    </ul>
  );
};

export default CommentList;