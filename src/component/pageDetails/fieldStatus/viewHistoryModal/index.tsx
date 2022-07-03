import { Table, Spin } from 'antd';
import ViewHistoryModalHook from './hook'
import { DateConvertor } from 'sanhab-components-library'
import momentJalaali from "moment-jalaali";

const ViewHistoryModal = (props: any) => {


    const viewHistoryModalHook = ViewHistoryModalHook(props);

    const columns = [
        {
          title: "کد",
          dataIndex: 'id',
          key: 'id',
          ellipsis: true
        },
        {
          title: "عملیات",
          dataIndex: 'actionType',
          key: 'actionType',
          ellipsis: true
        },
        {
          title: 'تاریخ عملیات',
          dataIndex: 'date',
          key: 'date',
          ellipsis: true,
          render: (value:string) => value && DateConvertor.convertUTCdate(value, "hh:mm - YYYY/MM/DD")
        
        },
        {
          title: 'توسط',
          dataIndex: 'userName',
          key: 'userName',
          ellipsis: true
        },
        {
          title: 'توضیحات',
          dataIndex: 'description',
          key: 'description',
          ellipsis: false
        },
      ];

    return (
        <div className="form_wrapper">

            {viewHistoryModalHook.isLoadingRecord ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <>
                        <Table dataSource={viewHistoryModalHook.dataSource} columns={columns} />
                    </>
                )
            }

        </div >
    );
}

export default ViewHistoryModal;