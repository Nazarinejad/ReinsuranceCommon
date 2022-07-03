import { Button, Row, Col, Select } from 'sanhab-components-library';
import { Spin } from 'antd';
import ViewDetailsModalHook from './hook'
import { GetCommisionName } from '../../../../controler/helper/GetMandatoyPageNames'
import { GetCompanyNameForFieldStatus } from '../../../../controler/helper/GetCompanyNameForFieldStatus'
import commisionType from '../../../../controler/constant/CommisionType'
const { Option } = Select;

const ViewDetailsModal = (props: any) => {

    const viewDetailsModalHook = ViewDetailsModalHook(props);


    return (
        <div className="form_wrapper">

            {viewDetailsModalHook.isLoadingRecord ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <>
                        <Row>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد</p>
                                <h4><b>{viewDetailsModalHook.recordData.id}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">  شرکت </p>
                                <h4><b>{GetCompanyNameForFieldStatus(viewDetailsModalHook.recordData.companyId)}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">گروه رشته شرکت بیمه</p>
                                <h4><b>{viewDetailsModalHook.recordData.groupFieldOfInsuranceCompany}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">رشته شرکت بیمه</p>
                                <h4><b>{viewDetailsModalHook.recordData.fieldOfInsuranceCompany}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد شرکت رشته بیمه</p>
                                <h4><b>{viewDetailsModalHook.recordData.codeFieldOfInsuranceCompany}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">نوع کارمزد</p>
                                <h4><b>{GetCommisionName(viewDetailsModalHook.recordData.commissionType, commisionType)}</b></h4>
                            </Col>

                            <Col span={8} className="p-y-16">
                                <p className="text-light">گروه رشته</p>
                                <h4><b>{viewDetailsModalHook.recordData.fieldTitle}</b></h4>
                            </Col>

                            <Col span={8} className="p-y-16">
                                <p className="text-light"> کد زیر رشته</p>
                                <h4><b>{viewDetailsModalHook.recordData.subFieldCode}</b></h4>
                            </Col>

                            <Col span={8} className="p-y-16">
                                <p className="text-light">نام زیر رشته</p>
                                <h4><b>{viewDetailsModalHook.recordData.subFieldTitle}</b></h4>
                            </Col>

                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد حسابداری</p>
                                <h4><b>{viewDetailsModalHook.recordData.accountingCode}</b></h4>
                            </Col>

                            <Col span={8} className="p-y-16">
                                <p className="text-light">نرخ کارمزد</p>
                                <h4><b>{viewDetailsModalHook.recordData.commissionRate} %</b></h4>
                            </Col>

                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>

                            <Button
                                className="m-l-8"
                                type="default"
                                colorType="primary"
                                onClick={() => props.onCloseModal()}
                            >بستن</Button>
                        </Row>
                    </>
                )
            }

        </div >
    );
}

export default ViewDetailsModal;