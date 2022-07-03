// component ===============================================
import React, { useEffect } from "react";
import { Login } from "sanhab.mct.uicomponents.login";
import { ConfigProvider, Layout, ILayoutLink, AuthValue } from "sanhab-components-library";
import GetAllErrorType from "./controler/helper/GetAllErrorType";

import FiscalPeriod from './component/pages/fiscalPeriod';
import FiscalYear from './component/pages/fiscalYear';
import CumulativesParticipatingOfInterests from './component/pages/cumulativesParticipatingOfInterests';
import Field from './component/pages/field';
import Currency from './component/pages/currency';
import Mandatory from './component/pages/mandatory';
import FieldStatus from './component/pages/fieldStatus';
import Bordereau from './component/pages/bordereau';
import Signature from './component/pages/signature';
import HttpBaseConstant from "./controler/services/HttpBaseConstant";
import GlobalContext from "./controler/context/store";
import HistoryContext from "./component/common/history/context/store";

// styles ===============================================
import "./assets/styles/main.sass";
import "sanhab.mct.uicomponents.login/dist/index.css";
import "sanhab-components-library/src/assets/styles/main.sass";
import "antd/dist/antd.css";

const links: ILayoutLink[] = [
  {
    path: "",
    title: "اطلاعات پایه",
    accessId: true,
    component: undefined,
    subLink: [
      {
        path: "/fiscalYear",
        title: "سال مالی",
        accessId: true,
        component: FiscalYear,
        subLink: []
      },
      {
        path: '/fiscalperiod',
        title: "دوره مالی",
        accessId: true,
        component: FiscalPeriod,
        subLink: []
      },
      {
        path: '/cumulativesparticipating',
        title: "آیین نامه مشارکت منافع",
        accessId: true,
        component: CumulativesParticipatingOfInterests,
        subLink: []
      },
      {
        path: '/field',
        title: "تعریف رشته",
        accessId: true,
        component: Field,
        subLink: []
      },
      {
        path: '/currency',
        title: "ارز",
        accessId: true,
        component: Currency,
        subLink: []
      },
      {
        path: '/mandatory',
        title: "اطلاعات اتکایی اجباری",
        accessId: true,
        component: Mandatory,
        subLink: []
      },
      {
        path: '/fieldStatus',
        title: "تعیین وضعیت رشته ها",
        accessId: true,
        component: FieldStatus,
        subLink: []
      },
      {
        path: '/bordereau',
        title: "بردرو",
        accessId: true,
        component: Bordereau,
        subLink: []
      },
      {
        path: '/signature',
        title: "امضا",
        accessId: true,
        component: Signature,
        subLink: []
      }
    ]
  }

]

function App() {
  
  useEffect(() => {
    if (AuthValue()?.token) {
      GetAllErrorType();
    }
  }, []);

  return (
    <ConfigProvider>
      <GlobalContext>
        <HistoryContext>
          <Layout
            softwareCode={5000}
            links={links}
            authorizationUrl={`${HttpBaseConstant.login}`}
            backendUrl={HttpBaseConstant.url}
            loginComponent={(
              <Login
                pushPath="/"
                timer={1140}
                submitUrl={`${HttpBaseConstant.login}/security/captchalogin`}
                captchaUrl={`${HttpBaseConstant.login}/Captcha/GetBase64`}
              />
            )}
          />
        </HistoryContext>
      </GlobalContext>
    </ConfigProvider>
  );
}

export default App;
