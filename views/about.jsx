var React = require('react');
var BaseNaver = require('./layouts/baseNaver.jsx');

class AboutPage extends React.Component {
    render() {
        return (
            <BaseNaver title={this.props.title}>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <p style={ {fontSize:20,color:'green'}}>ruidge</p>

                    <p style={ {fontSize:20,color:'green'}}>Android Developer</p>

                    <p style={ {fontSize:20,color:'green'}}>Weibo: <a href="http://weibo.com/zr714" target="_blank">ruidge</a>
                    </p>

                    <p style={ {fontSize:20,color:'green'}}>Email: <a href="mailto://ruidge@qq.com" target="_blank">ruidge@qq.com</a>
                    </p>
                </div>
            </BaseNaver>
        );
    }
}

module.exports = AboutPage;