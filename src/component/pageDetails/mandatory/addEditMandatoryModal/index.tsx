import { Button, Form, Spin, Row, Col, Input, Select, ConfigProvider } from 'antd';
import MandatoryModalHook from './hook'
import { DatePicker as DatePickerJalali } from "antd-jalali";
// import FieldGroups from '../../../../controler/constant/FieldGroups'
import commisionType from '../../../../controler/constant/CommisionType'
import { DatePicker, Checkbox } from "sanhab-components-library";
const { Option } = Select;
const { TextArea } = Input;

const AddEditMandatoryModal = (props: any) => {

    const mandatoryModalHook = MandatoryModalHook(props);


    return (
        <div className="form_wrapper">

            {mandatoryModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form form={mandatoryModalHook.form} onFinish={mandatoryModalHook.onFinish} >
                        <Form.Item hidden={true}
                            name="id">
                            <Input />
                        </Form.Item>
                        <Form.Item hidden={true}
                            name="mandatoryRelianceInformationSubFieldId">
                            <Input />
                        </Form.Item>

                        <Row gutter={[24, 8]}>
                            <Col span={8}>
                                <Form.Item label="شرکت" name="companyId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا  شرکت را وارد نمایید',

                                        }
                                    ]}>

                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        disabled={props.isUpdate ? true : false}
                                        mode={!props.isUpdate ? "multiple" : undefined}
                                        maxTagCount={2}
                                        placeholder="انتخاب  شرکت "
                                        onChange={mandatoryModalHook.handleSelectAll}>
                                        <Option key="all" value="all">---انتخاب همه---</Option>
                                        {props.allCompanies?.map((company: any) => {
                                            return (
                                                <Option key={company.Id} value={company?.Id}>
                                                    {company?.Title}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
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
                                        disabled={props.isUpdate ? true : false}
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
                            <Col span={8}>
                                <Form.Item label="گروه رشته" name="fieldGroupId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا   گروه رشته را وارد نمایید',

                                        }
                                    ]}>
                                    {props.isUpdate ? (
                                        <Select
                                            showSearch
                                            filterOption={(input, option) => {
                                                return option?.props.children.indexOf(input) >= 0
                                            }}
                                            onChange={mandatoryModalHook.onChangeFieldSingle}
                                            mode={undefined}
                                            placeholder="انتخاب   گروه رشته ">
                                            {props.allFields?.map((field: any) => {
                                                return (
                                                    <Option key={field.FieldId} value={field?.FieldId}>
                                                        {field?.Title}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    ) :
                                        (
                                            <Select
                                                showSearch
                                                filterOption={(input, option) => {
                                                    return option?.props.children.indexOf(input) >= 0
                                                }}
                                                onChange={mandatoryModalHook.onChangeFieldGroup}
                                                mode="multiple"
                                                placeholder="انتخاب   گروه رشته ">
                                                {props.allFields?.map((field: any) => {
                                                    return (
                                                        <Option key={field.FieldId} value={field?.FieldId}>
                                                            {field?.Title}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="زیر رشته" name="subFieldId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا   زیر رشته را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        mode={!props.isUpdate ? "multiple" : undefined}
                                        placeholder="انتخاب   زیر رشته "
                                        onChange={mandatoryModalHook.handleSelectAllSubFields}>
                                        {!props.isUpdate ? <Option key="all" value="all">---انتخاب همه---</Option> : null}
                                        {mandatoryModalHook.subFieldsByFieldGroupIds?.map((subField: any) => {
                                            return (
                                                <Option key={subField.Id} value={subField?.Id}>
                                                    {subField?.SubFieldTitle}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="نوع کارمزد" name="commisionType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا  نوع کارمزد را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب نوع کارمزد" >
                                        {commisionType.map((type) => {
                                            return (
                                                <Option key={type.value} value={type.value}>
                                                    {type.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="نرخ کارمزد"
                                    name="commissionRate"
                                    rules={[{
                                        required: !mandatoryModalHook.isRegulation,
                                        pattern: /^[0-9]*$/,
                                        message: ' نرخ کارمزد صحیح نیست.'
                                    }]}
                                >

                                    <Input
                                        value={mandatoryModalHook.commissionRate}
                                        onChange={event => {
                                            mandatoryModalHook.setCommissionRate(event.target.value);
                                            mandatoryModalHook.onChangeIsRegulation(false);
                                        }}
                                        disabled={mandatoryModalHook.isRegulation}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label=" درصد سهم اتکایی"
                                    name="percentageOfRelianceShare"
                                    rules={[{
                                        required: !mandatoryModalHook.isRegulation,
                                        pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                        message: ' درصد سهم اتکایی صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                                    }]}
                                >

                                    <Input
                                        suffix={"%"}
                                        disabled={mandatoryModalHook.isRegulation}
                                        value={mandatoryModalHook.percentageOfRelianceShare}
                                        onChange={event => {
                                            mandatoryModalHook.setPercentageOfRelianceShare(event.target.value);
                                            mandatoryModalHook.onChangeIsRegulation(false);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="ضریب افزایش حق بیمه در ذخایر"
                                    name="premiumIncreaseCoefficientInReserves"
                                    rules={[{
                                        required: true,
                                        pattern: /^[0-9]*$/,
                                        message: '   ضریب افزایش حق بیمه در ذخایر صحیح نیست.'
                                    }]}
                                >

                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="ضریب افزایش حق بیمه در ضریب خسارت"
                                    name="premiumIncreaseCoefficientInLossRatio"
                                    rules={[{
                                        required: true,
                                        pattern: /^[0-9]*$/,
                                        message: '   ضریب افزایش حق بیمه در ضریب خسارت صحیح نیست.'
                                    }]}
                                >

                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label=" درصد  ارزش افزوده"
                                    name="vat"
                                    rules={[{
                                        required: true,
                                        pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                        message: ' درصد  ارزش افزوده صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                                    }]}
                                >

                                    <Input suffix={"%"} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label=" درصد   ذخیره"
                                    name="percentageOfSave"
                                    rules={[{
                                        required: true,
                                        pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                        message: ' درصد   ذخیره صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                                    }]}
                                >

                                    <Input suffix={"%"} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="مالیات"
                                    name="tax"
                                    rules={[{
                                        required: true,
                                        pattern: /^[0-9]*$/,
                                        message: 'مالیات صحیح نیست.'
                                    }]}
                                >

                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="عوارض"
                                    name="toll"
                                    rules={[{
                                        required: true,
                                        pattern: /^[0-9]*$/,
                                        message: 'عوارض صحیح نیست.'
                                    }]}
                                >

                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label=" درصد هزینه تحصیل"
                                    name="percentageOfTuitionFees"
                                    rules={[{
                                        required: true,
                                        pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                        message: ' درصد  هزینه تحصیل صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                                    }]}
                                >

                                    <Input suffix={"%"} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label=" درصد هزینه بهداشت"
                                    name="percentageOfHealthFees"
                                    rules={[{
                                        required: true,
                                        pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                        message: ' درصد  هزینه بهداشت صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                                    }]}
                                >

                                    <Input suffix={"%"} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label=" درصد سهم صندوق "
                                    name="percentageOfFundShare"
                                    rules={[{
                                        required: true,
                                        pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                        message: ' درصد  سهم صندوق  صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                                    }]}
                                >

                                    <Input suffix={"%"} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label=" درصد  جریمه دیرکرد "
                                    name="percentageOfPenaltyForLate"
                                    rules={[{
                                        required: true,
                                        pattern: /^(100|[0-9]{1,2})(\.[0-9]{1,2})?$/,
                                        message: ' درصد  جریمه دیرکرد   صحیح نیست (بیش از 2 رقم اعشار مجاز نیست).'
                                    }]}
                                >

                                    <Input suffix={"%"} />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="آیین نامه ای" name="isRegulation">
                                    <Checkbox
                                        onChange={() => {
                                            mandatoryModalHook.form.resetFields(["commissionRate", "percentageOfRelianceShare"]);
                                            mandatoryModalHook.onChangeIsRegulation(!mandatoryModalHook.isRegulation);
                                        }}
                                        checked={mandatoryModalHook.isRegulation}
                                        disabled={!!mandatoryModalHook.commissionRate || !!mandatoryModalHook.percentageOfRelianceShare}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item name="beginDate" label="تاریخ موثر از" >
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="endDate" label="تاریخ موثر تا" >
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
                )
            }

        </div >
    );
}

export default AddEditMandatoryModal;