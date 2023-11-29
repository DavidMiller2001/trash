import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import ProfileImage from "./ProfileImage";

type Post = RouterOutputs["post"]["getAll"][number];

const PostView = (props: { post: Post }) => {
  dayjs.extend(relativeTime);

  const { post } = props;

  return (
    <li className="flex items-center gap-4 border-b border-slate-600 p-8">
      <ProfileImage src={`${post.author?.image}`} size={56} />
      <div>
        <p className=" flex gap-[5px] text-sm text-slate-400">
          <span className="cursor-pointer hover:text-slate-500">
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
        <h2 className="text-xl text-slate-200">{post.post.content}</h2>
      </div>
    </li>
  );
};

export default PostView;
