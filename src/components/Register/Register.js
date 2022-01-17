import React from 'react';
import '../SmartBrain/SmartBrain.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newName:'',
            newEmail:'',
            newPassword:''
        }
    }
    
    onNewName = (event) => {
        this.setState({newName: event.target.value})
    }

    onNewEmail = (event) => {
        this.setState({newEmail: event.target.value})
    }

    onNewPassword = (event) => {
        this.setState({newPassword: event.target.value})
    }

    onSubmitNewUser = event => {
        event.preventDefault();
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.newName,
                email: this.state.newEmail,
                password: this.state.newPassword
            })
        })
            .then(response => response.json())
            .then(user  => {
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.setRoute('home');
                }
            })
    }

    render(){
        const { setRoute } = this.props;
        return (
            <main className="pa4 black-80 ba w5 center shadow-5 br3">
                <form className="measure center">
                    <fieldset id="register" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNewName}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onNewEmail}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onNewPassword}/>
                        </div>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Create Account" onClick={this.onSubmitNewUser}/>
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" className="f6 link dim black db" onClick={() => setRoute('login')}>Return to login</a>
                        </div>
                    </fieldset>
                </form>
            </main>
        )
    }
}

export default Register;