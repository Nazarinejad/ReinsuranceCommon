import { useState, useEffect } from "react";
import CumulativesParticipatingApi from "../../../../controler/services/cumulativesParticipatingOfInterests/apiRequest";
import {IAddEdit} from '../../../../controler/model/ICumulativesParticipating';
import { Form } from 'antd';
import {Notification} from 'sanhab-components-library'


function AddEditCumulativesParticipatingModalHook(props: any) {
	const [form] = Form.useForm();

	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);
	const [hasPendingLoss, setHasPendingLoss] = useState<boolean>(false);

	

		


	useEffect(() => {

		if (props.isUpdate) {
			setIsLoadingRecordForEdit(true);
			CumulativesParticipatingApi.GetCumulativesParticipatingById({id:props.recordId}).then((response) => {
				let hasPendingLossSt = response?.data?.Result?.ConsiderPendingLoss;
				setHasPendingLoss(hasPendingLossSt)
				
				// let printVersionFormat = "";
				// let printFormat = response?.data?.Result?.PrintVersionFormat;
				// if(printFormat === "NormalFormat")  printVersionFormat = "1"
				// else if(printFormat === "OmrManagementFormat") printVersionFormat = "2";
				
				form.setFieldsValue({
					id: props.recordId,
					title: response?.data?.Result?.Title,
					printVersionFormat: response?.data?.Result?.PrintVersionFormat,
					cumulativeRequlations: response?.data?.Result?.CumulativeRequlations,
					percentageOfParticipation: response?.data?.Result?.PercentageOfParticipation,
					considerPendingLoss: response?.data?.Result?.ConsiderPendingLoss
				});
				
				setIsLoadingRecordForEdit(false);
			})
		}
	}, [props.recordId]);

	

	const onFinish = (values: any) => {

		let cumulativeRequlations = [];
		// cumulativeRequlations = values.cumulativeRequlations == undefined ||  values.cumulativeRequlations?.length<1 ? [0] : values.cumulativeRequlations

		if(values.cumulativeRequlations != undefined){
			if(values.cumulativeRequlations?.length<1) cumulativeRequlations=[0]
			else  cumulativeRequlations = values.cumulativeRequlations
		}
		else{
			cumulativeRequlations=[0]
		}
		
		setIsLoadingSubmitBtn(true);

		let cumulativesParticipatingAdd: IAddEdit = {
			considerPendingLoss: hasPendingLoss,
			title: values.title,
			sortId: 0,
			printVersionFormat: values.printVersionFormat,
			cumulativeRequlations: cumulativeRequlations,
			percentageOfParticipation: Number(values.percentageOfParticipation),
		};

		let cumulativesParticipatingEdit: any = {
			id: values.id,
			title: values.title,
			printVersionFormat: values.printVersionFormat,
			cumulativeRequlations: cumulativeRequlations,
			percentageOfParticipation : Number(values.percentageOfParticipation),
			considerPendingLoss: hasPendingLoss,
			sortId: 0
		};

		if (props.isUpdate) {
			CumulativesParticipatingApi.UpdateCumulativesParticipating(cumulativesParticipatingEdit).then((response)=>{
				setIsLoadingSubmitBtn(false);
				if(response?.data?.IsSucceed){
					Notification.success({message: ' با موفقیت ثبت شد.'});
					props.reloadTable();
					props.onCloseAddEditMoadl();
				}
				
			})
			.catch(()=>{
				setIsLoadingSubmitBtn(false);
			})
		} else {

			CumulativesParticipatingApi.InsertCumulativesParticipating(cumulativesParticipatingAdd).then((response) => {
				setIsLoadingSubmitBtn(false);
				if(response?.data?.IsSucceed){
					Notification.success({message: ' با موفقیت ثبت شد.'});
					props.onCloseAddEditMoadl();
					props.reloadTable();
				}
				
			})
			.catch(()=>{
				setIsLoadingSubmitBtn(false);
			})
		}
	};

	const onChangePendingLossCheckbox = (val: any) => {
		setHasPendingLoss(!hasPendingLoss)
	}


	return {
		form,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		hasPendingLoss,
		onFinish,
		onChangePendingLossCheckbox
	}
}
export default AddEditCumulativesParticipatingModalHook;