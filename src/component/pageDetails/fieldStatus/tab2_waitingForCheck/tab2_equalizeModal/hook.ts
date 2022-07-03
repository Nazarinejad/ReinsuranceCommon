import { useState, useEffect, useContext } from "react";
import FieldStatusApi from "../../../../../controler/services/fieldStatus/apiRequest";
import { Form } from 'antd';
import { Notification } from 'sanhab-components-library'
import FieldStatusContext from '../../../../pages/fieldStatus/context/context'

function EqualizeModalHook(props: any) {

	const context = useContext(FieldStatusContext)
	const [form] = Form.useForm();

	const [isActive, setIsActive] = useState<boolean>(false);
	const [noLossRatio, setNoLossRatio] = useState<boolean>(false);
	const [failureToCalculateReserves, setFailureToCalculateReserves] = useState<boolean>(false);
	const [isCovrage, setIsCovrage] = useState<boolean>(false);
	const [isCalculatedCovrage, setIsCalculatedCovrage] = useState<boolean>(false);

	const [subFieldsByFieldGroupIds, setSubFieldsByFieldGroupIds] = useState<any[]>([]);

	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);

	const [fieldListByCompanyId, setFieldListByCompanyId] = useState<any[]>([]);

	const [companyId, setCompanyId] = useState<number>(0);

	useEffect(() => {
		console.log("props.selectedRecordCompanyId", props.selectedRecordCompanyId)
		if (props.isUpdate) {
			setIsLoadingRecordForEdit(true);

			FieldStatusApi.GetAllFieldsByCompanyId({ id: props.selectedRecordCompanyId }).then((response) => {
				setFieldListByCompanyId(response?.data?.Result);
			})

			FieldStatusApi.GetById({ id: props.id }).then((response: any) => {

				setCompanyId(response?.data?.Result?.CompanyId)
				form.setFieldsValue({
					id: props.id,
					groupFieldOfInsuranceCompany: response?.data?.Result?.GroupFieldOfInsuranceCompany,
					fieldOfInsuranceCompany: response?.data?.Result?.FieldOfInsuranceCompany
				});
				if (response?.data?.Result?.FieldId !== 0) {
					//FieldStatusApi.GetAllSubFieldsByFieldId({ id: response?.data?.Result?.FieldId }).then((response1) => {
					FieldStatusApi.GetAllSubFieldsByFieldIdAndCompanyId({
						fieldId: response?.data?.Result?.FieldId,
						companyId: response?.data?.Result?.CompanyId
					}).then((response1) => {


						form.setFieldsValue({
							fieldId: response?.data?.Result?.FieldId,
							subFieldId: response?.data?.Result?.SubFieldId
						});

						// if (response?.data?.Result?.SubFieldId !== 0) {
						// 	form.setFieldsValue({
						// 		subFieldId: response?.data?.Result?.SubFieldId
						// 	});
						// }
						setSubFieldsByFieldGroupIds(response1?.data?.Result)
					})
						.finally(() => {
							setIsLoadingRecordForEdit(false);

						})
				}
				else {
					setIsLoadingRecordForEdit(false);

				}

			})

		}
	}, [props.id]);



	const onFinish = (values: any) => {
		setIsLoadingSubmitBtn(true);

		let fieldEdit: any = {
			id: values.id,
			fieldId: values.fieldId,
			subFieldId: values.subFieldId
		};

		FieldStatusApi.Equalize(fieldEdit).then((response: any) => {
			setIsLoadingSubmitBtn(false);
			if (response?.data?.IsSucceed) {
				Notification.success({ message: ' با موفقیت ثبت شد.' });
				// props.reloadTable();
				context.onSetReloadTable();
				props.onCloseAddEditMoadl();
			}

		})
			.finally(() => {
				setIsLoadingSubmitBtn(false);
			})
	};

	const onChangeIsActiveSwitch = (val: any) => {
		setIsActive(!isActive)
	}

	const onChangeNoLossRatioCheckbox = (val: any) => {
		setNoLossRatio(!noLossRatio)
	}

	const onChangeFailureToCalculateReservesCheckbox = (val: any) => {
		setFailureToCalculateReserves(!failureToCalculateReserves)
	}

	const onChangeIsCovrageCheckbox = (val: any) => {
		setIsCovrage(!isCovrage)
	}

	const onChangeIsCalculatedCovrageCheckbox = (val: any) => {
		setIsCalculatedCovrage(!isCalculatedCovrage)
	}

	const onChangeFieldSingle = (val: number) => {
		form.setFieldsValue({
			subFieldId: null
		});
		//FieldStatusApi.GetAllSubFieldsByFieldId({ id: val })
		FieldStatusApi.GetAllSubFieldsByFieldIdAndCompanyId({
			fieldId: val,
			companyId: companyId 
		})
			.then((response) => {
				setSubFieldsByFieldGroupIds(response?.data?.Result)
			})
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
		fieldListByCompanyId,
		onFinish,
		onChangeIsActiveSwitch,
		onChangeNoLossRatioCheckbox,
		onChangeFailureToCalculateReservesCheckbox,
		onChangeIsCovrageCheckbox,
		onChangeIsCalculatedCovrageCheckbox,
		onChangeFieldSingle,
	}
}
export default EqualizeModalHook;