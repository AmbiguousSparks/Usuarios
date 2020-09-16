import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar'
import Routes from './routes'
import { connect } from "react-redux";
import { changeCurrent, setUser } from "./actions";
import { bindActionCreators } from "redux";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mb-5 p-5 mt-5">
        <Routes />
      </div>
    </Router>
  )
}

const mapStateToProps = state => {
  return { data: state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ changeCurrent, setUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
