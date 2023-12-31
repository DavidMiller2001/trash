import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

import { useState } from "react";

import { api } from "~/utils/api";
import Spinner from "~/components/Spinner";

import PostView from "~/components/PostView";
import ProfileImage from "~/components/ProfileImage";

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
  const utils = api.useUtils();
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      void utils.invalidate();
      setPostText("");
    },
  });
  const { user } = props;
  const [postText, setPostText] = useState("");

  return (
    <form
      className="small-screen-columns flex justify-between border-b border-slate-600 p-8"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ content: postText });
      }}
    >
      <div className="flex gap-4">
        <ProfileImage size={56} src={`${user.image}`} />

        <input
          type="text"
          placeholder="What is happening!?"
          className="bg-transparent text-xl text-slate-200 outline-none placeholder:text-slate-400"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          disabled={isPosting}
        />
      </div>

      <button className="text-2xl text-white" type="submit">
        Post
      </button>
    </form>
  );
};

const Feed = () => {
  const { data, isLoading } = api.post.getAll.useQuery();
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex h-screen w-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!data) return <div>Something went wrong :/</div>;
  return (
    <ul>
      {data.map((postWithAuthor) => {
        return <PostView key={postWithAuthor.post.id} post={postWithAuthor} />;
      })}
    </ul>
  );
};

export default function Home() {
  const { data: sessionData, status } = useSession();

  return (
    <>
      <Head>
        <title>Trash (Twitter Clone)</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto w-full max-w-screen-sm border-x border-slate-600 text-slate-400">
        {status === "loading" && (
          <div className="flex w-full justify-center p-4">
            <Spinner />
          </div>
        )}
        {status === "unauthenticated" && <SignInComponent />}
        {status === "authenticated" && (
          <CreatePostForm user={sessionData.user} />
        )}
        <Feed />
      </main>
    </>
  );
}
