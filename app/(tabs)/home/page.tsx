import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import Link from "next/link";

// unstable_cache실행시 일어나는일
// 첫 호출에서는 그냥 이전 코드와 똑같이 action함수가 실행됨. db에 요청을 보내고 결과를 반환함.
// 하지만 데이터가 메모리에 캐싱됨
// 이후에 다시 unstable_cache 함수가 호출되면,db와의 통신을 하지않음. 첫번째 호출에서 캐시된 데이터를 반환함.
// 연산 처리가 많은 함수를 캐싱하면 성능이 향상됨.

// revalidatePath("/home"); // /home의 모든 캐시를 새로고침

// fetch("https://api.com", {
//   next: {
//     revalidate: 60,
//     tags: ["hello"],
//   },
// });

// const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
//   revalidate: 600,
//   tags: ["product", "list"],
// });
// home-products 이름을 가진 캐시를 사용하여 600초 이후의 request에 대해 캐시 업데이트.
// 캐기사 product, list 태그를 가지고 revalidateTag()로 캐시 업데이트.

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: "Home",
};

//export const dynamic = "force-dynamic"; // 강제로 dynamic하게 설정, 기본값은 auto : 최대한 많이 캐싱
// export const revalidate = 60; // 60초가 지난 request에 대해 재실행

export default async function Products() {
  const initialProducts = await getInitialProducts();
  // const revalidate = async () => {
  //   "use server";
  //   revalidatePath("/home"); // /home의 모든 캐시를 새로고침
  // };
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
