import React,{ Component } from 'react';
import { Form, Button, Input, Message, Card, Grid } from "semantic-ui-react";
import Layout from '../../components/Layout'
import ContributeForm from '../../components/ContributeForm'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Link,Router } from '../../routes'
import CampaignFunction from '../../ethereum/campaign'

class CampaignShow extends Component {

  //because I'm using next.js
  //because next.js uses server rendering (like a servlet)
  //replaces componentDidMount
  //its props are different from the normal props of the CampaignShow
  static async getInitialProps(props) {

    //address is the parameter used in routes.js
    const campaign = CampaignFunction(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    //console.log(summary);


    //it goes to props
    return {
      campaignAddress:props.query.address,
      minimumContribution:summary[0],
      balance:summary[1],
      requestsCount:summary[2],
      approversCount:summary[3],
      manager:summary[4]
     };
  }

  renderCards(){

    console.log(this.props)

    const {
      campaignAddress,
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager
    } = this.props;

    const items = [
      {
        header:manager,
        meta:'Address of Manager',
        description:'the creator of the campaign',
        style: {overflowWrap:'break-word'}
      },
      {
        header:minimumContribution,
        meta:'Minimun Contribution (wei)',
        description:'the minimun contribution allowed.'
      },
      {
        header:requestsCount,
        meta:'Number of requests',
        description:'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
        style: {overflowWrap:'break-word'}
      },
      {
        header:approversCount,
        meta:'Number of Approvers',
        description:'Number of peoplo who has already donated to this campaign.',
        style: {overflowWrap:'break-word'}
      },
      {
        header:web3.utils.fromWei(balance,'ether'),
        meta:'Campaign Balance (ether)',
        description:'amount of money left to spend.',
        style: {overflowWrap:'break-word'}
      }
    ]

    return (
      <Card.Group items={items} />
    )
  }

  render(){

    return(
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>

          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm campaignAddress={this.props.campaignAddress}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>

            <Grid.Column>
              <Link route={`/campaigns/${this.props.campaignAddress}/requests`}>
                <a>
                  <Button>
                    View Requests
                  </Button>
                </a>
              </Link>
            </Grid.Column>

          </Grid.Row>

        </Grid>
      </Layout>
    )

  }
}
export default CampaignShow;
