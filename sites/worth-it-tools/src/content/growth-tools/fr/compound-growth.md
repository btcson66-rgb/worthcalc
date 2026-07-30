---
contentType: tool
toolSlug: compound-growth
locale: fr
title: "Calculateur d'intérêts composés (Livret A et objectif d'épargne)"
description: "Projetez un capital avec versements réguliers, frais de gestion et inflation, en comparant au taux garanti du Livret A."
relatedArticle: /fr/how-compound-growth-works/
lastReviewed: 2026-07-31
draft: false
---

Entrez un capital de départ, un versement régulier, un taux annuel et une durée pour projeter votre épargne, avec la possibilité de comparer un scénario garanti proche du Livret A à un scénario de rendement plus élevé mais non garanti.

## Ce qu'il faut réunir avant de calculer

Notez votre capital de départ éventuel, le montant et la fréquence de vos versements réguliers, le taux annuel visé — distinguez bien un taux garanti (Livret A, LEP) d'un taux espéré sur un support non garanti (assurance-vie en unités de compte, PEA) — et les frais de gestion annuels applicables à votre support.

## Comment le calcul est fait

`VF = VA(1+r)^n + versement × ((1+r)^n − 1) ÷ r`

Le calculateur conserve la précision complète en interne et n'arrondit qu'à l'affichage. Il applique les frais de gestion en réduisant le taux net utilisé pour chaque période, et peut afficher séparément la valeur nominale finale et sa valeur ajustée d'une hypothèse d'inflation que vous indiquez.

## Exemple chiffré

Avec 100 € versés chaque mois pendant 20 ans, sans capital de départ, à un taux de 1,7 % proche du Livret A actuel, le capital final approche 28 600 € pour 24 000 € versés, soit environ 4 600 € d'intérêts cumulés. Comparez ce scénario garanti à un taux hypothétique plus élevé sur un support non garanti pour visualiser l'écart, en gardant à l'esprit que ce second scénario n'est ni garanti ni assuré.

## Le repère du Livret A et de l'inflation

Depuis le 1er août 2026, le Livret A rapporte 1,7 %, net d'impôt et de prélèvements sociaux, dans la limite d'un plafond de 22 950 € par personne ([economie.gouv.fr — le Livret A passe à 1,7 %](https://presse.economie.gouv.fr/epargne-reglementee-le-livret-a-passe-a-17-et-le-lep-se-maintient-a-25-a-compter-du-1er-aout-2026/), consulté le 2026-07-31). L'inflation estimée par l'Insee était de 1,8 % sur un an en juin 2026, donnée provisoire ([Insee — informations rapides, juin 2026](https://www.insee.fr/fr/statistiques/9015205), consulté le 2026-07-31), ce qui rapproche le rendement réel du Livret A de zéro sur cette période.

## Limites de ce calculateur

Cette projection est pédagogique et ne garantit aucun rendement futur, en particulier sur un support non garanti où le capital peut baisser. Le calcul s'exécute entièrement dans votre navigateur, sans envoi de données à un serveur. N'insérez ni numéro de compte, ni nom, ni autre donnée identifiable dans un lien de résultat partagé. Le modèle ne simule pas la fiscalité d'une assurance-vie ou d'un PEA, qui dépend de la durée de détention et de l'enveloppe choisie.

## Guide associé

Lisez [Intérêts composés : ce que le Livret A, les frais et l'inflation changent vraiment](/fr/how-compound-growth-works/) pour comprendre la capitalisation par quinzaine du Livret A, l'effet cumulé des frais de gestion et l'écart entre rendement nominal et rendement réel.

## Foire aux questions

### Le taux du Livret A est-il garanti sur toute la durée de la projection ?

Non, il est révisé en principe deux fois par an ; le calculateur applique le taux constant que vous indiquez, ce qui est une simplification par rapport à la réalité d'un taux révisable.

### Comment le calculateur traite-t-il les frais de gestion ?

Il les déduit du taux brut avant d'appliquer la formule des intérêts composés, ce qui reflète leur effet cumulé année après année plutôt qu'une simple soustraction ponctuelle.

### Puis-je comparer un scénario garanti et un scénario non garanti dans le même calcul ?

Oui, testez deux taux différents séparément — un proche du Livret A, un autre hypothétique plus élevé — pour visualiser l'écart, en gardant à l'esprit que seul le premier est sans risque de perte en capital.

### Le résultat tient-il compte de la fiscalité d'une assurance-vie ou d'un PEA ?

Non, ces enveloppes ont une fiscalité spécifique selon la durée de détention ; ce calculateur affiche un montant brut avant application de cette fiscalité.

### Quand dois-je refaire ce calcul ?

À chaque révision du taux du Livret A (février et août), changement de votre effort d'épargne mensuel, ou si vous changez de support d'investissement.

## Sources

- [economie.gouv.fr — épargne réglementée, le Livret A passe à 1,7 %](https://presse.economie.gouv.fr/epargne-reglementee-le-livret-a-passe-a-17-et-le-lep-se-maintient-a-25-a-compter-du-1er-aout-2026/), consulté le 2026-07-31
- [economie.gouv.fr — Livret A, comment ça marche ?](https://www.economie.gouv.fr/particuliers/gerer-mon-argent/gerer-mon-budget-et-mon-epargne/livret-comment-ca-marche), consulté le 2026-07-31
- [Insee — informations rapides, prix à la consommation juin 2026](https://www.insee.fr/fr/statistiques/9015205), consulté le 2026-07-31
