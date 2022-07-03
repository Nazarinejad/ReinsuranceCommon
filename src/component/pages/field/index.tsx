import { useState, useEffect, useContext } from 'react';
import classes from './field.module.css';
import FieldTable from '../../pageDetails/field/fieldTable'
import AddEditFieldModal from '../../pageDetails/field/addEditFieldModal'
import ViewFieldDetailsModal from '../../pageDetails/field/viewFieldDetailsModal'
import { Collapse } from 'antd';
import { Button, Modal } from 'sanhab-components-library';
import FieldApi from "../../../controler/services/field/apiRequest";
import { Notification, Icon } from 'sanhab-components-library'
import GetColumnSearchProps from '../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../controler/context/context';
import HistoryModal from '../../common/history/historyModal'
import HistoryContext from '../../common/history/context/context';

const { Panel } = Collapse;

const Field = () => {
    const globalContext = useContext(GlobalContext)
    const historyContext = useContext(HistoryContext)

    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);
    const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);
    const [shouldReloadLevelOneTable, setShouldReloadLevelOneTable] = useState(false);
    const [expanded, setExpanded] = useState(0);

    const [cumulativeList, setCumulativeList] = useState<any[]>([]);
    const [departmentList, setDepartmentList] = useState<any[]>([]);

    const [isExcelLoading, setIsExcelLoading] = useState(false);

    const [isTotalHistory, setIsTotalHistory] = useState(false);
    const [isParentHistory, setIsParentHistory] = useState<boolean>(false);
    //GetAllCompanies

    useEffect(() => {
        globalContext.resetFilterValues()

        FieldApi.GetAllCumulativesParticipating().then((response) => {
            setCumulativeList(response?.data?.Result)
        })

        FieldApi.GetAllDepartments().then((response) => {
            setDepartmentList(response?.data?.Result)
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

    const reloadTable = () => {
        setShouldReloadTable(!shouldReloadTable)
    };

    const reloadLevelOneTable = () => {
        setShouldReloadLevelOneTable(!shouldReloadLevelOneTable)
    };

    const setEexpandedId = (id: number) => {
        setExpanded(id)
    };


    const deleteRecordHandler = (id: number) => {
        FieldApi.DeleteField({ id: id }).then((response: any) => {
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
        FieldApi.GetExcelReport()
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
        <div className={classes.field_wrapper}>
            <Button className="buttonCreate"
                type="primary"
                onClick={createNewRecord}>
                <span> افزودن  رشته</span>
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
            <FieldTable

                viewRecordHistory={viewRecordHistory}
                editRecordHandler={editRecordHandler}
                deleteRecordHandler={deleteRecordHandler}
                viewRecordDetailsHandler={viewRecordDetailsHandler}
                shouldReloadTable={shouldReloadTable}
                reloadTable={reloadTable}

                cumulativeList={cumulativeList}

                setEexpandedId={setEexpandedId}
                shouldReloadLevelOneTable={shouldReloadLevelOneTable}
                expanded={expanded}
                departmentList={departmentList}

                viewInnerTableTotalHistory={viewInnerTableTotalHistory}

            />
            <Modal
                maskClosable={false}
                destroyOnClose={true}
                visible={visibleAddModal}
                className="sanhab-modal"
                title={addForm ? "افزودن   " : "ویرایش   "}
                width={900}
                onOk={() => setVisibleAddModal(false)}
                onCancel={() => setVisibleAddModal(false)}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
            >
                <AddEditFieldModal
                    fieldId={selectedRecordId}
                    isUpdate={isUpdate}
                    onCloseModal={() => setVisibleAddModal(false)}
                    onCloseAddEditMoadl={onCloseAddEditMoadl}
                    reloadTable={reloadTable}
                    cumulativeList={cumulativeList}
                    departmentList={departmentList}
                    reloadLevelOneTable={reloadLevelOneTable}
                />
            </Modal>

            <Modal
                maskClosable={false}
                destroyOnClose={true}
                visible={visibleDetailsModal}
                className="sanhab-modal"
                title={"جزییات   رشته"}
                width={800}
                onOk={() => setVisibleDetailsModal(false)}
                onCancel={() => setVisibleDetailsModal(false)}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
            >
                <ViewFieldDetailsModal
                    fieldId={selectedRecordId}
                    onCloseModal={() => setVisibleDetailsModal(false)}
                    editRecordHandler={editRecordHandler}
                    deleteRecordHandler={deleteRecordHandler}
                    cumulativeList={cumulativeList}
                    departmentList={departmentList} />

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
                    parent="field"
                    hasDescription={false}
                    isParentHistory={isParentHistory}
                    isTotalHistory={isTotalHistory}
                />
            </Modal>
        </div>
    )
}
export default Field; 