import React, { Component } from 'react';
import BasePanel from '../BasePanel';
import { InfoList, InfoListItem } from '../../components';

export default class IndexPanel extends Component {

  render() {
    return (
      <BasePanel>
        <InfoList>
          <InfoListItem title="B-Cycle Stations" query="B-cycle" />
          <InfoListItem title="RTD Light Rail Stations" query="Light Rail" />
          <InfoListItem title="Restaurants" query="Restaurants" />
        </InfoList>
      </BasePanel>
    );
  }

}
