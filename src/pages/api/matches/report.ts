import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { updateElo } from "../../../lib/elo";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { gameId, winnerId, loserId } = req.body;
  if (!gameId || !winnerId || !loserId) return res.status(400).json({ error: "Missing data" });

  try {
    const winnerEntry = await prisma.ladderEntry.findUnique({
      where: { userId_gameId: { userId: winnerId, gameId } },
    });
    const loserEntry = await prisma.ladderEntry.findUnique({
      where: { userId_gameId: { userId: loserId, gameId } },
    });

    if (!winnerEntry || !loserEntry) return res.status(404).json({ error: "User not in ladder" });

    const { newA, newB } = updateElo(winnerEntry.elo, loserEntry.elo, 1);

    await prisma.matchReport.create({
      data: {
        gameId,
        winnerId,
        loserId,
        winnerElo: newA,
        loserElo: newB,
      },
    });

    await prisma.ladderEntry.update({
      where: { id: winnerEntry.id },
      data: { elo: newA, wins: { increment: 1 } },
    });

    await prisma.ladderEntry.update({
      where: { id: loserEntry.id },
      data: { elo: newB, losses: { increment: 1 } },
    });

    return res.status(200).json({ message: "Match reported" });
  } catch (error) {
    return res.status(500).json({ error: "Internal error" });
  }
}
