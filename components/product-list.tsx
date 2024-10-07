"use client";

import { InitialProducts } from "@/app/(tabs)/home/page";
import ListProduct from "./list-product";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/home/actions";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null); // re-render해도 useRef은 값은 유지됨
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          // element.isIntersecting는 요소가 보일 때 true
          // trigger.current를 통해 span 요소에 접근한다.
          // trigger가 보일 때
          observer.unobserve(trigger.current); // observer를 해제
          setIsLoading(true); // 로딩 중
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            setProducts((prev) => [...prev, ...newProducts]);
            setPage((prev) => prev + 1); // 페이지 번호 증가 -> useEffect 재실행
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false); // 로딩 완료
        }
      },
      {
        threshold: 1.0, // 1.0이면 전체가 보일 때 콜백이 호출됨
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current); // trigger가 보일 때 observer 실행
    }
    return () => {
      observer.disconnect(); // 컴포넌트가 사라질 때 observer를 해제
    };
  }, [page]);
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {/* {!isLastPage ? (
        <span
          ref={trigger}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null} */}
    </div>
  );
}
