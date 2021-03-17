import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './screen/Home'
import Favorites from './screen/Favorites'
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
      <Navbar />
      <Switch>
      <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
