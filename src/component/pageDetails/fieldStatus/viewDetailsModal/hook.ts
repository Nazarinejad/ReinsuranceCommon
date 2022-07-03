import React, { useState, useEffect } from "react";
import FieldStatusApi from "../../../../controler/services/fieldStatus/apiRequest";
import { IfiscalYearDetails } from '../../../../controler/model/IField';

function ViewDetailsModalHook(props: any) {
	const [isLoadingRecord, setIsLoadingRecord] = useState(false);
	const [visiblePopConfirmBox, setVisiblePopConfirmBox] = useState(false);

	


	const [recordData, setRecordData] = useState<any>({
		id: props.id,
		groupFieldOfInsuranceCompany: "",
		fieldOfInsuranceCompany: "",
		codeFieldOfInsuranceCompany: "",
		commissionType: 0,
		fieldTitle: "",
		subFieldCode: 0,
		subFieldTitle:"",
		accountingCode: 0,
		commissionRate: 0,
		companyId:0
	});



	useEffect(() => {
		setIsLoadingRecord(true);
		FieldStatusApi.GetById({ id: props.id }).then((response: any) => {


			setRecordData({

				id: props.id,
				groupFieldOfInsuranceCompany: response?.data?.Result?.GroupFieldOfInsuranceCompany,
				fieldOfInsuranceCompany: response?.data?.Result?.FieldOfInsuranceCompany,
				codeFieldOfInsuranceCompany: response?.data?.Result?.CodeFieldOfInsuranceCompany,
				commissionType: response?.data?.Result?.CommissionType,
				fieldTitle: response?.data?.Result?.FieldTitle,
				subFieldCode: response?.data?.Result?.SubFieldCode,
				subFieldTitle: response?.data?.Result?.SubFieldTitle,
				accountingCode: response?.data?.Result?.AccountingCode,
				commissionRate: response?.data?.Result?.CommissionRate,
				companyId: response?.data?.Result?.CompanyId,
				
				//FieldOfInsuranceCompany: getStringOfFieldGroup(Number(response?.data?.Result?.FieldOfInsuranceCompany)),
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
export default ViewDetailsModalHook;