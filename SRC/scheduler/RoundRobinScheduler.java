package scheduler;

import java.util.LinkedList;
import java.util.Queue;
import model.ESTADO;
import model.PROCESO;

public class RoundRobinScheduler {

    private Queue<PROCESO> colaReady;
    private final int quantum;

    public RoundRobinScheduler(int quantum) {
        this.quantum = quantum;
        this.colaReady = new LinkedList<>();
    }

    public void admitirPROCESO(PROCESO p) {
        p.setEstado(ESTADO.READY);
        colaReady.add(p);
        System.out.println("PROCESO " + p.getId() + " admitido a READY");
    }

    public boolean hayPROCESOs() {
        return !colaReady.isEmpty();
    }

    public void ejecutar() {
        if (colaReady.isEmpty()) {
            System.out.println("No hay PROCESOs en READY");
            return;
        }

        PROCESO p = colaReady.poll();
        p.setEstado(ESTADO.RUNNING);

        int tiempoEjecutado = Math.min(quantum, p.getTiempoRestante());
        p.setTiempoRestante(p.getTiempoRestante() - tiempoEjecutado);

        System.out.println("Ejecutando PROCESO " + p.getId() +
                " por " + tiempoEjecutado + " unidades");

        if (p.getTiempoRestante() > 0) {
            p.setEstado(ESTADO.READY);
            colaReady.add(p);
            System.out.println("PROCESO " + p.getId() +
                    " vuelve a READY (restante: " + p.getTiempoRestante() + ")");
        } else {
            p.setEstado(ESTADO.TERMINATED);
            System.out.println("PROCESO " + p.getId() + " TERMINADO");
        }
    }
}
