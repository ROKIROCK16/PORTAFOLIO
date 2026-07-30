/*Este proyecto formara parte de un portafolio de trabajamos en el cual el objetivo es realizar
un simulador que logre representar el comportamiento de un sistema operativo a través de los
procesos que este realiza

*/

//importamos las libreria que utilizaremos un poco mas adelante en nuestro codigo
package main;

import model.PROCESO;
import scheduler.RoundRobinScheduler;

public class SimuladorSO{



        public static void main(String[] args) {
        //declaramos nuestro objetos como P1 y P2
        //los inicialiamos como "New" para asegurarnos que seran nuevos
        //y empezaran desde el inicio de la cola
        RoundRobinScheduler scheduler = new RoundRobinScheduler(2);

        PROCESO p1 = new PROCESO(1, 5, 1);
        PROCESO p2 = new PROCESO(2, 3, 2);
        PROCESO p3 = new PROCESO(3, 4, 1);

        scheduler.admitirPROCESO(p3);
        scheduler.admitirPROCESO(p2);
        scheduler.admitirPROCESO(p3);

        System.out.println("-------------------------");

        while (scheduler.hayPROCESOs()) {
            scheduler.ejecutar();
            System.out.println("-------------------------");
        }

        p1.mostrarInfo();
        p2.mostrarInfo();
        p3.mostrarInfo();
    }
            

            

        
    }
