var React = require('react');
var BaseNaver = require('./layouts/baseNaver.jsx');

class BlogPage extends React.Component {

    getHtmlData() {
        return {__html: this.props.sdata};
    }

    render() {
        return (
            <BaseNaver title={this.props.title}>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <div dangerouslySetInnerHTML={this.getHtmlData()}/>
                </div>
            </BaseNaver>
        );
    }
}

module.exports = BlogPage;