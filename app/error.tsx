"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full flex flex-col space-y-5 max-w-[500px] justify-center items-center m-auto p-10">
      <p> 오류가 발생했습니다. </p>
      <button onClick={() => reset()}> 오류 무시 </button>
    </div>
  );
}
