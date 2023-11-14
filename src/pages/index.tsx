import { TRPCError } from "@trpc/server";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { RouterOutputs, api } from "~/utils/api";

const SignInComponent = () => {
  return <button onClick={() => signIn()}>Sign In</button>;
};

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} & {
  id: string;
};

const CreatePostForm = (props: { user: User }) => {
  const { user } = props;
  return (
    <form className="flex gap-4 border border-slate-200 p-8">
      <img
        src={`${user.image}`}
        alt="Profile Picture"
        className="aspect-square w-14 rounded-full"
      />
      <input
        type="text"
        placeholder="What is happening!?"
        className="bg-transparent text-xl outline-none"
      />
    </form>
  );
};

type Post = RouterOutputs["post"]["getAll"][number];

const PostView = (props: { post: Post }) => {
  const { post } = props;
  if (!post.author || !post.author.image)
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

  return (
    <li
      key={post.post.id}
      className="flex items-center gap-4 border border-slate-200 p-8"
    >
      <img
        src={post.author.image}
        alt="Profile Picture"
        className="aspect-square w-14 rounded-full"
      />
      <h2 className="text-xl">{post.post.content}</h2>
    </li>
  );
};

export default function Home() {
  const { data, isLoading } = api.post.getAll.useQuery();
  const { data: sessionData } = useSession();

  console.log(data);

  sessionData?.user;

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!data) {
    return <div>Something went wrong :/</div>;
  }

  return (
    <>
      <Head>
        <title>Trash (Twitter Clone)</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto w-full max-w-screen-sm border-x border-black bg-gray-100">
        {!sessionData && <SignInComponent />}
        {!!sessionData && <CreatePostForm user={sessionData.user} />}
        <ul>
          {data.map((postWithAuthor) => {
            return <PostView post={postWithAuthor} />;
          })}
        </ul>
      </main>
    </>
  );
}
