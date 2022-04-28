import React from 'react';

import {Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

// import "../css/signup.css"

import axios from 'axios'
const url = "http://localhost:3030/auth/" 

class signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {signuped: false, incorrect: false, pictures: []}
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.realNameRef = React.createRef();
        this.emailRef = React.createRef();
    }

    onDrop(pictureFiles, pictureDataURLs) {
        console.log("ondrop")
        console.log(pictureFiles[0])
        console.log(pictureDataURLs)

        this.setState({
            picture: pictureFiles[0]
        });
    }

    switch = (e) => {
        console.log()
        this.setState({switchPage: true})
        e.preventDefault();
        console.log('switch')
        this.props.history.push('/signin');
    }

    signupAttempt = (e)  => {
        e.preventDefault();
        console.log("signup attempt")
        const uName = this.usernameRef.current.value;
        const pwd = this.passwordRef.current.value;
        const realName = this.realNameRef.current.value;
        const email = this.emailRef.current.value;

        var pfpUrl = this.state.profileUrl
        if (pfpUrl === null || pfpUrl === undefined) {
            pfpUrl = ""
        }
        console.log(pfpUrl)

        axios.post(url + "signup", {
            username: uName,
            password: pwd,
            realname: realName,
            email: email,
            pfp: pfpUrl
        }).then((result) => {
                if (result.data.message === "success") {
                    let id = result.data.id
                    console.log("signuped success in! Token: ");
                    this.switch(e)
                } else {
                    console.log("Did not signup");
                    this.setState({incorrect: true})
                     // switch page to proper url
                }},(err) => {
                    console.log("Did not signup");
                    this.setState({incorrect: true})
                    console.log(err)
                }
            )
    }
    showWidget = (e) => {
        if (this.state.noMoreUpload) {
            alert('Only 1 profile picture upload allowed.')
            return;
        }
        e.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "dqfre6apd",
            uploadPreset: "nbmcvhae" },
            (error, result) => {this.checkUploadResult(result)})
        console.log("showWidget")
        widget.open()
    }
    checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
            console.log(resultEvent.info.secure_url)
            this.setState({noMoreUpload: true, profileUrl: resultEvent.info.secure_url})
        }
    }
    render() {
        const { incorrect } = this.state;
        let warn = <div></div>;
        if (incorrect) {
            warn = <div className="warning">Failed to signup. Please try again with a new username.</div>
        }
        return(
            <div className = 'wrapper' style={{display: "block"}}>
                {/* <div className = 'nav-bar' >
                        <Header />
                </div> */}
                <div className = "separator">

                </div>
                <div className='content'>
                    <div className="title">Signup</div> 
                    {warn}
                <Form className="form">
                    <Form.Group className = "field" controlId="formBasicName">
                        <Form.Control ref={this.realNameRef} type="name" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className = "field" controlId="formBasicUsername">
                        <Form.Control ref={this.usernameRef} type="name" placeholder="Username" />
                    </Form.Group>
                    <Form.Group className = "field" controlId="formBasicEmail">
                        <Form.Control ref={this.emailRef} type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className = "field" controlId="formBasicPassword">
                        <Form.Control ref={this.passwordRef} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button className = "submitButton" style={{marginBottom: 25}} onClick={(e) => this.showWidget(e)}>
                        Upload Profile Picture
                    </Button>

                    <Button className = "submitButton" onClick={(e) => this.signupAttempt(e)} id="signup" variant="primary" type="submit">
                        signup
                    </Button>
                </Form>
                <div className="subtext" onClick={(e) => this.switch(e)}>Already have an account?</div>
                </div>
            </div>
        )
        
    }
}



export default withRouter(Signup);