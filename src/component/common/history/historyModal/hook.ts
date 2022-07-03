import { useState, useEffect, useContext } from "react";
import FiscalYearApi from "../../../../controler/services/fiscalYear/apiRequest";
import FiscalPeriodApi from "../../../../controler/services/fiscalPeriod/apiRequest";
import CumulativesParticipatingOfInterestsApi from "../../../../controler/services/cumulativesParticipatingOfInterests/apiRequest";
import MandatoryApi from "../../../../controler/services/mandatory/apiRequest";
import FieldStatusApi from "../../../../controler/services/fieldStatus/apiRequest";
import BordereauApi from "../../../../controler/services/bordereau/apiRequest";
import FieldApi from "../../../../controler/services/field/apiRequest";
import SignatureApi from "../../../../controler/services/signature/apiRequest";

import HistoryContext from '../context/context'

function ViewFieldHistoryModalHook(props: any) {

	const historyContext = useContext(HistoryContext)




	const [current, setCurrent] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [pageModel, setPageModel] = useState({
		pageSize: 10,
		firstPageSize: 10
	});

	const [isLoadingTable, setIsLoadingTable] = useState(false);
	const [dataSource, setDataSource] = useState<any[]>([]);


	const parent: "fiscalYear" | "fiscalPeriod" | "cumulativesParticipatingOfInterests" | "field" | "mandatory" | "fieldStatus" | "bordereau" | "signature" = props.parent

	let Api: any;
	switch (parent) {
		case "fiscalYear":
			Api = FiscalYearApi;
			break;
		case "fiscalPeriod":
			Api = FiscalPeriodApi;
			break;
		case "cumulativesParticipatingOfInterests":
			Api = CumulativesParticipatingOfInterestsApi;
			break;
		case "field":
			Api = FieldApi;
			break;
		case "mandatory":
			Api = MandatoryApi;
			break;
		case "fieldStatus":
			Api = FieldStatusApi;
			break;
		case "bordereau":
			Api = BordereauApi;
			break;
		case "signature":
			Api = SignatureApi;
			break;

		default:
			break;
	}

	useEffect(() => {

		setIsLoadingTable(true);

		let currentPage = historyContext.isFilterResubmitted ? 1 : current
		setCurrent(currentPage)

		let historyInput = {}
		if (props.isTotalHistory) {
			historyInput = {
				pageSize: pageModel.pageSize,
				pageIndex: currentPage,
				firstPageSize: pageModel.pageSize,
				orderBy: "Id",
				filters: historyContext.submittedFilters
			}
		}
		else {
			historyInput = {
				pageSize: pageModel.pageSize,
				pageIndex: currentPage,
				firstPageSize: pageModel.pageSize,
				orderBy: "Id",
				filters: [...historyContext.submittedFilters, {
					propertyName: "IdentifierValue",
					operator: 1,
					value: `${props.recordId}`,
					operand: 0,
					isOpenGroup: false,
					isCloseGroup: false
				}]
			}
		}



		if (props.isParentHistory != undefined && props.isParentHistory) {
			Api.ParentHistoryAdvancedSearch(historyInput).then((response: any) => {
				if (response?.data?.IsSucceed) {
					setTotalCount(response?.data?.TotalCount);


					let data = response?.data?.Result?.map((record: any) => {
						let obj = {
							key: record?.RecordId,
							id: record?.Id,
							aliasValue: record?.AliasValue ?? "",
							eventTypePersianTitle: record?.EventTypePersianTitle,
							date: record?.Date,
							userName: record?.UserName,
							modifiedValues: record?.ModifiedValues,
							description: record?.Description,

						};
						return obj;
					});

					setDataSource(data);

				}
			})
				.finally(() => {
					historyContext.onResubmitFilter(false);
					setIsLoadingTable(false);
				})
		}
		else {
			Api.HistoryAdvancedSearch(historyInput).then((response: any) => {
				if (response?.data?.IsSucceed) {
					setTotalCount(response?.data?.TotalCount);


					let data = response?.data?.Result?.map((record: any) => {
						let obj = {
							key: record?.RecordId,
							id: record?.Id,
							aliasValue: record?.AliasValue ?? "",
							eventTypePersianTitle: record?.EventTypePersianTitle,
							date: record?.Date,
							userName: record?.UserName,
							modifiedValues: record?.ModifiedValues,
							description: record?.Description,

						};
						return obj;
					});

					setDataSource(data);

				}
			})
				.finally(() => {
					historyContext.onResubmitFilter(false);
					setIsLoadingTable(false);
				})
		}

	}, [current, props.shoudSearchAgain, historyContext.shouldMakeAdvancedSearchAgain, pageModel, historyContext.recordId])



	const changePageHandler = (current: number, pageSize: any) => {
		let currentPage = historyContext.isFilterResubmitted ? 1 : current
		setCurrent(currentPage);
		if (pageSize === 0) pageSize = 1;
		setPageModel({
			pageSize: pageSize,
			firstPageSize: pageSize
		})

	};

	return {
		changePageHandler,
		isLoadingTable,
		dataSource,
		current,
		totalCount,
		pageModel
	}
}
export default ViewFieldHistoryModalHook;