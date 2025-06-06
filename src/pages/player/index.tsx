import { useState } from "react";
import { ProgramBanner } from "@/components/ProgramBanner";
import { TrackList } from "./TrackList";
import { Summary } from "./Summary";

const Player = () => {
	const [currentTrack, setCurrentTrack] = useState<string | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className="flex flex-col">
			<ProgramBanner />
			<div className="flex max-w-[1400px] mx-auto flex-col items-start justify-center px-[120px] pt-[60px] pb-[20px]">
				<p className="border border-gray-200 w-full rounded-[8px] px-[20px] py-[5px] text-left text-[22px] font-bold">2025.05.25 일요일 방송</p>
				<TrackList 
					currentTrack={currentTrack}
					setCurrentTrack={setCurrentTrack}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
				<Summary 
					currentTrack={currentTrack}
					setCurrentTrack={setCurrentTrack}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
				/>
			</div>
		</div>
	)
}

export default Player;