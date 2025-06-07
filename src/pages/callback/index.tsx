import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const CLIENT_ID = localStorage.getItem('spotify_client_id') || import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = localStorage.getItem('spotify_redirect_uri') || 'http://127.0.0.1:5173/callback';

// 로그인 페이지와 동일한 방식으로 로깅
console.log('Callback - Client ID:', CLIENT_ID);
console.log('Callback - Redirect URI:', REDIRECT_URI);

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { code: paramCode } = useParams();

  useEffect(() => {
    // 이미 로그인되어 있는 경우 메인으로 이동
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/', { replace: true });
      return;
    }

    const code = paramCode || new URLSearchParams(location.search).get('code');
    
    if (code) {
      const getAccessToken = async () => {
        try {
          const tokenUrl = 'https://accounts.spotify.com/api/token';
          const tokenParams = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
          });
          
          const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            },
            body: tokenParams
          });

          const data = await response.json();
          
          if (data.access_token) {
            // 토큰 저장
            localStorage.setItem('spotify_access_token', data.access_token);
            localStorage.setItem('spotify_refresh_token', data.refresh_token);
            
            // 로그인 상태 저장
            localStorage.setItem('isLoggedIn', 'true');
            
            // 메인 페이지로 이동
            navigate('/', { replace: true });
          } else {
            throw new Error('Failed to get access token');
          }
        } catch (error) {
          console.error('Error in getAccessToken:', error);
        }
      };

      getAccessToken();
    } 
  }, [location, navigate, paramCode]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-backgroundLight">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954] mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default Callback; 