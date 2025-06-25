import { get } from "@/api/base";
import { useState, useEffect, useMemo } from "react";
import useSpotify from '@/hooks/useSpotify';
import type { TrackApiResponse, EpisodeApiResponse } from '@/pages/episode/types';

const TAGS = ['게스트', '사연', '정보', '퀴즈', '연애', '건강', '음악', '토크'];

const useEpisode = ({ episodeId }: { episodeId: number }) => {
  const [episode, setEpisode] = useState<EpisodeApiResponse | null>(null);
  const [trackList, setTrackList] = useState<TrackApiResponse[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { searchTracks, handleTrackClick } = useSpotify();

  const getEpisode = async (episodeId: number) => {
    const response = await get(`/episodes/${episodeId}/full`);
    setEpisode(response.data);
  };

   const getTrackList = async (episodeId: number) => {
    const response = await get(`/episodes/${episodeId}/playlist`);
    searchTracks(
      response.data.playlist,
      (updatedList) => setTrackList(updatedList),
      (item) => `${item.title} ${item.artist}`,
      (item, spotifyTrack) => ({
        ...item,
        spotify: {
          trackName: spotifyTrack.name,
          album: spotifyTrack.album.name,
          url: spotifyTrack.uri,
          thumbnail: spotifyTrack.album.images[0]?.url
        }
      })
    );
  };

  // 태그 선택 핸들러
  const handleTagSelect = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // 필터링된 조각 리스트
  const filteredItems = useMemo(() => {
    if (!episode?.episode?.pieces) return [];
    if (selected.length === 0) return episode.episode.pieces;
    return episode.episode.pieces.filter((item: any) =>
      selected.every(tag => item.tags?.includes(tag))
    );
  }, [selected, episode]);

  // 트랙 클릭 핸들러
  const onTrackClick = (track: TrackApiResponse) => {
    handleTrackClick(
      {
        id: track.musicId,
        title: track.title,
        artist: track.artist,
        image: track.spotify?.thumbnail,
        spotifyUri: track.spotify?.url
      },
      currentTrack,
      setCurrentTrack,
      isPlaying,
      setIsPlaying
    );
  };

  useEffect(() => {
    getEpisode(episodeId);
    getTrackList(episodeId);
    // eslint-disable-next-line
  }, [episodeId]);

  return {
    episode,
    trackList,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    onTrackClick,
    tags: TAGS,
    selected,
    handleTagSelect,
    filteredItems
  };
};

export default useEpisode;