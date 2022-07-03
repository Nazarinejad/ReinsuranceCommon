import { Spin } from 'antd';
import { Button, Checkbox, Form, Row, Col, Input, Switch, Select, Radio } from 'sanhab-components-library';
import FieldModalHook from './hook'
import classes from './index.module.css'

const { Option } = Select;
const { TextArea } = Input;

const AddEditFieldModal = (props: any) => {
    const fieldModalHook = FieldModalHook(props);

    return (
        <div className="form_wrapper"> 

            {fieldModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form form={fieldModalHook.form} onFinish={fieldModalHook.onFinish} >
                        <Form.Item hidden={true}
                            name="id">
                            <Input />
                        </Form.Item>

                        <Row gutter={[24, 8]}>
                            <Col span={12}>
                                <Form.Item label="ایجاد"
                                    name="createType"
                                    rules={[
                                        {
                                            required: props.isUpdate ? false : true,
                                            message: 'لطفا گزینه مورد نظر را انتخاب نمایید',

                                        }
                                    ]}>
                                    <Radio.Group
                                        disabled={props.isUpdate ? true : false}
                                        defaultValue={props.isUpdate ? "subField" : null}
                                        onChange={(e: any) => fieldModalHook.onChangeCreationType(e.target.value)}
                                        className={classes.radioGroup}
                                        buttonStyle="outline">
                                        <Radio.Button value={"fieldGroup"}>گروه رشته</Radio.Button>
                                        <Radio.Button value={"subField"}>زیر رشته</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            {fieldModalHook.isCreationGroup === true || props.isUpdate ? (
                                <>
                                    <Col span={12}>
                                        <Form.Item label="اداره" name="department"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'لطفا اداره را انتخاب نمایید.',

                                                }
                                            ]}>
                                            <Select
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
                                    <Col span={12}>
                                        <Form.Item label=" گروه رشته" name="fieldGroup"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'لطفا   گروه رشته را وارد نمایید',

                                                }
                                            ]}>
                                            <Select
                                                showSearch
                                                filterOption={(input, option) => {
                                                    return option?.props.children.indexOf(input) >= 0
                                                }}
                                                placeholder="انتخاب گروه رشته ">
                                                {fieldModalHook.allFields?.map((field: any) => {
                                                    return (
                                                        <Option key={field?.FieldId} value={field?.FieldId}>
                                                            {field?.Title}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="نام زیر رشته"
                                            name="subFieldTitle"
                                            rules={[{
                                                required: true,
                                                message: 'لطفا نام زیر رشته را وارد نمایید.'
                                            }]}
                                        >

                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
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
                                    <Col span={12}>
                                        <Form.Item label=" گروه مشارکت منافع" name="cumulativeParticipatingOfInterestsId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'لطفا گروه مشارکت منافع را انتخاب نمایید.',

                                                }
                                            ]}>
                                            <Select
                                                showSearch
                                                filterOption={(input, option) => {
                                                    return option?.props.children.indexOf(input) >= 0
                                                }}
                                                placeholder="انتخاب  گروه مشارکت منافع"
                                            >
                                                {props.cumulativeList?.map((cumulativeItem: any) => {
                                                    return (
                                                        <Option key={cumulativeItem.Id} value={cumulativeItem?.Id}>
                                                            {cumulativeItem?.Title}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="عدم محاسبه ذخیره" name="failureToCalculateReserves">
                                            <Checkbox
                                                onChange={(val: any) => fieldModalHook.onChangeFailureToCalculateReservesCheckbox(val)}
                                                checked={fieldModalHook.failureToCalculateReserves}
                                            ></Checkbox>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label=" بدون ضریب خسارت " name="noLossRatio">
                                            <Checkbox
                                                onChange={(val: any) => fieldModalHook.onChangeNoLossRatioCheckbox(val)}
                                                checked={fieldModalHook.noLossRatio}
                                            ></Checkbox>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="پوششی" name="isCovrage">
                                            <Checkbox
                                                onChange={(val: any) => fieldModalHook.onChangeIsCovrageCheckbox(val)}
                                                checked={fieldModalHook.isCovrage}
                                            ></Checkbox>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="پوششی محاسباتی" name="isCalculatedCovrage">
                                            <Checkbox
                                                onChange={(val: any) => fieldModalHook.onChangeIsCalculatedCovrageCheckbox(val)}
                                                checked={fieldModalHook.isCalculatedCovrage}
                                            ></Checkbox>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="مستمری" name="isAnnuity" valuePropName="checked">
                                            <Checkbox />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} >
                                        <Form.Item name="isActive" label="فعال/غیرفعال">
                                            <Switch
                                                className="statusSwitch"
                                                checked={fieldModalHook.isActive}
                                                onChange={(val: any) => fieldModalHook.onChangeIsActiveSwitch(val)}
                                                checkedChildren="فعال"
                                                unCheckedChildren="غیرفعال" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12} >
                                        <Form.Item name="description" label="توضیحات" >
                                            <TextArea rows={2}></TextArea>
                                        </Form.Item>
                                    </Col>
                                </>) : null}
                            {fieldModalHook.isCreationGroup === false ?
                                (<Col span={12}>
                                    <Form.Item
                                        label="نام گروه رشته"
                                        name="fieldTitle"
                                        rules={[{
                                            required: true,
                                            message: 'لطفا نام گروه رشته را وارد نمایید.'
                                        }]}
                                    >

                                        <Input />
                                    </Form.Item>
                                </Col>) : null
                            }
                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={fieldModalHook.isLoadingSubmitBtn}>
                                <span>ذخیره</span>
                            </Button>
                        </Row>

                    </Form >
                )
            }

        </div >
    );
}

export default AddEditFieldModal;