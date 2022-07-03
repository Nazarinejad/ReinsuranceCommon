import React, { useState, useEffect } from "react";
import MandatoryApi from "../../../../controler/services/mandatory/apiRequest";
import { Form } from 'antd';
import { Notification, DateConvertor } from "sanhab-components-library"
import moment from "jalali-moment";


function MandatoryModalHook(props: any) {
	const [form] = Form.useForm();


	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);
	const [commissionRate, setCommissionRate] = useState<string>();
	const [percentageOfRelianceShare, setPercentageOfRelianceShare] = useState<string>();

	const [subFieldsByFieldGroupIds, setSubFieldsByFieldGroupIds] = useState<any[]>([]);

	const [companyIdToReloadTable, setCompanyIdToReloadTable] = useState(0);
	const [fiscalYearIdToReloadTable, setFiscalYearIdToReloadTable] = useState(0);

	const [selectedSubFields, setSelectedSubFields] = useState<number[]>([]);

	const [isRegulation, setIsRegulation] = useState<boolean>(false);

	useEffect(() => {
		if (props.isUpdate) {
			setIsLoadingRecordForEdit(true);
			MandatoryApi.GetDetail({
				id: props.idListToViewDetails.mainParentId,
				companyId: props.idListToViewDetails.companyId,
				mandatoryRelianceInformationSubFieldId: props.idListToViewDetails.subfieldId
			}).then((response: any) => {

				onChangeFieldSingle(response?.data?.Result?.FieldId)

				setCompanyIdToReloadTable(response?.data?.Result?.CompanyId);
				setFiscalYearIdToReloadTable(response?.data?.Result?.FiscalyearId)

				const beginDate = moment(response?.data?.Result?.EffectiveDateFrom)
				const endDate = moment(response?.data?.Result?.EffectiveDateTo)

				let isRegulationSt = response?.data?.Result?.IsRegulation;
				setIsRegulation(isRegulationSt)

				form.setFieldsValue({
					id: response?.data?.Result?.Id,
					mandatoryRelianceInformationSubFieldId: response?.data?.Result?.MandatoryRelianceInformationSubFieldId,
					companyId: response?.data?.Result?.CompanyId,
					fiscalyearId: response?.data?.Result?.FiscalyearId,
					fieldGroupId: response?.data?.Result?.FieldId,
					subFieldId: response?.data?.Result?.SubFieldId,
					percentageOfFundShare: response?.data?.Result?.PercentageOfFundShare,
					commissionRate: response?.data?.Result?.CommissionPercentage,
					percentageOfRelianceShare: response?.data?.Result?.ReinsuranceSharePercentage,
					vat: response?.data?.Result?.VATPercentage,
					tax: response?.data?.Result?.TAXPercentage,
					toll: response?.data?.Result?.TollPercentage,
					percentageOfTuitionFees: response?.data?.Result?.PercentageOfTuitionFees,
					percentageOfHealthFees: response?.data?.Result?.PercentageOfHealthFees,
					percentageOfPenaltyForLate: response?.data?.Result?.PercentageOfPenaltyForLate,
					premiumIncreaseCoefficientInReserves: response?.data?.Result?.PremiumIncreaseCoefficientInReserves,
					premiumIncreaseCoefficientInLossRatio: response?.data?.Result?.PremiumIncreaseCoefficientInLossRatio,
					commisionType: response?.data?.Result?.CommissionType,
					beginDate,
					endDate,
					percentageOfSave: response?.data?.Result?.PercentageOfSave
				});




				setIsLoadingRecordForEdit(false);
			})
		}
		else {

			form.setFieldsValue({
				beginDate: moment(),
				endDate: moment()
			});

		}
	}, [props.fiiedId]);


	const onFinish = (values: any) => {
		setIsLoadingSubmitBtn(true);

		let mandatoryAdd: any = {

			companyId: values.companyId,
			fiscalyearId: values.fiscalyearId,
			fieldGroupId: values.fieldGroupId,
			subFieldId: values.subFieldId,
			commissionType: values.commisionType,
			commissionPercentage: Number(values.commissionRate),
			reinsuranceSharePercentage: values.percentageOfRelianceShare,
			premiumIncreaseCoefficientInReserves: values.premiumIncreaseCoefficientInReserves,
			premiumIncreaseCoefficientInLossRatio: values.premiumIncreaseCoefficientInLossRatio,
			vatPercentage: values.vat,
			taxPercentage: values.tax,
			tollPercentage: values.toll,
			percentageOfTuitionFees: values.percentageOfTuitionFees,
			percentageOfHealthFees: values.percentageOfHealthFees,
			percentageOfFundShare: values.percentageOfFundShare,
			percentageOfPenaltyForLate: values.percentageOfPenaltyForLate,
			effectiveDateFrom: DateConvertor.jalaliConvertToUTC(values.beginDate),
			effectiveDateTo: DateConvertor.jalaliConvertToUTC(values.endDate),
			percentageOfSave: values.percentageOfSave,
			isRegulation: isRegulation
		};

		let mandatoryEdit: any = {

			id: values.id,
			companyId: values.companyId,
			fiscalyearId: values.fiscalyearId,
			mandatoryRelianceInformationSubFieldId: values.mandatoryRelianceInformationSubFieldId,
			fieldId: values.fieldGroupId,
			subFieldId: values.subFieldId,
			commissionType: values.commisionType,
			commissionPercentage: Number(values.commissionRate),
			reinsuranceSharePercentage: values.percentageOfRelianceShare,
			premiumIncreaseCoefficientInReserves: values.premiumIncreaseCoefficientInReserves,
			premiumIncreaseCoefficientInLossRatio: values.premiumIncreaseCoefficientInLossRatio,
			vatPercentage: values.vat,
			taxPercentage: values.tax,
			tollPercentage: values.toll,
			percentageOfTuitionFees: values.percentageOfTuitionFees,
			percentageOfHealthFees: values.percentageOfHealthFees,
			percentageOfFundShare: values.percentageOfFundShare,
			percentageOfPenaltyForLate: values.percentageOfPenaltyForLate,
			effectiveDateFrom: DateConvertor.jalaliConvertToUTC(values.beginDate),
			effectiveDateTo: DateConvertor.jalaliConvertToUTC(values.endDate),
			percentageOfSave: values.percentageOfSave,
			isRegulation: isRegulation


		};

		if (props.isUpdate) {
			MandatoryApi.UpdateMandatory(mandatoryEdit).then((response: any) => {
				setIsLoadingSubmitBtn(false);
				if (response?.data?.IsSucceed) {
					Notification.success({
						message: " با موفقیت ثبت شد.",
						duration: 0
					})
					//props.reloadTable();
					//props.reloadLevelOneTable(companyIdToReloadTable);
					props.reloadLevelTwoTable(companyIdToReloadTable, fiscalYearIdToReloadTable);
					props.onCloseAddEditMoadl();
				}

			})
		} else {

			MandatoryApi.InsertMandatory(mandatoryAdd).then((response: any) => {
				setIsLoadingSubmitBtn(false);
				if (response?.data?.IsSucceed) {
					Notification.success({
						message: " با موفقیت ثبت شد.",
						duration: 0
					})
					props.reloadTable();
					props.closeAllExpandedTables()
					props.onCloseAddEditMoadl();
				}

			})
		}
	};



	const onChangeFieldGroup = (val: number[]) => {
		MandatoryApi.GetAllSubFieldsByFieldIds(val).then((response) => {

			// selectedSubFields.forEach((subField: any) => {
			// 	console.log(selectedSubFields, "----------selectedSubFields-------------")
			// 	console.log(val, "----------val-------------")
			// 	console.log(val.indexOf(subField.FieldGroup), "-----------------------")
			// 	if (!(val.indexOf(subField.FieldGroup) > -1)) {
			// 		const index = selectedSubFields.indexOf(subField.Id);
			// 		let newSelectedArray: number[] = []
			// 		if (index > -1) {
			// 			newSelectedArray = selectedSubFields.splice(index, 1);
			// 			console.log("newSelectedArray", newSelectedArray)
			// 			form.setFieldsValue({
			// 				subFieldId: newSelectedArray
			// 			})
			// 		}

			// 	}
			// })
			setSubFieldsByFieldGroupIds(response?.data?.Result)
		})
	}

	const onChangeFieldSingle = (val: number) => {
		MandatoryApi.GetAllSubFieldsByFieldId({ id: val }).then((response) => {
			setSubFieldsByFieldGroupIds(response?.data?.Result)
		})
	}

	const handleSelectAll = (value: any) => {
		if (value && value.length && value.includes("all")) {
			const all: number[] = []
			props.allCompanies?.forEach((company: any) => all.push(company.Id))
			form.setFieldsValue({
				companyId: all
			})
			return all;

		}
		return value;
	}

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


	const onChangeIsRegulation = (newIsRequlation: boolean) => {
		setIsRegulation(newIsRequlation)
	}

	return {
		form,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		subFieldsByFieldGroupIds,
		isRegulation,
		commissionRate,
		percentageOfRelianceShare,
		setPercentageOfRelianceShare,
		setCommissionRate,
		onFinish,
		onChangeFieldGroup,
		onChangeFieldSingle,
		handleSelectAll,
		handleSelectAllSubFields,
		onChangeIsRegulation
	}
}
export default MandatoryModalHook;