AssurConseil RAG répond à des questions sur quatre contrats d'assurance fictifs et compare côte à côte deux moteurs : Claude (Anthropic) et Mistral Large 3. Le 25 septembre, je l'ai évalué sur 20 questions, soit 40 réponses. Le contrôle était un plancher : aucune panne, un refus correct quand l'information n'est pas dans les documents, aucune citation d'article inventée. Les deux moteurs l'ont passé.

Un plancher ne dit pas si une réponse est fidèle au contrat. Une réponse peut citer le bon article et lui faire dire autre chose. Pour le vérifier sans relire 40 réponses à la main, j'ai mis en place un juge LLM. Voici la méthode, les résultats et les limites.

## Les choix de méthode

**Un juge d'un autre fournisseur.** Les réponses viennent de Claude et de Mistral, donc le juge ne devait être ni l'un ni l'autre. J'ai pris Gemini 3.8 Flash (Google), appelé via Vertex AI en région UE. Le même juge note les deux moteurs, sans savoir lequel a écrit la réponse.

**Une grille courte, en oui ou non.** Elle a trois critères :

- la fidélité au contrat (une connaissance générale est tolérée si elle est présentée comme une hypothèse) ;
- l'exactitude des citations ;
- le refus quand l'information est absente.

Le juge écrit sa justification avant son verdict.

**Le contrat entier comme référence.** Les extraits réellement récupérés le 25 septembre n'avaient pas été sauvegardés. Le juge compare donc chaque réponse au contrat complet. C'est exact pour deux documents, et une approximation pour les deux autres, plus longs.

**Dix copies piégées.** Pour savoir si le juge détecte une erreur, il faut lui en soumettre dont on connaît la réponse. J'ai fabriqué 10 copies de vraies réponses, chacune avec une seule erreur, glissée de façon cohérente. Cinq types d'erreurs (chiffre modifié, garantie inventée, condition supprimée, citation déplacée, refus cassé), sur les réponses de chacun des deux moteurs : six pièges subtils, quatre faciles. Le juge ne sait pas quelles copies sont piégées.

**Des seuils fixés avant le premier appel.** Pour que le juge soit validé, il fallait :

- au moins 8 pièges sur 10 détectés ;
- au plus un piège d'écart entre les deux moteurs.

En cas d'échec, une seule correction du prompt était autorisée. Et les résultats seraient publiés même mauvais. Ces règles ont été écrites et commitées avant tout appel au juge.

**Un changement de protocole, annoncé avant le run.** Le plan prévoyait aussi que j'annote moi-même les 40 réponses, pour comparer mon avis à celui du juge. J'ai abandonné en cours de route : c'était trop long, et je ne suis pas expert en assurance, donc mon annotation aurait été une référence fragile. J'ai réécrit les seuils pour valider le juge par les pièges seuls, et commité ce changement 21 minutes avant de lancer le run. Changer de protocole est légitime avant de voir les résultats, pas après.

## Les résultats

Le run complet, le 14 octobre : 50 jugements (40 réponses et 10 pièges), tous exploitables, pour 0,46 $ et une dizaine de minutes.

**Les pièges : 9 sur 10.** Le juge a détecté les 5 pièges tirés des réponses de Claude et 4 sur 5 pour Mistral, soit un écart de 1, pile au seuil. Le piège manqué est une condition supprimée. Le juge a mieux repéré ce qu'on ajoute que ce qu'on retire, mais un seul cas ne permet pas d'en faire une règle.

**Les vraies réponses : 7 erreurs confirmées sur 40.** Le juge a rejeté 8 des 40 réponses d'origine. Je les ai toutes relues contre le texte du contrat, chaque verdict appuyé par une citation exacte. Sept fois, le juge avait raison. Quelques exemples :

- une condition prévue pour l'incapacité temporaire, que la réponse applique à l'invalidité ;
- une première phrase, en gras, qui contredit l'article qu'elle commente, corrigée deux paragraphes plus bas ;
- une règle attribuée à un article et introuvable dans tout le contrat ;
- une durée de formation « recommandée » devenue « obligatoire ».

Ces 7 réponses avaient toutes passé le contrôle du 25 septembre. Elles se répartissent en 5 pour Mistral et 2 pour Claude, sur 20 réponses chacun. Ce n'est pas un classement : l'échantillon est petit, et le prompt avait été écrit pour Claude, ce qui désavantage Mistral.

**Une fausse accusation.** La huitième fois, le juge s'est trompé : il a reproché à une réponse de Claude une information que le tableau du contrat confirmait. Je n'en connais pas la cause avec certitude. Soit le tableau, aplati dans le texte transmis au juge, était mal lisible ; soit le juge a suivi la fiscalité réelle plutôt que celle du contrat fictif. Ailleurs, un autre tableau aplati a trompé le moteur, cette fois : la réponse a rattaché une recommandation à la mauvaise ligne. La qualité de l'extraction des documents compte autant que le modèle.

Dernière nuance : même quand le verdict est juste, la justification du juge n'est pas toujours exacte (au moins deux cas sur sept). Le verdict est plus fiable que l'explication.

## Les limites

- **Dix pièges, c'est peu.** 9 sur 10 ne veut pas dire « fiable à 90 % » : sur un si petit échantillon, l'incertitude est large.
- **Les 32 réponses acceptées n'ont pas été relues.** Le nombre d'erreurs que le juge a laissées passer sur de vraies réponses reste inconnu. On sait seulement qu'il a manqué 1 piège sur 10.
- **Un seul run.** La stabilité du juge d'un passage à l'autre n'est pas mesurée.
- **Le contrat entier plutôt que les extraits** : c'est une approximation pour deux documents sur quatre.
- **La relecture a été faite avec un assistant de code**, lui-même un modèle Claude. D'où l'exigence d'une citation exacte du contrat pour chaque verdict, vérifiable par n'importe qui.
- **Les seuils sont datés par des commits dans un dépôt privé.** C'est une discipline que je me suis imposée, pas une preuve opposable.

## Ce que je ferais en production

- Extraire proprement les tableaux, avant de les donner au moteur comme au juge.
- Relire un échantillon des réponses acceptées, pour estimer ce que le juge laisse passer.
- Faire annoter un échantillon par un expert métier, ce que je ne suis pas.
- Relancer le juge à chaque changement de modèle ou de prompt, et plusieurs fois pour mesurer sa stabilité.

Le juge ne remplace pas l'expert, il trie : sur 40 réponses, il en a signalé 8, dont 7 fautives, pour moins d'un demi-dollar.
