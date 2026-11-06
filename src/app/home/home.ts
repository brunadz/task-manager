import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tarefa } from '../models/tarefa.models';
import { TarefaService } from '../tarefa-form/tarefa-form.service';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly tarefaService = inject(TarefaService);

  readonly tarefas = signal<Tarefa[]>([]);
  readonly carregando = signal(true);
  readonly erro = signal('');

  constructor() {
    afterNextRender(() => this.carregarTarefas());
  }

  private carregarTarefas(): void {
    this.tarefaService.getAllTarefas().subscribe({
      next: (tarefas) => {
        this.tarefas.set(tarefas);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar as tarefas. Verifique se a API está em execução.');
        this.carregando.set(false);
      },
    });
  }
}
