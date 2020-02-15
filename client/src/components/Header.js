import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className='nav-wraper'>
          <a className='left brand-logo'>Emaily</a>
          <ul className='right'>
            <li>
              <a href='/auth/google'>Login With Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
