import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ListUser from './listUserTest.js'
import TestFormRedux from './testFormRedux.js'
import Login from './formLogin.js'
import {Provider} from 'react-redux';

import {ccred} from './reduxcer'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import {sagasUser} from './sagas'

// create the saga middleware
const saga = createSagaMiddleware();
// mount it on the Store
const store = createStore(
    ccred,
    applyMiddleware(saga)
)

// saga.run(sagasUser);

// then run the saga
const routes = (
    <Provider store={store}>
      <Router>
          <div>
              <Route exact path="/login" component={Login}/>
              <Route path="/listuser" component={ListUser}/>
              <Route path="/testformredux" component={TestFormRedux}/>
          </div>
      </Router>
    </Provider>
)
export default routes

