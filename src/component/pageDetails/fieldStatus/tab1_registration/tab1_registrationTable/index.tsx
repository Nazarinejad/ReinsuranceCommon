import { useEffect, useContext } from 'react'
import Tab1_TableHook from "./hook"
import { Tooltip, Popconfirm } from 'antd'
import { ReactComponent as Edit } from "../../../../../assets/images/icon/edit.svg";
import { ReactComponent as Trash } from "../../../../../assets/images/icon/trash.svg";
import { Icon, TableIconDetail, Modal } from "sanhab-components-library"
import FieldStatusContext from "../../../../pages/fieldStatus/context/context";
import { GetCompanyNameForFieldStatus } from '../../../../../controler/helper/GetCompanyNameForFieldStatus'
import ViewConfirmModal from '../../confirmModal'

import {
    Table,
    ConfigProvider,
    Select
} from "sanhab-components-library";

import GlobalContext from '../../../../../controler/context/context'
const { Option } = Select;

const Tab1_Table = (props: any) => {
    const tab1_TableHook = Tab1_TableHook(props);
    const context = useContext(FieldStatusContext)

    const globalContext = useContext(GlobalContext)
    useEffect(() => {
        globalContext.setAdvancedsearchTitles([
            {
                name: "CompanyId",
                type: "multiple_component",
                persianName: "شرکت",
                component: <Select
                    disabled={props.isUpdate}
                    showSearch
                    mode="multiple"
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب شرکت"
                >
                    {context.companies?.map((company: any) => <Option key={company.Id} value={company.Id}>{company.Title}</Option>)}

                </Select>
            },
            {
                name: "GroupFieldOfInsuranceCompany",
                type: "string",
                persianName: "گروه رشته شرکت بیمه "
            },
            {
                name: "FieldOfInsuranceCompany",
                type: "string",
                persianName: "رشته شرکت بیمه"
            },
            {
                name: "CodeFieldOfInsuranceCompany",
                type: "string",
                persianName: "کد شرکت رشته بیمه"
            },
            // {
            //     name: "FromDate",
            //     type: "date",
            //     persianName: "از تاریخ"
            // },
            // {
            //     name: "ToDate",
            //     type: "date",
            //     persianName: "تا تاریخ"
            // },

        ])
    }, [context.companies]);



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
            title: "عملیات",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            className: "operationCol",
            render: (value: number) => (
                <>
                    <a
                        onClick={() => tab1_TableHook.editFieldStatusHandler(value)}
                        className="m-l-8 ">
                        <Tooltip placement="topLeft" title="ویرایش">
                            <Edit />
                        </Tooltip>
                    </a>
                    <Tooltip className="cursorPointer m-l-8" placement="topLeft" title="حذف">
                        <Popconfirm

                            placement="top"
                            title="آیا از حذف رکورد اطمینان دارید؟"
                            onConfirm={() => tab1_TableHook.deleteFieldStatusHandler(value)}
                            okText="بله"
                            cancelText="خیر"
                        >
                            <Trash />
                        </Popconfirm>
                    </Tooltip>
                    <a>
                        <Icon
                            onClick={() => tab1_TableHook.viewRecordHistory(value)}
                            className="cursorPointer m-l-8"
                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </a>

                    <a onClick={() => tab1_TableHook.changeStatus(value)} className="m-l-8 ">
                        <Icon
                            iconType="user-previous-status"
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
                    {/* <Button onClick={() => tab1_TableHook.viewDetails(value)}
                        type="primary"
                        icon={<LeftOutlined />}
                    >
                    </Button> */}
                    <TableIconDetail
                        onClick={() => tab1_TableHook.viewDetails(value)}
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
                    dataSource={tab1_TableHook.finalFIlterData}
                    showSorterTooltip={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                tab1_TableHook.onRowSelection(record);
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
                    visible={tab1_TableHook.visibleConfirmModal}
                    className="sanhab-modal"
                    title={""}
                    width={500}
                    onOk={() => tab1_TableHook.onSetVisibleConfirmModal(false)}
                    onCancel={() => tab1_TableHook.onSetVisibleConfirmModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <ViewConfirmModal
                        id={tab1_TableHook.selectedRowId}
                        confirmationType={tab1_TableHook.confirmationType}
                        onCloseModal={() => tab1_TableHook.onSetVisibleConfirmModal(false)} />

                </Modal>
            </div>
        </ConfigProvider >
    )
}
export default Tab1_Table