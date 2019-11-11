import React from 'react';
import Debug from '../../../components/Debug';
import Form from '../../../components/Form';
import { useSelector, connect } from 'react-redux';
import { getCartItems } from '../../../modules/cart';
import { IOrderItem } from '../types';
import './order-form.css'


const initialValues = {
    clientName: '',
    phone: '',
    email: '',
    address: '',
    pizzas: [] as IOrderItem[],
    bill: 0
};

/* On  */
function OrderForm() {
    const chosenCartItems = useSelector(getCartItems) || [];
    initialValues.pizzas = chosenCartItems;

  return (
    <Form initialValues={initialValues} validate={validate} submit={submit}>
      <div className="row justify-content-md-center">
        <div className="col-6">
          <div className="card">
            <div className="card-body">

              <Form.State>
                  {form => !(form.values.pizzas && form.values.pizzas.reduce((sum: number, p: IOrderItem) => sum + p.count, 0) > 0) 
                  ? <></> 
                  : 
                      <div className="container">
                        <Form.Field name="clientName" label="Name*"/>
                        <Form.Field name="phone" label="Phone*" component="phone" placeholder="Format: +359-XX-XXXX-XXX"/>
                        <Form.Field name="email" label="Email*" component="email" />
                        <Form.Field name="address" label="Address*" component="textarea" />  
                        <div className="mt-2 pt-4 border-top">
                            <Form.Submit />
                        </div>
                      </div>  
                  }
              </Form.State> 
            </div>
          </div>
        </div>
        <div className="col-6">
          <Form.State>{(state) => <Debug value={state} />}</Form.State>
        </div>
      </div>
    </Form>
  );
}

const userInputReq = {
    clientNameRegex: /^\s*([a-zA-Z]+\s*[a-zA-Z]*){5,55}\s*$/,
    phoneRegex: /(\+359-[0-9]{2}-[0-9]{4}-[0-9]{3}){1}$/,
    emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    clientAddressRegex: /^\s*([a-zA-Z0-9\.]+\s*[a-zA-Z0-9\.]*){15,100}\s*$/
}

function validate(values: any) {
    const errors: any = {};

    if (!values.clientName || !values.clientName.match(userInputReq.clientNameRegex)) {
      errors.clientName = !values.clientName ? 'Client Name is Required' : 'Client name should be between 5 and 55 valid charaters long.';
    }
  
    if (!values.phone || !values.phone.match(userInputReq.phoneRegex)) {
      errors.phone = !values.phone ? 'Phone number Required' : 'Provided number does not corresponds to expected format.';
    }
  
    if (!values.email || !values.email.match(userInputReq.emailRegex)) {
      errors.email = !values.email ? 'Email is Required' : 'Email is not in a correct format';
    }
  
    if (!values.address || !values.address.match(userInputReq.clientAddressRegex)) {
      errors.address = !values.address ? 'Address is Required' : 'Provided address should be between 15 and 100 valid charaters long.';
    }
  
    return errors;
}

function submit(values: any) {
  console.log(values);
}

const decorate = connect();
export default decorate(OrderForm);