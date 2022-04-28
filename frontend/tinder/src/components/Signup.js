import './Signup.css';
import { useState } from 'react';
// import { createUserWithEmailAndPassword, 
//     onAuthStateChanged
//  } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
const url = "http://localhost:3030/auth/" 


// function Createuser() {

//     // const [registerEmail, setRegisterEmail] = useState("");
//     // const [registerPw, setRegisterPw] = useState("");
//     // let navigate = useNavigate();

//     // const [user, setUser] = useState({});

//     // // onAuthStateChanged(auth, (currentUser) => {
//     // //     setUser(currentUser);
//     // // })

//     const register = async () => {
//         try {
//             // const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPw);
//             // navigate("/")
//         } catch (error) {
//             console.log(error.message);
//         }
//     }



class signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {signuped: false, incorrect: false}
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.realNameRef = React.createRef();
        this.emailRef = React.createRef();
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


        axios.post(url + "signup", {
            username: uName,
            password: pwd,
            realname: realName,
            email: email,
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
    return (

    <body className = "CreateuserBackground">
        <div className="centerInfoDiv">
            <div className="contents">

                <div  className="logo">
                    Kindling
                </div>
                <div className = "createAccount">Create account</div>
                <div className = "usernameAndPassword">
                    <div className="emailField">
                        <div className="usernameTitle">
                            Email Address
                            {/* <input className="emailInput" type="text" placeholder="Email" onChange={(e) => setRegisterEmail(e.target.value)}/> */}
                        </div>

                        <div className = "userLogo">
                        </div>
                        <div className="underlineText1">
                        </div>
                    </div>

                    <div className="passwordField">
                        <div className="passwordTitle">
                            Password
                            {/* <input className="passwordInput" type="password" placeholder="Password" onChange={(e) => setRegisterPw(e.target.value)}/> */}
                        </div>
                            <div className="underlineText2">
                            </div>
                            <button onClick={register}>Submit</button>
                    </div>
                </div>
            </div>
            <div className = "userSkills"></div>
            <div className = "skills_to_learn">
            </div>
            <div className = "contactInfo">
            </div>
        </div>
    </body>
    )
};


export default withRouter(Signup);