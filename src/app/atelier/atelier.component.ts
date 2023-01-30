import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {VoitureService} from '../services/voiture/voiture.service';
import { environment } from "../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { CdkDrag, CdkDragDrop, moveItemInArray,CdkDragEnd } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-atelier',
  templateUrl: './atelier.component.html',
  styleUrls: ['./atelier.component.scss']
})
export class AtelierComponent implements OnInit {

  user:any;
  voiture:any;
  piece: any;
  private baseUrl=environment.baseUrl;

  constructor(private http: HttpClient, private localStorage:LocalStorageService,
  private router:Router, private modalService: NgbModal, 
  private voitureService:VoitureService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listeVoiture_dans_atelier_From_Node().subscribe(
      (response: any) =>{
      // console.log(response);
       this.voiture=response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

    this.get_piece_From_Node().subscribe(
      (response: any) =>{
       console.log(response);
       this.piece=response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public listeVoiture_dans_atelier_From_Node(){
    return this.http.get(this.baseUrl+"dans_atelier",{responseType:'json'});
  }

  public update_avancement_FromNode(avancement,idReparation,idDepot){
    return this.http.post(this.baseUrl+"modifier_avancement/" +avancement +"/"+ idReparation+ "/" + idDepot ,{responseType:'json'});
  }

  public modifier_avancement(avancement,idReparation,idDepot){
    this.update_avancement_FromNode(avancement,idReparation,idDepot).subscribe(
      (response: any) =>{
        // console.log("REUSSI");
         //alert("avancement modifie avec succes")
         this.toastr.success('Avancement réussi.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
         //console.log(response);
       //this.router.navigate(['/utilisateurs']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' });


    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }

  montantTotal(tableau,piece){
    var somme=0;
    console.log(tableau);
    console.log(piece);
   if(tableau!=undefined){
    for(var i=0;i<tableau.length;i++){
      somme+=(tableau[i].prix);
    }
   }
   if(piece!=undefined){
    for(var i=0;i<piece.length;i++){
      somme+=(piece[i].prix);
    }
   }
    return somme;
  }

  montantPaye(tableau){
    var somme=0;
   if(tableau!=undefined){
    for(var i=0;i<tableau.length;i++){
      somme+=(tableau[i].montant);
    }
   }    
    return somme;
  }

  resteAPayer(reparations,piece,paiements){
    var montantTotal=this.montantTotal(reparations,piece);
    var montantPaye=this.montantPaye(paiements);
    var result=montantTotal-montantPaye;   
    var resultReparation=true;
    for(var i=0;i<reparations.length;i++){
      //console.log("reparation fait="+reparations[i].avancement);
      if(reparations[i].avancement<100){
        resultReparation=false;
        break;
      }
    }
    var reste=result;
    if(resultReparation==true && reste==0)
    {
      document.getElementById("sortie").style.display="block";
    } 
    return result;
  }

  sortie(idDepot){
    console.log(idDepot);
    this.voitureService.bonSortie(idDepot).subscribe(
      (response:any)=>{
        this.toastr.success('Bon de sortie validé.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left'
         });
        this.router.navigate(['/app/dans-atelier']);
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  nomModel(idReparation){
    return 'avancement'+idReparation;
  }

  public get_piece_From_Node(){
    return this.http.get(this.baseUrl+"les_pieces",{responseType:'json'});
  }

  public ajouter_Piece_From_Node(id_piece,nom,prix,id_depot){
    return this.http.post(this.baseUrl+"ajouter_pieces/" + id_piece+ "/" + nom + "/" + prix + "/" +id_depot ,{responseType:'json'});
  }

  public ajouterPiece(id_piece,nom,prix,id_depot,e: CdkDragEnd){

    var positionX =  e.source.getFreeDragPosition().x;
    var positionY =  e.source.getFreeDragPosition().y;
    console.log(id_piece);
    //var clh = (window.innerHeight || document.documentElement.clientHeight) ;
    //var x=e.x / window.innerWidth * 50 +"%";
    //console.log("zany ary n position X : "+ clw);
    //console.log("zany ary n position Y : "+ clh);
    positionX=e.dropPoint.x;
    positionY=e.dropPoint.y;
    var nbPiece=this.piece.length;
    if(nbPiece==undefined){
      nbPiece=0;
    }
    //if(positionX===348)
    if(positionX>=715 && positionY>=158){
      //console.log("okey place="+positionX+" et "+positionY);
      this.ajouter_Piece_From_Node(id_piece,nom,prix,id_depot).subscribe(
        (response: any) =>{
         //alert("piece ajouté avec reussite")
         this.toastr.success('Pièce ajoutée au panier.', '', {
           timeOut: 8000,
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-bottom-left' 
         });
          //console.log(response);
         //this.piece=response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    }

 }

   dragEnded($event: CdkDragEnd) {
    const { offsetLeft, offsetTop } = $event.source.element.nativeElement;
    const { x, y } = $event.distance;
    var positionX =  $event.source.getFreeDragPosition().x;
    var positionY =  $event.source.getFreeDragPosition().y;
    //this.showPopup = true;
    console.log(positionX);
    return {positionX, positionY}

  }


}
