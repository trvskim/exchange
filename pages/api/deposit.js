import { connectDB } from "@/util/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function Deposit(req, res) {
  if (req.method == "POST") {
    let session = await getServerSession(req, res, authOptions);
    const db = (await connectDB).db("top");
    const depositOrder = req.body;
    const user = await db
      .collection("user_cred")
      .findOne({ email: session.user.email });
    console.log(user);
    await db.collection("deposit").insertOne({
      email: session.user.email,
      amount: depositOrder.amount,
      name: user.personal.name,
      status: "pending",
      request_date: new Date(),
    });
    res.status(200).redirect("/");
  }
}
