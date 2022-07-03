import { useState, useEffect, useContext } from 'react';
import fa_IR from "antd/lib/locale/fa_IR";
import classes from './cumulativesParticipatingOfInterests.module.css';
import CumulativesParticipatingOfInterestsTable from '../../pageDetails/cumulativesParticipatingOfInterests/cumulativesParticipatingOfInterestsTable/index'
import AddEditCumulativesParticipatingOfInterestsModal from '../../pageDetails/cumulativesParticipatingOfInterests/addEditCumulativesParticipatingOfInterestsModal/index'
import { Button, ConfigProvider, Modal, Collapse } from 'antd';
import CumulativesParticipatingApi from "../../../controler/services/cumulativesParticipatingOfInterests/apiRequest";
import {Notification, Icon} from 'sanhab-components-library'
import GetColumnSearchProps from '../../../controler/helper/ColumnFiltering'
import GlobalContext from '../../../controler/context/context';
import HistoryModal from '../../common/history/historyModal/index'
import HistoryContext from '../../common/history/context/context';

const { Panel } = Collapse;

const CumulativesParticipatingOfInterests = () => {

    const globalContext = useContext(GlobalContext)
    const historyContext = useContext(HistoryContext)

    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);

    const [cumulativeRegulationsList, setCumulativeRegulationsList] = useState<any[]>([]);

    const [isExcelLoading, setIsExcelLoading] = useState(false);

    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);

    const [isTotalHistory, setIsTotalHistory] = useState(false);

    const getALLCumulativeRegulationsRecords = (response:any) => {
		// CumulativesParticipatingApi.GetAllCumulativeRequlations().then((response) => {
            setCumulativeRegulationsList(response?.data?.Result);
		// })
    }
    
    useEffect(() => {
        globalContext.resetFilterValues()
        // getALLCumulativeRegulationsRecords();
    }, []);


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
        CumulativesParticipatingApi.DeleteCumulativesParticipating({id:id}).then((response:any)=>{
            if(response?.data?.IsSucceed){
                Notification.success({message: ' با موفقیت حذف شد'});
                setShouldReloadTable(!shouldReloadTable);
            }
        })

    };


    const onCloseAddEditMoadl = () => {
        setVisibleAddModal(false)
    }

    const getExcelReport = () => {
        setIsExcelLoading(true);
        CumulativesParticipatingApi.GetExcelReport()
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
        <div className={classes.cumulativesParticipating_wrapper}>
            <ConfigProvider direction="rtl" locale={fa_IR}>

                <Button className="buttonCreate"
                    type="primary"
                    onClick={createNewRecord}>
                    <span> افزودن  آیین نامه مشارکت منافع</span>
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


                <CumulativesParticipatingOfInterestsTable
                   
                    reloadTable={reloadTable} 

                    editRecordHandler={editRecordHandler}
                    deleteRecordHandler={deleteRecordHandler}
                    shouldReloadTable={shouldReloadTable}
                    cumulativeRegulationsList={cumulativeRegulationsList}

                    viewRecordHistory={viewRecordHistory}
                    getALLCumulativeRegulationsRecords={getALLCumulativeRegulationsRecords}
                />




                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    className="sanhab-modal"
                    visible={visibleAddModal}
                    title={addForm ? "افزودن   آیین نامه مشارکت منافع" : "ویرایش   آیین نامه مشارکت منافع"}
                    width={500}
                    onOk={() => setVisibleAddModal(false)}
                    onCancel={() => setVisibleAddModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <AddEditCumulativesParticipatingOfInterestsModal
                        recordId={selectedRecordId}
                        isUpdate={isUpdate}
                        onCloseModal={() => setVisibleAddModal(false)}
                        onCloseAddEditMoadl={onCloseAddEditMoadl}
                        reloadTable={reloadTable} 
                        cumulativeRegulationsList={cumulativeRegulationsList}/>


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
                        parent="cumulativesParticipatingOfInterests"
                        hasDescription={false}
                        isTotalHistory={isTotalHistory}
                        />


                </Modal>


            </ConfigProvider>


        </div>
    )
}
export default CumulativesParticipatingOfInterests; 