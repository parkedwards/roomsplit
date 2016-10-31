import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router';

export default React.createClass({

  createUser(event) {
    event.preventDefault();
    const username = event.target.elements[0].value;
    const password = event.target.elements[1].value;
    const clusterName = event.target.elements[2].value;
    $.post('/signup', { username: username, password: password, clusterName: clusterName })
      .done(function (data) {
        browserHistory.push('/signup/' + username)
      })
      .fail(function () {
        browserHistory.push('/error')
      })
  },

  render() {
    return (
      <div className="container text-center">
        <h4>Sign Up Foo!  It's Free!</h4>
        <form className="form-inline" onSubmit={this.createUser}>
          <input type="text" className="form-control" name="username" placeholder="username" />
          <input type="password" className="form-control" name="password" placeholder="password" />
          <input type="text" className="form-control" name="clusterName" placeholder="cluster" />
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    )
  }
});