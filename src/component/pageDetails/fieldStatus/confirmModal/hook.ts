import { useState, useEffect, useContext } from "react";
import FieldStatusApi from "../../../../controler/services/fieldStatus/apiRequest";
import { Form } from 'antd';
import FieldStatusContext from '../../../pages/fieldStatus/context/context'
import { Notification } from 'sanhab-components-library'

function ConfirmModalHook(props: any) {
	const [confirmSentence, setConfirmSentence] = useState<string>("");
	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const [form] = Form.useForm();
	const context = useContext(FieldStatusContext)

	useEffect(() => {
		switch (props.confirmationType) {
			case "sendToCheck":
				setConfirmSentence("ارسال به بررسی بیمه مرکزی ")
				setSuccessMessage("با موفقیت به بررسی بیمه مرکزی ارسال شد")
				break;

			case "sendToRegisteration":
				setConfirmSentence("ارسال به  ثبت شرکت بیمه  ")
				setSuccessMessage("با موفقیت به ثبت شرکت بیمه  ارسال شد")
				break;

			case "sendToRecheck":
				setConfirmSentence("ارسال به بررسی بیمه مرکزی ")
				setSuccessMessage("با موفقیت به بررسی بیمه مرکزی ارسال شد")
				break;

			case "disapprove":
				setConfirmSentence("عدم تایید")
				setSuccessMessage('عملیات "عدم تایید" با موفقیت انجام شد')
				break;

			case "approve":
				setConfirmSentence(" تایید")
				setSuccessMessage('عملیات " تایید" با موفقیت انجام شد')
				break;

			default:
				setConfirmSentence("")
				break;
		}
	}, [])

	const nazari = () => {

		const requestBody = {
			id: props.id,
			description: form.getFieldValue("description")
		}
		switch (props.confirmationType) {
			case "sendToCheck":
				return FieldStatusApi.ChangeStatusForFirstTab(requestBody)
			case "sendToRegisteration":
				return FieldStatusApi.ChangeStatusForSecondTab(requestBody)
			case "sendToRecheck":
				return FieldStatusApi.ChangeStatusForFourthAndThirdTab(requestBody)
			case "disapprove":
				return FieldStatusApi.DisApprove(requestBody)
			case "approve":
				return FieldStatusApi.Approve(requestBody)
			
			default:
				return FieldStatusApi.ChangeStatusForSecondTab(requestBody)
		}
	}

	const onFinish = () => {
		setIsLoadingSubmitBtn(true);

		nazari()
			.then((response) => {
				if (response?.data?.IsSucceed) {
					context.onSetReloadTable()
					Notification.success({
						message: successMessage
					})
					props.onCloseModal()
				}
			})
			.finally(() => {
				setIsLoadingSubmitBtn(false);
			})


			
		
		
		
		

	}







	return {
		confirmSentence,
		form,
		isLoadingSubmitBtn,
		onFinish
	}
}
export default ConfirmModalHook;