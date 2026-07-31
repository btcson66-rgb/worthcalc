---
contentType: tool
toolSlug: inflation-purchasing-power
locale: de
title: "Inflations- und Kaufkraftrechner"
description: "Rechnen Sie einen Betrag mit den amtlichen VPI- oder HVPI-Werten von Destatis zwischen zwei Zeitpunkten in heutige oder frühere Kaufkraft um."
relatedArticle: /de/nominal-vs-real-purchasing-power/
lastReviewed: 2026-07-31
draft: true
noindex: true
publicationGate: OFFICIAL_CPI_DATA_REQUIRED
---

Rechnen Sie einen Betrag mithilfe einer von Ihnen eingegebenen amtlichen Verbraucherpreisindex-Reihe zwischen zwei Zeitpunkten um und sehen Sie sowohl den umgerechneten Nominalbetrag als auch das reale Kaufkraftverhältnis.

## Was Sie vor der Eingabe bereithalten sollten

Rufen Sie zunächst die tagesaktuellen Indexwerte für Ihren Ausgangs- und Zielzeitpunkt direkt bei Destatis ab – entweder aus der VPI-Reihe mit Basis 2020=100 für Beträge innerhalb Deutschlands, oder aus der HVPI-Reihe, wenn Sie mit anderen Euro-Ländern vergleichen möchten ([Destatis — Verbraucherpreisindex und Inflationsrate](https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html), abgerufen am 2026-07-31). Notieren Sie zusätzlich, ob es sich um Jahresdurchschnittswerte oder Werte für einen bestimmten Monat handelt, und mischen Sie diese beiden Typen nicht in derselben Berechnung.

## Wie der Rechner Beträge zwischen Zeitpunkten umrechnet

`Umgerechneter Betrag = Ausgangsbetrag × Index im Zielzeitpunkt ÷ Index im Ausgangszeitpunkt; reales Kaufkraftverhältnis = Index im Ausgangszeitpunkt ÷ Index im Zielzeitpunkt`

Sie geben den Ausgangsbetrag sowie die von Ihnen recherchierten Indexwerte für beide Zeitpunkte ein; der Rechner selbst liefert keinen amtlichen Indexstand, sondern verarbeitet ausschließlich die von Ihnen eingetragenen Werte. Die Berechnung läuft vollständig im Browser, arbeitet intern mit voller Genauigkeit und rundet erst bei der Anzeige. Werden identische Zeiträume, ein Index von null oder eine leere Periodenbezeichnung eingegeben, weist der Rechner die Eingabe zurück, statt ein irreführendes Ergebnis zu zeigen.

## VPI oder HVPI: Welchen Index Sie für diesen Rechner nutzen sollten

Für Alltagsbeträge innerhalb Deutschlands – Gehalt, Miete, Sparguthaben – ist der nationale VPI mit Basis 2020=100 die passende Reihe, da er auch eine Schätzung der Wohnkosten für selbstgenutztes Eigentum enthält. Der HVPI folgt einer EU-weit harmonisierten Methodik ohne diese Wohnkostenkomponente und eignet sich eher für Vergleiche zwischen Euro-Ländern oder für die Einordnung von EZB-Entscheidungen ([Destatis — Harmonisierter Verbraucherpreisindex, Methodische Erläuterungen](https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/Methoden/Erlaeuterungen/harmonisierter-verbraucherpreisindex.html), abgerufen am 2026-07-31). Verwenden Sie in einer einzigen Berechnung immer nur eine der beiden Reihen.

## Rechenbeispiel (illustrativ, keine aktuellen Indexwerte)

Steigt ein Index zwischen zwei Zeitpunkten von 100 auf 115, entsprechen 1.000 € aus dem früheren Zeitpunkt heute rund 1.150 €; die ursprüngliche Kaufkraft dieses Betrags beträgt gemessen in heutigem Geld nur noch etwa 87 %. Dies ist ein Rechenbeispiel mit runden, erfundenen Indexwerten zur Veranschaulichung der Methode. Ersetzen Sie diese Zahlen durch die tatsächlichen, tagesaktuellen VPI- oder HVPI-Werte von Destatis, bevor Sie das Ergebnis für eine Entscheidung nutzen.

## Was der Rechner nicht abbildet

Der Rechner bildet ausschließlich die Umrechnung eines Gesamtbetrags anhand des von Ihnen eingegebenen Indexpaars ab. Er berücksichtigt weder individuelle Ausgabenmuster, die vom bundesweiten Warenkorb abweichen, noch Kapitalertragsteuer auf einen zwischenzeitlich erzielten nominalen Ertrag, noch regionale Preisunterschiede innerhalb Deutschlands. Für die reale Nettorendite eines Sparguthabens müssen Sie zusätzlich Sparerpauschbetrag, Abgeltungsteuer und gegebenenfalls Kirchensteuer gesondert berücksichtigen.

## Passender Ratgeber

Lesen Sie [Nominale Rendite oder reale Kaufkraft? Was der Verbraucherpreisindex von Destatis wirklich zeigt](/de/nominal-vs-real-purchasing-power/) für den Unterschied zwischen VPI und HVPI sowie die vollständige Umrechnungsmethode.

## Häufige Fragen

### Liefert der Rechner den aktuellen VPI-Wert automatisch?

Nein. Sie müssen die tagesaktuellen Indexwerte selbst bei Destatis nachschlagen und eingeben; der Rechner verarbeitet ausschließlich Ihre eigenen Angaben.

### Was passiert, wenn ich VPI- und HVPI-Werte mische?

Das Ergebnis wäre methodisch nicht mehr korrekt, da beide Reihen unterschiedliche Warenkörbe abbilden. Verwenden Sie in einer Berechnung immer nur eine der beiden Reihen konsistent.

### Warum ist diese Seite als Entwurf markiert und nicht in der Suche sichtbar?

Weil sie derzeit nur ein Rechenbeispiel mit erfundenen Indexwerten zeigt. Die Seite wird erst veröffentlicht, sobald echte, tagesaktuelle Destatis-Werte redaktionell geprüft eingebunden sind.

### Rechnet der Rechner auch Kapitalertragsteuer heraus?

Nein, er rechnet ausschließlich einen Betrag anhand des Preisindex um. Steuerliche Effekte auf einen zwischenzeitlichen nominalen Ertrag müssen Sie separat berücksichtigen.

### Kann ich den Rechner auch für andere Euro-Länder nutzen?

Nur mit dem jeweils passenden nationalen Index oder dem HVPI des betreffenden Landes; der hier hinterlegte Beispielwert bezieht sich auf keine bestimmte Landeswährung oder -reihe.

## Grenzen und Prüfung

Diese Seite ist eine allgemeine Rechenhilfe und keine individuelle Finanz-, Steuer- oder Rechtsberatung. Sie bleibt bewusst als Entwurf markiert und von der Suchindexierung ausgeschlossen, bis echte, tagesaktuelle VPI- oder HVPI-Werte direkt aus der amtlichen Destatis-Reihe eingebunden und redaktionell geprüft wurden. Die Berechnung erfolgt im Browser; tragen Sie keine Konto-, Adress- oder sonstigen personenbezogenen Daten in teilbare Links ein.

## Quellen

- [Destatis — Verbraucherpreisindex und Inflationsrate](https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html), abgerufen am 2026-07-31
- [Destatis — Harmonisierter Verbraucherpreisindex, Methodische Erläuterungen](https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/Methoden/Erlaeuterungen/harmonisierter-verbraucherpreisindex.html), abgerufen am 2026-07-31
- [Destatis — Wertsicherungsrechner](https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/Methoden/Internetprogramm.html), abgerufen am 2026-07-31
