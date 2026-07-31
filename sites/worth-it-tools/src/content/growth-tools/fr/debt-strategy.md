---
contentType: tool
toolSlug: debt-strategy
locale: fr
title: "Calculateur d'ordre de remboursement de dettes (boule de neige / avalanche)"
description: "Comparez l'ordre boule de neige, avalanche ou personnalisé pour plusieurs dettes françaises — crédit renouvelable, prêt personnel, découvert — et leur coût total en intérêts."
relatedArticle: /fr/snowball-vs-avalanche/
lastReviewed: 2026-07-31
draft: false
---

Entrez le solde, le taux et le minimum de chaque dette — crédit renouvelable, prêt personnel, découvert bancaire — pour comparer la méthode avalanche, la méthode boule de neige et un ordre personnalisé sur le total des intérêts payés et la date de fin.

## Ce qu'il faut réunir avant de calculer

Notez le solde actuel, le TAEG contractuel et la mensualité minimale de chaque dette séparément, y compris un découvert bancaire récurrent si vous en avez un — ses agios sont souvent proches du taux d'usure des petits montants. Indiquez le montant supplémentaire que vous pouvez consacrer chaque mois au-delà de tous les minimums cumulés.

## Comment le calcul est fait

`cycle mensuel : calcul des intérêts de chaque dette → paiement des minimums → versement supplémentaire sur la dette ciblée → report de la mensualité libérée dès qu'une dette est soldée`

Le calculateur conserve la précision complète en interne et n'arrondit qu'à l'affichage. En méthode avalanche, le versement supplémentaire cible la dette au TAEG le plus élevé ; en méthode boule de neige, celle au solde le plus faible. Le crédit immobilier n'est pas inclus par défaut, car son taux et ses règles de remboursement anticipé suivent une logique différente.

## Exemple chiffré

Avec un crédit renouvelable de 1 000 € à 21 %, un prêt personnel de 3 500 € à 13 % et un crédit auto de 8 000 € à 6 %, et 300 € supplémentaires par mois, la méthode avalanche cible d'abord le crédit renouvelable à 21 %, ce qui minimise le total des intérêts sur l'ensemble des trois dettes. Comparez avec l'ordre boule de neige pour voir si le classement change selon vos propres soldes.

## Pourquoi le crédit renouvelable ressort presque toujours en premier

Un crédit renouvelable de moins de 3 000 € peut légalement atteindre un TAEG de 23,53 % au troisième trimestre 2026, largement au-dessus des taux d'un prêt personnel classique ou d'un crédit immobilier ([Banque de France — taux d'usure 2026-T3](https://www.banque-france.fr/fr/statistiques/taux-et-cours/taux-dusure-2026-q3), consulté le 2026-07-31). C'est pourquoi la méthode avalanche cible presque systématiquement un crédit renouvelable en premier dans un foyer français type, avant même de comparer les autres dettes entre elles.

## Limites de ce calculateur

Cette estimation est pédagogique et ne remplace pas un conseil budgétaire personnalisé. Si le total de vos mensualités minimales dépasse durablement votre capacité de remboursement, ce calculateur ne se substitue pas à une démarche auprès d'une commission de surendettement de la Banque de France. Le calcul s'exécute entièrement dans votre navigateur, sans envoi de données à un serveur. N'insérez ni numéro de compte, ni nom, ni autre donnée identifiable dans un lien de résultat partagé.

## Guide associé

Lisez [Boule de neige, avalanche, ou d'abord le crédit renouvelable : quel ordre pour plusieurs dettes](/fr/snowball-vs-avalanche/) pour comprendre pourquoi le crédit renouvelable prime presque toujours, comment traiter le découvert et le crédit immobilier, et quand envisager un rachat de crédits ou un dossier de surendettement.

## Foire aux questions

### Dois-je inclure mon crédit immobilier dans ce calculateur ?

Non par défaut : son taux est presque toujours inférieur aux dettes à la consommation et il suit des règles de remboursement anticipé différentes. Traitez-le séparément.

### Mon découvert bancaire compte-t-il comme une dette dans ce calcul ?

Oui, ajoutez-le si vous êtes régulièrement à découvert : ses agios approchent souvent le taux d'usure des petits montants et il mérite d'être traité comme une priorité, au même titre qu'un crédit renouvelable.

### La méthode avalanche est-elle toujours la moins chère ?

Mathématiquement oui, en intérêts totaux payés. La méthode boule de neige peut néanmoins mieux convenir si l'effet de solder rapidement une première dette aide à maintenir l'effort de remboursement dans la durée.

### Le calculateur peut-il me dire si je devrais faire un rachat de crédits ?

Non, il compare uniquement des ordres de remboursement à conditions inchangées ; un rachat de crédits change le taux et la durée eux-mêmes et nécessite une simulation séparée auprès d'un établissement.

### Quand dois-je refaire ce calcul ?

À chaque nouvelle dette contractée, chaque changement de taux à la fin d'une période promotionnelle, ou chaque fois que le montant disponible pour le versement supplémentaire change.

## Sources

- [Banque de France — taux d'usure, troisième trimestre 2026](https://www.banque-france.fr/fr/statistiques/taux-et-cours/taux-dusure-2026-q3), consulté le 2026-07-31
- [economie.gouv.fr — déposer un dossier de surendettement](https://www.economie.gouv.fr/particuliers/gerer-mon-argent/beneficier-daides-et-de-reductions-dimpots/difficultes-financieres-comment-deposer-un-dossier-de-surendettement), consulté le 2026-07-31
