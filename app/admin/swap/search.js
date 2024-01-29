"use client";

import { useState } from "react";

export default function Search(props) {
  let [startDate, setStartDate] = useState(props.paramsData.start_date);
  let [endDate, setEndDate] = useState(props.paramsData.end_date);
  let [search, setSearch] = useState(props.paramsData.search);
  let [option, setOption] = useState(props.paramsData.option);
  return (
    <div className="search_wrap">
      <h2>검색</h2>
      <form action="/admin/deposit" method="get">
        <span>날짜 지정 </span>
        <input
          type="date"
          name="start_date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        -
        <input
          type="date"
          name="end_date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
        <input
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <select
          name="option"
          value={option}
          onChange={(e) => {
            setOption(e.target.value);
          }}
        >
          <option value={"holder"}>입금자명으로 검색</option>
          <option value={"order-id"}>주문번호로 검색</option>
          <option value={"email"}>이메일로 검색</option>
        </select>
        <button>🔍</button>
        <button
          type="button"
          onClick={(e) => {
            location.href = "/admin/deposit?";
          }}
        >
          🔄
        </button>
      </form>
    </div>
  );
}
