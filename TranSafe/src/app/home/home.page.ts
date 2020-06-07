import { Component } from '@angular/core';
import { SpeedService } from 'src/app/services/speed.service';
import { Observable } from 'rxjs';



export interface HomeSummary {
  Rating:string;
  RiskLevel:number;
  Status: string;
  OverSpeedFreq: string;
 
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userDocs: Observable<any>;

  constructor(public speedService: SpeedService) {}


  ngOnInit() {
    this.speedService.initTrackUser();

    this.userDocs = this.speedService.getUserTrackCollection();

  }

  //Compute user risk level:(number of speedlimit jumb/number of speedlimit)

computeUserRiskLevel(){

  let cntOverSpeed = 0
  let cntSpeed = 0;
  let riskLevel=0;

  this.userDocs.forEach(doc=>{

    const data = doc.data();
   
    if(data.overSpeed){
      cntOverSpeed = cntOverSpeed + 1;

    }

    cntSpeed= cntSpeed + 1; 

  });

 return   riskLevel = (cntOverSpeed /cntSpeed)*100;

}

getCountOfOverSpeeding () {
  
  let cntOverSpeed = 0

  this.userDocs.forEach(doc=>{

    const data = doc.data();
   
    if(data.overSpeed){
      cntOverSpeed = cntOverSpeed + 1;

    }

  });

 return  cntOverSpeed ;

}

//Get count of speed records
    getCountOfSpeed () {
      
      let cntSpeed = 0

      this.userDocs.forEach(doc=>{

        cntSpeed = cntSpeed + 1;

      });

    return  cntSpeed ;

    }


    //compute risk level
    computerRiskLevel(){
      let cntOverSpeed = this.getCountOfOverSpeeding();
      let cntSpeed = this.getCountOfSpeed()
      let riskLevel = (cntOverSpeed/cntSpeed)*100;
      return riskLevel;
    }

    //Get safey status
    getRiskSafetyStatus(riskLevel){
      let safetyStatus="";
      if(riskLevel<10){
        safetyStatus ="SAFEST"

      }else if(riskLevel<=20){
        safetyStatus="SAFER";

      }else if(riskLevel<=30){
        safetyStatus="SAFE";

      }else if(riskLevel<=40){
        safetyStatus="LESS SAFE"

      }else if(riskLevel<=50){
        safetyStatus="UNSAFE";

      }else if (riskLevel<=60){
        safetyStatus ="VERY UNSAFE";

      }else if (riskLevel<=70){
        safetyStatus ="DANGEROUS";

      }else if (riskLevel<=100){
        safetyStatus="FATAL";
      }

      return safetyStatus;

    }

    getHomePageInfo(): HomeSummary {
      const riskLevel =this.computeUserRiskLevel();
      const cntOverSpeed = this.getCountOfOverSpeeding();
      const cntSpeed = this.getCountOfSpeed();
      const status = this.getRiskSafetyStatus(riskLevel);
      return {
       
          Rating:"3",
          RiskLevel:riskLevel,
          Status: status,
          OverSpeedFreq: `${cntOverSpeed}/${cntSpeed}`
              
      };

    }



}

