import React, { Component } from 'react';
import classes from './Layout.scss';

import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

class Layout extends Component {
  state = {
    menu: false
  };

  handleToggleMenu = () => {
    this.setState({
      menu: !this.state.menu
    });
  };

  handleMenuClose = () => {
    this.setState({
      menu: false
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.handleMenuClose} />
        <MenuToggle onToggle={this.handleToggleMenu} isOpen={this.state.menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;