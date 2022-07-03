import { useState, useContext, useEffect } from 'react';
import fa_IR from "antd/lib/locale/fa_IR";
import classes from './bordereau.module.css';
import BordereauTable from '../../pageDetails/bordereau/bordereauTable'
import AddEditBordereauModal from '../../pageDetails/bordereau/addEditBordereauModal'
import ViewBordereauDetailsModal from '../../pageDetails/bordereau/viewBordereauDetailsModal'
import { Button, ConfigProvider, Collapse, Modal } from 'antd';
import BordereauApi from "../../../controler/services/bordereau/apiRequest";
import { Notification, Icon } from 'sanhab-components-library'
import GetColumnSearchProps from '../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../controler/context/context';
import HistoryModal from '../../common/history/historyModal'
import HistoryContext from '../../common/history/context/context';

const { Panel } = Collapse;


const Bordereau = () => {
    const globalContext = useContext(GlobalContext)
    const historyContext = useContext(HistoryContext)

    useEffect(() => {
        globalContext.resetFilterValues()
    }, [])

    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);

    const [isExcelLoading, setIsExcelLoading] = useState(false);
    const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);

    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);

    const [isTotalHistory, setIsTotalHistory] = useState(false);
    
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
        BordereauApi.DeleteBordereau({ id: id }).then((response) => {
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
        BordereauApi.GetExcelReport()
            .finally(() =>
                setIsExcelLoading(false)
            )
    }

    const viewRecordDetailsHandler = (id: number) => {
        setSelectedRecordId(id);
        // setSelectedRecordYearPeriodId(yearPeriodId);
        setVisibleDetailsModal(true);
    };

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
        <div className={classes.bordereau_wrapper}>
            <ConfigProvider direction="rtl" locale={fa_IR}>

                <Button className="buttonCreate"
                    type="primary"
                    onClick={createNewRecord}>
                    <span> افزودن بردرو </span>
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
                
                <BordereauTable
                    editRecordHandler={editRecordHandler}
                    deleteRecordHandler={deleteRecordHandler}
                    shouldReloadTable={shouldReloadTable}
                    reloadTable={reloadTable}
                    
                    viewRecordDetailsHandler={viewRecordDetailsHandler}
                    viewRecordHistory={viewRecordHistory}


                />




                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleAddModal}
                    className="sanhab-modal"
                    title={addForm ? "افزودن   بردرو" : "ویرایش   بردرو"}
                    width={500}
                    onOk={() => setVisibleAddModal(false)}
                    onCancel={() => setVisibleAddModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <AddEditBordereauModal
                        bordereauId={selectedRecordId}
                        isUpdate={isUpdate}
                        onCloseModal={() => setVisibleAddModal(false)}
                        onCloseAddEditMoadl={onCloseAddEditMoadl}
                        reloadTable={reloadTable} />


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
                    <ViewBordereauDetailsModal
                        bordereauId={selectedRecordId}
                        onCloseModal={() => setVisibleDetailsModal(false)}
                        editRecordHandler={editRecordHandler}
                        deleteRecordHandler={deleteRecordHandler}
                    />
                    {/* selectedRecordYearPeriodId={selectedRecordYearPeriodId} */}

                </Modal>

                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleHistoryModal}
                    className="sanhab-modal"
                    title={ "تاریخچه"}
                    width={1200}
                    onOk={() => setVisibleHistoryModal(false)}
                    onCancel={() => {setVisibleHistoryModal(false);historyContext.resetFilterValues()}}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <HistoryModal 
                        recordId={selectedRecordId}
                        onCloseModal={() => {setVisibleHistoryModal(false);historyContext.resetFilterValues()}}
                        parent="bordereau"
                        hasDescription={false}
                        isTotalHistory={isTotalHistory}
                        />


                </Modal>

            </ConfigProvider>


        </div>
    )
}
export default Bordereau; 