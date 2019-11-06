import React from 'react';

import StoreDataSourceClass, { IStoreDataSource } from '../../utils/dataSources/storeDataSource';
import VoteDataSourceClass, { IVoteDataSource } from '../../utils/dataSources/votesDataSource';
//IVoteDataSource
export function withData(selectData: (data: { storeDatasource: IStoreDataSource, votes: IVoteDataSource }, props: any) => any) {
    return (WrappedComponent: any) =>
      class extends React.Component {
        constructor(props: any) {
          super(props);
  
          this.state = selectData({ storeDatasource: StoreDataSourceClass, votes: VoteDataSourceClass }, props);
        }
  
        componentDidMount() {
          StoreDataSourceClass.addChangeListener(this.handleChange);
          VoteDataSourceClass.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
          StoreDataSourceClass.removeChangeListener(this.handleChange);
          VoteDataSourceClass.removeChangeListener(this.handleChange);
        }
  
        handleChange = () => {
          this.setState(selectData({ storeDatasource: StoreDataSourceClass, votes: VoteDataSourceClass }, this.props));
        };
  
        render() {
          return <WrappedComponent {...this.state} {...this.props} />;
        }
      };
  }