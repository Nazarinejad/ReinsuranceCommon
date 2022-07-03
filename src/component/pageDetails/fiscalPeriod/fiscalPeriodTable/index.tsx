import FiscalPeriodTableHook from "./hook"
import { Spin, Popconfirm, } from 'antd'
import { ReactComponent as Edit } from "../../../../assets/images/icon/edit.svg";
import { ReactComponent as Trash } from "../../../../assets/images/icon/trash.svg";
import { PeriodTypeDictionary } from '../../../../controler/model/enum/PeriodTypeDictionary'
import { FactureTypeDictionary } from '../../../../controler/model/enum/FactureType'
import { useEffect, useContext } from 'react';
import GlobalContext from '../../../../controler/context/context'
import { Select } from 'sanhab-components-library';
import PeriodType from '../../../../controler/constant/PeriodType'
import FactureType from '../../../../controler/constant/FactureType'
import { GetPeriodTypeName, GetFactureTypeName } from '../../../../controler/helper/GetFiscalPeriodNames'


import {
    Table, ConfigProvider, Switch, Checkbox, Icon, Tooltip, TableIconDetail, Button
} from "sanhab-components-library";
const { Option } = Select;

const FiscalPeriodTable = (props: any) => {
    const fiscalPeriodTableHook = FiscalPeriodTableHook(props);

    type PeriodTypeDictionaryStrings = keyof typeof PeriodTypeDictionary;
    type FactureTypeDictionaryStrings = keyof typeof FactureTypeDictionary;
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
                name: "PeriodType",
                type: "component",
                persianName: "نوع دوره",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب نوع دوره" >
                    {PeriodType.map((type) => {
                        return (
                            <Option key={type.value} value={type.value}>
                                {type.name}
                            </Option>
                        );
                    })}
                </Select>
            },

            {
                name: "PendingLoss",
                type: "boolean_component",
                persianName: "خسارت معوق/ذخیره ریاضی",
                component: <Select placeholder="انتخاب کنید">
                    <Option value="true"> دارد</Option>
                    <Option value="false">ندارد</Option>
                </Select>
            },
            {
                name: "FactureType",
                type: "component",
                persianName: "نوع صورتحساب",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب نوع صورتحساب" >
                    {FactureType.map((type) => {
                        return (
                            <Option key={type.value} value={type.value}>
                                {type.name}
                            </Option>
                        );
                    })}
                </Select>
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

    let columns: any = [
        {
            title: "کد",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
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
            title: "نوع دوره",
            dataIndex: "periodType",
            key: "periodType",
            ellipsis: true,
            // render: (value: PeriodTypeDictionaryStrings) => {
            //     return PeriodTypeDictionary[value];
            // }
            render: (val: number) => {
                return GetPeriodTypeName(val)
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "خسارت معوق/ذخیره ریاضی",
            dataIndex: "pendingLoss",
            key: "pendingLoss",
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
            title: "نوع صورتحساب",
            dataIndex: "factureType",
            key: "factureType",
            ellipsis: true,
            // render: (value: FactureTypeDictionaryStrings) => {
            //     return FactureTypeDictionary[value];
            // }
            render: (val: number) => {
                return GetFactureTypeName(val)
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "از تاریخ",
            dataIndex: "fromDay",
            key: "fromDay",
            ellipsis: true,
            render: (value: number, record: any) => {
                // return `${GetFiscalYearName(record.fiscalYearId, props.fiscalYearList)}/${record.fromMonth}/${record.fromDay}`
                return `${record.fromMonth}/${record.fromDay}`
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "تا تاریخ",
            dataIndex: "toDay",
            key: "toDay",
            ellipsis: true,
            render: (value: number, record: any) => {
                // return `${GetFiscalYearName(record.fiscalYearId, props.fiscalYearList)}/${record.toMonth}/${record.toDay}`
                return `${record.toMonth}/${record.toDay}`
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },

        },
        {
            title: "فعال/غیرفعال",
            dataIndex: "isActive",
            key: "isActive",
            ellipsis: true,
            render: (value: boolean, record: any) =>
            (
                <Popconfirm

                    placement="top"
                    title="آیا از تغییر وضعیت رکورد اطمینان دارید؟"
                    onConfirm={() => fiscalPeriodTableHook.changeIsActiveStatus(value)}
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
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "عملیات",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            className: "operationCol",
            render: (value: number, record: any) => (
                <>
                    <a >
                        <Icon
                            onClick={() => fiscalPeriodTableHook.viewRecordHistory(value)}
                            className="cursorPointer m-l-8"
                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </a>

                    <a onClick={() => fiscalPeriodTableHook.editFiscalPeriodHandler(value)} className="m-l-8 ">
                        <Tooltip placement="topLeft" title="ویرایش">
                            <Edit />
                        </Tooltip>
                    </a>
                    <Tooltip className="cursorPointer" placement="topLeft" title="حذف">
                        <Popconfirm

                            placement="top"
                            title="آیا از حذف رکورد اطمینان دارید؟"
                            onConfirm={() => fiscalPeriodTableHook.deleteFiscalPeriodHandler(value)}
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
                        onClick={() => fiscalPeriodTableHook.viewDetails(value)}
                    />

                </Tooltip>



            )
        }
    ];
    return (
        <ConfigProvider>
            <div>

                <Table
                    onChange={fiscalPeriodTableHook.onChangeTable}
                    loading={fiscalPeriodTableHook.isLoadingTable || props.isTableLoadingFilter}
                    className="reinsuranceTable"
                    columns={columns}
                    //   onChange={mainTableHook.handleChange}
                    dataSource={fiscalPeriodTableHook.finalFIlterData}
                    showSorterTooltip={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                fiscalPeriodTableHook.onRowSelection(record);
                            },
                        };
                    }}
                    pagination={{
                        current: fiscalPeriodTableHook.current,
                        onChange: (current: number, pageSize: number | undefined) => {
                            fiscalPeriodTableHook.changePageHandler(current, pageSize)
                            console.log("current: number, pageSize:number ", current, pageSize);

                        },
                        total: fiscalPeriodTableHook.totalCount,
                        pageSize: fiscalPeriodTableHook.pageModel.pageSize,
                        onShowSizeChange: fiscalPeriodTableHook.changePageHandler
                    }}

                />

            </div>
        </ConfigProvider>
    )
}
export default FiscalPeriodTable