# PORTAFOLIO
Este proyecto es un simulador básico de un sistema operativo, desarrollado en Java, cuyo objetivo es representar el comportamiento de la planificación de procesos y sus distintos estados durante la ejecución.

El simulador modela conceptos fundamentales de Sistemas Operativos como:
  * Estados de un proceso
  * Cola de procesos READY
  * Algoritmos de planificación
  * Uso del CPU mediante time slicing

Este proyecto forma parte de mi portafolio académico en la carrera de Ingeniería en Sistemas Computacionales.

Objetivos del proyecto
  * Comprender y aplicar el ciclo de vida de un proceso
  * Implementar algoritmos de planificación de CPU
  * Simular la multitarea mediante Round Robin
  * Reforzar conceptos de Programación Orientada a Objetos
  * Utilizar estructuras de datos como colas (Queue)

Tecnologías utilizadas
Lenguaje: Java
Estructuras de datos: Queue, LinkedList
Paradigma: Programación Orientada a Objetos (POO)

 Conceptos implementados
Estados de un proceso:
NEW
READY
RUNNING
TERMINATED
Cola de procesos listos (READY)
Simulación de ejecución de procesos

Algoritmos de planificación:
FCFS (First Come, First Served)
Round Robin con quantum fijo
FIFO
PRIORIDAD

Ejecución del programa
Se crean varios procesos con:
ID
Tiempo total de ejecución
Prioridad
Los procesos son admitidos a la cola READY
El planificador ejecuta los procesos hasta que todos terminan
Se muestra el estado final de cada proceso
