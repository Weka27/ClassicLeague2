import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Spiele anlegen
  const cs16 = await prisma.game.upsert({
    where: { name: "CS 1.6" },
    update: {},
    create: { name: "CS 1.6" },
  });
  const wc3 = await prisma.game.upsert({
    where: { name: "Warcraft 3" },
    update: {},
    create: { name: "Warcraft 3" },
  });
  const sc2 = await prisma.game.upsert({
    where: { name: "Starcraft 2" },
    update: {},
    create: { name: "Starcraft 2" },
  });

  // Beispiel User anlegen
  const alice = await prisma.user.upsert({
    where: { email: "alice@test.com" },
    update: {},
    create: {
      email: "alice@test.com",
      name: "Alice",
      password: await bcrypt.hash("test123", 10),
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@test.com" },
    update: {},
    create: {
      email: "bob@test.com",
      name: "Bob",
      password: await bcrypt.hash("test123", 10),
    },
  });

  // Clans anlegen
  const clanA = await prisma.clan.upsert({
    where: { tag: "ABC" },
    update: {},
    create: {
      name: "Alpha Bravo Clan",
      tag: "ABC",
      description: "Ein Beispiel Clan für CS 1.6",
    },
  });

  // Clan Mitgliedschaft anlegen
  await prisma.clanMember.upsert({
    where: { userId_clanId: { userId: alice.id, clanId: clanA.id } },
    update: {},
    create: {
      userId: alice.id,
      clanId: clanA.id,
      role: "leader",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
