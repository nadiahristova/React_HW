import * as React from 'react';
import State from './State';

export default function Submit() {
  return (
    <State>
      {form => (
        <React.Fragment>
          <input
            className="btn btn-primary"
            type="submit"
            disabled={form.isSubmitting || !form.isValid}
            value={`Submit${form.isSubmitting ? '...' : ''}`}
          />
        </React.Fragment>
      )}
    </State>
  );
}
