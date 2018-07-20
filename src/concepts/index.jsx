import React from 'react'
import ReactDOM from 'react-dom'


class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this._timmerId = setInterval(()=>{
            this.setState((prevState, props)=>{
                return {
                    date: new Date()
                }
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this._timmerId)
    }

    render() {
        return(
            <div>
                <h3>Time-Now:{this.state.date.toLocaleTimeString()}</h3>
            </div>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello world, my app</h1>
                <hr/>
                <Clock/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
