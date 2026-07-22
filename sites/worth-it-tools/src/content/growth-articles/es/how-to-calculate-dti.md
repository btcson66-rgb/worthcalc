---
contentType: article
articleSlug: how-to-calculate-dti
locale: es
title: "Cómo calcular el ratio deuda-ingresos sin confundirlo con una aprobación"
description: "Calcula el ratio de vivienda y el ratio total deuda-ingresos, con escenarios de eliminación de deudas."
relatedTool: /es/tools/dti-calculator/
lastReviewed: 2026-07-23
draft: false
---

Una guía financiera útil no se limita a mostrar una cifra final. Debe permitir repetir el cálculo, entender cada supuesto y detectar qué dato hace cambiar la conclusión.

Esta guía separa los datos comprobables del contrato o recibo de las hipótesis editables. Empieza con información actual, compara un escenario prudente, uno base y otro favorable, y no presentes ninguna estimación como garantía.

## Qué decisión ayuda a resolver esta guía

Calcular ratios de vivienda y deuda total sobre ingresos y comprobar el efecto de cancelar una deuda sin predecir la aprobación.

## Datos que conviene reunir antes de calcular

Utiliza el último extracto, contrato, nómina, recibo fiscal o índice oficial disponible. Anota la fecha de cada tipo, comisión o dato que pueda cambiar.

- Ingreso bruto mensual según la definición aplicada
- Obligación mensual de vivienda
- Pagos mínimos de tarjetas y préstamos
- Pensiones u otras obligaciones recurrentes
- Deudas incluidas por el criterio elegido

## Cómo funciona el modelo

`ratio vivienda = cuota de vivienda ÷ ingreso bruto mensual; ratio total = pagos de deuda incluidos ÷ ingreso bruto mensual`

El motor debe conservar toda la precisión internamente y redondear solo al mostrar. Debe rechazar valores no finitos, plazos imposibles, negativos sin sentido, divisiones por cero y planes que no se amortizan. El panel de resultados debe mostrar los supuestos para que otra persona pueda repetir el cálculo.

El motor debe conservar toda la precisión y redondear solo al mostrar. Separa coste en efectivo, calendario, comisiones, impuestos y valores futuros inciertos para que el cálculo pueda revisarse.

## Ejemplo reproducible

4.000 € de ingresos brutos, 1.000 € de vivienda y 300 € de otras cuotas producen 25% y 32,5%.

El ejemplo es ilustrativo. La página publicada debe incluir botones para cargarlo y restablecer los campos, sin impedir que el usuario introduzca otros datos.

## Compara tres escenarios, no uno solo

Cambia una sola variable incierta cada vez. Así se ve la sensibilidad real y se evita que una hipótesis optimista oculte otro riesgo.

- **Prudente:** Usa costes más altos, menor progreso o ingresos/rendimientos más bajos. Eliminar una deuda cancelada.
- **Base:** Usa cifras actuales verificadas y el comportamiento más probable. Reducir el ingreso a un nivel prudente.
- **Favorable:** Usa una mejora plausible, identificada como escenario y no como previsión. Aumentar la cuota de vivienda propuesta.

## Errores habituales que cambian el resultado

- Usar ingreso neto cuando la definición pide bruto
- Introducir saldo de tarjeta en vez de pago mensual
- Omitir impuestos, seguro o comunidad cuando corresponda
- Convertir un umbral orientativo en garantía de aprobación

## Cómo interpretar el resultado en España

La entidad puede usar ingresos netos o criterios propios y valorar estabilidad laboral, TAE, avales y otros compromisos. El ratio no garantiza aprobación.

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

[Calculadora de ratio deuda-ingresos](/es/tools/dti-calculator/)

## Límites editoriales y de seguridad

Contenido educativo y estimativo; no constituye asesoramiento financiero, fiscal, jurídico, crediticio ni de inversión personalizado. No incluyas identificadores personales en enlaces compartidos.

## Fuentes oficiales que deben verificarse antes de publicar

- [Banco de España — simuladores para clientes bancarios](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/)
- [Banco de España — amortización anticipada](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/simulador_amortizacion_anticipada_prestamo.html)
- [INE — IPC en un clic](https://www.ine.es/ipc/)

La persona editora debe confirmar en la fecha de despliegue que cada fuente sigue vigente y sustituir las páginas generales por documentos oficiales más concretos cuando existan.
