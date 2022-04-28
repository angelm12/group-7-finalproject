import { process_params } from 'express/lib/router';
import React from 'react';
import Match from './Match.js';
import axios from 'axios';

//props contains the User's information, but we only really need their matches' usernames for this component 

const MatchesPage = props => {
    const [matchData, setMatchData] = useState({});
    for (var i = 0; i < props.matches.length; i++) {
        axios.get("mongodb://127.0.0.1:27017/tinder2.0/users/" + props.matches[i])
        .then(res => setMatchData(res));
    return (
        <Match username = {matchData.username} skills = {matchData.skills} skills_to_learn = {matchData.skills_to_learn} email = {matchData.email} />
    )
    }
};

export default MatchesPage;