import { useEffect, useContext } from 'react'
import CumulativesParticipatingOfInterestsTableHook from "./hook"
import { Popconfirm } from 'antd'
import { ReactComponent as Edit } from "../../../../assets/images/icon/edit.svg";
import { ReactComponent as Trash } from "../../../../assets/images/icon/trash.svg";
import { GetCumulativeRegulationNames } from '../../../../controler/helper/GetCumulativeRegulationNames'
import GlobalContext from '../../../../controler/context/context'

import {
    Table, ConfigProvider, Tooltip, Checkbox, Select, Icon
} from "sanhab-components-library";


const { Option } = Select;


const CumulativesParticipatingOfInterestsTable = (props: any) => {
    const cumulativesParticipatingOfInterestsTableHook = CumulativesParticipatingOfInterestsTableHook(props);

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
                name: "CumulativeRequlations",
                type: "component",
                persianName: "آیین نامه تجمیعی",
                component:
                    <Select
                        showSearch
                        filterOption={(input, option) => {
                            return option?.props.children.indexOf(input) >= 0
                        }}
                        allowClear
                        placeholder="انتخاب آیین نامه تجمیعی">
                        {props.cumulativeRegulationsList?.map((cumulativeRequlation: any) => {
                            return (
                                <Option key={cumulativeRequlation.Id} value={cumulativeRequlation?.Id}>
                                    {cumulativeRequlation?.Title}
                                </Option>
                            );
                        })}
                    </Select>

            },
            {
                name: "PercentageOfParticipation",
                type: "number",
                persianName: "درصد مشارکت"
            },
            {
                name: "ConsiderPendingLoss",
                type: "boolean_component",
                persianName: "درنظر گرفتن خسارت معوق",
                component: <Select placeholder="انتخاب کنید">
                    <Option value="true">بله</Option>
                    <Option value="false">خیر</Option>
                </Select>
            }
        ])
    }, [props.cumulativeRegulationsList]);


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
            title: "فرمت نسخه چاپی",
            dataIndex: "printVersionFormat",
            key: "printVersionFormat",
            ellipsis: true,
            render: (value: string) => {
                if (value === "NormalFormat") return "فرمت معمولی";
                else if (value === "OmrManagementFormat") return "فرمت اداره عمر";
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "آیین نامه تجمیعی",
            dataIndex: "cumulativeRequlations",
            key: "cumulativeRequlations",
            ellipsis: true,
            render: (value: number[]) => {
                return GetCumulativeRegulationNames(cumulativesParticipatingOfInterestsTableHook.cumulativeRegulationsList, value)
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },


        },
        {
            title: "درصد مشارکت",
            dataIndex: "percentageOfParticipation",
            key: "percentageOfParticipation",
            ellipsis: true,
            render: (value: number) =>
            (
                <span> {value} % </span>
            ),
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "درنظر گرفتن خسارت معوق",
            dataIndex: "considerPendingLoss",
            key: "considerPendingLoss",
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

                    <a >
                        <Icon
                            onClick={() => cumulativesParticipatingOfInterestsTableHook.viewRecordHistory(value)}
                            className="cursorPointer m-l-8"
                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </a>

                    <a onClick={() => cumulativesParticipatingOfInterestsTableHook.editCumulativesParticipatingHandler(value)} className="m-l-8 ">
                        <Tooltip placement="topLeft" title="ویرایش">
                            <Edit />
                        </Tooltip>
                    </a>
                    <Tooltip className="cursorPointer" placement="topLeft" title="حذف">
                        <Popconfirm

                            placement="top"
                            title="آیا از حذف رکورد اطمینان دارید؟"
                            onConfirm={() => cumulativesParticipatingOfInterestsTableHook.deleteCumulativesParticipatingHandler(value)}
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
                    onChange={cumulativesParticipatingOfInterestsTableHook.onChangeTable}
                    loading={cumulativesParticipatingOfInterestsTableHook.isLoadingTable || props.isTableLoadingFilter}
                    className="reinsuranceTable"
                    columns={columns}
                    dataSource={cumulativesParticipatingOfInterestsTableHook.finalFIlterData}
                    showSorterTooltip={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                cumulativesParticipatingOfInterestsTableHook.onRowSelection(record);
                            },
                        };
                    }}
                    pagination={{
                        current: cumulativesParticipatingOfInterestsTableHook.current,
                        onChange: (current: number, pageSize: number | undefined) => {
                            cumulativesParticipatingOfInterestsTableHook.changePageHandler(current, pageSize)
                            console.log("current: number, pageSize:number ", current, pageSize);

                        },
                        total: cumulativesParticipatingOfInterestsTableHook.totalCount,
                        pageSize: cumulativesParticipatingOfInterestsTableHook.pageModel.pageSize,
                        onShowSizeChange: cumulativesParticipatingOfInterestsTableHook.changePageHandler
                    }}
                />

            </div>
        </ConfigProvider>
    )
}
export default CumulativesParticipatingOfInterestsTable