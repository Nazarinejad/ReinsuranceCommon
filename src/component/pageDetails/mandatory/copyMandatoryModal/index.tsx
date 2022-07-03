import { Select } from 'antd';
import MandatoryModalHook from './hook'
import { DatePicker, Button, Form, Row, Col, Input } from "sanhab-components-library";
const { Option } = Select;
const { TextArea } = Input;

const CopyMandatoryModal = (props: any) => {

    const mandatoryModalHook = MandatoryModalHook(props);


    return (
        <div className="form_wrapper">

            <Form form={mandatoryModalHook.form} onFinish={mandatoryModalHook.onFinish} >
                <Form.Item hidden={true}
                    name="id">
                    <Input />
                </Form.Item>

                <Row>
                    <Col span={24}>
                        <Form.Item label="سال مالی" name="fiscalyearId"
                            rules={[
                                {
                                    required: true,
                                    message: 'لطفا  سال مالی را وارد نمایید',

                                }
                            ]}>
                            <Select
                                showSearch
                                filterOption={(input, option) => {
                                    let temp = `${option?.props.children}`
                                    return temp.indexOf(input) >= 0
                                }}
                                placeholder="انتخاب  سال مالی ">
                                {props.allFiscalYears?.map((fiscalYear: any) => {
                                    return (
                                        <Option key={fiscalYear.Id} value={fiscalYear?.Id}>
                                            {fiscalYear?.Title}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label=" درصد سهم اتکایی"
                            name="percentageOfRelianceShare"
                            rules={[{
                                required: false,
                                pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                message: ' درصد سهم اتکایی صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                            }]}
                        >

                            <Input suffix={"%"} />
                        </Form.Item>
                    </Col>

                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="effectiveDateFrom"
                            label="تاریخ موثر از" >
                            <DatePicker />
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="effectiveDateTo"
                            label="تاریخ موثر تا" >
                            <DatePicker />
                        </Form.Item>
                    </Col>

                </Row>

                <Row style={{ flexFlow: 'row-reverse' }}>
                    <Button type="primary" htmlType="submit" loading={mandatoryModalHook.isLoadingSubmitBtn}>
                        ذخیره
                        </Button>
                </Row>

            </Form >
        </div >
    );
}

export default CopyMandatoryModal;