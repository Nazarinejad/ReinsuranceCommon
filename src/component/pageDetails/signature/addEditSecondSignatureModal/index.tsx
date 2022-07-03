import { useState } from 'react'
import { Spin } from 'antd';
import { Button, Checkbox, Form, Row, Col, Input, Icon, Select, Upload } from 'sanhab-components-library';
import AddEditSecondSignatureModalHook from './hook'
// import FieldGroups from '../../../../controler/constant/FieldGroups'
import classes from './index.module.css'

const { Option } = Select; 
const { TextArea } = Input;

const AddEditSecondSignatureModal = (props: any) => {


    const [fileList, setFileList] = useState<any[]>([])
    const [uploading, setUploading] = useState<boolean>(false)

    const addEditSecondSignatureModalHook = AddEditSecondSignatureModalHook(props);

    const uploadProps = {
        onRemove: (file: any) => {
            setFileList([])
        },
        beforeUpload: (file: any) => {
            setFileList([file])
            return false;
        },
        fileList,
    };



    return (
        <div className="form_wrapper">

            {addEditSecondSignatureModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form form={addEditSecondSignatureModalHook.form} onFinish={addEditSecondSignatureModalHook.onFinish} >
                        <Form.Item hidden={true}
                            name="id">
                            <Input />
                        </Form.Item>
                        <Form.Item hidden={true}
                            name="signatureId">
                            <Input />
                        </Form.Item>
                        <Form.Item hidden={true}
                            name="parentId">
                            <Input />
                        </Form.Item>

                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="نام  امضا کننده"
                                    name="name"
                                    rules={[{
                                        required: true,
                                        message: 'لطفا نام  امضا کننده را وارد نمایید.'
                                    }]}
                                >

                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="نام کاربری" name="userName"
                                >
                                    <Select
                                        allowClear
                                        loading={addEditSecondSignatureModalHook.isLoadingQuickSearch}
                                        showSearch
                                        // filterOption={(input, option) => {
                                        //     return option?.props.children.indexOf(input) >= 0
                                        // }}
                                        placeholder="لطفا نام کاربری را تایپ کنید"
                                        onSearch={addEditSecondSignatureModalHook.onSearchUserName}
                                    >
                                        {addEditSecondSignatureModalHook.searchedUserNameList?.map((user: any) => {
                                            return (
                                                <Option key={user?.Username} value={user?.Username}>
                                                    {user?.Username}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="شرکت" name="companyId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا شرکت را انتخاب نمایید.',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        mode={ !props.isUpdate ? "multiple" : undefined }
                                        placeholder="انتخاب شرکت"
                                    >
                                        {props.companyList?.map((company: any) => {
                                            return (
                                                <Option key={company.Id} value={company?.Id}>
                                                    {company?.Title}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>

                            {!props.isUpdate? (
                                <Col span={24}>
                                <Form.Item
                                    label="تصویر امضا"
                                    name="image"
                                    tooltip="لطفا فایلی با فرمت .jpg یا .png و حداکثر حجم 500مگابایت بارگزاری شود."
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا تصویر امضا را بارگزاری نمایید.',

                                        }
                                    ]}>
                                    <Upload
                                        accept=".png,.jpg"
                                        maxCount={1}
                                        {...uploadProps}
                                    >
                                        <Button>
                                            بارگزاری مستندات
                                            <Icon
                                                className="m-r-8"
                                                iconType="upload"
                                                size="small"
                                            />
                                        </Button>
                                    </Upload>
                                </Form.Item>

                            </Col>
                            ):null}

                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={addEditSecondSignatureModalHook.isLoadingSubmitBtn}>
                                ذخیره
                        </Button>
                        </Row>

                    </Form >
                )
            }

        </div >
    );
}

export default AddEditSecondSignatureModal;