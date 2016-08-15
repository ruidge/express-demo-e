import React from 'react';

class Root extends React.Component {
    render() {
        alert("hahahaha");
        return <h1>Hello from {this.props.phrase}!</h1>;
    }
}

export default Root;