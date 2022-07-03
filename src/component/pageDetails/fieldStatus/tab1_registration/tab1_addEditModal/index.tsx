import { useContext } from 'react'
import { Button, Form, Spin, Row, Col, Input, Select } from 'antd';
import AddEditModalHook from './hook'
import FieldStatusContext from "../../../../pages/fieldStatus/context/context";

const { Option } = Select;

const AddEditModal = (props: any) => {

    const context = useContext(FieldStatusContext)

    const addEditModalHook = AddEditModalHook(props);

    return (
        <div className="form_wrapper">

            {addEditModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form form={addEditModalHook.form} onFinish={addEditModalHook.onFinish} >
                        <Form.Item hidden={true}
                            name="id">
                            <Input />
                        </Form.Item>

                        <Row gutter={[24, 8]}>
                            <Col span={12} >
                                <Form.Item name="companyId" label="شرکت" rules={[{ required: true, message: "شرکت را انتخاب کنید" }]}>
                                    <Select
                                        disabled={props.isUpdate}
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب شرکت"
                                    >
                                        {context.companies?.map((company: any) => <Option key={company.Id} value={company.Id}>{company.Title}</Option>)}

                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="گروه رشته شرکت بیمه"
                                    name="groupFieldOfInsuranceCompany"
                                    rules={[{
                                        required: true,
                                        message: 'لطفا   گروه رشته شرکت بیمه را وارد نمایید.'
                                    }]}
                                >

                                    <Input />
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

                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label=" کد شرکت رشته بیمه"
                                    name="codeFieldOfInsuranceCompany"
                                    rules={[{
                                        required: true,
                                        message: 'لطفا    کد شرکت رشته بیمه را وارد نمایید.'
                                    }]}
                                >

                                    <Input />
                                </Form.Item>
                            </Col>

                            {/* <Col span={12}>
                                <Form.Item label="گروه رشته بیمه مرکزی" name="fieldGroupId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا گروه رشته بیمه مرکزی را وارد نمایید',

                                        }
                                    ]}>
                                        <Select
                                            onChange={addEditModalHook.onChangeFieldSingle}
                                            placeholder="انتخاب گروه رشته بیمه مرکزی ">
                                            {props.allFields?.map((field: any) => {
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
                                            message: 'لطفا   زیر رشته بیمه مرکزی را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        placeholder="انتخاب   زیر رشته بیمه مرکزی "
                                        onChange={addEditModalHook.handleSelectAllSubFields}>
                                        {!props.isUpdate ? <Option key="all" value="all">---انتخاب همه---</Option> : null}
                                        {addEditModalHook.subFieldsByFieldGroupIds?.map((subField: any) => {
                                            return (
                                                <Option key={subField.Id} value={subField?.Id}>
                                                    {subField?.SubFieldTitle}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col> */}

                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={addEditModalHook.isLoadingSubmitBtn}>
                                ذخیره
                        </Button>
                        </Row>

                    </Form >
                )
            }

        </div >
    );
}

export default AddEditModal;