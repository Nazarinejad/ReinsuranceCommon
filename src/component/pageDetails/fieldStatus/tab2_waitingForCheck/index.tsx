import { useState, useEffect, useContext } from 'react';
import Tab2_Table from './tab2_waitingForCheckTable'
import FieldStatusApi from '../../../../controler/services/fieldStatus/apiRequest'
import { Notification } from 'sanhab-components-library'




import fa_IR from "antd/lib/locale/fa_IR";
import EqualizeModal from '../../../pageDetails/fieldStatus/tab2_waitingForCheck/tab2_equalizeModal'
import ViewDetailsModal from '../../../pageDetails/fieldStatus/viewDetailsModal'
import { ConfigProvider, Collapse } from 'antd';
import { Button, Modal, Icon } from 'sanhab-components-library';
import FieldStatusContext from "../../../pages/fieldStatus/context/context";

import GetColumnSearchProps from '../../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../../controler/context/context';

import HistoryModal from '../../../common/history/historyModal'
import HistoryContext from '../../../common/history/context/context';

const { Panel } = Collapse;




const Tab2_WaitingForCheck = () => {

    const globalContext = useContext(GlobalContext)
    const historyContext = useContext(HistoryContext)
    const context = useContext(FieldStatusContext);




    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);
    const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [selectedRecordCompanyId, setSelectedRecordCompanyId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);

    const [cumulativeList, setCumulativeList] = useState<any[]>([]);

    const [allFields, setAllFields] = useState<any[]>([]);

    const [isTotalHistory, setIsTotalHistory] = useState(false);

    useEffect(() => {
        globalContext.resetFilterValues()

        FieldStatusApi.GetAllFields().then((response) => {
            setAllFields(response?.data?.Result)
        })


    }, [])
    

    const editRecordHandler = (id: number, companyId: number) => {
        setSelectedRecordId(id);
        setSelectedRecordCompanyId(companyId);
        setVisibleAddModal(true);
        setAddForm(false);
        setIsUpdate(true);
    };

    const viewRecordHistory = (id: number) => {
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


    const deleteRecordHandler = (id: number) => {
        FieldStatusApi.Delete({ id: id }).then((response: any) => {
            if (response?.data?.IsSucceed) {
                Notification.success({
                    message: ' با موفقیت حذف شد.'
                })
                //setShouldReloadTable(!shouldReloadTable);
                context.onSetReloadTable()
            }
        })

    };


    const onCloseAddEditMoadl = () => {
        setVisibleAddModal(false)
    }

    const viewTotalHistory = () => {
        setIsTotalHistory(true)
        setVisibleHistoryModal(true);
    };

    return (
        <div>
            {/* className={classes.field_wrapper} */}
            <ConfigProvider direction="rtl" locale={fa_IR}>

                <>
                    <Button className="excelButton" onClick={context.getExcelReport}>
                        <Icon
                            iconType="file-excel"
                            toolTip="خروجی اکسل"
                            loading={context.isExcelLoading}

                        />
                    </Button>

                    <Button className="excelButton m-l-4" onClick={viewTotalHistory}>
                        <Icon

                            iconType="history"
                            toolTip="تاریخچه"
                        />
                    </Button>

                    <Collapse
                        className="filterBox lowerBox notBtnBox"
                        collapsible="header"
                        activeKey={globalContext.activeCollapsiblePanel}
                        onChange={globalContext.onChangeActiveCollapsiblePanel}>

                        <Panel

                            showArrow={false}
                            header={
                                <Button className="filterBoxButton" style={{top:'0 !important'}}>
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


                    <Tab2_Table

                        viewRecordHistory={viewRecordHistory}
                        editRecordHandler={editRecordHandler}
                        deleteRecordHandler={deleteRecordHandler}
                        viewRecordDetailsHandler={viewRecordDetailsHandler}
                        shouldReloadTable={shouldReloadTable}
                        reloadTable={reloadTable}

                    />


                    <Modal
                        maskClosable={false}
                        destroyOnClose={true}
                        visible={visibleAddModal}
                        className="sanhab-modal"
                        title={"معادلسازی"}
                        width={900}
                        onOk={() => setVisibleAddModal(false)}
                        onCancel={() => setVisibleAddModal(false)}
                        cancelButtonProps={{ style: { display: "none" } }}
                        okButtonProps={{ style: { display: "none" } }}
                    >
                        <EqualizeModal
                            id={selectedRecordId}
                            isUpdate={true}
                            onCloseModal={() => setVisibleAddModal(false)}
                            onCloseAddEditMoadl={onCloseAddEditMoadl}
                            reloadTable={reloadTable}
                            cumulativeList={cumulativeList}
                            allFields={allFields}
                            selectedRecordCompanyId={selectedRecordCompanyId} />



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
                        <ViewDetailsModal
                            id={selectedRecordId}
                            onCloseModal={() => setVisibleDetailsModal(false)}
                            editRecordHandler={editRecordHandler}
                            deleteRecordHandler={deleteRecordHandler}
                            cumulativeList={cumulativeList} />


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
                            parent="fieldStatus"
                            hasDescription={true}
                            isTotalHistory={isTotalHistory}
                        />


                    </Modal>
                </>
            </ConfigProvider>

        </div>
    )

}
export default Tab2_WaitingForCheck