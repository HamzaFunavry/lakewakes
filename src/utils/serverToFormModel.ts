import cloneDeep from 'lodash.clonedeep';

export function mapServerToFormModel(fields) {
  const serverModel: [any] = cloneDeep(fields);
  const form = serverModel?.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.colName]: curr.value,
    };
  }, {});
  return form;
}
