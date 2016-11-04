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

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const element = (
            <div style={ {fontSize:18,color:'green'}}>
                <h1>Hello, world!</h1>
            </div>
        );

        return element;
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    //lifecycle hooks
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    //lifecycle hooks
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const element = (
            <div style={ {fontSize:18,color:'green'}}>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        );

        return element;
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <BaseNaver title={this.props.title}>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <label style={ {fontSize:18,marginRight:20}}>测试地址:</label>
                    <a style={ {fontSize:30}} href="/testjjk" target="_blank">testjjk page</a>
                </div>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <HelloWorld ></HelloWorld>
                    <Clock ></Clock>

                </div>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <label style={ {fontSize:18,marginRight:20}}><Timer /></label>
                </div>
            </BaseNaver>
        );
    }
}

module.exports = HomePage;