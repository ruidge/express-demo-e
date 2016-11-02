var React = require('react');
var BaseLayout = require('./layouts/baselayout.jsx');

class HelloMessage extends React.Component {
    render() {
        return (
            <BaseLayout title={this.props.title}>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <label style={ {fontSize:18,marginRight:20}}>测试地址:</label>
                    <a style={ {fontSize:30,color:'green'}} href="/testjjk" target="_blank">testjjk page</a>
                </div>
            </ BaseLayout >
        );
    }
}

module.exports = HelloMessage;