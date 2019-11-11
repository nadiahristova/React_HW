import * as React from 'react';
import { Formik, ErrorMessage } from 'formik';

import State from './State';
import Field from './Field';
import Submit from './Submit';
import Input from './Input';

interface IProps<T = any> {
  initialValues: T;
  submit?: (values: T) => any;
  className?: string;
  validate: (values: T) => object;
  children: React.ReactNode;
}

function Form<T>({
  initialValues,
  validate,
  submit,
  className,
  children,
}: IProps) {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={async (values, { setSubmitting }) => {
        if (submit) {
          await submit(values);
        }
        setSubmitting(false);
      }}>
      {(props) => <form onSubmit={props.handleSubmit} className={className}>{children}</form>}
    </Formik>
  );
}


Form.Input = Input;
Form.Submit = Submit;
Form.Field = Field;
Form.State = State;
Form.ErrorMessage = ErrorMessage;

export default Form;
