import React, { useState, useEffect } from "react";
import MandatoryApi from "../../../../controler/services/mandatory/apiRequest";
import { Form } from 'antd';
import { Notification, DateConvertor } from 'sanhab-components-library'

import momentJalaali from "moment-jalaali";
import dayjs, { Dayjs } from 'dayjs';
import jalaliday from 'jalaliday'
dayjs.extend(jalaliday)

function MandatoryModalHook(props: any) {
	const [form] = Form.useForm();


	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	

	const onFinish = (values: any) => {
		setIsLoadingSubmitBtn(true);

		let mandatoryAdd: any = {
			id: props.copyModalData.parentId,
			companyId: props.copyModalData.companyId,
			fiscalyearId: values.fiscalyearId,
			reinsuranceSharePercentage: values.percentageOfRelianceShare ?? 0,
			effectiveDateFrom:DateConvertor.jalaliConvertToUTC(values.effectiveDateFrom),
			effectiveDateTo: DateConvertor.jalaliConvertToUTC(values.effectiveDateTo),

		};



		MandatoryApi.Copy(mandatoryAdd).then((response: any) => {
			setIsLoadingSubmitBtn(false);
			if (response?.data?.IsSucceed) {
				Notification.success({message: ' با موفقیت ثبت شد.'});
				props.onCloseCopyModal();
				props.reloadLevelOneTable(props.copyModalData.companyId);
			}

		})
	};



	

	return {
		form,
		isLoadingSubmitBtn,
		onFinish
	}
}
export default MandatoryModalHook;