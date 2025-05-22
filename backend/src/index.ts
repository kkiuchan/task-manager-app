import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "./routes/taskRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// エラーハンドリングミドルウェア
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "サーバーエラーが発生しました" });
});

// ヘルスチェックエンドポイント
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from backend!" });
});

// タスクAPI
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
