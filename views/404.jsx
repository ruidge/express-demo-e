var React = require('react');
var BaseLayout = require('./layouts/baseLayout.jsx');

class ErrorPage extends React.Component {
    render() {
        return (
            <BaseLayout title={this.props.title}>
                <div style={ {marginLeft:30,marginRight:30,backgroundColor:'white'}}>
                    <h1 style={ {fontSize:16}}>{this.props.message}</h1>

                    <h1 style={ {fontSize:16}}>{this.props.error.status}</h1>

                    <pre style={ {fontSize:16}}>{this.props.error.stack}</pre>
                </div>
            </BaseLayout>
        );
    }
}

module.exports = ErrorPage;