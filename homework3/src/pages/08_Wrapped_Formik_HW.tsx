import React from 'react';
import Debug from '../components/Debug';
import Form from '../components/Form';


const initialValues = {
    clientName: '',
    phone: '',
    email: '',
    address: '',
    pizzas: [
        { id: 1, name: 'Pizza 1', count: 2, price: 20 },
        { id: 2, name: 'Pizza 2', count: 5, price: 30 },
        { id: 3, name: 'Pizza 3', count: 6, price: 40 },
        { id: 4, name: 'Pizza 4', count: 88, price: 60 }
    ],
    bill: 0
};

export default function Page() {
  return (
    <Form initialValues={initialValues} validate={validate} submit={submit}>
      <div className="row justify-content-md-center">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Shopping Cart</h1>

              <Form.Field name="pizzas" component={PizzasInput} />
              <Form.State>
                  {form => form.values.pizzas.length > 0 && 
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

function calculateBill(values: any) {
    return values.reduce((sum: number, pizza: any) => sum + pizza.count * pizza.price, 0);
}

function submit(values: any) {
  console.log(values);
}

function PizzasInput({ arrayHelpers, array }: any) {
  return (
    <React.Fragment>
      {array.map((_value: any, index: number) => (
        <div className="form-row" key={index}>
          <div className="form-group mr-1">
            <div className="">{index + 1}</div>
          </div>
          <div className="form-group mr-1">
            <Form.Input
              name={`${arrayHelpers.name}.${index}.name`}
              className="form-control form-control-sm"
              readOnly={true}
            />
          </div>
          <div className="form-group mr-1">
            <Form.Input
              name={`${arrayHelpers.name}.${index}.count`}
              className="form-control form-control-sm"
              readOnly={true}
            />
          </div><div className="form-group mr-1">
            <Form.Input
              name={`${arrayHelpers.name}.${index}.price`}
              value={`$ ${_value.price}`}
              className="form-control form-control-sm"
              readOnly={true}
            />
          </div>
          <div className="form-group ">
            <button
              className="btn btn-danger btn-sm"
              onClick={e => {
                e.preventDefault();
                arrayHelpers.remove(index);
              }}>
              remove
            </button>
          </div>
        </div>
      ))}

    <div className="form-group d-block">
        <Form.Field name="Total" value={`$ ${calculateBill(array)}`} />
    </div>
    </React.Fragment>
  );
}

PizzasInput.isArray = true;
