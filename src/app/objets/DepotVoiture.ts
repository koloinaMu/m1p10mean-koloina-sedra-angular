import {Voiture} from './voiture';

export interface DepotVoiture{
	id: string;
	nom: string;
	prenom: string;
	mail: string;
	mdp: string;
	voiture: Voiture;
	type:number;
}
