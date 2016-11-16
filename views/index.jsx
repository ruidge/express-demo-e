var React = require('react');
var BaseNaver = require('./layouts/baseNaver.jsx');

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {secondsElapsed: 100};
    }

    tick() {
        this.setState((prevState) => ({
            secondsElapsed: prevState.secondsElapsed + 1
        }));
    }

    componentDidMount() {
        console.log('Class Timer has mounted');
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

    //Declaring Prop Types and Default Props
    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            name: 'Mary'
        };
    },

    getInitialState: function () {
        return {count: this.props.count, name: 'Jack'};
    },

    render: function () {
        const element = (
            <div style={ {fontSize:18,color:'green'}}>
                <h1>Hello, {this.props.name} !</h1>
            </div>
        );
        return element;
    }
});

var SetIntervalMixin = {
    componentWillMount: function () {
        this.intervals = [];
    },
    setInterval: function () {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function () {
        this.intervals.forEach(clearInterval);
    }
};

var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // Use the mixin
    getInitialState: function () {
        return {seconds: 0};
    },
    componentDidMount: function () {
        this.setInterval(this.tick, 1000); // Call a method on the mixin
    },
    tick: function () {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function () {
        return (
            <p>
                React has been running for {this.state.seconds} seconds.
            </p>
        );
    }
});


var InputState = React.createClass({
    getInitialState: function () {
        return {enable: false};
    },
    handleClick: function (event) {
        this.setState({enable: !this.state.enable});
    },
    render: function () {
        return (<p><input type="text" disabled={this.state.enable}/>
            <button onClick={this.handleClick}>Change State</button>
        </p> );
    }
});

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
                    <TickTock ></TickTock>
                    <InputState ></InputState>
                </div>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <label style={ {fontSize:18,marginRight:20}}><Timer /></label>
                </div>
            </BaseNaver>
        );
    }
}

module.exports = HomePage;