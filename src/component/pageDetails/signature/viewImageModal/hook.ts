import { useState, useEffect } from "react";
import SignatureApi from "../../../../controler/services/signature/apiRequest";
import { Form } from 'antd';
import { Base64ToArrayBuffer } from 'sanhab-components-library'

function ViewImageModalHook(props: any) {
	const [form] = Form.useForm();


	const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState(false);
	const [isLoadingRecordForEdit, setIsLoadingRecordForEdit] = useState(false);
	const [url, setUrl] = useState("");


	useEffect(() => {
		setIsLoadingRecordForEdit(true);
		SignatureApi.GetImageById({ id: props.signatureId }).then((response: any) => {

			const fileBlob = new Blob([Base64ToArrayBuffer(response?.data?.Result?.FileContents)], { type: response?.data?.Result?.FileContentType });
			const url = window.URL.createObjectURL(fileBlob);
			
			setUrl(url);

			setIsLoadingRecordForEdit(false);
		})
	}, [props.signatureId]);






	return {
		form,
		isLoadingSubmitBtn,
		isLoadingRecordForEdit,
		url
	}
}
export default ViewImageModalHook;