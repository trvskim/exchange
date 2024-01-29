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
