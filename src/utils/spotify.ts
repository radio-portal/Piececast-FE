export const refreshAccessToken = async () => {
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
