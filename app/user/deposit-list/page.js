import { connectDB } from "@/util/db";

import Listitem from "./listitem";
import Search from "./search";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function List(req, res) {
  let session = await getServerSession(authOptions);
  let paramsData = req.searchParams;
  let end_date, start_date, option, search;
  const now = new Date();
  const GMTNow = now.getTime();
  const KoreaTimeDiff = 9 * 60 * 60 * 1000;
  if ((paramsData.end_date == "") | !paramsData.end_date) {
    end_date = new Date(GMTNow + KoreaTimeDiff);
    paramsData.end_date = end_date.toISOString().substring(0, 10);
  } else {
    end_date = new Date(paramsData.end_date);
  }
  if ((paramsData.start_date == "") | !paramsData.start_date) {
    start_date = new Date(GMTNow + KoreaTimeDiff);
    start_date.setFullYear(start_date.getFullYear() - 1);
    start_date.setDate(start_date.getDate() + 1);
    paramsData.start_date = start_date.toISOString().substring(0, 10);
  } else {
    start_date = new Date(paramsData.start_date);
  }

  const db = (await connectDB).db("top");
  let depositOrders = await db
    .collection("deposit")
    .find({
      $and: [
        {
          $or: [
            {
              processing_date: {
                $gte: start_date,
                $lte: end_date,
              },
            },
            {
              request_date: {
                $gte: start_date,
                $lte: end_date,
              },
            },
          ],
        },
        {
          email: session.user.email,
        },
      ],
    })
    .sort({ _id: -1 })
    .toArray();
  depositOrders._id = String(depositOrders._id);
  const data = JSON.stringify(depositOrders);

  return (
    <>
      <Search paramsData={paramsData}></Search>
      <Listitem depositOrders={data}></Listitem>
    </>
  );
}
