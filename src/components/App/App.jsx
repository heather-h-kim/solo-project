import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserHomePage from '../UserHomePage/UserHomePage';
import ChartPage from '../ChartPage/ChartPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import AddCatPage from '../AddCatPage/AddCatPage';
import CatInfoPage from '../CatInfoPage/CatInfoPage';
import EditCatPage from '../EditCatPage/EditCatPage';
import WeightInputPage from '../WeightInputPage/WeightInputPage';
import TreatsPage from '../TreatsPage/TreatsPage';
import FoodAmountPage from '../FoodAmountPage/FoodAmountPage';
import AdjustCaloriePage from '../AdjustCaloriePage/AdjustCaloriePage';
import ResultPage from '../ResultPage/ResultPage';
import ChartEachCatPage from '../ChartEachCatPage/ChartEachCatPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/landing */}
          <Redirect exact from="/" to="/landing" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route> */}
         
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
             <Nav />
            <UserHomePage />
          </ProtectedRoute>
           
          {/* <ProtectedRoute
            // logged in shows HomePage else shows LoginPage
            exact
            path="/home"
          >
            <Nav />
            <HomePage />
          </ProtectedRoute> */}
          <ProtectedRoute
            // logged in shows AddCatPage else shows LoginPage
            exact
            path="/add-cat"
          >
            <AddCatPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows CatInfoPage else shows LoginPage
            exact
            path="/cat-info/:id"
          >
            <CatInfoPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows AddCatPage else shows LoginPage
            exact
            path="/edit-cat/:id"
          >
            <EditCatPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows AddCatPage else shows LoginPage
            exact
            path="/weight-input/:id"
          >
            <WeightInputPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows AddCatPage else shows LoginPage
            exact
            path="/treats/:id"
          >
            <TreatsPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows AddCatPage else shows LoginPage
            exact
            path="/food-amount/:id"
          >
            <FoodAmountPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows AddCatPage else shows LoginPage
            exact
            path="/result/:id"
          >
            <ResultPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows ChartPage else shows LoginPage
            exact
            path="/chart"
          >
            <ChartPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows ChartPage else shows LoginPage
            exact
            path="/chart-eachcat/:id"
          >
            <ChartEachCatPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows ChartPage else shows LoginPage
            exact
            path="/adjust-calorie"
          >
            <AdjustCaloriePage />
          </ProtectedRoute>
          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/landing"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
