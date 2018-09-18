import React, { Component } from 'react';
import albumData from './../data/albums';
import { Link } from 'react-router-dom';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
   return (
     <section className='library'>
      {this.state.albums.map( (album, index) =>
        <Link to={`/album/${album.slug}`} key={index} className="mdl-card">
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">{album.title}</h2>
            </div>
            <div className="mdl-card__media">
              <img src={album.albumCover} alt={album.title} />
            </div>
            <div className="mdl-card__supporting-text">
              {album.artist}
            </div>
            <div className="mdl-card__supporting-text">
              {album.songs.length} songs
            </div>
        </Link>
        )}
     </section>
    );
  }
}

export default Library;
