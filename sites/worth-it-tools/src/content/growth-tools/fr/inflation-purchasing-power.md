---
contentType: tool
toolSlug: inflation-purchasing-power
locale: fr
title: "Calculateur d’inflation et de pouvoir d’achat"
description: "Convertissez un montant entre deux périodes à partir d’une série officielle de prix."
relatedArticle: /fr/nominal-vs-real-purchasing-power/
lastReviewed: 2026-07-23
draft: true
noindex: true
publicationGate: OFFICIAL_CPI_DATA_REQUIRED
---

Convertissez un montant entre deux périodes à partir d’une série officielle de prix.

## Comment utiliser le calculateur

1. Commencez avec le relevé, le contrat, la fiche de paie ou l’indice officiel le plus récent.
2. Remplacez chaque valeur par défaut par une donnée vérifiable ; ce sont des exemples, pas des moyennes de marché ni des recommandations.
3. Calculez d’abord le scénario actuel, puis enregistrez au moins un scénario prudent, central et favorable.
4. Examinez le détail des coûts et le seuil de bascule plutôt que le seul résultat principal.
5. N’exportez ou ne copiez que des résultats non sensibles, sans donnée permettant d’identifier un compte ou une personne.

## Méthode de calcul


`montant équivalent = montant initial × IPC cible ÷ IPC initial`

Le moteur doit conserver toute la précision en interne et n’arrondir qu’à l’affichage. Il doit refuser les valeurs non finies, durées impossibles, nombres négatifs sans sens, divisions par zéro et plans qui ne s’amortissent pas. Les hypothèses doivent être visibles afin de permettre la reproduction du calcul.

## Exemple chiffré

Si l’indice passe de 100 à 112, 1 000 € deviennent 1 120 € et le pouvoir d’achat initial vaut 89,3 %.

L’exemple est uniquement illustratif. La page publiée doit proposer des boutons pour charger l’exemple et réinitialiser les champs, tout en permettant la saisie libre.

## Repères pour la France

Utilisez l’IPC de l’Insee et précisez la base. L’IPC n’est pas un indice individuel du coût de la vie et certains contrats utilisent des indices hors tabac ou spécifiques.

## Limites et vérifications

Cette page fournit une estimation pédagogique générale et non un conseil financier, fiscal, juridique, bancaire ou d’investissement personnalisé.

Avant toute décision, vérifiez le TAEG, les frais, l’assurance, la fiscalité et les clauses en vigueur auprès de l’établissement et des sources officielles.

Le calcul est effectué dans le navigateur. N’insérez pas de numéro de compte, d’adresse ou de donnée personnelle dans un lien partageable.

Le modèle sépare volontairement le résultat mathématique d’une conclusion juridique ou bancaire. Il ne doit jamais afficher « approuvé », « sûr », « garanti » ou une affirmation comparable. Tout seuil doit être présenté comme une référence modifiable ou une règle publique datée, sourcée et accompagnée de ses exceptions.

## Guide associé

Lire [Montant nominal et pouvoir d’achat réel](/fr/nominal-vs-real-purchasing-power/)pour suivre la méthode, construire les scénarios et vérifier les données.

## Questions fréquentes

### Pourquoi le résultat reste-t-il une estimation ?

Les contrats, dates, taux et frais réels peuvent différer.

### Les valeurs par défaut sont-elles des moyennes ?

Non, ce sont des exemples modifiables.

### Les données sont-elles envoyées ?

Non, le moteur est conçu pour fonctionner localement dans le navigateur.

### Le résultat garantit-il un crédit ou un rendement ?

Non, il compare uniquement des scénarios.

### Comment améliorer la précision ?

Utilisez les documents à jour et testez plusieurs hypothèses.


## Sources à vérifier avant publication

- [Insee — convertisseur de pouvoir d’achat](https://www.insee.fr/fr/information/2417794)
- [Insee — définition de l’IPC](https://www.insee.fr/fr/metadonnees/definition/c1557)
- [HCSF — mesure relative à l’octroi de crédits immobiliers](https://www.economie.gouv.fr/hcsf/mesures/mesure-relative-loctroi-de-credits-immobiliers)

La rédaction doit confirmer, le jour du déploiement, que chaque source est toujours à jour et remplacer les pages générales par des documents officiels plus précis lorsqu’ils existent.
