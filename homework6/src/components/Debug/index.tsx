import * as React from 'react';

interface IProps {
  value: any;
}

export default function Debug({ value }: IProps) {
  return (
    <div className="card">
      <div className="card-body">
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  );
}
