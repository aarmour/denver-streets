import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  get styles() {
    return {
      root: { height: '100%' }

    };
  }

  render() {
    const { styles } = this;

    return (
      <div style={styles.root}>
        {this.props.children}
      </div>
    );
  }

}

function mapStateToProps(/*state*/) {
  return {};
}

export default connect(mapStateToProps)(App);
