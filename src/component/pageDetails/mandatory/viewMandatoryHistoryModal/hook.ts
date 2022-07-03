import React, { useState, useEffect } from "react";
import MandatoryApi from "../../../../controler/services/mandatory/apiRequest";

function ViewMandatoryHistoryModalHook(props: any) {
	const [isLoadingRecord, setIsLoadingRecord] = useState(false);
	const [dataSource, setDataSource] = useState<any[]>([]);

	
	

	


	useEffect(() => {
		setIsLoadingRecord(true);


		if(props.isLvlTwoRecord){
			MandatoryApi.GetHistoriesByIdAndChildId({ id:props.parentId,  childId: props.mandatoryId }).then((response: any) => {
			
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
		}
		else{
			MandatoryApi.GetHistoriesById({ id: props.mandatoryId }).then((response: any) => {
			
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
		}
		
	}, [props.mandatoryId]);



	

	return {
		isLoadingRecord,
		dataSource
	}
}
export default ViewMandatoryHistoryModalHook;