import { useState } from 'react'
import { Button, Form, Row, Col, Input, Icon, Upload } from 'sanhab-components-library';
import UpdateSignatureImageModalHook from './hook'

const UpdateSignatureImageModal = (props: any) => {


    const [fileList, setFileList] = useState<any[]>([])

    const updateSignatureImageModalHook = UpdateSignatureImageModalHook(props);

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
            <Form form={updateSignatureImageModalHook.form} onFinish={updateSignatureImageModalHook.onFinish} >
                <Form.Item hidden={true}
                    name="id">
                    <Input />
                </Form.Item>

                <Row>


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

                </Row>
                <Row style={{ flexFlow: 'row-reverse' }}>
                    <Button type="primary" htmlType="submit" loading={updateSignatureImageModalHook.isLoadingSubmitBtn}>
                        ذخیره
                        </Button>
                </Row>

            </Form >

        </div >
    );
}

export default UpdateSignatureImageModal;