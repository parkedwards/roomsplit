import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router';
import FeedItem from './FeedItem';
import moment from 'moment';


export default React.createClass({
  getInitialState() {
    return {
      feedData: [],
    };
  },

  componentDidMount() {
    let unParam = this.props.params.un;

    $.post('/pullFeed', { username: unParam })
      .done(function (data) {
        let parsedData = JSON.parse(data);
        this.setState({ feedData: parsedData })
      }.bind(this));
  },

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  render() {
    const expenses = [];
    let sumTotal = 0;

    for (let i = 0; i < this.state.feedData.length; i++) {
      console.log('hello!');
      let entry = this.state.feedData[i];
      sumTotal += entry.expenseAmount;
      expenses.push(
        <FeedItem
          username={this.props.params.un}
          expenseDate={moment(entry.expenseDate).format('MM/DD/YYYY')}
          expenseName={entry.expenseName}
          expenseAmount={'$' + this.numberWithCommas(entry.expenseAmount)} />
      );
    }

    return (
      <div className="container text-center">
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Type of Expense</th>
              <th>Amount</th>
            </tr>
            {expenses}
          </tbody>
        </table>

        <div className="sum-total">
          {'Total Owed:  $' + this.numberWithCommas(sumTotal)}
        </div>
      </div>
    )
  }
});
