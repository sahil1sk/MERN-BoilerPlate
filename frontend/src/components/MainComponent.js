import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; 
import Home from './Home';
import Header from './Header';
import './app.css';
import { connect } from 'react-redux'; 
import { tryLogin,tryRegister, authCheckState, logout } from '../redux/ActionCreators';
import { logoutSuccess } from '../redux/dispatchers';

const mapDispatchToProps = (dispatch) => ({
  autoTrySignIn: () => dispatch(authCheckState()), 
  tryLogin: (username, password, type) => dispatch(tryLogin(username, password, type)),
  tryRegister: (username, email, password) => dispatch(tryRegister(username, email, password)),
  tryLogout: () => dispatch(logout()),          
  logoutSuccess: () => dispatch(logoutSuccess()),   
});

const mapStateToProps = (state) => {
  return{
      userData: state.userData,
      LoginResponse: state.loginResponse,  
      RegistResponse: state.regResponse, 
    }
};


class Main extends Component {
  
  componentDidMount() {
    this.props.autoTrySignIn(); 
  }

  render(){      

    const HomePage = () => {
      return(
        <Header
          userData = {this.props.userData}
          loginData = {this.props.LoginResponse}
          tryLogin = {this.props.tryLogin}
          tryLogout= {this.props.tryLogout}
          logSuccesDispatch = {this.props.logoutSuccess}
          regData = {this.props.RegistResponse}
          tryRegister = {this.props.tryRegister}
        />
      );
    }
   
    return (  
      <div>
        <HomePage/>
        <Switch>
          <Route exact path='/home' component={ Home } />
          <Redirect to='/home' />
        </Switch>       
      </div>
    );
  }  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); 
