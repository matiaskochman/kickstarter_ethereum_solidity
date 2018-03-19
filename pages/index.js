import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {

  //because I'm using next.js
  //because next.js uses server rendering (like a servlet)
  //replaces componentDidMount
  static async getInitialProps(){
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    //it goes to props
    return { campaigns };
  }

  render(){
    return (
      <div>{this.props.campaigns[0]}</div>
    )
  }
}

export default CampaignIndex;
