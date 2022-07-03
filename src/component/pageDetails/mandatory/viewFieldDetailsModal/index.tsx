import { Spin } from 'antd'; 
import { Button, Checkbox, Row, Col, Switch, Select } from 'sanhab-components-library';
import ViewFieldDetailsModalHook from './hook'
import { GetSingleCumulativeParticipatingName } from '../../../../controler/helper/GetCumulativeParticipatingNames'
const { Option } = Select;

const ViewFieldDetailsModal = (props: any) => {

    const viewFieldDetailsModalHook = ViewFieldDetailsModalHook(props);


    return (
        <div className="form_wrapper">

            {viewFieldDetailsModalHook.isLoadingRecord ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <>
                        <Row>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد</p>
                                <h4><b>{viewFieldDetailsModalHook.recordData.id}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">گروه رشته</p>
                                <h4><b>{viewFieldDetailsModalHook.recordData.fieldGroup}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد زیر رشته</p>
                                <h4><b>{viewFieldDetailsModalHook.recordData.subFieldCode}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">نام زیر رشته</p>
                                <h4><b>{viewFieldDetailsModalHook.recordData.subFieldTitle}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد حسابداری</p>
                                <h4><b>{viewFieldDetailsModalHook.recordData.accountingCode}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">گروه مشارکت منافع</p>
                                <h4><b>{GetSingleCumulativeParticipatingName(props.cumulativeList, viewFieldDetailsModalHook.recordData.cumulativeParticipatingOfInterests)}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">عدم محاسبه ذخیره</p>
                                <Checkbox
                                    checked={viewFieldDetailsModalHook.recordData.failureToCalculateReserves}
                                ></Checkbox>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">بدون ضریب خسارت</p>
                                <Checkbox
                                    checked={viewFieldDetailsModalHook.recordData.noLossRatio}
                                ></Checkbox>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">پوششی</p>
                                <Checkbox
                                    checked={viewFieldDetailsModalHook.recordData.isCovrage}
                                ></Checkbox>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">پوششی محاسباتی</p>
                                <Checkbox
                                    checked={viewFieldDetailsModalHook.recordData.isCalculatedCovrage}
                                ></Checkbox>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">توضیحات</p>
                                <h4><b>{viewFieldDetailsModalHook.recordData.description}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">فعال/غیرفعال</p>
                                <Switch
                                    className="statusSwitch"
                                    checked={viewFieldDetailsModalHook.recordData.isActive}
                                    checkedChildren="فعال"
                                    unCheckedChildren="غیرفعال" />
                            </Col>
                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>


                            {/* <Button

                                type="primary" ghost
                                onClick={() => viewFieldDetailsModalHook.editFieldHandler(viewFieldDetailsModalHook.recordData.id)}
                            >ویرایش</Button> */}

                            <Button
                                className="m-l-8"
                                type="default"
                                colorType="primary"
                                onClick={() => props.onCloseModal()}
                            >بستن</Button>
                            {/* <Popconfirm

                                placement="top"
                                visible={viewFieldDetailsModalHook.visiblePopConfirmBox}
                                title="آیا از حذف رکورد اطمینان دارید؟"
                                onCancel={viewFieldDetailsModalHook.handleCancelDelete}
                                onConfirm={() => viewFieldDetailsModalHook.onConfirmDelete(viewFieldDetailsModalHook.recordData.id)}
                                okText="بله"
                                cancelText="خیر"
                            >
                                <Button
                                    className="m-l-8"
                                    type="primary" danger ghost
                                    onClick={() => viewFieldDetailsModalHook.showPopconfirm()}
                                >حذف</Button>
                            </Popconfirm> */}
                        </Row>
                    </>
                )
            }

        </div >
    );
}

export default ViewFieldDetailsModal;