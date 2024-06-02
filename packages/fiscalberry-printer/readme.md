# Fiscalberry para nodejs

usa dotenv para levantar .env y configurar la libreria para imprimir

basado en libreria https://github.com/Klemen1337/node-thermal-printer

## se necesita tener la configuracion de yml con las impresoras instaladas

EJemplo:

```yml
printers:
  - name: printer1
    ops:
      interface: impresora1.log
      characterSet: PC852_LATIN2
  - name: printer2
    ops:
      interface: impresora2.log
      characterSet: PC852_LATIN2

```

## se puede configurar la variable .env

LOG_PATHa="/tmp/salida.log"
se configura para mostrar logs de la libreria

Para configurar el archivfo donde debe leer la configuracion de impresoras
por default es en la carpeta root "config.yml"

CONFIG_PATH=config.yml
