import React from 'react';
import Debug from '../components/Debug';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import { tsExternalModuleReference } from '@babel/types';


interface IPizzaOrder {
  id: string;
  count: number;
  price: number;
}

interface IPizza extends IPizzaOrder {
  name: string;
  price: number;
}

const PIZZAS: IPizza[] = [
  { id: '1', name: 'Pizza 1', count: 2, price: 20 },
  { id: '2', name: 'Pizza 2', count: 2, price: 30 },
  { id: '3', name: 'Pizza 3', count: 2, price: 40 },
  { id: '4', name: 'Pizza 4', count: 2, price: 60 },
]

const initialValues = {
  clientName: '',
  phone: '',
  email: '',
  address: '',
  pizzas: []
};


export default function Page() {
  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
      {form => (
        <form onSubmit={form.handleSubmit}>
          <div className="row justify-content-md-center">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">Shopping Cart</h1>
                  
                  <FieldArray name="pizzas">
                      {arrayHelpers => (
                        <React.Fragment> 

                          <div className="form-group d-block">
                            <div className="form-label d-block">
                              <label htmlFor="pizzas" className="h3" >Pizzas
                                <button
                                  type="button"
                                  onClick={e => {
                                    e.preventDefault();
                                    arrayHelpers.push({
                                      id: "1",
                                      count: 1
                                    });
                                  }}
                                  className="btn btn-link p-0 add-pizza-btn">
                                  [add new]
                                </button>
                              </label>
                              <ErrorMessage name="pizzas">
                                {error => (
                                  <span className="text-danger float-right">
                                    {error}
                                  </span>
                                )}
                              </ErrorMessage>
                            </div>
                          </div>

                          {form.values.pizzas.map(
                            (_value: any, index: number) => (
                              <div className="form-row" key={index}>
                                <div className="form-group mr-2">
                                  <div>
                                    {index + 1}
                                  </div>
                                </div>
                                <div className="form-group mr-1">
                                  <Field
                                    id="name"
                                    name={`${
                                      arrayHelpers.name
                                    }.${index}.id`}
                                    className="form-control"
                                    component="select">
                                    {PIZZAS.map(({ name, id }, i) => (
                                      <option key={i} value={id}>
                                        {name}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                                <div className="form-group mr-1">
                                  <Field
                                    name={`${
                                      arrayHelpers.name
                                    }.${index}.count`}
                                    type="number"
                                    placeholder="count"
                                    className="form-control form-control-sm"
                                  />
                                </div>  

                                <div className="form-group mr-1">
                                  <Field
                                    name={`${
                                      arrayHelpers.name
                                    }.${index}.price`}
                                    placeholder="price"
                                    className="form-control form-control-sm"
                                    readOnly={true}
                                    value={`$ ${PIZZAS[_value.id-1].price}`}
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
                            ),
                          )} 

                          <div className="form-inline">
                            <div className="form-group col-md-12">
                              <label className="col-sm-1 col-form-label" htmlFor="bill">Total:</label>
                              <Field name="bill" value={`$ ${calculateBill(form.values)}`} className="form-control bill-cell" />
                            </div>
                          </div>

                        </React.Fragment>
                      )}
                    </FieldArray>
                  
                  {form.values.pizzas.length > 0 &&
                      <div className="container">
                        <div className="form-group d-block">
                          <div className="form-label d-block">
                            <label htmlFor="contact" className="h3" >Contact</label>
                            <ErrorMessage name="contact">
                              {error => (
                                <span className="text-danger float-right">
                                  {error}
                                </span>
                              )}
                            </ErrorMessage>
                          </div>
                        </div>

                        <div className="form-group d-block">
                          <div className="form-label d-block">
                            <label htmlFor="clientName">Name*</label>
                            <ErrorMessage name="clientName">
                              {error => (
                                <span className="text-danger float-right">
                                  {error}
                                </span>
                              )}
                            </ErrorMessage>
                          </div>
                          <Field id="clientName" name="clientName" className="form-control" />
                        </div>

                        <div className="form-group d-block">
                          <div className="form-label d-block">
                            <label htmlFor="phone">Phone*</label>
                            <ErrorMessage name="phone">
                              {error => (
                                <span className="text-danger float-right">
                                  {error}
                                </span>
                              )}
                            </ErrorMessage>
                          </div>
                          <Field 
                              id="phone" 
                              name="phone" 
                              className="form-control" 
                              type="phone"
                              placeholder="Format: +359-XX-XXXX-XXX"
                              />
                        </div>

                        <div className="form-group d-block">
                          <div className="form-label d-block">
                            <label htmlFor="email">Email:</label>
                            <ErrorMessage name="email">
                              {error => (
                                <span className="text-danger float-right">
                                  {error}
                                </span>
                              )}
                            </ErrorMessage>
                          </div>
                          <Field
                            id="email"
                            name="email"
                            className="form-control"
                            type="email"
                          />
                        </div>

                        <div className="form-group d-block">
                        <div className="form-label d-block">
                            <label htmlFor="address">Address*</label>
                            <ErrorMessage name="address">
                            {error => (
                                <span className="text-danger float-right">
                                {error}
                                </span>
                            )}
                            </ErrorMessage>
                        </div>
                          <Field
                              id="address"
                              name="address"
                              className="form-control"
                              component="textarea"
                          />
                        </div>

                        <div className="mt-2 pt-4 border-top">
                          <input
                            className="btn btn-primary"
                            type="submit"
                            disabled={form.isSubmitting || !form.isValid}
                            value={`Submit${form.isSubmitting ? '...' : ''}`}
                          />
                        </div>
                      </div>
                  }
                </div>
              </div> 
            </div>
            <div className="col-6">
              <Debug value={form} />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}


const userInputReq = {
  clientNameRegex: /^\s*([a-zA-Z]+\s*[a-zA-Z]*){5,55}\s*$/,
  phoneRegex: /(\+359-[0-9]{2}-[0-9]{4}-[0-9]{3}){1}$/,
  emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
  clientAddressRegex: /^\s*([a-zA-Z0-9\.]+\s*[a-zA-Z0-9\.]*){15,100}\s*$/
}

function calculateBill(values: any) {
  return values.pizzas.reduce((sum: number, pizza : IPizzaOrder) => sum + pizza.count * PIZZAS[parseInt(pizza.id)-1].price, 0);
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

  if(!!values.pizzas && values.pizzas.length > 0) {

    let outOfStockPizzaNames: string[] = [];
    let tempPizzas: IPizza[] = PIZZAS.map(x => Object.assign({}, x));

    values.pizzas.forEach((pizza: IPizzaOrder, index: number) => {
        if(pizza.id in PIZZAS && !!Number(pizza.id)) {
          let selectedPizza = tempPizzas[parseInt(pizza.id) - 1];
          if(selectedPizza) {
            let pizzasLeft = selectedPizza.count - pizza.count;
            if(pizzasLeft < 0) {
              outOfStockPizzaNames.push(selectedPizza.name)
            } else { 
              selectedPizza.count = pizzasLeft;
            }
          }
        } else {
          throw new Error('Information Mismatch. Unknown Pizza.');
        }

        if(outOfStockPizzaNames.length > 0) {
          let uniquePizzaNames = Array.from(new Set(outOfStockPizzaNames));
          errors.pizzas = "Insufficient amount of " + uniquePizzaNames.join(', ');
        }
    })
  }

  return errors;
}

function submit(values: any) {
  console.log(values);
}
