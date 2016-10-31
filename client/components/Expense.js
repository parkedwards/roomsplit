import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router';

export default React.createClass({
  submitExpense(event) {
    let unParam = this.props.params.un;
    event.preventDefault();
    const expenseDate = event.target.elements[0].value;
    const expenseName = event.target.elements[1].value;
    const expenseAmount = event.target.elements[2].value;
    event.target.elements[0].value = '';
    event.target.elements[1].value = '';
    event.target.elements[2].value = '';
    $.post('/expense', { username: unParam, expenseDate: expenseDate, expenseName: expenseName, expenseAmount: expenseAmount })
  },

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.submitExpense}>
          <div className="form-group">
            Date: <input type="date" className="form-control" name="expenseDate" /><br />
          </div>
          <div className="form-group">
            Expense Name: <input type="text" className="form-control" name="expenseName" /><br />
          </div>
          <div className="form-group">
            Amount: <input type="number" className="form-control" name="expenseAmount" /><br />
          </div>
          <button type="submit" className="btn btn-primary">Add a Bill</button>
        </form>
      </div>
    )
  }
})