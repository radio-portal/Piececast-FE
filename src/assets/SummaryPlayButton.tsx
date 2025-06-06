interface SummaryPlayButtonProps {
  active: boolean;
}

const SummaryPlayButton = ({ active }: SummaryPlayButtonProps) => {
  return (
    <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
      active ? 'bg-blue' : 'bg-gray-200'
    }`}>
      <div className={`w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5`} />
    </div>
  );
};

export default SummaryPlayButton;


