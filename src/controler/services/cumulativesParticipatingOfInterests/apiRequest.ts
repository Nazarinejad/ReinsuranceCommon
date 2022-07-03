import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import { IAddRequestBody, IEditRequestBody, IAllPagedRequestBody, IDeleteRequestBody, IGetRequestBody } from "./models"
import HttpBaseConstant from "../HttpBaseConstant"
import { IAdvancedsearchRequestBody } from '../../model/IAdvancedSearch'

class CumulativesParticipatingApiApiRequest extends HttpBaseService {
    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/CumulativesParticipatingOfInterests/GetListedPage", requestBody)
    }

    InsertCumulativesParticipating = (requestBody: IAddRequestBody): Promise<any> => {
        return this.send.post("/CumulativesParticipatingOfInterests/Create", requestBody)
    }

    GetCumulativesParticipatingById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/CumulativesParticipatingOfInterests/getById`, requestBody)
    }

    GetAllCumulativeRequlations = (): Promise<any> => {
        return this.send.get(`/common/GetTitles`)
    }

    UpdateCumulativesParticipating = (requestBody: IEditRequestBody): Promise<any> => {
        return this.send.put("/CumulativesParticipatingOfInterests/Update", requestBody)
    }

    DeleteCumulativesParticipating = (requestBody: IDeleteRequestBody): Promise<any> => {
        return this.send.delete(`/CumulativesParticipatingOfInterests/Delete`, { data: requestBody })
    }

    GetExcelReport = (): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.get("/CumulativesParticipatingOfInterests/Excel")
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

    AdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/CumulativesParticipatingOfInterests/AdvancedSearch", requestBody)
    }

    HistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/CumulativesParticipatingOfInterests/HistoryAdvancedSearch", requestBody)
    }


}


export default new CumulativesParticipatingApiApiRequest({ url: HttpBaseConstant.url })