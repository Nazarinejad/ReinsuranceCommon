import { Spin } from 'antd';
import FiscalPeriodModalHook from './hook'
import { Button, Checkbox, Form, Row, Col, Input, Switch, Select } from "sanhab-components-library";
import PeriodType from '../../../../controler/constant/PeriodType'
import FactureType from '../../../../controler/constant/FactureType'
import MonthsOfYear from '../../../../controler/constant/MonthsOfYear'
import DaysOfMonth from '../../../../controler/constant/DaysOfMonth'

const { Option } = Select;

const AddEditFiscalPeriodModal = (props: any) => {

    const fiscalPeriodModalHook = FiscalPeriodModalHook(props);


    return (
        <div className="form_wrapper">

            {fiscalPeriodModalHook.isLoadingRecordForEdit ? (
                <div className="spinner">
                    <Spin size="large" />
                </div>) : (
                    <Form form={fiscalPeriodModalHook.form} onFinish={fiscalPeriodModalHook.onFinish} >
                        <Form.Item hidden={true}
                            name="id">
                            <Input />
                        </Form.Item>
                        <Form.Item hidden={true}
                            name="yearPeriodId">
                            <Input />
                        </Form.Item>

                        {/* <Row>
                            <Col span={24}>
                                <Form.Item label="سال مالی" name="fiscalYearId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا  سال مالی را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        disabled={props.isUpdate ? true : false}
                                        placeholder="انتخاب سال مالی"
                                        mode="multiple">
                                        {props.fiscalYearList?.map((fiscalYear: any) => {
                                            return (
                                                <Option key={fiscalYear.Id} value={fiscalYear?.Id}>
                                                    {fiscalYear?.Title}{" "}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row> */}
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
                                <Form.Item label="نوع دوره" name="periodType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا  نوع دوره را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب نوع دوره" >
                                        {PeriodType.map((type) => {
                                            return (
                                                <Option key={type.value} value={type.value}>
                                                    {type.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="خسارت معوق/ذخیره ریاضی" name="pendingLoss">
                                    <Checkbox
                                        onChange={(val: any) => fiscalPeriodModalHook.onChangePendingLossCheckbox(val)}
                                        checked={fiscalPeriodModalHook.hasPendingLoss}
                                    ></Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item label="نوع صورتحساب" name="factureType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا  نوع صورتحساب را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب نوع صورتحساب" >
                                        {FactureType.map((type) => {
                                            return (
                                                <Option key={type.value} value={type.value}>
                                                    {type.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row style={{ justifyContent: 'space-between' }}>

                            <Col span={15}>
                                <Form.Item label="از تاریخ" name="fromDay"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا   روز را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب  روز">
                                        {DaysOfMonth?.map((day: any) => {
                                            return (
                                                <Option key={day.value} value={day?.value}>
                                                    {day?.name}
                                                </Option>
                                            );
                                        })}
                                        {fiscalPeriodModalHook.isFirstSixMonthFrom ? (<Option value={31}>31</Option>) : null}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item name="fromMonth"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا   ماه را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        onChange={fiscalPeriodModalHook.onChangeFromMonth}
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب  ماه">
                                        {MonthsOfYear?.map((month: any) => {
                                            return (
                                                <Option key={month.value} value={month?.value}>
                                                    {month?.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row style={{ justifyContent: 'space-between' }}>

                            <Col span={15}>
                                <Form.Item label="تا تاریخ" name="toDay"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا   روز را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب  روز">
                                        {DaysOfMonth?.map((day: any) => {
                                            return (
                                                <Option key={day.value} value={day?.value}>
                                                    {day?.name}
                                                </Option>
                                            );
                                        })}
                                        {fiscalPeriodModalHook.isFirstSixMonthTo ? (<Option value={31}>31</Option>) : null}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item name="toMonth"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'لطفا   ماه را وارد نمایید',

                                        }
                                    ]}>
                                    <Select
                                        onChange={fiscalPeriodModalHook.onChangeToMonth}
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.props.children.indexOf(input) >= 0
                                        }}
                                        placeholder="انتخاب  ماه">
                                        {MonthsOfYear?.map((month: any) => {
                                            return (
                                                <Option key={month.value} value={month?.value}>
                                                    {month?.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24} >
                                <Form.Item name="isActive" label="فعال/غیرفعال">
                                    <Switch
                                        className="statusSwitch"
                                        checked={fiscalPeriodModalHook.isActive}
                                        onChange={(val: any) => fiscalPeriodModalHook.onChangeIsActiveSwitch(val)}
                                        checkedChildren="فعال"
                                        unCheckedChildren="غیرفعال" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ flexFlow: 'row-reverse' }}>
                            <Button type="primary" htmlType="submit" loading={fiscalPeriodModalHook.isLoadingSubmitBtn}>
                                ذخیره
                </Button>
                        </Row>

                    </Form >
                )
            }

        </div >
    );
}

export default AddEditFiscalPeriodModal;