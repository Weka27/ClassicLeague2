import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { game } = req.query;

  if (req.method === "GET") {
    const ladder = await prisma.ladderEntry.findMany({
      where: { game: { name: String(game) } },
      orderBy: { elo: "desc" },
      include: { user: true },
    });
    return res.status(200).json(ladder);
  }

  res.status(405).end();
}
