import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound(); // 404 page should be shown if user is not found
}

async function Username() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const user = await getUser();
  return <h1>Welcome! {user?.username}!</h1>;
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    // 로그아웃 처리를 use server로 별도로 처리한 이유는 서버에서만 가능한 세션 파괴 작업을 안전하게 처리하기 위함
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div>
      <Suspense fallback={"Welcome!"}>
        <Username />
      </Suspense>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
