"use client";

import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}

export function CloseButton() {
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  return (
    <button
      onClick={onCloseClick}
      className="absolute right-5 top-5 text-neutral-200"
    >
      <XMarkIcon className="size-10" />
    </button>
  );
}
