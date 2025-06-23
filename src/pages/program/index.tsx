import { ProgramBanner } from "@/components/ProgramBanner";
import Table from "./Table";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Program = () => {
  const [searchParams] = useSearchParams();
  const initialViewType = (searchParams.get('viewType') === 'clip') ? 'clip' : 'episode';
  const [viewType, setViewType] = useState<'episode' | 'clip'>(initialViewType);

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