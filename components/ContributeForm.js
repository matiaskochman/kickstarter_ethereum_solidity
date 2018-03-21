import React, { Component } from 'react';
import { Form, Button, Input, Message, Card } from "semantic-ui-react";

class ContributeForm extends Component {

  state = {
    value:''
  }

  render(){
    return(
      <Form>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value:event.target.value})}
            label="ether"
            labelPosition="right"/>
        </Form.Field>
        <Button primary>
          Contribute!
        </Button>
      </Form>
    )
  }
}

export default ContributeForm;
