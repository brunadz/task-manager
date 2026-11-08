export type PrioridadeTarefa = 'baixa' | 'media' | 'alta';
export type CategoriaTarefa = 'domestico' | 'pessoal' | 'trabalho';

export interface Tarefa {
	id?: string | number;
	nome: string;
	prioridade: PrioridadeTarefa;
	dataLimite: string;
	categoria: CategoriaTarefa;
	concluida?: boolean;
}
