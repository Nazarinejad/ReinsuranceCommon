import { useState, useEffect, useContext } from 'react';
import fa_IR from "antd/lib/locale/fa_IR";
import classes from './mandatory.module.css';
import MandatoryTable from '../../pageDetails/mandatory/mandatoryTable'
import AddEditMandatoryModal from '../../pageDetails/mandatory/addEditMandatoryModal'
import ViewMandatoryDetailsModal from '../../pageDetails/mandatory/viewMandatoryDetailsModal'
import CopyMandatoryModal from '../../pageDetails/mandatory/copyMandatoryModal'
import { ConfigProvider, Collapse } from 'antd';
import { Button, Modal, Icon } from 'sanhab-components-library';
import MandatoryApi from "../../../controler/services/mandatory/apiRequest";
import GetColumnSearchProps from '../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../controler/context/context';
import HistoryModal from '../../common/history/historyModal'
import HistoryContext from '../../common/history/context/context';

const { Panel } = Collapse;

const Mandatory = () => {

    const globalContext = useContext(GlobalContext)
    const historyContext = useContext(HistoryContext)

    const [companyIdToReloadTable, setCompanyIdToReloadTable] = useState(0);
    const [fiscalYearToReloadTable, setFiscalYearToReloadTable] = useState(0);
    const [shouldReloadLevelOneTable, setShouldReloadLevelOneTable] = useState(false);
    const [shouldReloadLevelTwoTable, setShouldReloadLevelTwoTable] = useState(false);
    const [shouldCloseAllExpandedTables, setShouldCloseAllExpandedTables] = useState(false);


    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);
    const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
    const [visibleCopyModal, setVisibleCopyModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);
    const [parentId, setParentId] = useState(0);
    const [isParentHistory, setIsParentHistory] = useState<boolean>(false);

    const [allCompanies, setAllCompanies] = useState<any[]>([]);
    const [allFiscalYears, setAllFiscalYears] = useState<any[]>([]);
    const [allFields, setAllFields] = useState<any[]>([]);
    const [allSubFields, setAllSubFields] = useState<any[]>([]);
    const [copyModalData, setCopyModalData] = useState({
        parentId: 0,
        companyId: 0,
        response: {}
    });
    const [idListToViewDetails, setIdListToViewDetails] = useState({
        subfieldId: 0,
        companyId: 0,
        mainParentId: 0
    });

    const [isExcelLoading, setIsExcelLoading] = useState(false);

    const [isTotalHistory, setIsTotalHistory] = useState(false);

    //GetAllCompanies

    useEffect(() => {

        globalContext.resetFilterValues()

        MandatoryApi.GetAllCompanies().then((response) => {
            setAllCompanies(response?.data?.Result)
        })

        MandatoryApi.GetAllFiscalYears().then((response) => {
            setAllFiscalYears(response?.data?.Result)
        })

        MandatoryApi.GetAllFields().then((response) => {
            setAllFields(response?.data?.Result)
        })

        MandatoryApi.GetAllSubFields().then((response) => {
            setAllSubFields(response?.data?.Result)
        })

    }, [])


    const createNewRecord = () => {
        setVisibleAddModal(true);
        setAddForm(true);
        setIsUpdate(false);
    };

    const editRecordHandler = (idList: {
        subfieldId: number
        companyId: number
        mainParentId: number
    }) => {
        setSelectedRecordId(idList.subfieldId);
        setIdListToViewDetails(idList)
        setVisibleAddModal(true);
        setAddForm(false);
        setIsUpdate(true);
    };

    const viewRecordHistory = (id: number) => {
        setIsTotalHistory(false)
        setIsParentHistory(true);
        setSelectedRecordId(id);
        setVisibleHistoryModal(true);
    };

    const viewRecordLvlTwoHistory = (id: number, parentId: number) => {
        setIsTotalHistory(false)
        setIsParentHistory(false);
        setSelectedRecordId(id);
        setParentId(parentId)
        setVisibleHistoryModal(true);
    };

    const viewRecordDetailsHandler = (idList: {
        subfieldId: number
        companyId: number
        mainParentId: number
    }) => {
        setSelectedRecordId(idList.subfieldId);
        setIdListToViewDetails(idList)
        setVisibleDetailsModal(true);
    };

    const reloadTable = () => {
        setShouldReloadTable(!shouldReloadTable)
    };



    const onCloseAddEditMoadl = () => {
        setVisibleAddModal(false)
    }

    const onCloseCopyModal = () => {
        setVisibleCopyModal(false)
    }

    const openCopyModal = (parentId: number, companyId: number, response: any) => {
        setCopyModalData({
            parentId,
            companyId,
            response
        })
        setVisibleCopyModal(true)
    }

    const reloadLevelOneTable = (companyId: number) => {
        setCompanyIdToReloadTable(companyId)
        setShouldReloadLevelOneTable(!shouldReloadLevelOneTable);
    }

    const reloadLevelTwoTable = (companyId: number, fiscalYearId: number) => {
        setCompanyIdToReloadTable(companyId)
        setFiscalYearToReloadTable(fiscalYearId)
        setShouldReloadLevelTwoTable(!shouldReloadLevelTwoTable);
    }

    const closeAllExpandedTables = () => {
        setShouldCloseAllExpandedTables(!shouldCloseAllExpandedTables)
    }

    const getExcelReport = () => {
        setIsExcelLoading(true);
        MandatoryApi.GetExcelReport()
            .finally(() =>
                setIsExcelLoading(false)
            )
    }

    const viewTotalHistory = () => {
        setIsTotalHistory(true)
        setIsParentHistory(true);
        setVisibleHistoryModal(true);
        
    };
    
    const viewInnerTableTotalHistory = () => {
        setIsTotalHistory(true)
        setIsParentHistory(false);
        setParentId(parentId)
        setVisibleHistoryModal(true);
    };


    return (
        <div className={classes.mandatory_wrapper}>
            <ConfigProvider direction="rtl" locale={fa_IR}>
                <Button className="buttonCreate"
                    type="primary"
                    onClick={createNewRecord}>
                    <span> افزودن  </span>
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

                <MandatoryTable

                    viewRecordHistory={viewRecordHistory}
                    editRecordHandler={editRecordHandler}
                    //deleteRecordHandler={deleteRecordHandler}
                    viewRecordDetailsHandler={viewRecordDetailsHandler}
                    shouldReloadTable={shouldReloadTable}
                    reloadTable={reloadTable}
                    openCopyModal={openCopyModal}

                    allCompanies={allCompanies}
                    allFiscalYears={allFiscalYears}
                    allFields={allFields}
                    allSubFields={allSubFields}

                    companyIdToReloadTable={companyIdToReloadTable}
                    fiscalYearToReloadTable={fiscalYearToReloadTable}
                    shouldReloadLevelOneTable={shouldReloadLevelOneTable}
                    shouldReloadLevelTwoTable={shouldReloadLevelTwoTable}
                    shouldCloseAllExpandedTables={shouldCloseAllExpandedTables}

                    viewRecordLvlTwoHistory={viewRecordLvlTwoHistory}
                    viewInnerTableTotalHistory={viewInnerTableTotalHistory}

                />




                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleAddModal}
                    className="sanhab-modal"
                    title={addForm ? "افزودن   " : "ویرایش   "}
                    width={1200}
                    onOk={() => setVisibleAddModal(false)}
                    onCancel={() => setVisibleAddModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <AddEditMandatoryModal
                        mandatoryId={selectedRecordId}
                        isUpdate={isUpdate}
                        onCloseModal={() => setVisibleAddModal(false)}
                        onCloseAddEditMoadl={onCloseAddEditMoadl}
                        reloadTable={reloadTable}

                        allCompanies={allCompanies}
                        allFiscalYears={allFiscalYears}
                        allFields={allFields}

                        idListToViewDetails={idListToViewDetails}

                        reloadLevelOneTable={reloadLevelOneTable}
                        reloadLevelTwoTable={reloadLevelTwoTable}
                        closeAllExpandedTables={closeAllExpandedTables} />

                </Modal>

                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleCopyModal}
                    className="sanhab-modal"
                    title={"ایجاد"}
                    width={500}
                    onOk={() => setVisibleCopyModal(false)}
                    onCancel={() => setVisibleCopyModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <CopyMandatoryModal
                        copyModalData={copyModalData}
                        reloadLevelOneTable={reloadLevelOneTable}
                        onCloseCopyModal={onCloseCopyModal}
                        allFiscalYears={allFiscalYears}
                    />
                </Modal>

                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleDetailsModal}
                    className="sanhab-modal"
                    title={"جزییات   "}
                    width={800}
                    onOk={() => setVisibleDetailsModal(false)}
                    onCancel={() => setVisibleDetailsModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <ViewMandatoryDetailsModal
                        idListToViewDetails={idListToViewDetails}
                        mandatoryId={selectedRecordId}
                        onCloseModal={() => setVisibleDetailsModal(false)}
                        editRecordHandler={editRecordHandler}
                        allCompanies={allCompanies}
                        allFiscalYears={allFiscalYears}
                        allFields={allFields}
                        allSubFields={allSubFields} 
                        />

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
                        parent="mandatory"
                        hasDescription={false}
                        isParentHistory={isParentHistory}
                        isTotalHistory={isTotalHistory}
                    />


                </Modal>
            </ConfigProvider>


        </div>
    )
}
export default Mandatory; 