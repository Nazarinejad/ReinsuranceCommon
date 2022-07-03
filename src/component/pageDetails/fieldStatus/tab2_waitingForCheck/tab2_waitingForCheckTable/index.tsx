import { useContext } from 'react'
import Tab2_TableHook from "./hook"
import { Tooltip, Modal } from 'antd'
import { Icon, TableIconDetail } from "sanhab-components-library"
import FieldStatusContext from "../../../../pages/fieldStatus/context/context";
import { GetCompanyNameForFieldStatus } from '../../../../../controler/helper/GetCompanyNameForFieldStatus'
import ViewConfirmModal from '../../confirmModal'

import {
    Table,
    ConfigProvider
} from "sanhab-components-library";
const Tab2_Table = (props: any) => {
    const tab2_TableHook = Tab2_TableHook(props);
    const context = useContext(FieldStatusContext)



    let columns: any = [
        {
            title: "کد سیستم",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            sorter: {
                compare: (a:any, b:any) => a - b
            },
        },
        {
            title: "  شرکت",
            dataIndex: "companyId",
            key: "companyId",
            ellipsis: true,
            render: (value: number) => {
                return GetCompanyNameForFieldStatus(value)
            },
            sorter: {
                compare: (a:any, b:any) => a - b
            },
        },
        {
            title: "گروه رشته شرکت بیمه",
            dataIndex: "groupFieldOfInsuranceCompany",
            key: "groupFieldOfInsuranceCompany",
            ellipsis: true,
            sorter: {
                compare: (a:any, b:any) => a - b
            },
        },
        {
            title: "رشته شرکت بیمه",
            dataIndex: "fieldOfInsuranceCompany",
            key: "fieldOfInsuranceCompany",
            ellipsis: true,
            sorter: {
                compare: (a:any, b:any) => a - b
            },
        },
        {
            title: "کد شرکت رشته بیمه",
            dataIndex: "codeFieldOfInsuranceCompany",
            key: "codeFieldOfInsuranceCompany",
            ellipsis: true
        },
        {
            title: "عملیات",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            className: "operationCol",
            render: (value: number, record: any) => (
                <>
                    <a onClick={() => tab2_TableHook.changeStatus(value)} className="m-l-8 ">
                        <Icon
                            iconType="user-refer"
                            toolTip="ارسال به ثبت شرکت بیمه"
                        />
                    </a>
                    <a
                        onClick={() => tab2_TableHook.editFieldStatusHandler(value, record.companyId)}
                        className="m-l-8 ">
                        <Icon
                            iconType="sync"
                            toolTip="معادلسازی"
                        />
                    </a>
                    <a onClick={() => tab2_TableHook.viewRecordHistory(value)} className="m-l-8 ">
                        <Icon
                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </a>


                    <a onClick={() => tab2_TableHook.disApprove(value)} className="m-l-8 ">
                        <Icon
                            iconType="close"
                            toolTip="عدم تایید"
                        />
                    </a>


                    <a onClick={() => tab2_TableHook.approve(value)} className="m-l-8 ">
                        <Icon
                            iconType="check"
                            toolTip="تایید "
                        />
                    </a>





                </>
            )
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            className: "detailBtnCol",
            render: (value: number) => (
                <Tooltip placement="topLeft" title="مشاهده جزییات">
                    {/* <Button onClick={() => tab2_TableHook.viewDetails(value)}
                        type="primary"
                        icon={<LeftOutlined />}
                    >
                    </Button> */}
                    <TableIconDetail
                        onClick={() => tab2_TableHook.viewDetails(value)}
                    />
                </Tooltip>

            )
        }
    ];
    return (
        <ConfigProvider>
            <div>
                <Table
                    onChange={context.onChangeTable}
                    loading={context.tableLoading}
                    className="reinsuranceTable"
                    columns={columns}
                    //   onChange={mainTableHook.handleChange}
                    dataSource={tab2_TableHook.finalFIlterData}
                    showSorterTooltip={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                tab2_TableHook.onRowSelection(record);
                            },
                        };
                    }}
                    pagination={{
                        current: context.current,
                        onChange: (current: number, pageSize: number | undefined) => {
                            context.changePageHandler(current, pageSize)
                        },
                        total: context.tableResult?.TotalCount ?? 0,
                        pageSize: context.pageModel.pageSize,
                        onShowSizeChange: context.changePageHandler
                    }}
                />
                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={tab2_TableHook.visibleConfirmModal}
                    className="sanhab-modal"
                    title={""}
                    width={500}
                    onOk={() => tab2_TableHook.onSetVisibleConfirmModal(false)}
                    onCancel={() => tab2_TableHook.onSetVisibleConfirmModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <ViewConfirmModal
                        id={tab2_TableHook.selectedRowId}
                        confirmationType={tab2_TableHook.confirmationType}
                        onCloseModal={() => tab2_TableHook.onSetVisibleConfirmModal(false)} />

                </Modal>
            </div>
        </ConfigProvider>
    )
}
export default Tab2_Table