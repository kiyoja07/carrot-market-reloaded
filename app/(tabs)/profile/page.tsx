import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

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
      <h1>Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
