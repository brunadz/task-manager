import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriaTarefa, PrioridadeTarefa, Tarefa } from '../models/tarefa.models';
import { TarefaItem } from '../tarefa-item/tarefa-item';
import { TarefaService } from '../tarefa-form/tarefa-form.service';

@Component({
  imports: [RouterLink, TarefaItem],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly tarefaService = inject(TarefaService);
  private readonly router = inject(Router);

  readonly tarefas = signal<Tarefa[]>([]);
  readonly busca = signal('');
  readonly prioridadeFiltro = signal<PrioridadeTarefa | ''>('');
  readonly categoriaFiltro = signal<CategoriaTarefa | ''>('');
  readonly tarefasFiltradas = computed(() => {
    const busca = this.busca().trim().toLocaleLowerCase('pt-BR');
    const prioridade = this.prioridadeFiltro();
    const categoria = this.categoriaFiltro();

    return this.tarefas().filter(
      (tarefa) =>
        (!busca || tarefa.nome.toLocaleLowerCase('pt-BR').includes(busca)) &&
        (!prioridade || tarefa.prioridade === prioridade) &&
        (!categoria || tarefa.categoria === categoria),
    );
  });
  readonly tarefasEmAndamento = computed(() => this.tarefasFiltradas().filter((tarefa) => !tarefa.concluida));
  readonly tarefasFeitas = computed(() => this.tarefasFiltradas().filter((tarefa) => tarefa.concluida === true));
  readonly temFiltrosAtivos = computed(
    () => !!this.busca().trim() || !!this.prioridadeFiltro() || !!this.categoriaFiltro(),
  );
  readonly dataHoje = signal('');
  readonly carregando = signal(true);
  readonly erro = signal('');

  constructor() {
    afterNextRender(() => {
      this.dataHoje.set(
        new Intl.DateTimeFormat('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date()),
      );
      this.carregarTarefas();
    });
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

  atualizarBusca(event: Event): void {
    this.busca.set((event.currentTarget as HTMLInputElement).value);
  }

  atualizarPrioridade(event: Event): void {
    const valor = (event.currentTarget as HTMLSelectElement).value;
    if (valor === '' || valor === 'baixa' || valor === 'media' || valor === 'alta') {
      this.prioridadeFiltro.set(valor);
    }
  }

  atualizarCategoria(event: Event): void {
    const valor = (event.currentTarget as HTMLSelectElement).value;
    if (valor === '' || valor === 'domestico' || valor === 'pessoal' || valor === 'trabalho') {
      this.categoriaFiltro.set(valor);
    }
  }

  limparFiltros(): void {
    this.busca.set('');
    this.prioridadeFiltro.set('');
    this.categoriaFiltro.set('');
  }

  editarTarefa(tarefa: Tarefa): void {
    if (tarefa.id === undefined) {
      return;
    }

    this.router.navigate(['/editar-tarefa', tarefa.id]);
  }

  excluirTarefa(tarefa: Tarefa): void {
    if (tarefa.id === undefined) {
      return;
    }

    this.tarefaService.deleteTarefa(tarefa.id).subscribe({
      next: () => this.tarefas.update((tarefas) => tarefas.filter((item) => item.id !== tarefa.id)),
      error: () => this.erro.set('Não foi possível excluir a tarefa. Tente novamente.'),
    });
  }

  atualizarConclusao(tarefaAtualizada: Tarefa): void {
    if (tarefaAtualizada.id === undefined) {
      return;
    }

    this.tarefaService.updateTarefa(tarefaAtualizada.id, tarefaAtualizada).subscribe({
      next: () =>
        this.tarefas.update((tarefas) =>
          tarefas.map((tarefa) => (tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa)),
        ),
      error: () => this.erro.set('Não foi possível atualizar o status da tarefa. Tente novamente.'),
    });
  }
}
