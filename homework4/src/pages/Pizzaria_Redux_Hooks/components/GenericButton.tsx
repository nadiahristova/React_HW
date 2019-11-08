import * as React from 'react';

interface IProps<T> {
  text: string;
  className: string;
  entityId: number | string;
  onChange: (entityId: number| string) => void;
}

export default function ManagePizzaButton<T>({ text, className, entityId, onChange }: IProps<T>) {
  return (
    <a className={className} onClick={() => onChange(entityId)}>{text}</a>
  )}







