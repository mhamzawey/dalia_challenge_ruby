import React, { Component } from 'react';
import './App.css';
import {getEvents} from "./api";
import {EventTable} from "./Components";
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _events: null
        };

        getEvents(1).then(res => this.setState({_events:res.data}))
            .catch(err => alert("An error occurred"));

    }



    render() {
        console.log(this.state._events)
        if(!this.state._events){
            return null
        }
        else{
            return (
                <EventTable _events={this.state._events} />
            );
        }

    }
}

export default App;
