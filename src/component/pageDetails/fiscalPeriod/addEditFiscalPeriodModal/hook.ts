import React, { useState, useEffect } from "react";
import { Notification, DateConvertor } from "sanhab-components-library";
import FiscalPeriodApi from "../../../../controler/services/fiscalPeriod/apiRequest";
import { IAddEdit } from '../../../../controler/model/IFiscalPeriod';
import { Form } from 'antd';

import moment, { Moment } from "jalali-moment";


function FiscalPeriodModalHook(props: any) {
	const [form] = Form.useForm();

	const [isActive, setIsActive] = useState<boolean>(false);
	const [hasPendingLoss, setHasPendingLoss] = useState<boolean>(false);

	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);
	const [isFirstSixMonthFrom, setIsFirstSixMonthFrom] = useState(false);
	const [isFirstSixMonthTo, setIsFirstSixMonthTo] = useState(false);

	

	

	useEffect(() => {
		if (props.isUpdate) {
			setIsLoadingRecordForEdit(true);
			FiscalPeriodApi.GetFiscalPeriodById({ id: props.fiscalPeriodId}).then((response: any) => {
				let isActiveSt = response?.data?.Result?.IsActive;
				setIsActive(isActiveSt)
				let hasPendingLossSt = response?.data?.Result?.PendingLoss;
				setHasPendingLoss(hasPendingLossSt)
				// const beginDate = moment(response?.data?.Result?.FromDate)
				// const endDate = moment(response?.data?.Result?.ToDate)
				if(response?.data?.Result?.FromMonth < 7) setIsFirstSixMonthFrom(true)
				if(response?.data?.Result?.ToMonth < 7) setIsFirstSixMonthTo(true)
				form.setFieldsValue({
					id: props.fiscalPeriodId,
					// yearPeriodId: props.selectedRecordYearPeriodId,
					title: response?.data?.Result?.Title,
					fiscalYearId: response?.data?.Result?.FiscalYearId,
					periodType: Number(response?.data?.Result?.PeriodType),
					factureType: Number(response?.data?.Result?.FactureType),
					fromDay: response?.data?.Result?.FromDay,
					toDay: response?.data?.Result?.ToDay,
					fromMonth: response?.data?.Result?.FromMonth,
					toMonth: response?.data?.Result?.ToMonth,
					// beginDate,
					// endDate
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
	}, [props.fiscalPeriodId]);


	const onFinish = (values: any) => {
		setIsLoadingSubmitBtn(true);

		let fiscalPeriodAdd: IAddEdit = {
			title: values.title,
			// fromDate:DateConvertor.jalaliConvertToUTC(values.beginDate),
			// toDate: DateConvertor.jalaliConvertToUTC(values.endDate),
			fromDay: values.fromDay,
			toDay: values.toDay,
			fromMonth: values.fromMonth,
			toMonth: values.toMonth,
			isActive: isActive,
			sortId: 0,
			periodType: values.periodType,
			pendingLoss: hasPendingLoss,
			factureType: values.factureType,
			fiscalYearId: values.fiscalYearId
		};

		let fiscalPeriodEdit: any = {
			id: values.id,
			yearPeriodId: values.yearPeriodId,
			title: values.title,
			// fromDate: DateConvertor.jalaliConvertToUTC(values.beginDate),
			// toDate: DateConvertor.jalaliConvertToUTC(values.endDate),
			fromDay: values.fromDay,
			toDay: values.toDay,
			fromMonth: values.fromMonth,
			toMonth: values.toMonth,
			isActive: isActive,
			sortId: 0,
			periodType: Number(values.periodType),
			pendingLoss: hasPendingLoss,
			factureType: Number(values.factureType),
			fiscalYearId: values.fiscalYearId
		};

		if (props.isUpdate) {
			FiscalPeriodApi.UpdateFiscalPeriod(fiscalPeriodEdit).then((response: any) => {
				setIsLoadingSubmitBtn(false);
				if (response?.data?.IsSucceed) {
					Notification.success({message: ' با موفقیت ثبت شد.'});
					props.reloadTable();
					props.onCloseAddEditMoadl();
				}

			})
		} else {

			FiscalPeriodApi.InsertFiscalPeriod(fiscalPeriodAdd).then((response: any) => {
				setIsLoadingSubmitBtn(false);
				if (response?.data?.IsSucceed) {
					Notification.success({message: ' با موفقیت ثبت شد.'});
					props.onCloseAddEditMoadl();
					props.reloadTable();
				}

			})
		}
	};

	const onChangeIsActiveSwitch = (val: any) => {
		setIsActive(!isActive)
	}

	const onChangePendingLossCheckbox = (val: any) => {
		setHasPendingLoss(!hasPendingLoss)
	}
	
	const onChangeFromMonth = (value: number) => {
		if(value < 7 )  setIsFirstSixMonthFrom(true)
		else setIsFirstSixMonthFrom(false)
	}
	
	const onChangeToMonth = (value: number) => {
		if(value < 7 )  setIsFirstSixMonthTo(true)
		else setIsFirstSixMonthTo(false)
	}

	return {
		form,
		isActive,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		hasPendingLoss,
		isFirstSixMonthFrom,
		isFirstSixMonthTo,
		onFinish,
		onChangeIsActiveSwitch,
		onChangePendingLossCheckbox,
		onChangeFromMonth,
		onChangeToMonth
	}
}
export default FiscalPeriodModalHook;