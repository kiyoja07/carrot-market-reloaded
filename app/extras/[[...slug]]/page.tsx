// [...folderName] : Catch-all Segments
// [[...folderName]] : Optional Catch-all Segments

import HackedComponent from "@/components/hacked-component";
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";
import { revalidatePath } from "next/cache";

async function getFetchedData() {
  const data = await fetch(
    "https://nomad-movies.nomadcoders.workers.dev/movies"
  );
}

async function getData() {
  const keys = {
    apiKey: "11191119",
    secret: "10101001",
  };
  // experimental_taintObjectReference("API Keys were leaked!!!", keys);
  experimental_taintUniqueValue("Secret key was exposed", keys, keys.secret); // keys.secret가 클라이언트 컴포넌트에 전달되는 것을 방지
  return keys;
}

export default async function Extras({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log(params);
  const data = await getData();
  const action = async () => {
    "use server";
    revalidatePath("/extras");
  };
  return (
    <div className="flex flex-col gap-3 py-10">
      <h1 className="text-6xl font-metallica">Extras!</h1>
      <h2 className="font-roboto">So much more to learn!</h2>
      <h2 className="font-rubick">So much more to learn!</h2>
      <h2>So much more to learn!</h2>
      <form action={action}>
        <button>revalidate</button>
      </form>
      {/* <HackedComponent data={data} /> */}
    </div>
  );
}
