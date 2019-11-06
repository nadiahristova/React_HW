import React from 'react';

import StoreDataSourceClass, { IStoreDataSource } from '../../utils/dataSources/storeDataSource';
import VoteDataSourceClass, { IVoteDataSource } from '../../utils/dataSources/votesDataSource';
import CartDataSourceClass, { ICartDataSource } from '../../utils/dataSources/cartDataSource';

export function withData(selectData: (data: { storeDataSource: IStoreDataSource, cartDataSource: ICartDataSource, voteDataSource: IVoteDataSource }, props: any) => any) {
    return (WrappedComponent: any) =>
      class extends React.Component {
        constructor(props: any) {
          super(props);
  
          this.state = selectData({ storeDataSource: StoreDataSourceClass, cartDataSource: CartDataSourceClass, voteDataSource: VoteDataSourceClass }, props);
        }
  
        componentDidMount() {
          StoreDataSourceClass.addChangeListener(this.handleChange);
          CartDataSourceClass.addChangeListener(this.handleChange);
          VoteDataSourceClass.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
          StoreDataSourceClass.removeChangeListener(this.handleChange);
          CartDataSourceClass.removeChangeListener(this.handleChange);
          VoteDataSourceClass.removeChangeListener(this.handleChange);
        }
  
        handleChange = () => {
          this.setState(selectData({ storeDataSource: StoreDataSourceClass, cartDataSource: CartDataSourceClass, voteDataSource: VoteDataSourceClass }, this.props));
        };
  
        render() {
          return <WrappedComponent {...this.state} {...this.props} />;
        }
      };
  }