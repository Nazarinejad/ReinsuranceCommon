import { Table, Spin } from 'antd';
import ViewMandatoryHistoryModalHook from './hook'

import momentJalaali from "moment-jalaali";

const ViewMandatoryHistoryModal = (props: any) => {


    const viewMandatoryHistoryModalHook = ViewMandatoryHistoryModalHook(props);

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

            {viewMandatoryHistoryModalHook.isLoadingRecord ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <>
                        <Table dataSource={viewMandatoryHistoryModalHook.dataSource} columns={columns} />
                    </>
                )
            }

        </div >
    );
}

export default ViewMandatoryHistoryModal;