import * as React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';
import { uniqueId, capitalize } from 'lodash';

interface IProps {
  name: string;
  label?: any;
  control?: any;

  id?: string;

  [key: string]: any;
}

export default function FormField({ id, label, name, component, ...otherProps}: IProps) {
  id = React.useMemo(() => id || uniqueId(`form-${name}-`), [id, name]);

   const Component: any = typeof component === 'function' ? component : (COMPONENTS as any)[component];

  return (
    <div className="form-group d-block">
      <div className="form-label d-block">
        <label htmlFor={id}>{label || capitalize(name)}:</label>
        <ErrorMessage name={name}>{error => <span className="text-danger float-right">{error}</span>}</ErrorMessage>
      </div>
      {Component.isArray ? (
        <FieldArray name={name}>
          {arrayHelpers => <Component arrayHelpers={arrayHelpers} array={arrayHelpers.form.values[name]} id={id} {...otherProps} />}
        </FieldArray>
      ): (
        <Field id={id} name={name} component={Component} {...otherProps} />
      )}
    </div>
  );
}

FormField.defaultProps = {
  component: "text"
}

const COMPONENTS = {
  undefined: ({ form: _form, field, ...props }: any) => (
    <input type="text" className="form-control" {...field} {...props} />
  ),

  text: ({ form: _form, field, ...props }: any) => (
    <input type="text" className="form-control" {...field} {...props} />
  ),

  email: ({ form: _form, field, ...props }: any) => (
    <input type="email" className="form-control" {...field} {...props} />
  ),
  
  phone: ({ form: _form, field, ...props }: any) => (
    <input type="tel" className="form-control" {...field} {...props} />
  ),

  textarea: ({ form: _form, field, ...props }: any) => (
    <textarea className="form-control" {...field} {...props} />
  ),
  
  number: ({ form: _form, field, ...props }: any) => (
    <textarea type="number" className="form-control" {...field} {...props} />
  ),

  select: ({ form: _form, field, options, ...props }: any) => (
    <select className="form-control" {...field} {...props}>
      {options.map(({ label, value }: any, i: number) => (
        <option key={i} value={value}>
          {label || value}
        </option>
      ))}
    </select>
  ),

  radioGroup: ({ id: _id, options, field, ...props }: any) => (
    <ul className="pl-4">
      {options.map((option: any, i: number) => (
        <li key={i}>
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              name={field.name}
              value={option.value}
              checked={option.value === field.value}
              onChange={() => field.onChange({ target: { name: field.name, value: option.value } })}
              {...props}
            />
            {option.label || option.value}
          </label>
        </li>
      ))}
    </ul>
  ),
};
