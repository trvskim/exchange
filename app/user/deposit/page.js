import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/db";
import { getServerSession } from "next-auth";

export default async function Deposit() {
  let session = await getServerSession(authOptions);

  if (!session) {
    return <div>로그인하세요</div>;
  }

  const db = (await connectDB).db("top");
  let user = await db
    .collection("user_cred")
    .findOne({ email: session.user.email });

  return (
    <div className="content_wrap">
      <h2>원화 입금 신청</h2>
      <div className="form_wrap">
        <p>모든 투자의 책임은 고객 본인에게 있습니다.</p>
        <p>SAMPLE EXCHANGE는 P2P USDT 거래 중개 플랫폼입니다. </p>
        <p>투자처와 관련 없는 곳임을 다시 한번 말씀드립니다.</p>
        <p>USDT 수령 후 은행 계좌 관련 업무 방해 확인 시</p>
        <p>즉각적인 민형사상 법적조치로 강경대응 중에 있습니다.</p>
      </div>
      <div className="form_wrap">
        <h4>케이뱅크 1234-1234-123456 홍길동</h4>
        <h5>
          가입자 본인 {user.personal.name}님의 계좌로만 입금 가능합니다.
          <br />
          다른 통장에서 입금자명 변경하여 이체시 처리되지 않습니다.
        </h5>
        <form action="/api/deposit" method="POST">
          <div>
            <input placeholder="입금액" name="amount"></input>
          </div>
          <button type="submit">입금 신청</button>
        </form>
      </div>
    </div>
  );
}
