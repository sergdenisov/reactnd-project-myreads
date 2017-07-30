import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Search from './components/Search/Search'
import BooksList from './components/BooksList/BooksList'
import './App.css'

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BooksList}/>
        <Route path="/search" component={Search}/>
      </div>
    )
  }
}

export default BooksApp
