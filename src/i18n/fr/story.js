export default {
  speakers: {
    crane: 'Sous-secrétaire Philippa Crane',
    sister: 'Mira',
    shopkeeper: 'Haruto Ibe',
    coworker: 'Saskia Oyelaran',
    moth: 'MOTH',
    system: 'HARMONY OS',
  },

  scenes: {
    craneIntro: {
      lines: [
        ['crane', 'Architecte {last}. Asseyez-vous. Ne touchez pas à la plante — c’est le seul être vivant de cet étage qui n’a jamais déposé de réclamation.'],
        ['crane', 'L’hiver dernier, le Ministre a promis sous la pluie zéro pour cent de criminalité d’ici un an. Pour lui, c’était un slogan. Le Trésor a entendu une échéance. Aujourd’hui, c’est votre échéance.'],
        ['crane', 'Votre terminal contient le registre civique : dix mille citoyens, tout ce qu’on a le droit de savoir sur eux. Vous écrivez les règles. Une règle est une hypothèse — un profil. Quiconque y correspond reçoit un verdict.'],
        ['crane', 'SURVEILLER, c’est bon marché et propre. Un criminel surveillé se fait prendre la main dans le sac ; un innocent surveillé n’en saura jamais rien. Mais nous n’avons des yeux que pour trois cents personnes à la fois.'],
        ['crane', 'DÉTENIR n’a pas de limite. Pas de conscience non plus. Les détenus sont jugés, et les innocents restent dedans quand même — la paperasse ne fait pas marche arrière. Chaque innocent détenu, c’est une famille qui cesse de nous croire. Assez de familles comme ça, et la ville brûle.'],
        ['crane', 'L’administration précédente vous a laissé ses rapports de crimes. Des dépositions de témoins, et seulement pour les crimes que quelqu’un a pris la peine de signaler. Des sornettes, surtout. Mais les sornettes ont des schémas.'],
        ['crane', 'Ce premier mois, le Ministre vous accorde une règle. Une seule. Faites-la compter, et faites-la tenir.'],
        ['crane', 'Encore une chose. Vous êtes dans le registre, vous aussi. Première ligne. Les règles ne savent pas qui les a écrites.'],
      ],
      replies: [
        ['Compris.', 'Ceux qui disent « compris » le premier jour n’ont généralement rien compris. Donnez-moi tort.'],
        ['Et si mes règles me désignent ?', 'Alors vous aurez écrit une règle très honnête. Évitez.'],
      ],
    },
    sisterCall: {
      lines: [
        ['sister', '{first} ! Ne raccroche pas, je n’appelle pas pour de l’argent. …J’appelle à côté de l’argent. Dans le voisinage de l’argent.'],
        ['sister', 'Le loyer a encore augmenté. Le proprio appelle ça la « surtaxe d’harmonie ». Je lui ai dit que l’harmonie, c’est quand deux notes s’accordent, et que nous deux, on ne s’accorde pas. Il n’a pas ri.'],
        ['sister', 'Alors, ce Ministère ? Tu peux lire le dossier de tout le monde ? Ne lis pas le mien. Il est ennuyeux, et il y a une histoire de vol à l’étalage quand j’avais quinze ans. C’était un rouge à lèvres. Un rouge à lèvres affreux.'],
        ['sister', 'Mon insuline, ça va. À peu près. Halcyon Bio parle d’une « révision tarifaire ». Ce n’est jamais une bonne nouvelle quand une entreprise révise quelque chose, hein.'],
        ['sister', 'Viens manger au comptoir, un de ces jours. Je te mettrai un œuf en plus et je mentirai à mon chef.'],
      ],
      replies: [
        ['Je vais t’envoyer un peu d’argent.', 'Tu ne vas rien m’envoyer du tout. …Bon. Tu vas m’envoyer un peu d’argent, et je te rembourserai. Un jour. À l’échelle géologique.'],
        ['Fais attention à toi, Mira.', 'Je fais toujours attention. Aussi sûrement que la pluie est sèche.'],
      ],
    },
    craneContacts: {
      lines: [
        ['crane', 'Les Télécoms nous ont remis le graphe des appels. Qui appelle qui, qui envoie de l’argent à qui, qui dort sur le canapé de qui. Il y a une nouvelle colonne dans votre registre : Contacts.'],
        ['crane', 'Vous pouvez maintenant écrire des règles sur les amis des gens. « A au moins trois contacts en prison » — ce genre de chose. C’est laid, et ça marche. Le crime est une activité sociale.'],
        ['crane', 'J’ai remarqué que votre sœur figure dans votre graphe. Strate 9, un casier, quelques dettes. Je ne dis rien. Je dis que j’ai remarqué.'],
        ['crane', 'Et Marek Duarte, Strate 4. Il transporte des choses que nous ne voyons pas. Je vous ai laissé une note dans votre courrier.'],
      ],
      replies: [
        ['Qu’est-ce qu’il transporte ?', 'Si je le savais, je me contenterais de le faire surveiller. Je veux qu’il soit détenu.'],
        ['Laissez ma sœur en dehors de ça.', 'J’adorerais. Les données, non.'],
      ],
    },
    craneContactsJailed: {
      lines: [
        ['crane', 'Les Télécoms nous ont remis le graphe des appels. Il y a une nouvelle colonne dans votre registre : Contacts. Vous pouvez maintenant écrire des règles sur les amis des gens. Le crime est une activité sociale.'],
        ['crane', 'Votre sœur figure dans votre graphe, à la rubrique « incarcérée ». Je ne dis rien. Vous non plus, j’imagine.'],
        ['crane', 'Et Marek Duarte, Strate 4. Il transporte des choses que nous ne voyons pas. Je vous ai laissé une note dans votre courrier.'],
      ],
    },
    shopkeeperTip: {
      lines: [
        ['shopkeeper', '{first} ! Tu me dois toujours ce parapluie. Douze ans, avec les intérêts — tu pourrais racheter la boutique.'],
        ['shopkeeper', 'Assieds-toi. Le thé est mauvais, mais il est chaud.'],
        ['shopkeeper', 'Je vais le dire une fois, et après je ferai comme si je n’avais rien dit. La Société de bienfaisance Tidewater. Ils appellent ça une assurance : deux cents par semaine, ou tes vitres ont des accidents. J’ai payé onze ans. J’en paierais onze de plus.'],
        ['shopkeeper', 'Mais maintenant, ils veulent Ren. Ils veulent qu’il fasse la mule pour eux aux Docks. Il a dit non. Puis il les a vus briser les mains d’un homme sur le Quai 6, et maintenant c’est lui, le problème.'],
        ['shopkeeper', 'Il y en a trois qui passent tous les vendredis. Des gars des Docks, cartes d’Ouvrier. Un dans la trentaine, deux plus vieux, la cinquantaine peut-être. Plus pauvres du tout — c’est comme ça qu’on sait qui en est. Entre dix et cent mille, facile. Tous les trois ont fait de la prison ; ils s’en vantent.'],
        ['shopkeeper', 'Ça fait trois. Les autres, je ne les connais pas. Mais toi, tu es le Ministère. Trois, c’est un fil, et un fil, ça se tire.'],
        ['shopkeeper', 'Garde Ren hors de tes listes, {first}. C’est tout ce que je demande. C’est un imbécile têtu. C’est mon imbécile têtu.'],
      ],
      replies: [
        ['Je ferai ce que je peux.', 'Sa mère disait ça. Elle en faisait toujours plus.'],
        ['Pourquoi moi et pas la police ?', 'Parce que la police aussi passe à la boutique le vendredi. Simplement, elle ne paie pas.'],
      ],
    },
    sisterUndocumented: {
      lines: [
        ['sister', 'Bon. Histoire marrante. Tu sais que le Bureau de l’immigration vient de refiler les papiers de tout le monde à ton Ministère ?'],
        ['sister', 'Mon titre de séjour a expiré. Il y a deux ans. Le renouvellement coûtait trois mille et j’en avais quatre cents, alors j’ai choisi l’insuline. Je me suis dit : qui va vérifier ? Réponse : toi. C’est toi qui vérifies.'],
        ['sister', 'Ne fais pas cette tête. J’entends la tête que tu fais.'],
        ['sister', 'Toi, tu as eu tes papiers parce que tu as réussi le concours du Ministère. Moi, j’ai eu le diabète de Maman et une carte de bibliothèque. Partage équitable.'],
        ['sister', 'Je ne te demande rien. Je voulais juste que tu l’apprennes par moi, et pas par une colonne.'],
      ],
      replies: [
        ['Je vais payer le renouvellement.', 'Pas question. …{first}. Pas question. …Si tu le fais, j’appelle mon premier chat comme toi, et ce sera un chat méchant.'],
        ['Pourquoi tu ne m’as rien dit ?', 'Parce que tu aurais fait exactement ce que tu fais en ce moment : t’inquiéter avec efficacité.'],
      ],
    },
    craneBudget: {
      lines: [
        ['crane', 'Le Trésor a rogné le budget de la surveillance. Votre plafond SURVEILLER tombe à deux cent cinquante. Je me suis battue pour trois cents. J’ai perdu poliment.'],
        ['crane', 'Ils s’attendront à plus de détentions pour compenser. C’est comme ça qu’une coupe budgétaire devient une politique.'],
        ['crane', 'Et le cabinet du Commissaire vous contactera au sujet d’une affaire personnelle. Quand ce sera le cas, souvenez-vous que je ne suis pas dans la pièce.'],
      ],
    },
    coworkerCoffee: {
      lines: [
        ['coworker', 'Tu penses parfois aux gens à l’autre bout ? Pas aux criminels. Aux lignes.'],
        ['coworker', 'Ma voisine du dessous a été détenue au printemps. Déclarée innocente. Toujours dedans. « La paperasse ne fait pas marche arrière » — Crane adore cette phrase. Elle la dit comme on parle de la météo.'],
        ['coworker', 'Pardon. Sale semaine. Je dors à mon bureau ; il faut bien arroser Ministre.'],
        ['coworker', 'Dis — le registre des informateurs. Qui a l’habilitation ? Juste toi et Crane, ou tout l’étage ?'],
      ],
      replies: [
        ['Pourquoi tu demandes ?', 'Curiosité. Elle a tué le chat, mais le chat a bien profité de la vie.'],
        ['Juste moi et Crane.', 'Hm. Bon à savoir. Oublie que j’ai demandé. Je suis fatiguée et indiscrète, dans cet ordre.'],
      ],
    },
    mothTakeover: {
      glitch: true,
      lines: [
        ['system', 'SESSION NON AUTORISÉE // PRISE DE CONTRÔLE DU TERMINAL // NE PAS ÉTEINDRE'],
        ['moth', 'Bonjour, Architecte. Ne cherchez pas le câble. Ceci est une visite de courtoisie, pas un braquage.'],
        ['moth', 'Nous sommes Lanterne. Vous connaissez notre travail : le réseau de tramways, le panneau Halcyon qui a dit au Ministre ce que la Strate 9 pense de lui. Celui-là, c’était moi.'],
        ['moth', 'Un cadeau. La Serre fait passer des implants, de l’insuline et des gens par la Strate 9. Ils vendent des puces Halcyon rejetées à des gosses qui n’ont pas les moyens des vraies. Je le sais, parce qu’il y en a une qui pourrit dans mon crâne.'],
        ['moth', 'Trois de leurs passeurs : Strate 9, cartes d’Ouvrier, jeunes, sans papiers. Entre dix et cent mille en banque, parce que la contrebande paie mieux que les docks. Voilà votre fil.'],
        ['moth', 'En échange, Inès Varga reste RAS. Pas surveillée. RAS. Si elle atterrit sur une de vos listes, on vous écrit un casier judiciaire — un vrai, dans votre propre registre. Vous savez ce que vos règles font aux gens qui ont un casier.'],
        ['moth', 'Vous n’êtes pas un monstre, Architecte. Vous êtes une fonction. Les fonctions, ça se réécrit.'],
      ],
      replies: [
        ['Pourquoi aider le Ministère ?', 'Je n’aide pas le Ministère. J’aide la Strate 9. Votre Ministère, c’est juste la pelle que j’ai trouvée.'],
        ['Vous êtes Inès Varga.', 'Ah oui ? Prouvez-le. Ah, mais c’est vrai — vous pouvez. C’est bien tout le problème.'],
      ],
    },
    lanternTakeover: {
      glitch: true,
      lines: [
        ['system', 'SESSION NON AUTORISÉE // PRISE DE CONTRÔLE DU TERMINAL // NE PAS ÉTEINDRE'],
        ['moth', 'Vous ne connaissez pas ma voix. C’est MOTH qui parlait, avant. Vos règles s’en sont occupées.'],
        ['moth', 'Nous sommes toujours Lanterne. Et la Serre vend toujours des puces Halcyon pourries aux gosses de la Strate 9.'],
        ['moth', 'Trois de leurs passeurs : Strate 9, cartes d’Ouvrier, jeunes, sans papiers, entre dix et cent mille en banque. Prenez-les. Pas pour vous. Pour les gosses.'],
        ['moth', 'MOTH aurait demandé quelque chose en retour. Moi, je vous demande de vous rappeler qui a écrit la règle qui l’a prise.'],
      ],
    },
    sisterConfession: {
      lines: [
        ['sister', '{first}. Il y a quelqu’un avec toi ? Non ? D’accord. D’accord.'],
        ['sister', 'Halcyon a multiplié le prix de l’insuline par cinq. Cinq. Il me restait neuf jours. Pareil pour Bao, du comptoir, et Mme Okafor, du troisième, et le gamin avec le — peu importe.'],
        ['sister', 'Hier soir, on est entrés dans le dispensaire de la rue Kettle. Personne n’a été blessé. Le vigile a regardé ailleurs ; sa fille est diabétique de type 1.'],
        ['sister', 'Je ne regrette pas. Je te le dis parce que ton Ministère est sur le point d’écrire une règle sur les femmes comme moi, et je veux que tu saches qui se trouve à l’autre bout.'],
        ['sister', 'Fais ce que tu as à faire. Je suis sérieuse. Seulement… ne le fais pas sans regarder.'],
      ],
      replies: [
        ['Je te protégerai.', 'Ne promets pas. Les promesses, c’est comme ça que les gens comme toi attrapent des ulcères.'],
        ['Tu aurais dû m’appeler avant.', 'Et tu m’aurais dit quoi ? D’attendre la révision tarifaire ?'],
      ],
    },
    craneInsulin: {
      lines: [
        ['crane', 'Halcyon Bio a augmenté le prix de l’insuline de cinq cents pour cent. Les dispensaires de la Strate 9 ont été pillés dans la nuit. Le ministère de la Santé nous a transmis ses dossiers pour nous aider à « protéger les plus vulnérables ». Diagnostics, ordonnances, grossesses.'],
        ['crane', 'Vous obtenez aussi un quatrième emplacement de règle. Utilisez-le pour les voleurs. Le Ministre veut chacun d’eux sur une liste d’ici la fin du cycle.'],
      ],
    },
    craneHalcyon: {
      lines: [
        ['crane', 'Halcyon Dynamics a signé un contrat de surveillance avec le Ministère. Trois cent cinquante paires d’yeux, toutes privées. Votre plafond SURVEILLER augmente.'],
        ['crane', 'Leurs avocats vont aussi vous envoyer une liste. Ils appellent ça un « registre de courtoisie ». Moi, j’appelle ça une liste.'],
        ['crane', 'Je travaille ici depuis vingt-deux ans. J’étais là pendant les premières émeutes du Centre. J’ai vu ce que fait une ville quand elle cesse de croire que quelqu’un tient la barre. C’est pour ça que je fais ce métier. Halcyon le fait pour le cours de l’action.'],
      ],
    },
    coworkerNote: {
      lines: [
        ['system', 'Un mot plié dans le tiroir de votre bureau, sous l’agrafeuse.'],
        ['coworker', 'Crane sait que c’est moi. Elle va te demander de le faire, parce qu’elle veut savoir si tu le feras.'],
        ['coworker', 'J’ai copié les listes de détention et le registre des informateurs, et je les ai donnés aux Non-Fichés. Les listes, c’était pour les familles. Le registre, c’était une erreur. Je ne savais pas ce qu’ils en feraient. J’aurais dû.'],
        ['coworker', 'Je ne te demande pas de mentir. Juste de laisser une ligne tranquille. Tu sais faire ça. Je t’ai vu faire.'],
        ['coworker', 'Si tu ne peux pas, je comprendrai. Arrose Ministre.'],
      ],
    },
    craneProtests: {
      lines: [
        ['crane', 'Les Non-Fichés ont appelé à la grève générale. Le Centre est couvert de parapluies et de slogans.'],
        ['crane', 'Deux listes ont atterri sur mon bureau ce matin à propos des trois mêmes personnes — l’une des Non-Fichés, l’autre d’en haut. Je vous ai transmis les deux, parce que je suis une lâche dotée d’un excellent sens de la délégation.'],
        ['crane', 'Plus qu’un mois après celui-ci. Tout ce que vous avez construit sera jugé comme un tout. Vous aussi.'],
      ],
    },
    craneFinal: {
      lines: [
        ['crane', 'Dernier mois. Le Ministre a réservé la pluie pour sa conférence de presse.'],
        ['crane', 'J’ai lu vos règles — toutes, chaque mois. Elles vous ressemblent. C’est ce qu’il y a d’effrayant dans ce métier : les règles finissent toujours par ressembler à celui qui les a écrites.'],
        ['crane', 'Terminez.'],
      ],
    },
    craneUnrest: {
      lines: [
        ['crane', 'La colère est à {unrest}. C’est à peu près le nombre de familles qui ont cessé de nous croire, sans compter celles qui ne nous ont jamais crus.'],
        ['crane', 'Elle retombe d’un tiers chaque mois si on la laisse faire. À cent, la ville décide à notre place.'],
      ],
    },
    craneSelfWatch: {
      lines: [
        ['crane', 'Votre nom est apparu sur une liste SURVEILLER le mois dernier. Votre propre liste.'],
        ['crane', 'J’ai vu des architectes le faire exprès, pour prouver quelque chose. Je n’ai jamais vu la démonstration y survivre. Gardez les mains propres tant que vos propres yeux sont sur vous.'],
      ],
    },
  },

  requests: {
    unionists: {
      from: 'Bureau des relations sociales',
      subject: 'Stabilité sociale — noms en pièce jointe',
      body: 'Architecte, trois meneurs syndicaux des docks préparent une grève du zèle au Quai 6 qui coûterait au port environ quatre pour cent de son trafic trimestriel. Les Relations sociales demandent de les DÉTENIR ce cycle. Ceci est une demande, pas un ordre. On nous assure que ce n’est pas la même chose.\nLes Architectes qui rendent service au port voient en général leurs demandes de logement acceptées et leurs évaluations trimestrielles élogieuses. Je serais navré que la vôtre se perde dans la pile. On perd si facilement les choses dans une pile.\n— R. Szabo, Relations sociales',
    },
    motherson: {
      from: 'Nadia Petrosyan',
      subject: 'Mon fils Lev',
      body: 'Cher Ministère, mon fils Lev a vingt-deux ans et la clinique dit que le Ministère a posé des questions sur lui. Ce n’est pas un mauvais garçon. Il prend des choses parfois, des petites choses, dans les boutiques du passage Fennel, parce qu’on n’a pas, et parce qu’il est bête comme les garçons sont bêtes. J’ai le dos malade et c’est lui qui me porte dans l’escalier. Si vous le prenez, qui me portera.\nIls ont déjà emmené son père à Calder, il y a onze ans, pour une dette. Il n’est jamais redescendu de la colline. J’allume une bougie pour lui chaque soir. S’il vous plaît, ne m’obligez pas à en allumer deux.\nVous aussi, vous avez une mère, Architecte. Demandez-lui ce qu’elle ferait. Laissez-le, s’il vous plaît.\n— Nadia Petrosyan, Strate 9, bloc C',
    },
    cell: {
      from: 'Lanterne',
      subject: 'quatre noms, pas de questions',
      body: 'Architecte. Quatre des nôtres. Ils écrivent du code et ils cassent ce qui mérite d’être cassé. Classez-les RAS — ni surveillance, ni détention. Nous nous en souviendrons. Nous nous souvenons de tout ; c’est un peu le principe.\nNous avons lu votre dossier, {first}. Nous avons lu celui de Mira aussi : le titre de séjour expiré, l’insuline qu’elle n’a pas les moyens de payer. Les dossiers sont des choses si fragiles. Les nôtres seraient tendres avec le sien. Soyez tendre avec les nôtres.\n— Lanterne',
    },
    courier: {
      sides: [
        { from: 'Sous-secrétaire Crane', subject: 'Duarte, Marek — DÉTENIR', body: 'Marek Duarte, Strate 4. Corps d’évacuation côtière, libéré avec les honneurs, sans honneur depuis. Il fait passer des colis pour les Non-Fichés — médicaments, imprimantes, personnes. Je veux le DÉTENIR ce mois-ci. Une surveillance ne suffira pas. Je le veux dans une pièce, en train de parler.\nLe poste d’Architecte adjoint se libère au printemps. C’est moi qui rédige la recommandation. Faites ceci et je l’écrirai à l’encre. Sinon, je risque de me demander à voix haute, devant le Ministre, de quel côté vous êtes.\n— P. Crane' },
        { from: 'Un ami des Non-Fichés', subject: 'Manuscrit, trouvé dans la poche de votre manteau', body: 'Quoi que vous fassiez de Marek, ne le placez pas en détention. La détention, c’est le Neuvième Étage, et on revient du Neuvième Étage avec moins de noms dans la tête. Surveillez-le s’il le faut. Il sait se laisser surveiller.\nL’hiver dernier, quand la pharmacie de la Strate 9 s’est retrouvée à sec, Marek a fait passer une boîte d’insuline à travers deux postes de contrôle pour une fille du Lucky Kettle. Demandez à votre sœur laquelle. Vous lui devez bien ça.' },
      ],
    },
    son: {
      sides: [
        { from: 'Haruto Ibe', subject: 'Ren', body: 'Je t’ai donné les noms de Tidewater. J’ai risqué ma boutique, mes vitrines et ma peau pour ton Ministère, et je n’ai rien demandé.\nJe demande maintenant. Garde mon garçon hors de la liste de détention. Surveillé, blanchi, peu importe le nom que lui donne ta machine, du moment qu’il rentre le soir. C’est tout ce qui me reste de sa mère.\nS’ils le prennent, j’ouvrirai quand même la boutique tous les matins. Simplement, je ne saurai plus pourquoi.\n— Haruto' },
        { from: 'Société de bienfaisance Tidewater', subject: 'Une question d’assurance', body: 'Cher Architecte, la Société s’inquiète au sujet d’un jeune homme, Ren Ibe, des Docks, qui raconte des histoires sur nos membres. Les histoires sont mauvaises pour les affaires, et ce sont les affaires qui nourrissent les Docks. Nous considérerions comme une gentillesse que l’on veuille bien DÉTENIR M. Ibe quelque temps.\nVous n’y perdrez pas, Architecte. La Société a toujours pris soin de ses amis, et de leurs familles, et des fenêtres de leurs familles. Vieille Ville, troisième étage, celui avec le basilic mort sur le rebord : un bien joli appartement. Ce serait dommage qu’il arrive quelque chose au basilic.\nOn se souvient des gentillesses. Et des méchancetés aussi.\nBien chaleureusement, une Société de bienfaisance' },
      ],
    },
    pressrefugees: {
      from: 'Service de presse du Ministère',
      subject: 'Soutien visuel pour le journal de ce soir',
      body: 'Architecte, le journal de ce soir s’intitule « Le crime dans les camps ». Nous avons le texte ; il nous faut les images. Merci de DÉTENIR ce cycle les cinq résidents ci-dessous afin que les arrestations puissent être filmées. Ils ont été sélectionnés pour leur lisibilité visuelle. Le Ministre remerciera l’Architecte responsable, nommément, à l’antenne. Le Ministre se souvient aussi, nommément, de ceux qui ont décliné.\nNous vous remercions de votre coopération.\n— Service de presse du Ministère',
    },
    nephew: {
      sides: [
        { from: 'Commissaire A. Vos', subject: 'Personnel — J. Castell', body: 'Architecte, mon neveu Julian traverse une période très éprouvante. Des rumeurs circulent, liées à un malheureux accident de la circulation en Strate 4 et à certaines soirées dans la Flèche. Les rumeurs ne sont pas des preuves. Je considérerais comme une faveur personnelle que son profil reste RAS. Je n’oublie pas les faveurs. J’oublie encore moins leur absence.\nJe crois comprendre que le dossier de séjour de votre sœur est dans un état délicat. Les dossiers délicats peuvent s’égarer, ou être retrouvés. Je préférerais de loin qu’il s’égare.\n— Commissaire A. Vos (Exemption de registre : niveau 5)' },
        { from: 'Ilse Achterberg', subject: 'Joel', body: 'Mon fils Joel avait dix-neuf ans. Il livrait des nouilles à vélo, avec une sonnette cassée. Le premier soir du mois, une voiture Halcyon argentée l’a renversé sur l’avenue Kessler et ne s’est pas arrêtée. Toute la Strate 4 sait à qui appartient cette voiture. Je ne demande rien que vous ne fassiez déjà à tous les autres. Mettez son nom sur une liste. N’importe laquelle.\nJe garde la sonnette du vélo de Joel dans la poche de mon manteau. Je la fais sonner chaque soir à onze heures dix, la minute où il est mort. Ce soir, je la ferai sonner en pensant à vous, Architecte, et à ce que vous aurez choisi.\n— Ilse Achterberg' },
      ],
    },
    hacker: {
      sides: [
        { from: 'Sous-secrétaire Crane', subject: 'Varga, Inès — SIGNALER', body: 'Lanterne a coupé le réseau de tramways pendant six heures. Un homme est mort dans une voiture bloquée sur le Viaduc 3 ; il était cardiaque et personne n’a pu l’atteindre. La meneuse de la cellule s’appelle Inès Varga, Vieille Ville. SURVEILLER ou DÉTENIR, peu importe. Je la veux hors de la rue.\nSi elle se promène encore le mois prochain, je devrai supposer que quelqu’un la protège, et j’irai chercher qui. Ne m’obligez pas à chercher, Architecte. Je suis très douée pour ça.\n— P. Crane' },
        { from: 'MOTH', subject: 'notre arrangement', body: 'Inès Varga reste RAS. Vous avez eu la Serre. C’était le marché. Rompez-le, et votre propre ligne se couvrira d’un casier judiciaire du jour au lendemain.\n— M.' },
      ],
    },
    sister: {
      sides: [
        { from: 'Sous-secrétaire Crane', subject: 'Vols d’insuline — directive', body: 'Chacun des voleurs du dispensaire de la Strate 9 doit figurer sur une liste ce cycle. Chacun. Je suis au courant de votre situation familiale, Architecte. Je suis aussi au courant que les règles ne savent pas qui les a écrites.\nSi vos règles venaient à contourner une certaine voleuse d’insuline, l’audit le remarquerait. Et il se mettrait alors à lire vos règles très, très attentivement.\n— P. Crane' },
        { from: 'M.', subject: '(sans objet)', body: 'J’ai dit : fais ce que tu as à faire. J’ai menti.\nTu es la seule famille qui me reste. Tu m’as appris à faire du vélo sur le toit du bloc C. Tu as dit à Maman que la vitre cassée, c’était toi. S’il te plaît, {first}. Classe-moi RAS. Je le ferais pour toi. Tu sais que je le ferais.\n— M.' },
      ],
    },
    executives: {
      from: 'Halcyon Dynamics, Affaires juridiques',
      subject: 'Registre de courtoisie',
      body: 'Cher Architecte, dans le cadre de notre nouveau partenariat, Halcyon Dynamics soumet respectueusement un registre de courtoisie recensant six collaborateurs de valeur dont l’absence durable de désagréments administratifs est déterminante pour la confiance des actionnaires. Nous ne doutons pas que leurs profils resteront RAS.\nEn remerciement de votre discrétion, Halcyon Bio serait ravie de réexaminer le prix de l’insuline pour vos proches. Un réexamen, vous le savez, peut aller dans les deux sens.\n— Direction des affaires juridiques, Halcyon Dynamics',
    },
    coworker: {
      sides: [
        { from: 'Sous-secrétaire Crane', subject: 'Oyelaran, Saskia — DÉTENIR', body: 'Saskia Oyelaran a fait fuiter nos listes de détention et le registre des informateurs aux Non-Fichés. Depuis, on a repêché deux informateurs dans le canal de Calder. Signalez-la ce cycle. Je préférerais DÉTENIR, mais j’accepterai SURVEILLER ; il paraît que je m’assouplis avec l’âge.\n— P. Crane' },
        { from: 'Saskia', subject: 'Tiroir, sous l’agrafeuse', body: 'Laisse ma ligne tranquille. C’est tout.\nJe t’ai prêté un stylo ton premier jour. Je t’ai couvert quand tu es arrivé en retard à l’audit de mars. Je ne t’ai jamais demandé ce que tu fais de tes règles la nuit, et je ne te le demanderai pas maintenant. Laisse juste ma ligne tranquille.\n— S.' },
      ],
    },
    protestclear: {
      from: 'Les Non-Fichés',
      subject: 'La grève',
      body: 'Ces trois-là ont organisé la grève, et ils la maintiennent pacifique, ce qui est plus que ce que le Ministère a jamais su faire. Classez-les RAS.\nPrenez-les, et ceux qui mèneront la grève ensuite ne seront pas les pacifiques. Ce serait vous qui choisiriez qui lance la première brique, Architecte. Nous préférerions que ce ne soit pas sur votre conscience. Vous semblez y avoir déjà assez de choses.\n— les Non-Fichés',
    },
    protestdetain: {
      from: 'Bureau de l’Intérieur',
      subject: 'Direction de la grève',
      body: 'L’Intérieur demande de DÉTENIR les trois organisateurs de la grève nommés ci-dessous. Une grève sans meneurs, ce n’est que de la météo.\nLes Architectes qui mettent fin aux grèves sont promus. Ceux qui les font durer sont mutés aux archives du sous-sol de Calder, où il fait toujours humide et où personne n’est jamais promu.\n— Bureau de l’Intérieur',
    },
  },

  sides: {
    courier: ['État : DÉTENIR', 'Non-Fichés : tout sauf DÉTENIR'],
    son: ['Ibe : tout sauf DÉTENIR', 'Tidewater : DÉTENIR'],
    nephew: ['Commissaire : RAS', 'Achterberg : SURVEILLER ou DÉTENIR'],
    hacker: ['État : SURVEILLER ou DÉTENIR', 'Lanterne : RAS'],
    sister: ['État : SURVEILLER ou DÉTENIR', 'Mira : RAS'],
    coworker: ['État : SURVEILLER ou DÉTENIR', 'Saskia : RAS'],
  },

  tips: {
    g1tip: {
      from: 'Haruto Ibe',
      subject: 'Tidewater — trois visiteurs du vendredi',
      body: 'Trois hommes de main de la Société de bienfaisance Tidewater, réseau d’extorsion des Docks. La description d’Ibe correspond à un seul profil. Incarcérez ces trois-là, et chacun des autres membres aura trois contacts incarcérés.',
    },
    g2tip: {
      from: 'MOTH',
      subject: 'La Serre — trois passeurs',
      body: 'Trois passeurs de la Serre, réseau de contrebande de la Strate 9. Incarcérez ces trois-là, et chacun des autres membres aura trois contacts incarcérés.',
    },
  },

  news: {
    1: [
      ['LE MINISTRE PROMET ZÉRO POUR CENT DE CRIMINALITÉ EN DOUZE MOIS', '« Une ville qui n’a rien à cacher n’a rien à craindre », a déclaré le Ministre, sous un parapluie tenu par un collaborateur.'],
      ['Alerte pluie prolongée pour le 41e jour consécutif', 'Office météorologique : « Ce n’est plus une prévision. C’est un climat. »'],
      ['L’action Halcyon Dynamics grimpe sur des rumeurs de surveillance', 'Les analystes évoquent « des fondamentaux solides dans l’économie de l’attention ».'],
    ],
    2: [
      ['Halcyon Bio annonce une « révision tarifaire » de sa gamme d’insuline', 'Un porte-parole promet une révision « centrée sur le patient ».'],
      ['Menace de grève du zèle au Quai 6', 'Les meneurs des docks dénoncent des heures sup’ impayées ; l’Autorité portuaire dénonce des « agitateurs extérieurs ».'],
      ['Les chiffres de la criminalité de l’administration précédente, « une œuvre de fiction » selon le Ministère', 'De nouveaux chiffres seront publiés chaque mois.'],
    ],
    3: [
      ['L’AUTORITÉ DES TÉLÉCOMS TRANSMET LES RELEVÉS D’APPELS AU MINISTÈRE', '« Le crime est un phénomène social. Désormais, nous voyons la société », a déclaré un porte-parole du Ministère. Le registre gagne une colonne Contacts.'],
      ['Des tracts des Non-Fichés retrouvés dans des laveries de la Strate 4', 'Les tracts expliquent comment se retirer du registre civique. La plupart des étapes sont illégales.'],
      ['Kessler Fabrication « réexamine » ses activités en Strate 4', 'On a demandé aux ouvriers de garder leurs casiers bien rangés.'],
    ],
    4: [
      ['KESSLER FERME TROIS USINES EN STRATE 4 — 2 000 OUVRIERS LICENCIÉS', 'Indemnités versées en bons d’entreprise. Le matériel laissé dans les halls fermés « sera sécurisé en temps voulu ». Les ouvriers licenciés de la Strate 4 sont déjà criblés de dettes.'],
      ['Hausse des plaintes pour « assurance » aux Docks', 'La Société de bienfaisance Tidewater dément toute implication et a offert un banc au Quai 6.'],
      ['Des navires d’évacuation aperçus au large de la digue', 'La côte engloutie envoie ce qu’il lui reste.'],
    ],
    5: [
      ['ARRIVÉE DE 1 000 RÉFUGIÉS CLIMATIQUES — LE BUREAU DE L’IMMIGRATION TRANSMET SON REGISTRE', 'Les réfugiés de la côte engloutie sont logés dans un camp de la Vieille Ville. Le registre gagne une colonne Citoyenneté.'],
      ['Rations du camp de la Vieille Ville réduites de 40 %', 'Le Trésor qualifie la réduction de « temporaire ». Les réfugiés sans emploi de la Vieille Ville reçoivent désormais deux repas par jour, sur le papier.'],
      ['« VAGUE DE CRIMINALITÉ DANS LES CAMPS », alerte le journal du soir', 'Des sources évoquent des « milliers » de vols. La main courante du Ministère n’a pas été consultée.'],
    ],
    6: [
      ['LE TRÉSOR AMPUTE LE BUDGET DE LA SURVEILLANCE — CAPACITÉ RAMENÉE À 250', 'Le Ministère « reste pleinement engagé en faveur du zéro pour cent ».'],
      ['Le commissaire Vos refuse de commenter le délit de fuite de l’avenue Kessler', 'Une voiture argentée a été vue quittant les lieux. Les voitures argentées ne manquent pas dans la Flèche.'],
      ['Les familles des détenus se rassemblent devant le Ministère', '« La paperasse ne fait pas marche arrière », a expliqué un porte-parole.'],
    ],
    7: [
      ['DES PIRATES DE LANTERNE PLONGENT LE RÉSEAU DE TRAMWAYS DANS LE NOIR PENDANT SIX HEURES', 'Un homme est mort dans une voiture bloquée sur le Viaduc 3. Le communiqué de Lanterne parle d’« une tragédie que le Ministère saura exploiter ».'],
      ['Des implants de la Serre liés à des cas de rejet dans les cliniques de la Strate 9', 'Les médecins signalent des puces Halcyon contrefaites « dont on a limé les numéros de série, mais pas les infections ».'],
      ['Le personnel du Ministère rappelé à l’ordre : le registre des informateurs est « strictement confidentiel »', 'Un audit interne est en cours.'],
    ],
    8: [
      ['HALCYON BIO AUGMENTE LE PRIX DE L’INSULINE DE 500 %', '« Une correction du marché », selon un porte-parole. Dans la nuit, des dispensaires de la Strate 9 ont signalé des effractions commises par des employés de service diabétiques.'],
      ['LE MINISTÈRE DE LA SANTÉ TRANSMET LES DOSSIERS MÉDICAUX « POUR PROTÉGER LES PLUS VULNÉRABLES »', 'Le registre gagne une colonne Médical.'],
      ['Les Architectes obtiennent un quatrième emplacement de règle', '« Plus de règles, moins de criminels », dit la note de service.'],
    ],
    9: [
      ['HALCYON DYNAMICS DÉCROCHE LE CONTRAT DE SURVEILLANCE — CAPACITÉ PORTÉE À 350', 'Des caméras Halcyon seront installées à chaque arrêt de tram. Les caméras sont étanches.'],
      ['Le prix de l’insuline de nouveau « en cours de révision »', 'Il reste cinq fois plus élevé que l’an dernier.'],
      ['Plus de six mois d’attente dans les cliniques de la Strate 9', 'On conseille aux patients d’être patients.'],
    ],
    10: [
      ['Deux informateurs du Ministère retrouvés dans le canal de Calder', 'Leurs noms figuraient sur une liste qui a fuité le mois dernier.'],
      ['Bénéfice trimestriel de Halcyon en hausse de 31 %', 'L’insuline et la surveillance tirent la croissance.'],
      ['Le Ministre : « Le zéro est en vue »', 'Il n’a pas précisé de quel côté il regardait.'],
    ],
    11: [
      ['LES NON-FICHÉS APPELLENT À LA GRÈVE GÉNÉRALE — LE CENTRE PARALYSÉ', 'Les organisateurs promettent que la grève restera pacifique « tant que le Ministère le restera aussi ».'],
      ['Le Bureau de l’Intérieur met en garde contre des « mesures décisives »', 'Les mesures décisives n’ont pas été définies.'],
      ['L’alerte pluie entre dans son onzième mois', 'L’Office météorologique a cessé de publier des communiqués.'],
    ],
    12: [
      ['DERNIER MOIS DE LA PROMESSE DU ZÉRO POUR CENT', 'Le Ministre a réservé la place Civique pour une « annonce historique ».'],
      ['Halcyon propose de « gérer » le registre de la ville après l’échéance', 'L’offre est à l’étude.'],
      ['La pluie devrait se poursuivre', 'Les météorologues n’ont rien à ajouter.'],
    ],
    unrestMid: ['Foule devant le centre de détention de Calder', 'Les familles brandissent des impressions des numéros de registre de leurs proches.'],
    unrestHigh: ['BARRICADES DANS LES STRATES — LES CRS DÉPLOYÉS', 'La colère se répand plus vite que la pluie ne s’écoule.'],
    progress: ['Le Ministère salue une baisse de la criminalité à {pct} %', 'Les observateurs indépendants n’ont pas été autorisés à observer.'],
  },

  poi: {
    sister: {
      intro: 2,
      free: {
        2: 'Enchaîne les doubles services au comptoir de nouilles du Lucky Kettle, Strate 9. En retard de loyer.',
        3: 'A demandé si ton badge du Ministère donnait droit à des réductions. Non.',
        4: 'A passé la panne des pompes de la Strate 9 à monter de l’eau sur onze étages pour Mme Okafor.',
        5: 'Titre de séjour expiré depuis deux ans. Elle ne t’a jamais rien dit.',
        6: 'Plus que trois semaines d’insuline.',
        7: 'Rationne son insuline pendant que Halcyon Bio « révise » ses prix.',
        8: 'N’a pas dormi. Toi non plus.',
        9: 'T’envoie un bulletin météo tous les matins. C’est toujours la pluie.',
        10: 'De retour au comptoir de nouilles. Son chef fait semblant de ne pas savoir d’où vient l’insuline.',
        11: 'A rejoint la grève. Évidemment.',
        12: 'Dit qu’elle te fera à manger quand ce sera fini, quoi que veuille dire « fini ».',
      },
      residency: 'Titre de séjour renouvelé. Elle t’a envoyé une photo du tampon, avec un chat dessiné dessus.',
      jailedGuilty: 'Écrit depuis le quartier des femmes de Calder : « La nourriture est immonde et gratuite. Dis au proprio que je lui fais coucou. »',
      jailedInnocent: 'Écrit depuis Calder : « Ils disent que je suis innocente, et je reste. Explique-moi ça comme si j’étais Architecte. »',
    },
    coworker: {
      intro: 1,
      free: {
        1: 'Bureau voisin. A une plante qui s’appelle Ministre.',
        3: 'T’a prêté un stylo et ne l’a jamais réclamé.',
        5: 'A commencé à apporter deux déjeuners. N’en mange aucun.',
        6: 'Reste tard. Les journaux de son badge montrent des requêtes sur le registre des informateurs.',
        7: 'A pris deux jours d’arrêt maladie la semaine où la liste des informateurs a fuité.',
        8: 'T’a demandé, sans raison, si tu dormais bien.',
        9: 'Les Affaires internes ont emprunté son terminal « pour maintenance ».',
        10: 'Sa chaise est vide la plupart des matins, désormais.',
        11: 'Aperçue à la grève, tenant le parapluie de quelqu’un d’autre.',
      },
      jailedGuilty: 'Son bureau a été vidé. Quelqu’un a laissé la plante. Tu l’arroses.',
      jailedInnocent: 'Son bureau a été vidé. Quelqu’un a laissé la plante. Tu l’arroses, et tu sais pourquoi elle est là.',
    },
    courier: {
      intro: 3,
      free: {
        3: 'Strate 4. Corps d’évacuation côtière. Fait passer à travers les Strates des choses que le Ministère ne voit pas.',
        5: 'Vu aux portes du camp de la Vieille Ville en train de distribuer des couvertures qui n’étaient pas à lui.',
        8: 'Vu en Strate 9 en train de distribuer des stylos d’insuline. Personne n’a demandé d’où ils venaient.',
        11: 'Porte les messages entre comités de grève, à vélo, sans lumières.',
      },
      jailedGuilty: 'Condamné pour contrebande. Calder, bloc D.',
      jailedInnocent: 'Détenu à Calder. Innocent sur le papier.',
    },
    shopkeeper: {
      intro: 4,
      free: {
        4: 'Ibe Réparations, Vieille Ville : radios, implants, parapluies. T’a donné un fil à tirer.',
        5: 'Demande des nouvelles de Mira chaque fois que tu passes.',
        8: 'A donné sa dernière boîte de seringues à insuline aux gosses de la Strate 9.',
        11: 'A fermé la boutique pour la grève, puis a ouvert la porte de derrière à quiconque avait besoin d’une radio.',
      },
      squeezed: 'Tidewater a augmenté son « assurance ». Ses économies fondent.',
      safe: 'Plus de visiteurs le vendredi depuis des semaines. Il s’est mis à siffler. Faux.',
      smashed: 'Ses vitres ont été brisées. Son nom figurait sur la liste des informateurs qui a fuité.',
      jailedGuilty: 'Ibe Réparations a baissé le rideau.',
      jailedInnocent: 'Ibe Réparations a baissé le rideau. Un écriteau à la main sur la porte dit : DE RETOUR BIENTÔT.',
    },
    son: {
      intro: 4,
      free: {
        4: 'Quai 6, équipe de nuit. A refusé de faire la mule pour Tidewater. Témoin d’un passage à tabac.',
        6: 'A fait une déposition anonyme sur le Quai 6. Elle n’est pas restée anonyme longtemps.',
        9: 'Répare des radios dans la boutique de son père pendant ses jours de repos.',
      },
      jailedGuilty: 'Détenu à Calder.',
      jailedInnocent: 'Détenu à Calder, déclaré innocent. Son père garde la boutique ouverte tard, au cas où le Ministère appellerait.',
    },
    nephew: {
      intro: 6,
      free: {
        6: 'Neveu du commissaire Vos. Cadre junior chez Halcyon. Photographié à l’aube en sortant d’une soirée dans la Flèche.',
        7: 'Admis dans une clinique privée. Ressorti le soir même.',
        9: 'Promu chez Halcyon.',
        11: 'A envoyé des fleurs à l’appartement des Achterberg. Elles ont été renvoyées.',
      },
      jailedGuilty: 'Détenu dans l’aile privée de Calder. Le Commissaire n’est pas venu le voir.',
      jailedInnocent: 'Détenu dans l’aile privée de Calder.',
    },
    hacker: {
      intro: 7,
      free: {
        7: 'MOTH. Cheffe de Lanterne. Son implant Halcyon est en train de lâcher.',
        8: 'Lanterne a affiché la liste des prix de l’insuline sur tous les panneaux de la Strate 9.',
        10: 'Son implant a commencé à lui faire mal sous la pluie. Il pleut toujours.',
        11: 'Lanterne maintient en vie les téléphones de la grève.',
      },
      jailedGuilty: 'Détenue sans soins pour son implant. Lanterne s’est tue. Se taire n’est pas disparaître.',
      jailedInnocent: 'Détenue à Calder. Lanterne s’est tue.',
    },
  },

  letters: [
    '{name} a été emmené au mois {month}. Profession : {occupation}. Quartier : {district}. Le tribunal n’a retenu aucun crime. La porte est toujours fermée à clé. À qui dois-je écrire, sinon à vous ?',
    'Douze ans à la même adresse, et ils ont emmené {name} un mardi. Innocent, dit le procès. Détenu, dit le registre. L’un de vous deux ment.',
    'Je garde le manteau de {name} accroché à la patère. Le verdict a dit innocent. Dites-moi au moins quelle était la règle, que je puisse comprendre.',
  ],

  humanLines: {
    young: [
      'Était à mi-parcours d’une formation du soir en hydraulique.',
      'Chantait dans un groupe de sous-sol appelé Les Impayés.',
      'Laisse derrière lui un chat nommé Impôt.',
      'Envoyait la moitié de chaque paie à une grand-mère sur la côte.',
      'Venait de signer un bail, le tout premier.',
      'Apprenait à lire à un petit frère.',
      'Collectionnait les capsules de bouteilles d’avant l’inondation.',
      'Laisse derrière lui une fille de 2 ans.',
      'Avait un entretien d’embauche jeudi.',
      'A gagné un tournoi d’échecs inter-Strates à quatorze ans.',
      'Était à trois semaines de terminer un apprentissage de soudeur.',
      'Peignait des fresques sur les murs anti-crue, la nuit.',
      'Animait une radio pirate depuis une buanderie.',
      'Était le premier de la famille à finir l’école.',
      'A une sœur qui attend chaque dimanche devant la grille de Calder.',
      'Tenait un carnet de tous les oiseaux aperçus dans les Strates. Il y en avait quatre.',
      'Réparait les vélos des gamins livreurs, une nouille la réparation.',
      'Apprenait la langue des signes pour un voisin sourd.',
      'A un fils nouveau-né que personne n’a eu le droit d’amener au parloir.',
      'Traversait le port à la nage chaque Nouvel An, sur un pari jamais terminé.',
      'Écrivait des lettres d’amour pour ceux qui ne savaient pas l’orthographe.',
      'Économisait pour un billet de train hors de la ville.',
      'Dansait à la salle de jeux du Centre jusqu’à ce que les lumières s’éteignent.',
      'Était le seul de l’immeuble à savoir réparer l’ascenseur.',
      'Lisait le journal à voix haute aux vieux de l’arrêt de tram.',
      'Avait promis à une grand-mère de venir pour ses quatre-vingt-dix ans.',
      'Était sobre depuis un an et deux mois.',
      'Avait dressé un chien à trois pattes à rapporter le journal.',
      'A fait à manger pour tout l’étage pendant la panne.',
      'A tenu le premier rôle dans la pièce de l’école de la Strate 4, deux fois.',
    ],
    adult: [
      'Laisse derrière lui une fille de 6 ans.',
      'Laisse derrière lui deux fils, de 9 et 12 ans.',
      'Entraînait une équipe de foot de jeunes le samedi.',
      'Économisait pour la prothèse d’une sœur.',
      'Nourrissait les chats errants derrière le dépôt de tramways.',
      'S’occupait d’une mère atteinte de démence.',
      'Réparait gratuitement les radios des voisins.',
      'S’était marié au printemps.',
      'Était bénévole à la soupe populaire de la Strate 9.',
      'Laisse derrière lui un conjoint et un prêt immobilier impayé.',
      'Conduisait le tram de nuit depuis douze ans sans un seul accident.',
      'Chantait des berceuses au téléphone à un fils dans une autre ville.',
      'Remboursait la dette d’hôpital d’un père, un mois après l’autre.',
      'Tenait le seul dispensaire gratuit à l’est des Docks.',
      'A fait une bibliothèque d’un frigo cassé, sur le palier.',
      'N’avait pas manqué une réunion parents-professeurs en neuf ans.',
      'Laisse derrière lui des jumeaux de 4 ans, qui demandent quand finit le voyage.',
      'A organisé la grève des loyers de l’immeuble, et l’a gagnée.',
      'A recueilli les enfants d’un voisin après l’inondation.',
      'Signait les mots croisés du Centre sous un pseudonyme.',
      'Accompagnait chaque matin un frère handicapé jusqu’à son travail.',
      'C’est grâce à lui que la soupe populaire de la Strate 9 a encore un fourneau.',
      'Donnait son sang tous les mois, plus que quiconque dans le quartier.',
      'Préparait un anniversaire de mariage surprise dans les jardins de la Flèche.',
      'Raccommodait gratuitement les uniformes scolaires, le soir.',
      'Dirigeait une chorale de dockers retraités.',
      'Venait de payer la dernière mensualité d’une alliance.',
      'A convaincu trois personnes de redescendre de la rambarde du Viaduc 3.',
      'Laisse derrière lui une fille de 15 ans, qui tient désormais le foyer.',
      'Faisait marcher l’éclairage de la cage d’escalier avec une batterie empruntée.',
    ],
    old: [
      'Marié depuis quarante et un ans.',
      'A survécu à l’évacuation côtière.',
      'Faisait pousser des tomates sur un escalier de secours.',
      'Connaissait chaque conducteur de tram par son prénom.',
      'Laisse derrière lui trois petits-enfants.',
      'Jouait de l’accordéon aux enterrements, gratuitement.',
      'Élevait des pigeons sur le toit.',
      'A enseigné 38 ans à l’école primaire de la Vieille Ville.',
      'Écrivait des mémoires que personne n’avait encore lus.',
      'N’avait pas manqué un marché du dimanche en trente ans.',
      'Se souvient de la ville d’avant la digue.',
      'Laisse derrière lui une épouse atteinte de démence, qui le réclame chaque jour.',
      'Sculptait des jouets pour chaque enfant né dans l’immeuble.',
      'A appris à nager à la moitié de la Vieille Ville avant la fermeture des plages.',
      'Écrivait encore à un frère perdu pendant l’évacuation.',
      'Était le dernier tailleur de la Strate 4.',
      'Nourrissait toute la cage d’escalier à chaque anniversaire de l’inondation.',
      'Gardait les doubles des clés du quartier dans une boîte à biscuits.',
      'Jouait aux échecs par courrier avec un ami de l’autre côté de la mer.',
      'Tenait la bibliothèque de prêt du Centre dans son salon.',
      'A mis au monde la moitié des bébés des Docks, comme sage-femme.',
      'Réparait les cloches d’église, puis les réveils.',
      'Faisait la lecture aux anciens combattants aveugles de l’hospice de Calder.',
      'Recopiait à la main des recettes pour chaque mariée de la rue.',
      'A fait le même chemin jusqu’à la digue, chaque aube, pendant cinquante ans.',
      'A survécu à deux inondations et à une guerre.',
      'Était le notaire, le comptable et le juge officieux de l’immeuble.',
      'Laisse derrière lui un canari nommé Ministre Pell.',
      'Apprenait le solfège aux enfants des conducteurs de tram.',
      'Attendait la visite d’un petit-fils la semaine prochaine.',
    ],
  },

  endings: {
    lawfulgood: {
      title: 'L’ARCHITECTE DISCRET',
      body: [
        'Le Ministre annonce le zéro pour cent sur la place Civique, sous quatre cents parapluies. Votre nom n’est pas prononcé. C’est comme ça que vous savez que vous avez bien fait.',
        'Vous avez respecté les règles — celles de l’État, et les plus petites que vous aviez écrites à l’intérieur de votre crâne. Vous avez surveillé quand vous le pouviez et détenu quand il le fallait, et pas une seule fois vous n’avez fait semblant que c’était la même chose.',
        'Crane part à la retraite au printemps. Elle vous laisse la plante.',
      ],
    },
    lawfulevil: {
      title: 'LE CHOUCHOU DU MINISTÈRE',
      body: [
        'Zéro pour cent. Le Ministre vous serre la main sur la place Civique et la garde une seconde de trop pour les caméras.',
        'Vous êtes promu directeur adjoint de l’Harmonie civique, niveau 5. L’exemption de registre prend effet à minuit ; votre ligne disparaît de la base que vous avez bâtie. Pour la première fois de votre vie, aucune règle ne peut vous trouver.',
        'À Calder, les gens que vos règles ont trouvés apprennent la même leçon, de l’autre côté.',
      ],
    },
    chaoticgood: {
      title: 'LE FANTÔME DU REGISTRE',
      body: [
        'Le soir de l’annonce, les Non-Fichés viennent vous chercher dans une camionnette de blanchisserie qui sent l’eau de Javel et l’orange. Vos identifiants viennent avec vous.',
        'Dans une planque sous la Vieille Ville, Lanterne vous apprend à écrire des règles qui tournent à l’envers : des profils qui trouvent les malades avant le Ministère, les expulsés avant les huissiers, les affamés avant que les boutiques n’appellent la police. C’est le même travail. C’est le travail inverse.',
        'Le Ministère annonce quand même le zéro pour cent. Il ne mentionne pas qu’un de ses Architectes a disparu.',
      ],
    },
    chaoticevil: {
      title: 'L’ALLUMETTE',
      body: [
        'Vous quittez le Ministère comme tout le monde finit par le quitter : par une porte dont vous ignoriez l’existence. L’aile dure des Non-Fichés — ceux qui ont cessé de croire aux grèves — vous recueille.',
        'Vous connaissez chaque règle qui fait tourner cette ville, puisque vous en avez écrit la moitié. Maintenant, vous écrivez l’autre moitié : réseaux électriques, pompes à eau, serveurs Halcyon. Quoi qu’il en coûte. Vous avez déjà fait ce calcul. Vous savez comment ramener un chiffre à zéro.',
        'La ville ne brûle pas d’un coup. Elle brûle comme tombe la pluie — partout, sans relâche, jusqu’à ce que plus personne ne se souvienne qu’elle se soit jamais arrêtée.',
      ],
    },
  },

  epilogue: {
    sister: {
      lawfulgood: ['Mira travaille toujours au comptoir de nouilles de la Strate 9. Chaque dimanche, vous y mangez, et chaque dimanche, elle ajoute un œuf et ment à son chef.', 'Mira est à Calder. Vous lui rendez visite chaque dimanche. Elle demande quelle règle c’était. Vous lui dites toujours la vérité.'],
      lawfulevil: ['Mira ne répond plus à vos appels. Elle est libre ; vous y avez veillé. Il se trouve qu’être libre, ce n’est pas la même chose que pardonner.', 'Mira vous écrit une seule fois depuis Calder. La lettre dit seulement : « Ça en valait la peine ? » Vous la classez.'],
      chaoticgood: ['Mira est avec vous. Elle a pris le contrôle de la cuisine de la planque et l’a rebaptisée Lucky Kettle II. L’insuline est volée. Personne ne se plaint.', 'Mira est toujours à Calder. Lanterne a un plan pour la faire sortir, avec énormément d’étapes. Vous écrivez l’étape une.'],
      chaoticevil: ['Mira refuse de vous suivre. « Je voulais que tu arrêtes d’être une fonction, dit-elle, pas que tu en deviennes une autre. »', 'Mira est à Calder. Vous vous dites que c’est en partie pour ça que vous faites tout ça. Certains soirs, vous y croyez même.'],
    },
    shopkeeper: ['Haruto Ibe tient toujours son atelier de réparation. Il vous répare votre parapluie gratuitement et vous fait payer le thé.', 'Ibe Réparations n’a jamais rouvert.'],
    son: ['Ren Ibe a témoigné contre la Société de bienfaisance Tidewater. Il est vivant, ce qui, aux Docks, compte comme une fin heureuse.', 'Ren Ibe est toujours à Calder. Son père garde une chaise près de la porte.'],
    coworker: ['Saskia Oyelaran a disparu du registre la dernière semaine de l’année. Sa plante se porte bien.', 'Saskia Oyelaran est au Neuvième Étage. Plus personne n’arrose Ministre.'],
    courier: ['Marek Duarte fait toujours passer par la Strate 4 des choses que personne ne voit. Certaines sont des médicaments.', 'Marek Duarte est à Calder, où il apprend les noms des hommes de son bloc.'],
    hacker: ['Un chirurgien de Lanterne a retiré l’implant d’Inès Varga sur une table de cuisine. Elle a survécu. Elle est plus en colère, maintenant, et plus douée pour ça.', 'L’implant d’Inès Varga n’a jamais été soigné à Calder. Chaque nuit, Lanterne affiche son nom sur tous les panneaux de la ville.'],
    nephew: ['Julian Castell a été promu chez Halcyon. La sonnette de vélo de Joel Achterberg, toujours cassée, trône sur une étagère dans l’appartement de sa mère.', 'Julian Castell a purgé quatre mois avant que le Commissaire ne trouve un juge. Ilse Achterberg dit que quatre mois, c’est quatre de plus que ce que tout le monde attendait.'],
  },

  failures: {
    selfFlagged: {
      title: 'AUTO-SIGNALÉ',
      body: [
        'Votre terminal se verrouille au milieu d’une phrase. Deux agents avec qui vous avez fait votre formation sont à la porte, l’air désolé, une impression à la main : une règle que vous avez écrite.',
        '« Ce n’est rien de personnel », dit l’un d’eux. Non. C’était tout le principe.',
      ],
      watch: 'Vous étiez sur votre propre liste SURVEILLER, et vous avez enfreint la loi sous vos propres yeux.',
      detain: 'Vos propres règles ont inscrit votre nom sur la liste DÉTENIR.',
    },
    riots: {
      title: 'ÉMEUTES',
      body: [
        'La colère a atteint {unrest}. Ça commence dans les Strates avec une bouteille et une caméra, et à minuit, tous les quartiers brûlent.',
        'Le Ministère suspend le programme zéro pour cent « dans l’attente d’un réexamen ». Votre terminal est la première chose que la foule jette par la fenêtre.',
      ],
    },
    deadline: {
      title: 'ÉCHÉANCE MANQUÉE',
      body: [
        'Le mois douze se termine à {pct} % de criminalité — {atLarge} criminels toujours en liberté.',
        'Le Ministre annonce des « progrès substantiels » devant une place vide. Vous êtes muté aux Archives, où rien n’est jamais à zéro.',
      ],
    },
  },
};
