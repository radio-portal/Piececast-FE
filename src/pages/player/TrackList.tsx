import { useState, useEffect } from 'react';

interface Track {
	id: number;
	title: string;
	artist: string;
	image: string;
	spotifyUri?: string;
}

interface Device {
	id: string;
	is_active: boolean;
	name: string;
	type: string;
}

const refreshAccessToken = async () => {
	const refreshToken = localStorage.getItem('spotify_refresh_token');
	const clientId = localStorage.getItem('spotify_client_id');
	
	if (!refreshToken || !clientId) {
		console.error('No refresh token or client ID found');
		return null;
	}

	try {
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + btoa(clientId + ':' + import.meta.env.VITE_CLIENT_SECRET)
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			})
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('spotify_access_token', data.access_token);
			return data.access_token;
		} else {
			console.error('Failed to refresh token');
			return null;
		}
	} catch (error) {
		console.error('Error refreshing token:', error);
		return null;
	}
};

export const TrackList = () => {
	const [trackList, setTrackList] = useState<Track[]>([
		{
			id: 1,
			title: '안녕',
			artist: '조이',
			image: ''
		},
		{
			id: 2,
			title: '우주를 줄게',
			artist: '볼빨간 사춘기',
			image: ''
		},
		{
			id: 3,
			title: '한페이지가 될 수 있게',
			artist: 'DAY6 (데이식스)',
			image: ''
		},
		{
			id: 4,
			title: '미라클',
			artist: 'NCT WISH',
			image: ''
		},
		{
			id: 5,
			title: '폭죽타임',
			artist: '이승윤',
			image: ''
		},
		{
			id: 6,
			title: '어때',
			artist: '현아',
			image: ''
		}
	]);

	const [currentTrack, setCurrentTrack] = useState<string | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const searchTracks = async () => {
			let token = localStorage.getItem('spotify_access_token');
			console.log('Initial Spotify Token:', token);

			if (!token) {
				console.log('No Spotify token found');
				return;
			}

			const updatedTracks = await Promise.all(
				trackList.map(async (track) => {
					try {
						const query = `${track.title} ${track.artist}`;
						console.log('Searching for:', query);

						let response = await fetch(
							`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
							{
								headers: {
									'Authorization': `Bearer ${token}`
								}
							}
						);

						if (response.status === 401) {
							console.log('Token expired, refreshing...');
							token = await refreshAccessToken();
							if (!token) {
								console.error('Failed to refresh token');
								return track;
							}

							response = await fetch(
								`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
								{
									headers: {
										'Authorization': `Bearer ${token}`
									}
								}
							);
						}

						console.log('Search Response Status:', response.status);

						if (response.ok) {
							const data = await response.json();
							console.log('Search Result:', data);

							if (data.tracks.items.length > 0) {
								const spotifyTrack = data.tracks.items[0];
								console.log('Found track:', spotifyTrack);

								return {
									...track,
									image: spotifyTrack.album.images[0]?.url || track.image,
									spotifyUri: spotifyTrack.uri
								};
							} else {
								console.log('No tracks found for:', query);
							}
						} else {
							const errorData = await response.json();
							console.error('Spotify API Error:', errorData);
						}
						return track;
					} catch (error) {
						console.error(`Error searching track ${track.title}:`, error);
						return track;
					}
				})
			);

			console.log('Updated Tracks:', updatedTracks);
			setTrackList(updatedTracks);
		};

		searchTracks();
	}, []);

	const handleTrackClick = async (track: Track) => {
		console.log('Track clicked:', track);

		if (!track.spotifyUri) {
			console.log('No Spotify URI found for track');
			return;
		}

		let token = localStorage.getItem('spotify_access_token');
		if (!token) {
			console.log('No Spotify token found');
			return;
		}

		try {
			// 기기 목록 가져오기
			let devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			if (devicesResponse.status === 401) {
				console.log('Token expired, refreshing...');
				token = await refreshAccessToken();
				if (!token) {
					console.error('Failed to refresh token');
					return;
				}

				devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});
			}

			const devicesData = await devicesResponse.json();
			console.log('Available devices:', devicesData);

			// 활성화된 기기 찾기
			let activeDevice = devicesData.devices.find((device: Device) => device.is_active);
			
			// 활성화된 기기가 없으면 첫 번째 기기 사용
			if (!activeDevice && devicesData.devices.length > 0) {
				activeDevice = devicesData.devices[0];
				// 기기 활성화
				await fetch(`https://api.spotify.com/v1/me/player`, {
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						device_ids: [activeDevice.id],
						play: false
					})
				});
			}

			if (!activeDevice) {
				console.error('No available devices found');
				return;
			}

			// 현재 재생 중인 트랙과 같은 트랙을 클릭한 경우
			if (currentTrack === track.spotifyUri) {
				// 재생 중이면 중지, 중지 중이면 재생
				const action = isPlaying ? 'pause' : 'play';
				let playResponse = await fetch(`https://api.spotify.com/v1/me/player/${action}?device_id=${activeDevice.id}`, {
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				});

				if (playResponse.status === 401) {
					console.log('Token expired, refreshing...');
					token = await refreshAccessToken();
					if (!token) {
						console.error('Failed to refresh token');
						return;
					}

					playResponse = await fetch(`https://api.spotify.com/v1/me/player/${action}?device_id=${activeDevice.id}`, {
						method: 'PUT',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					});
				}

				if (playResponse.ok) {
					setIsPlaying(!isPlaying);
				}
			} else {
				// 새로운 트랙 재생
				let playResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`, {
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						uris: [track.spotifyUri]
					})
				});

				if (playResponse.status === 401) {
					console.log('Token expired, refreshing...');
					token = await refreshAccessToken();
					if (!token) {
						console.error('Failed to refresh token');
						return;
					}

					playResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`, {
						method: 'PUT',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							uris: [track.spotifyUri]
						})
					});
				}

				if (playResponse.ok) {
					setCurrentTrack(track.spotifyUri);
					setIsPlaying(true);
				}
			}

		} catch (error) {
			console.error('Error playing track:', error);
		}
	};

	return (
		<div className="w-full mt-[30px] flex flex-col items-start justify-center">
			<p className="text-[20px] font-semibold mb-[10px]">전체 선곡표</p>
			<div className="w-full flex overflow-scroll grow rounded-[8px]">
				<div className="flex max-w-fit items-start justify-center gap-[20px]">
					{trackList.map((track) => (
						<div 
							id={`track-${track.id}`} 
							key={track.id} 
							className={`flex flex-col items-start justify-center w-[120px] cursor-pointer hover:opacity-80 transition-opacity ${
								currentTrack === track.spotifyUri ? 'opacity-100' : ''
							}`}
							onClick={() => handleTrackClick(track)}
						>
							<div className="relative">
								<img 
									src={track.image || 'https://via.placeholder.com/120'} 
									alt={`${track.title} 앨범 커버`} 
									className={`w-[120px] h-[120px] rounded-[5px] transition-all ${
										currentTrack === track.spotifyUri ? 'brightness-75' : ''
									}`}
								/>
								{currentTrack === track.spotifyUri && (
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
								currentTrack === track.spotifyUri ? 'text-blue' : ''
							}`}>{track.title}</p>
							<p className={`text-sm transition-colors ${
								currentTrack === track.spotifyUri ? 'text-blue/80' : 'text-gray5'
							}`}>{track.artist}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}