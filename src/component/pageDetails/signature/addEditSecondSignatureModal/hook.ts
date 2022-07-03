import React, { useState, useEffect } from "react";
import SignatureApi from "../../../../controler/services/signature/apiRequest";
import { Form } from 'antd';
import { Notification } from 'sanhab-components-library';

function SignatureModalHook(props: any) {
	const [form] = Form.useForm();

	const [isActive, setIsActive] = useState<boolean>(false);
	const [noLossRatio, setNoLossRatio] = useState<boolean>(false);
	const [failureToCalculateReserves, setFailureToCalculateReserves] = useState<boolean>(false);
	const [isCovrage, setIsCovrage] = useState<boolean>(false);
	const [isCalculatedCovrage, setIsCalculatedCovrage] = useState<boolean>(false);
	const [isCreationGroup, setIsCreationGroup] = useState<boolean | undefined>(undefined);


	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);

	const [searchedUserNameList, setSearchedUserNameList] = useState<any[]>([]);
	const [isLoadingQuickSearch, setIsLoadingQuickSearch] = useState<boolean>(false);

	useEffect(() => {
		if (props.isUpdate) {
			setIsCreationGroup(true);
			setIsLoadingRecordForEdit(true);
			SignatureApi.GetSecondSignatureById({id:props.signatureId}).then((response: any) => {


				let username: string | null;
				if (response?.data?.Result?.UserName == null) 
				{
					username = "";
					setSearchedUserNameList([])
					
				}
				else {
					username = response?.data?.Result?.UserName;
					setSearchedUserNameList([{ Username: response?.data?.Result?.UserName }])
				} 


				form.setFieldsValue({
					id: props.signatureId,
					name: response?.data?.Result?.Name,
					userName:username,
					department: response?.data?.Result?.Department,
					image: response?.data?.Result?.Image,
					companyId: response?.data?.Result?.CompanyId,
					signatureId: response?.data?.Result?.SignatureId,
				});


				setIsLoadingRecordForEdit(false);
			})
		}
	}, [props.signatureId]);



	const onFinish = (values: any) => {
		console.log("valuesss= ", values)
		setIsLoadingSubmitBtn(true);

		let username:string|null;
		if(values.userName != undefined && values.userName != "") username = values.userName
		else username = null;
		

		

		if (props.isUpdate) {
			let signatureEdit: any = {
				id:values.id,
				department: props.parentData.departmentId,
				parentId: props.parentData.parentId,
				userName: username,
				name: values.name,
				companyId: values.companyId,
				signatureId: values.signatureId,
	
			};
			SignatureApi.UpdateSecondSignature(signatureEdit).then((response: any) => {
				setIsLoadingSubmitBtn(false);
				if (response?.data?.IsSucceed) {
					Notification.success({message:  ' با موفقیت ثبت شد.'});
					props.reloadLevelOneTable();
					props.onCloseAddEditSecondMoadl();
				}

			})
				.finally(() => {
					setIsLoadingSubmitBtn(false);
				})
		} else {
			let signatureAdd: any = {
				department: props.parentData.departmentId,
				parentId: props.parentData.parentId,
				userName: username,
				name: values.name,
				image: values.image.file,
				companyId: values.companyId,
				signatureId: values.signatureId,
	
			};
			SignatureApi.InsertSecondSignature(signatureAdd).then((response: any) => {
				setIsLoadingSubmitBtn(false);
				if (response?.data?.IsSucceed) {
					Notification.success({ message: ' با موفقیت ثبت شد.' });
					props.onCloseAddEditSecondMoadl();
					props.reloadLevelOneTable();
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

	const onChangeNoLossRatioCheckbox = (val: any) => {
		setNoLossRatio(!noLossRatio)
	}

	const onChangeFailureToCalculateReservesCheckbox = (val: any) => {
		setFailureToCalculateReserves(!failureToCalculateReserves)
	}

	const onChangeIsCovrageCheckbox = (val: any) => {
		setIsCovrage(!isCovrage)
	}

	const onChangeIsCalculatedCovrageCheckbox = (val: any) => {
		setIsCalculatedCovrage(!isCalculatedCovrage)
	}

	const onChangeCreationType = (val: string) => {
		if (val === "fieldGroup") setIsCreationGroup(false);
		else if (val === "subField") setIsCreationGroup(true);
	}

	let timer: any;
	let timeout = 800;
	const onSearchUserName = (keyword: string) => {
		if (keyword.length >= 2) {
			clearTimeout(timer);
			timer = setTimeout(function () {
				setIsLoadingQuickSearch(true)
				SignatureApi.QuickSearch({
					firstPageSize: 100,
					pageSize: 100,
					pageIndex: 1,
					orderBy: "",
					keyword: keyword
				})
					.then((response) => {
						if (response?.data?.IsSucceed) {
							setSearchedUserNameList(response?.data?.Result)
						}
					})
					.finally(() => {
						setIsLoadingQuickSearch(false)
					})
			}, timeout);
		}

	}

	return {
		form,
		isActive,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		noLossRatio,
		failureToCalculateReserves,
		isCovrage,
		isCalculatedCovrage,
		isCreationGroup,
		searchedUserNameList,
		isLoadingQuickSearch,
		onFinish,
		onChangeIsActiveSwitch,
		onChangeNoLossRatioCheckbox,
		onChangeFailureToCalculateReservesCheckbox,
		onChangeIsCovrageCheckbox,
		onChangeIsCalculatedCovrageCheckbox,
		onChangeCreationType,
		onSearchUserName
	}
}
export default SignatureModalHook;