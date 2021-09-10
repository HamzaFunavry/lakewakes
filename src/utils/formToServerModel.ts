import cloneDeep from 'lodash.clonedeep';

export function mapFormToServerModel(fields, form: Object) {
  const serverModel = cloneDeep(fields);
  const clientForm = cloneDeep(form);
  for (let key of Object.keys(clientForm)) {
    const field = serverModel.find((v) => v.colName === key);
    if (field) {
      //  update value
      field.value = clientForm[key];
    }
  }

  return serverModel;
}
