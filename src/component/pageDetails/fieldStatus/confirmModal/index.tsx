
import ConfirmModalHook from './hook'
import { Col, Row, Form, Input, Button } from 'antd'

const { TextArea } = Input;

const ConfirmModal = (props: any) => {


  const confirmModalHook = ConfirmModalHook(props);


  return (
    <div className="form_wrapper">
      
      <div className="m-b-32">{confirmModalHook.confirmSentence}</div>


      <Form form={confirmModalHook.form} onFinish={confirmModalHook.onFinish} >

                        <Row gutter={[24, 8]}>
                            <Col span={24}>
                                <Form.Item
                                    label="توضیحات"
                                    name="description"
                                >
                                    <TextArea rows={3} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={confirmModalHook.isLoadingSubmitBtn}>
                                ذخیره
                        </Button>
                        </Row>

                    </Form >

    </div >
  );
}

export default ConfirmModal;