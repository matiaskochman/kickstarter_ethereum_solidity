import React, { Component } from 'react';
import { Form, Button, Input, Message, Card } from "semantic-ui-react";
import CampaignFunction from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Link,Router } from '../routes'

class ContributeForm extends Component {

  state = {
    value:'',
    errorMsg:'',
    loading:false
  }

  submitFunction = async (event) => {
    event.preventDefault();

    this.setState({loading:true,errorMsg:''})

    console.log('aqui y en la concha')
    const campaign = CampaignFunction(this.props.campaignAddress);

    try{
      const accounts = await web3.eth.getAccounts();

      console.log(accounts)
      await campaign.methods.contribute().send({
        from:accounts[0],
        value:web3.utils.toWei(this.state.value,'ether')
      })

      Router.replaceRoute(`/campaigns/${this.props.campaignAddress}`)
    }catch(err){
        this.setState({errorMsg:err.message})
    }

    this.setState({loading:false})
  }

  render(){
    return(
      <Form onSubmit={this.submitFunction} error={!!this.state.errorMsg}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value:event.target.value})}
            label="ether"
            labelPosition="right"/>
        </Form.Field>
        <Message error header="Opsss" content={this.state.errorMsg}/>
        <Button loading={this.state.loading} primary>
          Contribute!
        </Button>
      </Form>
    )
  }
}

export default ContributeForm;
