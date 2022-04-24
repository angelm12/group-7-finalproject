import React, { useState } from 'react';
import './Match.css';

//assume props contains the username for a match
//TODO: add a route in server.js that returns data for a user with /users/{username}
const Match = props => {
    const [matchData, setMatchData] = useState({});
    useEffect ( () => {
        let username = props.username;
        //fetch the user data for the matched profile and store it in matchData
        fetch("mongodb://127.0.0.1:27017/tinder2.0/users/" + username)
        .then(response => response.json())
        .then(jsonStr => setMatchData(jsonStr));
    }, []);

    return (
            //name of match, skills they offer, skills they are looking for, and email
        <div className = "matchBox">
            <h1 className = "username">{matchData.username}</h1>
            <div className = "titleText">Skills:</div>
            <div className = "userSkills">
                {matchData.skills.length != 0 ? matchData.skills.map(el => {
                    return (
                        <div className = "skill">
                            {el}
                        </div>
                    )
                }) : []}
            </div>
            <div className = "userSkills">Wants to Learn:</div>
            <div className = "skills_to_learn">
                {matchData.skills_to_learn.length != 0 ? matchData.skills_to_learn.map(el => {
                    return (
                        <div className = "skill">
                            {el}
                        </div>
                    )
                }) : []}
            </div>
            <div className = "contactInfo">
                {matchData.email}
            </div>
        </div>
    )
};

export default Match;