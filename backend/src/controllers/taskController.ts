import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { category, completed, sort, order, search } = req.query;
    const where: any = {};
    if (category === "none") {
      where.categoryId = null;
    } else if (category) {
      where.category = { name: category as string };
    }
    if (completed) {
      where.completed = completed === "true";
    }
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { description: { contains: search as string } },
      ];
    }
    const tasks = await prisma.task.findMany({
      where,
      include: { category: true },
      orderBy: {
        ...(sort === "dueDate"
          ? { dueDate: order === "asc" ? "asc" : "desc" }
          : {}),
        ...(sort === "createdAt"
          ? { createdAt: order === "asc" ? "asc" : "desc" }
          : {}),
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "タスクの取得に失敗しました" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, categoryId } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        ...(categoryId ? { categoryId } : null),
      },
      include: { category: true },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "タスクの作成に失敗しました" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, category, completed } = req.body;

    const data: {
      title?: string;
      description?: string;
      dueDate?: Date;
      category?: { connect: { id: number } } | { disconnect: true };
      completed?: boolean;
    } = {};

    if (title) data.title = title;
    if (description) data.description = description;
    if (dueDate) data.dueDate = new Date(dueDate);
    if (completed !== undefined) data.completed = completed;

    // カテゴリの紐付け・解除
    if (category) {
      if (category.id) {
        data.category = { connect: { id: category.id } };
      } else {
        data.category = { disconnect: true };
      }
    }
    // カテゴリ情報がない場合は既存のカテゴリを維持

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data,
      include: { category: true },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "タスクの更新に失敗しました" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "タスクを削除しました" });
  } catch (error) {
    res.status(500).json({ error: "タスクの削除に失敗しました" });
  }
};
