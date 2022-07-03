import React, { useState, useEffect } from "react";
import FieldStatusApi from "../../../../controler/services/fieldStatus/apiRequest";

function ViewHistoryModalHook(props: any) {
	const [isLoadingRecord, setIsLoadingRecord] = useState(false);
	const [dataSource, setDataSource] = useState<any[]>([]);

	
	

	


	useEffect(() => {
		setIsLoadingRecord(true);
		FieldStatusApi.GetHistoriesById({ id: props.id }).then((response: any) => {
			
			let data = response?.data?.Result?.map((record: any) => {
				let obj = {
					key: record?.RecordId,
					id: record?.RecordId,
					actionType: record?.ActionType,
					date: record?.Date,
					userName: record?.UserName,
					description: record?.Description
					
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
export default ViewHistoryModalHook;