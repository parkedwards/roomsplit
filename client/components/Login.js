import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router';

export default React.createClass({

  verifyUser(event) {
    event.preventDefault();
    const username = event.target.elements[0].value;
    const password = event.target.elements[1].value;
    $.post('/login', { username: username, password: password })
      .done(function (data) {
        browserHistory.push('/hub/' + username)
      })
      .fail(function () {
        browserHistory.push('/error')
      });
  },

  render() {
    return (
      <div className="container text-center">
        <h4>Enter Your Login!</h4>
        <form className="form-inline" onSubmit={this.verifyUser}>
          <div className="form-group">
            Username: <input type="text" className="form-control" name="username" placeholder="username" /><br />
          </div>
          <div className="form-group">
            Password: <input type="password" className="form-control" name="password" placeholder="password" /><br />
          </div>
            <button type="submit" className="btn btn-success">Login</button>
        </form>
      </div>
    )
  }
});