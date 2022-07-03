import React, { useState, useEffect } from "react";
import FieldApi from "../../../../controler/services/field/apiRequest";
import { Form } from 'antd';
import { Notification } from 'sanhab-components-library';
import { IAddSubFieldRequestBody } from "../../../../controler/services/field/models";
import { IEditRequestBody } from "../../../../controler/services/field/models";

function FieldModalHook(props: any) {
	const [form] = Form.useForm();

	const [isActive, setIsActive] = useState<boolean>(false);
	const [noLossRatio, setNoLossRatio] = useState<boolean>(false);
	const [failureToCalculateReserves, setFailureToCalculateReserves] = useState<boolean>(false);
	const [isCovrage, setIsCovrage] = useState<boolean>(false);
	const [isCalculatedCovrage, setIsCalculatedCovrage] = useState<boolean>(false);
	const [isCreationGroup, setIsCreationGroup] = useState<boolean | undefined>(undefined);

	const [allFields, setAllFields] = useState<any[]>([]);


	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);

	useEffect(() => {
		FieldApi.GetAllFields().then(response => {
			setAllFields(response?.data?.Result)
		})
		if (props.isUpdate) {
			setIsCreationGroup(true);
			setIsLoadingRecordForEdit(true);
			FieldApi.GetFieldById(props.fieldId).then((response: any) => {
				form.setFieldsValue({
					isAnnuity: response?.data?.Result?.IsAnnuity
				})


				let isActiveSt = response?.data?.Result?.IsActive;
				setIsActive(isActiveSt)

				let noLossRatioSt = response?.data?.Result?.NoLossRatio;
				setNoLossRatio(noLossRatioSt)

				let failureToCalculateReservesSt = response?.data?.Result?.FailureToCalculateReserves;
				setFailureToCalculateReserves(failureToCalculateReservesSt)

				let isCovrageSt = response?.data?.Result?.IsCovrage;
				setIsCovrage(isCovrageSt)

				let isCalculatedCovrageSt = response?.data?.Result?.IsCalculatedCovrage;
				setIsCalculatedCovrage(isCalculatedCovrageSt)

				form.setFieldsValue({
					id: props.fieldId.id,
					fieldGroup: Number(response?.data?.Result?.FieldId),
					// subFieldCode: response?.data?.Result?.SubFieldCode,
					subFieldTitle: response?.data?.Result?.SubFieldTitle,
					accountingCode: response?.data?.Result?.AccountingCode,
					description: response?.data?.Result?.Description,
					cumulativeParticipatingOfInterestsId: response?.data?.Result?.CumulativeParticipatingOfInterestsId,
					department: response?.data?.Result?.Department
				});


				setIsLoadingRecordForEdit(false);
			})
		}
	}, [props.fiiedId]);



	const onFinish = (values: any) => {
		setIsLoadingSubmitBtn(true);
		let desc = values.description != null ? values.description : ""
		if (props.isUpdate) {
			FieldApi.UpdateField({
				id: values.id,
				isActive: isActive,
				sortId: 0,
				fieldId: values.fieldGroup,
				noLossRatio: noLossRatio,
				failureToCalculateReserves: failureToCalculateReserves,
				isCovrage: isCovrage,
				isCalculatedCovrage: isCalculatedCovrage,
				subFieldTitle: values.subFieldTitle,
				cumulativeParticipatingOfInterestsId: values.cumulativeParticipatingOfInterestsId,
				accountingCode: Number(values.accountingCode),
				description: desc,
				department: values.department,
				isAnnuity: values.isAnnuity
			})
				.then((response: any) => {
					setIsLoadingSubmitBtn(false);
					if (response?.data?.IsSucceed) {
						Notification.success({ message: ' با موفقیت ثبت شد.' });
						props.reloadTable();
						props.reloadLevelOneTable();
						props.onCloseAddEditMoadl();
					}

				})
				.finally(() => {
					setIsLoadingSubmitBtn(false);
				})
		} else {

			if (values.createType === "fieldGroup") {
				let fieldAdd: any = {
					title: values.fieldTitle
				};
				FieldApi.InsertField(fieldAdd)
					.then((response: any) => {
						setIsLoadingSubmitBtn(false);
						if (response?.data?.IsSucceed) {
							Notification.success({ message: ' با موفقیت ثبت شد.' });
							props.onCloseAddEditMoadl();
							props.reloadTable();
						}

					})
					.finally(() => {
						setIsLoadingSubmitBtn(false);
					})
			}
			else if (values.createType === "subField") {
				let subFieldAdd: IAddSubFieldRequestBody = {
					isActive: isActive,
					sortId: 0,
					fieldId: values.fieldGroup,
					noLossRatio: noLossRatio,
					failureToCalculateReserves: failureToCalculateReserves,
					isCovrage: isCovrage,
					isCalculatedCovrage: isCalculatedCovrage,
					subFieldTitle: values.subFieldTitle,
					cumulativeParticipatingOfInterestsId: values.cumulativeParticipatingOfInterestsId,
					accountingCode: Number(values.accountingCode),
					description: desc,
					department: values.department,
					isAnnuity: values.isAnnuity
				};
				FieldApi.InsertSubField(subFieldAdd)
					.then((response: any) => {
						setIsLoadingSubmitBtn(false);
						if (response?.data?.IsSucceed) {
							Notification.success({ message: ' با موفقیت ثبت شد.' });
							props.onCloseAddEditMoadl();
							props.reloadLevelOneTable();
						}

					})
					.finally(() => {
						setIsLoadingSubmitBtn(false);
					})
			}

		}
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

	const onChangeCreationType = (val: string) => {
		if (val === "fieldGroup") setIsCreationGroup(false);
		else if (val === "subField") setIsCreationGroup(true);
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
		isCreationGroup,
		allFields,
		onFinish,
		onChangeIsActiveSwitch,
		onChangeNoLossRatioCheckbox,
		onChangeFailureToCalculateReservesCheckbox,
		onChangeIsCovrageCheckbox,
		onChangeIsCalculatedCovrageCheckbox,
		onChangeCreationType
	}
}
export default FieldModalHook;