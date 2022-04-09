export async function githubGraphQL(query, variables = {}) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}
