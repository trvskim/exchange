import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Form from "./form";
import { redirect } from "next/navigation";

export default async function Deposit() {
  async function swap(formData) {
    "use server";
    let session = await getServerSession(authOptions);
    const db = (await connectDB).db("top");
    let env = await db.collection("env").findOne();
    let user = await db
      .collection("user_cred")
      .findOne({ email: session.user.email });
    if (formData.get("amount") <= user.balance) {
      db.collection("swap").insertOne({
        email: session.user.email,
        name: user.personal.name,
        amount: +formData.get("amount"),
        usdt: Math.floor(formData.get("amount") / env.usdt_price),
        address: formData.get("address"),
        status: "pending",
        request_date: new Date(),
      });
      let result = user.balance - formData.get("amount");
      console.log(result);
      await db
        .collection("user_cred")
        .updateOne(
          { email: session.user.email },
          { $set: { balance: result } }
        );
      redirect("/");
    }
  }
  let session = await getServerSession(authOptions);

  if (!session) {
    return <div>로그인하세요</div>;
  }

  const db = (await connectDB).db("top");
  let user = await db
    .collection("user_cred")
    .findOne({ email: session.user.email });
  let env = await db.collection("env").findOne();

  return (
    <div className="content_wrap">
      <h2>테더 스왑 신청</h2>
      <div className="form_wrap">
        <p>모든 투자의 책임은 고객 본인에게 있습니다.</p>
        <p>SAMPLE EXCHANGE는 P2P USDT 거래 중개 플랫폼입니다. </p>
        <p>투자처와 관련 없는 곳임을 다시 한번 말씀드립니다.</p>
        <p>USDT 수령 후 은행 계좌 관련 업무 방해 확인 시</p>
        <p>즉각적인 민형사상 법적조치로 강경대응 중에 있습니다.</p>
      </div>
      <div className="form_wrap">
        <h4>
          본인 지갑 주소 입력 권고
          <br />
          현재 USDT 가격 : {env.usdt_price}원 <br />
          최대 구매 가능 :{Math.floor(user.balance / env.usdt_price)}USDT
        </h4>
        <h5>주소 오입력으로 인한 오송금에 주의하세요.</h5>
        <Form swap={swap} usdt_price={env.usdt_price}></Form>
      </div>
    </div>
  );
}
