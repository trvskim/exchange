import Link from "next/link";
import LoginBtn from "../LoginBtn";
import LogoutBtn from "../LogoutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/db";
import React from "react";
import { useRouter } from "next/navigation";

// export default function DashboardLayout({children,}: {children: React.ReactNode;}) {
//   return <section>{children}</section>;
// }

export default async function AdminLayout({ children }) {
  let session = await getServerSession(authOptions);
  let user;
  if (session) {
    const db = (await connectDB).db("top");
    user = await db
      .collection("user_cred")
      .findOne({ email: session.user.email });
    user.balance = user.balance
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
  }

  return (
    <>
      <div className="navbar">
        <div className="logo_area">
          <Link href="/" className="logo">
            TopLogo
          </Link>
        </div>
        <div className="menu_wrap">
          <div className="user_area">
            <div>
              {session ? <span>{user.personal.name}</span> : ""}
              {session ? <LogoutBtn></LogoutBtn> : <LoginBtn></LoginBtn>}
            </div>
            <div>{session ? <span>보유원화 : {user.balance}₩</span> : ""}</div>
          </div>
          <div className="nav_area">
            <AdminList />
          </div>
        </div>
      </div>
      <div className="container">{children}</div>
    </>
  );
}

function AdminList() {
  return (
    <ul>
      <li>
        <Link href="/admin/user">회원 정보</Link>
      </li>
      <li>
        <Link href="/admin/deposit">입금 신청 목록</Link>
      </li>
      <li>
        <Link href="/admin/swap">스왑 신청 목록</Link>
      </li>
    </ul>
  );
}
