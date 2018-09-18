import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">

        <section id="buttons">
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this.props.handlePrevClick} >
            <span className="icon ion-md-skip-backward"></span>
          </button>
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this.props.handleSongClick} >
            <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}></span>
          </button>
          <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onClick={this.props.handleNextClick} >
            <span className="icon ion-md-skip-forward"></span>
          </button>
        </section>

        <section id="time-control">
          <div className="current-time">Current Time: {this.props.formatTime(parseFloat(this.props.currentTime))}</div>
            <input
              type="range"
              value={(this.props.currentTime / this.props.duration) || 0}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleTimeChange}
              />
          <div className="total-time">Song Duration: {this.props.formatTime(parseFloat(this.props.duration))}</div>
        </section>

        <section id="volume-control">
          <div className="icon ion-md-volume-low"></div>
          <div>Volume: {Math.round(this.props.volume*100)}%</div>
          <input
            type="range"
            className="seek-bar"
            value={this.props.volume}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleVolumeChange}
          />
          <div className="icon ion-md-volume-high"></div>
        </section>

      </section>
    );
  }
}

export default PlayerBar;
