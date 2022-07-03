import { Button, Form, Spin, Row, Col, Input, Select } from 'antd';
import EqualizeModalHook from './hook'


const { Option } = Select;

const EqualizeModal = (props: any) => {

    const equalizeModalHook = EqualizeModalHook(props);

    return (
        <div className="form_wrapper">

            {equalizeModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form form={equalizeModalHook.form} onFinish={equalizeModalHook.onFinish} >
                        <Form.Item hidden={true}
                            name="id">
                            <Input />
                        </Form.Item>

                        <Row gutter={[24, 8]}>
                            <Col span={12}>
                                <Form.Item

                                    label="گروه رشته شرکت بیمه"
                                    name="groupFieldOfInsuranceCompany"
                                    rules={[{
                                        required: true,
                                        message: 'لطفا   گروه رشته شرکت بیمه را وارد نمایید.'
                                    }]}
                                >

                                    <Input disabled />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label=" رشته شرکت بیمه"
                                    name="fieldOfInsuranceCompany"
                                    rules={[{
                                        required: true,
                                        message: 'لطفا    رشته شرکت بیمه را وارد نمایید.'
                                    }]}
                                >

                                    <Input disabled />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="گروه رشته بیمه مرکزی" name="fieldId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا گروه رشته بیمه مرکزی را انتخاب نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        onChange={equalizeModalHook.onChangeFieldSingle}
                                        placeholder="انتخاب گروه رشته بیمه مرکزی ">
                                        {equalizeModalHook.fieldListByCompanyId?.map((field: any) => {
                                            return (
                                                <Option key={field.FieldId} value={field?.FieldId}>
                                                    {field?.Title}
                                                </Option>
                                            );
                                        })}
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="زیر رشته بیمه مرکزی" name="subFieldId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا   زیر رشته بیمه مرکزی را انتخاب نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب   زیر رشته بیمه مرکزی ">

                                        {equalizeModalHook.subFieldsByFieldGroupIds?.map((subField: any) => {
                                            return (
                                                <Option key={subField.Id} value={subField?.Id}>
                                                    {subField?.SubFieldTitle}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={equalizeModalHook.isLoadingSubmitBtn}>
                                ذخیره
                        </Button>
                        </Row>

                    </Form >
                )
            }

        </div >
    );
}

export default EqualizeModal;