import { Table, Spin } from 'antd';
import ViewFieldHistoryModalHook from './hook'

import momentJalaali from "moment-jalaali";

const ViewFieldHistoryModal = (props: any) => {


    const viewFieldHistoryModalHook = ViewFieldHistoryModalHook(props);

    const columns = [
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
          render: (value: string) => {
            let toDateDateTime = value.split("T")[0];
            let jalaliToDate = momentJalaali(toDateDateTime, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
            let toDate = `${jalaliToDate?.substring(0, 4)}/${jalaliToDate?.substring(5, 7)}/${jalaliToDate?.substring(8, 10)}`
            return toDate;
        }
        },
        {
          title: 'توسط',
          dataIndex: 'userName',
          key: 'userName',
          ellipsis: true
        },
      ];

    return (
        <div className="form_wrapper">

            {viewFieldHistoryModalHook.isLoadingRecord ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <>
                        <Table dataSource={viewFieldHistoryModalHook.dataSource} columns={columns} />
                    </>
                )
            }

        </div >
    );
}

export default ViewFieldHistoryModal;