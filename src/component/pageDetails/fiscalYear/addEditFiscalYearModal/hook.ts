import React, { useState, useEffect } from "react";
import { Notification, DateConvertor } from "sanhab-components-library"
import FiscalcYear from "../../../../controler/services/fiscalYear/apiRequest";
import IAddEdit from '../../../../controler/model/IFiscalYear';
import { Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { notification } from 'antd';
import moment, { Moment } from "jalali-moment";



function FiscalYearModalHook(props: any) {
	const [form] = Form.useForm();

	const [isActive, setIsActive] = useState<boolean>(false);

	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);

	useEffect(() => {
		if (props.isUpdate) {
			setIsLoadingRecordForEdit(true);
			FiscalcYear.GetFiscalYearById({ id: props.fiscalYearId }).then((response) => {


				let isActiveSt = response?.data?.Result?.IsActive;
				setIsActive(isActiveSt)
				const beginDate = moment(response?.data?.Result?.FromDate)
				const endDate = moment(response?.data?.Result?.ToDate)
				form.setFieldsValue({
					id: props.fiscalYearId,
					title: response?.data?.Result?.Title,
					beginDate,
					endDate
				});

				setIsLoadingRecordForEdit(false);
			})
		}
		else{
			form.setFieldsValue({
				beginDate: moment(),
				endDate: moment()
			});
		}
		
	}, [props.fiscalYearId]);

	
	

	const onFinish = (values: any) => {
		setIsLoadingSubmitBtn(true);

		let fiscalYearAdd: IAddEdit = {
			title: Number(values.title),
			fromDate:DateConvertor.jalaliConvertToUTC(values.beginDate),
			toDate: DateConvertor.jalaliConvertToUTC(values.endDate),
			isActive: isActive,
			sortId: 0
		};

		let fiscalYearEdit: any = {
			id: values.id,
			title: Number(values.title),
			fromDate: DateConvertor.jalaliConvertToUTC(values.beginDate),
			toDate: DateConvertor.jalaliConvertToUTC(values.endDate),
			isActive: isActive,
			sortId: 0
		};

		if (props.isUpdate) {
			FiscalcYear.UpdateFiscalYear(fiscalYearEdit).then((response) => {
				if (response?.data?.IsSucceed) {
					Notification.success({
						message: " با موفقیت ثبت شد."
					})
					props.reloadTable();
					props.onCloseAddEditMoadl();
				}

			})
				.finally(() => {
					setIsLoadingSubmitBtn(false);
				})
		} else {

			FiscalcYear.InsertFiscalYear(fiscalYearAdd).then((response) => {
				if (response?.data?.IsSucceed) {
					Notification.success({
						message: " با موفقیت ثبت شد.",
						duration:0
					})
					props.onCloseAddEditMoadl();
					props.reloadTable();
				}

			})
				.finally(() => {
					setIsLoadingSubmitBtn(false);
				})
		}
	};

	const onChangeIsActiveSwitch = (val: any) => {
		setIsActive(!isActive)
	}

	return {
		form,
		isActive,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		onFinish,
		onChangeIsActiveSwitch
	}
}
export default FiscalYearModalHook;