// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { githubGraphQL } from "../../lib/graphql";
import { PrismaClient } from "@prisma/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  //console.log(req.body);
  const login = req.body.repository.owner.login;
  const repository = req.body.repository.name;
  githubGraphQL(query, { login: login, repository: repository }).then(
    (response) => {
      const nodes =
        response.data.user.repository.defaultBranchRef.target.history.nodes;

      nodes.forEach((node) => {
        const entries = node.tree.entries;
        entries.forEach((entry) => {
          const newName = entry.name;
          const newPath = entry.path;
          const newContent = entry.object.text;

          const post = prisma.post.upsert({
            where: { path: newPath },
            update: { name: newName, content: newContent },
            create: { name: newName, path: newPath, content: newContent },
          });

          post
            .then((post) => console.log(post))
            .catch((e) => console.error(e.message))
            .finally(() => {
              console.log(`Upserted ${newPath}`);
            });
        });
      });
    }
  );
  res.status(200).json({ status: "success" });
}
const gql = String.raw;
export const query = gql`
  query RepositoriesForUser($login: String!, $repository: String!) {
    user(login: $login) {
      repository(name: $repository) {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 1) {
                nodes {
                  tree {
                    entries {
                      name
                      path
                      object {
                        ... on Blob {
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
