import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const clans = await prisma.clan.findMany({ include: { members: true } });
    return res.status(200).json(clans);
  }

  if (req.method === "POST") {
    const { name, tag, description, userId } = req.body;
    if (!name || !tag || !userId) return res.status(400).json({ error: "Missing fields" });

    try {
      const clan = await prisma.clan.create({
        data: { name, tag, description },
      });
      await prisma.clanMember.create({
        data: { clanId: clan.id, userId, role: "leader" },
      });
      return res.status(201).json(clan);
    } catch (e) {
      return res.status(400).json({ error: "Clan already exists or invalid data" });
    }
  }

  res.status(405).end();
}
