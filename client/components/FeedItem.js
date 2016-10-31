import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router';

export default React.createClass({

  reconcile() {

  },

  render() {
    return (
      <tr>
        <td>{this.props.username}</td>
        <td>{this.props.expenseDate}</td>
        <td>{this.props.expenseName}</td>
        <td>{this.props.expenseAmount}</td>
      </tr>
    )
  }
});

        // <form onSubmit={this.reconcile}><button type="submit">Reconcile!</button></form>
        // <p>{this.props.expenseDate} {' '} {this.props.expenseName} {' '} {this.props.expenseAmount}</p>

