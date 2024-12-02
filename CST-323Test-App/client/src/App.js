import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

// Pages
import { Home, About, Account } from './pages';

export default function App() {
  return (
    <Router>
      <Navbar collapseOnSelect bg='dark' expand='md'>
        <Navbar.Brand className='font-weight-bold text-muted'>TWIT(ER)</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Item>
            <LinkContainer to='/'>
              <Nav.Link>Feed</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='/about'>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='/account'>
              <Nav.Link>Account</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Navbar>
      {/* A <Switch> looks through its children <Route>s and
    renders the first one that matches the current URL. */}
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/account'>
          <Account />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
