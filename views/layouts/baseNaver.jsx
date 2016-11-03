var React = require('react');
var BaseLayout = require('./baseLayout.jsx');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

class baseNaver extends React.Component {
    render() {
        return (
            <BaseLayout title={this.props.title}>
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
            </BaseLayout>
        );
    }
}

module.exports = baseNaver;