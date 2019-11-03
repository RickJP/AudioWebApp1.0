// import React, {Component, useState, useEffect} from 'react';
// import Layout from '../../core/Layout';
// import  './styles/style.css';

// const useAudio = url => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//     playing ? audio.play() : audio.pause();
//   }, [playing]);

//   return [playing, toggle];
// };

// const PlayAudio = () => {
//   const url = 'http://localhost:8000/api/playAudio';
//   const [playing, toggle] = useAudio(url);

//   return (
//     <Layout
//       children
//       title="Dashboard"
//       description=""
//       className="container-fluid"
//     >
       
//       <button id="play" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
//     </Layout>
//   );
// };

// export default PlayAudio;
