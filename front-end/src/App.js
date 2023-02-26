import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home,JobDetails,AddJob, Dashboard, Register, Edit, Error, PrivateRoute,Apply,Applies, SpecificApplies, Profile, Resume } from './pages';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <PrivateRoute path='/dashboard' exact>
          <Dashboard />
        </PrivateRoute>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/edit/:id'>
          <Edit />
        </Route>
        <Route path='/jobDetails/:id'>
          <JobDetails />
        </Route>
        <Route path='/apply/:id'>
          <Apply />
        </Route>
        <Route path='/applies'>
          <Applies />
        </Route>
        <Route path='/specificApplies/:id'>
          <SpecificApplies />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/add-job'>
          <AddJob />
        </Route>
        <Route path='/resume'>
          <Resume />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
