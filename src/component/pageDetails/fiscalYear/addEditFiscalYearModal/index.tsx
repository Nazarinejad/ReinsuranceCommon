import { Spin } from 'antd';
import FiscalYearModalHook from './hook'
import { DatePicker, Button, Form, Row, Col, Input, Switch} from "sanhab-components-library";


const AddEditFiscalYearModal = (props: any) => {

    const fiscalYearModalHook = FiscalYearModalHook(props);


    return (
        <div className="form_wrapper">
            {fiscalYearModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form
                        form={fiscalYearModalHook.form}
                        onFinish={fiscalYearModalHook.onFinish}
                    >
                        <Form.Item hidden={true}
                            name="id">
                            <Input />
                        </Form.Item>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="عنوان"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "لطفا عنوان را وارد نمایید",
                                        },
                                        {
                                            pattern: /^[0-9]*$/,
                                            message: "عنوان فقط میتواند عدد باشد",
                                        },
                                    ]}
                                >
                                    <Input
                                    disabled={props.isUpdate? true : false}
                                    name="Title" />
                                    {/* value={userInfo.person.lastName} */}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="beginDate"
                                    label="از تاریخ" >
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24} >
                                <Form.Item name="endDate" label="تا تاریخ" >
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} >
                                <Form.Item name="isActive" label="فعال/غیرفعال">
                                    <Switch
                                        className="statusSwitch"
                                        checked={fiscalYearModalHook.isActive}
                                        onChange={(val: any) => fiscalYearModalHook.onChangeIsActiveSwitch(val)}
                                        checkedChildren="فعال"
                                        unCheckedChildren="غیرفعال" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={fiscalYearModalHook.isLoadingSubmitBtn}>
                                ذخیره
                </Button>
                        </Row>

                    </Form >

                )
            }

        </div >
    );
}

export default AddEditFiscalYearModal;