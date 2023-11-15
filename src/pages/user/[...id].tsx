import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { PostView } from "../components/PostView";
import Link from "next/link";

const User = () => {
  const router = useRouter();
  const id = router.query?.id?.toString() ?? "";

  const { data: user } = api.user.find.useQuery({ id: id });
  const { data: posts } = api.user.getPosts.useQuery({ id: id });

  if (!user) return <div>Sorry :/</div>;

  return (
    <main className="mx-auto w-full max-w-screen-sm border-x border-black bg-gray-100">
      <Link href="/">Back</Link>
      <h1 className="text-center text-xl font-bold">{user?.name}</h1>
      <ul>
        {posts?.map((post) => {
          return <PostView key={post.id} post={{ post: post, author: user }} />;
        })}
      </ul>
    </main>
  );
};

export default User;
