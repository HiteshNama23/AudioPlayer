import React, { useState, useEffect } from 'react';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audio, setAudio] = useState(new Audio());
  

  useEffect(() => {
    const storedIndex = localStorage.getItem('currentTrackIndex');
    const storedAudio = localStorage.getItem('currentAudio');
    if (storedIndex !== null && storedAudio !== null) {
      setCurrentTrackIndex(parseInt(storedIndex));
      setAudio(new Audio(storedAudio));
     
    }
  }, []);

  useEffect(() => {
    if (playlist.length > 0) {
      const track = playlist[currentTrackIndex];
      const newAudio = new Audio(URL.createObjectURL(track)); // Create a new Audio object
      newAudio.load();
      setAudio(newAudio); 
      document.querySelector(".myAudio").autoplay = true;

      localStorage.setItem('currentTrackIndex', currentTrackIndex.toString());
      localStorage.setItem('currentAudio', audio.src);
    }
  }, [currentTrackIndex]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files);
    
    setPlaylist(prevPlaylist => [...prevPlaylist, ...newFiles]);

    localStorage.setItem('playlist',playlist);
    if (playlist.length === 0) {
      setCurrentTrackIndex(0);
    }
  };

  const handleNextTrack = () => {
   
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  
  };

  const handleAudioEnded = () => {
    handleNextTrack();
  };

  const handleSongClick = (index) => {
    if (index !== currentTrackIndex) {
      setCurrentTrackIndex(index);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col  justify-center bg-cover bg-center" style={{ backgroundImage: "url(https://img.freepik.com/free-vector/glowing-musical-pentagram-background-with-sound-notes_1017-31220.jpg?w=900&t=st=1708753559~exp=1708754159~hmac=0b762186281b2fb1033cb751d00636759022ad979857ec73046510910fe8269c)" }}>
    <label for="fileInput" class="my-4 mx-auto p-2 align-middle rounded border border-blue-900  bg-sky-900 text-green-600 leading-tight focus:border-blue-500 hover:bg-sky-700 hover:cursor-pointer ">
    Choose a file
  </label>
<input 
type="file" 
accept="audio/*" 
onChange={handleFileChange} 
class="hidden"
id="fileInput"
multiple 
/>
      
      <div className="bg-sky-900 p-4 rounded shadow-md my-4 mx-auto ">
        <h2 className="text-3xl font-bold mb-2 text-green-600">Playlist</h2>
        <ul className="list-disc pl-4">
          {playlist.map((track, index) => (
            <li key={index} onClick={() => handleSongClick(index)} className="cursor-pointer hover:text-blue-500 text-blue-300">
              {track.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-sky-900 p-4 rounded shadow-md my-4 mx-20">
        <h2 className="text-2xl font-bold mb-2 text-green-600">Now Playing</h2>
        <audio
          controls
          src={audio.src}
          onEnded={handleAudioEnded}
          className="myAudio w-full"
        />
        <button onClick={handleNextTrack} className="bg-sky-700 text-green-500 px-4 py-2 rounded mt-4 hover:bg-sky-600">
          Next Track
        </button>
      </div>
    </div>
  );
};

export default App;

