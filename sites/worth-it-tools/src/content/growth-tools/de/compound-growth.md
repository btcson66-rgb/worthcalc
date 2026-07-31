---
contentType: tool
toolSlug: compound-growth
locale: de
title: "Zinseszins- und Sparzielrechner"
description: "Projizieren Sie Startkapital, Sparrate, Rendite, Kosten und Inflation zu einem nominalen und einem inflationsbereinigten Endwert oder lösen Sie nach der nötigen Monatsrate."
relatedArticle: /de/how-compound-growth-works/
lastReviewed: 2026-07-31
draft: false
---

Projizieren Sie Startkapital, monatliche Sparrate, angenommene Rendite, laufende Kosten und Inflation zu einem nominalen und einem inflationsbereinigten Endwert – oder lassen Sie die Monatsrate berechnen, die für ein Sparziel nötig ist.

## Was Sie vor der Eingabe bereithalten sollten

Nehmen Sie den aktuellen Kontoauszug oder Depotauszug für das Startkapital und Ihre tatsächliche monatliche Sparrate. Für die Renditeannahme hilft ein Blick in die Effektivzinsstatistik Ihrer Bank oder die monatliche Zinsstatistik der Deutschen Bundesbank für Tagesgeld und Festgeld, statt Werbezinsen einzelner Neukundenaktionen zu übernehmen. Wichtig: Die hier angesetzte Rendite ist eine Bruttoannahme vor Kapitalertragsteuer. Der Rechner selbst modelliert die deutsche Kapitalertragsbesteuerung nicht separat – Sparerpauschbetrag, Abgeltungsteuer, Solidaritätszuschlag und gegebenenfalls Kirchensteuer müssen Sie vorher gedanklich oder rechnerisch von der erwarteten Bruttorendite abziehen.

## Wie der Rechner intern arbeitet

`Nominaler Endwert = Startkapital × (1 + Nettorendite)^Jahre + Sparrate × ((1 + Nettomonatszins)^Monate − 1) ÷ Nettomonatszins; inflationsbereinigter Endwert = nominaler Endwert ÷ (1 + Inflationsrate)^Jahre`

Die Nettorendite ergibt sich aus der eingegebenen Jahresrendite abzüglich der eingegebenen laufenden Jahreskosten (z. B. Depot- oder Fondskosten). Die Berechnung läuft vollständig im Browser, arbeitet intern mit voller Genauigkeit und rundet erst bei der Anzeige. Optional lässt sich zusätzlich ein Zielbetrag hinterlegen; der Rechner löst dann rückwärts, welche monatliche Sparrate nötig wäre, um dieses Ziel innerhalb der gewählten Laufzeit zu erreichen.

## Warum Sparerpauschbetrag und Abgeltungsteuer das Ergebnis verändern

Nach § 20 Abs. 9 EStG bleiben Kapitalerträge bis 1.000 € pro Person und Jahr (2.000 € bei Zusammenveranlagung) steuerfrei; darüber hinaus fallen 25 % Abgeltungsteuer zuzüglich 5,5 % Solidaritätszuschlag auf diese Steuer an, macht rund 26,4 % ([§ 20 EStG](https://www.gesetze-im-internet.de/estg/__20.html), abgerufen am 2026-07-31; [§ 32d EStG](https://www.gesetze-im-internet.de/estg/__32d.html), abgerufen am 2026-07-31). Kirchensteuerpflichtige zahlen zusätzlich 8 % (Bayern, Baden-Württemberg) oder 9 % (übrige Bundesländer) der Abgeltungsteuer. Weil dieser Rechner keine separate Steuerlogik enthält, sollten Sie entweder direkt eine bereits um die erwartete Steuerlast bereinigte Nettorendite eintragen, oder das Feld für Jahreskosten zusätzlich als grobe Näherung für die laufende Steuerwirkung nutzen, wenn Sie ein regulär verzinstes Konto statt eines Fondssparplans modellieren.

## Rechenbeispiel

Bei 10.000 € Startkapital, 300 € monatlicher Sparrate, 15 Jahren Laufzeit und einer bereits um Kosten und geschätzte Steuerlast bereinigten Nettorendite von rund 3,6 % ergibt sich ein nominaler Endwert von grob 100.000 €, während die Gesamteinzahlungen bei 64.000 € liegen. Setzen Sie stattdessen die volle Bruttorendite ohne Steuerabzug an, überschätzen Sie den tatsächlich verfügbaren Betrag um den Anteil, der als Abgeltungsteuer, Soli und gegebenenfalls Kirchensteuer an das Finanzamt geht. Diese Zahlen sind ein Rechenbeispiel mit angenommenen Werten, keine Markt- oder Steuerprognose.

## Was der Rechner nicht abbildet

Der Rechner bildet weder die jährliche Vorabpauschale bei thesaurierenden Fonds noch die produktabhängige Teilfreistellung für Aktienfonds ab, und er unterscheidet nicht zwischen einem verzinsten Konto mit jährlicher Gutschrift und einem Sparplan mit Gewinnrealisierung erst beim Verkauf. Auch Ein- und Auszahlungsgebühren einzelner Anbieter, ein sich änderndes Zinsniveau während der Laufzeit und die tatsächliche Kapitalertragsteuer Ihres individuellen Falls sind nicht enthalten – diese Faktoren sollten Sie vor einer Entscheidung gesondert prüfen.

## Passender Ratgeber

Lesen Sie [Zinseszins nach Steuern: Was von Ihren Kapitalerträgen nach Abgeltungsteuer wirklich übrig bleibt](/de/how-compound-growth-works/) für Sparerpauschbetrag, Freistellungsauftrag und ein vollständiges Rechenbeispiel mit Steuerabzug.

## Häufige Fragen

### Zieht der Rechner automatisch Abgeltungsteuer ab?

Nein. Er projiziert Ihre eingegebene Rendite ohne eigene Steuerlogik. Tragen Sie entweder eine bereits um die erwartete Steuerlast bereinigte Nettorendite ein oder rechnen Sie den Steuerabzug getrennt nach.

### Wie hoch ist der Sparerpauschbetrag aktuell?

1.000 € pro Person und Jahr, 2.000 € bei zusammenveranlagten Paaren, seit 2023 unverändert.

### Berücksichtigt der Rechner meinen Freistellungsauftrag?

Nein, der Freistellungsauftrag betrifft den Steuerabzug bei Ihrer Bank und ist kein Eingabefeld dieses Rechners. Er beeinflusst nur, wie viel von Ihrem gutgeschriebenen Bruttozins tatsächlich versteuert wird.

### Sind die Standardwerte Marktdurchschnitte?

Nein, es sind editierbare Beispielwerte zur Bedienung des Rechners, keine aktuellen Zins- oder Renditedaten.

### Garantiert das Ergebnis eine bestimmte Rendite?

Nein. Der Rechner vergleicht Szenarien auf Basis Ihrer Annahmen; er ist keine Anlageempfehlung und keine Zusage einer bestimmten Verzinsung.

## Quellen

- [§ 20 EStG — Sparerpauschbetrag](https://www.gesetze-im-internet.de/estg/__20.html), abgerufen am 2026-07-31
- [§ 32d EStG — Gesonderter Steuertarif für Einkünfte aus Kapitalvermögen](https://www.gesetze-im-internet.de/estg/__32d.html), abgerufen am 2026-07-31
- [§ 44a EStG — Abstandnahme vom Steuerabzug (Freistellungsauftrag)](https://www.gesetze-im-internet.de/estg/__44a.html), abgerufen am 2026-07-31
- [Deutsche Bundesbank — Einlagen- und Kreditzinssätze](https://www.bundesbank.de/de/statistiken/geld-und-kapitalmaerkte/zinssaetze-und-renditen/einlagen-und-kreditzinssaetze/einlagen-und-kreditzinssaetze-772402), abgerufen am 2026-07-31
