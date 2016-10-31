import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexLink } from 'react-router'

///////////////////////////////////
// Imported React components
import App from './components/App';
import Intro from './components/Intro';
import Login from './components/Login';
import Signup from './components/Signup';
import PostSignup from './components/PostSignup';
import Hub from './components/Hub';
import Feed from './components/Feed';
import Expense from './components/Expense';
import NotFound from './components/NotFound';


render((
  <Router history={browserHistory}>
    <Route path="/" component={Intro}>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Route>
    <Route path="/signup/:un" component={PostSignup} />
    <Route path="/hub/:un" component={Hub}>
      <Route path="/feed/:un" component={Feed} />
      <Route path="/expense/:un" component={Expense} />
    </Route>
    <Route path="/error" component={NotFound} />
  </Router >

), document.getElementById('app'))