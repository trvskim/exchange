"use client";
import { useState } from "react";

export default function Form(props) {
  let [usdtAmount, setUsdtAmount] = useState(0);
  return (
    <>
      <form action={props.swap} method="POST">
        <div>
          <input
            placeholder="스왑 금액"
            name="amount"
            onChange={(e) => {
              setUsdtAmount(Math.floor(e.target.value / props.usdt_price));
            }}
          ></input>
          <input placeholder="수령 주소" name="address"></input>
        </div>
        <h3>{usdtAmount} USDT</h3>
        <button type="submit">입금 신청</button>
      </form>
    </>
  );
}
