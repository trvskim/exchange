import { connectDB } from "@/util/db";

export default async function List(req, res) {
  const db = (await connectDB).db("top");
  let posts = await db.collection("post").find().toArray();
  res.status(200).json(posts);
}
