---
contentType: article
articleSlug: nominal-vs-real-purchasing-power
locale: es
title: "Dinero nominal y poder adquisitivo real"
description: "Actualiza importes entre periodos con una serie oficial del IPC y muestra inflación acumulada."
relatedTool: /es/tools/inflation-purchasing-power/
lastReviewed: 2026-07-23
draft: true
noindex: true
publicationGate: OFFICIAL_CPI_DATA_REQUIRED
---

Una guía financiera útil no se limita a mostrar una cifra final. Debe permitir repetir el cálculo, entender cada supuesto y detectar qué dato hace cambiar la conclusión.

Esta guía separa los datos comprobables del contrato o recibo de las hipótesis editables. Empieza con información actual, compara un escenario prudente, uno base y otro favorable, y no presentes ninguna estimación como garantía.

## Qué decisión ayuda a resolver esta guía

Trasladar una cantidad entre años con una única serie oficial bien definida y separar variación nominal de poder adquisitivo.

## Datos que conviene reunir antes de calcular

Utiliza el último extracto, contrato, nómina, recibo fiscal o índice oficial disponible. Anota la fecha de cada tipo, comisión o dato que pueda cambiar.

- Año inicial y final
- Importe del año inicial
- Serie oficial de IPC y cobertura geográfica
- Promedio anual o índice mensual
- Fecha de descarga y estado de revisión

## Cómo funciona el modelo

`importe equivalente = importe inicial × IPC final ÷ IPC inicial`

El motor debe conservar toda la precisión internamente y redondear solo al mostrar. Debe rechazar valores no finitos, plazos imposibles, negativos sin sentido, divisiones por cero y planes que no se amortizan. El panel de resultados debe mostrar los supuestos para que otra persona pueda repetir el cálculo.

El motor debe conservar toda la precisión y redondear solo al mostrar. Separa coste en efectivo, calendario, comisiones, impuestos y valores futuros inciertos para que el cálculo pueda revisarse.

## Ejemplo reproducible

Si el índice pasa de 100 a 118, 1.000 € equivalen a 1.180 € y la unidad inicial conserva el 84,7% de poder adquisitivo.

El ejemplo es ilustrativo. La página publicada debe incluir botones para cargarlo y restablecer los campos, sin impedir que el usuario introduzca otros datos.

## Compara tres escenarios, no uno solo

Cambia una sola variable incierta cada vez. Así se ve la sensibilidad real y se evita que una hipótesis optimista oculte otro riesgo.

- **Prudente:** Usa costes más altos, menor progreso o ingresos/rendimientos más bajos. Comparar promedio anual y mes concreto solo con metodología documentada.
- **Base:** Usa cifras actuales verificadas y el comportamiento más probable. Cambiar el año inicial.
- **Favorable:** Usa una mejora plausible, identificada como escenario y no como previsión. Comparar crecimiento salarial nominal e IPC.

## Errores habituales que cambian el resultado

- Mezclar series con distinta población o base
- Usar el IPC general para fijar el precio exacto de un producto
- Publicar antes de sincronizar los datos oficiales
- Tratar el ajuste como coste de vida idéntico para todos los hogares

## Cómo interpretar el resultado en España

Utiliza el IPC del INE y etiqueta la base y el periodo. Para actualización de alquileres pueden existir índices y reglas específicos; no sustituyas automáticamente el IRAV por el IPC general.

## Proceso práctico paso a paso

1. Define la pregunta exacta y el horizonte temporal.
2. Introduce primero los datos actuales verificables.
3. Comprueba que el modelo reproduce una cuota, saldo o presupuesto conocido.
4. Guarda escenarios prudente, base y favorable.
5. Localiza el primer dato que invierte la conclusión: ese es el umbral de equilibrio.
6. Revisa contrato, fiscalidad y requisitos antes de actuar.

## Cómo leer el resultado sin prometer demasiado

Usa lenguaje condicional: «Con estos datos y supuestos, la opción A tiene un coste modelizado menor». La calculadora no conoce todas las cláusulas, criterios de concesión, cambios de conducta ni necesidades de liquidez.

## Preguntas frecuentes

### ¿Por qué puede diferir del extracto o de la oferta?

La entidad puede aplicar otras fechas, capitalización, comisiones, impuestos o redondeos. Introduce las condiciones exactas y compara el calendario periodo a periodo.

### ¿Qué dato suele influir más?

Prueba primero el tipo, el plazo, el pago periódico y las comisiones únicas. La sensibilidad debe mostrar qué variable mueve antes el resultado.

### ¿Los valores iniciales son medias de mercado?

No. Son ejemplos editables y no deben presentarse como datos actuales de mercado.

### ¿El resultado garantiza aprobación, ahorro o rentabilidad?

No. Es un modelo educativo, no una decisión bancaria, oferta contractual ni promesa de inversión.

### ¿Cuándo conviene repetir el cálculo?

Cuando cambien de forma relevante el tipo, saldo, ingreso, coste recurrente, índice oficial o condición contractual.

## Abrir la calculadora

Abre la calculadora asociada, reproduce el ejemplo y después sustituye cada valor por un dato que puedas comprobar.

[Calculadora de inflación y poder adquisitivo](/es/tools/inflation-purchasing-power/)

## Límites editoriales y de seguridad

Contenido educativo y estimativo; no constituye asesoramiento financiero, fiscal, jurídico, crediticio ni de inversión personalizado. No incluyas identificadores personales en enlaces compartidos.

## Fuentes oficiales que deben verificarse antes de publicar

- [Banco de España — simuladores para clientes bancarios](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/)
- [Banco de España — amortización anticipada](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/simulador_amortizacion_anticipada_prestamo.html)
- [INE — IPC en un clic](https://www.ine.es/ipc/)

La persona editora debe confirmar en la fecha de despliegue que cada fuente sigue vigente y sustituir las páginas generales por documentos oficiales más concretos cuando existan.
