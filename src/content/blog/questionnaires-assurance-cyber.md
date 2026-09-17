# Ce que dix questionnaires d'assurance cyber révèlent des attentes réelles des assureurs

*Analyse de dix formulaires de souscription réels, de 2016 à 2023. Ce qu'ils demandent, ce qu'ils ont cessé d'accepter, et les endroits où ils contredisent l'ANSSI.*

---

Un dirigeant de PME qui souscrit une assurance cyber signe un document qu'il ne comprend pas entièrement. Ce n'est pas une formule : trois des dix questionnaires que j'ai analysés joignent leur propre glossaire, parce que leurs rédacteurs savent que les termes employés — DMZ, moindre privilège, WORM, règle 3/2/1 — ne parlent pas à celui qui signe.

Ce document n'est pourtant pas anodin. Les formulaires français rappellent tous les mêmes articles du Code des assurances : l'obligation de répondre exactement et complètement (L113-2), la nullité du contrat en cas de fausse déclaration intentionnelle (L113-8), la réduction des indemnités en cas de déclaration inexacte non intentionnelle (L113-9). Deux d'entre eux précisent explicitement que les réponses font partie intégrante du contrat et lui servent de base.

Autrement dit : ce que vous cochez un dimanche soir devient une clause opposable le jour du sinistre.

J'ai lu dix de ces questionnaires en entier — assureurs et courtiers, français et étrangers, de la TPE au groupe international. Voici ce qu'ils révèlent.

## Le durcissement, en trois chiffres

**Les correctifs de sécurité.** En 2018, un questionnaire acceptait une application des correctifs tous les six mois. En 2019, le seuil est passé à trente jours. En 2023, un assureur demande des délais cibles différenciés par niveau de criticité CVSS — et, au-delà, le taux de respect effectivement constaté sur les douze derniers mois. On est passé d'une bonne intention à une mesure de performance.

**L'authentification multifacteur.** Totalement absente du questionnaire de 2018. Présente en 2019. En 2021, déclinée par population : tous les utilisateurs, les comptes administrateurs seulement, avec plan de déploiement exigé si elle manque. En 2023, déclinée par périmètre : accès distant, messagerie web, comptes privilégiés de l'annuaire — chacun faisant l'objet d'une question distincte.

**La détection sur les postes.** Le questionnaire de 2016 demandait déjà, sans le nommer, un outil d'analyse comportementale contre les rançongiciels. En 2021, l'EDR n'apparaît que comme mesure compensatoire pour un système obsolète. En 2023, il fait l'objet d'une section propre, avec nom du fournisseur et pourcentage de postes couverts.

Ce dernier point mérite qu'on s'y arrête. Déclarer « nous avons un EDR » alors qu'il est déployé sur 60 % du parc n'est plus une approximation acceptable : deux questionnaires du corpus demandent explicitement le pourcentage de couverture et la raison des exclusions.

![Exigences cyber attendues et erreurs de déclaration courantes, par taille d'entreprise](/images/blog/exigences-cyber-par-taille-entreprise.svg)

## L'écart entre ce qu'on affirme et ce qu'on peut prouver

C'est le fil rouge du corpus, et il se voit dans la formulation des questions.

Un questionnaire de 2018 demandait si les sauvegardes existaient. Un questionnaire de 2019 demande la date du dernier test de restauration. Pas la fréquence théorique — la date. La différence est décisive : une politique qui prévoit un test trimestriel alors que le dernier remonte à dix-huit mois produit une réponse fausse si l'on répond à la question sur la fréquence.

Même logique ailleurs. Un assureur demande combien de personnes disposent de droits d'administration, **et pourquoi ce nombre est nécessaire**. Un autre demande qui identifie les données critiques de l'entreprise, avec la fonction des personnes impliquées. Un troisième demande l'expérience professionnelle du responsable de la sécurité, et s'il a une visibilité au niveau de la direction.

Ces questions ne se répondent pas de mémoire. Elles supposent qu'un travail a été fait.

## Les trois questions auxquelles presque personne ne peut répondre

En croisant les dix questionnaires, trois exigences se détachent par leur difficulté pour une structure sans DSI.

**Combien de comptes à privilèges, et pourquoi ?** Le décompte exact, ventilé entre comptes de service, accès administratif, accès persistant et accès complet à l'annuaire. Ce décompte n'existe généralement pas. Y répondre suppose de l'établir.

**Comment protégez-vous vos sauvegardes si un attaquant est présent dans votre système depuis plusieurs semaines ?** Un questionnaire pose l'hypothèse à quarante-cinq jours. La question est juste — les attaquants restent souvent longtemps avant de déclencher le chiffrement — mais elle est hors de portée d'un dirigeant seul.

**Votre sauvegarde cloud est-elle un vrai système de sauvegarde, ou un service de synchronisation ?** Un assureur pose la question en nommant les services grand public. C'est probablement la confusion la plus répandue chez les PME : un service de synchronisation propage le chiffrement vers le cloud au lieu d'en protéger.

## À quoi ressemblent les questions, concrètement

Les sujets abordés bougent peu d'un questionnaire à l'autre. Ce qui change, c'est le palier auquel ils apparaissent — et la précision attendue en réponse.

![Questions types selon la taille de l'entreprise](/images/blog/questions-audit-par-taille.svg)

Trois détails méritent l'attention.

**Les questions récentes appellent une date, un pourcentage ou un délai.** Pas un oui. C'est la trace la plus visible du durcissement : on ne demande plus si vous sauvegardez, on demande quand vous avez restauré pour la dernière fois.

**Un assureur propose « je ne sais pas » comme réponse valable** sur la question des systèmes en fin de support. Il anticipe donc que l'entreprise n'a pas fait l'inventaire. C'est une concession révélatrice.

**Avoir un plan de reprise ne suffit plus.** Il doit explicitement couvrir un scénario de rançongiciel, et avoir été testé. Deux questionnaires demandent la date du dernier exercice.

Au palier supérieur, les questions deviennent difficiles à traiter sans travail préalable. Le décompte des comptes à privilèges avec sa justification, ou le taux de respect des délais de correctif sur douze mois, ne sont pas des questions auxquelles on répond de mémoire un dimanche soir.

## Là où les assureurs contredisent l'ANSSI

Il arrive qu'un questionnaire demande l'inverse de ce que recommande l'agence nationale. Le cas le plus net concerne les mots de passe.

Un questionnaire français demande si chaque salarié est contraint de changer son mot de passe au moins trimestriellement. La réponse attendue est évidemment « oui ».

Or l'ANSSI recommande, dans ses recommandations relatives à l'authentification multifacteur et aux mots de passe, de **ne pas imposer par défaut de délai d'expiration sur les mots de passe des comptes non sensibles**, dès lors que la politique exige des mots de passe robustes. Elle réserve l'expiration aux comptes à privilèges, avec une durée suggérée entre un et trois ans, et impose évidemment une révocation immédiate en cas de compromission.

Une entreprise qui applique la doctrine actuelle de l'agence nationale doit donc répondre « non » à une question dont la réponse attendue est « oui ».

C'est le type de situation où cocher une case sans commentaire dessert l'entreprise. La bonne réponse n'est ni oui ni non : c'est une réponse argumentée — pas d'expiration périodique sur les comptes utilisateurs, politique de mots de passe robustes, expiration imposée sur les comptes à privilèges, conformément aux recommandations ANSSI.

Encore faut-il savoir que la contradiction existe.

## Ce que les assureurs ne demandent pas — et qui compte

Trois sujets traités par l'ANSSI n'apparaissent dans aucun des dix questionnaires.

**Les comptes partagés.** Le compte « compta », le compte « accueil ». L'ANSSI y consacre un développement entier dans ses fiches de mise en pratique du Référentiel Cyber France : reconnaissance des cas où ils sont inévitables, mesures compensatoires attendues, obligation de changer les secrets à chaque entrée ou sortie du groupe. Aucun assureur ne pose la question — ce qui permet à un dirigeant de déclarer de bonne foi que chaque utilisateur dispose d'un identifiant unique tout en ayant trois comptes partagés en production.

**La contamination des sauvegardes.** L'ANSSI signale qu'après un incident, les sauvegardes peuvent contenir des implants de l'attaquant, et que la restauration doit se faire depuis des sources de confiance avec contrôle de conformité et analyse antivirale. Aucun questionnaire du corpus n'aborde ce risque.

**Les médias d'installation.** Sauvegarder les données sans sauvegarder les logiciels et leurs configurations, c'est allonger considérablement le délai de reprise. L'ANSSI le recommande explicitement ; les assureurs ne le demandent pas.

Un questionnaire d'assureur mesure ce qu'un assureur sait tarifer. Ce n'est pas la même chose que mesurer la sécurité réelle d'une entreprise.

## Une réponse peut modifier le contrat avant tout sinistre

On parle beaucoup du risque de refus d'indemnisation. Le corpus contient un mécanisme plus direct, et plus immédiat.

Un questionnaire français destiné aux professionnels de santé indique, à côté de la question sur le chiffrement des données, que répondre « non » limite la souscription à un plafond de garantie réduit.

Ce n'est pas une menace différée. C'est une réponse au formulaire qui change mécaniquement le contrat, avant qu'aucun incident ne survienne.

Et côté exclusions, un document d'information produit consulté dans le cadre de cette analyse liste, parmi les cas non couverts, les dommages résultant du non-respect du plan de prévention établi avant la conclusion du contrat, et ceux liés à l'absence de sauvegarde. Écrit noir sur blanc, dans un document remis avant signature.

## L'amplitude, ou pourquoi il n'y a pas de préparation type

Le corpus va d'un questionnaire de trois questions de sécurité à un formulaire de plus de cent cinquante items avec sections conditionnelles sur la technologie opérationnelle, la biométrie, les acquisitions et les terminaux de paiement.

Entre les deux, un assureur a résolu le problème à sa manière : en dessous d'un seuil de chiffre d'affaires, seules les sections signalées sont obligatoires ; au-delà, tout le questionnaire. Le document porte lui-même sa logique de proportionnalité.

Ce que ça implique pour un dirigeant : la première question à se poser face à un questionnaire n'est pas « comment je réponds » mais « qu'est-ce qui me concerne réellement ». Sur un formulaire de cent questions, une PME sans données de santé, sans paiement par carte, sans filiale hors UE et sans systèmes industriels peut en écarter légitimement une bonne moitié.

## Ce que j'en retire

Trois choses, si vous devez remplir ce type de document.

**Distinguez ce que vous affirmez de ce que vous pouvez prouver.** Pour chaque réponse positive, demandez-vous quelle pièce datée vous produiriez si on vous la demandait. Les questions qui portent sur des dates plutôt que sur des fréquences sont là pour ça.

**Traitez les contradictions comme des occasions d'argumenter, pas comme des cases à cocher.** Quand la bonne pratique actuelle diverge de la question posée, expliquez-le dans les champs de commentaire — tous les questionnaires en prévoient.

**Faites l'inventaire avant de répondre.** Le décompte des comptes à privilèges, la liste des systèmes en fin de support, la date du dernier test de restauration : ces réponses ne s'improvisent pas, et ce sont celles qui engagent le plus.

---

*Analyse menée sur dix questionnaires de souscription publiquement accessibles, datés de 2016 à 2023, croisés avec les publications de l'ANSSI : guide de sauvegarde des systèmes d'information (ANSSI-BP-100), recommandations relatives à l'authentification multifacteur et aux mots de passe, mesures cyber préventives prioritaires, guide TPE/PME, et fiches de mise en pratique du Référentiel Cyber France.*

*Les questionnaires cités appartiennent à leurs éditeurs. Aucune formulation n'en est reprise : les exigences décrites relèvent de pratiques de sécurité documentées publiquement.*

*Les recommandations ANSSI évoluent ; vérifiez les versions en vigueur avant de vous en prévaloir dans une déclaration contractuelle. Cet article n'est pas un conseil juridique ni assurantiel.*
