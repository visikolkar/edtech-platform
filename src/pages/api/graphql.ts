import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://nexus-horizon.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
        },
        body: JSON.stringify(req.body),
      }
    );

    if (!response.ok) throw new Error("Hasura request failed");

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("GraphQL proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
