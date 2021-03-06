import SignatureTableHook from "./hook"
import React, { useState, useEffect, useContext } from "react";
import { Collapse, Popconfirm } from 'antd'
// import { FieldGroupDictionary } from '../../../../controler/model/enum/FieldGroupDictionary'
import { Icon, Table, Notification, ConfigProvider, Tooltip, Select, DateConvertor, Button } from "sanhab-components-library"
import SignatureApi from "../../../../controler/services/signature/apiRequest";
import { GetDepartmentName } from '../../../../controler/helper/GetSignatureNames'
import { GetCompanyName } from '../../../../controler/helper/GetMandatoyPageNames'

import GlobalContext from '../../../../controler/context/context'
import GetChildColumnSearchProps from '../../../../controler/helper/ChildColumnFiltering'

const { Option } = Select;
const { Panel } = Collapse;

const SignatureTable = (props: any) => {
    const signatureTableHook = SignatureTableHook(props);

    const [isLoadingLvlTwoTable, setIsLoadingLvlTwoTable] = useState(false);
    const [isLoadingLvlOneTable, setIsLoadingLvlOneTable] = useState(false);
    const [finalLvlTwoData, setFinalLvlTwoData] = useState<any[]>([]);
    const [finalLvlOneData, setFinalLvlOneData] = useState<any[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
    const [expandedRowKeysLvlOne, setExpandedRowKeysLvlOne] = useState<any[]>([]);
    const [expandedMainRow, setExpandedMainRow] = useState<number>(0);
    const [parentData, setParentData] = useState<any>({});
    const [expandedLvlOne, setExpandedLvlOne] = useState<number>(0);

    const [companyIdOnExpandLvlOne, setCompanyIdOnExpandLvlOne] = useState<number>(0);
    const [fiscalYearIdOnExpandLvlOne, setFiscalYearIdOnExpandLvlOne] = useState<number>(0);

    const [lengthOfLvlTwoTableRows, setLengthOfLvlTwoTableRows] = useState<number>(0);
    const [lengthOfLvlOneTableRows, setLengthOfLvlOneTableRows] = useState<number>(0);

    const [isLoadingFirstTable, setIsLoadingFirstTable] = useState<boolean>(false);
    const [shouldResetFilterUI, setShouldResetFilterUI] = useState<boolean>(false);
    const [isOnLoadPage, setIsOnLoadPage] = useState<boolean>(true);

    // type FieldGroupDictionaryStrings = keyof typeof FieldGroupDictionary;


    const globalContext = useContext(GlobalContext)
    useEffect(() => {
        globalContext.setAdvancedsearchTitles([
            // {
            //     name: "Id",
            //     type: "number",
            //     persianName: "??????????"
            // },
            {
                name: "Department",
                type: "component",
                persianName: "??????????",
                component: <Select
                    disabled={props.isUpdate}
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="???????????? ??????????"
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
                name: "Name",
                type: "string",
                persianName: "?????? ???????? ?????????? ?????? "
            },
            {
                name: "RegDate",
                type: "date",
                persianName: "?????????? ?????????? ????????????"
            }

        ])
    }, [props.departmentList]);


    useEffect(() => {
        globalContext.childSetAdvancedsearchTitles([
            // {
            //     name: "Id",
            //     type: "number",
            //     persianName: "??????????"
            // },
            {
                name: "Name",
                type: "string",
                persianName: "?????? ???????? ?????????? ?????? "
            },
            {
                name: "CompanyId",
                type: "component",
                persianName: "?????? ????????",
                component: <Select
                    showSearch
                    filterOption={(input, option) => {
                        return option?.props.children.indexOf(input) >= 0
                    }}
                    placeholder="????????????  ???????? ">
                    {props.companyList?.map((company: any) => {
                        return (
                            <Option key={company.Id} value={company?.Id}>
                                {company?.Title}
                            </Option>
                        );
                    })}
                </Select>
            },

        ])
    }, [props.companyList]);



    let columns: any = [
        {
            title: "?????????? ????????",
            dataIndex: "file",
            key: "file",
            ellipsis: true,
            render: (val: any, record: any) => {
                return (
                    <img onClick={() => signatureTableHook.showFullSizeImage(record.id)} className="cursorPointer" src={val} />
                )
            }
        },
        {
            title: "????",
            dataIndex: "id",
            key: "id",
            width: "150px",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "??????????",
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
            title: "?????? ???????? ?????????? ??????",
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        // {
        //     title: "?????????? ???????? ?????????????? ?????? ????????",
        //     dataIndex: "countOfSecondSignatory",
        //     key: "countOfSecondSignatory",
        //     ellipsis: true
        // },
        {
            title: "?????????? ?????????? ????????????",
            dataIndex: "regDate",
            key: "regDate",
            ellipsis: true,
            render: (creationDate: any) => creationDate && DateConvertor.convertUTCdate(creationDate, "YYYY/MM/DD"),
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "????????????",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            render: (value: number, record: any) => (
                <>

                    <Icon
                        onClick={() => signatureTableHook.addSecondSignatureHandler(value, record.department)}
                        iconType="plus"
                        toolTip="???????????? ???????? ?????????? ??????"
                        className="cursorPointer "
                    />
                    <Icon
                        onClick={() => signatureTableHook.updateSignatureImageHandler(value, false)}
                        iconType="form"
                        toolTip="???????????? ?????????? ????????"
                        className="cursorPointer m-r-8"
                    />
                    <Icon
                        onClick={() => signatureTableHook.editSignatureHandler(value)}
                        iconType="edit"
                        toolTip="????????????"
                        className="cursorPointer m-r-8"
                    />



                </>
            )
        }
    ];


    const changeIsActiveStatus = (activeStatus: boolean) => {
        SignatureApi.ActiveOrDeactiveSignature(
            {
                id: signatureTableHook.selectedRow.id,
                isActive: !activeStatus
            }
        ).then((response) => {
            if (response?.data?.IsSucceed) {
                Notification.success({ message: ' ?????????? ???? ????????????  ?????????? ???????? ????.' });
                loadLevelOneData(expandedMainRow)
            }
        })
    };


    const deleteRecordHandler = (id: number, signatureId: number) => {
        SignatureApi.DeleteSignature({ id, signatureId }).then((response: any) => {
            if (response?.data?.IsSucceed) {
                Notification.success({
                    message: ' ???? ???????????? ?????? ????.',
                    duration: 0
                });
                loadLevelOneData(expandedMainRow)

            }

        })
    }


    const expandedRowRender = () => {
        const lvlOneColumns = [

            {
                title: "?????????? ????????",
                dataIndex: "file",
                key: "file",
                ellipsis: true,
                render: (val: any, record: any) => {
                    return (
                        <img onClick={() => signatureTableHook.showFullSizeImage(record.signatureId)} className="cursorPointer" src={val} />
                    )
                }
            },
            {
                title: "???? ??????????",
                dataIndex: "id",
                key: "id",
                ellipsis: true,
                sorter: {
                    compare: (a: any, b: any) => a - b
                },
            },
            {
                title: "????????",
                dataIndex: "companyId",
                key: "companyId",
                ellipsis: true,
                render: (val: number) => {
                    return GetCompanyName(val, props.companyList)
                },
                sorter: {
                    compare: (a: any, b: any) => a - b
                },
            },
            {
                title: "?????? ???????? ?????????? ??????",
                dataIndex: "name",
                key: "name",
                ellipsis: true,
                sorter: {
                    compare: (a: any, b: any) => a - b
                },
            },
            // {
            //     title: "????????/??????????????",
            //     dataIndex: "isActive",
            //     key: "isActive",
            //     ellipsis: true,
            //     render: (value: boolean) =>
            //     (
            //         <Popconfirm

            //             placement="top"
            //             title="?????? ???? ?????????? ?????????? ?????????? ?????????????? ????????????"
            //             onConfirm={() => changeIsActiveStatus(value)}
            //             okText="??????"
            //             cancelText="??????"
            //         >
            //             <Switch
            //                 className="statusSwitch"
            //                 checkedChildren="????????"
            //                 unCheckedChildren="??????????????"
            //                 defaultChecked={value}
            //                 checked={value} />
            //         </Popconfirm>

            //     )
            // },

            {
                title: "????????????",
                dataIndex: "id",
                key: "id",
                ellipsis: true,
                render: (value: number, record: any) => (
                    <>

                        <Icon
                            onClick={() => signatureTableHook.updateSignatureImageHandler(record.signatureId, true)}
                            iconType="form"
                            toolTip="???????????? ?????????? ????????"
                            className="cursorPointer m-l-8"
                        />

                        <a onClick={() => signatureTableHook.viewRecordHistory(value)} className="m-l-8 ">
                            <Icon
                                iconType="history"
                                toolTip="??????????????"
                            />
                        </a>

                        <Tooltip className="cursorPointer m-l-8 " placement="topLeft" title="??????">
                            <Popconfirm

                                placement="top"
                                title="?????? ???? ?????? ?????????? ?????????????? ????????????"
                                onConfirm={() => deleteRecordHandler(value, record.signatureId)}
                                okText="??????"
                                cancelText="??????"
                            >
                                <Icon
                                    iconType="trash"
                                    toolTip="??????"
                                />
                            </Popconfirm>

                        </Tooltip>



                        <Icon
                            onClick={() => signatureTableHook.editSecondSignatureHandler(record.signatureId, parentData.id, parentData.department)}
                            iconType="edit"
                            toolTip="????????????"
                            className="cursorPointer "
                        />




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




        return <>

            <Button className="excelButton" onClick={() => signatureTableHook.getLvlOneExcelReport(expandedMainRow)}>
                <Icon
                    iconType="file-excel"
                    toolTip="?????????? ????????"
                    loading={signatureTableHook.isLvlOneExcelLoading}

                />
            </Button>

            <Button className="excelButton m-l-4" onClick={signatureTableHook.viewInnerTableTotalHistory}>
                <Icon

                    iconType="history"
                    toolTip="??????????????"
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
                                toolTip="??????????"
                            />
                        </Button>}
                    key='2'
                >
                    <GetChildColumnSearchProps titles={globalContext.childColumnTitles} shouldResetFilterUI={shouldResetFilterUI} />
                </Panel>
            </Collapse>

            <Table
                onChange={signatureTableHook.onChangeChildTable}
                className="reinsuranceTable nestedTableWithPagination"
                columns={lvlOneColumns}
                loading={isLoadingFirstTable}
                //   onChange={mainTableHook.handleChange}
                dataSource={signatureTableHook.finalFIlterDataFisrt}
                showSorterTooltip={false}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            //signatureTableHook.onRowSelection(record);
                        },
                    };
                }}
                pagination={{
                    current: signatureTableHook.currentFirstLvl,
                    onChange: (current: number, pageSize: number | undefined) => {
                        signatureTableHook.changePageHandlerFirst(current, pageSize)
                        //console.log("current: number, pageSize:number ", current, pageSize);

                    },
                    total: signatureTableHook.totalCountFirstLvl,
                    pageSize: signatureTableHook.pageModelFirstLvl.pageSize,
                    onShowSizeChange: signatureTableHook.changePageHandlerFirst
                }}
            />
        </>
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
                    toolTip="????????"
                    size="small"
                /></a>
        } else {
            return <a style={{ color: 'black' }} onClick={e => {
                props.onExpand(props.record, e);
                globalContext.childOnSetIsAdvancedSearch(false);
                setShouldResetFilterUI(!shouldResetFilterUI)
                loadLevelOneData(props.record.id);
                setIsLoadingLvlOneTable(true)
                onTableRowExpand(props.expanded, props.record);
                setExpandedMainRow(props.record.id)
                setParentId(props.record.id)
                setParentData(props.record)
                setExpandedRowKeysLvlOne([])
            }}><Icon
                    iconType="plus"
                    toolTip="????????????"
                    rotate={90}
                    size="small"
                /></a>
        }
    }

    useEffect(() => {
        if (!isOnLoadPage) {
            loadLevelOneData(expandedMainRow)
        }
        setIsOnLoadPage(false)
    }, [signatureTableHook.currentFirstLvl, signatureTableHook.pageModelFirstLvl, props.shouldReloadLevelOneTable, globalContext.childShouldMakeAdvancedSearchAgain, signatureTableHook.childSorter])


    useEffect(() => {
        setExpandedRowKeys([])
        setExpandedRowKeysLvlOne([])
    }, [props.shouldCloseAllExpandedTables])


    const loadLevelOneData = (id: number) => {

        setIsLoadingFirstTable(true);
        let currentPage = globalContext.childIsFilterResubmitted ? 1 : signatureTableHook.currentFirstLvl
        signatureTableHook.onSetCurrentFirst(currentPage)
        if (!globalContext.childIsAdvancedSearch) {
            SignatureApi.AllPagedSubTable({
                pageIndex: signatureTableHook.currentFirstLvl,
                firstPageSize: signatureTableHook.pageModelFirstLvl.pageSize,
                rowsPerPage: signatureTableHook.pageModelFirstLvl.pageSize,
                orderBy: signatureTableHook.childSorter.orderBy,
                isDescending: signatureTableHook.childSorter.isDescending,
                id
            }).then(response => {
                signatureTableHook.setFirstTableData(response)
            })
                .finally(() => {
                    setIsLoadingFirstTable(false);
                })
        }
        else {
            SignatureApi.AdvancedSearch({
                pageSize: signatureTableHook.pageModelFirstLvl.pageSize,
                pageIndex: currentPage,
                firstPageSize: signatureTableHook.pageModelFirstLvl.pageSize,
                orderBy: signatureTableHook.childSorter.orderBy === null || signatureTableHook.childSorter.orderBy === undefined ? "Id" : signatureTableHook.childSorter.isDescending === true ? `${signatureTableHook.childSorter.orderBy} DESC` : `${signatureTableHook.childSorter.orderBy}`,
                parentId: id,
                filters: globalContext.childSubmittedFilters
            }).then(response => {
                signatureTableHook.setFirstTableData(response)

            })
                .finally(() => {
                    globalContext.childOnResubmitFilter(false);
                    setIsLoadingFirstTable(false);
                })
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



    return (
        <div>
            <ConfigProvider>
                <Table
                    onChange={signatureTableHook.onChangeTable}
                    expandedRowKeys={expandedRowKeys}
                    className="reinsuranceTable"
                    columns={columns}
                    loading={signatureTableHook.isLoadingTable || props.isTableLoadingFilter}
                    //   onChange={mainTableHook.handleChange}
                    dataSource={signatureTableHook.finalFIlterData}
                    showSorterTooltip={false}
                    expandable={{ expandedRowRender }}
                    expandIcon={(props) => customExpandIcon(props)}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                signatureTableHook.onRowSelection(record);
                            },
                        };
                    }}
                    pagination={{
                        current: signatureTableHook.current,
                        onChange: (current: number, pageSize: number | undefined) => {
                            signatureTableHook.changePageHandler(current, pageSize)
                            console.log("current: number, pageSize:number ", current, pageSize);

                        },
                        total: signatureTableHook.totalCount,
                        pageSize: signatureTableHook.pageModel.pageSize,
                        onShowSizeChange: signatureTableHook.changePageHandler
                    }}
                />
            </ConfigProvider>

        </div >
    )
}
export default SignatureTable