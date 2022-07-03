import { useState, useEffect } from 'react';
import fa_IR from "antd/lib/locale/fa_IR";
import classes from './field.module.css';
import FieldTable from '../../pageDetails/field/fieldTable'
import AddEditFieldModal from '../../pageDetails/field/addEditFieldModal'
import ViewFieldDetailsModal from '../../pageDetails/field/viewFieldDetailsModal'
import ViewFieldHistoryModal from '../../pageDetails/field/viewFieldHistoryModal'
import { ConfigProvider } from 'antd';
import { Button, Modal } from 'sanhab-components-library';
import FieldApi from "../../../controler/services/field/apiRequest";
import {Notification} from 'sanhab-components-library'

const Field = () => {
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [dateFilterObj, setDateFilterObj] = useState<any[]>([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [shoudSearchAgain, setShoudSearchAgain] = useState(false);
    const [shoudFilterDateAgain, setShoudFilterDateAgain] = useState(false);
    const [isTableLoadingFilter, setIsTableLoadingFilter] = useState(false);
    const [hasFilter, setHasFilter] = useState(false);
    const [isDateFilter, setIsDateFilter] = useState(false);



    const [visibleAddModal, setVisibleAddModal] = useState(false);
    const [visibleHistoryModal, setVisibleHistoryModal] = useState(false);
    const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(0);
    const [shouldReloadTable, setShouldReloadTable] = useState(false);

    const [cumulativeList, setCumulativeList] = useState<any[]>([]);

    //GetAllCompanies

    useEffect(() => {
        FieldApi.GetAllCumulativesParticipating().then((response)=>{
            setCumulativeList(response?.data?.Result)
        })

    }, [])
    const onChangeFilterData = (data: any) => {
        setFilteredData(data);
        setHasFilter(true);
        setIsFiltered(true);
        setShoudSearchAgain(!shoudSearchAgain);
        setIsDateFilter(false);
    }

    const onFilterDate = (data: any) => {
        setIsFiltered(false);
        setHasFilter(false);
        setDateFilterObj(data);
        setIsDateFilter(true)
        setShoudFilterDateAgain(!shoudFilterDateAgain);
    }

    const removeFilters = () => {
        setIsFiltered(false);
        setHasFilter(false);
        setShoudSearchAgain(!shoudSearchAgain);
    }

    const onLoadingFiltered = (isLoading: any) => {
        setIsTableLoadingFilter(isLoading);
    }



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
        FieldApi.DeleteField({id:id}).then((response:any)=>{
            if(response?.data?.IsSucceed){
                Notification.success({message: ' با موفقیت حذف شد'});
                setShouldReloadTable(!shouldReloadTable);
            }
        })

    };


    const onCloseAddEditMoadl = () => {
        setVisibleAddModal(false)
    }
    

    return (
        <div className={classes.field_wrapper}>
            <ConfigProvider direction="rtl" locale={fa_IR}>

                <Button className="buttonCreate"
                    type="primary"
                    onClick={createNewRecord}>
                    <span> افزودن  رشته</span>
                </Button>

                {/* <Filter onFilterDate={onFilterDate} removeFilters={removeFilters} onLoadingFiltered={onLoadingFiltered} onChangeFilterData={onChangeFilterData} /> */}
                <FieldTable
                    hasFilter={hasFilter}
                    isTableLoadingFilter={isTableLoadingFilter}
                    filteringData={filteredData}
                    isFiltered={isFiltered}
                    shoudSearchAgain={shoudSearchAgain}
                    isDateFilter={isDateFilter}
                    dateFilterObj={dateFilterObj}
                    shoudFilterDateAgain={shoudFilterDateAgain}

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
                    title={addForm ? "افزودن   رشته" : "ویرایش   رشته"}
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
                        cumulativeList={cumulativeList}/>

                    {/* onNeedReload={toggleReloadState} */}

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
                        cumulativeList={cumulativeList}/>
                        

                </Modal>
               
               
                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    visible={visibleHistoryModal}
                    className="sanhab-modal"
                    title={"تاریخچه رشته"}
                    width={800}
                    onOk={() => setVisibleHistoryModal(false)}
                    onCancel={() => setVisibleHistoryModal(false)}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <ViewFieldHistoryModal
                        fieldId={selectedRecordId}
                        onCloseModal={() => setVisibleHistoryModal(false)}/>

                </Modal>

            </ConfigProvider>


        </div>
    )
}
export default Field; 