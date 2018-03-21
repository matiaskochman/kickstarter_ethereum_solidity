import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from '../components/Layout'
import { Link } from '../routes'


class CampaignIndex extends Component {
  //because I'm using next.js
  //because next.js uses server rendering (like a servlet)
  //replaces componentDidMount
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    //it goes to props
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

          <Link route="/campaigns/new">
            <a className="item">
              <Button
              floated='right'
              content="Create Campaign"
              icon="add circle"
              primary>
              </Button>
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
