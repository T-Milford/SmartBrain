import React from 'react';
import '../SmartBrain/SmartBrain.css';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    updateEmail = (event) => {
        this.setState({email: event.target.value})
    }

    updatePassword = (event) => {
        this.setState({password: event.target.value})
    }
    
    sendCreds = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user  => {
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.setRoute('home')
                }
            })
    }

    render(){
        const { setRoute } = this.props;
        return (
            <main className="pa4 black-80 ba w5 center shadow-5 br3">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.updateEmail}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.updatePassword}/>
                        </div>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Login" onClick={this.sendCreds}/>
                        </div>
                        <div className="lh-copy mt3">
                            {/* how to send specific argument via 'register'? */}
                            
                            
                            <a href="#0" className="f6 link dim black db" value='register' 
                            onClick={() => setRoute('register')}>Sign up</a>
                            <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                        </div>
                    </fieldset>
                        
                    
                </form>
            </main>
        )
    }
}

export default Login;