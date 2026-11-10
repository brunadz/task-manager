import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITarefaComConclusao } from '../models/tarefa.model';

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/tarefas';

  getAllTarefas(): Observable<ITarefaComConclusao[]> {
    return this.http.get<ITarefaComConclusao[]>(this.apiUrl);
  }

  createTarefa(tarefa: Omit<ITarefaComConclusao, 'id'>): Observable<ITarefaComConclusao> {
    return this.http.post<ITarefaComConclusao>(this.apiUrl, tarefa);
  }

  getTarefaById(id: string): Observable<ITarefaComConclusao> {
    return this.http.get<ITarefaComConclusao>(`${this.apiUrl}/${id}`);
  }

  updateTarefa(id: string, tarefa: Omit<ITarefaComConclusao, 'id'>): Observable<ITarefaComConclusao> {
    return this.http.put<ITarefaComConclusao>(`${this.apiUrl}/${id}`, tarefa);
  }

  deleteTarefa(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
