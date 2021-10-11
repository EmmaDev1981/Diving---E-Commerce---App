import './App.css';
import Homepage from './pages/homepage/homepage.component.jsx';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import ShopPage from './pages/homepage/shop/shop.components';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route  path='/shop' component={ShopPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
