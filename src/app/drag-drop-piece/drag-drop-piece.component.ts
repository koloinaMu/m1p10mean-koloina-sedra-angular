import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { NgbModalRef , NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CdkDrag, CdkDragDrop, moveItemInArray,CdkDragEnd } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-drag-drop-piece',
  templateUrl: './drag-drop-piece.component.html',
  styleUrls: ['./drag-drop-piece.component.scss']
})

export class DragDropPieceComponent implements OnInit {

  user:any;
  voiture:any;
  positionX: any;
  positionY: any;
  offset: any;
  initialPosition: any;
  showPopup:any;
  piece: any;

  constructor(private http: HttpClient, private localStorage:LocalStorageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listeVoiture_dans_atelier_From_Node().subscribe(
      (response: any) =>{
       console.log(response);
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
    return this.http.get("http://localhost:3000/dans_atelier",{responseType:'json'});
  }

  public get_piece_From_Node(){
    return this.http.get("http://localhost:3000/les_pieces",{responseType:'json'});
  }

  public ajouter_Piece_From_Node(id_piece,nom,prix,id_depot){
    return this.http.post("http://localhost:3000/ajouter_pieces/" + id_piece+ "/" + nom + "/" + prix + "/" +id_depot ,{responseType:'json'});
  }

  public ajouterPiece(id_piece,nom,prix,id_depot,e: CdkDragEnd){

    var positionX =  e.source.getFreeDragPosition().x;
    var positionY =  e.source.getFreeDragPosition().y;

    //var clh = (window.innerHeight || document.documentElement.clientHeight) ;
    //var x=e.x / window.innerWidth * 50 +"%";
    //console.log("zany ary n position X : "+ clw);
    //console.log("zany ary n position Y : "+ clh);
    if(positionX===348){
      this.ajouter_Piece_From_Node(id_piece,nom,prix,id_depot).subscribe(
        (response: any) =>{
         alert("piece ajouté avec reussite")
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
    this.showPopup = true;
    //console.log(positionX);
    return {positionX, positionY}

  }

  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title',windowClass: 'modif' });


    //modalRef.componentInstance.utilModif.mail=mail;
    //modalRef.componentInstance.utilModif.type=type;
  }

}
