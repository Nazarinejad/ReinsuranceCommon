import { Spin } from 'antd';
import BordereauModalHook from './hook'
import { Button, Form, Row, Col, Input, Checkbox } from "sanhab-components-library";


const AddEditBordereauModal = (props: any) => {

    const bordereauModalHook = BordereauModalHook(props);


    return (
        <div className="form_wrapper">
            {bordereauModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form
                        form={bordereauModalHook.form}
                        onFinish={bordereauModalHook.onFinish}
                    >
                        <Form.Item hidden={true}
                            name="id">
                            <Input />
                        </Form.Item>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="عنوان بردرو"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "لطفا عنوان بردرو را وارد نمایید",
                                        },
                                    ]}
                                >
                                    <Input
                                        name="Title" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="کد حسابداری"
                                    name="accountingCode"
                                    rules={[{
                                        required: true,
                                        pattern: /^[0-9]*$/,
                                        message: 'کد حسابداری صحیح نیست.'
                                    }]}
                                >

                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="آیا بستانکار است؟" name="IsCredit">
                                    <Checkbox
                                        onChange={(val: any) => bordereauModalHook.onChangeIsCreditCheckbox(val)}
                                        checked={bordereauModalHook.isCredit}
                                    ></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="محاسبه کارمزد" name="hasCommision">
                                    <Checkbox
                                        onChange={(val: any) => bordereauModalHook.onChangeHasCommisionCheckbox(val)}
                                        checked={bordereauModalHook.hasCommision}
                                    ></Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={bordereauModalHook.isLoadingSubmitBtn}>
                                ذخیره
                            </Button>
                        </Row>

                    </Form >

                )
            }

        </div >
    );
}

export default AddEditBordereauModal;