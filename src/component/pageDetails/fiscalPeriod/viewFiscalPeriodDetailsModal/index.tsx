import { Spin } from 'antd';
import { Button, Checkbox, Row, Col, Switch } from 'sanhab-components-library';
import ViewFiscalPeriodDetailsModalHook from './hook'

const ViewFiscalPeriodDetailsModal = (props: any) => {

    const viewFiscalPeriodDetailsModalHook = ViewFiscalPeriodDetailsModalHook(props);


    return (
        <div className="form_wrapper">

            {viewFiscalPeriodDetailsModalHook.isLoadingRecord ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <>
                        <Row>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد</p>
                                <h4><b>{viewFiscalPeriodDetailsModalHook.recordData.id}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">عنوان</p>
                                <h4><b>{viewFiscalPeriodDetailsModalHook.recordData.title}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">نوع دوره</p>
                                <h4><b>{viewFiscalPeriodDetailsModalHook.recordData.periodType}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">خسارت معوق/ذخیره ریاضی</p>
                                <Checkbox
                                    disabled
                                    checked={viewFiscalPeriodDetailsModalHook.recordData.pendingLoss}
                                ></Checkbox>

                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">نوع صورتحساب</p>
                                <h4><b>{viewFiscalPeriodDetailsModalHook.recordData.factureType}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">از تاریخ</p>
                                <h4><b>{viewFiscalPeriodDetailsModalHook.recordData.fromMonth}/{viewFiscalPeriodDetailsModalHook.recordData.fromDay}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">تا تاریخ</p>
                                <h4><b>{viewFiscalPeriodDetailsModalHook.recordData.toMonth}/{viewFiscalPeriodDetailsModalHook.recordData.toDay}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">فعال/غیرفعال</p>
                                <Switch
                                    disabled
                                    className="statusSwitch"
                                    checked={viewFiscalPeriodDetailsModalHook.recordData.isActive}
                                    checkedChildren="فعال"
                                    unCheckedChildren="غیرفعال" />
                            </Col>
                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>


                            {/* <Button

                                type="primary" ghost
                                onClick={() => viewFiscalPeriodDetailsModalHook.editFiscalPeriodHandler(viewFiscalPeriodDetailsModalHook.recordData.id)}
                            >ویرایش</Button> */}

                            <Button
                                className="m-l-8"
                                type="default" 
                                colorType="primary"
                                onClick={() => props.onCloseModal()}
                            >بستن</Button>
                            {/* <Popconfirm

                                placement="top"
                                visible={viewFiscalPeriodDetailsModalHook.visiblePopConfirmBox}
                                title="آیا از حذف رکورد اطمینان دارید؟"
                                onCancel={viewFiscalPeriodDetailsModalHook.handleCancelDelete}
                                onConfirm={() => viewFiscalPeriodDetailsModalHook.onConfirmDelete(viewFiscalPeriodDetailsModalHook.recordData.id)}
                                okText="بله"
                                cancelText="خیر"
                            >
                                <Button
                                    className="m-l-8"
                                    type="primary" danger ghost
                                    onClick={() => viewFiscalPeriodDetailsModalHook.showPopconfirm()}
                                >حذف</Button>
                            </Popconfirm> */}
                        </Row>
                    </>
                )
            }

        </div >
    );
}

export default ViewFiscalPeriodDetailsModal;