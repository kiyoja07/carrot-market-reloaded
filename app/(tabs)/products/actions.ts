"use server";

import db from "@/lib/db";

export async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 1, // 페이지 번호 * 1 만큼 건너뛰기
    take: 1, // 한 페이지에 1개씩
    orderBy: {
      created_at: "desc", // 최신순
    },
  });
  return products;
}
