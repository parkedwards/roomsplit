import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

///////////////////////////////////
// Imported React components


export default React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
});