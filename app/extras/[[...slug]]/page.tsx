// [...folderName] : Catch-all Segments
// [[...folderName]] : Optional Catch-all Segments

import { revalidatePath } from "next/cache";

async function getData() {
  const data = await fetch(
    "https://nomad-movies.nomadcoders.workers.dev/movies"
  );
}

export default async function Extras({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log(params);
  await getData();
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
    </div>
  );
}