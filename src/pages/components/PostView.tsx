import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { RouterOutputs } from "~/utils/api";
import ProfileImage from "./ProfileImage";

type Post = RouterOutputs["post"]["getAll"][number];

const PostView = (props: { post: Post }) => {
  dayjs.extend(relativeTime);

  const { post } = props;

  if (post?.author?.image === null) {
    return <div>error!</div>;
  }

  return (
    <li className="flex items-center gap-4 border border-slate-200 p-8">
      <ProfileImage src={`${post.author?.image}`} size={56} />
      <div>
        <p className="flex gap-[5px] text-sm text-slate-500 ">
          <span className="cursor-pointer hover:text-black hover:underline">
            <Link
              href={{
                pathname: "/user/[...id]",
                query: { id: post.author?.id },
              }}
            >
              {`@${post.author?.name}`}{" "}
            </Link>
          </span>
          <span>·</span>
          <span>{dayjs(post.post.createdAt).fromNow()}</span>
        </p>
        <h2 className="text-xl">{post.post.content}</h2>
      </div>
    </li>
  );
};

export default PostView;
