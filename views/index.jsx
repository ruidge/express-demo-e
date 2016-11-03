var React = require('react');
var BaseNaver = require('./layouts/baseNaver.jsx');

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {secondsElapsed: 0};
    }

    tick() {
        this.setState((prevState) => ({
            secondsElapsed: prevState.secondsElapsed + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <BaseNaver title={this.props.title}>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <label style={ {fontSize:18,marginRight:20}}>测试地址:</label>
                    <a style={ {fontSize:30,color:'green'}} href="/testjjk" target="_blank">testjjk page</a>
                </div>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <label style={ {fontSize:18,marginRight:20}}><Timer /></label>
                </div>
            </BaseNaver>
        );
    }
}

module.exports = HomePage;