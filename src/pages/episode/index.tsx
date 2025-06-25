import { ProgramBanner } from "@/components/ProgramBanner";
import { TrackList } from "./TrackList";
import { useNavigate, useParams } from "react-router-dom";
import { PieceList } from "./PieceList";
import useEpisode from "@/hooks/useEpisode";
import { formatDateWithWeekday } from "@/utils/date";

const Episode = () => {
	const navigate = useNavigate();
	const { episodeId, pieceId } = useParams();

	const { 
		episode, 
		tags, 
		selected, 
		handleTagSelect, 
		filteredItems, 
		trackList, 
		currentTrack, 
		setCurrentTrack, 
		isPlaying, 
		setIsPlaying, 
		onTrackClick
	} = useEpisode({ episodeId: Number(episodeId) });

	const handleViewTypeChange = (type: 'episode' | 'clip') => {
		navigate(`/program?viewType=${type}`);
	};

	return (
		<div className="flex flex-col">
			<ProgramBanner data={episode?.program} viewType={null} onViewTypeChange={handleViewTypeChange} />
			<div className="flex w-[1200px] mx-auto flex-col items-start justify-center px-[120px] pt-[60px] pb-[20px]">
				<p className="border border-gray-200 w-full rounded-[8px] px-[20px] py-[5px] text-left text-[22px] font-bold">
					{episode?.episode.date ? formatDateWithWeekday(episode.episode.date) : ''}  방송
				</p>
				<TrackList 
					datas={trackList || []}
					currentTrack={currentTrack}
					isPlaying={isPlaying}
					onTrackClick={onTrackClick}
				/>
				<PieceList
					pieceId={pieceId ? Number(pieceId) : 0}
					programInfo={episode}
					tags={tags}
					selected={selected}
					handleTagSelect={handleTagSelect}
					filteredItems={filteredItems}
					currentTrack={currentTrack}
					setCurrentTrack={setCurrentTrack}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
			</div>
		</div>
	)
}

export default Episode;