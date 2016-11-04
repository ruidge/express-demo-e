var React = require('react');

class baseLayout extends React.Component {
    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>{this.props.title}</title>
                <link rel='stylesheet' href="/stylesheets/common.css"/>
                <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
            </head>
            <body>
            {this.props.children}
            </body>
            </html>
        );
    }
}

module.exports = baseLayout;