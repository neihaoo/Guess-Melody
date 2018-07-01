export default (track) => `
  <div class="player-wrapper">
    <div class="player">
      <audio src="${track.src}" preload="auto"></audio>
      <button class="player-control player-control--play"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>
`;
