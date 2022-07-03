import { useState} from "react";
import SignatureApi from "../../../../controler/services/signature/apiRequest";
import { Form } from 'antd';
import { Notification } from 'sanhab-components-library';

function UpdateSignatureImageModalHook(props: any) {
	const [form] = Form.useForm();


	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);

	const [searchedUserNameList, setSearchedUserNameList] = useState<any[]>([]);
	const [isLoadingQuickSearch, setIsLoadingQuickSearch] = useState<boolean>(false);


// console.log("props.signatureId",props.signatureId)
	const onFinish = (values: any) => {

		setIsLoadingSubmitBtn(true);

		let signatureEdit: any = {
			id: props.signatureId,
			image: values.image.file,

		};
		SignatureApi.UpdateImage(signatureEdit).then((response: any) => {
			setIsLoadingSubmitBtn(false);
			if (response?.data?.IsSucceed) {
				Notification.success({ message: ' با موفقیت ثبت شد.' });
				if(props.isChild) {
					props.reloadLevelOneTable()
				}
				else{
					props.reloadTable();
				}
				props.onCloseUpdateSignatureImageMoadl();
			}

		})
			.finally(() => {
				setIsLoadingSubmitBtn(false);
			})

	};


	let timer: any;
	let timeout = 800;
	const onSearchUserName = (keyword: string) => {
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

	return {
		form,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		searchedUserNameList,
		isLoadingQuickSearch,
		onFinish,
		onSearchUserName
	}
}
export default UpdateSignatureImageModalHook;