import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProtectedRoute from './components/ProtectedRoutes';
import AdminRoute from './components/AdminRoute';
import DashboardScreen from './screens/DashBoardScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import { Image } from 'react-bootstrap';


function App() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  //Clearing session data after user logout
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position='top-center' limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Link to="/">
                <Image src='/images/home.png' style={{ height: '3rem', color: 'white' }} />
              </Link>
              <LinkContainer to="/">
                <Navbar.Brand>E-Mart</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {/* Show username in navbar */}
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderHistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link className='dropdown-item' to="#signout" onClick={signoutHandler}>Sign Out</Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">SignIn</Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          {/* Adding Routes to all pages in the application */}
          <Container className="mt-4">
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              } />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeOrder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              } />
              <Route path="/orderhistory" element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              } />
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              } />
              <Route path="/admin/orders" element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              } />
              <Route path="/admin/products" element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              } />
              <Route path="/admin/product/:id" element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              } />
              <Route path="/admin/user/:id" element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              } />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center bg-dark text-white mt-3'>@Web Design Final Project 2022 - Group 16</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
