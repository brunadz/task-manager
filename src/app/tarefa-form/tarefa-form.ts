import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaTarefa, Tarefa } from '../models/tarefa.models';
import { TarefaService } from './tarefa-form.service';

@Component({
  imports: [FormsModule],
  selector: 'app-tarefa-form',
  styleUrl: './tarefa-form.css',
  templateUrl: './tarefa-form.html',
})
export class TarefaForm {
  private readonly tarefaService = inject(TarefaService);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly tarefa: Omit<Tarefa, 'id' | 'listaId'> = {
    nome: '',
    prioridade: 'media',
    dataLimite: '',
    categoria: 'domestico',
  };
  readonly categories: { value: CategoriaTarefa; label: string }[] = [
    { value: 'domestico', label: 'Doméstico' },
    { value: 'pessoal', label: 'Pessoal' },
    { value: 'trabalho', label: 'Trabalho' },
  ];

  cancelar(): void {
    this.router.navigateByUrl('/');
  }

  submit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');
    const tarefa = {
      ...this.tarefa,
      nome: this.tarefa.nome.trim(),
    };
    this.tarefaService.createTarefa(tarefa).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('Não foi possível salvar. Verifique se a API está em execução e tente novamente.');
      },
    });
  }
}
