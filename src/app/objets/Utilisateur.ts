import {Voiture} from './voiture';

export interface Utilisateur{
	id: string;
	nom: string;
	prenom: string;
	mail: string;
	mdp: string;
	voiture: Voiture;
	type:number;
}