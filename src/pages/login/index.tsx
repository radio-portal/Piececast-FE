const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'code';
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private"
];

// 환경 변수를 localStorage에 저장
localStorage.setItem('spotify_client_id', CLIENT_ID);
localStorage.setItem('spotify_redirect_uri', REDIRECT_URI);

console.log(CLIENT_ID, REDIRECT_URI);

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-backgroundLight">
      <div className="w-full max-w-[400px] p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" 
            alt="Spotify" 
            className="h-12 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold mb-2">로그인</h1>
          <p className="text-gray-600">스포티파이 계정으로 로그인하세요</p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-[#1DB954] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#1ed760] transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          스포티파이로 로그인
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>로그인하면 서비스 이용약관과 개인정보 처리방침에 동의하게 됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
