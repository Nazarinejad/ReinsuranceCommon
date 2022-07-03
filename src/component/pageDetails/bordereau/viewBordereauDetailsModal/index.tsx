import { Spin } from 'antd';
import { Button, Checkbox, Row, Col } from 'sanhab-components-library';
import ViewBordereauDetailsModalHook from './hook'

const ViewBordereauDetailsModal = (props: any) => {

    const viewBordereauDetailsModalHook = ViewBordereauDetailsModalHook(props);


    return (
        <div className="form_wrapper">

            {viewBordereauDetailsModalHook.isLoadingRecord ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <>
                        <Row>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">کد</p>
                                <h4><b>{viewBordereauDetailsModalHook.recordData.id}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">عنوان بردرو</p>
                                <h4><b>{viewBordereauDetailsModalHook.recordData.title}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light"> کد حسابداری</p>
                                <h4><b>{viewBordereauDetailsModalHook.recordData.accountingCode}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">نوع بردرو</p>
                                <h4><b>{viewBordereauDetailsModalHook.recordData.isCredit ? "بستانکار" : "بدهکار"}</b></h4>
                            </Col>
                            <Col span={8} className="p-y-16">
                                <p className="text-light">محاسبه کارمزد</p>
                                <h4><b><Checkbox disabled checked={viewBordereauDetailsModalHook.recordData.hasCommission}></Checkbox></b></h4>
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

export default ViewBordereauDetailsModal;