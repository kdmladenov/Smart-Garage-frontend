import { BrowserRouter as Router } from 'react-router-dom';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer } from 'mdbreact';
import { useEffect, useState } from 'react';

const Header = () => {
  const breakWidth = 1300;
  const [stateA, toggleStateA] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleResize = () => { setWindowWidth(window.innerWidth); };

  const handleToggleClickA = () => { toggleStateA(!stateA); };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  const navStyle = {
    paddingLeft:
      windowWidth > breakWidth ? '210px' : '16px'
  };

  const mainStyle = {
    margin: '0 6%',
    paddingTop: '5.5rem',
    paddingLeft:
      windowWidth > breakWidth ? '240px' : '0'
  };

  const specialCaseNavbarStyles = {
    WebkitBoxOrient: 'horizontal',
    flexDirection: 'row'
  };

  return (
    <Router>
      <div className="fixed-sn light-blue-skin">
        <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
          <MDBNavbarNav left>
            <MDBNavItem>
              <div
                onClick={handleToggleClickA}
                key="sideNavToggleA"
                style={{
                  lineHeight: '32px',
                  marginRight: '1em',
                  verticalAlign: 'middle'
                }}
              >
                <MDBIcon icon="bars" color="white" size="2x" />
              </div>
            </MDBNavItem>
            <MDBNavItem className="d-none d-md-inline" style={{ paddingTop: 5 }}>
              Material Design for Bootstrap
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right style={specialCaseNavbarStyles}>
            <MDBNavItem active>
              <MDBNavLink to="#!">
                <MDBIcon icon="envelope" className="d-inline-inline" />{' '}
                <div className="d-none d-md-inline">Contact</div>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">
                <MDBIcon far icon="comments" className="d-inline-inline" />{' '}
                <div className="d-none d-md-inline">Support</div>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">
                <MDBIcon icon="user" className="d-inline-inline" />{' '}
                <div className="d-none d-md-inline">Account</div>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu right>
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
        <main style={mainStyle}>
          <MDBContainer fluid style={{ height: 2000 }} className="mt-5">
            <h2>
              Advanced Double Navigation with fixed SideNav & fixed Navbar:
            </h2>
            <br />
            <h5>1. Fixed side menu, hidden on small devices.</h5>
            <h5>
              2. Fixed Navbar. It will always stay visible on the top, even
              when you scroll down.
            </h5>
          </MDBContainer>
        </main>
      </div>
    </Router>
  );

  // class DoubleNavigationPage extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       toggleStateA: false,
  //       breakWidth: 1300,
  //       windowWidth: 0
  //     };
  //   }

  //   handleToggleClickA = () => {
  //     this.setState({
  //       toggleStateA: !this.state.toggleStateA
  //     });
  //   };

  //   render() {
  //     const navStyle = {
  //       paddingLeft:
  //         this.state.windowWidth > this.state.breakWidth ? "210px" : "16px"
  //     };

  //     const mainStyle = {
  //       margin: "0 6%",
  //       paddingTop: "5.5rem",
  //       paddingLeft:
  //         this.state.windowWidth > this.state.breakWidth ? "240px" : "0"
  //     };

  //     const specialCaseNavbarStyles = {
  //       WebkitBoxOrient: "horizontal",
  //       flexDirection: "row"
  //     };

  //     return (
  //       <Router>
  //         <div className="fixed-sn light-blue-skin">
  //           <MDBSideNav
  //             logo="https://mdbootstrap.com/img/logo/mdb-transparent.png"
  //             triggerOpening={this.state.toggleStateA}
  //             breakWidth={this.state.breakWidth}
  //             bg="https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg"
  //             mask="strong"
  //             fixed
  //           >
  //             <li>
  //               <ul className="social">
  //                 <li>
  //                   <a href="#!">
  //                     <MDBIcon fab icon="facebook-f" />
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#!">
  //                     <MDBIcon fab icon="pinterest" />
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#!">
  //                     <MDBIcon fab icon="google-plus-g" />
  //                   </a>
  //                 </li>
  //                 <li>
  //                   <a href="#!">
  //                     <MDBIcon fab icon="twitter" />
  //                   </a>
  //                 </li>
  //               </ul>
  //             </li>
  //             <MDBInput
  //               type="text"
  //               hint="Search"
  //               style={{
  //                 color: "#fff",
  //                 padding: "0 10px 8px 30px",
  //                 boxSizing: "border-box"
  //               }}
  //             />
  //             <MDBSideNavNav>
  //               <MDBSideNavCat
  //                 name="Submit blog"
  //                 id="submit-blog-cat"
  //                 icon="chevron-right"
  //               >
  //                 <MDBSideNavItem>Submit listing</MDBSideNavItem>
  //                 <MDBSideNavItem>Registration form</MDBSideNavItem>
  //               </MDBSideNavCat>
  //               <MDBSideNavCat
  //                 iconRegular
  //                 name="Instruction"
  //                 id="instruction-cat"
  //                 icon="hand-pointer"
  //               >
  //                 <MDBSideNavItem>For bloggers</MDBSideNavItem>
  //                 <MDBSideNavItem>For authors</MDBSideNavItem>
  //               </MDBSideNavCat>
  //               <MDBSideNavCat name="About" id="about-cat" icon="eye">
  //                 <MDBSideNavItem>Instruction</MDBSideNavItem>
  //                 <MDBSideNavItem>Monthly meetings</MDBSideNavItem>
  //               </MDBSideNavCat>
  //               <MDBSideNavCat
  //                 name="Contact me"
  //                 id="contact-me-cat"
  //                 icon="envelope"
  //               >
  //                 <MDBSideNavItem>FAQ</MDBSideNavItem>
  //                 <MDBSideNavItem>Write a message</MDBSideNavItem>
  //               </MDBSideNavCat>
  //             </MDBSideNavNav>
  //           </MDBSideNav>
  //           <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
  //             <MDBNavbarNav left>
  //               <MDBNavItem>
  //                 <div
  //                   onClick={this.handleToggleClickA}
  //                   key="sideNavToggleA"
  //                   style={{
  //                     lineHeight: "32px",
  //                     marginRight: "1em",
  //                     verticalAlign: "middle"
  //                   }}
  //                 >
  //                   <MDBIcon icon="bars" color="white" size="2x" />
  //                 </div>
  //               </MDBNavItem>
  //               <MDBNavItem className="d-none d-md-inline" style={{ paddingTop: 5 }}>
  //                 Material Design for Bootstrap
  //               </MDBNavItem>
  //             </MDBNavbarNav>
  //             <MDBNavbarNav right style={specialCaseNavbarStyles}>
  //               <MDBNavItem active>
  //                 <MDBNavLink to="#!">
  //                   <MDBIcon icon="envelope" className="d-inline-inline" />{" "}
  //                   <div className="d-none d-md-inline">Contact</div>
  //                 </MDBNavLink>
  //               </MDBNavItem>
  //               <MDBNavItem>
  //                 <MDBNavLink to="#!">
  //                   <MDBIcon far icon="comments" className="d-inline-inline" />{" "}
  //                   <div className="d-none d-md-inline">Support</div>
  //                 </MDBNavLink>
  //               </MDBNavItem>
  //               <MDBNavItem>
  //                 <MDBNavLink to="#!">
  //                   <MDBIcon icon="user" className="d-inline-inline" />{" "}
  //                   <div className="d-none d-md-inline">Account</div>
  //                 </MDBNavLink>
  //               </MDBNavItem>
  //               <MDBNavItem>
  //                 <MDBDropdown>
  //                   <MDBDropdownToggle nav caret>
  //                     <div className="d-none d-md-inline">Dropdown</div>
  //                   </MDBDropdownToggle>
  //                   <MDBDropdownMenu right>
  //                     <MDBDropdownItem href="#!">Action</MDBDropdownItem>
  //                     <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
  //                     <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
  //                     <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
  //                   </MDBDropdownMenu>
  //                 </MDBDropdown>
  //               </MDBNavItem>
  //             </MDBNavbarNav>
  //           </MDBNavbar>
  //           <main style={mainStyle}>
  //             <MDBContainer fluid style={{ height: 2000 }} className="mt-5">
  //               <h2>
  //                 Advanced Double Navigation with fixed SideNav & fixed Navbar:
  //               </h2>
  //               <br />
  //               <h5>1. Fixed side menu, hidden on small devices.</h5>
  //               <h5>
  //                 2. Fixed Navbar. It will always stay visible on the top, even
  //                 when you scroll down.
  //               </h5>
  //             </MDBContainer>
  //           </main>
  //         </div>
  //       </Router>
  //     );
  //   }
  // }

  // export default DoubleNavigationPage;
};

export default Header;
