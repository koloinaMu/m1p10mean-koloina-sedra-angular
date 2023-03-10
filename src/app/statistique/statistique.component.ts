import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {VoitureService} from '../services/voiture/voiture.service';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {

  donneesX:any;
  donneesY:any;
  dataAvailable:boolean;
  dataAvailable2:boolean;
  dataAvailable3:boolean;
  option:string;

  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData:Array<any>;
  public lineBigDashboardChartOptions:any;
  public lineBigDashboardChartLabels:Array<any>;
  public lineBigDashboardChartColors:Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData:Array<any>;
  public lineChartOptions:any;
  public lineChartLabels:Array<any>;
  public lineChartColors:Array<any>

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData:Array<any>;
  public lineChartWithNumbersAndGridOptions:any;
  public lineChartWithNumbersAndGridLabels:Array<any>;
  public lineChartWithNumbersAndGridColors:Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels:Array<any>;
  public lineChartGradientsNumbersColors:Array<any>
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(
    private voitureService:VoitureService
  ) { }

  ngOnInit() {   
    this.dataAvailable=true;
    this.dataAvailable2=true;
    this.dataAvailable3=true;
  }

  async openCanvas(){
    this.dataAvailable=false;
    var opt={option:this.option};
    await this.voitureService.depotVoitureJour(opt).subscribe(
      (response: any) =>{
        var keys=[];
        var values=[];
        for(var i=0;i<response.length;i++){
          keys[i]=response[i]._id;
          values[i]=response[i].count;
        }
        this.donneesY=values;
        this.donneesX=keys;
        (document.getElementById("divChart")).style.display="block";
        this.dataAvailable=true;
        this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
        console.log("canvas="+document.getElementById("bigDashboardChart"));
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    this.lineBigDashboardChartData = [
        {
          label: "Chiffre d'affaire (Ar) ",

          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,

          borderWidth: 2,
          data: this.donneesY //[50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95]
        }
      ];
      this.lineBigDashboardChartColors = [
       {
         backgroundColor: this.gradientFill,
         borderColor: this.chartColor,
         pointBorderColor: this.chartColor,
         pointBackgroundColor: "#2c2c2c",
         pointHoverBackgroundColor: "#2c2c2c",
         pointHoverBorderColor: this.chartColor,
       }
     ];
    //this.lineBigDashboardChartLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    this.lineBigDashboardChartLabels = this.donneesX;
    this.lineBigDashboardChartOptions = {

          layout: {
              padding: {
                  left: 20,
                  right: 20,
                  top: 0,
                  bottom: 0
              }
          },
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
          },
          legend: {
              position: "bottom",
              fillStyle: "#FFF",
              display: false
          },
          scales: {
              yAxes: [{
                  ticks: {
                      fontColor: "rgba(255,255,255,0.4)",
                      fontStyle: "bold",
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      padding: 10
                  },
                  gridLines: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent"
                  }

              }],
              xAxes: [{
                  gridLines: {
                      zeroLineColor: "transparent",
                      display: false,

                  },
                  ticks: {
                      padding: 10,
                      fontColor: "rgba(255,255,255,0.4)",
                      fontStyle: "bold"
                  }
              }]
          }
    };
    //console.log(this.canvas);

    this.lineBigDashboardChartType = 'line';


    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
              stepSize: 500
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
    }); 

  }

  openBenefice(){
    this.voitureService.beneficeMensuel().subscribe(
      (response: any) =>{
        var keys=[];
        var values=[];
        //console.log(response);
        for(var i=0;i<response.length;i++){
          keys[i]=response[i]._id;
          values[i]=response[i].count;
        }
        var dataY=values;
        var dataX=keys;
        //console.log(dataX);
        //console.log(dataY);
        this.dataAvailable2=true;
        (document.getElementById("divChart2")).style.display="block";
        (document.getElementById("divChart2")).style.zIndex='1500';
        this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
        this.ctx = this.canvas.getContext("2d");

        this.chartColor = "#FFFFFF";

        this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
        this.gradientStroke.addColorStop(0, '#18ce0f');
        this.gradientStroke.addColorStop(1, this.chartColor);

        this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
        this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

        this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
              stepSize: 500
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

        this.lineChartWithNumbersAndGridData = [
            {
              label: "B??n??fice mensuel (Ar)",
               pointBorderWidth: 2,
               pointHoverRadius: 4,
               pointHoverBorderWidth: 1,
               pointRadius: 4,
               fill: true,
               borderWidth: 2,
              data: dataY //[40, 500, 650, 700, 1200, 1250, 1300, 1900]
            }
          ];
          this.lineChartWithNumbersAndGridColors = [
           {
             borderColor: "#18ce0f",
             pointBorderColor: "#FFF",
             pointBackgroundColor: "#18ce0f",
             backgroundColor: this.gradientFill
           }
         ];
        this.lineChartWithNumbersAndGridLabels = dataX //["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"];
        this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

        this.lineChartWithNumbersAndGridType = 'line';
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  openTpsReparations(){
    this.voitureService.tmpsReparationsMoyens().subscribe(
      (response:any)=>{
        var keys=[];
        var values=[];
        //console.log(response);
        for(var i=0;i<response.length;i++){
          keys[i]=response[i]._id;
          values[i]=response[i].count;
        }
        var dataY=values;
        var dataX=keys;
        //console.log(dataX);
        //console.log(dataY);
        this.dataAvailable3=true;
        (document.getElementById("divChart3")).style.display="block";
        this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
        this.ctx = this.canvas.getContext("2d");

        this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
        this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


        this.lineChartGradientsNumbersData = [
            {
              label: "Temps moyen de r??paration (j) ",
              pointBorderWidth: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 1,
              pointRadius: 4,
              fill: true,
              borderWidth: 1,
              data: dataY //[80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
            }
          ];
        this.lineChartGradientsNumbersColors = [
         {
           backgroundColor: this.gradientFill,
           borderColor: "#2CA8FF",
           pointBorderColor: "#FFF",
           pointBackgroundColor: "#2CA8FF",
         }
       ];
        this.lineChartGradientsNumbersLabels = dataX; //["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.lineChartGradientsNumbersOptions = {
            maintainAspectRatio: false,
            legend: {
              display: true
            },
            tooltips: {
              bodySpacing: 4,
              mode: "nearest",
              intersect: 0,
              position: "nearest",
              xPadding: 10,
              yPadding: 10,
              caretPadding: 10
            },
            responsive: 1,
            scales: {
              yAxes: [{
                gridLines: {
                  zeroLineColor: "transparent",
                  drawBorder: false
                },
                ticks: {
                    stepSize: 20
                }
              }],
              xAxes: [{
                display: 0,
                ticks: {
                  display: false
                },
                gridLines: {
                  zeroLineColor: "transparent",
                  drawTicks: false,
                  display: false,
                  drawBorder: false
                }
              }]
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 15,
                bottom: 15
              }
            }
          }

        this.lineChartGradientsNumbersType = 'bar';
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
