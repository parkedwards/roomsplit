import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router';

///////////////////////////////////
// Imported React components
import NavLink from './NavLink'


export default React.createClass({

  getInitialState() {
    return {
      roommates: []
    }
  },

  componentDidMount() {
    let unParam = this.props.params.un;
    $.post('/pullCluster', { username: unParam })
      .done(function (data) {
        let parsedData = JSON.parse(data);
        parsedData.splice(parsedData.indexOf(unParam), 1);
        this.setState({ roommates: parsedData });
      }.bind(this));
  },

  render() {
    let unParam = this.props.params.un;
    let roommateString = '';

    for (let i = 0; i < this.state.roommates.length; i++) {
      if (i === this.state.roommates.length - 1) roommateString += this.state.roommates[i];
      else if (i === this.state.roommates.length - 2) roommateString += this.state.roommates[i] + ' & ';
      else roommateString += this.state.roommates[i] + ', '
    }

    return (
      <div className="container text-center">
        <h2>Your Expense Hub</h2>
        <h4>Get a handle on your expenses, bruh!</h4>
        <br />
        <br />
        <div className="form-group">
          <NavLink className="btn btn-default" to={"/hub/" + unParam}>Main</NavLink>
          <NavLink className="btn btn-default" to={"/feed/" + unParam}>Feed</NavLink>
          <NavLink className="btn btn-default" to={"/expense/" + unParam}>Submit Expense</NavLink>
          <NavLink className="btn btn-default" to="/login">Logout :(</NavLink>
        </div>
        <br />
        <h3>Sup {unParam}!</h3>
        <br />
        <br />
        <div>
          <h5>You are currently roommates with:</h5>
          <h3><strong>{roommateString}</strong></h3>
        </div>
        <br />
        <br />
        {this.props.children}
      </div>
    )
  }
});