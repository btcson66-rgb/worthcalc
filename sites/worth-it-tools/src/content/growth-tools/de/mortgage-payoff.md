---
contentType: tool
toolSlug: mortgage-payoff
locale: de
title: "Sondertilgungsrechner: Restschuld, Zinsersparnis und Vorfälligkeitsentschädigung"
description: "Berechnen Sie, wie eine Sondertilgung Ihre Restschuld und Laufzeit verändert — inklusive Einordnung, wann eine Vorfälligkeitsentschädigung anfällt."
relatedArticle: /de/extra-mortgage-payments-guide/
lastReviewed: 2026-07-31
draft: false
---

Tragen Sie Restschuld, Sollzins, Restlaufzeit und eine geplante Sondertilgung ein, um die neue Restschuld, die verkürzte Laufzeit und die eingesparten Zinsen gegenüber dem ursprünglichen Tilgungsplan zu sehen.

## Was Sie vor der Eingabe bereithalten sollten

Nehmen Sie die aktuelle Restschuld aus Ihrem letzten Kontoauszug oder Ihrer Bank-App, nicht die ursprüngliche Darlehenssumme. Prüfen Sie im Vertrag, wie viel Sondertilgung pro Jahr kostenlos erlaubt ist — üblich sind 5 % der ursprünglichen Darlehenssumme, manche Verträge erlauben mehr, teils gegen Zinsaufschlag. Notieren Sie außerdem, wie viele Jahre seit vollständiger Auszahlung des Darlehens vergangen sind: Nach zehn Jahren greift unabhängig vom Vertrag das gesetzliche Sonderkündigungsrecht nach § 489 BGB.

## Wie der Rechner intern arbeitet

`Monatszins = Sollzins ÷ 12; Zinsanteil = Restschuld × Monatszins; neue Restschuld = Restschuld − (Rate − Zinsanteil) − Sondertilgung`

Die Berechnung läuft vollständig im Browser, arbeitet intern mit voller Genauigkeit und rundet erst bei der Anzeige. Bei der Sondertilgung wird die Monatsrate konstant gehalten, sodass sich die verbleibende Laufzeit verkürzt — Sie können das Ergebnis mit der Option vergleichen, stattdessen die Monatsrate zu senken.

## Rechenbeispiel

Bei 250.000 € Restschuld, 3,5 % Sollzins, 25 Jahren Restlaufzeit und einer einmaligen Sondertilgung von 15.000 € im ersten Jahr sinkt die Restlaufzeit spürbar stärker, als eine gleich hohe Sondertilgung im letzten Laufzeitjahr es täte — weil die Tilgung dort auf den Teil der Schuld wirkt, der sonst am längsten verzinst würde. Ersetzen Sie diese Beispielwerte durch Ihre tatsächliche Restschuld und Ihren tatsächlichen Sollzins, bevor Sie das Ergebnis für eine Entscheidung verwenden.

## Innerhalb oder außerhalb des Sondertilgungsrahmens?

Der Rechner geht davon aus, dass die eingegebene Sondertilgung innerhalb des vertraglich erlaubten Rahmens liegt und daher kostenfrei ist. Übersteigt Ihre geplante Zahlung die vertraglich erlaubte Grenze innerhalb der laufenden Sollzinsbindung, kann Ihre Bank für den übersteigenden Betrag eine Vorfälligkeitsentschädigung nach der Aktiv-Passiv-Methode verlangen — für Immobiliardarlehen gibt es dabei anders als bei Ratenkrediten keinen gesetzlichen 1-Prozent-Deckel ([§ 490 Abs. 2 BGB in Verbindung mit § 502 BGB](https://www.gesetze-im-internet.de/bgb/__502.html), abgerufen am 2026-07-31). Dieser Rechner bildet eine solche Entschädigung nicht automatisch ab, da ihre Höhe von der tagesaktuellen Bundesbank-Zinsreihe abhängt.

## Grenzen dieses Rechners

Diese Seite ist eine allgemeine Rechenhilfe und keine individuelle Finanz-, Steuer-, Rechts- oder Kreditberatung. Der Rechner ersetzt nicht die offizielle Ablöseberechnung Ihrer Bank, die den exakten Wertstellungstag, tagesgenaue Zinsen und mögliche Gebühren berücksichtigt. Alle Eingaben bleiben im Browser; tragen Sie keine Konto-, Namens- oder sonstigen personenbezogenen Daten in einen teilbaren Ergebnislink ein.

## Passender Ratgeber

Lesen Sie [Sondertilgung oder §489 BGB: Wann sich vorzeitige Tilgung wirklich lohnt](/de/extra-mortgage-payments-guide/) für die rechtliche Einordnung von Sondertilgungsrecht, Vorfälligkeitsentschädigung und dem kostenlosen Sonderkündigungsrecht nach zehn Jahren.

## Häufige Fragen

### Berücksichtigt der Rechner automatisch eine Vorfälligkeitsentschädigung?

Nein. Der Rechner geht von einer kostenfreien Sondertilgung innerhalb des vertraglichen Rahmens aus. Eine mögliche Entschädigung für darüber hinausgehende Beträge müssen Sie separat bei Ihrer Bank erfragen.

### Sinkt bei einer Sondertilgung meine Monatsrate oder meine Laufzeit?

Der Rechner hält die Monatsrate konstant und verkürzt die Laufzeit. Ob Ihre Bank stattdessen eine niedrigere Rate bei gleicher Laufzeit anbietet, hängt vom Vertrag und Ihrer Anweisung an die Bank ab.

### Was passiert nach zehn Jahren Sollzinsbindung?

Unabhängig vom Rechner steht Ihnen nach § 489 BGB nach zehn Jahren seit vollständiger Auszahlung ein gesetzliches Sonderkündigungsrecht mit sechs Monaten Frist zu — ohne Vorfälligkeitsentschädigung.

### Kann ich mehrere Sondertilgungen über die Laufzeit verteilt eingeben?

Ja, tragen Sie jede geplante Sondertilgung als eigenen Betrag im jeweiligen Jahr ein, um den kumulierten Effekt zu sehen.

### Wie aktuell muss meine eingegebene Restschuld sein?

So aktuell wie möglich. Schon wenige Monate alte Kontoauszüge können von der tatsächlichen Restschuld abweichen, besonders bei variablen Zinsanteilen.

## Quellen

- [§ 489 BGB — Sonderkündigungsrecht des Darlehensnehmers](https://www.gesetze-im-internet.de/bgb/__489.html), abgerufen am 2026-07-31
- [§ 502 BGB — Vorfälligkeitsentschädigung](https://www.gesetze-im-internet.de/bgb/__502.html), abgerufen am 2026-07-31
- [Verbraucherzentrale — Baufinanzierung vorzeitig ablösen](https://www.verbraucherzentrale.de/wissen/geld-versicherungen/bau-und-immobilienfinanzierung/baufinanzierung-vorzeitig-abloesen-ohne-extrakosten-aus-dem-baukredit-12773), abgerufen am 2026-07-31
- [Deutsche Bundesbank — Kapitalmarktstatistik](https://www.bundesbank.de/de/statistiken/geld-und-kapitalmaerkte), abgerufen am 2026-07-31
