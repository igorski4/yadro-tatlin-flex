import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

interface DataItem {
  id: number;
}

const app = express();
const host = "127.0.0.1";
const port = 7000;
const filePath = "db.json";

app.use(bodyParser.json());
app.use(cors());

const loadData = <T extends DataItem>(): T[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const saveData = <T extends DataItem>(data: T[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

app.get("/products", (req: Request, res: Response) => {
  const data = loadData<any>();
  res.json(data);
});

app.post("/products", (req: Request, res: Response) => {
  const data = loadData<DataItem>();
  const newItem: DataItem = req.body;

  const arrayId = data.map((item) => item.id);
  const newId = arrayId.length > 0 ? Math.max(...arrayId) + 1 : 1;
  newItem.id = newId;

  data.push(newItem);
  saveData(data);
  res.status(201).json(newItem);
});

app.patch("/products/:id", (req: Request, res: Response) => {
  const data = loadData<DataItem>();
  const updatedItem: DataItem = req.body;

  const itemId = +req.params.id;
  const index = data.findIndex((item: DataItem) => item.id === itemId);
  data[index] = updatedItem;

  saveData(data);
  res.json(updatedItem);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const data = loadData<DataItem>();

  const itemId = +req.params.id;
  const index = data.findIndex((item: DataItem) => item.id === itemId);
  const deletedItem = data.splice(index, 1);

  saveData(data);
  res.json(deletedItem);
});

app.listen(port, host, () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
  }
  console.log(`Server is running on port ${port}`);
});
