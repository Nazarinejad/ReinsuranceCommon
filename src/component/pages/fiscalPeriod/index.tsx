import { useState, useEffect, useContext } from 'react';
import fa_IR from "antd/lib/locale/fa_IR";
import classes from './fiscalPeriod.module.css';
import FiscalPeriodTable from '../../pageDetails/fiscalPeriod/fiscalPeriodTable'
import AddEditFiscalPeriodModal from '../../pageDetails/fiscalPeriod/addEditFiscalPeriodModal'
import ViewFiscalPeriodDetailsModal from '../../pageDetails/fiscalPeriod/viewFiscalPeriodDetailsModal'
import { ConfigProvider, Collapse } from 'antd';
import { Button, Modal } from 'sanhab-components-library';
import FiscalPeriodApi from "../../../controler/services/fiscalPeriod/apiRequest";
import { Notification, Icon } from 'sanhab-components-library'
import GetColumnSearchProps from '../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../controler/context/context';
import HistoryModal from '../../common/history/historyModal'
import HistoryContext from '../../common/history/context/context';
const { Panel } = Collapse;

const FiscalPeriod = () => {

    const globalContext = useContext(GlobalContext)
    const historyContext = useContext(HistoryContext)

    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [selectedRecordYearPeriodId, setSelectedRecordYearPeriodId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);

    const [fiscalYearList, setFiscalYearList] = useState<any[]>([]);

    const [isExcelLoading, setIsExcelLoading] = useState(false);

    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);

    const [isTotalHistory, setIsTotalHistory] = useState(false);


    useEffect(() => {
        globalContext.resetFilterValues()

        FiscalPeriodApi.GetAllFiscalYears().then((response) => {
            setFiscalYearList(response?.data?.Result);
        })

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

    const viewRecordDetailsHandler = (id: number) => {
        setSelectedRecordId(id);
        setVisibleDetailsModal(true);
    };

    const reloadTable = () => {
        setShouldReloadTable(!shouldReloadTable)
    };


    const deleteRecordHandler = (id: number) => {
        FiscalPeriodApi.DeleteFiscalPeriod({ id: id }).then((response: any) => {
            if (response?.data?.IsSucceed) {
                Notification.success({ message: ' با موفقیت حذف شد.' });
                setShouldReloadTable(!shouldReloadTable);
            }
        })

    };


    const onCloseAddEditMoadl = () => {
        setVisibleAddModal(false)
    }

    const getExcelReport = () => {
        setIsExcelLoading(true);
        FiscalPeriodApi.GetExcelReport()
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

    return (
        <div className={classes.fiscalPeriod_wrapper}>
            <ConfigProvider direction="rtl" locale={fa_IR}>

                <Button className="buttonCreate"
                    type="primary"
                    onClick={createNewRecord}>
                    <span> افزودن دوره مالی</span>
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
                        loading={isExcelLoading}
                    />
                </Button>

                <Collapse
                    className="filterBox"
                    collapsible="header"
                    activeKey={globalContext.activeCollapsiblePanel}
                    onChange={globalContext.onChangeActiveCollapsiblePanel}>
                    {/* defaultActiveKey={['1']} */}
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


                {/* <Filter onFilterDate={onFilterDate} removeFilters={removeFilters} onLoadingFiltered={onLoadingFiltered} onChangeFilterData={onChangeFilterData} /> */}
                <FiscalPeriodTable

                    editRecordHandler={editRecordHandler}
                    deleteRecordHandler={deleteRecordHandler}
                    viewRecordDetailsHandler={viewRecordDetailsHandler}
                    shouldReloadTable={shouldReloadTable}
                    reloadTable={reloadTable}
                    fiscalYearList={fiscalYearList}
                    viewRecordHistory={viewRecordHistory}

                />




                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleAddModal}
                    className="sanhab-modal"
                    title={addForm ? "افزودن  دوره مالی" : "ویرایش  دوره مالی"}
                    width={500}
                    onOk={() => setVisibleAddModal(false)}
                    onCancel={() => setVisibleAddModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <AddEditFiscalPeriodModal
                        fiscalPeriodId={selectedRecordId}
                        isUpdate={isUpdate}
                        onCloseModal={() => setVisibleAddModal(false)}
                        onCloseAddEditMoadl={onCloseAddEditMoadl}
                        reloadTable={reloadTable}
                        selectedRecordYearPeriodId={selectedRecordYearPeriodId}
                        fiscalYearList={fiscalYearList} />

                    {/* onNeedReload={toggleReloadState} */}

                </Modal>

                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleDetailsModal}
                    className="sanhab-modal"
                    title={"جزییات  دوره مالی"}
                    width={800}
                    onOk={() => setVisibleDetailsModal(false)}
                    onCancel={() => setVisibleDetailsModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <ViewFiscalPeriodDetailsModal
                        fiscalPeriodId={selectedRecordId}
                        onCloseModal={() => setVisibleDetailsModal(false)}
                        editRecordHandler={editRecordHandler}
                        deleteRecordHandler={deleteRecordHandler}
                        selectedRecordYearPeriodId={selectedRecordYearPeriodId} />

                </Modal>



                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleHistoryModal}
                    className="sanhab-modal"
                    title={"تاریخچه"}
                    width={1200}
                    onOk={() => setVisibleHistoryModal(false)}
                    onCancel={() => { setVisibleHistoryModal(false); historyContext.resetFilterValues() }}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <HistoryModal
                        recordId={selectedRecordId}
                        onCloseModal={() => { setVisibleHistoryModal(false); historyContext.resetFilterValues() }}
                        parent="fiscalPeriod"
                        hasDescription={false}
                        isTotalHistory={isTotalHistory}
                    />


                </Modal>



            </ConfigProvider>


        </div>
    )
}
export default FiscalPeriod; 