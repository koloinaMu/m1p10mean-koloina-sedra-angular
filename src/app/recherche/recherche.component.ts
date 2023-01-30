import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { CdkDrag, CdkDragDrop, moveItemInArray,CdkDragEnd } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  voiture={
    immatriculation:'',
    couleur:''
  };
  options:string[];
  depots:any[];
  type:number;
  piece:any;
  private baseUrl=environment.baseUrl;

  constructor(
    private voitureService:VoitureService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.options = [
       'Couleur',
       'Rouge',
       'Noir',
       'Gris',
       'Blanc'
    ];
    this.type=(Number)(localStorage.getItem("typeUtilisateur"));
    this.get_piece_From_Node().subscribe(
      (response: any) =>{
       console.log(response);
       this.piece=response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
   // console.log(this.type);
  }

  rechercher(){
   // console.log(this.voiture);
    this.voitureService.rechercherDepotVoiture(this.voiture).subscribe(
      (response: any) =>{
       //console.log(response); 
       this.depots=response; 
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  open(content) {   
    this.modalService.open(content, 
      { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' }); 
    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
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
       //this.router.navigate(['/app/utilisateurs']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  montantTotal(tableau,piece){
    var somme=0;
    //console.log(tableau);
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

  resteAPayer(depot){
    console.log(depot);
    var reparations=depot.reparations;
    var pieces=depot.piece;
    var paiements=depot.paiements;
    var reception=depot.dateReception;
    var sortie=depot.dateSortie;
    var montantTotal=this.montantTotal(reparations,pieces);
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
    if(resultReparation==true && reste==0 && (reception!=undefined && sortie==undefined))
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

  public receptionnerFromNode(id){
      return this.http.post(this.baseUrl+"receptionner_vehicule/"+id,{responseType:'json'});
  }

  public receptionner(id){
    //depot=JSON.parse(localStorage.getItem("depot"));
    // console.log("modif "+this.utilModif.mail+" to type "+this.utilModif.type);
     this.receptionnerFromNode(id).subscribe(
       (response: any) =>{
          console.log("REUSSI");
          console.log(response);
          //alert('insertion dans le garage  reussi')
          this.toastr.success('Voiture bien reçue.', '', {
             timeOut: 8000,
             closeButton: true,
             enableHtml: true,
             toastClass: "alert alert-success alert-with-icon",
             positionClass: 'toast-bottom-left' 
           });
          this.router.navigate(['/app/dans-atelier']);
       },
       (error: HttpErrorResponse) => {
         console.log(error.message);
       }
     )
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
    console.log(e);
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
