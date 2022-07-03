import { useContext } from 'react'
import { Tabs } from 'antd';
import Tab1_Registration from '../../../pageDetails/fieldStatus/tab1_registration/index'
import Tab2_WaitingForCheck from '../../../pageDetails/fieldStatus/tab2_waitingForCheck/index'
import Tab3_Approved from '../../../pageDetails/fieldStatus/tab3_approved/index'
import Tab4_NotApproved from '../../../pageDetails/fieldStatus/tab4_notApproved/index'
import FieldStatusContext from "../../../pages/fieldStatus/context/context";
import GlobalContext from '../../../../controler/context/context';
const { TabPane } = Tabs;




const FieldStatus = () => {
    const globalContext = useContext(GlobalContext)
    const context = useContext(FieldStatusContext)

    function onChangeActiveTab(key: string) {
        globalContext.closeCollapsiblePanel()
        context.setTableLoadingTrue()
        context.onSetFetchRequest(true)
        context.onSetActiveTab(key)
        context.onSetShowLoader()
    }

    return (
        <>
            <Tabs
                className="main_tab m-t-16"
                defaultActiveKey="1"
                onChange={onChangeActiveTab}>

                <TabPane tab="ثبت شرکت بیمه" key="1">
                    <Tab1_Registration />
                </TabPane>
                <TabPane tab="بررسی بیمه مرکزی" key="2">
                    <Tab2_WaitingForCheck />
                </TabPane>
                <TabPane tab="تایید شده" key="3">
                    <Tab3_Approved />
                </TabPane>
                <TabPane tab="تایید نشده" key="4">
                    <Tab4_NotApproved />
                </TabPane>
            </Tabs>

        </>
    )
}
export default FieldStatus