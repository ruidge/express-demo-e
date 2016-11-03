var React = require('react');
var BaseLayout = require('./layouts/baseLayout.jsx');

class ErrorPage extends React.Component {
    render() {
        return (
            <BaseLayout title={this.props.title}>
                <div style={ {marginLeft:30,marginRight:30, backgroundColor:'white'}}>
                    <h1 style={ {marginTop:100, fontSize:50}}>404 Not Found</h1>
                </div>
            </BaseLayout>
        );
    }
}

module.exports = ErrorPage;