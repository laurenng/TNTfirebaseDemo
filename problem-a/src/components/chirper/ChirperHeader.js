import React, { Component } from 'react'; //import React Component
import './Chirper.css'; //load module-specific CSS

export default class ChirperHeader extends Component {
  render() {
    return (
      <header className="container-fluid bg-white p-3 mb-3">
        <div className="text-center">
          <i className="fa fa-twitter fa-3x" aria-label="Chirper logo"></i>
        </div>
        {this.props.children}
      </header>
    );
  }
}
