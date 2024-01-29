import { connectDB } from "@/util/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    let session = await getServerSession(req, res, authOptions);
    if (session.user.role !== "admin") {
      return res.status(403);
    }
    let db = (await connectDB).db("top");
    const depositOrderId = req.body.id;
    let depositOrder = await db
      .collection("deposit")
      .find({ _id: new ObjectId(depositOrderId) })
      .toArray();
    let orderOwner = await db
      .collection("user_cred")
      .find({ email: depositOrder[0].email })
      .toArray();
    let result = await db.collection("user_cred").updateOne(
      { email: depositOrder[0].email },
      {
        $set: { balance: orderOwner[0].balance + +depositOrder[0].amount },
      }
    );

    result = await db.collection("deposit").updateOne(
      { _id: new ObjectId(depositOrderId) },
      {
        $set: { status: "complete", processing_date: new Date() },
      }
    );
    res.status(200).redirect("/admin/deposit");
  }
}
