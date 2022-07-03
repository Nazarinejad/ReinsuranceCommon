import { HttpBaseService, IApiResult, DownloaderFile, IFileDownload } from "sanhab-components-library";
import { AxiosResponse } from 'axios'
import { IAddRequestBody, IEditRequestBody, IAllPagedRequestBody, IDeleteRequestBody, IGetRequestBody, IActiveOrDeactiveRequestBody } from "./models"
import HttpBaseConstant from "../HttpBaseConstant"
import { IAdvancedsearchRequestBody } from '../../model/IAdvancedSearch'

class BordereauApiRequest extends HttpBaseService {
    AllPaged = (requestBody: IAllPagedRequestBody): Promise<any> => {
        return this.send.post("/Bordereau/GetListedPage", requestBody)
    }

    InsertBordereau = (requestBody: IAddRequestBody): Promise<any> => {
        return this.send.post("/Bordereau/Create", requestBody)
    }

    GetBordereauById = (requestBody: IGetRequestBody): Promise<any> => {
        return this.send.post(`/Bordereau/getById`, requestBody)
    }

    UpdateBordereau = (requestBody: IEditRequestBody): Promise<any> => {
        return this.send.put("/Bordereau/Update", requestBody)
    }

    ActiveOrDeactiveFiscalPeriod = (requestBody: IActiveOrDeactiveRequestBody): Promise<any> => {
        return this.send.put("Bordereau/ActivateOrDeActivate", requestBody)
    }

    DeleteBordereau = (requestBody: IDeleteRequestBody): Promise<any> => {
        return this.send.delete(`/Bordereau/Delete`, { data: requestBody })
    }


    GetExcelReport = (): Promise<AxiosResponse<IApiResult<IFileDownload>>> => {
        return new Promise((resolve, reject) => {
            this.send.get("/Bordereau/Excel")
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
        return this.send.post("/Bordereau/AdvancedSearch", requestBody)
    }

    HistoryAdvancedSearch = (requestBody: IAdvancedsearchRequestBody): Promise<any> => {
        return this.send.post("/Bordereau/HistoryAdvancedSearch", requestBody)
    }

    // CompanyList = (): Promise<any> => {
    //     return this.send.get("/PassengerPolicyInquiry/CompanyList")
    // }
}

export default new BordereauApiRequest({ url: HttpBaseConstant.url })