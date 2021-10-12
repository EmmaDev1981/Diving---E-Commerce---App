import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/homepage/shop/shop.components';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';


class App extends Component {

  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFfromAuth = null;

  componentDidMount() {
    this.unsubscribeFfromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})
    })
  }

  componentWillUnmount () {
    this.unsubscribeFfromAuth()
  }

  render() {
    return (
      <BrowserRouter>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route  path='/shop' component={ShopPage} />
          <Route  path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
