import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
          <div className="mdl-layout-icon"></div>
          <div className="mdl-layout__header-row">
            <span className="mdl-layout__title">Live Music Player</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <Link to='/' className="mdl-navigation__link">Home</Link>
              <Link to='/library' className="mdl-navigation__link">Library</Link>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout__title">Live Music Player</span>
          <nav className="mdl-navigation">
            <Link to='/' className="mdl-navigation__link">Home</Link>
            <Link to='/library' className="mdl-navigation__link">Library</Link>
          </nav>
        </div>

        <main className="main-content">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
