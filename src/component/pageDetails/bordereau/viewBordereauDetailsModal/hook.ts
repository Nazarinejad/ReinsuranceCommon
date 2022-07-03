import { useState, useEffect } from "react";
import BordereauApi from "../../../../controler/services/bordereau/apiRequest";

function ViewBordereauDetailsModalHook(props: any) {
	const [isLoadingRecord, setIsLoadingRecord] = useState(false);
	const [visiblePopConfirmBox, setVisiblePopConfirmBox] = useState(false);

	

	const [recordData, setRecordData] = useState<any>({
		id: 0,
		title: "",
		accountingCode: 0,
		isCredit: false,
		hasCommission: false
	});



	useEffect(() => {
		setIsLoadingRecord(true);
		BordereauApi.GetBordereauById({ id: props.bordereauId }).then((response: any) => {


			setRecordData({
				id: props.bordereauId,
				title: response?.data?.Result?.Title,
				accountingCode: response?.data?.Result?.AccountingCode,
				isCredit: response?.data?.Result?.IsCredit,
				hasCommission: response?.data?.Result?.HasCommission,
			});



			setIsLoadingRecord(false);
		})
	}, [props.bordereauId]);



	const editBordereauHandler = (id: number) => {
		props.editRecordHandler(id)
		props.onCloseModal();
	};

	const deleteBordereauHandler = (id: number) => {
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

	const viewDetails = (id: number) => {
        props.viewRecordDetailsHandler(id)
	};
	
	return {
		isLoadingRecord,
		recordData,
		visiblePopConfirmBox,
		editBordereauHandler,
		deleteBordereauHandler,
		showPopconfirm,
		onConfirmDelete,
		handleCancelDelete,
		viewDetails
	}
}
export default ViewBordereauDetailsModalHook;