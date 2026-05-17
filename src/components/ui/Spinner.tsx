import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
      <Image src={"/logo.png"} alt="Loading" width={500} height={300} />
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-gray-400 border-t-transparent -ml-24"></div>
    </div>
  );
};

export default Spinner;
