var React = require('react');
var BaseNaver = require('./layouts/baseNaver.jsx');

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {secondsElapsed: 100};
    }

    getInitialState() {
        this.setState(() => ({
            secondsElapsed: 1000
        }));
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
        //重复的key只显示第一个
        const numbers = [1, 2, 3, 4, 4, 5];
        const listItems = numbers.map((number) =>
                <ul key={number.toString()}>{number}</ul>
        );

        return (
            <div>
                <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
            </div>
        );
    }
}

var HelloWorld = React.createClass({
    render: function () {
        const element = (
            <div style={ {fontSize:18,color:'green'}}>
                <h1>Hello, world!</h1>
            </div>
        );
        return element;
    }
});

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