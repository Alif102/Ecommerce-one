'use client';

import { Tabs, Table } from 'antd';

const items = [
  {
    key: '1',
    label: 'Description',
    children: (
      <p className="p-4 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque eros nec ligula cursus,
        nec gravida purus efficitur. Integer suscipit sapien non sem venenatis, et luctus metus sodales.
      </p>
    ),
  },
  {
    key: '2',
    label: 'Size & Shape',
    children: (
      <div className="p-4 overflow-x-auto">
        <Table
          pagination={false}
          bordered
          columns={[
            { title: 'Size', dataIndex: 'size', key: 'size' },
            { title: 'XS', dataIndex: 'xs', key: 'xs' },
            { title: 'S', dataIndex: 's', key: 's' },
            { title: 'M', dataIndex: 'm', key: 'm' },
            { title: 'L', dataIndex: 'l', key: 'l' },
            { title: 'XL', dataIndex: 'xl', key: 'xl' },
            { title: 'XXL', dataIndex: 'xxl', key: 'xxl' },
          ]}
          dataSource={[
            { key: '1', size: 'Chest', xs: 82, s: 88, m: 90, l: 100, xl: 106, xxl: 114 },
            { key: '2', size: 'Waist', xs: 64, s: 70, m: 76, l: 82, xl: 88, xxl: 94 },
            { key: '3', size: 'Seat', xs: 82, s: 88, m: 94, l: 100, xl: 106, xxl: 114 },
            { key: '4', size: 'Shoulders', xs: 71, s: 72, m: 73, l: 74, xl: 75, xxl: 78 },
            { key: '5', size: 'Length', xs: 164, s: 168, m: 170, l: 172, xl: 174, xxl: 180 },
          ]}
        />
      </div>
    ),
  },
];

const ProductTabs = () => {
  return <div className=' w-[80%] mx-auto border-t-2'>
    <Tabs defaultActiveKey="2" items={items} className={"p-4"} />;

  </div> 
};

export default ProductTabs;