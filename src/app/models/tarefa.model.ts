export interface ITarefa {
	id: string;
	nome: string;
	data: string;
	prioridade: string;
	categoria: string;
}

export interface ITarefaComConclusao extends ITarefa {
	concluida?: boolean;
}

export type PrioridadeTarefa = 'baixa' | 'media' | 'alta';
export type CategoriaTarefa = 'domestico' | 'pessoal' | 'trabalho';

export function createITarefa() {
	return {
		id: '',
		nome: '',
		data: '',
		categoria: '',
		prioridade: '',
	};
}