export interface IDataSource {
    addChangeListener(fn: any): any;
    removeChangeListener(fn: any): void;
}