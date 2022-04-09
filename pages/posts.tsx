import type { NextPage } from "next";
import { ReactElement, useState } from "react";
import Layout from "../components/layout";
import { PrismaClient } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { format } from "date-fns";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  var posts = await prisma.post.findMany({ take: 4, orderBy: { id: "desc" } });
  var postDates = [];
  posts.forEach((post) => {
    post.content = post.content?.replaceAll("\\n", "\n") || "";
    postDates[post.id] = format(post.createdAt, "dd MMM yyyy");
    delete post.createdAt;
  });
  return {
    props: {
      posts: posts,
      postDates: postDates,
    },
  };
}

export default function Page({ posts, postDates }) {
  console.log(postDates);
  return (
    <div className="px-20 py-8 bg-white">
      <div className="flex flex-col w-full p-8 text-2xl font-semibold bg-indigo-200 divide-y rounded-lg shadow-lg divide-indigo-100/50">
        {posts.map((post) => (
          <div className="flex flex-col m-1 overflow-hidden bg-white shadow-sm rounded-xl">
            <div className="p-2 text-white bg-indigo-700 w-fit">
              <span>{postDates[post.id]}</span>
            </div>

            <ReactMarkdown
              className="p-4 prose prose-headings:m-0"
              rehypePlugins={[rehypeRaw]}
              children={truncate(post.content, 200, true)}
            />

            <div className="w-full py-2 text-center border-t-2 border-indigo-500 rounded-b-lg shadow-md shadow-indigo-400">
              <Link key={post.id} href={`/post/${post.id}`}>
                <a>
                  <span>Read more</span>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

function truncate(str, n, useWordBoundary) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.substr(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  );
}
