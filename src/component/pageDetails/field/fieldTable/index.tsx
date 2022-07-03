import FieldTableHook from "./hook"
import { useState, useEffect, useContext } from "react";
import { Collapse, Popconfirm } from 'antd'
// import { FieldGroupDictionary } from '../../../../controler/model/enum/FieldGroupDictionary'
import { Icon, Table, Notification, ConfigProvider, Tooltip, Switch, Checkbox, Button, Select } from "sanhab-components-library"
import FieldApi from "../../../../controler/services/field/apiRequest";
import GlobalContext from '../../../../controler/context/context'
import GetChildColumnSearchProps from '../../../../controler/helper/ChildColumnFiltering'
import { GetSingleCumulativeParticipatingName } from '../../../../controler/helper/GetCumulativeParticipatingNames'
import { GetDepartmentName } from '../../../../controler/helper/GetSignatureNames'
const { Option } = Select;
const { Panel } = Collapse;

const FieldTable = (props: any) => {
    const fieldTableHook = FieldTableHook(props);

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
                persianName: "گروه رشته "
            }
        ])
    }, []);

    useEffect(() => {
        globalContext.childSetAdvancedsearchTitles([
            // {
            //     name: "Id",
            //     type: "number",
            //     persianName: "شناسه"
            // },
            {
                name: "SubFieldCode",
                type: "number",
                persianName: "کد زیر رشته"
            },
            {
                name: "SubFieldTitle",
                type: "string",
                persianName: "نام زیر رشته"
            },
            {
                name: "Department",
                type: "component",
                persianName: "اداره",
                component: <Select
                    disabled={props.isUpdate}
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب اداره"
                >
                    {props.departmentList?.map((department: any) => {
                        return (
                            <Option key={department.Id} value={department?.Id}>
                                {department?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },
            {
                name: "IsActive",
                type: "boolean_component",
                persianName: "فعال/غیرفعال",
                component: <Select placeholder="انتخاب کنید">
                    <Option value="true"> فعال</Option>
                    <Option value="false">غیر فعال</Option>
                </Select>
            },
            {
                name: "AccountingCode",
                type: "number",
                persianName: "کد حسابداری	"
            },
            {
                name: "CumulativeParticipatingOfInterestsId",
                type: "component",
                persianName: "گروه مشارکت منافع",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب  گروه مشارکت منافع"
                >
                    {props.cumulativeList?.map((cumulativeItem: any) => {
                        return (
                            <Option key={cumulativeItem.Id} value={cumulativeItem?.Id}>
                                {cumulativeItem?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },
            {
                name: "FailureToCalculateReserves",
                type: "boolean_component",
                persianName: "عدم محاسبه ذخیره",
                component: <Select placeholder="انتخاب کنید">
                    <Option value="true"> بله</Option>
                    <Option value="false">خیر</Option>
                </Select>
            },
            {
                name: "NoLossRatio",
                type: "boolean_component",
                persianName: "بدون ضریب خسارت",
                component: <Select placeholder="انتخاب کنید">
                    <Option value="true"> بله</Option>
                    <Option value="false">خیر</Option>
                </Select>
            },

        ])
    }, [props.cumulativeList]);



    const [isLoadingLvlTwoTable, setIsLoadingLvlTwoTable] = useState(false);
    const [isLoadingLvlOneTable, setIsLoadingLvlOneTable] = useState(false);
    const [finalLvlTwoData, setFinalLvlTwoData] = useState<any[]>([]);
    const [finalLvlOneData, setFinalLvlOneData] = useState<any[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
    const [expandedRowKeysLvlOne, setExpandedRowKeysLvlOne] = useState<any[]>([]);
    const [expandedMainRow, setExpandedMainRow] = useState<number>(0);
    const [expandedLvlOne, setExpandedLvlOne] = useState<number>(0);

    const [companyIdOnExpandLvlOne, setCompanyIdOnExpandLvlOne] = useState<number>(0);
    const [fiscalYearIdOnExpandLvlOne, setFiscalYearIdOnExpandLvlOne] = useState<number>(0);

    const [lengthOfLvlTwoTableRows, setLengthOfLvlTwoTableRows] = useState<number>(0);
    const [lengthOfLvlOneTableRows, setLengthOfLvlOneTableRows] = useState<number>(0);

    const [shouldResetFilterUI, setShouldResetFilterUI] = useState<boolean>(false);

    // type FieldGroupDictionaryStrings = keyof typeof FieldGroupDictionary;




    let columns: any = [
        {
            title: "شناسه",
            dataIndex: "fieldId",
            key: "fieldId",
            width: "150px",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "گروه رشته",
            dataIndex: "title",
            key: "title",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        }
    ];


    const changeIsActiveStatus = (activeStatus: boolean) => {
        FieldApi.ActiveOrDeactiveField(
            {
                id: fieldTableHook.selectedRow.id,
                isActive: !activeStatus
            }
        ).then((response) => {
            if (response?.data?.IsSucceed) {
                Notification.success({ message: ' وضعیت با موفقیت  تغییر داده شد.' });
                loadLevelOneData(expandedMainRow)
            }
        })
    };


    const deleteRecordHandler = (id: number) => {
        FieldApi.DeleteField({ id: id }).then((response: any) => {
            if (response?.data?.IsSucceed) {
                Notification.success({
                    message: ' با موفقیت حذف شد.',
                    duration: 0
                });
                loadLevelOneData(expandedMainRow)

            }

        })
    }


    const expandedRowRender = () => {
        const lvlOneColumns = [
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
                title: "کد زیر رشته",
                dataIndex: "subFieldCode",
                key: "subFieldCode",
                ellipsis: true,
                sorter: {
                    compare: (a: any, b: any) => a - b
                },
            },
            {
                title: "نام زیر رشته",
                dataIndex: "subFieldTitle",
                key: "subFieldTitle",
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
                title: "فعال/غیرفعال",
                dataIndex: "isActive",
                key: "isActive",
                ellipsis: true,
                render: (value: boolean) =>
                (
                    <Popconfirm

                        placement="top"
                        title="آیا از تغییر وضعیت رکورد اطمینان دارید؟"
                        onConfirm={() => changeIsActiveStatus(value)}
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
                title: "گروه مشارکت منافع",
                dataIndex: "cumulativeParticipatingOfInterestsId",
                key: "cumulativeParticipatingOfInterestsId",
                ellipsis: true,
                render: (value: number) => {
                    return GetSingleCumulativeParticipatingName(props.cumulativeList, value.toString())
                },
                sorter: {
                    compare: (a: any, b: any) => a - b
                },
            },
            {
                title: "اداره",
                dataIndex: "department",
                key: "department",
                ellipsis: true,
                render: (val: number) => {
                    return GetDepartmentName(val, props.departmentList)
                },
                sorter: {
                    compare: (a: any, b: any) => a - b
                },
            },
            {
                title: "عدم محاسبه ذخیره",
                dataIndex: "failureToCalculateReserves",
                key: "failureToCalculateReserves",
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
                title: "بدون ضریب خسارت",
                dataIndex: "noLossRatio",
                key: "noLossRatio",
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
                title: "توضیحات",
                dataIndex: "description",
                key: "description",
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
                render: (value: number) => (
                    <>
                        <a onClick={() => fieldTableHook.viewRecordHistory(value)} className="m-l-8 ">
                            <Icon
                                iconType="history"
                                toolTip="تاریخچه"
                            />
                        </a>

                        <Tooltip className="cursorPointer m-l-8 " placement="topLeft" title="حذف">
                            <Popconfirm

                                placement="top"
                                title="آیا از حذف رکورد اطمینان دارید؟"
                                onConfirm={() => deleteRecordHandler(value)}
                                okText="بله"
                                cancelText="خیر"
                            >
                                <Icon
                                    iconType="trash"
                                    toolTip="حذف"
                                />
                            </Popconfirm>

                        </Tooltip>

                        <a
                            onClick={() => fieldTableHook.editFieldHandler(value)}
                            className="m-l-8 "
                        >
                            <Icon
                                iconType="edit"
                                toolTip="ویرایش"
                            />
                        </a>




                    </>
                )
            }
        ];

        const lvlOneData: any = [];
        finalLvlOneData?.map((item: any) => {
            lvlOneData.push({

                key: item?.id,
                id: item?.id,
                subFieldCode: item?.subFieldCode,
                subFieldTitle: item?.subFieldTitle,
                accountingCode: item?.accountingCode,
                isActive: item?.isActive,
                cumulativeParticipatingOfInterestsId: item?.cumulativeParticipatingOfInterestsId,
                failureToCalculateReserves: item?.failureToCalculateReserves,
                noLossRatio: item?.noLossRatio,
                description: item?.description
            });
        })




        return (
            <>
                <Button className="excelButton m-l-4" onClick={fieldTableHook.viewInnerTableTotalHistory}>
                    <Icon

                        iconType="history"
                        toolTip="تاریخچه"
                    />
                </Button>

                <Collapse
                    className="filterBox  lowerBox"
                    collapsible="header"
                    activeKey={globalContext.childActiveCollapsiblePanel}
                    onChange={globalContext.childOnChangeActiveCollapsiblePanel}>

                    <Panel

                        showArrow={false}
                        header={
                            <Button className="filterBoxButton">
                                <Icon
                                    iconType="filter"
                                    toolTip="فیلتر"
                                />
                            </Button>}
                        key='2'
                    >
                        <GetChildColumnSearchProps titles={globalContext.childColumnTitles} shouldResetFilterUI={shouldResetFilterUI} />
                    </Panel>
                </Collapse>

                <Table
                    onChange={fieldTableHook.onChangeChildTable}
                    className="reinsuranceTable nestedTableWithPagination"
                    columns={lvlOneColumns}
                    loading={isLoadingLvlOneTable}
                    //   onChange={mainTableHook.handleChange}
                    dataSource={fieldTableHook.finalFIlterDataFisrt}
                    showSorterTooltip={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                fieldTableHook.onRowSelection(record);
                            },
                        };
                    }}
                    pagination={{
                        current: fieldTableHook.currentFirstLvl,
                        onChange: (current: number, pageSize: number | undefined) => {
                            fieldTableHook.changePageHandlerFirst(current, pageSize)
                            //console.log("current: number, pageSize:number ", current, pageSize);

                        },
                        total: fieldTableHook.totalCountFirstLvl,
                        pageSize: fieldTableHook.pageModelFirstLvl.pageSize,
                        onShowSizeChange: fieldTableHook.changePageHandlerFirst
                    }}
                />
            </>
            // <Table
            //     loading={isLoadingLvlOneTable}
            //     expandedRowKeys={expandedRowKeysLvlOne}
            //     className="reinsuranceTable nestedTable"
            //     columns={lvlOneColumns}
            //     dataSource={lvlOneData}
            //     pagination={false}
            //     onRow={(record) => {
            //         return {
            //             onClick: () => {
            //                 fieldTableHook.onRowSelection(record);
            //             },
            //         };
            //     }}
            // />
        );
    };

    const setParentId = (id: number) => {
        props.setEexpandedId(id)
    }

    function customExpandIcon(props: any) {
        if (props.expanded) {
            return <a style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
                onTableRowExpand(props.expanded, props.record);
            }}><Icon
                    iconType="minus"
                    toolTip="بستن"
                    size="small"
                /></a>
        } else {
            console.log("props.record.fieldId", props.record.fieldId)
            console.log("props.record", props.record)
            return <a style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
                loadLevelOneData(props.record.fieldId);
                globalContext.childOnSetIsAdvancedSearch(false);
                setShouldResetFilterUI(!shouldResetFilterUI)
                setIsLoadingLvlOneTable(true)
                onTableRowExpand(props.expanded, props.record);
                setExpandedMainRow(props.record.fieldId)
                setParentId(props.record.fieldId)
                setExpandedRowKeysLvlOne([])
            }}><Icon
                    iconType="plus"
                    toolTip="مشاهده"
                    rotate={90}
                    size="small"
                /></a>
        }
    }

    // const setLvlOneData = (response: any) => {

    //     let data = response?.data?.Result?.map((record: any) => {
    //         let obj = {
    //             key: record?.Id,
    //             id: record?.Id,
    //             subFieldCode: record?.SubFieldCode,
    //             subFieldTitle: record?.SubFieldTitle,
    //             accountingCode: record?.AccountingCode,
    //             isActive: record?.IsActive,
    //             cumulativeParticipatingOfInterestsId: record?.CumulativeParticipatingOfInterestsId,
    //             failureToCalculateReserves: record?.FailureToCalculateReserves,
    //             noLossRatio: record?.NoLossRatio,
    //             description: record?.Description
    //         };
    //         return obj;
    //     });
    //     setFinalLvlOneData(data);
    // }

    useEffect(() => {
        loadLevelOneData(props.expanded)
    }, [props.shouldReloadLevelOneTable, fieldTableHook.currentFirstLvl, fieldTableHook.pageModelFirstLvl, globalContext.childShouldMakeAdvancedSearchAgain, fieldTableHook.childSorter])


    useEffect(() => {
        setExpandedRowKeys([])
        setExpandedRowKeysLvlOne([])
    }, [props.shouldCloseAllExpandedTables])


    const loadLevelOneData = (id: number) => {
        // FieldApi.GetAllSubFieldsByFieldId({ id: id }).then(response => {
        //     setLvlOneData(response)
        //     setLengthOfLvlOneTableRows(response?.data?.Result?.length)
        //     setIsLoadingLvlOneTable(false)
        // })

        setIsLoadingLvlOneTable(true);
        let currentPage = globalContext.childIsFilterResubmitted ? 1 : fieldTableHook.currentFirstLvl
        fieldTableHook.onSetCurrentFirst(currentPage)
        if (!globalContext.childIsAdvancedSearch) {
            FieldApi.AllPagedSubTable({
                pageIndex: fieldTableHook.currentFirstLvl,
                firstPageSize: fieldTableHook.pageModelFirstLvl.pageSize,
                rowsPerPage: fieldTableHook.pageModelFirstLvl.pageSize,
                orderBy: fieldTableHook.childSorter.orderBy,
                isDescending: fieldTableHook.childSorter.isDescending,
                fieldId: id
            }).then(response => {
                fieldTableHook.setFirstTableData(response)
            })
                .finally(() => {
                    setIsLoadingLvlOneTable(false);
                })
        }
        else {
            FieldApi.SubFieldAdvancedSearch({
                pageSize: fieldTableHook.pageModelFirstLvl.pageSize,
                pageIndex: currentPage,
                firstPageSize: fieldTableHook.pageModelFirstLvl.pageSize,
                orderBy: fieldTableHook.childSorter.orderBy === null || fieldTableHook.childSorter.orderBy === undefined ? "Id" : fieldTableHook.childSorter.isDescending === true ? `${fieldTableHook.childSorter.orderBy} DESC` : `${fieldTableHook.childSorter.orderBy}`,
                fieldId: id,
                filters: globalContext.childSubmittedFilters
            }).then(response => {
                fieldTableHook.setFirstTableData(response)

            })
                .finally(() => {
                    globalContext.childOnResubmitFilter(false);
                    setIsLoadingLvlOneTable(false);
                })
        }

    }





    const onTableRowExpand = (expanded: any, record: any) => {
        var keys = [];
        if (!expanded) {
            keys.push(record.key);
        }
        setExpandedRowKeys(keys);
    }



    return (
        <div><ConfigProvider>
            <Table
                onChange={fieldTableHook.onChangeTable}
                loading={fieldTableHook.isLoadingTable || props.isTableLoadingFilter}
                expandedRowKeys={expandedRowKeys}
                className="reinsuranceTable"
                columns={columns}
                dataSource={fieldTableHook.finalFIlterData}
                showSorterTooltip={false}
                expandable={{ expandedRowRender }}
                expandIcon={(props) => customExpandIcon(props)}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            fieldTableHook.onRowSelection(record);
                        },
                    };
                }}
                pagination={{
                    current: fieldTableHook.current,
                    onChange: (current: number, pageSize: number | undefined) => {
                        fieldTableHook.changePageHandler(current, pageSize)

                    },
                    total: fieldTableHook.totalCount,
                    pageSize: fieldTableHook.pageModel.pageSize,
                    onShowSizeChange: fieldTableHook.changePageHandler
                }}
            />
        </ConfigProvider>

        </div>
    )
}
export default FieldTable