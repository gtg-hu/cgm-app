import { Contract } from '../model/contract';

export enum Methods {C = 'create', U = 'update', R = 'remove'};

export interface CurEvent {
	method: Methods, contract: Contract
}
