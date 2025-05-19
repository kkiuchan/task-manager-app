const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Categoryのシード
  const categories = await prisma.category.createMany({
    data: [{ name: "仕事" }, { name: "プライベート" }, { name: "学習" }],
  });

  // CategoryのIDを取得（createManyはIDを返さないのでfindManyで取得）
  const allCategories = await prisma.category.findMany();

  // Taskのシード
  await prisma.task.createMany({
    data: [
      {
        title: "会議資料作成",
        description: "明日の会議用の資料を作成する",
        dueDate: new Date("2025-05-20"),
        categoryId: allCategories.find((c) => c.name === "仕事")?.id,
        completed: false,
      },
      {
        title: "買い物",
        description: "スーパーで食材を買う",
        dueDate: new Date("2025-05-18"),
        categoryId: allCategories.find((c) => c.name === "プライベート")?.id,
        completed: false,
      },
      {
        title: "Prismaの勉強",
        description: "Prismaの公式ドキュメントを読む",
        dueDate: new Date("2025-05-25"),
        categoryId: allCategories.find((c) => c.name === "学習")?.id,
        completed: false,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
