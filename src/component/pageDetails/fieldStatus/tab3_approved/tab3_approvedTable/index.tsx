import { useContext } from 'react'
import Tab3_TableHook from "./hook"
import { Tooltip } from 'antd'
import { Icon, TableIconDetail, Modal } from "sanhab-components-library"
import FieldStatusContext from "../../../../pages/fieldStatus/context/context";
import { GetCompanyNameForFieldStatus } from '../../../../../controler/helper/GetCompanyNameForFieldStatus'
import ViewConfirmModal from '../../confirmModal'

import {
    Table,
    ConfigProvider
} from "sanhab-components-library";
const Tab3_Table = (props: any) => {
    const tab3_TableHook = Tab3_TableHook(props);
    const context = useContext(FieldStatusContext)

    // type FieldGroupDictionaryStrings = keyof typeof FieldGroupDictionary;




    let columns: any = [
        {
            title: "کد سیستم",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
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
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "گروه رشته شرکت بیمه",
            dataIndex: "groupFieldOfInsuranceCompany",
            key: "groupFieldOfInsuranceCompany",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "رشته شرکت بیمه",
            dataIndex: "fieldOfInsuranceCompany",
            key: "fieldOfInsuranceCompany",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "کد شرکت رشته بیمه",
            dataIndex: "codeFieldOfInsuranceCompany",
            key: "codeFieldOfInsuranceCompany",
            ellipsis: true,
            // sorter: {
            //     compare: (a: any, b: any) => a - b
            // },
        },
        {
            title: "کد زیر رشته بیمه مرکزی",
            dataIndex: "subFieldCode",
            key: "subFieldCode",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "عملیات",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            className: "operationCol",
            render: (value: number) => (
                <>

                    <a onClick={() => tab3_TableHook.viewRecordHistory(value)} className="m-l-8 ">
                        <Icon
                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </a>

                    <a onClick={() => tab3_TableHook.changeStatus(value)} className="m-l-8 ">
                        <Icon
                            iconType="user-refer"
                            toolTip="ارسال به بررسی بیمه مرکزی"
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
                    <TableIconDetail
                        onClick={() => tab3_TableHook.viewDetails(value)}
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
                    dataSource={tab3_TableHook.finalFIlterData}
                    showSorterTooltip={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                tab3_TableHook.onRowSelection(record);
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
                    visible={tab3_TableHook.visibleConfirmModal}
                    className="sanhab-modal"
                    title={""}
                    width={500}
                    onOk={() => tab3_TableHook.onSetVisibleConfirmModal(false)}
                    onCancel={() => tab3_TableHook.onSetVisibleConfirmModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <ViewConfirmModal
                        id={tab3_TableHook.selectedRowId}
                        confirmationType={tab3_TableHook.confirmationType}
                        onCloseModal={() => tab3_TableHook.onSetVisibleConfirmModal(false)} />

                </Modal>
            </div>
        </ConfigProvider>
    )
}
export default Tab3_Table