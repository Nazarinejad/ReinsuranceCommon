import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import { IAddSubFieldRequestBody, IAddFieldRequestBody, IEditRequestBody, IAllPagedRequestBody, IGetRequestBody, IActiveOrDeactiveRequestBody, IAdvancedsearchRequestBody, IAllPagedSubTableRequestBody, IChildAdvancedsearchRequestBody } from "./models"
import HttpBaseConstant from "../HttpBaseConstant"

class FieldApiRequest extends HttpBaseService {
    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/SubField/GetListedPage", requestBody)
    }

    AllPagedSubTable = (requestBody: IAllPagedSubTableRequestBody): Promise<any> => {
        return this.send.post("/SubField/GetListedPageSubField", requestBody)
    }

    InsertSubField = (requestBody: IAddSubFieldRequestBody): Promise<any> => { //todo
        return this.send.post("/SubField/CreateSubField", requestBody)
    }

    InsertField = (requestBody: IAddFieldRequestBody): Promise<any> => {
        return this.send.post("/SubField/CreateField", requestBody)
    }

    GetFieldById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/SubField/GetById`, requestBody)
    }

    GetAllSubFieldsByFieldId = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/SubField/GetAllSubFieldsByFieldId`, requestBody)
    }

    GetAllCumulativesParticipating = (): Promise<any> => {
        return this.send.get(`/common/GetAllCumulativesParticipatingOfInterests`)
    }

    GetAllFields = (): Promise<any> => {
        return this.send.get(`/common/GetAllFields`)
    }

    GetAllDepartments = (): Promise<any> => {
        return this.send.get("/Common/GetAllDepartment")
    }

    UpdateField = (requestBody: IEditRequestBody): Promise<any> => { // todo
        return this.send.put("/SubField/Update", requestBody)
    }

    ActiveOrDeactiveField = (requestBody: IActiveOrDeactiveRequestBody): Promise<any> => {
        return this.send.put("/SubField/ActivateOrDeActivate", requestBody)
    }

    GetHistoriesById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post("/SubField/GetHistoriesById", requestBody)
    }

    DeleteField = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.delete('/SubField/Delete', { data: requestBody })
    }

    AdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/SubField/AdvancedSearch", requestBody)
    }

    SubFieldAdvancedSearch = (requestBody: IChildAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/SubField/SubFieldAdvancedSearch", requestBody)
    }

    HistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/SubField/HistoryAdvancedSearch", requestBody)
    }

    ParentHistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/SubField/HistoryAdvancedSearchFirst", requestBody)
    }

    GetExcelReport = (): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.get("/SubField/Excel")
                .then((response: AxiosResponse<IApiResult<IFileDownload>>) => {
                    if (response?.data?.IsSucceed && response?.data?.Result) {
                        DownloaderFile({
                            contentType: response?.data?.Result?.FileContentType,
                            contents: response?.data?.Result?.FileContents,
                            fileExtension: response?.data?.Result?.FileExtension,
                            fileName: response?.data?.Result?.FileName
                        })
                    }
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

}

export default new FieldApiRequest({ url: HttpBaseConstant.url })