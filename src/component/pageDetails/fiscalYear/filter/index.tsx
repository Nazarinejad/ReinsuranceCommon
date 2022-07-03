import { useState } from "react";
import { Collapse, Select, Form, Row, Col, Input, Button, DatePicker } from 'antd';
import { DatePicker as DatePickerJalali } from "antd-jalali";
import FilterHook from './hook';
import { CloseOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Panel } = Collapse;

const Filter = (props:any) => {
    
    const filterHook = FilterHook(props);
    // const [form] = Form.useForm(); 
    // const [formBimeName] = Form.useForm(); 
    // const [formPassport] = Form.useForm(); 

    // function onSearch(val) {
    //     console.log('search:', val);
    // }


    return (
        <Collapse className="filterBox">
            <Panel header="جستجو بیمه نامه" key="1">
            
                {/* ------------------------------ select filter type -------------------------------------------------- */}
                <Form name="control-hooks">
                    <Row>
                        <Col span={8} >
                            <Form.Item name="searchBy" label="جستجو بر اساس" rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    placeholder="جستجو بر اساس"
                                    optionFilterProp="children"
                                    onChange={filterHook.onChange}
                                >
                                    <Option value="insCode">شماره بیمه نامه</Option>
                                    <Option value="printCode">شماره چاپی</Option>
                                    <Option value="passportCode">شماره پاسپورت</Option>
                                    <Option value="date">تاریخ </Option>
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {/* ------------------------------------------------ insurance number --------------------------- */}
                {filterHook.filterType == "insCode" ? 
                (<Form onFinish={filterHook.onFinishInsCode} name="control-hooks">
                    <Row>
                        <Col span={8} >
                            <Form.Item name="insCodeInput" label="شماره بیمه نامه" rules={[{ required: true, message:"شماره بیمه نامه را وارد کنید." }]}>
                                <Input  />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{flexFlow:'row-reverse'}}>
                        <Button type="primary" htmlType="submit">
                                جستجو
                        </Button>
                        <Button onClick={filterHook.RemoveAllFilters} type="default" className="removeFiltersBtn">حذف فیلترها</Button>
                    </Row>
                </Form>)
                //------------------------------------------------- print number ------------------------------------
                :filterHook.filterType == "printCode" ? 
                (<Form onFinish={filterHook.onFinishPrintCode}  name="control-hooks">
                    <Row>
                        <Col span={8} >
                            <Form.Item name="printCodeInput" label="شماره چاپی" rules={[{ required: true, message:"شماره  چاپی را وارد کنید." }]}>
                                <Input  />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item name="companyInput" label="شرکت" rules={[{ required: true, message:"شرکت را انتخاب کنید" }]}>
                                <Select
                                    showSearch
                                    placeholder="انتخاب شرکت"
                                >
                                    {filterHook.companyList?.map((company:any)=><Option key={company.Id} value={company.Id}>{company.Title}</Option>)}
                                    
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{flexFlow:'row-reverse'}}>
                        <Button type="primary" htmlType="submit">
                                جستجو
                        </Button>
                        <Button onClick={filterHook.RemoveAllFilters} type="default" className="removeFiltersBtn">حذف فیلترها</Button>
                    </Row>
                </Form>)
                // -------------------------------------------------- passport number --------------------------------
                :filterHook.filterType == "passportCode" ? 
                (<Form onFinish={filterHook.onFinishPassport} name="control-hooks">
                    <Row>
                        <Col span={8} >
                            <Form.Item name="passportInput" label="شماره پاسپورت" rules={[{ required: true, message:"شماره  پاسپورت را وارد کنید." }]}>
                                <Input  />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{flexFlow:'row-reverse'}}>
                        <Button type="primary" htmlType="submit">
                                جستجو
                        </Button>
                        <Button onClick={filterHook.RemoveAllFilters} type="default" className="removeFiltersBtn">حذف فیلترها</Button>
                    </Row>
                </Form>)
                // ---------------------------------------------------- date -------------------------------------------
                :filterHook.filterType == "date" ? 
                (<Form  onFinish={filterHook.onFinishDate} name="control-hooks">
                    <Row>
                        <Col span={8} >
                            <Form.Item name="beginDate" label="از تاریخ" rules={[{ required: true, message:"تاریخ را انتخاب کنید" }]}>
                                <DatePickerJalali />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item name="endDate" label="تا تاریخ" rules={[{ required: true, message:"تاریخ را انتخاب کنید" }]}>
                                <DatePickerJalali />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item name="companyInput" label="شرکت" rules={[{ required: true, message:"شرکت را انتخاب کنید" }]}>
                                <Select
                                    showSearch
                                    placeholder="انتخاب شرکت"
                                >
                                    {filterHook.companyList?.map((company:any)=><Option key={company.Id} value={company.Id}>{company.Title}</Option>)}
                                    
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{flexFlow:'row-reverse'}}>
                        <Button type="primary" htmlType="submit">
                                جستجو
                        </Button>
                        <Button onClick={filterHook.RemoveAllFilters} type="default" className="removeFiltersBtn">حذف فیلترها</Button>
                    </Row>
                </Form>)
                :null}
            </Panel>
        </Collapse>
    )
}
export default Filter