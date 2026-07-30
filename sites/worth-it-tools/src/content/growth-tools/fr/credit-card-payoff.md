---
contentType: tool
toolSlug: credit-card-payoff
locale: fr
title: "Calculateur de remboursement de crédit renouvelable"
description: "Estimez la durée et le coût total d'un crédit renouvelable selon votre TAEG contractuel, en tenant compte de la règle française de remboursement minimal du capital."
relatedArticle: /fr/credit-card-minimum-payment-trap/
lastReviewed: 2026-07-31
draft: false
---

Entrez le capital utilisé sur votre réserve de crédit renouvelable, le TAEG contractuel et le versement mensuel envisagé pour estimer la durée totale et le coût en intérêts, en comparant votre versement au minimum réglementaire français.

## Ce qu'il faut réunir avant de calculer

Prenez le dernier relevé de votre crédit renouvelable pour connaître le capital restant dû exact, pas le plafond total de la réserve. Notez le TAEG contractuel actuel — attention aux offres avec taux promotionnel temporaire — et vérifiez si le montant total du crédit accordé est inférieur ou supérieur à 3 000 €, car cela change la durée maximale de remboursement autorisée par la loi.

## Comment le calcul est fait

`solde restant = solde initial + nouveaux prélèvements + intérêts du mois − versement mensuel`

Le calculateur applique les intérêts sur le capital réellement utilisé, pas sur le plafond de la réserve, et conserve la précision complète en interne en n'arrondissant qu'à l'affichage. Il signale si votre versement mensuel est inférieur au minimum réglementaire français applicable à votre tranche de montant.

## Exemple chiffré

Avec 2 500 € de capital utilisé, un TAEG de 15 % et un crédit total accordé inférieur à 3 000 €, la règle française impose un remboursement du capital en 36 échéances maximum, soit environ 70 € de capital par mois au minimum, plus les intérêts dégressifs du mois. Testez l'effet d'augmenter votre versement au-delà de ce minimum pour voir de combien la durée totale et le coût en intérêts diminuent.

## Le plafond légal qui encadre votre TAEG

Le TAEG que vous saisissez ne peut légalement pas dépasser le taux d'usure fixé chaque trimestre par la Banque de France pour votre tranche de montant : 23,53 % jusqu'à 3 000 €, 15,67 % entre 3 000 € et 6 000 €, 8,56 % au-delà de 6 000 €, plafonds applicables depuis le 1er juillet 2026 ([Banque de France — taux d'usure 2026-T3](https://www.banque-france.fr/fr/statistiques/taux-et-cours/taux-dusure-2026-q3), consulté le 2026-07-31). Depuis la loi Lagarde de 2010, chaque échéance doit aussi inclure un remboursement minimal du capital fixé par décret ([Code de la consommation, article L312-65](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226049), consulté le 2026-07-31), ce qui interdit les crédits renouvelables remboursés en intérêts seuls indéfiniment.

## Limites de ce calculateur

Cette estimation est pédagogique et ne remplace pas le tableau d'amortissement officiel de votre établissement prêteur. Le calcul s'exécute entièrement dans votre navigateur, sans envoi de données à un serveur. N'insérez ni numéro de compte, ni nom, ni autre information identifiable dans un lien de résultat partagé. Un TAEG proche du plafond légal reste conforme à la loi même s'il paraît élevé : le calculateur ne juge pas le caractère raisonnable d'un taux, il calcule seulement sa conséquence sur la durée et le coût.

## Guide associé

Lisez [Crédit renouvelable en France : taux d'usure, remboursement minimal et vitesse réelle de remboursement](/fr/credit-card-minimum-payment-trap/) pour comprendre le fonctionnement du taux d'usure, la règle de remboursement minimal et le risque du crédit dormant.

## Foire aux questions

### Pourquoi le calculateur me demande-t-il si le crédit total est inférieur ou supérieur à 3 000 € ?

Parce que la loi française fixe une durée d'amortissement minimale différente selon ce seuil : 36 échéances maximum en dessous de 3 000 €, 60 échéances au-delà, ce qui change le montant minimal de capital à rembourser chaque mois.

### Le TAEG que j'ai saisi peut-il être illégal ?

Oui si un établissement vous propose un TAEG supérieur au taux d'usure de votre tranche de montant fixé pour le trimestre en cours ; en dessous de ce plafond, le taux reste légal quel que soit son niveau.

### Que se passe-t-il si mon versement est inférieur au minimum réglementaire ?

Le calculateur vous signale ce cas ; en pratique, votre établissement ne peut pas accepter un versement contractuel inférieur au minimum imposé par la règle des 36 ou 60 échéances.

### Le calcul intègre-t-il l'assurance facultative associée au crédit renouvelable ?

Non par défaut ; si vous avez souscrit une assurance emprunteur facultative, ajoutez son coût mensuel à votre versement pour obtenir une estimation plus proche de votre relevé réel.

### Quand dois-je refaire ce calcul ?

Après chaque nouveau prélèvement sur la réserve, chaque changement de TAEG à la fin d'une période promotionnelle, ou avant toute décision de solder le crédit par anticipation.

## Sources

- [Banque de France — taux d'usure, troisième trimestre 2026](https://www.banque-france.fr/fr/statistiques/taux-et-cours/taux-dusure-2026-q3), consulté le 2026-07-31
- [economie.gouv.fr — ce qu'il faut savoir sur le taux d'usure](https://www.economie.gouv.fr/particuliers/gerer-mon-argent/emprunter-et-sassurer/pret-ce-quil-faut-savoir-sur-le-taux-dusure), consulté le 2026-07-31
- [Code de la consommation, article L312-65 (remboursement minimal du capital)](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226049), consulté le 2026-07-31
