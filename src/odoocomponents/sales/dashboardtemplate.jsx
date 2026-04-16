import GroupCards from "../../sharedcomponents/groupcards";
import PieChartcomponent from "../../sharedcomponents/piechart";
import Linechartcomponent from "../../sharedcomponents/linechart";
import Barchartcomponent from "../../sharedcomponents/barchart";
import Areachartcomponent from "../../sharedcomponents/areachart";
import background from "../../assets/background.jpg" ; 
import  Chatbotpoint from "../../sharedcomponents/chatbotpoint";
import ModalWidget from "../../sharedcomponents/modal";
import {  useState } from "react";

export default function Dashboardtemplate({data , statistics}){
      const [openchat , setopenchat] = useState(false);

    return (
         <div style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", overflow: "auto", height: "100vh", width: "100vw" }} >
    <div className="grid gap-y-1 grid-cols-4 content-start">
      <GroupCards statistics={statistics} />
     <PieChartcomponent statistics={statistics} />
    </div>
      <div className="grid gap-y-1 grid-cols-4 content-start ">
     <Linechartcomponent statistics={statistics} />
     <Areachartcomponent statistics={statistics} />
     </div>
    
     <div className="mt-[50px]">
      <Barchartcomponent statistics={statistics} />
      
</div>
    
    <div onClick={() => setopenchat(true)}>
      <Chatbotpoint size="medium" color="secondary" aria-label="add" type="add" className="fixed bottom-5 right-5" />
    </div>
    <ModalWidget data={data} open={openchat} onClose={() => setopenchat(false)} className="flex items-center justify-center" />
  </div>
    )
}