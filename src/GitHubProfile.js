import React, { useState } from 'react';
import axios from 'axios';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError('User not found');
      setProfile(null);
    }
  };

  return (
    <div>
      <h1>GitHub Profile Viewer</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchProfile}>Get Profile</button>
      {error && <p>{error}</p>}
      {profile && (
        <div>
          <h2>{profile.name}</h2>
          <img src={profile.avatar_url} alt={profile.name} width="100" />
          <p>{profile.bio}</p>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer">View Profile on GitHub</a>
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
