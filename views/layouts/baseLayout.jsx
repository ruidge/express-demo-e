var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

class baseNaver extends React.Component {
    render() {
        return (
            <html>
            <head>
                <meta charset="utf-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>{this.props.title}</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel='stylesheet' href="/stylesheets/common.css"/>
                <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
            </head>
            <body>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">ruidge.cn</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="/">Home</NavItem>
                    <NavItem eventKey={1} href="/blog">Blog</NavItem>
                    <NavItem eventKey={2} href="/mock">Mock</NavItem>
                    <NavItem eventKey={2} href="/about">About</NavItem>
                </Nav>
            </Navbar>
            {this.props.children}
            </body>
            </html>
        );
    }
}

module.exports = baseNaver;