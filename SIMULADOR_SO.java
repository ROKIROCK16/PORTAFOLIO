/*Este proyecto formara parte de un portafolio de trabajamos en el cual el objetivo es realizar
un simulador que logre representar el comportamiento de un sistema operativo a través de los
procesos que este realiza

*/

//importamos las libreria que utilizaremos un poco mas adelante en nuestro codigo
import java.util.LinkedList;
import java.util.Queue;

public class SIMULADOR_SO {
    public enum Estado{
        NEW,
        READY,
        RUNNING,
        TERMINATED

    };
    //ahora crearemos una cola de procesos, de esta forma veremos como los procesos pasan de
    // NEW a READY y asi sucesivamente hasta el final.
    static Queue<Proceso> ColaReady = new LinkedList<>();

    //declaramos la clase para los procesos
    public static class Proceso{
        private int ID;
        private int Tiempo;
        private int Prioridad;
        private Estado Estado_Proceso;
        private int Tiempo_restante;
    

    //declaramos nuestro constructor
    public Proceso(int id, int tiempo, int prioridad){  
        this.ID = id;
        this.Tiempo = tiempo;
        this.Prioridad = prioridad;
        this.Estado_Proceso = Estado.NEW;
        this.Tiempo_restante = Tiempo;
    }
    //declaramos nuestros getter para poder acceder a los atributos mas tarde
    public int getID(){
        return ID;
    }
    public int getTiempo(){
        return Tiempo;
    }
    public int getPrioridad(){
        return Prioridad;
    }
    public Estado getEstado_Proceso(){
        return Estado_Proceso;
    }
    public int getTiempo_restante(){
        return Tiempo_restante;
    }

    //ahora declaramos nuestros setter para modificar los atributos pero
    //unicamenrte para el estado de los procesos
    public void setEstado_Proceso(Estado nuevo_Est){
        this.Estado_Proceso = nuevo_Est;
    }
    
    public void setTiempo_restante(int Tiempo_restante){
        this.Tiempo_restante = Tiempo_restante;
    }
    //esta parte del codigo nos permitira administrar nuevos procesos. 
   

    //ahora diseñaremos el metodo que nos mostrara la informacion de los procesos
    public void Mostrar_Info(){
        System.out.println("ID: " + ID);
        System.out.println("Tiempo de Ejecicion: " + Tiempo);
        System.out.println("Prioridad: " + Prioridad);
        System.out.println("Estado del Proceso: " + Estado_Proceso);
        System.out.println("Tiempo restante: " + Tiempo_restante);
        System.out.println("-----------------------------------");
        
    }

    //agregamos el metodo para utilizar el tipo de proceso Roun Robin
    //inicialmente definimos el quantum
    static final int Quantum = 2;

    public static void RounRobin(){
                if(ColaReady.isEmpty()){
                System.out.println("La cola de procesos esta vacia");
                return;
                }
                
                Proceso P = ColaReady.poll();
                P.setEstado_Proceso(Estado.RUNNING);
                int Tiempo_ejecutado= Math.min(Quantum, P.getTiempo_restante());

                P.setTiempo_restante(P.getTiempo_restante() - Tiempo_ejecutado); 
                
                System.out.println("Ejecutando el proceso: " + P.getID() + " por: "
                                    + Tiempo_ejecutado + " unidades");

                if(P.getTiempo_restante() > 0){
                    P.setEstado_Proceso(Estado.READY);
                    ColaReady.add(P);
                    System.out.println("El proceso: " + P.getID() + " volvio al inicio de la cola" +
                                        ",El tiempo restante es de: " + P.getTiempo_restante());
                }
                else{
                    P.setEstado_Proceso(Estado.TERMINATED);
                    System.out.println("El proceso" + P.getID() + "Ha terminado exitosamente");
                }
         }
    static public void Admitir_proceso(Proceso P){
                P.setEstado_Proceso(Estado.READY);
                ColaReady.add(P);
                System.out.println("Proceso: " + P.getID() + " Admiitdo a READY");
        }

            //ahora implementaremos un metodo que nos permita ejecutar dichos procesos
    
    static public void Ejecutar_proceso(){
                if(ColaReady.isEmpty()){
                    System.out.println("No hay nigun proceso en la cola :(");
                return;
                    }
                Proceso P = ColaReady.poll(); //Se encarga de realizar la primera solicitud y continuar
                
                //seguido a esto realizamos lo que simulara la ejecuccion
                P.setEstado_Proceso(Estado.RUNNING);
                System.out.println("Ejecutando Proceso: " + P.getID());
                P.setEstado_Proceso(Estado.TERMINATED);
                System.out.println("Proceso: " + P.getID() + " Finalizado");
        }
    



        public static void main(String[] args) {
        //declaramos nuestro objetos como P1 y P2
        //los inicialiamos como "New" para asegurarnos que seran nuevos
        //y empezaran desde el inicio de la cola
        Proceso p1 = new Proceso(1, 5, 1);
        Proceso p2 = new Proceso(2, 3, 2);
        Proceso p3 = new Proceso(3, 4, 1);

        Admitir_proceso(p1);
        Admitir_proceso(p2);
        Admitir_proceso(p3);
        System.out.println("---------------------------");
        //mostramos que estan haciendo

        p1.Mostrar_Info();
        p2.Mostrar_Info();
        p3.Mostrar_Info();

        //probamos Roun Robin
        
        while(!ColaReady.isEmpty()){
            RounRobin();
            System.out.println("------------------------");
        }
            }

        }
            

            

        
    }
