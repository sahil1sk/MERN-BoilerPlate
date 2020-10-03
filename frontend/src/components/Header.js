import React, {useState} from 'react'
import './app.css';
import Modal from './Modal';
import {Link} from 'react-router-dom';
import Loading from './Loading';
import Alerts from './Alerts';

export default function Header(props) {
    
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    
    // giving the defautl value register
    const showTrigger = (val="register") => {
        if(val === "login"){
            setLogin(!login);
            setRegister(false);
        }else{
            setRegister(!register);
            setLogin(false);
        }
    }

    const logout = () => {
        document.getElementById('closeModal').click();
        props.tryLogout();      
        props.logSuccesDispatch();  
    }


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Spotify Clone</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/home'>Home</Link>
                    </li>

                    {props.userData.token === null ? 
                        <>
                            <li className="nav-item">
                                <span id="showPointer" className="nav-link" onClick={() => showTrigger("login")}>Login</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" onClick={() => showTrigger()} id="showPointer">Register</span>
                            </li>
                        </>
                    :
                        <>
                            <li className="nav-item">
                                <span className="nav-link">{props.userData.username}</span>
                            </li>
                            <li className="nav-item">
                                <span id="showPointer" data-toggle="modal" data-target="#exampleModal" className="nav-link">Logout</span>
                            </li>
                        </>
                    }
                </ul>

                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>

        </nav>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content text-center">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Logout</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <b>Are you sre you want to logout?</b>
            </div>
            <div className="text-center mb-4">
                <button type="button" id="closeModal" className="btn btn-outline-primary mr-1" data-dismiss="modal">Close</button>
                <button type="button" onClick={() => logout()} className="btn btn-outline-danger ml-1">Logout</button>
            </div>
            </div>
        </div>
        </div>

        {props.loginData.logoutSuccess && <Alerts msg={"You are Logged out Successfully!"} type="success"/>}

        {props.loginData.isLoading && <Loading msg={"Logging you in..."}/>}
        {props.loginData.errMess && <Alerts msg={"Your username or password is wrong. Make sure that you connected with internet"} type="danger"/>}
        {props.loginData.logSuccess && <Alerts msg={"You are Logged in Successfully!"} type="success"/>}

        {props.regData.isLoading && <Loading msg={"Registering your account..."}/>}
        {props.regData.errMess ? props.regData.errMess === "Register Error is: Failed to fetch" ?  
            <Alerts msg={"Make sure that your internet connection is good!"} type="primary"/> :
            <Alerts msg={"A user is already exists with this name!"} type="danger"/>
            : ""
        }
        {props.regData.logSuccess && <Alerts msg={"Your account is Registered Successfully!"} type="success"/>}

        <div className={login === true || register === true ? "container page" : "notPage"}>
            <Modal
                showTrigger = {(val) => showTrigger(val)}
                tryLogin = {props.tryLogin}
                tryRegister = {props.tryRegister}
                isLogin = {login}
                isRegister = {register}
                loginData = {props.loginData}
            />
        </div>

        </>
    )
}
