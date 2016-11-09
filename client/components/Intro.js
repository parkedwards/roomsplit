import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router';

export default React.createClass({
  handleSignup(event) {
    event.preventDefault();
    browserHistory.push('/signup');
  },

  handleLogin(event) {
    event.preventDefault();
    browserHistory.push('/login')
  },

  render() {
    return (
      <div className="container text-center">
        
        <h2>Welcome to Roomsplit!</h2>
        <p>This is your splash page!  Welcome!</p>
        
        <form onSubmit={this.handleSignup}>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block">Sign Up For Free!</button>
          </div>
        </form>
        
        <form onSubmit={this.handleLogin}>
          <div className="form-group">
            <button type="submit" className="btn btn-success btn-lg btn-block">Log In!</button>
          </div>
        </form>
        
        <form method="get" action="/github/auth">
          <button type="submit">Login with your GitHub</button>
        </form>
        
        {this.props.children}
        
      </div>
    )
  }
});