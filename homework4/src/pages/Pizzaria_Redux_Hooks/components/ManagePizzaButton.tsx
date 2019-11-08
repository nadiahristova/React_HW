import * as React from 'react';

interface IProps<T> {
  text: string;
  className: string;
  entity: T;
  onChange: (entity: T) => void;
}

export default function ManagePizzaButton<T>({ text, className, entity, onChange }: IProps<T>) {
  return (
    <a className={className} onClick={() => onChange(entity)}>{text}</a>
  )}







