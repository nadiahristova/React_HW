import React from 'react';

import { IDataSource } from '../../interfaces/IDataSource'
import { IDataSourceList } from '../../interfaces/IDataSourceList'
import { DataSources } from '../../utils/dataSources/dataSources'

export function withData(selectData: (data: IDataSourceList, props: any) => any) {
    return (WrappedComponent: any) =>
      class extends React.Component {
        constructor(props: any) {
          super(props);
  
          this.state = selectData(DataSources, props);
        }
  
        componentDidMount() {

          Object.values(DataSources).map(ds => { (ds as IDataSource).addChangeListener(this.handleChange) })
        }

        componentWillUnmount() {
          
          Object.values(DataSources).map(ds => { (ds as IDataSource).removeChangeListener(this.handleChange) })
        }
  
        handleChange = () => {
          this.setState(selectData(DataSources, this.props));
        };
  
        render() {
          return <WrappedComponent {...this.state} {...this.props} />;
        }
      };
  }