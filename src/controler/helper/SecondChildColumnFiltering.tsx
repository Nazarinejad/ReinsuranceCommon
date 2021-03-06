import { useContext, useEffect, useState } from 'react'
import { ConfigProvider, Card } from 'antd'
import { Input, Button, Row, Col, Select, DatePicker, DateConvertor, Form, Icon, Notification } from "sanhab-components-library";
import GlobalContext from '../context/context'

const { Option } = Select;


interface titleTypes {
    fieldKey: number
    type: "number" | "string" | "date" | "component" | "boolean_component" | "multiple_component" | null
    component?: React.ReactChild
}

interface filter {
    propertyName: string
    operator: number
    value: string
    operand: 0 | 1
    isOpenGroup: boolean
    isCloseGroup: boolean
}

interface columnTitles {
    name: string
    type: string
    component?: React.ReactChild
    persianName: string
}



const GetSecondChildColumnSearchProps = (props: any) => {
    const [form] = Form.useForm();
    const globalContext = useContext(GlobalContext);

    const [titleTypes, setTitleTypes] = useState<titleTypes[]>([])

    useEffect(() => {

        form.setFieldsValue({ filters: [] });
        globalContext.secondChildOnResubmitFilter(true);
        globalContext.secondChildSearchAgain();
        globalContext.secondChildOnSetIsAdvancedSearch(false);

    }, [props.shouldResetFilterUILvlTwo])

    const onFinish = (values: any) => {
        let filters: filter[] = []
        if (values?.filters != undefined && values?.filters.length > 0) {
            values?.filters?.map((filter: any) => {
                let found = props.titles.find((title: columnTitles) => filter.title === title.name);
                let value = null;

                switch (found?.type) {
                    case "number":
                        value = Number(filter.searchText_number)
                        break;
                    case "string":
                        value = filter.searchText_string
                        break;
                    case "date":
                        value = DateConvertor.jalaliConvertToUTC(filter.searchText_date)
                        break;
                    case "component":
                        value = filter.searchText_component
                        break;
                    case "multiple_component":
                        value = filter.searchText_component
                        break;
                    case "boolean_component":
                        if (filter.searchText_component === "true") value = true
                        else if (filter.searchText_component === "false") value = false
                        break;

                    default:
                        break;
                }

                if (Array.isArray(value)) {
                    value.map((item: any) => {
                        filters.push({
                            propertyName: filter.title,
                            operator: filter.filterType,
                            value: item,
                            operand: 0,
                            isOpenGroup: false,
                            isCloseGroup: false
                        })
                    })
                }
                else {
                    filters.push({
                        propertyName: filter.title,
                        operator: filter.filterType,
                        value: value,
                        operand: 0,
                        isOpenGroup: false,
                        isCloseGroup: false
                    })
                }

            });

            let filtersWithOperand = addOperandToFilters(filters);

            globalContext.secondChildOnResubmitFilter(true);
            globalContext.secondChildOnSetSubmittedFilters(filtersWithOperand);
            globalContext.secondChildOnSetIsAdvancedSearch(true);
            globalContext.secondChildSearchAgain();
            globalContext.secondChildOnChangeActiveCollapsiblePanel();
        }
        else Notification.danger({ message: "???????????? ???????????? ???????? ??????!" })

    }


    const addOperandToFilters = (filterList: filter[]) => {
        let allFilters: filter[] = [...filterList];

        let names: string[] = [];
        allFilters.forEach((filter: filter) => {
            names.push(filter.propertyName);
        })
        const uniqueNames = new Set(names);

        uniqueNames.forEach(element => {
            let indexArrayOfSimilars = allFilters.reduce(function (allSimalars: any[], item: filter, index: number) {
                if (item.propertyName === element)
                    allSimalars.push(index);
                return allSimalars;
            }, []);

            if (indexArrayOfSimilars.length > 1) {
                indexArrayOfSimilars.forEach(similarItem => {
                    allFilters[similarItem].operand = 1;
                });
                const firstSimilar = indexArrayOfSimilars[0];
                const lastSimilar = indexArrayOfSimilars[indexArrayOfSimilars.length - 1];

                allFilters[firstSimilar].isOpenGroup = true;
                allFilters[lastSimilar].isCloseGroup = true;
            }


        });
        return allFilters;
    }

    const onChangeSelectedColumn = (val: any, option: any) => {
        let newArr = [...titleTypes];
        let index = newArr.findIndex(item => item.fieldKey === option.fieldKey);
        let obj = {
            fieldKey: option.fieldKey,
            type: option.type,
            component: option.component
        }
        if (index <= -1) {
            newArr.push(obj);


        }
        else {
            newArr[index] = obj
        }
        setTitleTypes(newArr)
    }

    const onAdd = (defaultValue?: any, insertIndex?: number) => {
    }

    const onRemove = (fieldKey: number) => {

        let newArr = [...titleTypes];
        let index = newArr.findIndex(item => item.fieldKey === fieldKey);

        if (index > -1) {
            newArr.splice(index, 1);
            setTitleTypes(newArr)
        }
    }

    const removeAllFilters = () => {
        form.setFieldsValue({ filters: [] });
        globalContext.secondChildOnResubmitFilter(true);
        globalContext.secondChildSearchAgain();
        globalContext.secondChildOnSetIsAdvancedSearch(false);
        globalContext.secondChildOnChangeActiveCollapsiblePanel();
    }


    const isNumber = (fieldKey: number) => {

        let found = titleTypes.find(item => item.fieldKey === fieldKey)
        return found?.type === "number"

    }

    const isString = (fieldKey: number) => {

        let found = titleTypes.find(item => item.fieldKey === fieldKey)
        return found?.type === "string"

    }

    const isDate = (fieldKey: number) => {

        let found = titleTypes.find(item => item.fieldKey === fieldKey)
        return found?.type === "date"

    }

    const isComponent = (fieldKey: number) => {

        let found = titleTypes.find(item => item.fieldKey === fieldKey)
        return found?.type === "component" || found?.type === "boolean_component" || found?.type === "multiple_component"
    }

    const loadComponent = (fieldKey: number) => {

        let found = titleTypes.find(item => item.fieldKey === fieldKey)
        return found?.component;
    }


    return (
        <Card>
            <ConfigProvider>
                <div className="p-8">
                    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" >
                        <Form.List name="filters" >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        // <Space key={key} style={{ display: 'flex', marginBottom: 8, width:"100%" }} align="baseline">
                                        <Row>
                                            <Col xs={8} sm={8} lg={5} xl={4} className="p-l-8">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'title']}
                                                    fieldKey={[fieldKey, 'title']}
                                                    rules={[{ required: true, message: '???????? ???????? ???????? ?????? ???? ???????????? ????????.' }]}
                                                >
                                                    <Select
                                                        // defaultValue={titles[0].name}
                                                        onChange={onChangeSelectedColumn}
                                                        placeholder="???????? ???????? ?????? ???? ???????????? ????????">
                                                        {props.titles?.map((item: any) => (
                                                            <Option fieldKey={fieldKey} type={item.type} component={item?.component} value={item.name}>{item.persianName}</Option>
                                                        ))}
                                                    </Select>

                                                </Form.Item>
                                            </Col>

                                            <Col xs={6} sm={6} lg={4} xl={3} className="p-l-8">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'filterType']}
                                                    fieldKey={[fieldKey, 'filterType']}
                                                    rules={[{
                                                        required: true,
                                                        message: '???????? ?????? ?????????? ???? ???????????? ????????.'
                                                    }]}>
                                                    <Select placeholder="?????? ??????????">
                                                        {!isDate(fieldKey) ? (
                                                            <>
                                                                <Option value={1}>?????????? </Option>
                                                                <Option value={2}>???? ?????????? </Option>
                                                            </>
                                                        ) : null}

                                                        {isNumber(fieldKey) || isDate(fieldKey) ? (
                                                            <>
                                                                <Option value={3}>???????????? ????</Option>
                                                                <Option value={5}>???????????? ????</Option>
                                                            </>
                                                        ) : null}
                                                        {isNumber(fieldKey) ? (
                                                            <>
                                                                <Option value={4}>???????????? ?????????? ????</Option>
                                                                <Option value={6}>???????????? ?????????? ????</Option>
                                                            </>
                                                        ) : null}
                                                        {isString(fieldKey) || (!isComponent(fieldKey) && !isNumber(fieldKey)) ?
                                                            (<Option value={7}>????????</Option>) : null}
                                                        {/* {!isComponent(fieldKey) ?
                                                            (<>

                                                                <Option value={8}>???????? ????????</Option>
                                                                <Option value={9}>???????? ??????????</Option>
                                                            </>) : null} */}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            {isNumber(fieldKey) ?
                                                (<Col xs={8} sm={8} lg={5} xl={4} className="p-l-8">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'searchText_number']}
                                                        fieldKey={[fieldKey, 'searchText_number']}
                                                        rules={[{
                                                            required: true,
                                                            pattern: /^[0-9]*$/,
                                                            message: '?????? ?????????? ???????? ???????? ??????'
                                                        }]}
                                                    >
                                                        <Input placeholder="?????? ???? ???????? ????????????" />
                                                    </Form.Item>
                                                </Col>)
                                                : null}
                                            {isString(fieldKey) ?
                                                (<Col xs={8} sm={8} lg={5} xl={4} className="p-l-8">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "searchText_string"]}
                                                        fieldKey={[fieldKey, 'searchText_string']}
                                                        rules={[{ required: true, message: '???????? ?????? ???? ???????? ????????????.' }]}
                                                    >
                                                        <Input placeholder="?????? ???? ???????? ????????????" />
                                                    </Form.Item>
                                                </Col>)
                                                : null}
                                            {isDate(fieldKey) ?
                                                (<Col xs={8} sm={8} lg={5} xl={4} className="p-l-8">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "searchText_date"]}
                                                        fieldKey={[fieldKey, 'searchText_date']}
                                                        rules={[{ required: true, message: '?????????? ???? ???????????? ????????' }]}>
                                                        <DatePicker />
                                                    </Form.Item>
                                                </Col>)
                                                : null}
                                            {isComponent(fieldKey) ?
                                                (<Col xs={8} sm={8} lg={5} xl={4} className="p-l-8">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "searchText_component"]}
                                                        fieldKey={[fieldKey, 'searchText_component']}
                                                        rules={[{ required: true, message: ' ???????????? ????????' }]}>

                                                        {loadComponent(fieldKey)}
                                                    </Form.Item>
                                                </Col>) : null}
                                            <Icon
                                                onClick={() => { remove(name); onRemove(fieldKey) }}
                                                iconType="close"
                                                color="gray"
                                                toolTip="?????? ??????????"
                                            />
                                        </Row>
                                    ))}
                                    <Form.Item>
                                        <Button className="text-right" type="link" onClick={() => { add(); onAdd() }} block>+
                                            ?????????? ???????? ??????????</Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item >
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Button type="primary" htmlType="submit" className="m-l-8">
                                    ??????????
                            </Button>
                                <Button type="default" colorType="basic" onClick={removeAllFilters}>
                                    ?????? ?????? ??????????????
                            </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </ConfigProvider>
        </Card>
    )
}

export default GetSecondChildColumnSearchProps;