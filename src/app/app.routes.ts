import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
	{ path: '', component: Home, title: 'Minhas tarefas' },
	{
		path: 'nova-tarefa',
		loadComponent: () => import('./tarefa-form/tarefa-form').then((module) => module.TarefaForm),
		title: 'Nova tarefa',
	},
	{
		path: 'editar-tarefa/:id',
		loadComponent: () => import('./tarefa-form/tarefa-form').then((module) => module.TarefaForm),
		title: 'Editar tarefa',
	},
	{ path: '**', redirectTo: '' },
];
