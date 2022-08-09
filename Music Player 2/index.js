window.onload = () =>{

    const song_title_el= document.getElementById('song-title');
    const song_artist_el= document.getElementById('song-artist');
    const song_next_up_el= document.getElementById('song-next-up');
    const play_btn = document.getElementById('play-btn');
    const play_btn_icon=document.getElementById('play-icon');
    const prev_btn = document.getElementById('prev-btn');
    const next_btn=document.getElementById('next-btn');
    const audio_player = document.getElementById('music-player');
    progressArea = document.getElementById("progress-area");
    progressBar = document.getElementById("progress-bar");
    let current_song_index;
    let next_song_index;


    let songs = [
        {
             title:'Lucid Dreams',
             artist:'Juice WRLD',
             song_path:'music/Juice WRLD - Lucid Dreams (Dir. by ColeBennett).mp3',
            
        },
    
        {
             title:'All Girls Are The Same',
             artist:'Juice WRLD',
             song_path:'music/Juice Wrld - All Girls Are The Same (Lyric Video).mp3',
          
        },
        {
              title:'Plumeria',
             artist:'GXNXSIS',
             song_path:'music/GXNXSIS - Plumeria.mp3',
            
        },
        {
            title:'Smile',
           artist:'Juice WRLD',
           song_path:'music/Juice WRLD - Smile (Lyrics) ft. The Weeknd.mp3',
          
        },
        {
            title:'Lullaby',
           artist:'Low',
           song_path:'music/Low - Lullaby.mp3',
          
        },
        {
            title:'King',
           artist:'Bazanji',
           song_path:'music/Bazanji - King (Official Audio).mp3',
          
        }
    ]

    play_btn.addEventListener('click', TogglePlaySong);
    next_btn.addEventListener('click', () => ChangeSong());
    prev_btn.addEventListener('click', ()=> ChangeSong(false));  

    InitPlayer(); 
   
  
    

    function InitPlayer(){

    current_song_index = 0;
    next_song_index = current_song_index + 1;
    UpdatePlayer();

}
function UpdatePlayer(){
    let song = songs[current_song_index];
    song_title_el.innerText = song.title;
    song_artist_el.innerText = song.artist
    song_next_up_el.innerText = songs[next_song_index].title + " by " + songs[next_song_index].artist;

    audio_player.src = song.song_path;

}   

function TogglePlaySong(){

   
    if(audio_player.paused){
        audio_player.play();
        play_btn_icon.classList.remove('fa-play');
        play_btn_icon.classList.add('fa-pause');
        
    }else{

        audio_player.pause();
        play_btn_icon.classList.add('fa-play');
        play_btn_icon.classList.remove('fa-pause');
                                
    }    
}
function ChangeSong (next = true)
{
    if (next){
        current_song_index++;
        next_song_index = current_song_index +1;
         
        if(current_song_index > songs.length -1)
        {
            current_song_index = 0;
            next_song_index = current_song_index + 1;

        }
        if (next_song_index > songs.length -1){
            next_song_index = 0;
}

    }else{
        current_song_index--;
        next_song_index = current_song_index + 1;

        if(current_song_index < 0)
        {
            current_song_index = songs.length -1;
            next_song_index = 0;
        }
    }
    UpdatePlayer();
    TogglePlaySong();
}
audio_player.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; 
    
    const duration = e.target.duration; 
    
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = document.getElementById("current-time");
    musicDuartion = document.getElementById("max-duration");

    audio_player.addEventListener("loadeddata", ()=>{
    
      let audioDuration = audio_player.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);
      if(totalSec < 10){ 
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });

progressArea.addEventListener("click", (e)=>{

    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = audio_player.duration; //getting song total duration
    
    audio_player.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  TogglePlaySong();
  });

}
