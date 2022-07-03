import { Button, Checkbox, Form, Spin, Row, Col, Input, Radio, Select } from 'antd';
import AddEditCumulativesParticipatingModalHook from './hook'
import classes from './index.module.css'
const { Option } = Select;

const AddEditCumulativesParticipatingModal = (props: any) => {

    const addEditCumulativesParticipatingModalHook = AddEditCumulativesParticipatingModalHook(props);


    return (
        <div className="form_wrapper">

            {addEditCumulativesParticipatingModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form form={addEditCumulativesParticipatingModalHook.form} onFinish={addEditCumulativesParticipatingModalHook.onFinish} >

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
                                    ]}
                                >
                                    <Input name="Title" />
                                    {/* value={userInfo.person.lastName} */}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="آیین نامه تجمیعی" name="cumulativeRequlations">
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        mode="multiple"
                                        allowClear
                                        placeholder="انتخاب آیین نامه تجمیعی">
                                        {props.cumulativeRegulationsList?.map((cumulativeRequlation: any) => {
                                            return (
                                                <Option key={cumulativeRequlation.Id} value={cumulativeRequlation?.Id}>
                                                    {cumulativeRequlation?.Title}
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
                                    label=" درصد مشارکت"
                                    name="percentageOfParticipation"
                                    rules={[{
                                        required: true,
                                        pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                        message: ' درصد مشارکت صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                                    }]}
                                >

                                    <Input suffix={"%"} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="درنظر گرفتن خسارت معوق" name="considerPendingLoss">
                                    <Checkbox
                                        onChange={(val: any) => addEditCumulativesParticipatingModalHook.onChangePendingLossCheckbox(val)}
                                        checked={addEditCumulativesParticipatingModalHook.hasPendingLoss}
                                    ></Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="فرمت نسخه چاپی"
                                    name="printVersionFormat"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا   فرمت نسخه چاپی را انتخاب نمایید',

                                        }
                                    ]}>
                                    <Radio.Group className={classes.radioGroup} buttonStyle="outline">
                                        <Radio.Button value={1}>فرمت معمولی</Radio.Button>
                                        <Radio.Button value={2}>فرمت اداره عمر</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={addEditCumulativesParticipatingModalHook.isLoadingSubmitBtn}>
                                ذخیره
                </Button>
                        </Row>

                    </Form >
                )
            }

        </div >
    );
}

export default AddEditCumulativesParticipatingModal;