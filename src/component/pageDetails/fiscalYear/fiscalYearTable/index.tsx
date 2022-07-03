import { useEffect, useContext } from 'react'
import FiscalYearTableHook from "./hook"
import { Popconfirm } from 'antd'
import { ReactComponent as Edit } from "../../../../assets/images/icon/edit.svg";
import { ReactComponent as Trash } from "../../../../assets/images/icon/trash.svg";
import { DateConvertor, Switch, Tooltip, Icon, Select } from "sanhab-components-library";
import GlobalContext from '../../../../controler/context/context'

import {
    Table,
    ConfigProvider
} from "sanhab-components-library";

const { Option } = Select;
const FiscalYearTable = (props: any) => {
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
                type: "number",
                persianName: "عنوان "
            },
            {
                name: "FromDate",
                type: "date",
                persianName: "از تاریخ"
            },
            {
                name: "ToDate",
                type: "date",
                persianName: "تا تاریخ"
            },
            {
                name: "IsActive",
                type: "boolean_component",
                persianName: "فعال/غیرفعال",
                component: <Select placeholder="انتخاب کنید">
                    <Option value="true"> فعال</Option>
                    <Option value="false">غیر فعال</Option>
                </Select>
            }
        ])
    }, []);

    const fiscalYearTableHook = FiscalYearTableHook(props);

    let columns: any = [
        {
            title: "کد",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            sorter: {
                compare: (a:any, b:any) => a - b
            },
            //...GetColumnSearchProps("id", "number"),
        },
        {
            title: "عنوان",
            dataIndex: "title",
            key: "title",
            sorter: {
                compare: (a:any, b:any) => a - b
            },
            ellipsis: true
        },
        {
            title: "از تاریخ",
            dataIndex: "fromDate",
            key: "fromDate",
            ellipsis: true,
            render: (creationDate: any) => creationDate && DateConvertor.convertUTCdate(creationDate, "YYYY/MM/DD"),
            sorter: {
                compare: (a:any, b:any) => a - b
            },
        },
        {
            title: "تا تاریخ",
            dataIndex: "toDate",
            key: "toDate",
            ellipsis: true,
            render: (creationDate: any) => creationDate && DateConvertor.convertUTCdate(creationDate, "YYYY/MM/DD"),
            sorter: {
                compare: (a:any, b:any) => a - b
            },

        },
        {
            title: "فعال/غیرفعال",
            dataIndex: "isActive",
            key: "isActive",
            ellipsis: true,
            render: (value: boolean) =>
            (

                <Popconfirm

                    placement="top"
                    title="آیا از تغییر وضعیت رکورد اطمینان دارید؟"
                    onConfirm={() => fiscalYearTableHook.changeIsActiveStatus(value)}
                    okText="بله"
                    cancelText="خیر"
                >
                    <Switch
                        className="statusSwitch"
                        checkedChildren="فعال"
                        unCheckedChildren="غیرفعال"
                        defaultChecked={value}
                        checked={value} />
                </Popconfirm>
            ),
            sorter: {
                compare: (a:any, b:any) => a - b
            },
        },
        {
            title: "عملیات",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            render: (value: number) => (
                <>
                    <a >
                        <Icon
                            onClick={() => fiscalYearTableHook.viewRecordHistory(value)}
                            className="cursorPointer m-l-8"
                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </a>

                    <a onClick={() => fiscalYearTableHook.editFiscalYearHandler(value)} className="m-l-8 ">
                        <Tooltip placement="topLeft" title="ویرایش">
                            <Edit />
                        </Tooltip>
                    </a>
                    <Tooltip className="cursorPointer" placement="topLeft" title="حذف">
                        <Popconfirm

                            placement="top"
                            title="آیا از حذف رکورد اطمینان دارید؟"
                            onConfirm={() => fiscalYearTableHook.deleteFiscalYearHandler(value)}
                            okText="بله"
                            cancelText="خیر"
                        >
                            <Trash />
                        </Popconfirm>
                    </Tooltip>

                </>
            )
        }
    ];
    return (
        <ConfigProvider>
            <div>

                <Table
                    onChange={fiscalYearTableHook.onChangeTable}
                    loading={fiscalYearTableHook.isLoadingTable || props.isTableLoadingFilter}
                    className="reinsuranceTable"
                    columns={columns}
                    //   onChange={mainTableHook.handleChange}
                    dataSource={fiscalYearTableHook.finalFIlterData}
                    showSorterTooltip={false}
                    //pagination={false}
                    onRow={(record: any) => {
                        return {
                            onClick: () => {
                                fiscalYearTableHook.onRowSelection(record);
                            },
                        };
                    }}

                    pagination={{
                        current: fiscalYearTableHook.current,
                        onChange: (current: number, pageSize: number | undefined) => {
                            fiscalYearTableHook.changePageHandler(current, pageSize)
                            // console.log("current: number, pageSize:number ", current, pageSize);

                        },
                        total: fiscalYearTableHook.totalCount,
                        pageSize: fiscalYearTableHook.pageModel.pageSize,
                        onShowSizeChange: fiscalYearTableHook.changePageHandler
                    }}



                />

                {/* {!props.hasFilter ? <Pagination
                        showSizeChanger={false}
                        className="customPagination"
                        total={fiscalYearTableHook.totalCount}
                        current={fiscalYearTableHook.current}
                        //pageSize={mainTableHook.pageModel.pageSize}
                        onChange={(current: number, pageSize: any) =>
                            fiscalYearTableHook.changePageHandler(current, fiscalYearTableHook.pageCount)
                        }
                        showTotal={(total: any, range: any) => ` تعداد کل :  ${total} `}


                        
                        //pageSize={pageModel.pageSize}
                        //onShowSizeChange={onShowSizeChange}


                    /> : null} */}



            </div>
        </ConfigProvider>
    )
}
export default FiscalYearTable