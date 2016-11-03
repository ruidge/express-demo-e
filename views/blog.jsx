var React = require('react');
var BaseLayout = require('./layouts/baselayout.jsx');

class BlogPage extends React.Component {

    getHtmlData() {
        return {__html: this.props.sdata};
    }

    render() {
        return (
            <BaseLayout title={this.props.title}>
                <div style={ {marginLeft:140,backgroundColor:'white'}}>
                    <div dangerouslySetInnerHTML={this.getHtmlData()}/>
                </div>
            </BaseLayout>
        );
    }
}

module.exports = BlogPage;