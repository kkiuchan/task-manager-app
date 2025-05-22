import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "カテゴリの取得に失敗しました" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "カテゴリの作成に失敗しました" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "カテゴリの更新に失敗しました" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "カテゴリを削除しました" });
  } catch (error) {
    res.status(500).json({ error: "カテゴリの削除に失敗しました" });
  }
};
