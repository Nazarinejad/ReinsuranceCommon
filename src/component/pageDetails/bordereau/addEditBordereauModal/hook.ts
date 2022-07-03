import { useState, useEffect } from "react";
import { Notification } from "sanhab-components-library"
import Bordereau from "../../../../controler/services/bordereau/apiRequest";
import { Form } from 'antd';



function BordereauModalHook(props: any) {
	const [form] = Form.useForm();


	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);
	const [isCredit, setIsCredit] = useState<boolean>(false);
	const [hasCommision, setHasCommision] = useState<boolean>(false);

	useEffect(() => {
		if (props.isUpdate) {
			setIsLoadingRecordForEdit(true);
			Bordereau.GetBordereauById({ id: props.bordereauId }).then((response) => {
				let hasCommisionSt = response?.data?.Result?.HasCommission;
				setHasCommision(hasCommisionSt)

				let isCreditSt = response?.data?.Result?.IsCredit;
				setIsCredit(isCreditSt)

				form.setFieldsValue({
					id: props.bordereauId,
					title: response?.data?.Result?.Title,
					accountingCode: response?.data?.Result?.AccountingCode,
					hasCommision: response?.data?.Result?.HasCommission,
				});

				setIsLoadingRecordForEdit(false);
			})
		}
		
	}, [props.bordereauId]);

	
	

	const onFinish = (values: any) => {
		setIsLoadingSubmitBtn(true);

		let bordereauAdd: any = {
			title: values.title,
			accountingCode: values.accountingCode,
			isCredit: isCredit,
			hasCommission: hasCommision
		};

		let bordereauEdit: any = {
			id: values.id,
			title: values.title,
			accountingCode: values.accountingCode,
			isCredit: isCredit,
			hasCommission: hasCommision
		};

		if (props.isUpdate) {
			Bordereau.UpdateBordereau(bordereauEdit).then((response) => {
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

			Bordereau.InsertBordereau(bordereauAdd).then((response) => {
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


	const onChangeIsCreditCheckbox = (val: any) => {
		setIsCredit(!isCredit)
	}

	const onChangeHasCommisionCheckbox = (val: any) => {
		setHasCommision(!hasCommision)
	}


	return {
		form,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		isCredit,
		hasCommision,
		onFinish,
		onChangeIsCreditCheckbox,
		onChangeHasCommisionCheckbox
	}
}
export default BordereauModalHook;