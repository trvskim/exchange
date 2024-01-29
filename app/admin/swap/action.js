"use server";

import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function denyDeposit(depositId) {
  let db = (await connectDB).db("top");
  await db.collection("swap").updateOne(
    { _id: new ObjectId(depositId) },
    {
      $set: { status: "denied", processing_date: new Date() },
    }
  );
  revalidatePath("/admin/swap");
}
