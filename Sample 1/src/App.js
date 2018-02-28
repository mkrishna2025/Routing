import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, withRouter, Link } from 'react-router-dom';

class LoginScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName: 'Krishna'
    }
  }

  render() {
    const LoginButton = withRouter(navigator => (
      <button
        type='button'
        onClick={() => {
            //history.push('/home');
            navigator.history.push({
              pathname: '/home',
              search: 'query=react&searchIn=google',
              params: {userName: this.state.userName }
            })
          }
        }
      >
        Login With Navigator
      </button>
    ));


    const LoginButton2 = withRouter(({ history }) => (
      <button
        type='button'
        onClick={() => {
            //history.push('/home');
            history.push({
              pathname: '/home',
              search: 'query=react&searchIn=google',
              params: {userName: this.state.userName }
            })
          }
        }
      >
        Login With History
      </button>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          User Name <input type="text" value={this.state.userName} />
          <br/>
          <LoginButton />
          <LoginButton2 />
        </p>
      </div>
    );
  }
}

class HomeScreen extends Component{
  backButtonClick(){
    this.props.history.goBack();
  }
  render() {
    const queryParams = new URLSearchParams(this.props.location.search);
    var params = this.props.location.params;
    var queryString = 'userName=' + params.userName;
    return (
      <div> 
        Welcome {params.userName}. This is Home Screen.
        <p>You have search for {queryParams.get('query')} in site {queryParams.get('searchIn')}</p>
        <input type="button" value="Back" onClick={this.backButtonClick.bind(this)}/>
        <Link to={{
          pathname: '/main',
          search: queryString,
          params: { city: 'Hyderabad' }
        }}> Go to Main Screen </Link>
      </div>
    );
  }
}

class MainScreen extends Component{
  render(){
    const queryParams = new URLSearchParams(this.props.location.search);
    return <div>
      {queryParams.get('userName')}, Welcome to {this.props.location.params.city}
      About US screen is added to Main Page only as we have added to path of main.
      <Route path='/main' component={AboutUsScreen}/>
      <Link to="main/contactus">ContactUs</Link>
      <Link to="main/queries">Queries</Link>
    </div>;
  }
}

class AboutUsScreen extends Component{
  render(){
    return <div>This is About us</div>;
  }
}

class ContactUsScreen extends Component{
  render(){
    return <div>This is Contact us</div>;
  }
}

class QueriesScreen extends Component{
  render(){
    return <div>This is Queries Section</div>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={LoginScreen}/>
        <Route path='/home' component={HomeScreen}/>
        <Route exact path='/main' component={MainScreen}/>
        <Route path='/main/contactus' component={ContactUsScreen}/>
        <Route path='/main/queries' component={QueriesScreen}/>
      </div>
    );
  }
}

export default App;
