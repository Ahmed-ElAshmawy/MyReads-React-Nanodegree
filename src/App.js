import React from 'react'
import './App.css'
import MyReads from './Components/MyReads';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <MyReads />
      </div>
    )
  }
}

export default BooksApp
