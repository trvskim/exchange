"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { denyDeposit } from "./action";

export default function Listitem({ depositOrders }) {
  depositOrders = JSON.parse(depositOrders);
  return (
    <div>
      {depositOrders.map((order, i) => {
        const p_date = dateFormat(new Date(order.processing_date));
        const q_date = dateFormat(new Date(order.request_date));
        return (
          <div className="list-item" key={i}>
            <h4>{order.email}</h4>
            <p>
              입금신청금액 :{" "}
              {order.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₩
            </p>
            <p>입금자명 : {order.name}</p>
            <p>주문번호 : {order._id}</p>
            <p>
              처리상태 :{" "}
              {order.status == "pending"
                ? "승인 대기 중"
                : order.status == "complete"
                ? "처리 완료"
                : "승인 거절"}
            </p>
            <p>신청일자 : {q_date}</p>
            {order.status == "pending" ? (
              <BtnGroup orderId={order._id} />
            ) : (
              <p>처리일자 : {p_date}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function dateFormat(date) {
  return `${date.getFullYear()}-${"" + date.getMonth() + 1}-${date.getDate()} ${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes()}:${
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  }`;
}

function BtnGroup(props) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={async () => {
          await axios
            .post("/api/confirmDepositOrder", { id: props.orderId })
            .catch((e) => {
              console.log(e);
            });
          router.refresh();
        }}
      >
        승인
      </button>
      <button
        onClick={() => {
          denyDeposit(props.orderId);
        }}
      >
        거절
      </button>
    </>
  );
}
