import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import db from "./db";

interface SessionContent {
  id?: number;
}

// 쿠키를 암호화 하기 위해 getIronSession 함수를 사용
export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  });
}

// 사용자 정보(id) 가져오기
export const getUserProfile = async () => {
  const session = await getSession(); // 복호화 된 쿠키 반환
  const user = session.id
    ? await db.user.findUnique({
        where: { id: session.id },
        select: { id: true, username: true, avatar: true },
      })
    : null;
  return user ? user : notFound(); // 확인된 사용자 정보 없다면 404 처리
};

export const getSessionId = async () => {
  const session = await getSession(); // 복호화 된 쿠키 반환
  return session.id;
};

// 사용자 정보(id) 가져오기
export const getUser = async () => {
  const session = await getSession(); // 복호화 된 쿠키 반환
  const user = session.id
    ? await db.user.findUnique({ where: { id: session.id } })
    : null;
  return user ? user : notFound(); // 확인된 사용자 정보 없다면 404 처리
};

// 로그아웃 - 쿠키에서 사용자 정보 제거
export const logout = async () => {
  "use server";
  const session = await getSession();
  session.destroy(); // 쿠키 제거
  redirect("/");
};
