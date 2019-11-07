import { IDataSourceList } from "../../interfaces/IDataSourceList";
import { useState, useCallback, useEffect } from "react";
import { DataSources } from "../../utils/dataSources/dataSources";

export function useData<T>(selectData: (data: IDataSourceList) => T): T {
    const [data, setData] = useState<T>(selectData(DataSources));

    const callback = useCallback(selectData, []);
    
    useEffect(() => {
        const removeChangeListener = DataSources.storeDataSource.addChangeListener(() =>
          setData(callback(DataSources)),
        );
        return removeChangeListener;
    }, [callback]);

    useEffect(() => {
        const removeChangeListener = DataSources.cartDataSource.addChangeListener(() =>
          setData(callback(DataSources)),
        );
        return removeChangeListener;
    }, [callback]);

    useEffect(() => {
        const removeChangeListener = DataSources.voteDataSource.addChangeListener(() =>
          setData(callback(DataSources)),
        );
        return removeChangeListener;
    }, [callback]);
  
    return data;
}