import { useEffect, useContext } from 'react'
import BordereauTableHook from "./hook"
import { Popconfirm } from 'antd'
import { ReactComponent as Edit } from "../../../../assets/images/icon/edit.svg";
import { ReactComponent as Trash } from "../../../../assets/images/icon/trash.svg";
import { Icon, Tooltip, Select, TableIconDetail, Checkbox } from "sanhab-components-library";
import GlobalContext from '../../../../controler/context/context'

import {
    Table,
    ConfigProvider
} from "sanhab-components-library";
const { Option } = Select;

const BordereauTable = (props: any) => {
    const bordereauTableHook = BordereauTableHook(props);

    const globalContext = useContext(GlobalContext)
    useEffect(() => {
        globalContext.setAdvancedsearchTitles([
            // {
            //     name: "Id",
            //     type: "number",
            //     persianName: "شناسه"
            // },
            {
                name: "Title",
                type: "string",
                persianName: "عنوان "
            },
            {
                name: "AccountingCode",
                type: "number",
                persianName: "کد حسابداری"
            },
            {
                name: "IsCredit",
                type: "boolean_component",
                persianName: "نوع بردرو",
                component: <Select placeholder="انتخاب کنید">
                    <Option value="true"> بستانکار</Option>
                    <Option value="false">بدهکار</Option>
                </Select>
            },
            {
                name: "HasCommission",
                type: "boolean_component",
                persianName: "محاسبه کارمزد",
                component: <Select placeholder="انتخاب کنید">
                    <Option value="true">بله</Option>
                    <Option value="false">خیر</Option>
                </Select>
            }
        ])
    }, []);


    let columns: any = [
        {
            title: "کد",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
            //...GetColumnSearchProps("id"),
        },
        {
            title: "عنوان",
            dataIndex: "title",
            key: "title",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "کد حسابداری",
            dataIndex: "accountingCode",
            key: "accountingCode",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "نوع بردرو",
            dataIndex: "isCredit",
            key: "isCredit",
            ellipsis: true,
            render: (value: boolean) => {
                return value ? "بستانکار" : "بدهکار"
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "محاسبه کارمزد",
            dataIndex: "hasCommission",
            key: "hasCommission",
            ellipsis: true,
            render: (value: boolean) =>
            (
                <Checkbox disabled checked={value}></Checkbox>
            ),
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "عملیات",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            render: (value: number) => (
                <>
                    <a>
                        <Icon
                            onClick={() => bordereauTableHook.viewRecordHistory(value)}
                            className="cursorPointer m-l-8"
                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </a>
                    <a onClick={() => bordereauTableHook.editBordereauHandler(value)} className="m-l-8 ">
                        <Tooltip placement="topLeft" title="ویرایش">
                            <Edit />
                        </Tooltip>
                    </a>
                    <Tooltip className="cursorPointer" placement="topLeft" title="حذف">
                        <Popconfirm

                            placement="top"
                            title="آیا از حذف رکورد اطمینان دارید؟"
                            onConfirm={() => bordereauTableHook.deleteBordereauHandler(value)}
                            okText="بله"
                            cancelText="خیر"
                        >
                            <Trash />
                        </Popconfirm>
                    </Tooltip>

                </>
            )
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            className: "detailBtnCol",
            render: (value: number, record: any) => (
                <Tooltip placement="topLeft" title="مشاهده جزییات">

                    <TableIconDetail
                        onClick={() => bordereauTableHook.viewDetails(value)}
                    />

                </Tooltip>



            )
        }
    ];
    return (
        <ConfigProvider>
            <div>
                <Table
                    onChange={bordereauTableHook.onChangeTable}
                    loading={bordereauTableHook.isLoadingTable || props.isTableLoadingFilter}
                    className="reinsuranceTable"
                    columns={columns}
                    //   onChange={mainTableHook.handleChange}
                    dataSource={bordereauTableHook.finalFIlterData}
                    showSorterTooltip={false}
                    //pagination={false}
                    onRow={(record: any) => {
                        return {
                            onClick: () => {
                                bordereauTableHook.onRowSelection(record);
                            },
                        };
                    }}

                    pagination={{
                        current: bordereauTableHook.current,
                        onChange: (current: number, pageSize: number | undefined) => {
                            bordereauTableHook.changePageHandler(current, pageSize)
                            // console.log("current: number, pageSize:number ", current, pageSize);

                        },
                        total: bordereauTableHook.totalCount,
                        pageSize: bordereauTableHook.pageModel.pageSize,
                        onShowSizeChange: bordereauTableHook.changePageHandler
                    }}



                />


            </div>
        </ConfigProvider>
    )
}
export default BordereauTable