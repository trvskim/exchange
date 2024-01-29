import { connectDB } from "@/util/db";

export default async function Uploadpost(req, res) {
  if (req.method == "POST") {
    const db = (await connectDB).db("top");
    const post = req.body;
    if (!post.title || !post.content) {
      return res.status(400);
    }
    await db
      .collection("post")
      .insertOne({ title: post.title, content: post.content });
    res.status(200).redirect("/list");
  }
}
