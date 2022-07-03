import React, { useState, useEffect } from "react";
import FiscalPeriodApi from "../../../../controler/services/fiscalPeriod/apiRequest";
import { IfiscalYearDetails } from '../../../../controler/model/IFiscalPeriod';
import momentJalaali from "moment-jalaali";
import dayjs, { Dayjs } from 'dayjs';

function ViewFiscalPeriodDetailsModalHook(props: any) {
	const [isLoadingRecord, setIsLoadingRecord] = useState(false);
	const [visiblePopConfirmBox, setVisiblePopConfirmBox] = useState(false);

	const getStringOfPeriodType = (type: number) => {
		switch (type) {
			case 1:
				return "دوره ای"
			case 2:
				return "فصلی"
			case 3:
				return "سالیانه"
			case 4:
				return "بازه ای"
			default:
				return ""
				break;
		}
	}
	const getStringOfFactureType = (type: number) => {
		switch (type) {
			case 1:
				return "عادی"
			case 2:
				return "هزینه تجمیعی"
			case 3:
				return "جریمه دیرکرد"
			case 4:
				return "تعدیل کارمزد"
			case 5:
				return 'مشارکت منافع'
			case 6:
				return 'مغایرت'
			case 7:
				return 'ابطالی'
			default:
				return ""
				break;
		}
	}

	const [recordData, setRecordData] = useState<IfiscalYearDetails>({
		id: 0,
		title: "",
		periodType: "",
		pendingLoss: false,
		factureType: "",
		fromDay: "",
		toDay: "",
		fromMonth: "",
		toMonth: "",
		isActive: false
	});



	useEffect(() => {
		setIsLoadingRecord(true);
		FiscalPeriodApi.GetFiscalPeriodById({ id: props.fiscalPeriodId }).then((response: any) => {



			// // from date
			// let fromDateDateTime: string = response?.data?.Result?.FromDate?.split("T")[0];
			// let jalaliFromDate = momentJalaali(fromDateDateTime, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
			// let frmDate = `${jalaliFromDate?.substring(0, 4)}/${jalaliFromDate?.substring(5, 7)}/${jalaliFromDate?.substring(8, 10)}`

			// //to date
			// let toDateDateTime: string = response?.data?.Result?.ToDate?.split("T")[0];
			// let jalaliToDate = momentJalaali(toDateDateTime, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
			// let tDate = `${jalaliToDate?.substring(0, 4)}/${jalaliToDate?.substring(5, 7)}/${jalaliToDate?.substring(8, 10)}`


			setRecordData({
				id: props.fiscalPeriodId,
				title: response?.data?.Result?.Title,
				periodType: getStringOfPeriodType(response?.data?.Result?.PeriodType),
				factureType: getStringOfFactureType(response?.data?.Result?.FactureType),
				pendingLoss: response?.data?.Result?.PendingLoss,
				fromDay: response?.data?.Result?.FromDay,
				toDay: response?.data?.Result?.ToDay,
				fromMonth: response?.data?.Result?.FromMonth,
				toMonth: response?.data?.Result?.ToMonth,
				isActive: response?.data?.Result?.IsActive
			});



			setIsLoadingRecord(false);
		})
	}, [props.fiscalPeriodId]);



	const editFiscalPeriodHandler = (id: number) => {
		props.editRecordHandler(id)
		props.onCloseModal();
	};

	const deleteFiscalPeriodHandler = (id: number) => {
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
		editFiscalPeriodHandler,
		deleteFiscalPeriodHandler,
		showPopconfirm,
		onConfirmDelete,
		handleCancelDelete
	}
}
export default ViewFiscalPeriodDetailsModalHook;