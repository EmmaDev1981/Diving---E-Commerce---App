import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/homepage/shop/shop.components';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route  path='/shop' component={ShopPage} />
        <Route  path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
