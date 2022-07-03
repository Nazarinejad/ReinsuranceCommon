import { useState, useContext, useEffect } from 'react';
import fa_IR from "antd/lib/locale/fa_IR";
import classes from './currency.module.css';
import CurrencyTable from '../../pageDetails/currency/currencyTable/index'
import { ConfigProvider } from 'antd';
import CurrencyApi from "../../../controler/services/currency/apiRequest";
import { Button, Icon } from 'sanhab-components-library';
import { Collapse } from 'antd';

import GetColumnSearchProps from '../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../controler/context/context';

const { Panel } = Collapse;

const Field = () => {

    const globalContext = useContext(GlobalContext)

    const [shouldReloadTable, setShouldReloadTable] = useState(false);
    const [lastUpdateDate, setLastUpdateDate] = useState("");
    const [isExcelLoading, setIsExcelLoading] = useState(false);

    useEffect(() => {
        globalContext.resetFilterValues()
    }, [])

    const reloadTable = () => {
        setShouldReloadTable(!shouldReloadTable)
    };

    const setLatestUpdateDate = (dateString: string) => {
        setLastUpdateDate(dateString)
    };

    const getExcelReport = () => {
        setIsExcelLoading(true);
        CurrencyApi.GetExcelReport()
            .finally(() =>
                setIsExcelLoading(false)
            )
    }


    return (
        <div className={classes.currency_wrapper}>
            <ConfigProvider direction="rtl" locale={fa_IR}>

                {/* <Button className="buttonCreate" style={{ width: '0px' }}
                    onClick={reloadTable}
                >
                    <span>به روز رسانی</span>
                </Button> */}


                <Button className="excelButton" onClick={getExcelReport}>
                    <Icon
                        iconType="file-excel"
                        toolTip="خروجی اکسل"
                        loading={isExcelLoading}
                    />
                </Button>


                <Collapse
                    className="filterBox notBtnBox"
                    collapsible="header"
                    activeKey={globalContext.activeCollapsiblePanel}
                    onChange={globalContext.onChangeActiveCollapsiblePanel}>

                    <Panel

                        showArrow={false}
                        header={
                            <Button className="filterBoxButton">
                                <Icon
                                    iconType="filter"
                                    toolTip="فیلتر"
                                />
                            </Button>}
                        key='1'
                    >
                        {GetColumnSearchProps(globalContext.columnTitles)}
                    </Panel>
                </Collapse>

                <CurrencyTable
                    shouldReloadTable={shouldReloadTable}
                    reloadTable={reloadTable}
                    setLatestUpdateDate={setLatestUpdateDate}

                />






            </ConfigProvider>


        </div>
    )
}
export default Field; 