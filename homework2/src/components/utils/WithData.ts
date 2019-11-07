import React from 'react';

import { IDataSourceList } from '../../interfaces/IDataSourceList'
import { DataSources } from '../../utils/dataSources/dataSources'
import { IDataSource } from '../../interfaces/IDataSource';


interface IProps<T> {
    selectData: (data: IDataSourceList) => T;
    children: (data: T) => React.ReactNode;
  }

export class WithData<T> extends React.Component<IProps<T>, T> {
    constructor(props: IProps<T>) {
        super(props);
        
        this.state = props.selectData(DataSources);
    }

    componentDidMount() {
        
        Object.values(DataSources).map(ds => { (ds as IDataSource).addChangeListener(this.handleChange) })
    }

    componentWillUnmount() {

        Object.values(DataSources).map(ds => { (ds as IDataSource).removeChangeListener(this.handleChange) })
    }

    handleChange = () => {
        this.setState(this.props.selectData(DataSources));
    };

    render() {
        return this.props.children(this.state);
    }
}