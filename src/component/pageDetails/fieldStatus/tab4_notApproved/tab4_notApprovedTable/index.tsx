import { useContext } from 'react'
import Tab4_TableHook from "./hook"
import { Tooltip } from 'antd'
import { Icon, TableIconDetail, Modal } from "sanhab-components-library"
import FieldStatusContext from "../../../../pages/fieldStatus/context/context";
import { GetCompanyNameForFieldStatus } from '../../../../../controler/helper/GetCompanyNameForFieldStatus'
import ViewConfirmModal from '../../confirmModal'

import {
    Table,
    ConfigProvider
} from "sanhab-components-library";
const Tab4_Table = (props: any) => {
    const tab4_TableHook = Tab4_TableHook(props);
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
            //     compare: (a:any, b:any) => a - b
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

                    <a onClick={() => tab4_TableHook.viewRecordHistory(value)} className="m-l-8 ">
                        <Icon
                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </a>

                    <a onClick={() => tab4_TableHook.changeStatus(value)} className="m-l-8 ">
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
                        onClick={() => tab4_TableHook.viewDetails(value)}
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
                    dataSource={tab4_TableHook.finalFIlterData}
                    showSorterTooltip={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                tab4_TableHook.onRowSelection(record);
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
                    visible={tab4_TableHook.visibleConfirmModal}
                    className="sanhab-modal"
                    title={""}
                    width={500}
                    onOk={() => tab4_TableHook.onSetVisibleConfirmModal(false)}
                    onCancel={() => tab4_TableHook.onSetVisibleConfirmModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <ViewConfirmModal
                        id={tab4_TableHook.selectedRowId}
                        confirmationType={tab4_TableHook.confirmationType}
                        onCloseModal={() => tab4_TableHook.onSetVisibleConfirmModal(false)} />

                </Modal>
            </div>
        </ConfigProvider>
    )
}
export default Tab4_Table