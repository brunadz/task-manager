import { afterNextRender, Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly loading = signal(false);
  readonly tarefaCarregada = signal(false);
  readonly errorMessage = signal('');
  private tarefaId: string | null = null;
  readonly tarefa: Omit<Tarefa, 'id' | 'listaId'> = {
    nome: '',
    prioridade: 'media',
    dataLimite: '',
    categoria: 'domestico',
    concluida: false,
  };
  readonly categories: { value: CategoriaTarefa; label: string }[] = [
    { value: 'domestico', label: 'Doméstico' },
    { value: 'pessoal', label: 'Pessoal' },
    { value: 'trabalho', label: 'Trabalho' },
  ];

  constructor() {
    this.tarefaId = this.route.snapshot.paramMap.get('id');
    if (this.tarefaId) {
      this.loading.set(true);
      afterNextRender(() => this.carregarTarefa());
    }
  }

  private carregarTarefa(): void {
    if (!this.tarefaId) {
      return;
    }

    this.tarefaService.getTarefaById(this.tarefaId).subscribe({
      next: (tarefa) => {
        Object.assign(this.tarefa, tarefa);
        this.tarefaCarregada.set(true);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Não foi possível carregar a tarefa. Tente novamente.');
        this.loading.set(false);
      },
    });
  }

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
    const request = this.tarefaId
      ? this.tarefaService.updateTarefa(this.tarefaId, tarefa)
      : this.tarefaService.createTarefa(tarefa);

    request.subscribe({
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
