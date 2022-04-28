import { process_params } from 'express/lib/router';
import React from 'react';
import Match from './Match.js';
import axios from 'axios';

//props contains the User's information, but we only really need their matches' usernames for this component 

const MatchesPage = props => {
    //const [matchData, setMatchData] = useState({});
    //let match_objects = [];
    //for (var i = 0; i < props.matches.length; i++) {
        //axios.get("mongodb://127.0.0.1:27017/tinder2.0/users/" + props.matches[i])
        //.then(res => setMatchData(res));
        //match_objects.push(matchData);
    //}
    const match_objects = [
        {
            username: "Angelthegod",
            skills: ["React", "kickboxing", "chess grandmaster"],
            skills_to_learn: ["Ninjitsu", "gourmet cooking"],
            email: "angelj5@gmail.com"
        }, 
        {
            username: "NatPent",
            skills: ["Node", "kickboxing", "chess grandmaster"],
            skills_to_learn: ["Ninjitsu", "gourmet cooking"],
            email: "natp5@gmail.com"
        },
        {
            username: "VukP",
            skills: ["React", "kickboxing", "chess grandmaster"],
            skills_to_learn: ["Ninjitsu", "gourmet cooking"],
            email: "vukp5@gmail.com"

        }, 
        {
            username: "AdiP", 
            skills: ["React", "kickboxing", "chess grandmaster"],
            skills_to_learn: ["Ninjitsu", "gourmet cooking"],
            email: "adip5@gmail.com"
        }, 
        {
            username: "MatM", 
            skills: ["React", "kickboxing", "chess grandmaster"],
            skills_to_learn: ["Ninjitsu", "gourmet cooking"],
            email: "matm5@gmail.com"
        }
    ];
    return (
        <div>
            {match_objects.length != 0 ? match_objects.map(el => {
                return (
                    <Match username = {el.username} skills = {el.skills} skills_to_learn = {el.skills_to_learn} email = {el.email} />
                )
            }) : []};
        </div>
    )
};

export default MatchesPage;

