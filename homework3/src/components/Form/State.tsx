import { connect, FormikContext } from 'formik';

interface IProps {
  children: (state: FormikContext<any>) => any;
}

export default connect<IProps>(
  ({
    formik,
    children,
  }) => children(formik),
);
