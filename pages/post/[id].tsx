import { ReactElement } from "react";
import Layout from "../../components/layout";
import { PrismaClient } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { format } from "date-fns";
const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const { id } = context.query;
  var post = await prisma.post.findFirst({ where: { id: parseInt(id[0]) } });
  post.content = post.content?.replaceAll("\\n", "\n");
  const postedAt = format(post.createdAt, "dd MMM yyyy");
  delete post.createdAt;

  return {
    props: {
      post: post,
      postedAt: postedAt,
    },
  };
}

export default function Page({ post, postedAt }) {
  return (
    <div className="px-20 py-8 bg-white">
      <article className="flex flex-col w-full p-8 text-2xl font-semibold bg-indigo-200 rounded-lg shadow-lg ">
        <div className="flex flex-col m-1 overflow-hidden bg-white shadow-sm rounded-xl">
          <div className="p-2 text-white bg-indigo-700 w-fit">
            <span>{postedAt}</span>
          </div>
          <div className="px-2 prose prose-headings:m-2 ">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              children={post.content}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
