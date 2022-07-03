import { Button, ConfigProvider, Checkbox, Spin, Row, Col, Switch, Select, Popconfirm } from 'antd';
import ViewMandatoryDetailsModalHook from './hook'
import { GetSingleCumulativeParticipatingName } from '../../../../controler/helper/GetCumulativeParticipatingNames'
import { GetCompanyName } from '../../../../controler/helper/GetMandatoyPageNames'
import { GetFiscalYearName } from '../../../../controler/helper/GetMandatoyPageNames'
import { GetFieldsName } from '../../../../controler/helper/GetMandatoyPageNames'
import { GetSubFieldsName } from '../../../../controler/helper/GetMandatoyPageNames'
import { GetCommisionName } from '../../../../controler/helper/GetMandatoyPageNames'
import commisionType from '../../../../controler/constant/CommisionType'
const { Option } = Select;

const ViewMandatoryHistoryModal = (props: any) => {

    const viewMandatoryDetailsModalHook = ViewMandatoryDetailsModalHook(props);

console.log("props.allSubFields", props.allSubFields)
    return (
        <div className="form_wrapper">

            {viewMandatoryDetailsModalHook.isLoadingRecord ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <>
                        <Row>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.id}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">شرکت</p>
                                <h4><b>{GetCompanyName(viewMandatoryDetailsModalHook.recordData.companyId, props.allCompanies)}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">سال مالی</p>
                                <h4><b>{GetFiscalYearName(viewMandatoryDetailsModalHook.recordData.fiscalyearId, props.allFiscalYears)}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">گروه رشته</p>
                                <h4><b>{GetFieldsName(viewMandatoryDetailsModalHook.recordData.fieldId, props.allFields)}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">زیر رشته</p>
                                <h4><b>{GetSubFieldsName(viewMandatoryDetailsModalHook.recordData.subFieldId, props.allSubFields)}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد زیر رشته</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.subFieldCode}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">درصد سهم صندوق</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.percentageOfFundShare} %</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">نرخ کارمزد</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.commissionRate}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">درصد سهم اتکایی</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.percentageOfRelianceShare} %</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">درصد ارزش افزوده</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.vat} %</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">درصد ذخیره </p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.percentageOfSave} %</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">مالیات</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.tax} </b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">عوارض</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.toll}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">درصد هزینه تحصیل</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.percentageOfTuitionFees} %</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">درصد هزینه بهداشت</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.percentageOfHealthFees} %</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">درصد جریمه دیرکرد</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.percentageOfPenaltyForLate} %</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">ضریب افزایش حق بیمه در ذخایر</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.premiumIncreaseCoefficientInReserves}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">ضریب افزایش حق بیمه در ضریب خسارت</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.premiumIncreaseCoefficientInLossRatio}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">نوع کارمزد</p>
                                <h4><b>{GetCommisionName(viewMandatoryDetailsModalHook.recordData.commissionType, commisionType)}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">آیین نامه ای</p>
                                <h4><b><Checkbox disabled checked={viewMandatoryDetailsModalHook.recordData.isRegulation}></Checkbox></b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">تاریخ موثر از</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.effectiveDateFrom}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">تاریخ موثر تا</p>
                                <h4><b>{viewMandatoryDetailsModalHook.recordData.effectiveDateTo}</b></h4>
                            </Col>
                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>


                            {/* <Button

                                type="primary" ghost
                                onClick={() => viewMandatoryDetailsModalHook.editMandatoryHandler(viewMandatoryDetailsModalHook.recordData.id)}
                            >ویرایش</Button> */}

                            <Button
                                className="m-l-8"
                                type="primary" ghost
                                onClick={() => props.onCloseModal()}
                            >بستن</Button>
                            {/* <Popconfirm

                                placement="top"
                                visible={viewMandatoryDetailsModalHook.visiblePopConfirmBox}
                                title="آیا از حذف رکورد اطمینان دارید؟"
                                onCancel={viewMandatoryDetailsModalHook.handleCancelDelete}
                                onConfirm={() => viewMandatoryDetailsModalHook.onConfirmDelete(viewMandatoryDetailsModalHook.recordData.id)}
                                okText="بله"
                                cancelText="خیر"
                            >
                                <Button
                                    className="m-l-8"
                                    type="primary" danger ghost
                                    onClick={() => viewMandatoryDetailsModalHook.showPopconfirm()}
                                >حذف</Button>
                            </Popconfirm> */}
                        </Row>
                    </>
                )
            }

        </div >
    );
}

export default ViewMandatoryHistoryModal;