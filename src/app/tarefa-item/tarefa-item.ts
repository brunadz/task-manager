import { Component, computed, input, output } from '@angular/core';
import { ITarefaComConclusao } from '../models/tarefa.model';

@Component({
  imports: [],
  selector: 'app-tarefa-item',
  styleUrl: './tarefa-item.css',
  templateUrl: './tarefa-item.html',
})
export class TarefaItem {
  readonly tarefa = input.required<ITarefaComConclusao>();
  readonly atrasada = computed(() => {
    const tarefa = this.tarefa();
    if (tarefa.concluida || !/^\d{4}-\d{2}-\d{2}$/.test(tarefa.data)) {
      return false;
    }

    const hoje = new Date();
    const hojeISO = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    return tarefa.data < hojeISO;
  });
  readonly editar = output<ITarefaComConclusao>();
  readonly excluir = output<ITarefaComConclusao>();
  readonly conclusaoAlterada = output<ITarefaComConclusao>();

  formatarData(dataISO: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(`${dataISO}T00:00:00`));
  }

  formatarCategoria(categoria: string): string {
    const categorias: Record<string, string> = {
      domestico: 'Doméstico',
      pessoal: 'Pessoal',
      trabalho: 'Trabalho',
    };

    return categorias[categoria] ?? categoria;
  }

  alternarConclusao(event: Event): void {
    const concluida = (event.currentTarget as HTMLInputElement).checked;
    this.conclusaoAlterada.emit({ ...this.tarefa(), concluida });
  }
}
