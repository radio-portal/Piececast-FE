import { ProgramBanner } from "@/components/ProgramBanner";
import Table from "./Table";
import { useState } from "react";

const Program = () => {
  const [viewType, setViewType] = useState<'episode' | 'clip'>('episode');

  return (
    <div className="flex flex-col w-full">
        <ProgramBanner viewType={viewType} onViewTypeChange={setViewType} />
        <div className="flex w-full max-w-[1400px] mx-auto flex-col items-center justify-center px-[120px] pt-[60px] pb-[20px]">
          <Table viewType={viewType} />
        </div>
    </div>
  )
}

export default Program;