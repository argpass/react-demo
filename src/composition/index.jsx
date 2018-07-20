import React from 'react'
import style from './style.less'

function FancyBorder(props) {
    return(
        <div className={`${style['fancy-border']} ${style['fancy-border-'+props.color]}`}>
            {props.children}
        </div>
    )
}

class App extends React.Component{
    render() {
        return(
            <div>
                <h2>Composition Example</h2>
                <hr/>
                <FancyBorder color={'blue'}>
                    this is in border
                </FancyBorder>
            </div>
        )
    }
}

import ReactDOM from 'react-dom'

ReactDOM.render(
    <App />,
    document.getElementById('root')
);