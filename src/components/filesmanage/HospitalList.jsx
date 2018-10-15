import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import SearchBar from '../SearchBar'
import reqwest from 'reqwest'
import { Table, Divider } from 'antd';

const columns = [
  {
    title: '用户名',
    dataIndex: 'cell',
    // dataIndex: 'filename',
  },
  {
    title: '医院',
    dataIndex: 'hospital',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '最后一次操作记录',
    dataIndex: 'lastOperate',
    width: 500
  },
  {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <span>
        <a style={{ color: '#007bff' }} href="javascript:;">删除 {record.age}</a>
        <Divider type="vertical" />
        <a style={{ color: '#007bff' }} href="javascript:;">下载</a>
        <Divider type="vertical" />
        <a style={{ color: '#007bff' }} href="javascript:;">详情</a>
      </span>
    ),
  }];
const data = [
  {
    key: '1',
    filename: 'John Brown',
    uploadtime: 32,
    filesize: 'New York No. 1 Lake Park',
    remark: '机密文件！！！'
  },
  {
    key: '2',
    filename: 'Jim Green',
    uploadtime: 42,
    filesize: 'London No. 1 Lake Park',
    remark: '机密文件！！！'
  },
  {
    key: '3',
    filename: 'Joe Black',
    uploadtime: 32,
    filesize: 'Sidney No. 1 Lake Park',
    remark: '机密文件！！！'
  },
  {
    key: '4',
    filename: 'Disabled User',
    uploadtime: 99,
    filesize: 'Sidney No. 1 Lake Park',
    remark: '机密文件！！！'
  }
];
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


class HospitalList extends React.Component {


  state = {
    data: [],
    pagination: {},
    loading: false,
    fileList: [],
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }



  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results.map((item, index) => Object.assign(item, { key: index })),
        pagination,
      });
    });
  }
  componentDidMount() {
    this.fetch();
  }

  handleSearchOption(type, data) {
    console.log(type)
    console.log(data)
  }



  render() {
    return (
      <div className="gutter-example">
        <BreadcrumbCustom first="文件管理" second="医院列表" />
        <SearchBar status="admin" handleSearchOption={(type, data) => this.handleSearchOption(type, data)} />
        <div className="container">
          <div className="table-wrapper">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              loading={this.state.loading}
              bordered
            />
          </div>

        </div>
      </div>
    )
  }
}

export default HospitalList