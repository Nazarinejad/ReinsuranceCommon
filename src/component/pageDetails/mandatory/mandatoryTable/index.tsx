import MandatoryTableHook from "./hook"
import { useState, useEffect, useContext } from "react";
import { Collapse, Popconfirm } from 'antd'
// import { FieldGroupDictionary } from '../../../../controler/model/enum/FieldGroupDictionary'
import MandatoryApi from "../../../../controler/services/mandatory/apiRequest";
import './mandatoryTable.css'
import {
    Table,
    DateConvertor,
    ConfigProvider,
    Notification, Tooltip, TableIconDetail, Button, Icon, Select
} from "sanhab-components-library";
import { GetCompanyName } from '../../../../controler/helper/GetMandatoyPageNames'
import { GetFiscalYearName } from '../../../../controler/helper/GetMandatoyPageNames'
import { GetFieldsName } from '../../../../controler/helper/GetMandatoyPageNames'
import { GetSubFieldsName } from '../../../../controler/helper/GetMandatoyPageNames'
import GlobalContext from '../../../../controler/context/context'
import GetChildColumnSearchProps from '../../../../controler/helper/ChildColumnFiltering'
import GetSecondChildColumnSearchProps from '../../../../controler/helper/SecondChildColumnFiltering'
const { Option } = Select;
const { Panel } = Collapse;


const MandatoryTable = (props: any) => {
    const mandatoryTableHook = MandatoryTableHook(props);

    const globalContext = useContext(GlobalContext)

    useEffect(() => {
        globalContext.setAdvancedsearchTitles([
            // {
            //     name: "Id",
            //     type: "number",
            //     persianName: "شناسه"
            // },
            {
                name: "CompanyId",
                type: "component",
                persianName: "نام شرکت",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب  شرکت ">
                    {props.allCompanies?.map((company: any) => {
                        return (
                            <Option key={company.Id} value={company?.Id}>
                                {company?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },
            {
                name: "FiscalyearId",
                type: "component",
                persianName: "آخرین سال مالی",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        let temp = `${option?.props.children}`
                        return temp.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب  سال مالی ">
                    {props.allFiscalYears?.map((fiscalYear: any) => {
                        return (
                            <Option key={fiscalYear.Id} value={fiscalYear?.Id}>
                                {fiscalYear?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },
            {
                name: "LastUpdateDate",
                type: "date",
                persianName: "تاریخ آخرین ویرایش"
            }

        ])
    }, [props.allCompanies, props.allFiscalYears]);

    useEffect(() => {
        globalContext.childSetAdvancedsearchTitles([
            // {
            //     name: "Id",
            //     type: "number",
            //     persianName: "شناسه"
            // },
            {
                name: "CompanyId",
                type: "component",
                persianName: "نام شرکت",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب  شرکت ">
                    {props.allCompanies?.map((company: any) => {
                        return (
                            <Option key={company.Id} value={company?.Id}>
                                {company?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },
            {
                name: "FiscalYearId",
                type: "component",
                persianName: " سال مالی",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        let temp = `${option?.props.children}`
                        return temp.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب  سال مالی ">
                    {props.allFiscalYears?.map((fiscalYear: any) => {
                        return (
                            <Option key={fiscalYear.Id} value={fiscalYear?.Id}>
                                {fiscalYear?.Title}
                            </Option>
                        );
                    })}
                </Select>
            }

        ])
    }, [props.allCompanies, props.allFiscalYears]);

    useEffect(() => {
        globalContext.secondChildSetAdvancedsearchTitles([
            // {
            //     name: "Id",
            //     type: "number",
            //     persianName: "شناسه"
            // },
            {
                name: "CompanyId",
                type: "component",
                persianName: "نام شرکت",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب  شرکت ">
                    {props.allCompanies?.map((company: any) => {
                        return (
                            <Option key={company.Id} value={company?.Id}>
                                {company?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },
            {
                name: "FiscalYearId",
                type: "component",
                persianName: " سال مالی",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        let temp = `${option?.props.children}`
                        return temp.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب  سال مالی ">
                    {props.allFiscalYears?.map((fiscalYear: any) => {
                        return (
                            <Option key={fiscalYear.Id} value={fiscalYear?.Id}>
                                {fiscalYear?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },
            {
                name: "FieldId",
                type: "component",
                persianName: " گروه رشته",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="انتخاب   گروه رشته ">
                    {props.allFields?.map((field: any) => {
                        return (
                            <Option key={field.FieldId} value={field?.FieldId}>
                                {field?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },
            {
                name: "TAXPercentage",
                type: "number",
                persianName: "درصد مالیات"
            },
            {
                name: "PercentageOfSave",
                type: "number",
                persianName: "درصد ذخیره"
            },

        ])
    }, [props.allCompanies, props.allFiscalYears, props.allFields]);


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

    const [companyIdForExcel, setCompanyIdForExcel] = useState<number>(0);
    const [isOnLoadPage, setIsOnLoadPage] = useState<boolean>(true);
    const [shouldResetFilterUI, setShouldResetFilterUI] = useState<boolean>(false);
    const [shouldResetFilterUILvlTwo, setShouldResetFilterUILvlTwo] = useState<boolean>(false);
    // type FieldGroupDictionaryStrings = keyof typeof FieldGroupDictionary;




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
            title: "نام شرکت",
            dataIndex: "companyId",
            key: "companyId",
            ellipsis: true,
            render: (value: number) => {
                return GetCompanyName(value, props.allCompanies)
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "آخرین سال مالی",
            dataIndex: "fiscalYearId",
            key: "fiscalYearId",
            ellipsis: true,
            render: (value: number) => {
                return GetFiscalYearName(value, props.allFiscalYears)
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "تاریخ آخرین ویرایش",
            dataIndex: "lastUpdateDate",
            key: "lastUpdateDate",
            ellipsis: true,
            render: (creationDate: any) => {
                if (creationDate === "0001-01-01T00:00:00")
                    return "-"
                else return creationDate && DateConvertor.convertUTCdate(creationDate, "hh:mm - YYYY/MM/DD")
            },
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
                <a onClick={() => mandatoryTableHook.viewRecordHistory(value)} className="m-l-8 ">
                    <Icon
                        iconType="history"
                        toolTip="تاریخچه"
                    />
                </a>
            )
        }
    ];


    const deleteRangeHandler = (id: number) => {
        MandatoryApi.RangeDelete({ id: id }).then((response: any) => {
            if (response?.data?.IsSucceed) {
                Notification.success({
                    message: ' با موفقیت حذف شد.',
                    duration: 0
                });

            }
            if (lengthOfLvlOneTableRows > 1) {
                loadLevelOneData(companyIdOnExpandLvlOne)
            }
            else {
                setExpandedRowKeys([])
                setExpandedRowKeysLvlOne([])
                props.reloadTable()
            }
        })
    }


    const deleteRecordHandler = (id: number, parentId: number) => {
        MandatoryApi.DeleteMandatory({ id: parentId, mandatoryRelianceInformationSubFieldId: id }).then((response: any) => {
            if (response?.data?.IsSucceed) {
                Notification.success({
                    message: ' با موفقیت حذف شد.',
                    duration: 0
                });


            }
            if (lengthOfLvlTwoTableRows > 1) {

                loadLevelTwoData(companyIdOnExpandLvlOne, fiscalYearIdOnExpandLvlOne)
                loadLevelOneData(companyIdOnExpandLvlOne)
            }
            else if (lengthOfLvlOneTableRows > 1) {
                loadLevelOneData(companyIdOnExpandLvlOne)
            }
            else {
                setExpandedRowKeys([])
                setExpandedRowKeysLvlOne([])
                props.reloadTable()
            }
        })
    }


    const expandedRowRender = () => {
        const lvlOneColumns = [
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
                title: " سال مالی",
                dataIndex: "fiscalYearId",
                key: "fiscalYearId",
                ellipsis: true,
                render: (value: number) => {
                    return GetFiscalYearName(value, props.allFiscalYears)
                },
                sorter: {
                    compare: (a: any, b: any) => a - b
                },
            },
            {
                title: "نام شرکت",
                dataIndex: "companyIdLvlOne",
                key: "companyIdLvlOne",
                ellipsis: true,
                render: (value: number) => {
                    return GetCompanyName(value, props.allCompanies)
                },
            },
            {
                title: "عملیات",
                dataIndex: "id",
                key: "id",
                ellipsis: true,
                render: (value: number) => (
                    <>
                        {/* <Tooltip className="cursorPointer m-l-8" placement="topLeft" title="حذف تمامی زیر رشته ها" >
                            <Popconfirm

                                placement="top"
                                title="آیا از حذف تمامی زیر رشته ها اطمینان دارید؟"
                                onConfirm={() => deleteRangeHandler(value)}
                                okText="بله"
                                cancelText="خیر"
                            >
                                <Icon
                                    iconType="trash"
                                    toolTip="حذف همه زیررشته ها"
                                />
                            </Popconfirm>
                        </Tooltip> */}

                        <a onClick={() => mandatoryTableHook.openCopyModal(value)} className="m-l-8 ">
                            <Icon
                                iconType="copy"
                                toolTip="کپی"
                            />
                        </a>


                    </>
                )
            }
        ];

        const expandedRowRender = () => {

            const lvlTwoColumns = [
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
                    title: "نام شرکت",
                    dataIndex: "companyId",
                    key: "companyId",
                    ellipsis: true,
                    render: (value: number) => {
                        return GetCompanyName(value, props.allCompanies)
                    },
                    sorter: {
                        compare: (a: any, b: any) => a - b
                    },
                },
                {
                    title: "سال مالی",
                    dataIndex: "fiscalyearId",
                    key: "fiscalyearId",
                    ellipsis: true,
                    render: (value: number) => {
                        return GetFiscalYearName(value, props.allFiscalYears)
                    },
                    // sorter: {
                    //     compare: (a: any, b: any) => a - b
                    // },
                },
                {
                    title: "گروه رشته",
                    dataIndex: "fieldId",
                    key: "fieldId",
                    ellipsis: true,
                    render: (value: number) => {
                        return GetFieldsName(value, props.allFields)
                    },
                    sorter: {
                        compare: (a: any, b: any) => a - b
                    },
                },
                {
                    title: "نام زیر رشته",
                    dataIndex: "subFieldId",
                    key: "subFieldId",
                    ellipsis: true,
                    render: (value: number) => {
                        return GetSubFieldsName(value, props.allSubFields)
                    },
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
                    title: "عملیات",
                    dataIndex: "id",
                    key: "id",
                    ellipsis: true,
                    render: (value: number) => (
                        <>
                            <a onClick={() => mandatoryTableHook.viewRecordLvlTwoHistory(value, expandedLvlOne)} className="m-l-8 ">
                                <Icon
                                    iconType="history"
                                    toolTip="تاریخچه"
                                />
                            </a>

                            {/* <Tooltip className="cursorPointer m-l-8 " placement="topLeft" title="حذف">
                                <Popconfirm

                                    placement="top"
                                    title="آیا از حذف رکورد اطمینان دارید؟"
                                    onConfirm={() => deleteRecordHandler(value, expandedLvlOne)}
                                    okText="بله"
                                    cancelText="خیر"
                                >
                                    <Icon
                                        iconType="trash"
                                        toolTip="حذف"
                                    />
                                </Popconfirm>

                            </Tooltip> */}
                            <a onClick={() => mandatoryTableHook.editMandatoryHandler(value, companyIdOnExpandLvlOne, expandedLvlOne)} className="m-l-8 ">
                                <Icon
                                    iconType="edit"
                                    toolTip="ویرایش"
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
                            {/* <Button onClick={() => mandatoryTableHook.viewDetails(value, companyIdOnExpandLvlOne, expandedLvlOne)}
                                type="primary"
                                icon={<LeftOutlined />}
                            >
                            </Button> */}
                            <TableIconDetail
                                onClick={() => mandatoryTableHook.viewDetails(value, companyIdOnExpandLvlOne, expandedLvlOne)}
                            />
                        </Tooltip>

                    )
                }
            ];

            return (
                <>
                    <Button className="excelButton" onClick={() => mandatoryTableHook.getLvlTwoExcelReport(companyIdForExcel, fiscalYearIdOnExpandLvlOne)}>
                        <Icon
                            iconType="file-excel"
                            toolTip="خروجی اکسل"
                            loading={mandatoryTableHook.isLvlOneExcelLoading}

                        />
                    </Button>
                    <Button className="excelButton m-l-4" onClick={mandatoryTableHook.viewInnerTableRecordHistory}>
                        <Icon

                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </Button>
                    <Collapse
                        className="filterBox  lowerBox"
                        collapsible="header"
                        activeKey={globalContext.secondChildActiveCollapsiblePanel}
                        onChange={globalContext.secondChildOnChangeActiveCollapsiblePanel}>

                        <Panel

                            showArrow={false}
                            header={
                                <Button className="filterBoxButton">
                                    <Icon
                                        iconType="filter"
                                        toolTip="فیلتر"
                                    />
                                </Button>}
                            key='3'
                        >
                            <GetSecondChildColumnSearchProps titles={globalContext.secondChildColumnTitles} shouldResetFilterUILvlTwo={shouldResetFilterUILvlTwo} />
                        </Panel>
                    </Collapse>


                    <Table
                        onChange={mandatoryTableHook.onLvlTwoChangeTable}
                        loading={isLoadingLvlTwoTable}
                        columns={lvlTwoColumns}
                        dataSource={mandatoryTableHook.finalFIlterDataSecond}
                        className="reinsuranceTable nestedTableWithPagination"
                        showSorterTooltip={false}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    //signatureTableHook.onRowSelection(record);
                                },
                            };
                        }}
                        pagination={{
                            current: mandatoryTableHook.currentSecondLvl,
                            onChange: (current: number, pageSize: number | undefined) => {
                                mandatoryTableHook.changePageHandlerSecond(current, pageSize)
                                //console.log("current: number, pageSize:number ", current, pageSize);

                            },
                            total: mandatoryTableHook.totalCountSecondLvl,
                            pageSize: mandatoryTableHook.pageModelSecondLvl.pageSize,
                            onShowSizeChange: mandatoryTableHook.changePageHandlerSecond
                        }}
                    />
                </>);
        };

        return (
            <>
                <Button className="excelButton" onClick={() => mandatoryTableHook.getLvlOneExcelReport(companyIdForExcel)}>
                    <Icon
                        iconType="file-excel"
                        toolTip="خروجی اکسل"
                        loading={mandatoryTableHook.isLvlOneExcelLoading}

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
                    onChange={mandatoryTableHook.onLvlOneChangeTable}
                    className="reinsuranceTable nestedTableWithPagination"
                    columns={lvlOneColumns}
                    loading={isLoadingLvlOneTable}
                    expandedRowKeys={expandedRowKeysLvlOne}
                    expandable={{ expandedRowRender }}
                    expandIcon={(props) => customExpandIconOne(props)}
                    dataSource={mandatoryTableHook.finalFIlterDataFisrt}
                    showSorterTooltip={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                //signatureTableHook.onRowSelection(record);
                            },
                        };
                    }}
                    pagination={{
                        current: mandatoryTableHook.currentFirstLvl,
                        onChange: (current: number, pageSize: number | undefined) => {
                            mandatoryTableHook.changePageHandlerFirst(current, pageSize)
                            //console.log("current: number, pageSize:number ", current, pageSize);

                        },
                        total: mandatoryTableHook.totalCountFirstLvl,
                        pageSize: mandatoryTableHook.pageModelFirstLvl.pageSize,
                        onShowSizeChange: mandatoryTableHook.changePageHandlerFirst
                    }}
                />
            </>);
    };


    function customExpandIcon(props: any) {
        if (props.expanded) {
            return <a style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
                onTableRowExpand(props.expanded, props.record);
            }}><Icon
                    iconType="minus"
                    toolTip="بستن"
                /></a>
        } else {
            return <a style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
                globalContext.childOnSetIsAdvancedSearch(false);
                setShouldResetFilterUI(!shouldResetFilterUI)
                loadLevelOneData(props.record.companyId);
                setCompanyIdForExcel(props.record.companyId);
                setIsLoadingLvlOneTable(true)
                onTableRowExpand(props.expanded, props.record);
                setExpandedMainRow(props.record.id)
                setExpandedRowKeysLvlOne([])
            }}><Icon
                    iconType="plus"
                    toolTip="مشاهده"
                    rotate={90}
                /></a>
        }
    }

    useEffect(() => {

        loadLevelOneData(companyIdForExcel)

    }, [props.shouldReloadLevelOneTable, mandatoryTableHook.currentFirstLvl, mandatoryTableHook.pageModelFirstLvl, globalContext.childShouldMakeAdvancedSearchAgain, mandatoryTableHook.lvlOneSorter])

    useEffect(() => {
        if (!isOnLoadPage) {
            loadLevelTwoData(companyIdOnExpandLvlOne, fiscalYearIdOnExpandLvlOne);
        }
        setIsOnLoadPage(false)
    }, [props.shouldReloadLevelTwoTable, mandatoryTableHook.currentSecondLvl, mandatoryTableHook.pageModelSecondLvl, globalContext.secondChildShouldMakeAdvancedSearchAgain, mandatoryTableHook.lvlTwoSorter])

    useEffect(() => {
        setExpandedRowKeys([])
        setExpandedRowKeysLvlOne([])
    }, [props.shouldCloseAllExpandedTables])


    const loadLevelOneData = (companyId: number) => {

        setIsLoadingLvlOneTable(true);
        let currentPage = globalContext.childIsFilterResubmitted ? 1 : mandatoryTableHook.currentFirstLvl
        mandatoryTableHook.onSetCurrentFirst(currentPage)
        if (!globalContext.childIsAdvancedSearch) {
            MandatoryApi.GetAllFiscalYearByCompanyId({
                pageIndex: mandatoryTableHook.currentFirstLvl,
                firstPageSize: mandatoryTableHook.pageModelFirstLvl.pageSize,
                rowsPerPage: mandatoryTableHook.pageModelFirstLvl.pageSize,
                orderBy: mandatoryTableHook.lvlOneSorter.orderBy,
                isDescending: mandatoryTableHook.lvlOneSorter.isDescending,
                companyId
            }).then(response => {
                mandatoryTableHook.setFirstTableData(response)
            })
                .finally(() => {
                    setIsLoadingLvlOneTable(false);
                })
        }
        else {
            MandatoryApi.AdvancedSearchSecond({
                pageSize: mandatoryTableHook.pageModelFirstLvl.pageSize,
                pageIndex: currentPage,
                firstPageSize: mandatoryTableHook.pageModelFirstLvl.pageSize,
                orderBy: mandatoryTableHook.lvlOneSorter.orderBy === null || mandatoryTableHook.lvlOneSorter.orderBy === undefined ? "Id" : mandatoryTableHook.lvlOneSorter.isDescending === true ? `${mandatoryTableHook.lvlOneSorter.orderBy} DESC` : `${mandatoryTableHook.lvlOneSorter.orderBy}`,
                companyId,
                filters: globalContext.childSubmittedFilters
            }).then(response => {
                mandatoryTableHook.setFirstTableData(response)

            })
                .finally(() => {
                    globalContext.childOnResubmitFilter(false);
                    setIsLoadingLvlOneTable(false);
                })
        }
    }

    const loadLevelTwoData = (companyId: number, fiscalYearId: number) => {

        setIsLoadingLvlTwoTable(true);
        let currentPage = globalContext.secondChildIsFilterResubmitted ? 1 : mandatoryTableHook.currentSecondLvl
        mandatoryTableHook.onSetCurrentSecond(currentPage)
        if (!globalContext.secondChildIsAdvancedSearch) {
            MandatoryApi.GetAllMandatoryRelianceInformationByFiscalYearId({
                pageIndex: mandatoryTableHook.currentSecondLvl,
                firstPageSize: mandatoryTableHook.pageModelSecondLvl.pageSize,
                rowsPerPage: mandatoryTableHook.pageModelSecondLvl.pageSize,
                orderBy: mandatoryTableHook.lvlTwoSorter.orderBy,
                isDescending: mandatoryTableHook.lvlTwoSorter.isDescending,
                companyId,
                fiscalYearId
            }).then(response => {
                mandatoryTableHook.setSecondTableData(response)
            })
                .finally(() => {
                    setIsLoadingLvlTwoTable(false);
                })
        }
        else {
            MandatoryApi.AdvancedSearchThird({
                pageSize: mandatoryTableHook.pageModelSecondLvl.pageSize,
                pageIndex: currentPage,
                firstPageSize: mandatoryTableHook.pageModelSecondLvl.pageSize,
                orderBy: mandatoryTableHook.lvlTwoSorter.orderBy === null || mandatoryTableHook.lvlTwoSorter.orderBy === undefined ? "Id" : mandatoryTableHook.lvlTwoSorter.isDescending === true ? `${mandatoryTableHook.lvlTwoSorter.orderBy} DESC` : `${mandatoryTableHook.lvlTwoSorter.orderBy}`,
                companyId,
                fiscalYearId,
                filters: globalContext.secondChildSubmittedFilters
            }).then(response => {
                mandatoryTableHook.setSecondTableData(response)

            })
                .finally(() => {
                    globalContext.secondChildOnResubmitFilter(false);
                    setIsLoadingLvlTwoTable(false);
                })
        }
    }


    function customExpandIconOne(props: any) {
        if (props.expanded) {
            return <a style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
                onTableRowExpandLvlOne(props.expanded, props.record);
            }}><Icon
                    iconType="minus"
                    toolTip="بستن"
                /></a>
        } else {
            return <a style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
                globalContext.secondChildOnSetIsAdvancedSearch(false);
                setShouldResetFilterUILvlTwo(!shouldResetFilterUILvlTwo)
                onTableRowExpandLvlOne(props.expanded, props.record);
                loadLevelTwoData(props.record.companyIdLvlOne, props.record.fiscalYearId);
                setIsLoadingLvlTwoTable(true)
                setCompanyIdOnExpandLvlOne(props.record.companyIdLvlOne)
                setFiscalYearIdOnExpandLvlOne(props.record.fiscalYearId)
                setExpandedLvlOne(props.record.id)
            }}><Icon
                    iconType="plus"
                    toolTip="مشاهده"
                    rotate={90}
                /></a>
        }
    }

    const onTableRowExpand = (expanded: any, record: any) => {
        var keys = [];
        if (!expanded) {
            keys.push(record.key);
        }
        setExpandedRowKeys(keys);
        // if(expanded){
        // 	// ajax call to get expanded data 
        // }
    }

    const onTableRowExpandLvlOne = (expanded: any, record: any) => {
        var keysLvlOne = [];
        if (!expanded) {
            keysLvlOne.push(record.key);
        }
        setExpandedRowKeysLvlOne(keysLvlOne);
    }

    return (
        <div>
            <ConfigProvider>
                <Table
                    onChange={mandatoryTableHook.onChangeTable}
                    loading={mandatoryTableHook.isLoadingTable || props.isTableLoadingFilter}
                    expandedRowKeys={expandedRowKeys}
                    className="reinsuranceTable"
                    columns={columns}
                    //   onChange={mainTableHook.handleChange}
                    dataSource={mandatoryTableHook.finalFIlterData}
                    showSorterTooltip={false}
                    expandable={{ expandedRowRender }}
                    expandIcon={(props) => customExpandIcon(props)}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                mandatoryTableHook.onRowSelection(record);
                            },
                        };
                    }}
                    pagination={{
                        current: mandatoryTableHook.current,
                        onChange: (current: number, pageSize: number | undefined) => {
                            mandatoryTableHook.changePageHandler(current, pageSize)
                            console.log("current: number, pageSize:number ", current, pageSize);

                        },
                        total: mandatoryTableHook.totalCount,
                        pageSize: mandatoryTableHook.pageModel.pageSize,
                        onShowSizeChange: mandatoryTableHook.changePageHandler
                    }}
                />
            </ConfigProvider>

        </div>
    )
}
export default MandatoryTable