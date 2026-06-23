import GroupCards from "../sharedcomponents/groupcards";
import PieChartcomponent from "../sharedcomponents/piechart";
import Linechartcomponent from "../sharedcomponents/linechart";
import Barchartcomponent from "../sharedcomponents/barchart";
import Areachartcomponent from "../sharedcomponents/areachart";
import Chatbotpoint from "../sharedcomponents/chatbotpoint";
import ModalWidget from "../sharedcomponents/modal";
import { useState } from "react";

export default function Dashboardtemplate({ data, module, statistics }) {
    const [openchat, setopenchat] = useState(false);
    
    switch (module) {
        case "sale":
            return (
                <div className="w-full p-4"> 
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
                        <GroupCards statistics={statistics} module={module} />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="bg-red-200">
                        <Linechartcomponent statistics={statistics} module={module} />
                        </div>
                        <div className="bg-red-200">
                        <Areachartcomponent statistics={statistics} module={module} />
                        </div>
                    </div>
                    <div className="mt-3 grid gap-4 grid-cols-2">
                        <div className="bg-red-200">
                        <Barchartcomponent statistics={statistics} module={module} />
                       </div>
                        <div className="bg-red-200">
                        <PieChartcomponent statistics={statistics} module={module} />
                    </div>
                    </div>
                    <div onClick={() => setopenchat(true)}>
                        <Chatbotpoint size="medium" color="secondary" aria-label="add" type="add" className="fixed bottom-5 right-5" />
                    </div>
                    <ModalWidget data={data} open={openchat} onClose={() => setopenchat(false)} className="flex items-center justify-center" module={module} />
                </div>
            )
        case "account":
            return (
                <div className="w-full p-4"> 
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
                        <GroupCards statistics={statistics} module={module} />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
                          <div className="bg-red-200 ">
                            <PieChartcomponent statistics={statistics} module={module} />
                          </div>
                            <div className="bg-red-200 ">
                            <Areachartcomponent statistics={statistics} module={module} />
                        </div>
                     </div>
                     <div className="mt-3 grid gap-4 grid-cols-2">
                        <div className="bg-red-200">
                        <Barchartcomponent statistics={statistics} module={module} />
                       </div>
                    </div>
                    <div onClick={() => setopenchat(true)}>
                        <Chatbotpoint size="medium" color="secondary" aria-label="add" type="add" className="fixed bottom-5 right-5" />
                    </div>
                    <ModalWidget data={data} open={openchat} onClose={() => setopenchat(false)} className="flex items-center justify-center" module={module} />   
                </div>  
                
            )
            case "crm" :
            return (
                <div className="w-full p-4"> 
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
                        <GroupCards statistics={statistics} module={module} />
                    </div>
                     <div className="grid gap-4 grid-cols-2">
                          <div className="bg-red-200 ">
                            <PieChartcomponent statistics={statistics} module={module} />
                          </div>
                            <div className="bg-red-200 ">
                            <Areachartcomponent statistics={statistics} module={module} />
                        </div>
                     </div>
                       <div className="mt-3 grid gap-4 grid-cols-2">
                        <div className="bg-red-200">
                        <Barchartcomponent statistics={statistics} module={module} />
                       </div>
                    </div>
                    
                    <div onClick={() => setopenchat(true)}>
                        <Chatbotpoint size="medium" color="secondary" aria-label="add" type="add" className="fixed bottom-5 right-5" />
                    </div>
                    <ModalWidget data={data} open={openchat} onClose={() => setopenchat(false)} className="flex items-center justify-center" module={module} />   
                </div>  
                
            )
            case "product" :
                return (
                <div className="w-full p-4"> 
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
                        <GroupCards statistics={statistics} module={module} />
                    </div>
                     <div className="grid gap-4 grid-cols-2">
                          <div className="bg-red-200 ">
                            <PieChartcomponent statistics={statistics} module={module} />
                          </div>
                            <div className="bg-red-200 ">
                            <Areachartcomponent statistics={statistics} module={module} />
                        </div>
                     </div>
                       <div className="mt-3 grid gap-4 grid-cols-2">
                        <div className="bg-red-200">
                        <Barchartcomponent statistics={statistics} module={module} />
                       </div>
                    </div>
                    
                    <div onClick={() => setopenchat(true)}>
                        <Chatbotpoint size="medium" color="secondary" aria-label="add" type="add" className="fixed bottom-5 right-5" />
                    </div>
                    <ModalWidget data={data} open={openchat} onClose={() => setopenchat(false)} className="flex items-center justify-center" module={module} />   
                </div>  
                
            )
    
    }
}