import { Component, input, output } from '@angular/core';
import { Tarefa } from '../models/tarefa.models';

@Component({
  imports: [],
  selector: 'app-tarefa-item',
  styleUrl: './tarefa-item.css',
  templateUrl: './tarefa-item.html',
})
export class TarefaItem {
  readonly tarefa = input.required<Tarefa>();
  readonly editar = output<Tarefa>();
  readonly excluir = output<Tarefa>();
  readonly conclusaoAlterada = output<Tarefa>();

  alternarConclusao(event: Event): void {
    const concluida = (event.currentTarget as HTMLInputElement).checked;
    this.conclusaoAlterada.emit({ ...this.tarefa(), concluida });
  }
}
