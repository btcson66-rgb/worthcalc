---
contentType: article
articleSlug: how-to-calculate-dti
locale: fr
title: "Calculer le taux d’effort sans le confondre avec une décision de crédit"
description: "Calculez le taux d’effort logement et le ratio total après mensualités de dettes."
relatedTool: /fr/tools/dti-calculator/
lastReviewed: 2026-07-23
draft: false
---

Un bon guide financier ne se contente pas d’afficher un chiffre final. Il doit permettre de refaire le calcul, d’identifier chaque hypothèse et de voir quelle donnée peut inverser la conclusion.

Ce guide distingue les données vérifiables du contrat ou du relevé des hypothèses modifiables. Commencez par les informations actuelles, puis comparez un scénario prudent, central et favorable sans transformer une estimation en garantie.

## La décision que ce guide aide à préparer

Calculer le taux d’effort logement et le ratio dette/revenu global, puis tester l’effet du remboursement d’une dette sans prédire l’octroi.

## Les données à rassembler avant le calcul

Utilisez le relevé, le contrat, la fiche de paie, l’avis fiscal ou l’indice officiel le plus récent. Indiquez la date de chaque taux, frais ou règle susceptible d’évoluer.

- Revenu mensuel brut selon la définition retenue
- Charge mensuelle de logement
- Mensualités minimales de cartes et crédits
- Pensions ou autres obligations récurrentes
- Dettes incluses par la règle appliquée

## Fonctionnement du modèle

`taux d’effort logement = charge logement ÷ revenu brut mensuel ; ratio global = dettes incluses ÷ revenu brut mensuel`

Le moteur doit conserver toute la précision en interne et n’arrondir qu’à l’affichage. Il doit refuser les valeurs non finies, durées impossibles, nombres négatifs sans sens, divisions par zéro et plans qui ne s’amortissent pas. Les hypothèses doivent être visibles afin de permettre la reproduction du calcul.

Le moteur conserve la précision complète et n’arrondit qu’à l’affichage. Séparez les flux de trésorerie, le calendrier, les frais, les impôts et les valeurs futures incertaines afin de rendre le calcul vérifiable.

## Exemple reproductible

4 500 € de revenus mensuels, 1 200 € de logement et 300 € d’autres crédits donnent 26,7 % et 33,3 %.

L’exemple est uniquement illustratif. La page publiée doit proposer des boutons pour charger l’exemple et réinitialiser les champs, tout en permettant la saisie libre.

## Comparer trois scénarios plutôt qu’un seul

Ne modifiez qu’une variable incertaine à la fois. Vous mesurez ainsi la sensibilité réelle sans laisser une hypothèse optimiste masquer un autre risque.

- **Prudent:** Retenez des coûts plus élevés, une progression plus lente ou un revenu/rendement plus faible. Retirer une dette soldée.
- **Central:** Utilisez les chiffres vérifiés et le comportement le plus probable. Réduire le revenu pour un scénario prudent.
- **Favorable:** Testez une amélioration plausible, clairement présentée comme scénario et non comme prévision. Augmenter la future charge de logement.

## Erreurs fréquentes qui faussent le résultat

- Utiliser le revenu net lorsque la règle demande le brut
- Saisir le solde d’une carte au lieu de sa mensualité
- Oublier assurance ou charges de logement lorsqu’elles sont requises
- Transformer un repère de 35 % en garantie d’accord

## Interprétation pour la France

En France, le taux d’effort est un repère important et la référence HCSF de 35 % doit être présentée avec sa date, ses exceptions et la précision qu’elle ne crée aucun droit au crédit.

## Méthode pratique étape par étape

1. Définissez la question précise et l’horizon de comparaison.
2. Saisissez d’abord les chiffres actuels vérifiables.
3. Vérifiez que le modèle reproduit une mensualité, un solde ou un budget connu.
4. Enregistrez les scénarios prudent, central et favorable.
5. Repérez la première valeur qui inverse la conclusion : c’est le seuil d’équilibre.
6. Contrôlez contrat, fiscalité et critères applicables avant d’agir.

## Interpréter le résultat sans en faire une promesse

Privilégiez une formulation conditionnelle : « Avec ces données et hypothèses, l’option A présente le coût modélisé le plus faible. » Le calculateur ne connaît pas toutes les clauses, règles d’octroi, évolutions de comportement ou besoins de trésorerie.

## Questions fréquentes

### Pourquoi le résultat peut-il différer du relevé ou de l’offre ?

L’organisme peut utiliser d’autres dates, méthodes de capitalisation, frais, impôts ou arrondis. Reprenez les conditions exactes et comparez l’échéancier période par période.

### Quelle donnée influence généralement le plus le résultat ?

Testez d’abord le taux, la durée, le versement régulier et les frais ponctuels. L’analyse de sensibilité doit montrer la variable la plus déterminante.

### Les valeurs initiales sont-elles des moyennes de marché ?

Non. Ce sont des exemples modifiables, jamais des données de marché actuelles.

### Le résultat garantit-il un crédit, une économie ou un rendement ?

Non. Il s’agit d’un modèle pédagogique, pas d’une décision bancaire, d’un devis contractuel ou d’une promesse de placement.

### Quand faut-il refaire le calcul ?

Après toute modification importante du taux, du solde, du revenu, d’une charge récurrente, d’un indice officiel ou d’une clause.

## Ouvrir le calculateur

Ouvrez le calculateur associé, reproduisez l’exemple, puis remplacez chaque valeur par une donnée vérifiable.

[Calculateur de taux d’effort et dette/revenu](/fr/tools/dti-calculator/)

## Limites éditoriales et sécurité

Contenu pédagogique et estimatif uniquement ; il ne constitue pas un conseil financier, fiscal, juridique, bancaire ou d’investissement personnalisé. N’insérez aucune donnée personnelle dans une URL partageable.

## Sources officielles à revérifier avant publication

- [Insee — convertisseur de pouvoir d’achat](https://www.insee.fr/fr/information/2417794)
- [Insee — définition de l’IPC](https://www.insee.fr/fr/metadonnees/definition/c1557)
- [HCSF — mesure relative à l’octroi de crédits immobiliers](https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers)

La rédaction doit confirmer, le jour du déploiement, que chaque source est toujours à jour et remplacer les pages générales par des documents officiels plus précis lorsqu’ils existent.
