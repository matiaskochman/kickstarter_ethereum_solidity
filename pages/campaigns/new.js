import React,{ Component } from 'react';
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Link,Router } from '../../routes'

class CampaignNew extends Component {

  state = {
    minimumContribution:'',
    errorMsg:'',
    loading:false
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading:true,errorMsg:''})
    try{
      let accounts = await web3.eth.getAccounts();

      await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0]
      })
      Router.pushRoute('/')
    } catch (err){
        this.setState({errorMsg:err.message})
    }

    this.setState({loading:false})
  }

  render(){
      return(
        <Layout>
          <h3>Create a Campaign</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
            <Form.Field>
              <label>Minimum contribution</label>
              <Input
                value={this.state.minimumContribution}
                label="wei"
                labelPosition="right"
                onChange={event => {this.setState({minimumContribution:event.target.value})}}
                />
            </Form.Field>
            <Message error header="Opsss" content={this.state.errorMsg}/>
            <Button loading={this.state.loading} primary>Create</Button>
          </Form>
        </Layout>
      )
  }
}

export default CampaignNew;
