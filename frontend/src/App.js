import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import UnitIndex from './units/UnitIndex'
import UnitDetails from './units/UnitDetails'
import Navigation from './Navigation'
import Error404 from './Error404'
import NewUnitForm from './units/NewUnitForm'
import EditUnitForm from './units/EditUnitForm'
import SignUpForm from './users/SignUpForm'
import LoginForm from './users/LoginForm'
import CurrentUserProvider from './contexts/CurrentUser'

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-up" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/units" component={UnitIndex} />
          <Route exact path="/units/new" component={NewUnitForm} />
          <Route exact path="/units/:unitId" component={UnitDetails} />
          <Route exact path="/units/:unitId/edit" component={EditUnitForm} />
          <Route path="/" component={Error404} />
        </Switch>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
