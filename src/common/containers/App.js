import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from '../components/Panel';
import MapGL from '../components/MapGL';
import IndexPanel from './IndexPanel';

class App extends Component {

  get styles() {
    return {
      root: { height: '100%' },
      content: { height: '100%' }
    };
  }

  renderContent() {
    const { content } = this.props;

    if (content) return content;

    const zoom = 12;
    const center = [-104.9848, 39.7392];
    const maxBounds = [[-105.27, 39.35], [-104.60, 39.93]];

    return (
      <MapGL
        zoom={zoom}
        center={center}
        maxBounds={maxBounds}
      />
    );
  }

  render() {
    const { styles } = this;


    return (
      <div style={styles.root}>
        <Panel>{this.props.panel || <IndexPanel />}</Panel>
        <div style={styles.content}>{this.renderContent()}</div>
      </div>
    );
  }

}

function mapStateToProps(/*state*/) {
  return {};
}

export default connect(mapStateToProps)(App);
