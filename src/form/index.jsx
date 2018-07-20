import React from 'react'

class UpperInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        // never to retrieve the event.target in callback function,
        // it will be null by then,
        // so pick up it here right now
        const value = event.target.value.toUpperCase()
        this.setState((pre)=>{
            return {
                value: value
            }
        })
    }

    render() {
        // extend the input element with props
        return React.createElement('input', Object.assign({}, {
            type: 'text',
            value: this.state.value,
            onChange: this.handleChange,
        }, this.props))
    }
}


class TextArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log("textarea changing")
        this.setState({value: event.target.value})
    }
    render() {
        return React.createElement('textarea', Object.assign({}, {
            onChange: this.handleChange
        }, this.props))
    }
}


class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value || ''
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.setState({value: event.target.value})
    }

    render(){
        return React.createElement('select', Object.assign({}, {
            onChange: this.onChange,
            value: this.state.value,
        }, this.props))
    }
}

class MultiSelect extends React.Component {
    constructor(props) {
        super(props)
        // check props
        this.options = props.options
        let set = {}
        let externalValues = props.value || []
        externalValues.every((x)=>{set[x]=1; return true})
        this.state = {
            valueSet: set
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        const clicked = event.target.value
        this.setState((pre)=>{
            let set = pre.valueSet
            if(set.hasOwnProperty(clicked)) {
                delete set[clicked]
            }else{
                set[clicked] = 1
            }
            console.log(set)
            return {
                valueSet: set
            }
        })
    }

    render(){
        return (
            <select multiple={true} name={this.props.name} id={this.props.id || this.props.name}
                    value={Object.keys(this.state.valueSet)} onChange={this.onChange}>
                {/* inline function to create options list */}
                {(()=>{
                    let items = []
                    this.options.every((x)=>{
                        items.push(<option key={x} value={x}>{x}</option>)
                        return true
                    })
                    return items
                })()}
            </select>
        )
    }
}


class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.fileInput = React.createRef()

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.fileInput.current.files)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    UpperName:
                    <UpperInput placeholder='Your UpperName' name='upper_name'/>
                </label>
                <label>
                    Essay:
                    <TextArea/>
                </label>
                <label>
                    Your Choices:
                    <MultiSelect options={['apple', 'pear', 'python', 'golang']} value={['pear']}/>
                </label>
                <input type="submit" value="Submit" />
                <div>
                    <label >
                        <input type="file" ref={this.fileInput}/>
                    </label>
                </div>
            </form>
        );
    }
}

import ReactDOM from 'react-dom'
ReactDOM.render(
    <MyForm />,
    document.getElementById('root')
);