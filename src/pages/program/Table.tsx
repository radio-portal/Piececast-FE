import { useReactTable, getCoreRowModel, flexRender, createColumnHelper, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { formatDateWithWeekday } from '@/utils/date';
import type { Episode, Clip } from './types';
import { useNavigate } from 'react-router-dom';

const episodeList = [
  {
    id: 1,
    date: "2025-05-25",
    duration: "01:27:12",
  },{
    id: 2,
    date: "2025-05-26",
    duration: "01:34:56",
  },{
    id: 3,
    date: "2025-05-27",
    duration: "01:22:11",
  },{
    id: 4,
    date: "2025-05-28",
    duration: "01:36:43",
  },{
    id: 5,
    date: "2025-05-29",
    duration: "01:27:53",
  },{
    id: 6,
    date: "2025-05-30",
    duration: "01:34:12",
  },
  {
    id: 7,
    date: "2025-05-31",
    duration: "01:44:22",
  },
  {
    id: 8,
    date: "2025-06-01",
    duration: "01:24:21",
  },
  {
    id: 9,
    date: "2025-06-02",
    duration: "01:14:12",
  },
  {
    id: 10,
    date: "2025-06-03",
    duration: "01:32:14",
  },
  {
    id: 11,
    date: "2025-06-04",
    duration: "01:00:00",
  },
  {
    id: 12,
    date: "2025-06-05",
    duration: "01:00:00",
  },
]

const clipList = [
  {
    id: 1,
    date: "2025-05-25",
    title: "이제는 말할 수 있다! 청춘의 끝에서 시작된 진짜 인생",
    duration: "00:14:12",
  },
  {
    id: 2,
    date: "2025-05-25",
    title: "캠퍼스에 이런 일이? 대학생들만 아는 진짜 축제 뒷이야기",
    duration: "00:15:30",
  },
  {
    id: 3,
    date: "2025-05-25",
    title: "졸업생도 몰랐던, 캠퍼스 전설의 비밀장소들...직접 다녀왔습니다",
    duration: "00:12:45",
  },
  {
    id: 4,
    date: "2025-05-25",
    title: "다 포기하고 싶던 순간, 내 인생을 바꾼 한 통의 메시지",
    duration: "00:18:20",
  },
  {
    id: 5,
    date: "2025-05-25",
    title: "썸타던 친구와 최악의 이별...그날 밤 무슨 일이?",
    duration: "00:16:33",
  },
  {
    id: 6,
    date: "2025-05-25",
    title: "첫 사회생활, 내 월급은 왜 이 모양일까? 현실 직장인 생존기",
    duration: "00:19:45",
  },
  {
    id: 7,
    date: "2025-05-25",
    title: "엄마의 진심, 그리고 눈물...가족 대화 중 터진 감동의 한마디",
    duration: "00:17:12",
  },
  {
    id: 8,
    date: "2025-05-25",
    title: "절친과의 싸움, '단톡방' 대참사...이후 우리는 달라졌다",
    duration: "00:15:55",
  },
  {
    id: 9,
    date: "2025-05-26",
    title: "은사님이 내게 건넨 단 한 마디...30년 후에도 잊지 못했다",
    duration: "00:14:30",
  },
  {
    id: 10,
    date: "2025-05-26",
    title: "'취준생의 밤은 길다'...불안과 희망 사이에서 방황하는 청춘",
    duration: "00:16:45",
  },
  {
    id: 11,
    date: "2025-05-26",
    title: "청년이 본 요즘 세상...그날 뉴스에는 없던 진짜 이야기",
    duration: "00:18:20",
  },
  {
    id: 12,
    date: "2025-05-26",
    title: "현실 도피? 도전! 배낭 하나 메고 떠난 예측불허 여행기",
    duration: "00:17:33",
  }
]

const columnHelper = createColumnHelper<Episode | Clip>();

const episodeColumns = [
  columnHelper.accessor('id', {
    header: '번호',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: '날짜',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('date', {
    id: 'title',
    header: '제목',
    cell: info => (
      <div className="text-left font-semibold">
        {`${formatDateWithWeekday(info.getValue())} 방송`}
      </div>
    ),
  }),
  columnHelper.accessor('duration', {
    header: '재생 시간',
    cell: info => info.getValue(),
  }),
];

const clipColumns = [
  columnHelper.accessor('id', {
    header: '번호',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: '날짜',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('title', {
    header: '제목',
    cell: info => (
      <div className="text-left font-semibold">
        {info.getValue() as string}
      </div>
    ),
  }),
  columnHelper.accessor('duration', {
    header: '재생 시간',
    cell: info => info.getValue(),
  }),
];

interface TableProps {
  viewType: 'episode' | 'clip';
}

const Table = ({ viewType }: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const navigate = useNavigate();

  const table = useReactTable({
    data: viewType === 'episode' ? episodeList : clipList,
    columns: viewType === 'episode' ? episodeColumns : clipColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
      <div className="w-full max-w-[1000px] mx-auto mt-8">
        <div className="mb-4 flex justify-between items-center">
          <p className='text-[20px] font-bold'>{viewType === 'episode' ? '회차별 보기' : '클립별 보기'}</p>
          <div className="flex items-center gap-2">
            <select
              value={sorting[0]?.desc ? 'desc' : 'asc'}
              onChange={e => {
                table.setSorting([{ id: 'date', desc: e.target.value === 'desc' }])
              }}
              className="w-[120px] text-[14px] cursor-pointer border border-gray-300 rounded p-1"
            >
              <option value="desc">최신순</option>
              <option value="asc">오래된순</option>
            </select>
          </div>
        </div>

        <table className="min-w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='border-b border-gray-300'>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="border-t-2 border-gray2 p-2 text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} onClick={() => navigate(`/player?id=${row.original.id}`)}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border-b border-gray-200 px-[22px] py-[10px] text-[14px] text-center cursor-pointer">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-center mt-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 rounded disabled:opacity-50"
            >
              {'<<'}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 rounded disabled:opacity-50"
            >
              {'<'}
            </button>
            
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => table.setPageIndex(pageIndex)}
                className={`px-3 py-1 text-[14px] rounded-[2px] ${
                  table.getState().pagination.pageIndex === pageIndex && 'bg-gray2 text-white'
                }`}
              >
                {pageIndex + 1}
              </button>
            ))}

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 rounded disabled:opacity-50"
            >
              {'>'}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 rounded disabled:opacity-50"
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
  );
}

export default Table;