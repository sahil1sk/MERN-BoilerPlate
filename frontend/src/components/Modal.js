import React, {Component} from 'react'
import './app.css';
import {Control, Errors, LocalForm} from 'react-redux-form';

const required = (val) => val && val.length; // so here we make to check len is greater than 0 if value having length then it will return true otherwise false
const minLength = (len) => (val) => (val) && (val.length >= len); // this will help to make there must be that min length
const noSpace = (val) =>  /^\S*$/i.test(val);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val); // using regular expression we check the email
const validPassword = (val) => /^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/i.test(val); // this is for password it must contain a number and an alpabet

export default class Modal extends Component{

    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(values) {
        this.props.tryLogin(values.name.toLowerCase(), values.password);
    }

    
    handleRegister(values){
        if(values.password1 === values.password2){  
            this.props.tryRegister(values.name.toLowerCase(), values.email, values.password1)
        }else{
            alert('Your Password Field is Mismatched!');
        }    
    }

    render(){

        return (
            <>              
                    <div className={this.props.isLogin ? "container showPage" : "container notPage"}>

                        <div>
                            <div id="accountHead">
                                <h5>Login</h5>
                                <hr/>
                            </div>
                            
                            <div>
                                <LocalForm onSubmit={(values) => this.handleLogin(values)}> {/*So using arrow funciton we send all the values*/}
                                    <div className="div form-group"> 
                                        <label htmlFor="name" className="col-md-12">Name</label> 
                                        <div className="col-md-12">                                                    
                                        <Control.text model=".name" id="name" 
                                                placeholder="Name"
                                                name="name"  
                                                className="form-control" 
                                                validators = {{
                                                required, noSpace
                                                }} 
                                            />
                                        
                                        <Errors className="text-danger" 
                                                model=".name"
                                                show="touched"
                                                messages={{
                                                    required: "It is Required. ",
                                                    noSpace: "There must be no space in your username."
                                                }}
                                            />

                                        </div>
                                    </div>

                                    <div className="div form-group"> 
                                        <label htmlFor="password" className="col-md-12">Password </label> 
                                        <div className="col-md-12">                                                    
                                        <Control.text model=".password" id="password" name="password" 
                                                placeholder="Password" className="form-control" type="password"
                                                validators = {{
                                                    required, minLength: minLength(8)
                                                }} 
                                        />

                                            <Errors className="text-danger" 
                                                model=".password"
                                                show="touched"
                                                messages={{
                                                    required: "It is required.\n",  
                                                    minLength: "Must be greater than 8 digits."
                                                }}
                                            />

                                        </div>
                                    </div>    
                                    
                                    
                                    <div className="modal-footer">
                                        <hr/>                               
                                        <p style={{marginRight:"auto"}} >If you don't have account <span onClick={() => this.props.showTrigger()} id="showUnderLine">Register</span> here.</p>
                                        <button type="button" onClick={() => this.props.showTrigger("login")} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>

                                </LocalForm>  
                            </div>
                        </div>
                    </div>
                    
                <div className={this.props.isRegister ? "container showPage" : "container notPage"}>
                    <div>
                        <h5>Register</h5>
                        <hr/>
                    </div>
                    <div>
                        <LocalForm model="registration" onSubmit={ (values) => this.handleRegister(values)}> {/*So using arrow funciton we send all the values*/}

                            <div className="form-group"> 
                                <label htmlFor="name" className="col-md-12">Name</label> 
                                <div className="col-md-12">                                                    
                                <Control.text model=".name" id="name" 
                                        placeholder="Name"
                                        name="name"  
                                        className="form-control" 
                                        validators = {{
                                        required, noSpace
                                        }} 
                                    />
                                
                                <Errors className="text-danger" 
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: "It is Required.",
                                            noSpace: "No space between the username."
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="col-md-12">Email</label>
                                <div className="col-md-12">
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'It is Required.\n',
                                            validEmail: 'Provide Us the right email because that email is used to deliver your order'
                                        }}
                                    />
                                </div>
                            </div>


                            <div className="form-group"> 
                                <label htmlFor="password1" className="col-md-12">Password </label> 
                                <div className="col-md-12">                                                    
                                <Control.text model=".password1" id="password1" name="password1" type='password'
                                        placeholder="Password" className="form-control"
                                        validators = {{
                                            required, minLength: minLength(8) , validPassword
                                        }} 
                                />

                                    <Errors className="text-danger" 
                                        model=".password1"
                                        show="touched"
                                        messages={{
                                            required: "It is required.\n",  
                                            minLength: "Must be greater than 8 digits.\n",
                                            validPassword: "It must contain a numeric number and a alphabet character and must be one special character."
                                        }}
                                    />

                                </div>
                            </div>

                            <div className="form-group"> 
                                <label htmlFor="password2" className="col-md-12">Confirm Password </label> 
                                <div className="col-md-12">                                                    
                                <Control.text model=".password2" id="password2" name="password2" type='password'
                                        placeholder="Confirm Password" className="form-control"
                                        validators = {{
                                            required, minLength: minLength(8)
                                        }} 
                                />

                                    <Errors className="text-danger" 
                                        model=".password2"
                                        show="touched"
                                        messages={{
                                            required: "It is required.\n",  
                                            minLength: "Must be greater than 8 digits."
                                        }}
                                    />

                                </div>
                            </div>
                            
                            <div className="modal-footer">
                                <p style={{marginRight:"auto"}} data-toggle="modal" onClick={() => this.props.showTrigger("login")}>If you have account <span data-toggle="modal" data-target="#login" id="showUnderLine">Login</span> directly.</p>
                                <button type="button" className="btn btn-secondary" onClick={() => this.props.showTrigger()}>Close</button>
                                <button type="submit" value="submit" className="btn btn-primary">Register</button>
                            </div>

                        </LocalForm>
                    </div>
                </div>
            </>
        )
    }
}
