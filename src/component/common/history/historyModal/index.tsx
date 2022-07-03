import { useState, useContext, useEffect } from 'react';
import { Collapse } from 'antd';
import HistoryModalHook from './hook'
import { Button, Icon, Table, DateConvertor } from 'sanhab-components-library'

import GetColumnSearchProps from '../../../../controler/helper/HistoryFiltering'
import HistoryContext from '../context/context'

const { Panel } = Collapse;

const HistoryModal = (props: any) => {

  const historyContext = useContext(HistoryContext)

  const historyModalHook = HistoryModalHook(props);

  const columns = [
    // {
    //   title: "شناسه",
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: '50px',
    //   ellipsis: true
    // },
    {
      title: "رکورد",
      dataIndex: 'aliasValue',
      key: 'aliasValue',
      ellipsis: true,
    },
    {
      title: "عملیات",
      dataIndex: 'eventTypePersianTitle',
      key: 'eventTypePersianTitle',
      ellipsis: true,
      width: '120px',
    },
    {
      title: 'تاریخ عملیات',
      dataIndex: 'date',
      key: 'date',
      ellipsis: true,
      width: '80px',
      render: (creationDate: any) => creationDate && DateConvertor.convertUTCdate(creationDate, "YYYY/MM/DD")
    },
    {
      title: 'توسط',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      width: '180px',
    },
    {
      title: 'توضیحات سیستمی',
      dataIndex: 'modifiedValues',
      key: 'modifiedValues',
      width: '440px',
      ellipsis: true,
      render: (value: any[]) => (
        value.map((item) => (
          <><span>{item}</span>
            <br /></>
        ))
      )
    },
    {
      title: 'توضیحات کاربر',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ];


  const columnsWithoutDescription = [
    // {
    //   title: "شناسه",
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: '50px',
    //   ellipsis: true
    // },
    {
      title: "رکورد",
      dataIndex: 'aliasValue',
      key: 'aliasValue',
      ellipsis: true,
    },
    {
      title: "عملیات",
      dataIndex: 'eventTypePersianTitle',
      key: 'eventTypePersianTitle',
      ellipsis: true,
      width: '120px',
    },
    {
      title: 'تاریخ عملیات',
      dataIndex: 'date',
      key: 'date',
      ellipsis: true,
      width: '80px',
      render: (creationDate: any) => creationDate && DateConvertor.convertUTCdate(creationDate, "YYYY/MM/DD")
    },
    {
      title: 'توسط',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      width: '180px',
    },
    {
      title: 'توضیحات سیستمی',
      dataIndex: 'modifiedValues',
      key: 'modifiedValues',
      width: '440px',
      ellipsis: true,
      render: (value: any[]) => (
        value.map((item) => (
          <><span>{item}</span>
            <br /></>
        ))
      )
    }
  ];


  return (
    <div className="form_wrapper">


      <Collapse
        className="filterBox lowerBox m-l-0"
        collapsible="header"
        activeKey={historyContext.activeCollapsiblePanel}
        onChange={historyContext.onChangeActiveCollapsiblePanel}>

        <Panel

          showArrow={false}
          header={
            <Button className="filterBoxButton">
              <Icon
                iconType="filter"
                toolTip="فیلتر"
              />
            </Button>}
          key='10'
        >
          {GetColumnSearchProps(historyContext.columnTitles)}
        </Panel>
      </Collapse>


      <Table
        scroll={{ x: 1000}}
        loading={historyModalHook.isLoadingTable || props.isTableLoadingFilter}
        className="reinsuranceTable"
        columns={props.hasDescription ? columns : columnsWithoutDescription}
        //   onChange={mainTableHook.handleChange}
        dataSource={historyModalHook.dataSource}
        showSorterTooltip={false}
        //pagination={false}
        onRow={(record: any) => {
          return {
            onClick: () => {
              //historyModalHook.onRowSelection(record);
            },
          };
        }}

        pagination={{
          current: historyModalHook.current,
          onChange: (current: number, pageSize: number | undefined) => {
            historyModalHook.changePageHandler(current, pageSize)
            // console.log("current: number, pageSize:number ", current, pageSize);

          },
          total: historyModalHook.totalCount,
          pageSize: historyModalHook.pageModel.pageSize,
          onShowSizeChange: historyModalHook.changePageHandler
        }}



      />
      {/* <Table
              dataSource={historyModalHook.dataSource}
              columns={columns}
              loading={historyModalHook.isLoadingRecord} /> */}


    </div >
  );
}

export default HistoryModal;