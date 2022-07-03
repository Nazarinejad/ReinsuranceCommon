import { useState } from 'react'
import { Spin } from 'antd';
import { Button, Checkbox, Form, Row, Col, Input, Icon, Select, Upload } from 'sanhab-components-library';
import SignatureModalHook from './hook'
// import FieldGroups from '../../../../controler/constant/FieldGroups'
import classes from './index.module.css'

const { Option } = Select;
const { TextArea } = Input;

const AddEditSignatureModal = (props: any) => {


    const [fileList, setFileList] = useState<any[]>([])
    const [uploading, setUploading] = useState<boolean>(false)

    const signatureModalHook = SignatureModalHook(props);


    // const normFile = (e: any) => {
    //     if (Array.isArray(e)) {
    //         return e;
    //     }
    //     return e && e.fileList;
    // };



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

            {signatureModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form form={signatureModalHook.form} onFinish={signatureModalHook.onFinish} >
                        <Form.Item hidden={true}
                            name="id">
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
                                <Form.Item
                                    label="نام کاربری"
                                    name="userName"
                                >
                                    <Select
                                        allowClear
                                        loading={signatureModalHook.isLoadingQuickSearch}
                                        showSearch
                                        // filterOption={(input, option) => {
                                        //     return option?.props.children.indexOf(input) >= 0
                                        // }}
                                        placeholder="لطفا نام کاربری را تایپ کنید"
                                        onSearch={signatureModalHook.onSearchUserName}
                                    >
                                        {signatureModalHook.searchedUserNameList?.map((user: any) => {
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
                                <Form.Item label="اداره" name="department"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا اداره را انتخاب نمایید.',

                                        }
                                    ]}>
                                    <Select
                                        disabled={props.isUpdate}
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب اداره"
                                    >
                                        {props.departmentList?.map((department: any) => {
                                            return (
                                                <Option key={department.Id} value={department?.Id}>
                                                    {department?.Title}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>

                            {!props.isUpdate ? (
                                <Col span={24}>
                                    <Form.Item
                                        // valuePropName="fileList"
                                        // getValueFromEvent={normFile}
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
                            ) : null}

                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={signatureModalHook.isLoadingSubmitBtn}>
                                ذخیره
                        </Button>
                        </Row>

                    </Form >
                )
            }

        </div >
    );
}

export default AddEditSignatureModal;