import { AnyARecord } from "dns";
import React, { useState, useEffect } from "react";
import MandatoryApi from "../../../../controler/services/mandatory/apiRequest";
// import { IfiscalYearDetails } from '../../../../controler/model/IMandatory';
import {
    DateConvertor
} from "sanhab-components-library";
function ViewMandatoryDetailsModalHook(props: any) {
	const [isLoadingRecord, setIsLoadingRecord] = useState(false);
	const [visiblePopConfirmBox, setVisiblePopConfirmBox] = useState(false);
	const [recordData, setRecordData] = useState<any>({});

	


	
	useEffect(() => {
		setIsLoadingRecord(true);
		MandatoryApi.GetDetail({
			id: props.idListToViewDetails.mainParentId,
			companyId: props.idListToViewDetails.companyId,
			mandatoryRelianceInformationSubFieldId: props.idListToViewDetails.subfieldId

		}).then((response: any) => {

			setRecordData({

				id: response?.data?.Result?.Id,
				companyId: response?.data?.Result?.CompanyId,
				fiscalyearId: response?.data?.Result?.FiscalyearId,
				fieldId: response?.data?.Result?.FieldId,
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
				commissionType: response?.data?.Result?.CommissionType,
				effectiveDateFrom: DateConvertor.convertUTCdate(response?.data?.Result?.EffectiveDateFrom, "YYYY/MM/DD"),
				effectiveDateTo: DateConvertor.convertUTCdate(response?.data?.Result?.EffectiveDateTo, "YYYY/MM/DD"),
				percentageOfSave: response?.data?.Result?.PercentageOfSave,
				isRegulation: response?.data?.Result?.IsRegulation,
				subFieldCode: response?.data?.Result?.SubFieldCode,

			});



		})
			.finally(() => setIsLoadingRecord(false))

	}, [props.mandatoryId]);



	const editMandatoryHandler = (id: number) => {
		props.editRecordHandler(id)
		props.onCloseModal();
	};

	const deleteMandatoryHandler = (id: number) => {
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
		editMandatoryHandler,
		deleteMandatoryHandler,
		showPopconfirm,
		onConfirmDelete,
		handleCancelDelete
	}
}
export default ViewMandatoryDetailsModalHook;