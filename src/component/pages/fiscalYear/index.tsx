import { useState, useContext, useEffect } from 'react';
import fa_IR from "antd/lib/locale/fa_IR";
import classes from './fiscalYear.module.css';
import FiscalYearTable from '../../pageDetails/fiscalYear/fiscalYearTable/index'
import AddEditFiscalYearModal from '../../pageDetails/fiscalYear/addEditFiscalYearModal/index'
import { Button, ConfigProvider, Collapse, Modal } from 'antd';
import FiscalYearApi from "../../../controler/services/fiscalYear/apiRequest";
import { Notification, Icon } from 'sanhab-components-library'
import GetColumnSearchProps from '../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../controler/context/context';
import HistoryModal from '../../common/history/historyModal/index'
import HistoryContext from '../../common/history/context/context';

const { Panel } = Collapse;

const FiscalYear = () => {
    const globalContext = useContext(GlobalContext)
    const historyContext = useContext(HistoryContext)

    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);

    const [isExcelLoading, setIsExcelLoading] = useState(false);

    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);

    const [isTotalHistory, setIsTotalHistory] = useState(false);


    useEffect(() => {
        globalContext.resetFilterValues()
    }, [])


    const createNewRecord = () => {
        setVisibleAddModal(true);
        setAddForm(true);
        setIsUpdate(false);
    };

    const editRecordHandler = (id: number) => {
        setSelectedRecordId(id);
        setVisibleAddModal(true);
        setAddForm(false);
        setIsUpdate(true);
    };

    const reloadTable = () => {
        setShouldReloadTable(!shouldReloadTable)
    };

    const deleteRecordHandler = (id: number) => {
        FiscalYearApi.DeleteFiscalYear({ id: id }).then((response) => {
            if (response?.data?.IsSucceed) {
                Notification.success({ message: ' با موفقیت حذف شد' });
                setShouldReloadTable(!shouldReloadTable);
            }
        })

    };


    const onCloseAddEditMoadl = () => {
        setVisibleAddModal(false)
    }

    const getExcelReport = () => {
        setIsExcelLoading(true);
        FiscalYearApi.GetExcelReport()
            .finally(() =>
                setIsExcelLoading(false)
            )
    }

    const viewRecordHistory = (id: number) => {
        setIsTotalHistory(false)
        setSelectedRecordId(id);
        setVisibleHistoryModal(true);
    };

    const viewTotalHistory = () => {
        setIsTotalHistory(true)
        setVisibleHistoryModal(true);
    };

    // const refrence = ClickOutSide(() => {
    //     globalContext.closeCollapsiblePanel()
    // })

    return (
        <div className={classes.fiscalYear_wrapper}>
            <ConfigProvider direction="rtl" locale={fa_IR}>

                <Button className="buttonCreate"
                    type="primary"
                    onClick={createNewRecord}>
                    <span> افزودن سال مالی</span>
                </Button>

                <Button className="excelButton" onClick={getExcelReport}>
                    <Icon
                        iconType="file-excel"
                        toolTip="خروجی اکسل"
                        loading={isExcelLoading}

                    />
                </Button>


                <Button className="excelButton m-l-4" onClick={viewTotalHistory}>
                    <Icon

                        iconType="history"
                        toolTip="تاریخچه"
                    />
                </Button>


                {/* <div ref={refrence}> */}
                    
                    <Collapse
                        className="filterBox"
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
                {/* </div> */}


                <FiscalYearTable

                    editRecordHandler={editRecordHandler}
                    deleteRecordHandler={deleteRecordHandler}
                    shouldReloadTable={shouldReloadTable}
                    reloadTable={reloadTable}

                    viewRecordHistory={viewRecordHistory}


                />




                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleAddModal}
                    title={addForm ? "افزودن  سال مالی" : "ویرایش  سال مالی"}
                    className="sanhab-modal"
                    width={500}
                    onOk={() => setVisibleAddModal(false)}
                    onCancel={() => setVisibleAddModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <AddEditFiscalYearModal
                        fiscalYearId={selectedRecordId}
                        isUpdate={isUpdate}
                        onCloseModal={() => setVisibleAddModal(false)}
                        onCloseAddEditMoadl={onCloseAddEditMoadl}
                        reloadTable={reloadTable} />


                </Modal>

                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleHistoryModal}
                    title={"تاریخچه"}
                    className="sanhab-modal"
                    width={1200}
                    onOk={() => setVisibleHistoryModal(false)}
                    onCancel={() => { setVisibleHistoryModal(false); historyContext.resetFilterValues() }}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <HistoryModal
                        recordId={selectedRecordId}
                        onCloseModal={() => { setVisibleHistoryModal(false); historyContext.resetFilterValues() }}
                        parent="fiscalYear"
                        hasDescription={false}
                        isTotalHistory={isTotalHistory}
                    />


                </Modal>

            </ConfigProvider>


        </div>
    )
}
export default FiscalYear; 