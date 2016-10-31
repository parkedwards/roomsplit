import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router';

export default React.createClass({
  
  proceed(event) {
    event.preventDefault();
    browserHistory.push('/hub/' + this.props.params.un)
  },

  render() {
    return (
      <div className="container text-center">
        <h4>Congrats!  You're now in the mainframe!</h4>
        <form onSubmit={this.proceed}>
          <button type="submit" class="btn btn-primary btn-lg">Proceed!</button>
        </form>
      </div>
    )
  }
})