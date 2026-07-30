package model;

//ahora crearemos una cola de procesos, de esta forma veremos como los procesos pasan de
// NEW a READY y asi sucesivamente hasta el final.
//declaramos la clase para los procesos

public class PROCESO{

    private int id;
    private int tiempoTotal;
    private int prioridad;
    private int tiempoRestante;
    private ESTADO estado;

    public PROCESO(int id, int tiempoTotal, int prioridad) {
        this.id = id;
        this.tiempoTotal = tiempoTotal;
        this.prioridad = prioridad;
        this.tiempoRestante = tiempoTotal;
        this.estado = ESTADO.NEW;
    }

    public int getId() {
        return id;
    }

    public int getTiempoRestante() {
        return tiempoRestante;
    }

    public void setTiempoRestante(int tiempoRestante) {
        this.tiempoRestante = tiempoRestante;
    }

    public ESTADO getEstado() {
        return estado;
    }

    public void setEstado(ESTADO estado) {
        this.estado = estado;
    }

    public void mostrarInfo() {
        System.out.println("ID: " + id);
        System.out.println("Tiempo total: " + tiempoTotal);
        System.out.println("Tiempo restante: " + tiempoRestante);
        System.out.println("Prioridad: " + prioridad);
        System.out.println("Estado: " + estado);
        System.out.println("---------------------------");
    }
}
