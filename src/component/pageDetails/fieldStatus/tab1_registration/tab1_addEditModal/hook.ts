import { useState, useEffect, useContext } from "react";
import FieldStatusApi from "../../../../../controler/services/fieldStatus/apiRequest";
import { Form } from 'antd';
import { Notification } from 'sanhab-components-library'
import FieldStatusContext from "../../../../pages/fieldStatus/context/context";

function AddEditModalHook(props: any) {

	const context = useContext(FieldStatusContext);
	const [form] = Form.useForm();

	const [isActive, setIsActive] = useState<boolean>(false);
	const [noLossRatio, setNoLossRatio] = useState<boolean>(false);
	const [failureToCalculateReserves, setFailureToCalculateReserves] = useState<boolean>(false);
	const [isCovrage, setIsCovrage] = useState<boolean>(false);
	const [isCalculatedCovrage, setIsCalculatedCovrage] = useState<boolean>(false);

	const [subFieldsByFieldGroupIds, setSubFieldsByFieldGroupIds] = useState<any[]>([]);
	const [selectedSubFields, setSelectedSubFields] = useState<number[]>([]);

	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);

	useEffect(() => {
		if (props.isUpdate) {
			setIsLoadingRecordForEdit(true);
			FieldStatusApi.GetById({ id: props.id }).then((response: any) => {

				form.setFieldsValue({

					id: response?.data?.Result?.Id,
					groupFieldOfInsuranceCompany: response?.data?.Result?.GroupFieldOfInsuranceCompany,
					fieldOfInsuranceCompany: response?.data?.Result?.FieldOfInsuranceCompany,
					codeFieldOfInsuranceCompany: response?.data?.Result?.CodeFieldOfInsuranceCompany,
					companyId: response?.data?.Result?.CompanyId,
				});


				setIsLoadingRecordForEdit(false);
			})
		}
	}, [props.fiiedId]);



	const onFinish = (values: any) => {
		setIsLoadingSubmitBtn(true);

		let Add: any = {

			groupFieldOfInsuranceCompany: values.groupFieldOfInsuranceCompany,
			fieldOfInsuranceCompany: values.fieldOfInsuranceCompany,
			codeFieldOfInsuranceCompany: values.codeFieldOfInsuranceCompany,
			companyId: values.companyId,

		};

		let Edit: any = {
			id: values.id,
			groupFieldOfInsuranceCompany: values.groupFieldOfInsuranceCompany,
			fieldOfInsuranceCompany: values.fieldOfInsuranceCompany,
			codeFieldOfInsuranceCompany: values.codeFieldOfInsuranceCompany,
		};

		if (props.isUpdate) {
			FieldStatusApi.Update(Edit).then((response: any) => {
				setIsLoadingSubmitBtn(false);
				if (response?.data?.IsSucceed) {
					Notification.success({message: ' با موفقیت ثبت شد.'});
					// props.reloadTable();
					context.onSetReloadTable()
					props.onCloseAddEditMoadl();
				}

			})
				.finally(() => {
					setIsLoadingSubmitBtn(false);
				})
		} else {

			FieldStatusApi.Insert(Add).then((response: any) => {
				setIsLoadingSubmitBtn(false);
				if (response?.data?.IsSucceed) {
					Notification.success({message: ' با موفقیت ثبت شد.'});
					props.onCloseAddEditMoadl();
					//props.reloadTable();
					context.onSetReloadTable()
				}

			})
				.finally(() => {
					setIsLoadingSubmitBtn(false);
				})
		}
	};



	const handleSelectAllSubFields = (value: any, b: any) => {
		if (value && value.length && value.includes("all")) {
			const all: number[] = []
			subFieldsByFieldGroupIds?.forEach((subField: any) => all.push(subField.Id))
			form.setFieldsValue({
				subFieldId: all
			})
			return all;
		}
		else {
			setSelectedSubFields(value)
		}
		return value;
	}

	return {
		form,
		isActive,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		noLossRatio,
		failureToCalculateReserves,
		isCovrage,
		isCalculatedCovrage,
		subFieldsByFieldGroupIds,
		onFinish,
		handleSelectAllSubFields
	}
}
export default AddEditModalHook;