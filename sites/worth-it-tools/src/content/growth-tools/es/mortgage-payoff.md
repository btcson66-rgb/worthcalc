---
contentType: tool
toolSlug: mortgage-payoff
locale: es
title: "Calculadora de amortización anticipada de hipoteca"
description: "Compara el calendario original con cuotas adicionales y amortizaciones puntuales, mostrando meses e intereses ahorrados."
relatedArticle: /es/extra-mortgage-payments-guide/
lastReviewed: 2026-07-23
draft: false
---

Compara el calendario original con cuotas adicionales y amortizaciones puntuales, mostrando meses e intereses ahorrados.

## Cómo usar la calculadora

1. Empieza con el último extracto, contrato, nómina o índice oficial relacionado con el cálculo.
2. Sustituye todos los valores iniciales por datos que puedas comprobar; son ejemplos, no medias de mercado ni recomendaciones.
3. Calcula primero el escenario actual y guarda al menos uno conservador, uno base y uno favorable.
4. Revisa el desglose y el punto de equilibrio en lugar de depender únicamente del veredicto principal.
5. Exporta o copia solo resultados no sensibles y no incluyas datos que identifiquen cuentas o personas.

## Método de cálculo


`tipo mensual = TIN ÷ 12; interés = capital inicial × tipo mensual; capital final = capital inicial − (cuota − interés) − amortización extra`

El motor debe conservar toda la precisión internamente y redondear solo al mostrar. Debe rechazar valores no finitos, plazos imposibles, negativos sin sentido, divisiones por cero y planes que no se amortizan. El panel de resultados debe mostrar los supuestos para que otra persona pueda repetir el cálculo.

## Ejemplo práctico

Ejemplo: saldo pendiente de 180.000 €, TIN del 3,2%, 22 años restantes y 150 € extra al mes. La salida separa la cuota ordinaria de la amortización adicional.

El ejemplo es ilustrativo. La página publicada debe incluir botones para cargarlo y restablecer los campos, sin impedir que el usuario introduzca otros datos.

## Notas para España

En España conviene distinguir TIN y TAE. El motor usa el tipo nominal introducido para construir la cuota; las comisiones y otros costes deben añadirse aparte. Comprueba la comisión de reembolso anticipado y si deseas reducir plazo o cuota.

## Límites y comprobaciones

La página ofrece una estimación educativa general y no constituye asesoramiento financiero, fiscal, jurídico, crediticio ni de inversión.

Antes de decidir, comprueba el TIN, la TAE, las comisiones, los impuestos y las condiciones vigentes con la entidad y las fuentes oficiales.

El cálculo se realiza en el navegador. No incluyas números de cuenta, direcciones ni datos personales en enlaces que vayas a compartir.

El modelo separa deliberadamente el resultado matemático de una conclusión jurídica o de concesión de crédito. No debe mostrar “aprobado”, “seguro”, “garantizado” ni expresiones parecidas. Si aparece un umbral, debe figurar como referencia editable o regla pública fechada, con fuente y excepciones.

## Guía relacionada

Lee [Amortizar hipoteca antes: qué cambia realmente](/es/extra-mortgage-payments-guide/)para ver el procedimiento, los escenarios y la lista de comprobación.

## Preguntas frecuentes

### ¿La amortización extra reduce siempre el capital?

Confirma cómo debe identificarse el pago y si la entidad lo aplica directamente al principal.

### ¿Reducir plazo o cuota da el mismo resultado?

No. El modelo mantiene la cuota y reduce plazo; la entidad puede recalcular de otra forma.

### ¿Puedo añadir una paga extra anual?

Sí, como amortización puntual en el mes correspondiente.

### ¿Incluye la comisión de amortización?

Solo si la añades como coste separado.

### ¿La TAE se usa como tipo mensual?

No necesariamente. Para el cuadro se usa el tipo nominal que introduzcas; la TAE sirve para comparar coste total.


## Fuentes que deben comprobarse antes de publicar

- [Banco de España — simuladores para clientes bancarios](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/)
- [Banco de España — amortización anticipada](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/simulador_amortizacion_anticipada_prestamo.html)
- [INE — IPC en un clic](https://www.ine.es/ipc/)

La persona editora debe confirmar en la fecha de despliegue que cada fuente sigue vigente y sustituir las páginas generales por documentos oficiales más concretos cuando existan.
