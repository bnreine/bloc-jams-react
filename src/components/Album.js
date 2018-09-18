 import React, { Component } from 'react';
 import albumData from './../data/albums';
 import PlayerBar from './PlayerBar';

 class Album extends Component {
   constructor(props) {
     super(props);
     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       currentTime: 0,
       volume: 0.2,
       duration: album.songs[0].duration,
       isPlaying: false,
       hoveredSong: ''
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
     this.audioElement.volume=this.state.volume;
   }


   play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

   pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }


  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume })
      }

    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }


  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }



  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }


  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  mouseEnter(song) {
    this.setState({ hoveredSong: song });
  }

  mouseLeave() {
    this.setState({ hoveredSong: '' });
  }

  cellEntry(song, index) {
    if (this.state.isPlaying === true && song === this.state.currentSong){
      return <span className="icon ion-md-pause"></span>
    } else if (this.state.isPlaying === false && song === this.state.currentSong && this.audioElement.currentTime != 0){
      return <span className="icon ion-md-play"></span>
    } else if ( this.state.hoveredSong === song  ) {
      return <span className="icon ion-md-play"></span>
    } else {
      return index + 1;
    }
  }


  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }


  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }


  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume});
  }


  formatTime(time) {  //time in seconds, as a float
    if ("number" != typeof time) {
      return "-:--";
    }
    const roundedTime=Math.round(time);  //rounds time to nearest second
    const minutes=Math.floor(roundedTime / 60);  //number of whole minutes
    const seconds=roundedTime % 60; //number of seconds
    const tensSeconds=Math.floor(seconds / 10); //tens digit in seconds
    const onesSeconds=seconds % 10; //ones digit in seconds
    return `${minutes}:${tensSeconds}${onesSeconds}`;
  }


   render() {
     return (

       <section className="album">

        <div className="mdl-card">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">{this.state.album.title}</h2>
          </div>
          <div className="mdl-card__media">
            <img src={this.state.album.albumCover} alt={this.state.album.title} />
          </div>
          <div className="mdl-card__supporting-text">
            {this.state.album.artist}
          </div>
          <div className="mdl-card__supporting-text">
            {this.state.album.releaseInfo}
          </div>
        </div>

        <table className="mdl-data-table mdl-js-table">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-mumeric">Song number</th>
              <th className="mdl-data-table__cell--non-mumeric">Title</th>
              <th className="mdl-data-table__cell--non-mumeric">Duration</th>
            </tr>
          </thead>
          <tbody>
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={ () => this.handleSongClick(song) } onMouseEnter={ () => this.mouseEnter(song) } onMouseLeave={ () => this.mouseLeave() } >
                <td className="mdl-data-table__cell--non-numeric">{ this.cellEntry(song, index) }</td>
                <td className="mdl-data-table__cell--non-numeric">{song.title}</td>
                <td className="mdl-data-table__cell--non-numeric">{this.formatTime(parseFloat(song.duration))}</td>
              </tr>
              )
            }
          </tbody>
        </table>

        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={this.formatTime}
        />

       </section>
     );
   }
 }

export default Album;
