import {DataListInterface, DataPageConfig, DgraphDataBuffered, FieldType} from "@solenopsys/lib-dgraph";


export class TestDataBuffered implements DataListInterface {
  items = [{uid: '0x9c60', 'rom.time': 10, description: 'Добавление 1поставщиков', date: '2021-03-24T00:00:00Z'},
    {uid: '0xc369', 'rom.time': 28, description: 'Загрузка старой базы ресурсов', date: '2021-03-25T00:00:00Z'},
    {uid: '0xc36a', 'rom.time': 28, description: 'Загрузка старой базы ресурсов ', date: '2021-03-24T00:00:00Z'},
    {uid: '0xc36b', 'rom.time': 28, description: 'Old Resource', date: '2021-03-24T00:00:00Z'},
    {uid: '0xc408', 'rom.time': 9, description: 'Загрузка данных из файла в базу', date: '2021-03-25T00:00:00Z'},
    {uid: '0xea61', 'rom.time': 28, description: 'FormPage + Reload Page', date: '2021-03-25T00:00:00Z'},
    {uid: '0xea62', 'rom.time': 50, description: 'Full text search in graph', date: '2021-03-25T00:00:00Z'},
    {uid: '0xea63', 'rom.time': 19, description: 'Entity field', date: '2021-03-25T00:00:00Z'},
    {uid: '0xea64', 'rom.time': 21, description: 'DropDown', date: '2021-03-25T00:00:00Z'},
    {uid: '0xea65', 'rom.time': 183, description: 'Gluing magnet fixators', date: '2021-03-25T00:00:00Z'},
    {uid: '0x11175', 'rom.time': 20, description: 'Text area + Extend Goals'},
    {uid: '0x11178', 'rom.time': 35, description: 'Refactoring modules', date: '2021-03-26T00:00:00Z'},
    {uid: '0x11179', 'rom.time': 46, description: 'Fix error refactoring modules', date: '2021-03-26T00:00:00Z'},
    {uid: '0x1117a', 'rom.time': 5, description: 'color shemes', date: '2021-03-26T00:00:00Z'},
    {uid: '0x1117b', 'rom.time': 30, description: 'Find and select ICONS sets', date: '2021-03-26T00:00:00Z'}];


  getMax() {
    return 1300;
  }

  genRandom(start: number, count: number) {
    const block = [];
    for (let i = 0; i < count; i++) {

      const item = Object.assign({}, this.items[Math.floor(Math.random() * this.items.length)]);
      item.uid = start + i + '';
      block.push(item);
    }
    return block;
  }

  next(start: number, count: number, conf: DataPageConfig) {
    return Promise.resolve(this.genRandom(start, count));
  }
}

export const TIMES: DataPageConfig = {
  title: 'Time',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'rom.time', title: 'Time', type: FieldType.NUMBER},
    {key: 'description', title: 'Description', type: FieldType.STRING},
    {
      key: 'executionLink',
      title: 'Execution',
      type: FieldType.EUID,
      link: {titleField: 'rom.execution', multiple: false}
    },
    {key: 'date', title: 'Date', type: FieldType.DATE},
  ],
  commands: ['edit'],
  listQ: 'has(rom.time)',
  dataProvider: DgraphDataBuffered,
};
