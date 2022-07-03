import { useEffect, useContext } from 'react'
import CurrencyTableHook from "./hook"
import { PriceFormatter, Table, ConfigProvider, DateConvertor } from "sanhab-components-library";

import GlobalContext from '../../../../controler/context/context'


const CurrencyTable = (props: any) => {
    const currencyTableHook = CurrencyTableHook(props);
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
                persianName: "عنوان ارز"
            },

            {
                name: "CurrencyCode",
                type: "number",
                persianName: "کد ارز"
            },
            {
                name: "ExchangeRate",
                type: "number",
                persianName: "نرخ ارز(ریال)"
            },
            {
                name: "AccountingCode",
                type: "number",
                persianName: "کد حسابداری"
            },
            {
                name: "Date",
                type: "date",
                persianName: "تاریخ"
            }
        ])
    }, []);

    let columns: any = [
        {
            title: "شناسه",
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "عنوان ارز",
            dataIndex: "title",
            key: "title",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "کد ارز",
            dataIndex: "currencyCode",
            key: "currencyCode",
            ellipsis: true,
            sorter: {
                compare: (a: any, b: any) => a - b
            },
        },
        {
            title: "نرخ ارز (ریال)",
            dataIndex: "exchangeRate",
            key: "exchangeRate",
            ellipsis: true,
            render: (val: number) => PriceFormatter(val),
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
            title: " تاریخ",
            dataIndex: "date",
            key: "date",
            ellipsis: true,
            //...GetColumnSearchProps("date", "date"),
            render: (creationDate: any, _: any, index: any) => {
                if (index === 0) {
                    props.setLatestUpdateDate(DateConvertor.convertUTCdate(creationDate, "hh:mm - YYYY/MM/DD"))
                }
                return creationDate && DateConvertor.convertUTCdate(creationDate, "hh:mm - YYYY/MM/DD")
            },
            sorter: {
                compare: (a: any, b: any) => a - b
            },
            // render: (value: string, _:any , index:any) => {
            //     let fromDateDateTime = value.split("T")[0];
            //     let jalaliFromDate = momentJalaali(fromDateDateTime, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
            //     let frmDate = `${jalaliFromDate?.substring(0, 4)}/${jalaliFromDate?.substring(5, 7)}/${jalaliFromDate?.substring(8, 10)}`

            //     return frmDate;
            // }
        }

    ];
    return (
        <ConfigProvider>
            <div>
                <Table
                    onChange={currencyTableHook.onChangeTable}
                    className="reinsuranceTable"
                    columns={columns}
                    dataSource={currencyTableHook.finalFIlterData}
                    showSorterTooltip={false}
                    loading={currencyTableHook.isLoadingTable || props.isTableLoadingFilter}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                currencyTableHook.onRowSelection(record);
                            },
                        };
                    }}
                    pagination={{
                        current: currencyTableHook.current,
                        onChange: (current: number, pageSize: number | undefined) => {
                            currencyTableHook.changePageHandler(current, pageSize)

                        },
                        total: currencyTableHook.totalCount,
                        pageSize: currencyTableHook.pageModel.pageSize,
                        onShowSizeChange: currencyTableHook.changePageHandler
                    }}
                />
            </div>
        </ConfigProvider>
    )
}
export default CurrencyTable