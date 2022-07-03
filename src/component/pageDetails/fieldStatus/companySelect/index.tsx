import { useContext } from 'react'
import { Form, Select, onSelectAllChange, IImpSelectProps } from 'sanhab-components-library'

import FieldStatusContext from "../../../pages/fieldStatus/context/context";

const CompanySelect = (props: IImpSelectProps<string | string[], any>) => {
    const context = useContext(FieldStatusContext);


    const { selectAllOptions = false } = props;
    let newProps = { ...props }
    Reflect.deleteProperty(newProps, "defaultList");
    Reflect.deleteProperty(newProps, "selectAllOptions");
    Reflect.deleteProperty(newProps, "onAllOptionChanges");
    return (
        <Select
            dropdownClassName="rtl" 
            loading={context.companiesLoading}
            {...newProps}
            className="sanhab-select"
            onChange={(newSelectedValue, options) => {
                if (props.onChange) {
                    if ((props?.mode === "multiple" || props?.mode === "tags") && typeof newSelectedValue !== "string" && newSelectedValue?.includes("ALL")) {
                        if (props?.value?.includes("ALL") && newSelectedValue.includes("ALL") && props?.value?.length < newSelectedValue.length) {
                            const indexOfAllValue = newSelectedValue.findIndex(seleceted => seleceted === "ALL");
                            newSelectedValue.splice(indexOfAllValue, 1);
                            props.onChange(newSelectedValue, options);
                        } else {
                            props.onChange(["ALL"], options);
                        }
                    }
                    else {
                        props.onChange(newSelectedValue, options);
                    }
                }
            }}
        >
            {selectAllOptions && <Select.Option value="ALL" key="ALL">همه</Select.Option>}
            {context.companies?.map(company => (
                <Select.Option value={`${JSON.stringify(company)}`} key={company.Id}>{company.Title}</Select.Option>
            ))}
        </Select>
    )
}
export default CompanySelect