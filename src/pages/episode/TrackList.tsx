import type { TrackApiResponse } from '@/pages/episode/types';

interface TrackListProps {
	datas: TrackApiResponse[];
	currentTrack: string | null;
	isPlaying: boolean;
	onTrackClick: (track: TrackApiResponse) => void;
}

export const TrackList = ({ datas, currentTrack, isPlaying, onTrackClick }: TrackListProps) => {
	return (
		<div className="w-full mt-[30px] flex flex-col items-start justify-center">
			<p className="text-[20px] font-semibold mb-[10px]">전체 선곡표</p>
			<div className="w-full flex overflow-scroll grow rounded-[8px]">
				<div className="flex max-w-fit items-start justify-center gap-[20px]">
					{datas.map((track) => (
						<div 
							id={`track-${track.musicId}`} 
							key={track.musicId} 
							className={`flex flex-col items-start justify-center w-[120px] cursor-pointer hover:opacity-80 transition-opacity ${
								currentTrack === track.spotify?.url ? 'opacity-100' : ''
							}`}
							onClick={() => onTrackClick(track)}
						>
							<div className="relative">
								<img 
									src={track.spotify?.thumbnail || '/assets/images/spotifyLoading.jpg'} 
									alt={`${track.title} 앨범 커버`} 
									className={`w-[120px] h-[120px] rounded-[5px] transition-all ${
										currentTrack === track.spotify?.url ? 'brightness-75' : ''
									}`}
								/>
								{currentTrack === track.spotify?.url && (
									<div className="absolute inset-0 flex items-center justify-center">
										<div className={`w-8 h-8 rounded-full bg-white/90 flex items-center justify-center ${
											isPlaying ? 'animate-pulse' : ''
										}`}>
											{isPlaying ? (
												<div className="w-3 h-3 bg-blue rounded-sm" />
											) : (
												<div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-blue border-b-[6px] border-b-transparent ml-0.5" />
											)}
										</div>
									</div>
								)}
							</div>
							<p className={`leading-none mt-[8px] transition-colors ${
								currentTrack === track.spotify?.url ? 'text-blue' : ''
							}`}>{track.title}</p>
							<p className={`text-sm transition-colors ${
								currentTrack === track.spotify?.url ? 'text-blue/80' : 'text-gray5'
							}`}>{track.artist}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}