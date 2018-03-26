import React,{ Component } from 'react';
import { Form, Button, Input, Message } from "semantic-ui-react";

import Layout from '../../../components/Layout'
import factory from '../../../ethereum/factory'
import CampaignFunction from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link,Router } from '../../../routes'

class RequestNew extends Component {

  state = {
    value:'',
    description:'',
    recepient:'',
    errorMsg:'',
    loading:false
  }

  static async getInitialProps(props){
    const {address} = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = CampaignFunction(this.props.address)
    const { value,description,recipient,errorMsg,loading } = this.state;
    this.setState({loading:true,errorMsg:''})
    try{
      let accounts = await web3.eth.getAccounts();

      await campaign.methods
      .createRequest(
        description,
        web3.utils.toWei(value,'ether'),
        recipient
      )
      .send({
        from: accounts[0]
      })
      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (err){
        this.setState({errorMsg:err.message})
    }

    this.setState({loading:false})
  }

  render(){
      return(
        <Layout>
          <Link route={`/campaigns/${this.props.address}/requests`}>
            <a>Back</a>
          </Link>
          <h3>Create a Request</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
            <Form.Field>
              <label>Description</label>
              <Input
                value={this.state.description}
                onChange={event => {this.setState({description:event.target.value})}}
                />
            </Form.Field>
            <Form.Field>
              <label>Value in ether</label>
              <Input
                value={this.state.value}
                onChange={event => {this.setState({value:event.target.value})}}
                />
            </Form.Field>
            <Form.Field>
              <label>Recipient</label>
              <Input
                value={this.state.recipient}
                onChange = {event => {this.setState({recipient:event.target.value})}}
                />
            </Form.Field>

            <Message error header="Opsss" content={this.state.errorMsg}/>
            <Button loading={this.state.loading} primary>Create</Button>
          </Form>
        </Layout>
      )
  }
}

export default RequestNew;
