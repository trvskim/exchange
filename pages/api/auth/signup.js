import { connectDB } from "@/util/db";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method == "POST") {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let db = (await connectDB).db("top");
    await db.collection("user_cred").insertOne(req.body);
    res.status(200).redirect("/");
  }
}
