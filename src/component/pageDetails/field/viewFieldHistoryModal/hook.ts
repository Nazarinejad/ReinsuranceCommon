import React, { useState, useEffect } from "react";
import FieldApi from "../../../../controler/services/field/apiRequest";

function ViewFieldHistoryModalHook(props: any) {
	const [isLoadingRecord, setIsLoadingRecord] = useState(false);
	const [dataSource, setDataSource] = useState<any[]>([]);

	
	

	


	useEffect(() => {
		setIsLoadingRecord(true);
		FieldApi.GetHistoriesById({ id: props.fieldId }).then((response: any) => {
			
			let data = response?.data?.Result?.map((record: any) => {
				let obj = {
					key: record?.RecordId,
					id: record?.RecordId,
					actionType: record?.ActionType,
					date: record?.Date,
					userName: record?.UserName
					
				};
				return obj;
			});

			setDataSource(data);
			setIsLoadingRecord(false);
		})
	}, [props.fieldId]);



	

	return {
		isLoadingRecord,
		dataSource
	}
}
export default ViewFieldHistoryModalHook;