import React, { useState, useEffect } from "react";
import FieldApi from "../../../../controler/services/field/apiRequest";
import { IfiscalYearDetails } from '../../../../controler/model/IField';

function ViewFieldDetailsModalHook(props: any) {
	const [isLoadingRecord, setIsLoadingRecord] = useState(false);
	const [visiblePopConfirmBox, setVisiblePopConfirmBox] = useState(false);

	const getStringOfFieldGroup = (type: number) => {
		switch (type) {
			case 10:
				return "باربری"
			case 11:
				return "کشتی و هواپیما"
			case 12:
				return "سایر اتومبیل"
			case 13:
				return "مسئولیت"
			case 14:
				return "آتش سوزی"
			case 15:
				return "درمان"
			case 16:
				return "متفرقه"
			case 17:
				return "حوادث"
			case 18:
				return "عمر"
			case 19:
				return "مهندسی"
			case 20:
				return "آتش سوزی انرژی"
			case 21:
				return "مهندسی انرژی"
			case 22:
				return "ثالث"
			default:
				return ""
		}
	}
	

	const [recordData, setRecordData] = useState<IfiscalYearDetails>({
		id:0,
		isActive: false,
		fieldGroup: "",
		noLossRatio: false,
		failureToCalculateReserves: false,
		isCovrage: false,
		isCalculatedCovrage: false,
		subFieldCode:0,
		subFieldTitle: "",
		cumulativeParticipatingOfInterests: "",
		accountingCode: 0,
		description: ""
	});



	useEffect(() => {
		setIsLoadingRecord(true);
		FieldApi.GetFieldById({ id: props.fieldId }).then((response: any) => {


			setRecordData({

				id: props.fieldId,
				isActive: response?.data?.Result?.IsActive,
				fieldGroup: getStringOfFieldGroup(Number(response?.data?.Result?.FieldGroup)),
				noLossRatio: response?.data?.Result?.NoLossRatio,
				failureToCalculateReserves: response?.data?.Result?.FailureToCalculateReserves,
				isCovrage:response?.data?.Result?.IsCovrage,
				isCalculatedCovrage: response?.data?.Result?.IsCalculatedCovrage,
				subFieldCode: Number(response?.data?.Result?.SubFieldCode),
				subFieldTitle: response?.data?.Result?.SubFieldTitle,
				cumulativeParticipatingOfInterests: response?.data?.Result?.CumulativeParticipatingOfInterestsId,
				accountingCode: Number(response?.data?.Result?.AccountingCode),
				description: response?.data?.Result?.Description
			});



			setIsLoadingRecord(false);
		})
	}, [props.fieldId]);



	const editFieldHandler = (id: number) => {
		props.editRecordHandler(id)
		props.onCloseModal();
	};

	const deleteFieldHandler = (id: number) => {
		props.deleteRecordHandler(id)
	};

	const showPopconfirm = () => {
		setVisiblePopConfirmBox(true);
	};

	const onConfirmDelete = (id: number) => {
		props.deleteRecordHandler(id);
		setVisiblePopConfirmBox(false);
	};

	const handleCancelDelete = () => {
		setVisiblePopConfirmBox(false);
	};

	return {
		isLoadingRecord,
		recordData,
		visiblePopConfirmBox,
		editFieldHandler,
		deleteFieldHandler,
		showPopconfirm,
		onConfirmDelete,
		handleCancelDelete
	}
}
export default ViewFieldDetailsModalHook;