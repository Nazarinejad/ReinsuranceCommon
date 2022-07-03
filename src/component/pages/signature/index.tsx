import { useState, useEffect, useContext } from 'react';
import fa_IR from "antd/lib/locale/fa_IR";
import classes from "./signature.module.css"
import SignatureTable from '../../pageDetails/signature/signatureTable'
import AddEditSignatureModal from '../../pageDetails/signature/addEditSignatureModal'
import UpdateSignatureImageModal from '../../pageDetails/signature/updateSignatureImageModal'
import AddEditSecondSignatureModal from '../../pageDetails/signature/addEditSecondSignatureModal'
import ViewImageModal from '../../pageDetails/signature/viewImageModal'
import { ConfigProvider, Collapse } from 'antd';
import { Button, Modal } from 'sanhab-components-library';
import SignatureApi from "../../../controler/services/signature/apiRequest";
import { Icon } from 'sanhab-components-library'
import GetColumnSearchProps from '../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../controler/context/context';

import HistoryModal from '../../common/history/historyModal'
import HistoryContext from '../../common/history/context/context';

const { Panel } = Collapse;

const Signature = () => {

    const globalContext = useContext(GlobalContext)
    const historyContext = useContext(HistoryContext)

    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleAddSecondModal, setVisibleAddSecondModal] = useState(false);
    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);
    const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
    const [visibleImageModal, setVisibleImageModal] = useState(false);
    const [visibleUpdateImageModal, setVisibleUpdateImageModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [addSecondForm, setAddSecondForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isUpdateSecond, setIsUpdateSecond] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);
    const [shouldReloadLevelOneTable, setShouldReloadLevelOneTable] = useState(false);
    const [expanded, setExpanded] = useState(0);
    const [isChild, setIsChild] = useState<boolean>(false);

    const [parentData, setParentData] = useState({
        parentId: 0,
        departmentId: 0
    });

    const [departmentList, setDepartmentList] = useState<any[]>([]);
    const [companyList, setCompanyList] = useState<any[]>([]);

    const [isExcelLoading, setIsExcelLoading] = useState(false);
    
    const [isTotalHistory, setIsTotalHistory] = useState(false);
    const [isParentHistory, setIsParentHistory] = useState<boolean>(false);

    useEffect(() => {
        globalContext.resetFilterValues()

        SignatureApi.GetAllDepartments().then((response) => {
            setDepartmentList(response?.data?.Result)
        })

        SignatureApi.GetAllCompanies().then((response) => {
            setCompanyList(response?.data?.Result)
        })

    }, [])

    const createNewRecord = () => {
        setVisibleAddModal(true);
        setAddForm(true);
        setIsUpdate(false);
    };

    const addSecondSignatureHandler = (parentId: number, departmentId: number) => {
        setVisibleAddSecondModal(true);
        setAddSecondForm(true);
        setIsUpdateSecond(false);
        setParentData({
            parentId,
            departmentId
        })
    };

    const editSecondSignatureHandler = (id: number, parentId: number, departmentId: number) => {
        setSelectedRecordId(id);
        setVisibleAddSecondModal(true);
        setAddSecondForm(false);
        setIsUpdateSecond(true);
        setParentData({
            parentId,
            departmentId
        })
    };

    const editRecordHandler = (id: number) => {
        setSelectedRecordId(id);
        setVisibleAddModal(true);
        setAddForm(false);
        setIsUpdate(true);
    };

    const updateSignatureImageHandler = (id: number, isChild: boolean) => {
        setSelectedRecordId(id);
        setIsChild(isChild);
        setVisibleUpdateImageModal(true);
    };

    const viewRecordHistory = (id: number) => {
        setIsParentHistory(false);
        setIsTotalHistory(false)
        setSelectedRecordId(id);
        setVisibleHistoryModal(true);
    };

    const viewRecordDetailsHandler = (id: number) => {
        setSelectedRecordId(id);
        setVisibleDetailsModal(true);
    };

    const showFullSizeImage = (id: number) => {
        setSelectedRecordId(id);
        setVisibleImageModal(true);
    };

    const reloadTable = () => {
        setShouldReloadTable(!shouldReloadTable)
    };

    const reloadLevelOneTable = () => {
        setShouldReloadLevelOneTable(!shouldReloadLevelOneTable)
    };

    const setEexpandedId = (id: number) => {
        setExpanded(id)
    };


    const onCloseAddEditMoadl = () => {
        setVisibleAddModal(false)
    }

    const onCloseAddEditSecondMoadl = () => {
        setVisibleAddSecondModal(false)
    }

    const onCloseUpdateSignatureImageMoadl = () => {
        setVisibleUpdateImageModal(false)
    }

    const getExcelReport = () => {
        setIsExcelLoading(true);
        SignatureApi.GetExcelReport()
            .finally(() =>
                setIsExcelLoading(false)
            )
    }

    const viewTotalHistory = () => {
        setIsParentHistory(true);
        setIsTotalHistory(true)
        setVisibleHistoryModal(true);
    };

    const viewInnerTableTotalHistory = () => {
        setIsParentHistory(false);
        setIsTotalHistory(true)
        setVisibleHistoryModal(true);
    };

    return (
        <div className={classes.signature_wrapper}>
            <ConfigProvider direction="rtl" locale={fa_IR}>

                <Button className="buttonCreate"
                    type="primary"
                    onClick={createNewRecord}>
                    <span> افزودن امضا کننده اول</span>
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


                <SignatureTable
                    viewRecordHistory={viewRecordHistory}
                    editRecordHandler={editRecordHandler}
                    viewRecordDetailsHandler={viewRecordDetailsHandler}
                    shouldReloadTable={shouldReloadTable}
                    reloadTable={reloadTable}

                    departmentList={departmentList}
                    companyList={companyList}

                    setEexpandedId={setEexpandedId}
                    shouldReloadLevelOneTable={shouldReloadLevelOneTable}
                    expanded={expanded}

                    updateSignatureImageHandler={updateSignatureImageHandler}
                    addSecondSignatureHandler={addSecondSignatureHandler}
                    editSecondSignatureHandler={editSecondSignatureHandler}
                    showFullSizeImage={showFullSizeImage}
                    viewInnerTableTotalHistory={viewInnerTableTotalHistory}

                />




                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleAddModal}
                    className="sanhab-modal"
                    title={addForm ? "افزودن امضا کننده اول   " : "ویرایش امضا کننده اول   "}
                    width={500}
                    onOk={() => setVisibleAddModal(false)}
                    onCancel={() => setVisibleAddModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <AddEditSignatureModal
                        signatureId={selectedRecordId}
                        isUpdate={isUpdate}
                        onCloseModal={() => setVisibleAddModal(false)}
                        onCloseAddEditMoadl={onCloseAddEditMoadl}
                        reloadTable={reloadTable}
                        departmentList={departmentList}

                        reloadLevelOneTable={reloadLevelOneTable}
                    />


                </Modal>


                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleAddSecondModal}
                    className="sanhab-modal"
                    title={addSecondForm ? "افزودن امضا کننده دوم   " : "ویرایش امضا کننده دوم   "}
                    width={500}
                    onOk={() => setVisibleAddSecondModal(false)}
                    onCancel={() => setVisibleAddSecondModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <AddEditSecondSignatureModal
                        signatureId={selectedRecordId}
                        isUpdate={isUpdateSecond}
                        onCloseModal={() => setVisibleAddSecondModal(false)}
                        onCloseAddEditSecondMoadl={onCloseAddEditSecondMoadl}
                        reloadTable={reloadTable}

                        companyList={companyList}
                        departmentList={departmentList}

                        reloadLevelOneTable={reloadLevelOneTable}
                        parentData={parentData}
                    />


                </Modal>


                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleUpdateImageModal}
                    className="sanhab-modal"
                    title={"ویرایش تصویر امضا"}
                    width={500}
                    onOk={() => setVisibleUpdateImageModal(false)}
                    onCancel={() => setVisibleUpdateImageModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <UpdateSignatureImageModal
                        isChild={isChild}
                        signatureId={selectedRecordId}
                        onCloseModal={() => setVisibleUpdateImageModal(false)}
                        onCloseUpdateSignatureImageMoadl={onCloseUpdateSignatureImageMoadl}
                        reloadTable={reloadTable}
                        reloadLevelOneTable={reloadLevelOneTable}
                    />


                </Modal>

                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleImageModal}
                    className="sanhab-modal"
                    title={"نمایش تصویر امضا"}
                    width={500}
                    onOk={() => setVisibleImageModal(false)}
                    onCancel={() => setVisibleImageModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <ViewImageModal
                        signatureId={selectedRecordId}
                    //onCloseModal={() => setVisibleImageModal(false)}
                    //onCloseUpdateSignatureImageMoadl={onCloseUpdateSignatureImageMoadl}
                    //reloadTable={reloadTable} 
                    />


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
                        parent="signature"
                        hasDescription={false}
                        isParentHistory={isParentHistory}
                        isTotalHistory={isTotalHistory}
                    />


                </Modal>

            </ConfigProvider>


        </div>
    )
}
export default Signature; 