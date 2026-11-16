/* =====================================================================
   GREENBRIDGE TECHNOLOGIES — greenbridge.js
   Partie 1 : données produits + générateur de notices PDF (code d'origine)
   ===================================================================== */
/* Emplacements photo PNG des modèles : les fichiers sont à placer à la racine du site. */
function showModelPhotoPlaceholder(img){
  if(!img || !img.parentElement) return;
  const box = img.parentElement;
  box.classList.add('new-model-placeholder');
  box.innerHTML = '<i class="fa-regular fa-image" aria-hidden="true"></i><span>PHOTO À AJOUTER</span>';
}

const CONTACT_EMAIL = 'contact@greenbridge.com';
const SURVEY_URL = 'https://enquete-powerbank-ci-sn.netlify.app/';

/* Chaque modèle possède 4 emplacements distincts : cardImage pour la carte, puis 3 images dans la galerie En savoir plus. */
const models = [
  {
    id:'green-only',
    cardImage:'Greenonly.jpg',
    title:'GreenOnly — 4 500 mAh',
    subtitle:'Recharge standard • 10 W',
    images:['greenonly1.jpg','greenonly2.jpg','greenonly3.jpg'],
    specs:[
      'Capacité : 4 500 mAh',
      'Puissance de sortie : 10 W',
      'Recharge standard, adaptée aux petites charges du quotidien',
      'Entrée de recharge : USB-C',
      'Sorties : USB-C et connectique iPhone (Lightning)',
      'Câble USB-C fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenOnly — 4 500 mAh</strong><br>Un format compact pour les petites recharges du quotidien, avec une puissance standard de 10 W.</p>`
  },
  {
    id:'greenmini',
    cardImage:'Pwkb_Mini_3.png',
    title:'GreenMini — 10 000 mAh',
    subtitle:'Deux versions : 15 W et 22,5 W',
    images:['Pwkb_mini_213.png','PWBK_mini_4.png','Pwkb_Mini_3.png'],
    specs:[
      'Capacité : 10 000 mAh',
      'Deux versions disponibles : 15 W et 22,5 W',
      'Version 15 W : deux sorties USB-A (ports noirs)',
      'Version 22,5 W : une sortie USB-C et deux sorties USB-A (ports orange)',
      'Entrée de recharge : USB-C',
      'Recharge ultra-rapide sur la version 22,5 W',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenMini — 10 000 mAh</strong><br>Disponible en deux versions. La couleur des sorties permet de les distinguer : noir pour 15 W et orange pour 22,5 W.</p>`
  },
  {
    id:'greencore',
    cardImage:'pwkb_123.png',
    title:'GreenCore — 10 000 mAh',
    subtitle:'15 W • Éclairage LED intégré',
    images:['Pwbk_21.png','pwkb_4.1.png','pwkb_123.png'],
    specs:[
      'Capacité : 10 000 mAh',
      'Puissance de sortie : 15 W',
      'Entrée de recharge : USB-C',
      'Deux sorties USB-A',
      'Système lumineux LED à quatre niveaux d’éclairage',
      'Mode clignotement pour la signalisation',
      'Éclairage adapté à une utilisation en veilleuse',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenCore — 10 000 mAh</strong><br>Une powerbank de 15 W intégrant un système LED polyvalent pour l’éclairage d’appoint et la signalisation.</p>`
  },
  {
    id:'greenplus',
    cardImage:'Greenplus_1.png',
    title:'GreenPlus — 10 000 mAh',
    subtitle:'15 W • Trois sorties USB-A',
    images:['Greenplus_2.png','Greenplus_3.png','Greenplus_1.png'],
    specs:[
      'Capacité : 10 000 mAh',
      'Puissance de sortie : 15 W',
      'Entrée de recharge : Micro-USB',
      'Trois sorties USB-A',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenPlus — 10 000 mAh</strong><br>Une powerbank de 15 W avec trois sorties USB-A pour recharger plusieurs appareils compatibles.</p>`
  },
  {
    id:'green-eco',
    cardImage:'GreenEco1.png',
    title:'GreenEco — 10 000 mAh',
    subtitle:'15 W • Double entrée de recharge',
    images:['GreenEco2.png','GreenEco4.png','GreenEco3.png'],
    specs:[
      'Capacité : 10 000 mAh',
      'Puissance de sortie : 15 W',
      'Entrées de recharge : Micro-USB et USB-C',
      'Sortie : USB-A',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenEco — 10 000 mAh</strong><br>Une solution polyvalente de 15 W avec deux possibilités de recharge de la batterie : Micro-USB ou USB-C.</p>`
  },
  {
    id:'green-africa',
    cardImage:'Green_africa1.PNG',
    title:'GreenAfrica — 10 000 mAh',
    subtitle:'15 W • Entrée USB-C',
    images:['GreenAfrica2.png','GreenAfrica3.png','GreenAfrica4.png'],
    specs:[
      'Capacité : 10 000 mAh',
      'Puissance de sortie : 15 W',
      'Entrée de recharge : USB-C',
      'Sortie : USB-A',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenAfrica — 10 000 mAh</strong><br>Une powerbank de 15 W avec recharge de la batterie par USB-C et sortie USB-A.</p>`
  },
  {
    id:'greenpro',
    cardImage:'pwkb_6.png',
    title:'GreenPro — 12 000 mAh',
    subtitle:'15 W • Deux sorties USB-A',
    images:['pwbk_9.png','pwkb_10.png','pwkb_6.png'],
    specs:[
      'Capacité : 12 000 mAh',
      'Puissance de sortie : 15 W',
      'Entrée de recharge : USB-C',
      'Deux sorties USB-A',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenPro — 12 000 mAh</strong><br>Une powerbank de 15 W conçue pour alimenter plusieurs appareils via ses deux sorties USB-A.</p>`
  },
  {
    id:'green-reck',
    cardImage:'Green_Reck_1.PNG',
    title:'GreenReck — 12 000 mAh',
    subtitle:'15 W • Deux sorties USB-A',
    images:['GreenReck2.png','GreenReck3.png','GreenReck4.png'],
    specs:[
      'Capacité : 12 000 mAh',
      'Puissance de sortie : 15 W',
      'Entrée de recharge : Micro-USB',
      'Deux sorties USB-A',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenReck — 12 000 mAh</strong><br>Une powerbank de 15 W avec entrée Micro-USB et deux sorties USB-A.</p>`
  },
  {
    id:'greenwire',
    cardImage:'Greenwire_1.png',
    title:'GreenWire — environ 20 000 mAh',
    subtitle:'Versions 15 W et 22,5 W • Recharge sans fil',
    images:['Greenwire_2.png','Greenwire_3.png','Greenwire_4.png'],
    specs:[
      'Capacité indiquée sur le catalogue actuel : environ 20 000 mAh',
      'Deux versions : 15 W et 22,5 W',
      'Version 15 W : deux sorties USB-A (ports noirs)',
      'Version 22,5 W : une sortie USB-C et deux sorties USB-A (ports orange)',
      'Recharge sans fil intégrée sur la version 22,5 W',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenWire</strong><br>Une gamme proposée en 15 W et 22,5 W. Les ports noirs correspondent à la version 15 W et les ports orange à la version 22,5 W, qui intègre également la recharge sans fil.</p>`
  },
  {
    id:'greenwireless',
    cardImage:'pwkb_wireless_1.png',
    title:'GreenWireless — 20 000 mAh',
    subtitle:'Recharge sans fil • Boîtier amovible',
    images:['pwkb_wireless_2.png','pwkb_wireless_3.png','pwkb_wireless_4.png'],
    specs:[
      'Capacité : 20 000 mAh',
      'Recharge sans fil intégrée',
      'Sortie USB-C PD',
      'Sortie USB-A QC 3.0',
      'Boîtier amovible',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenWireless — 20 000 mAh</strong><br>Une powerbank avec recharge sans fil, connectique USB-C PD et USB-A QC 3.0.</p>`
  },
  {
    id:'green-tech',
    cardImage:'Green_tech_1.PNG',
    title:'GreenTech — 20 000 mAh',
    subtitle:'22,5 W • Charge rapide • Éclairage LED puissant',
    images:['Green_tech_2.PNG','GreenTECH3.png','GreenTECH4.png'],
    specs:[
      'Capacité : 20 000 mAh',
      'Puissance de sortie : 22,5 W',
      'Sortie USB-C pour la charge rapide',
      'Deux sorties USB-A supplémentaires',
      'Système LED très puissant pour l’éclairage d’appoint',
      'Utile en cas de coupure de courant',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenTech — 20 000 mAh</strong><br>Une powerbank de 22,5 W associant plusieurs sorties de recharge à un éclairage LED puissant, pratique notamment en cas de coupure de courant.</p>`
  },
  {
    id:'greenlaptop-plus',
    cardImage:'Chargeur_ordi_1.png',
    title:'GreenLaptop+ — 36 000 mAh',
    subtitle:'Chargeur ordinateur • Puissance variable de 65 W à 100 W',
    images:['Chargeur_ordi_2.png','Chargeur_ordi_3.png','Chargeur_ordi_4.png'],
    specs:[
      'Capacité annoncée : 36 000 mAh',
      'Puissance variable : de 65 W à 100 W',
      'Solution de recharge pour ordinateur portable',
      'Grande capacité énergétique'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenLaptop+ — 36 000 mAh</strong><br>Une solution de grande capacité destinée à la recharge des ordinateurs portables, avec une puissance variable de 65 W à 100 W.</p>`
  },
  {
    id:'green-laptop',
    cardImage:'GreenLaptop_2.PNG',
    title:'GreenLaptop — 20 000 mAh',
    subtitle:'100 W • Téléphone et ordinateur portable',
    images:['GreenLaptop_1.PNG','GreenLaptop3.png','GreenLaptop4.png'],
    specs:[
      'Capacité : 20 000 mAh',
      'Puissance de sortie annoncée : 100 W',
      'Charge rapide pour téléphone compatible',
      'Recharge d’ordinateur portable compatible',
      'Câble fourni'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenLaptop — 20 000 mAh</strong><br>Une powerbank de 100 W conçue pour la charge rapide des téléphones et la recharge des ordinateurs portables compatibles.</p>`
  },
  {
    id:'green-wifi',
    cardImage:'wifi_2.png',
    title:'GreenWifi — 12 000 mAh',
    subtitle:'Mini-UPS pour Wi-Fi et caméra de surveillance',
    images:['GreenWifi2.png','GreenWifi3.png','GreenWifi4.png'],
    specs:[
      'Capacité : 12 000 mAh',
      'Système Wi-Fi UPS : prend automatiquement le relais en cas de coupure de courant',
      'Autonomie annoncée : environ 4 à 6 heures pour le Wi-Fi, selon la consommation',
      'Peut également alimenter une caméra de surveillance compatible',
      'L’autonomie de la caméra dépend de sa consommation et de la configuration'
    ],
    details:`<p style="margin-top:0;color:#23403a;line-height:1.45"><strong>GreenWifi — 12 000 mAh</strong><br>Un mini-onduleur (UPS) qui maintient l’alimentation d’un équipement Wi-Fi lors d’une coupure de courant. Il peut également alimenter une caméra de surveillance compatible.</p>`
  }
];


/* Générateur de notices techniques GreenBridge.
   - Produit un PDF A4 de 2 pages sans bibliothèque externe.
   - Intègre en priorité la deuxième photo de la galerie du modèle.
   - Décrit les entrées/sorties et les branchements connus.
   - Signale les données de connexion qui restent à confirmer. */
const MODEL_NOTICE_GUIDES = {
  'green-only': {
    capacity:'4 500 mAh', power:'10 W',
    inputPorts:['USB-C'], outputPorts:['USB-C', 'Connectique iPhone'],
    steps:[
      {title:'Recharger la powerbank', text:'Repérer l’entrée USB-C de recharge. Relier cette entrée à un adaptateur secteur USB compatible avec un câble USB-C. Le câble USB-C est fourni.'},
      {title:'Recharger un téléphone', text:'Brancher le câble adapté sur la sortie USB-C ou sur la connectique iPhone prévue. Vérifier que le connecteur correspond bien au téléphone avant de brancher.'},
      {title:'Choisir le bon usage', text:'La puissance annoncée est de 10 W : ce modèle est destiné aux petites recharges et à un usage standard, pas à la charge ultra-rapide.'}
    ],
    notes:['Câble USB-C fourni.','Recharge standard de 10 W.']
  },
  'greenmini': {
    capacity:'10 000 mAh', power:'15 W ou 22,5 W selon version',
    inputPorts:['USB-C'],
    variants:[
      {name:'Version 15 W', power:'15 W', outputs:['2 × USB-A (ports noirs)'], detail:'Utiliser l’une des deux sorties USB-A.'},
      {name:'Version 22,5 W', power:'22,5 W', outputs:['1 × USB-C', '2 × USB-A (ports orange)'], detail:'La sortie USB-C et les deux sorties USB-A permettent de connecter les appareils compatibles. Les ports orange identifient la version 22,5 W.'}
    ],
    steps:[
      {title:'Identifier la version', text:'Ports noirs : version 15 W avec deux sorties USB-A. Ports orange : version 22,5 W avec une sortie USB-C et deux sorties USB-A.'},
      {title:'Recharger la powerbank', text:'Connecter un câble USB-C au port d’entrée USB-C (IN), puis à un adaptateur secteur USB compatible. Ne pas utiliser une sortie USB-A ou USB-C marquée OUT pour recharger la batterie.'},
      {title:'Recharger un appareil', text:'Version 15 W : brancher l’appareil sur l’une des deux sorties USB-A. Version 22,5 W : utiliser la sortie USB-C ou l’une des deux sorties USB-A, avec un câble adapté.'}
    ],
    notes:['Deux versions distinctes : 15 W et 22,5 W.','La puissance réellement délivrée dépend aussi de l’appareil, du câble et de l’adaptateur utilisés.','Câble fourni.']
  },
  'greencore': {
    capacity:'10 000 mAh', power:'15 W', inputPorts:['USB-C'], outputPorts:['2 × USB-A'],
    steps:[
      {title:'Recharger la powerbank', text:'Brancher le câble sur l’entrée USB-C de la GreenCore, puis sur un adaptateur secteur USB compatible.'},
      {title:'Recharger un appareil', text:'Relier le téléphone ou l’équipement à l’une des deux sorties USB-A avec le câble correspondant à l’appareil. Ne pas confondre les sorties USB-A avec l’entrée USB-C.'},
      {title:'Utiliser l’éclairage LED', text:'Activer le système lumineux avec la commande prévue sur le boîtier. La fonction comprend quatre niveaux d’éclairage et un mode clignotant de signalisation. Elle peut servir de veilleuse ou d’éclairage d’appoint.'}
    ],
    notes:['Deux sorties USB-A pour les appareils.','Éclairage LED à quatre niveaux + clignotement de signalisation.','Câble fourni.']
  },
  'greenplus': {
    capacity:'10 000 mAh', power:'15 W', inputPorts:['Micro-USB'], outputPorts:['3 × USB-A'],
    steps:[
      {title:'Recharger la powerbank', text:'Utiliser le port Micro-USB comme entrée de recharge. Brancher le câble Micro-USB sur un adaptateur secteur USB compatible.'},
      {title:'Recharger un appareil', text:'Brancher le câble de l’appareil sur l’une des trois sorties USB-A. Vérifier que le câble est adapté au téléphone ou à l’équipement.'},
      {title:'Utiliser plusieurs sorties', text:'Les trois ports USB-A permettent de connecter plusieurs appareils compatibles. La puissance de 15 W est la puissance annoncée du modèle ; elle n’est pas une puissance garantie individuellement sur chaque port en utilisation simultanée.'}
    ],
    notes:['Entrée : Micro-USB.','Sorties : trois USB-A.','Câble fourni.']
  },
  'green-eco': {
    capacity:'10 000 mAh', power:'15 W', inputPorts:['Micro-USB', 'USB-C'], outputPorts:['USB-A'],
    steps:[
      {title:'Choisir l’entrée de recharge', text:'La GreenEco possède deux possibilités d’entrée : Micro-USB ou USB-C. Utiliser une seule entrée de recharge à la fois et brancher le câble correspondant.'},
      {title:'Recharger un appareil', text:'Utiliser la sortie USB-A pour relier le téléphone ou l’équipement avec un câble USB-A adapté.'},
      {title:'Vérifier le branchement', text:'Avant la mise en charge, vérifier que le câble est placé sur l’entrée souhaitée (IN) et non sur la sortie USB-A (OUT).'}
    ],
    notes:['Deux entrées de recharge : Micro-USB et USB-C.','Sortie : USB-A.','Câble fourni.']
  },
  'green-africa': {
    capacity:'10 000 mAh (selon la carte produit)', power:'15 W', inputPorts:['USB-C'], outputPorts:['USB-A'],
    steps:[
      {title:'Recharger la powerbank', text:'Brancher le câble USB-C sur l’entrée USB-C de la GreenAfrica, puis sur un adaptateur secteur USB compatible.'},
      {title:'Recharger un appareil', text:'Connecter le câble de l’appareil à la sortie USB-A. Vérifier la compatibilité du câble et de l’appareil avant la charge.'},
      {title:'Débrancher après utilisation', text:'Lorsque la recharge est terminée, déconnecter l’appareil sans tirer sur le câble. Garder les ports propres et secs.'}
    ],
    notes:['Entrée : USB-C.','Sortie : USB-A.','Câble fourni.']
  },
  'greenpro': {
    capacity:'12 000 mAh', power:'15 W', inputPorts:['USB-C'], outputPorts:['2 × USB-A'],
    steps:[
      {title:'Recharger la powerbank', text:'Utiliser l’entrée USB-C pour recharger la GreenPro depuis un adaptateur secteur USB compatible.'},
      {title:'Recharger un appareil', text:'Brancher un câble USB-A adapté sur l’une des deux sorties USB-A, puis connecter le téléphone ou l’appareil.'},
      {title:'Connecter deux appareils', text:'Les deux sorties USB-A permettent de connecter deux appareils compatibles. La puissance disponible est partagée selon les appareils et les conditions d’utilisation.'}
    ],
    notes:['Entrée : USB-C.','Deux sorties USB-A.','Câble fourni.']
  },
  'green-reck': {
    capacity:'12 000 mAh', power:'15 W', inputPorts:['Micro-USB'], outputPorts:['2 × USB-A'],
    steps:[
      {title:'Recharger la powerbank', text:'Brancher le câble Micro-USB sur l’entrée de recharge de la GreenReck, puis sur un adaptateur secteur USB compatible.'},
      {title:'Recharger un appareil', text:'Utiliser l’une des deux sorties USB-A avec un câble adapté au téléphone ou à l’équipement.'},
      {title:'Vérifier les ports', text:'L’entrée Micro-USB sert à recharger la powerbank. Les deux ports USB-A servent à alimenter les appareils externes.'}
    ],
    notes:['Entrée : Micro-USB.','Deux sorties USB-A.','Câble fourni.']
  },
  'greenwire': {
    capacity:'Environ 20 000 mAh', power:'15 W ou 22,5 W selon version', inputPorts:[],
    inputNote:'Connectique d’entrée non renseignée dans les données disponibles.',
    variants:[
      {name:'Version 15 W', power:'15 W', outputs:['2 × USB-A (ports noirs)'], detail:'Recharge des appareils par les deux sorties USB-A.'},
      {name:'Version 22,5 W', power:'22,5 W', outputs:['1 × USB-C', '2 × USB-A (ports orange)', 'Recharge sans fil'], detail:'La version 22,5 W identifiée par les ports orange comprend une sortie USB-C, deux sorties USB-A et la recharge sans fil.'}
    ],
    steps:[
      {title:'Identifier la version', text:'Ports noirs : version 15 W avec deux sorties USB-A. Ports orange : version 22,5 W avec deux sorties USB-A et recharge sans fil.'},
      {title:'Recharger la powerbank', text:'Le type d’entrée n’étant pas confirmé ici, vérifier le marquage IN / INPUT directement sur le boîtier. Ne brancher l’adaptateur que sur cette entrée.'},
      {title:'Recharger par câble ou sans fil', text:'Version 15 W : utiliser une sortie USB-A. Version 22,5 W : utiliser la sortie USB-C ou l’une des deux sorties USB-A. Pour le sans-fil, poser un téléphone compatible au centre de la zone prévue.'}
    ],
    notes:['Capacité indiquée sur la carte produit : environ 20 000 mAh ; à confirmer sur l’étiquette.','Ports noirs : 15 W. Ports orange : 22,5 W.','Le type d’entrée de recharge doit être confirmé sur le boîtier. Câble fourni.']
  },
  'greenwireless': {
    capacity:'20 000 mAh', power:'Selon le mode de sortie et l’appareil', inputPorts:[],
    inputNote:'Connectique d’entrée à confirmer sur la fiche technique du modèle.',
    outputPorts:['USB-C PD', 'USB-A QC 3.0', 'Recharge sans fil'],
    steps:[
      {title:'Recharger la batterie', text:'Repérer l’entrée marquée IN / INPUT sur le boîtier. La connectique d’entrée n’étant pas confirmée dans les données de cette fiche, suivre le marquage du produit.'},
      {title:'Recharger par câble', text:'Utiliser la sortie USB-C PD ou USB-A QC 3.0, selon la connectique acceptée par l’appareil et le câble utilisé.'},
      {title:'Recharger sans fil', text:'Placer un téléphone compatible au centre de la zone de recharge sans fil. Aligner correctement le téléphone et vérifier que la recharge a commencé.'},
      {title:'Boîtier amovible', text:'Manipuler le boîtier amovible sans forcer les éléments d’assemblage. Ne pas utiliser le produit si un connecteur est endommagé.'}
    ],
    notes:['Recharge sans fil intégrée.','Sorties indiquées dans la fiche : USB-C PD et USB-A QC 3.0.','Entrée de recharge à vérifier sur le produit.','Câble fourni.']
  },
  'green-tech': {
    capacity:'20 000 mAh', power:'22,5 W', inputPorts:[],
    inputNote:'Connectique d’entrée non renseignée dans les données disponibles.',
    outputPorts:['USB-C (charge rapide)', '2 × USB-A'],
    steps:[
      {title:'Recharger la powerbank', text:'Identifier l’entrée IN / INPUT sur le boîtier avant de connecter un adaptateur compatible. La sortie USB-C mentionnée dans cette fiche est destinée à la charge des appareils.'},
      {title:'Recharger un téléphone ou autre appareil', text:'Utiliser la sortie USB-C pour un appareil compatible avec la charge rapide, ou l’une des deux sorties USB-A avec le câble approprié.'},
      {title:'Utiliser l’éclairage LED', text:'Activer le système LED avec la commande prévue sur le boîtier. L’éclairage puissant sert d’éclairage d’appoint, notamment lors d’une coupure de courant.'}
    ],
    notes:['Sorties : USB-C + deux USB-A.','Éclairage LED puissant intégré.','Entrée de recharge à confirmer sur le boîtier.','Câble fourni.']
  },
  'greenlaptop-plus': {
    capacity:'36 000 mAh', power:'65 à 100 W', inputPorts:[], outputPorts:[],
    inputNote:'Connecteurs et embouts variables selon la version commercialisée.',
    steps:[
      {title:'Vérifier la compatibilité de l’ordinateur', text:'Contrôler la puissance requise par le PC portable et la compatibilité du connecteur ou de l’embout. La puissance annoncée de cette gamme varie de 65 W à 100 W.'},
      {title:'Choisir le câble adapté', text:'Utiliser exclusivement le câble et l’embout correspondant à l’ordinateur. Ne jamais forcer un connecteur qui ne s’insère pas correctement.'},
      {title:'Brancher et contrôler la charge', text:'Connecter le chargeur à l’ordinateur, puis vérifier l’indication de charge de l’appareil. La puissance effectivement utilisée dépend de la demande du PC et de la version du chargeur.'}
    ],
    notes:['Capacité annoncée : 36 000 mAh.','Puissance variable : 65 W à 100 W.','Connecteurs et embouts à confirmer selon le kit livré.']
  },
  'green-laptop': {
    capacity:'20 000 mAh', power:'100 W', inputPorts:[], outputPorts:[],
    inputNote:'Connecteurs et câble à confirmer selon la version du produit.',
    steps:[
      {title:'Vérifier l’appareil à alimenter', text:'Confirmer que l’ordinateur portable accepte une alimentation de 100 W via le connecteur correspondant. Pour un téléphone, vérifier la compatibilité avec la charge rapide.'},
      {title:'Brancher le câble approprié', text:'Choisir le câble ou l’embout adapté au téléphone ou à l’ordinateur. Ne pas forcer un connecteur et ne pas utiliser un câble détérioré.'},
      {title:'Contrôler la charge', text:'Après branchement, vérifier que l’appareil affiche la charge. La puissance réellement utilisée dépend de l’appareil et de son niveau de batterie.'}
    ],
    notes:['Capacité : 20 000 mAh.','Puissance annoncée : 100 W.','Connecteurs à vérifier sur la version commercialisée.','Câble fourni.']
  },
  'green-wifi': {
    capacity:'12 000 mAh', power:'Mini-UPS Wi-Fi', inputPorts:[], outputPorts:['DC 5 V', 'DC 9 V', 'DC 12 V'],
    inputNote:'Connecteur d’entrée secteur à confirmer selon la version commercialisée.',
    steps:[
      {title:'Vérifier la tension du routeur', text:'Lire la tension d’alimentation inscrite sur l’étiquette du routeur ou du modem (par exemple 5 V, 9 V ou 12 V). Ne jamais choisir une tension au hasard.'},
      {title:'Sélectionner la sortie correspondante', text:'Relier le routeur à la sortie du GreenWifi correspondant exactement à sa tension nominale. Vérifier aussi que le connecteur et sa polarité sont adaptés.'},
      {title:'Mettre le système en service', text:'Brancher le routeur au GreenWifi, puis alimenter le mini-UPS selon les indications du fabricant. En cas de coupure secteur, le système prend le relais si la configuration est compatible.'},
      {title:'Alimenter une caméra compatible', text:'Une caméra peut également être alimentée si sa tension, sa polarité, son connecteur et sa consommation sont compatibles. L’autonomie dépend de la caméra et de la configuration.'}
    ],
    notes:['Capacité : 12 000 mAh.','Autonomie annoncée pour le Wi-Fi : environ 4 à 6 heures selon la consommation.','Vérifier impérativement tension, polarité et connecteur du routeur ou de la caméra.']
  }
};

function pdfCharByte(ch){
  const cp = ch.codePointAt(0);
  if(cp <= 0xFF) return cp;
  const map = {
    '€':0x80,'‚':0x82,'ƒ':0x83,'„':0x84,'…':0x85,'†':0x86,'‡':0x87,'ˆ':0x88,'‰':0x89,
    'Š':0x8A,'‹':0x8B,'Œ':0x8C,'Ž':0x8E,'‘':0x91,'’':0x92,'“':0x93,'”':0x94,'•':0x95,
    '–':0x96,'—':0x97,'˜':0x98,'™':0x99,'š':0x9A,'›':0x9B,'œ':0x9C,'ž':0x9E,'Ÿ':0x9F,
    '×':0xD7,'÷':0xF7,'₄':0x34,'₂':0x32,'₃':0x33,'₁':0x31,'₀':0x30,'₅':0x35,'₆':0x36
  };
  return Object.prototype.hasOwnProperty.call(map,ch) ? map[ch] : null;
}

function pdfLiteral(value){
  let out = '(';
  const source = String(value ?? '').replace(/[\u202F\u00A0]/g,' ');
  for(const ch of source){
    let byte = pdfCharByte(ch);
    if(byte === null){
      const simple = ch.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      if(simple && /^[\x20-\x7E]+$/.test(simple)){
        for(const ascii of simple){
          if(ascii === '(' || ascii === ')' || ascii === '\\') out += '\\' + ascii;
          else out += ascii;
        }
      }else if(ch === '−') out += '-';
      else if(ch === '’' || ch === '‘') out += "'";
      else if(ch === '“' || ch === '”') out += '"';
      else out += '?';
      continue;
    }
    if(byte === 40 || byte === 41 || byte === 92) out += '\\' + String.fromCharCode(byte);
    else if(byte < 32 || byte > 126) out += '\\' + byte.toString(8).padStart(3,'0');
    else out += String.fromCharCode(byte);
  }
  return out + ')';
}

function pdfText(text,x,y,size=10,font='F1',color=[0.12,0.19,0.15]){
  return `BT /${font} ${size} Tf ${color[0]} ${color[1]} ${color[2]} rg 1 0 0 1 ${x} ${y} Tm ${pdfLiteral(text)} Tj ET\n`;
}
function pdfFill(x,y,w,h,color){return `q ${color[0]} ${color[1]} ${color[2]} rg ${x} ${y} ${w} ${h} re f Q\n`;}
function pdfStroke(x,y,w,h,color=[0.84,0.88,0.84],width=0.8){return `q ${width} w ${color[0]} ${color[1]} ${color[2]} RG ${x} ${y} ${w} ${h} re S Q\n`;}
function pdfRule(x1,y1,x2,y2,color=[0.83,0.87,0.83],width=0.7){return `q ${width} w ${color[0]} ${color[1]} ${color[2]} RG ${x1} ${y1} m ${x2} ${y2} l S Q\n`;}
function wrapPdfText(text,maxChars=88){
  const words=String(text ?? '').replace(/\s+/g,' ').trim().split(' ');
  const lines=[]; let line='';
  for(const word of words){
    if(!word) continue;
    if(!line){line=word;continue;}
    if((line+' '+word).length<=maxChars) line+=' '+word;
    else {lines.push(line);line=word;}
  }
  if(line) lines.push(line);
  return lines;
}
function pdfParagraph(text,x,y,maxChars=88,size=9,lineGap=13,color=[0.20,0.27,0.23],font='F1',maxLines=6){
  const lines=wrapPdfText(text,maxChars).slice(0,maxLines);
  let yy=y;
  let cmd='';
  lines.forEach(line=>{cmd+=pdfText(line,x,yy,size,font,color);yy-=lineGap;});
  return {cmd,y:yy,lines};
}
function pdfSectionTitle(label,x,y){
  return pdfText(label.toUpperCase(),x,y,10,'F2',[0.02,0.25,0.15]) + pdfRule(x,y-7,x+510,y-7,[0.82,0.87,0.82],0.8);
}
function pdfPill(text,x,y,w,fill=[0.91,0.96,0.92],ink=[0.03,0.27,0.16]){
  let s=pdfFill(x,y,w,20,fill);
  s+=pdfText(text,x+8,y+6,8,'F2',ink);
  return s;
}
function pdfPageFooter(pageNo,totalPages=2){
  let s=pdfFill(0,0,595.28,48,[0.02,0.25,0.15]);
  s+=pdfFill(0,48,595.28,2,[0.83,0.69,0.22]);
  s+=pdfText('GREENBRIDGE TECHNOLOGIES  |  ASSEMBLÉ EN AFRIQUE DE L’OUEST',38,28,7.3,'F2',[1,1,1]);
  s+=pdfText('Documentation technique GreenBridge - schema de principe et mode d’emploi.',38,14,6.6,'F1',[0.90,0.95,0.91]);
  s+=pdfText(`${pageNo} / ${totalPages}`,535,28,8,'F2',[1,1,1]);
  return s;
}
function pdfPhotoBox(imageData,x,y,w,h){
  let s=pdfFill(x,y,w,h,[0.965,0.977,0.965]);
  s+=pdfStroke(x,y,w,h,[0.80,0.86,0.81],0.8);
  if(imageData){
    const scale=Math.min((w-12)/imageData.width,(h-12)/imageData.height);
    const iw=imageData.width*scale, ih=imageData.height*scale;
    const ix=x+(w-iw)/2, iy=y+(h-ih)/2;
    s+=`q ${iw.toFixed(2)} 0 0 ${ih.toFixed(2)} ${ix.toFixed(2)} ${iy.toFixed(2)} cm /Im1 Do Q\n`;
  }else{
    s+=pdfText('PHOTO PRODUIT',x+53,y+h/2+4,10,'F2',[0.31,0.43,0.35]);
    s+=pdfText('VISUEL NON DISPONIBLE',x+39,y+h/2-12,7.5,'F1',[0.40,0.48,0.42]);
  }
  return s;
}
function pdfPortCard(title,items,x,y,w,h,emptyNote){
  let s=pdfFill(x,y,w,h,[0.965,0.977,0.965]);
  s+=pdfStroke(x,y,w,h,[0.82,0.88,0.83],0.7);
  s+=pdfText(title.toUpperCase(),x+10,y+h-17,8.3,'F2',[0.02,0.25,0.15]);
  let yy=y+h-34;
  const values=(items && items.length) ? items : [emptyNote || 'Type de port à confirmer sur le produit'];
  values.slice(0,4).forEach((item)=>{
    const lines=wrapPdfText(item,Math.max(24,Math.floor((w-28)/4.8))).slice(0,2);
    s+=pdfFill(x+10,yy-2,5,5,[0.83,0.69,0.22]);
    lines.forEach((line,idx)=>{s+=pdfText(line,x+22,yy-idx*10,7.8,'F1',[0.13,0.20,0.16]);});
    yy-=Math.max(17,lines.length*10+4);
  });
  return s;
}
function makeNoticePageOne(product,guide,imageData,totalPages=2){
  const W=595.28;
  let s=pdfFill(0,0,W,841.89,[1,1,1]);
  s+=pdfFill(0,760,W,82,[0.02,0.25,0.15]);
  s+=pdfFill(0,755,W,5,[0.83,0.69,0.22]);
  s+=pdfText('GREENBRIDGE',38,812,22,'F2',[1,1,1]);
  s+=pdfText('TECHNOLOGIES',40,794,9,'F2',[0.88,0.95,0.89]);
  s+=pdfText('NOTICE TECHNIQUE ET GUIDE DE BRANCHEMENT',365,808,8,'F2',[1,0.88,0.47]);
  s+=pdfText('FICHE PRODUIT',365,790,7.5,'F1',[0.90,0.95,0.91]);

  const titleLines=wrapPdfText(product.title || 'Produit GreenBridge',42).slice(0,2);
  let ty=724;
  titleLines.forEach(line=>{s+=pdfText(line,38,ty,16.5,'F2',[0.02,0.25,0.15]);ty-=21;});
  const subtitle=product.subtitle || '';
  if(subtitle){
    wrapPdfText(subtitle,46).slice(0,2).forEach(line=>{s+=pdfText(line,40,ty-1,8.5,'F1',[0.31,0.39,0.34]);ty-=13;});
  }
  s+=pdfText('Référence : '+String(product.id || 'GB').toUpperCase(),40,ty-5,7,'F2',[0.45,0.51,0.46]);

  s+=pdfFill(38,574,275,82,[0.93,0.965,0.94]);
  s+=pdfStroke(38,574,275,82,[0.83,0.88,0.83],0.7);
  s+=pdfText('DONNÉES PRINCIPALES',50,638,8,'F2',[0.02,0.25,0.15]);
  s+=pdfText('CAPACITÉ',50,615,7,'F2',[0.35,0.43,0.37]);
  const capacityLines=wrapPdfText(guide.capacity || 'Voir étiquette produit',17).slice(0,2);
  capacityLines.forEach((line,i)=>{s+=pdfText(line,50,594-i*12,capacityLines.length>1?9.2:12.5,'F2',[0.02,0.25,0.15]);});
  s+=pdfText('PUISSANCE / FONCTION',180,615,7,'F2',[0.35,0.43,0.37]);
  wrapPdfText(guide.power || 'Selon version',19).slice(0,2).forEach((line,i)=>{s+=pdfText(line,180,594-i*12,8.4,'F2',[0.02,0.25,0.15]);});

  s+=pdfPhotoBox(imageData,330,574,227,146);
  s+=pdfText(imageData ? 'VISUEL PRODUIT - 2E PHOTO DE LA GALERIE' : 'VISUEL PRODUIT',330,562,6.2,'F1',[0.43,0.50,0.44]);

  s+=pdfSectionTitle('Caractéristiques techniques',38,535);
  let y=511;
  const specs=(product.specs || []).slice(0,11);
  specs.forEach((spec)=>{
    const lines=wrapPdfText(spec,94).slice(0,2);
    s+=pdfFill(42,y-1,4,4,[0.83,0.69,0.22]);
    lines.forEach((line,idx)=>{s+=pdfText(line,54,y-idx*12,8.4,'F1',[0.13,0.20,0.16]);});
    y-=Math.max(16,lines.length*12+3);
  });

  const portsHeadingY=Math.max(145,y-9);
  s+=pdfSectionTitle('Repérage des branchements',38,portsHeadingY);
  const cardY=portsHeadingY-94;
  s+=pdfPortCard('Entrée - recharge du produit',guide.inputPorts,38,cardY,250,74,guide.inputNote);
  if(guide.variants && guide.variants.length){
    s+=pdfFill(305,cardY,252,74,[0.965,0.977,0.965]);
    s+=pdfStroke(305,cardY,252,74,[0.82,0.88,0.83],0.7);
    s+=pdfText('SORTIES - SELON VERSION',315,cardY+57,8.2,'F2',[0.02,0.25,0.15]);
    let vy=cardY+40;
    guide.variants.forEach((v)=>{
      s+=pdfText(`${v.name} (${v.power})`,315,vy,7.5,'F2',[0.13,0.20,0.16]);vy-=10;
      s+=pdfText((v.outputs||[]).join(' + '),324,vy,7,'F1',[0.20,0.28,0.22]);vy-=13;
    });
  }else{
    s+=pdfPortCard('Sorties - appareils à alimenter',guide.outputPorts,305,cardY,252,74,guide.outputNote);
  }
  s+=pdfText('Les noms de ports indiquent leur fonction et leur type, pas leur position physique sur le boîtier.',38,cardY-9,6.4,'F1',[0.38,0.45,0.39]);

  const notes=(guide.notes || []).slice(0,3);
  if(notes.length){
    let ny=cardY-26;
    s+=pdfText('À RETENIR',38,ny,7.5,'F2',[0.02,0.25,0.15]); ny-=12;
    notes.forEach(note=>{
      const lines=wrapPdfText(note,105).slice(0,1);
      s+=pdfText('•',42,ny,7,'F2',[0.83,0.69,0.22]);
      s+=pdfText(lines[0]||'',52,ny,6.8,'F1',[0.29,0.36,0.30]);
      ny-=10;
    });
  }
  if(String(product.id||'').toLowerCase().includes('lifepo4')){
    // Aperçu de courbe sur la première page : les deux graphiques complets sont en page 3/4.
    s+=pdfFill(38,72,519,92,[0.985,0.991,0.985]);
    s+=pdfStroke(38,72,519,92,[0.79,0.86,0.80],0.8);
    s+=pdfText('APERÇU DE PERFORMANCE - COURBE TENSION / SOC',50,147,7.6,'F2',[0.02,0.25,0.15]);
    s+=pdfText('Profil qualitatif indicatif - graphique détaillé et cycle CC/CV en page 3/4.',50,134,6.1,'F1',[0.36,0.42,0.37]);
    const mini=[[0,0.10],[8,0.52],[18,0.70],[35,0.77],[55,0.81],[75,0.84],[90,0.87],[100,0.90]];
    const mp=mini.map(([xv,yv])=>[66+xv*4.55,84+yv*43]);
    for(let i=0;i<4;i++) s+=pdfLine(66,84+i*14.3,521,84+i*14.3,[0.89,0.92,0.89],0.4);
    s+=pdfPolyline(mp,[0.05,0.43,0.25],1.8);
    s+=pdfText('SOC (%)',526,82,5.3,'F1',[0.36,0.42,0.37]);
  }
  s+=pdfPageFooter(1,totalPages);
  return s;
}
function pdfLine(x1,y1,x2,y2,color=[0.10,0.35,0.22],width=1){
  return `q ${width} w ${color[0]} ${color[1]} ${color[2]} RG ${x1} ${y1} m ${x2} ${y2} l S Q\n`;
}
function pdfArrow(x1,y1,x2,y2,color=[0.10,0.35,0.22],width=1.4){
  const angle=Math.atan2(y2-y1,x2-x1), head=5;
  const a1=angle+Math.PI*0.82, a2=angle-Math.PI*0.82;
  const hx1=x2+head*Math.cos(a1), hy1=y2+head*Math.sin(a1);
  const hx2=x2+head*Math.cos(a2), hy2=y2+head*Math.sin(a2);
  let s=pdfLine(x1,y1,x2,y2,color,width);
  s+=pdfLine(x2,y2,hx1,hy1,color,width);
  s+=pdfLine(x2,y2,hx2,hy2,color,width);
  return s;
}
function pdfDiagramNode(x,y,w,h,title,detail,fill=[0.93,0.965,0.94]){
  let s=pdfFill(x,y,w,h,fill);
  s+=pdfStroke(x,y,w,h,[0.70,0.80,0.72],0.8);
  const titleLines=wrapPdfText(title,Math.max(14,Math.floor(w/5.2))).slice(0,2);
  const detailLines=wrapPdfText(detail||'',Math.max(18,Math.floor(w/4.7))).slice(0,2);
  let ty=y+h-12;
  titleLines.forEach(line=>{s+=pdfText(line,x+6,ty,6.8,'F2',[0.02,0.25,0.15]);ty-=8;});
  detailLines.forEach(line=>{s+=pdfText(line,x+6,ty-1,5.7,'F1',[0.22,0.30,0.24]);ty-=7;});
  return s;
}
function pdfPowerbankConnectionDiagram(guide,product){
  const x=38,y=88,w=519,h=164;
  let s=pdfFill(x,y,w,h,[0.985,0.991,0.985]);
  s+=pdfStroke(x,y,w,h,[0.79,0.86,0.80],0.8);
  const isUps=(guide.outputPorts||[]).some(v=>/DC 5|DC 9|DC 12/i.test(v));
  const isLaptop=/laptop|ordinateur|chargeur pc/i.test(String(product&&product.title||''));
  const diagramTitle=isUps?'SCHEMA DE PRINCIPE - MINI-UPS WI-FI':(isLaptop?'SCHEMA DE PRINCIPE - CHARGEUR PORTABLE':'SCHEMA DE PRINCIPE - POWERBANK');
  s+=pdfText(diagramTitle,50,234,8.5,'F2',[0.02,0.25,0.15]);
  s+=pdfText(isUps?'A. ALIMENTER LE MINI-UPS':(isLaptop?'A. RECHARGER LE CHARGEUR PORTABLE':'A. RECHARGER LA POWERBANK'),50,214,6.8,'F2',[0.35,0.43,0.37]);
  const input=(guide.inputPorts&&guide.inputPorts.length)?guide.inputPorts.join(' / '):(guide.inputNote?'Connectique selon version':'Entrée indiquée sur le produit');
  const sourceTitle=isUps?'ADAPTATEUR SECTEUR':(isLaptop?'SOURCE / ADAPTATEUR':'ADAPTATEUR SECTEUR USB');
  const sourceDetail=isUps?'Alimentation compatible':(isLaptop?'Selon le kit fourni':'Sortie USB compatible');
  const inputTitle=isUps?'ENTREE DU MINI-UPS':(isLaptop?'ENTREE DU CHARGEUR':'ENTREE IN / INPUT');
  s+=pdfDiagramNode(50,173,155,34,sourceTitle,sourceDetail);
  s+=pdfDiagramNode(390,173,155,34,inputTitle,input,[0.91,0.96,0.92]);
  s+=pdfArrow(214,190,382,190,[0.10,0.40,0.24],1.6);
  s+=pdfText('Câble de recharge adapté',255,199,5.8,'F1',[0.31,0.39,0.33]);
  s+=pdfText(isUps?'B. MAINTENIR L’ALIMENTATION DU ROUTEUR':(isLaptop?'B. ALIMENTER UN ORDINATEUR COMPATIBLE':'B. RECHARGER UN APPAREIL'),50,151,6.8,'F2',[0.35,0.43,0.37]);
  let outputs=(guide.outputPorts&&guide.outputPorts.length)?guide.outputPorts.join(' / '):'';
  if(guide.variants&&guide.variants.length){
    outputs=guide.variants.map(v=>`${v.name}: ${(v.outputs||[]).join(' + ')}`).join(' | ');
  }
  if(guide.outputNote) outputs=guide.outputNote;
  if(!outputs) outputs='Sortie / câble selon la version du produit';
  const outputTitle=isUps?'GREENWIFI - SORTIES DC':(isLaptop?'GREENLAPTOP - SORTIE':'POWERBANK - SORTIE OUT');
  if(isUps) outputs=(guide.outputPorts||[]).join(' / ');
  if(isLaptop&&!outputs) outputs='Embout / connecteur selon version';
  s+=pdfDiagramNode(50,105,180,36,outputTitle,outputs,[0.91,0.96,0.92]);
  let destination=isUps?'Routeur / modem / caméra compatible':'Téléphone ou appareil compatible';
  if(isLaptop) destination='Ordinateur portable compatible';
  if((guide.outputPorts||[]).some(v=>/sans.?fil/i.test(v)) || /sans.?fil/i.test(outputs)) destination='Téléphone compatible (zone sans fil ou câble)';
  if(/ordinateur/i.test(String(guide.power||'')) || /ordinateur/i.test(String(guide.notes||''))) destination='Ordinateur compatible / appareil';
  s+=pdfDiagramNode(390,105,155,36,isUps?'ROUTEUR / MODEM':(isLaptop?'ORDINATEUR PORTABLE':'APPAREIL ALIMENTE'),destination);
  s+=pdfArrow(239,123,382,123,[0.10,0.40,0.24],1.6);
  s+=pdfText('Câble adapté ou recharge sans fil selon modèle',245,132,5.6,'F1',[0.31,0.39,0.33]);
  s+=pdfText('Le dessin explique le sens de l’énergie ; il ne représente pas la position physique des connecteurs.',50,94,5.7,'F1',[0.40,0.46,0.41]);
  return s;
}
function pdfLiFePO4SystemDiagram(){
  const x=38,y=74,w=519,h=184;
  let s=pdfFill(x,y,w,h,[0.985,0.991,0.985]);
  s+=pdfStroke(x,y,w,h,[0.79,0.86,0.80],0.8);
  s+=pdfText('SCHEMA DE PRINCIPE - SYSTEME BATTERIE LiFePO4',50,240,8.2,'F2',[0.02,0.25,0.15]);
  s+=pdfText('CIRCUIT DE CHARGE',50,220,6.6,'F2',[0.35,0.43,0.37]);
  s+=pdfDiagramNode(50,178,112,34,'CHARGEUR / MPPT','Profil LiFePO4 compatible');
  s+=pdfDiagramNode(242,178,112,34,'PACK LiFePO4','BMS intégré / polarité');
  s+=pdfArrow(168,195,235,195,[0.10,0.40,0.24],1.5);
  s+=pdfText('Courant de charge',176,205,5.5,'F1',[0.31,0.39,0.33]);
  s+=pdfText('CIRCUIT DE DECHARGE',50,158,6.6,'F2',[0.35,0.43,0.37]);
  s+=pdfDiagramNode(50,112,112,36,'BATTERIE (+ / -)','Sortie DC du pack',[0.91,0.96,0.92]);
  s+=pdfDiagramNode(196,112,112,36,'FUSIBLE + SECTIONNEUR','Protection DC dimensionnée');
  s+=pdfDiagramNode(390,112,145,36,'ONDULEUR / CHARGES','Entrée DC compatible');
  s+=pdfArrow(168,130,188,130,[0.10,0.40,0.24],1.5);
  s+=pdfArrow(314,130,382,130,[0.10,0.40,0.24],1.5);
  s+=pdfText('Retour negatif (-) vers la borne negative du pack, selon le schema d’installation valide.',50,96,6.1,'F1',[0.20,0.28,0.22]);
  s+=pdfText('Sections de câble, protections, couple de serrage et réglages : à dimensionner selon le pack et la notice constructeur.',50,84,5.7,'F1',[0.35,0.40,0.36]);
  return s;
}
function makeNoticePageTwo(product,guide,totalPages=2){
  const W=595.28;
  const isLiFePO4=String(product.id||'').toLowerCase().includes('lifepo4');
  let s=pdfFill(0,0,W,841.89,[1,1,1]);
  s+=pdfFill(0,760,W,82,[0.02,0.25,0.15]);
  s+=pdfFill(0,755,W,5,[0.83,0.69,0.22]);
  s+=pdfText('GREENBRIDGE TECHNOLOGIES',38,812,18,'F2',[1,1,1]);
  s+=pdfText('MODE D’EMPLOI • SCHEMA DE RACCORDEMENT • SECURITE',38,790,8.2,'F2',[1,0.88,0.47]);
  s+=pdfText(product.title || 'Produit GreenBridge',38,728,17,'F2',[0.02,0.25,0.15]);
  s+=pdfParagraph('Suivre les étapes ci-dessous. Les schémas représentent le principe fonctionnel et non la disposition physique exacte des ports ou bornes.',38,706,105,8.1,11,[0.29,0.36,0.31],'F1',2).cmd;

  const steps=(guide.steps && guide.steps.length) ? guide.steps : [
    {title:'Identifier les connecteurs',text:'Repérer les entrées et sorties indiquées dans le tableau technique de la première page.'},
    {title:'Effectuer le branchement',text:'Utiliser un câble et une alimentation compatibles avec les caractéristiques du produit.'},
    {title:'Contrôler le fonctionnement',text:'Vérifier l’indication de charge ou d’alimentation, puis débrancher en tenant la fiche.'}
  ];
  let y=664;
  steps.slice(0,4).forEach((step,index)=>{
    const lines=wrapPdfText(step.text,103).slice(0,3);
    const boxH=54+Math.max(0,lines.length-1)*9;
    s+=pdfFill(38,y-boxH+7,519,boxH,[0.965,0.977,0.965]);
    s+=pdfStroke(38,y-boxH+7,519,boxH,[0.83,0.88,0.83],0.6);
    s+=pdfFill(48,y-20,20,20,[0.02,0.25,0.15]);
    s+=pdfText(String(index+1),55,y-13,8.5,'F2',[1,1,1]);
    s+=pdfText(step.title,78,y-9,8.5,'F2',[0.02,0.25,0.15]);
    lines.forEach((line,i)=>{s+=pdfText(line,78,y-24-i*10,7.2,'F1',[0.20,0.27,0.22]);});
    y-=boxH+7;
  });

  let adviceBottom=0;
  if(y>270){
    s+=pdfSectionTitle('Conseils d’utilisation',38,y-1);
    let py=y-20;
    const precautions=[
      'Employer un câble et un adaptateur secteur compatibles avec le produit et l’appareil connecté.',
      'Garder le boîtier et les connecteurs propres et secs ; éviter l’eau, les chocs et les fortes températures.',
      'Ne pas forcer les fiches, court-circuiter les ports, ouvrir le boîtier ou utiliser un câble abîmé.'
    ];
    if(guide.extraPrecautions) precautions.unshift(...guide.extraPrecautions);
    precautions.slice(0,3).forEach(item=>{
      const lines=wrapPdfText(item,108).slice(0,2);
      s+=pdfText('•',42,py,7.5,'F2',[0.83,0.69,0.22]);
      lines.forEach((line,i)=>{s+=pdfText(line,54,py-i*9,6.8,'F1',[0.22,0.29,0.24]);});
      py-=Math.max(12,lines.length*9+2);
    });
    adviceBottom=py-7;
  }

  if(!isLiFePO4 && adviceBottom>285){
    const ty=Math.min(adviceBottom,386);
    s+=pdfSectionTitle('Dépannage rapide',38,ty);
    const checks=[
      ['La powerbank ne charge pas','Vérifier le port IN, le câble, l’adaptateur secteur et la prise utilisée.'],
      ['Aucun appareil ne se recharge','Contrôler le niveau de batterie, le port OUT et la compatibilité du câble.'],
      ['La charge est lente','Vérifier la puissance maximale du modèle et la compatibilité du téléphone et du câble.']
    ];
    let cy=ty-18;
    checks.forEach((item,i)=>{
      s+=pdfFill(38,cy-13,519,16,i%2?[0.985,0.991,0.985]:[0.95,0.97,0.95]);
      s+=pdfText(item[0],45,cy-3,6.0,'F2',[0.02,0.25,0.15]);
      const lines=wrapPdfText(item[1],91).slice(0,1);
      s+=pdfText(lines[0]||'',205,cy-3,5.7,'F1',[0.20,0.27,0.22]);
      cy-=18;
    });
  }

  s+=isLiFePO4 ? pdfLiFePO4SystemDiagram() : pdfPowerbankConnectionDiagram(guide,product);
  s+=pdfPageFooter(2,totalPages);
  return s;
}

function binaryStringToBytes(value){
  const out=new Uint8Array(value.length);
  for(let i=0;i<value.length;i++) out[i]=value.charCodeAt(i)&255;
  return out;
}
function concatPdfBytes(parts){
  const total=parts.reduce((sum,p)=>sum+p.length,0);
  const out=new Uint8Array(total); let offset=0;
  parts.forEach(part=>{out.set(part,offset);offset+=part.length;});
  return out;
}
function buildPdfBinary(objects){
  const chunks=[binaryStringToBytes('%PDF-1.4\n%GreenBridgeNotice\n')];
  let offset=chunks[0].length;
  const offsets=[0];
  objects.forEach((obj)=>{
    offsets[obj.id]=offset;
    const bytes=binaryStringToBytes(`${obj.id} 0 obj\n${obj.body}\nendobj\n`);
    chunks.push(bytes); offset+=bytes.length;
  });
  const maxId=Math.max(...objects.map(o=>o.id));
  let xref=`xref\n0 ${maxId+1}\n0000000000 65535 f \n`;
  for(let i=1;i<=maxId;i++) xref+=(offsets[i] ? String(offsets[i]).padStart(10,'0')+' 00000 n \n' : '0000000000 00000 f \n');
  xref+=`trailer\n<< /Size ${maxId+1} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF`;
  chunks.push(binaryStringToBytes(xref));
  return new Blob([concatPdfBytes(chunks)],{type:'application/pdf'});
}
async function loadJpegForPdf(source){
  if(!source) return null;
  let objectUrl='';
  try{
    const response=await fetch(source,{cache:'force-cache'});
    if(!response.ok) throw new Error(`Image introuvable : ${source}`);
    const blob=await response.blob();
    let bitmap;
    if('createImageBitmap' in window){
      bitmap=await createImageBitmap(blob);
    }else{
      objectUrl=URL.createObjectURL(blob);
      const img=new Image();
      await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=objectUrl;});
      bitmap=img;
    }
    const maxSide=1100;
    const ratio=Math.min(1,maxSide/Math.max(bitmap.width,bitmap.height));
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(bitmap.width*ratio));
    canvas.height=Math.max(1,Math.round(bitmap.height*ratio));
    const ctx=canvas.getContext('2d');
    if(!ctx) throw new Error('Canvas indisponible');
    ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
    if(bitmap.close) bitmap.close();
    const jpg=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',0.88));
    if(!jpg) throw new Error('Conversion JPEG impossible');
    const bytes=new Uint8Array(await jpg.arrayBuffer());
    let binary='';
    const chunk=0x8000;
    for(let i=0;i<bytes.length;i+=chunk){binary+=String.fromCharCode(...bytes.subarray(i,Math.min(i+chunk,bytes.length)));}
    return {binary,width:canvas.width,height:canvas.height,source};
  }catch(error){
    console.warn('Photo de notice non chargée :',source,error);
    return null;
  }finally{
    if(objectUrl) URL.revokeObjectURL(objectUrl);
  }
}
async function getNoticePhoto(candidateSources){
  const unique=[...new Set((candidateSources||[]).filter(Boolean))];
  for(const source of unique){
    const image=await loadJpegForPdf(source);
    if(image) return image;
  }
  return null;
}
function pdfPolyline(points,color=[0.10,0.40,0.24],width=1.8,dash=''){
  if(!points||points.length<2) return '';
  let s=`q ${width} w ${color[0]} ${color[1]} ${color[2]} RG `;
  if(dash) s+=`[${dash}] 0 d `;
  s+=`${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)} m `;
  for(let i=1;i<points.length;i++) s+=`${points[i][0].toFixed(2)} ${points[i][1].toFixed(2)} l `;
  s+='S [] 0 d Q\n';
  return s;
}
function pdfGraphPanel(x,y,w,h,title,subtitle){
  let s=pdfFill(x,y,w,h,[0.985,0.991,0.985]);
  s+=pdfStroke(x,y,w,h,[0.79,0.86,0.80],0.8);
  s+=pdfText(title.toUpperCase(),x+13,y+h-20,8.1,'F2',[0.02,0.25,0.15]);
  if(subtitle) s+=pdfParagraph(subtitle,x+13,y+h-34,112,6.2,8,[0.36,0.42,0.37],'F1',2).cmd;
  return s;
}
function makeLiFePO4AppendixPage(product,guide){
  const W=595.28,H=841.89;
  let s=pdfFill(0,0,W,H,[1,1,1]);
  s+=pdfFill(0,760,W,82,[0.02,0.25,0.15]);
  s+=pdfFill(0,755,W,5,[0.83,0.69,0.22]);
  s+=pdfText('GREENBRIDGE TECHNOLOGIES',38,812,18,'F2',[1,1,1]);
  s+=pdfText('ANNEXE TECHNIQUE • PROFILS ELECTRIQUES',38,790,8.3,'F2',[1,0.88,0.47]);
  s+=pdfText('Batterie LiFePO4 - 104 Ah',38,728,17,'F2',[0.02,0.25,0.15]);
  s+=pdfParagraph('Repères de lecture pour comprendre le comportement d’un pack LiFePO4. Les graphiques ci-dessous sont des profils pédagogiques indicatifs, et non des résultats de laboratoire du produit livré.',38,706,105,7.8,11,[0.29,0.36,0.31],'F1',3).cmd;

  const cards=[
    {x:38,w:122,label:'CAPACITE',value:'104 Ah'},
    {x:170,w:122,label:'TENSION PROJET',value:'12,8 V nominal*'},
    {x:302,w:122,label:'DECHARGE ANNONCEE',value:'100 A'},
    {x:434,w:123,label:'ENERGIE THEORIQUE*',value:'1,33 kWh'}
  ];
  cards.forEach(c=>{
    s+=pdfFill(c.x,635,c.w,43,[0.93,0.965,0.94]);
    s+=pdfStroke(c.x,635,c.w,43,[0.83,0.88,0.83],0.6);
    s+=pdfText(c.label,c.x+7,662,5.7,'F2',[0.35,0.43,0.37]);
    s+=pdfText(c.value,c.x+7,645,8.2,'F2',[0.02,0.25,0.15]);
  });
  s+=pdfText('*Tension de projet 4S / 12,8 V ; énergie calculée à titre théorique (12,8 V x 104 Ah). Confirmer la configuration sur l’étiquette du pack.',40,620,5.7,'F1',[0.38,0.44,0.39]);

  // Graphique 1 : courbe tension / état de charge indicative pour une architecture LiFePO4 4S.
  s+=pdfGraphPanel(38,376,519,225,'PROFIL INDICATIF DE TENSION A VIDE EN FONCTION DU SOC','Profil schématique 4S : plateau de tension sur une grande partie de la capacité, puis baisse plus marquée lorsque le SOC devient faible.');
  const gx=91,gy=421,gw=430,gh=112;
  const yMin=10.5,yMax=14.0;
  for(let i=0;i<=5;i++){
    const yy=gy+i*gh/5;
    s+=pdfLine(gx,yy,gx+gw,yy,[0.88,0.91,0.88],0.45);
    const v=(yMin+i*(yMax-yMin)/5).toFixed(1);
    s+=pdfText(v,gx-28,yy-2,5.8,'F1',[0.34,0.40,0.35]);
  }
  for(let i=0;i<=5;i++){
    const xx=gx+i*gw/5;
    s+=pdfLine(xx,gy,xx,gy+gh,[0.91,0.93,0.91],0.4);
    s+=pdfText(String(i*20),xx-4,gy-12,5.8,'F1',[0.34,0.40,0.35]);
  }
  s+=pdfLine(gx,gy,gx,gy+gh,[0.28,0.38,0.30],0.9);
  s+=pdfLine(gx,gy,gx+gw,gy,[0.28,0.38,0.30],0.9);
  s+=pdfText('Tension (V)',gx-6,gy+gh+12,5.9,'F2',[0.25,0.33,0.27]);
  s+=pdfText('Etat de charge - SOC (%)',gx+155,gy-27,6.1,'F2',[0.25,0.33,0.27]);
  const discharge=[[0,10.7],[5,12.0],[10,12.65],[20,12.95],[30,13.05],[40,13.10],[50,13.14],[60,13.17],[70,13.20],[80,13.22],[90,13.25],[100,13.30]];
  const dp=discharge.map(([soc,v])=>[gx+soc/100*gw,gy+(v-yMin)/(yMax-yMin)*gh]);
  s+=pdfPolyline(dp,[0.05,0.43,0.25],2.1);
  s+=pdfText('Courbe indicative - valeurs réelles dépendantes du courant, de la température, du BMS et du repos de la batterie.',52,388,5.7,'F1',[0.38,0.44,0.39]);

  // Graphique 2 : principe de charge CC/CV en valeurs relatives uniquement.
  s+=pdfGraphPanel(38,118,519,239,'CYCLE DE CHARGE CC / CV - SCHEMA DE PRINCIPE','Phase CC : courant presque constant et tension qui monte. Phase CV : tension régulée et courant qui diminue progressivement.');
  const cx=91,cy=170,cw=430,ch=115;
  for(let i=0;i<=4;i++){
    const yy=cy+i*ch/4;
    s+=pdfLine(cx,yy,cx+cw,yy,[0.88,0.91,0.88],0.45);
    s+=pdfText(`${i*25}%`,cx-26,yy-2,5.6,'F1',[0.34,0.40,0.35]);
  }
  for(let i=0;i<=5;i++){
    const xx=cx+i*cw/5;
    s+=pdfLine(xx,cy,xx,cy+ch,[0.91,0.93,0.91],0.4);
    s+=pdfText(`${i*20}`,xx-4,cy-12,5.6,'F1',[0.34,0.40,0.35]);
  }
  s+=pdfLine(cx,cy,cx,cy+ch,[0.28,0.38,0.30],0.9);
  s+=pdfLine(cx,cy,cx+cw,cy,[0.28,0.38,0.30],0.9);
  s+=pdfText('Grandeur relative (%)',cx-7,cy+ch+12,5.8,'F2',[0.25,0.33,0.27]);
  s+=pdfText('Progression de la charge (temps relatif)',cx+125,cy-26,5.8,'F2',[0.25,0.33,0.27]);
  const voltage=[[0,18],[10,42],[20,60],[35,78],[50,88],[65,94],[75,96],[100,96]];
  const current=[[0,82],[20,82],[40,82],[60,82],[70,76],[78,60],[86,40],[94,23],[100,14]];
  const vp=voltage.map(([t,v])=>[cx+t/100*cw,cy+v/100*ch]);
  const ip=current.map(([t,v])=>[cx+t/100*cw,cy+v/100*ch]);
  s+=pdfPolyline(vp,[0.05,0.43,0.25],2.0);
  s+=pdfPolyline(ip,[0.82,0.57,0.10],1.8,'4 3');
  s+=pdfLine(365,145,389,145,[0.05,0.43,0.25],2);
  s+=pdfText('Tension relative',394,143,5.8,'F1',[0.25,0.33,0.27]);
  s+=pdfLine(470,145,492,145,[0.82,0.57,0.10],1.8);
  s+=pdfText('Courant',496,143,5.8,'F1',[0.25,0.33,0.27]);
  s+=pdfText('Le profil de charge réel, les seuils de tension et le courant maximal doivent provenir de la fiche du BMS et du chargeur retenus.',52,129,5.6,'F1',[0.38,0.44,0.39]);
  s+=pdfPageFooter(3,4);
  return s;
}

function makeLiFePO4CommissioningPage(product,guide){
  const W=595.28,H=841.89;
  let s=pdfFill(0,0,W,H,[1,1,1]);
  s+=pdfFill(0,760,W,82,[0.02,0.25,0.15]);
  s+=pdfFill(0,755,W,5,[0.83,0.69,0.22]);
  s+=pdfText('GREENBRIDGE TECHNOLOGIES',38,812,18,'F2',[1,1,1]);
  s+=pdfText('MISE EN SERVICE • MAINTENANCE • SUIVI',38,790,8.3,'F2',[1,0.88,0.47]);
  s+=pdfText('Protocole de mise en service',38,728,17,'F2',[0.02,0.25,0.15]);
  s+=pdfParagraph('Cette page sert de liste de contrôle avant la première utilisation et lors des inspections périodiques. Les valeurs limites doivent être reprises de la fiche constructeur du pack, du BMS et du chargeur utilisés.',38,706,106,7.8,11,[0.29,0.36,0.31],'F1',3).cmd;

  const checks=[
    ['Identification du pack','Relever la référence, la configuration série/parallèle, la tension nominale et la capacité sur l’étiquette.'],
    ['Compatibilité du chargeur','Confirmer le profil LiFePO4, la tension de fin de charge et le courant maximal autorisés par le fabricant.'],
    ['Protection et câblage DC','Vérifier le calibre du fusible, le sectionneur, la section des conducteurs et le pouvoir de coupure.'],
    ['Polarité et connexions','Contrôler + / − au multimètre avant raccordement. Vérifier le serrage selon le couple constructeur.'],
    ['BMS et environnement','Vérifier l’absence d’alarme BMS, l’état des câbles et le respect de la plage de température autorisée.'],
    ['Essai fonctionnel','Démarrer avec une charge maîtrisée, relever les tensions et courants, puis vérifier l’absence d’échauffement anormal.']
  ];
  let y=654;
  checks.forEach((item,i)=>{
    const boxY=y-57;
    s+=pdfFill(38,boxY,519,51,[0.965,0.977,0.965]);
    s+=pdfStroke(38,boxY,519,51,[0.83,0.88,0.83],0.6);
    s+=pdfFill(48,y-23,19,19,[0.02,0.25,0.15]);
    s+=pdfText(String(i+1),54,y-17,7.6,'F2',[1,1,1]);
    s+=pdfText(item[0],78,y-9,7.4,'F2',[0.02,0.25,0.15]);
    const detailLines=wrapPdfText(item[1],102).slice(0,2);
    detailLines.forEach((line,j)=>{s+=pdfText(line,78,y-23-j*8,6.5,'F1',[0.20,0.27,0.22]);});
    y-=59;
  });

  s+=pdfSectionTitle('Guide de diagnostic',38,286);
  const rows=[
    ['Le pack ne charge pas','Contrôler le chargeur, le profil LiFePO4, le câblage et les éventuelles protections BMS actives.'],
    ['La sortie se coupe','Vérifier la charge connectée, le courant demandé, la température et les alarmes du BMS.'],
    ['Autonomie plus faible','Comparer la consommation réelle, la température, l’état de charge et les mesures de capacité.'],
    ['Échauffement ou odeur','Déconnecter en sécurité si possible, arrêter l’utilisation et faire contrôler le pack par un technicien.']
  ];
  let ry=266;
  rows.forEach((r,i)=>{
    const fill=i%2?[0.985,0.991,0.985]:[0.95,0.97,0.95];
    s+=pdfFill(38,ry-30,519,28,fill);
    s+=pdfText(r[0],46,ry-13,6.4,'F2',[0.02,0.25,0.15]);
    const lines=wrapPdfText(r[1],91).slice(0,2);
    lines.forEach((line,j)=>{s+=pdfText(line,190,ry-13-j*8,5.9,'F1',[0.20,0.27,0.22]);});
    ry-=32;
  });

  s+=pdfSectionTitle('Fiche de suivi - à compléter lors des contrôles',38,126);
  const fieldY=84;
  const fields=[['DATE',38,112],['N° DE SÉRIE',158,130],['TENSION PACK',296,118],['TEMPÉRATURE',422,135]];
  fields.forEach(f=>{
    s+=pdfText(f[0],f[1],fieldY+22,5.8,'F2',[0.35,0.43,0.37]);
    s+=pdfStroke(f[1],fieldY,f[2],1,[0.62,0.70,0.63],0.7);
  });
  s+=pdfText('Technicien / signature : ______________________________________________',38,62,6.1,'F1',[0.30,0.37,0.32]);
  s+=pdfPageFooter(4,4);
  return s;
}

function makeProfessionalNoticePdf(product,guide,imageData){
  const isLiFePO4=String(product.id||'').toLowerCase().includes('lifepo4');
  const totalPages=isLiFePO4?4:2;
  const page1=makeNoticePageOne(product,guide,imageData,totalPages);
  const page2=makeNoticePageTwo(product,guide,totalPages);
  const page3=isLiFePO4?makeLiFePO4AppendixPage(product,guide):'';
  const page4=isLiFePO4?makeLiFePO4CommissioningPage(product,guide):'';
  const imageResource=imageData?'/XObject << /Im1 7 0 R >>':'';
  const kids=isLiFePO4?'[3 0 R 4 0 R 10 0 R 12 0 R]':'[3 0 R 4 0 R]';
  const objects=[
    {id:1,body:'<< /Type /Catalog /Pages 2 0 R >>'},
    {id:2,body:`<< /Type /Pages /Kids ${kids} /Count ${totalPages} >>`},
    {id:3,body:`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> ${imageResource} >> /Contents 8 0 R >>`},
    {id:4,body:'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 9 0 R >>'},
    {id:5,body:'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'},
    {id:6,body:'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'}
  ];
  if(imageData){
    objects.push({id:7,body:`<< /Type /XObject /Subtype /Image /Width ${imageData.width} /Height ${imageData.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageData.binary.length} >>\nstream\n${imageData.binary}\nendstream`});
  }
  objects.push({id:8,body:`<< /Length ${page1.length} >>\nstream\n${page1}endstream`});
  objects.push({id:9,body:`<< /Length ${page2.length} >>\nstream\n${page2}endstream`});
  if(isLiFePO4){
    objects.push({id:10,body:'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 11 0 R >>'});
    objects.push({id:11,body:`<< /Length ${page3.length} >>\nstream\n${page3}endstream`});
    objects.push({id:12,body:'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 13 0 R >>'});
    objects.push({id:13,body:`<< /Length ${page4.length} >>\nstream\n${page4}endstream`});
  }
  return buildPdfBinary(objects);
}

async function downloadProfessionalNotice(product,guide,candidateImages){
  try{
    const image=await getNoticePhoto(candidateImages);
    const blob=makeProfessionalNoticePdf(product,guide,image);
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    const safeName=String(product.id || product.title || 'greenbridge').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9-]/gi,'-').toLowerCase();
    link.href=url;link.download=(String(product.id||'').toLowerCase().includes('lifepo4') ? 'GREENBRIDGE-LiFePO4-104Ah-NOTICE-COMPLETE-COURBES-EDITION-2.pdf' : `greenbridge-${safeName}-notice-technique.pdf`);link.style.display='none';
    document.body.appendChild(link);link.click();link.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),30000);
  }catch(error){
    console.error('Erreur de génération de la notice GreenBridge :',error);
    window.alert('La notice PDF n’a pas pu être générée. Vérifie le chargement du site et réessaie.');
  }
  return false;
}
window.downloadProfessionalNotice=downloadProfessionalNotice;
function downloadModelPdf(index){
  const model=models[index];
  if(!model){window.alert('La fiche technique demandée est introuvable.');return false;}
  const guide=MODEL_NOTICE_GUIDES[model.id] || {};
  const candidates=[model.images && model.images[1],model.cardImage,...(model.images||[])];
  downloadProfessionalNotice(model,guide,candidates);
  return false;
}

/* Notices des nouveautés (code d'origine) */
/* Notices des nouveautés : elles sont créées à la demande avec une photo intégrée.
   La deuxième vue de la galerie est prioritaire ; si elle n'existe pas, la vue de la carte est utilisée. */
(function(){
  'use strict';
  const noveltyNotices={
    battery104:{
      id:'batterie-lifepo4-104ah', title:'Batterie LiFePO4 GreenBridge - 104 Ah',
      subtitle:'Stockage d’énergie • Cellules LiFePO4 Grade A',
      capacity:'104 Ah', power:'12,8 V nominal (configuration projet 4S) • Décharge annoncée : 100 A',
      specs:['Capacité nominale : 104 Ah','Technologie : LiFePO4','Cellules : Grade A','Configuration projet : 4S / 12,8 V nominal (à confirmer sur l’étiquette)','Énergie nominale théorique : environ 1,33 kWh','Courant de décharge annoncé : 100 A','Garantie annoncée : 3 ans'],
      entryNote:'Tension nominale, courant de charge, bornes et connectique doivent être confirmés sur l’étiquette technique du pack.',
      outputPorts:['Bornes de sortie DC + / − (forme des bornes à vérifier)'],
      steps:[
        {title:'Vérifier la compatibilité électrique',text:'Avant tout branchement, relever la tension nominale du pack et vérifier qu’elle correspond exactement à l’onduleur, au chargeur ou à l’équipement prévu.'},
        {title:'Préparer le raccordement',text:'Identifier clairement les bornes positives (+) et négatives (−). Utiliser des câbles de section adaptée et une protection électrique dimensionnée par un professionnel.'},
        {title:'Raccorder en respectant la polarité',text:'Faire raccorder le positif au positif et le négatif au négatif. Ne jamais inverser la polarité ni mettre les bornes en court-circuit.'},
        {title:'Choisir un chargeur compatible',text:'Employer uniquement un chargeur conçu pour la tension et la chimie LiFePO4 du pack, avec paramètres conformes à la fiche technique de la batterie.'}
      ],
      extraPrecautions:['Le raccordement d’un pack batterie doit être effectué ou contrôlé par un technicien compétent.'],
      notes:['Configuration projet 4S / 12,8 V nominal : confirmer la tension sur l’étiquette du pack commercialisé.','Énergie théorique indicative : environ 1,33 kWh (12,8 V × 104 Ah), hors pertes et limites d’utilisation.','Courbes de l’annexe : profils pédagogiques indicatifs, non issus d’un essai de laboratoire sur ce pack.']
    },
    v1:{
      id:'greenbridge-v1-6000mah', title:'GreenBridge V1 - 6 000 mAh',
      subtitle:'Powerbank • Cellules lithium-ion',capacity:'6 000 mAh',power:'Jusqu’à 22,5 W annoncés',
      specs:['Capacité : 6 000 mAh','Architecture annoncée : 2 cellules lithium-ion','Entrées de recharge : USB-C et Micro-USB','Sortie : USB-C','Puissance annoncée : jusqu’à 22,5 W','Câble fourni'],
      inputPorts:['USB-C','Micro-USB'],outputPorts:['USB-C'],
      steps:[
        {title:'Recharger la powerbank',text:'Utiliser l’entrée USB-C ou l’entrée Micro-USB. Connecter le câble correspondant à un adaptateur secteur USB compatible.'},
        {title:'Recharger un appareil',text:'Brancher l’appareil sur la sortie USB-C avec un câble compatible. Vérifier que le téléphone ou l’équipement accepte la charge via USB-C.'},
        {title:'Vérifier la charge rapide',text:'La puissance annoncée peut atteindre 22,5 W selon la version. Pour en bénéficier, l’appareil, le câble et l’adaptateur doivent être compatibles.'}
      ],notes:['Entrées : USB-C et Micro-USB.','Sortie : USB-C.','Câble fourni.']
    },
    v2:{
      id:'greenbridge-v2-10000mah', title:'GreenBridge V2 - 10 000 mAh',
      subtitle:'Powerbank • Cellules lithium-ion',capacity:'10 000 mAh',power:'Jusqu’à 22,5 W annoncés',
      specs:['Capacité : 10 000 mAh','Architecture annoncée : 2 cellules lithium-ion','Entrées de recharge : USB-C et Micro-USB','Sortie : USB-C','Puissance annoncée : jusqu’à 22,5 W','Câble fourni'],
      inputPorts:['USB-C','Micro-USB'],outputPorts:['USB-C'],
      steps:[
        {title:'Recharger la powerbank',text:'Utiliser l’entrée USB-C ou l’entrée Micro-USB. Connecter le câble correspondant à un adaptateur secteur USB compatible.'},
        {title:'Recharger un appareil',text:'Brancher l’appareil sur la sortie USB-C avec un câble compatible. Vérifier que l’appareil accepte l’alimentation via USB-C.'},
        {title:'Vérifier la charge rapide',text:'La puissance annoncée peut atteindre 22,5 W selon la version. La puissance réelle dépend de la compatibilité de l’appareil, du câble et de l’adaptateur.'}
      ],notes:['Entrées : USB-C et Micro-USB.','Sortie : USB-C.','Câble fourni.']
    },
    v3:{
      id:'greenbridge-v3-12000mah', title:'GreenBridge V3 - 12 000 mAh',
      subtitle:'Powerbank • Cellules lithium-ion',capacity:'12 000 mAh',power:'Jusqu’à 22,5 W annoncés',
      specs:['Capacité : 12 000 mAh','Architecture annoncée : 2 cellules lithium-ion','Entrées de recharge : USB-C et Micro-USB','Sortie : USB-C','Puissance annoncée : jusqu’à 22,5 W','Câble fourni'],
      inputPorts:['USB-C','Micro-USB'],outputPorts:['USB-C'],
      steps:[
        {title:'Recharger la powerbank',text:'Utiliser l’entrée USB-C ou l’entrée Micro-USB. Connecter le câble correspondant à un adaptateur secteur USB compatible.'},
        {title:'Recharger un appareil',text:'Brancher l’appareil sur la sortie USB-C avec un câble compatible. Vérifier la compatibilité avant de lancer la charge.'},
        {title:'Vérifier la charge rapide',text:'La puissance annoncée peut atteindre 22,5 W selon la version. La puissance réelle dépend de l’appareil, du câble et de l’adaptateur.'}
      ],notes:['Entrées : USB-C et Micro-USB.','Sortie : USB-C.','Câble fourni.']
    }
  };
  window.GB_NOVELTY_NOTICES=noveltyNotices;
  const noveltyCardImages={
    battery104:'gb-lifepo4-1.webp',
    v1:'gb-v1-1.webp',
    v2:'gb-v2-1.webp',
    v3:'gb-v3-1.webp'
  };
  window.downloadLiFePO4TechnicalNotice=function(){
    const product=noveltyNotices.battery104;
    if(!product){window.alert('La notice de la batterie LiFePO4 est introuvable.');return false;}
    const gallery=(window.newProductGalleryImages && window.newProductGalleryImages.lifepo4) || [];
    // La deuxième photo de la galerie est prioritaire pour la notice PDF.
    const candidates=[gallery[1],gallery[0],noveltyCardImages.battery104,...gallery.slice(2)];
    window.downloadProfessionalNotice(product,product,candidates);
    return false;
  };
  window.downloadEmbeddedNotice=function(noticeKey){
    if(noticeKey==='battery104') return window.downloadLiFePO4TechnicalNotice();
    const product=noveltyNotices[noticeKey];
    if(!product){window.alert('Cette notice GreenBridge est introuvable.');return false;}
    const gallery=(window.newProductGalleryImages && window.newProductGalleryImages[noticeKey]) || [];
    const candidates=[gallery[1],gallery[0],noveltyCardImages[noticeKey],...gallery.slice(2)];
    window.downloadProfessionalNotice(product,product,candidates);
    return false;
  };
})();

/* =====================================================================
   Partie 2 : interface du site (cartes, fenêtres, WhatsApp, menu)
   ===================================================================== */

const GB_WHATSAPP = { coteivoire:'2250172611537', senegal:'221774015004' };

/* =====================================================================
   PHOTOS : une seule liste par produit (la 1re = photo de la carte)
   ===================================================================== */
const GB_IMAGES = {
 "m0": [
  "gb-greenonly-1.webp",
  "gb-greenonly-2.webp",
  "gb-greenonly-3.webp",
  "gb-greenonly-4.webp",
  "gb-greenonly-5.webp",
  "gb-greenonly-6.webp"
 ],
 "v1": [
  "gb-v1-1.webp",
  "gb-v1-2.webp",
  "gb-v1-3.webp"
 ],
 "m3": [
  "gb-greenplus-1.webp",
  "gb-greenplus-2.webp",
  "gb-greenplus-3.webp",
  "gb-greenplus-4.webp"
 ],
 "m2": [
  "gb-greencore-1.webp",
  "gb-greencore-2.webp",
  "gb-greencore-3.webp",
  "gb-greencore-4.webp",
  "gb-greencore-5.webp"
 ],
 "m4": [
  "gb-greeneco-1.webp",
  "gb-greeneco-2.webp",
  "gb-greeneco-3.webp",
  "gb-greeneco-4.webp",
  "gb-greeneco-5.webp"
 ],
 "m5": [
  "gb-greenafrica-1.webp",
  "gb-greenafrica-2.webp",
  "gb-greenafrica-3.webp",
  "gb-greenafrica-4.webp",
  "gb-greenafrica-5.webp"
 ],
 "v2": [
  "gb-v2-1.webp",
  "gb-v2-2.webp"
 ],
 "m1": [
  "gb-greenmini-1.webp",
  "gb-greenmini-2.webp",
  "gb-greenmini-3.webp",
  "gb-greenmini-4.webp"
 ],
 "m7": [
  "gb-greenreck-1.webp",
  "gb-greenreck-2.webp"
 ],
 "m6": [
  "gb-greenpro-1.webp",
  "gb-greenpro-2.webp",
  "gb-greenpro-3.webp",
  "gb-greenpro-4.webp",
  "gb-greenpro-5.webp"
 ],
 "v3": [
  "gb-v3-1.webp",
  "gb-v3-2.webp"
 ],
 "m8": [
  "gb-greenwire-1.webp",
  "gb-greenwire-2.webp",
  "gb-greenwire-3.webp"
 ],
 "m9": [
  "gb-greenwireless-1.webp",
  "gb-greenwireless-2.webp",
  "gb-greenwireless-3.webp",
  "gb-greenwireless-4.webp"
 ],
 "m10": [
  "gb-greentech-1.webp",
  "gb-greentech-2.webp",
  "gb-greentech-3.webp"
 ],
 "m12": [
  "gb-greenlaptop-1.webp",
  "gb-greenlaptop-2.webp",
  "gb-greenlaptop-3.webp"
 ],
 "m11": [
  "gb-greenlaptop-plus-1.webp",
  "gb-greenlaptop-plus-2.webp"
 ],
 "m13": [
  "gb-greenwifi-1.webp",
  "gb-greenwifi-2.webp"
 ],
 "lifepo4": [
  "gb-lifepo4-1.webp",
  "gb-lifepo4-2.webp",
  "gb-lifepo4-3.webp",
  "gb-lifepo4-4.webp",
  "gb-lifepo4-5.webp"
 ],
 "pack": [
  "gb-pack25-1.webp",
  "gb-pack25-2.webp",
  "gb-pack25-3.webp"
 ]
};
/* Synchronise l’ancien code (galeries, notices PDF) avec cette liste */
(function(){
  for(const id in GB_IMAGES){
    if(id.startsWith('m') && typeof models !== 'undefined' && models[Number(id.slice(1))]){
      const m = models[Number(id.slice(1))]; m.cardImage = GB_IMAGES[id][0]; m.images = GB_IMAGES[id].slice();
    }
  }
})();

/* Galeries des nouveautés */
const newProductGalleryImages = { lifepo4:GB_IMAGES.lifepo4, v1:GB_IMAGES.v1, v2:GB_IMAGES.v2, v3:GB_IMAGES.v3 };
window.newProductGalleryImages = newProductGalleryImages;

const NEW_PRODUCT_INFO = {
  lifepo4:{ title:'Batterie LiFePO₄ — 104 Ah', description:'Batterie GreenBridge équipée de cellules LiFePO₄ Grade A, avec courant de décharge annoncé de 100 A et garantie de 3 ans.', specs:['Capacité nominale : 104 Ah','Cellules LiFePO₄ Grade A','Courant de décharge annoncé : 100 A','Garantie annoncée : 3 ans','Conception et assemblage GreenBridge'] },
  v1:{ title:'GreenBridge V1 — 6 000 mAh', description:'Powerbank de 6 000 mAh avec 2 cellules lithium-ion de haute qualité, USB-C en entrée et en sortie, entrée Micro-USB et puissance annoncée jusqu’à 22,5 W.', specs:['Capacité : 6 000 mAh','2 cellules lithium-ion','Entrées : USB-C et Micro-USB','Sortie : USB-C','Jusqu’à 22,5 W annoncés'] },
  v2:{ title:'GreenBridge V2 — 10 000 mAh', description:'Powerbank de 10 000 mAh avec 2 cellules lithium-ion de haute qualité, USB-C en entrée et en sortie, entrée Micro-USB et puissance annoncée jusqu’à 22,5 W.', specs:['Capacité : 10 000 mAh','2 cellules lithium-ion','Entrées : USB-C et Micro-USB','Sortie : USB-C','Jusqu’à 22,5 W annoncés'] },
  v3:{ title:'GreenBridge V3 — 12 000 mAh', description:'Powerbank de 12 000 mAh avec 2 cellules lithium-ion de haute qualité, USB-C en entrée et en sortie, entrée Micro-USB et puissance annoncée jusqu’à 22,5 W.', specs:['Capacité : 12 000 mAh','2 cellules lithium-ion','Entrées : USB-C et Micro-USB','Sortie : USB-C','Jusqu’à 22,5 W annoncés'] }
};

/* =====================================================================
   CATALOGUE : prix, capacités et arguments de chaque produit
   price = prix « à partir de » en FCFA, mah = capacité en mAh (tri)
   ===================================================================== */
const GB_CARDS = {
  m0:{ name:'GreenOnly',    mah:4500,  price:6000,  spec:'4 500 mAh, 10 W',         use:'≈ 1 recharge de smartphone',     pitch:'Le format de poche pour dépanner votre téléphone dans la journée.', family:'phone', tags:['compact'] },
  v1:{ name:'GreenBridge V1',mah:6000, price:6000,  spec:'6 000 mAh, 22,5 W',       use:'≈ 1 recharge de smartphone',     pitch:'Compacte et rapide : jusqu’à 22,5 W en USB-C.', family:'phone', tags:['compact','fast'], isNew:true },
  m3:{ name:'GreenPlus',    mah:10000, price:6000,  spec:'10 000 mAh, 15 W',        use:'≈ 2 recharges de smartphone',    pitch:'Trois sorties pour recharger trois appareils en même temps.', family:'phone', tags:[] },
  m2:{ name:'GreenCore',    mah:10000, price:7000,  spec:'10 000 mAh, 15 W',        use:'≈ 2 recharges de smartphone',    pitch:'Powerbank et lampe LED à 4 niveaux, utile pendant les coupures.', family:'phone', tags:['led'] },
  m4:{ name:'GreenEco',     mah:10000, price:7000,  spec:'10 000 mAh, 15 W',        use:'≈ 2 recharges de smartphone',    pitch:'Se recharge en USB-C ou Micro-USB : le câble que vous avez sous la main.', family:'phone', tags:[] },
  m5:{ name:'GreenAfrica',  mah:10000, price:7000,  spec:'10 000 mAh, 15 W',        use:'≈ 2 recharges de smartphone',    pitch:'L’essentiel, simple et fiable : entrée USB-C, sortie USB-A.', family:'phone', tags:[] },
  v2:{ name:'GreenBridge V2',mah:10000,price:7500,  spec:'10 000 mAh, 22,5 W',      use:'≈ 2 recharges de smartphone',    pitch:'10 000 mAh avec la charge rapide 22,5 W en USB-C.', family:'phone', tags:['fast'], isNew:true },
  m1:{ name:'GreenMini',    mah:10000, price:8000,  spec:'10 000 mAh, 15 ou 22,5 W',use:'≈ 2 recharges de smartphone',    pitch:'Compacte, en version 15 W ou en charge rapide 22,5 W.', family:'phone', tags:['fast'] },
  m7:{ name:'GreenReck',    mah:12000, price:7500,  spec:'12 000 mAh, 15 W',        use:'≈ 2 à 3 recharges de smartphone',pitch:'Deux sorties pour recharger deux appareils à la fois.', family:'phone', tags:[] },
  m6:{ name:'GreenPro',     mah:12000, price:9000,  spec:'12 000 mAh, 15 W',        use:'≈ 2 à 3 recharges de smartphone',pitch:'De quoi tenir toute la journée, avec deux sorties USB-A.', family:'phone', tags:[] },
  v3:{ name:'GreenBridge V3',mah:12000,price:9000,  spec:'12 000 mAh, 22,5 W',      use:'≈ 2 à 3 recharges de smartphone',pitch:'La plus endurante des nouveautés, en charge rapide.', family:'phone', tags:['fast'], isNew:true },
  m8:{ name:'GreenWire',    mah:20000, price:15000, spec:'20 000 mAh, 15 ou 22,5 W',use:'≈ 4 recharges de smartphone',    pitch:'Grande capacité, avec recharge sans fil en version 22,5 W.', family:'phone', tags:['fast','wireless'] },
  m9:{ name:'GreenWireless',mah:20000, price:18000, spec:'20 000 mAh, sans fil',    use:'≈ 4 recharges de smartphone',    pitch:'Posez votre téléphone dessus : il se recharge sans câble.', family:'phone', tags:['fast','wireless'], soldOut:true },
  m10:{name:'GreenTech',    mah:20000, price:18000, spec:'20 000 mAh, 22,5 W',      use:'≈ 4 recharges de smartphone',    pitch:'Charge rapide et lampe LED puissante pour les délestages.', family:'phone', tags:['fast','led'] },
  m12:{name:'GreenLaptop',  mah:20000, price:20000, spec:'20 000 mAh, 100 W',       use:'≈ 1 recharge d’ordinateur portable', pitch:'Ordinateur et téléphone rechargés, jusqu’à 100 W.', family:'laptop', tags:['fast'] },
  m11:{name:'GreenLaptop+', mah:36000, price:40000, spec:'36 000 mAh, 65 à 100 W',  use:'≈ 1,5 à 2 recharges d’ordinateur', pitch:'Une journée de travail loin des prises.', family:'laptop', tags:['fast'] },
  m13:{name:'GreenWifi',    mah:12000, price:30000, spec:'Mini-UPS 12 000 mAh',     use:'Jusqu’à 6 h de Wi-Fi pendant une coupure', pitch:'Votre box reste allumée quand le courant saute.', family:'wifi', tags:[] },
  lifepo4:{name:'Batterie LiFePO₄', mah:1330000, price:250000, spec:'104 Ah, 12,8 V', use:'≈ 1,3 kWh d’énergie stockée', pitch:'Lumière, ventilateur et télé pendant les délestages.', family:'storage', tags:[], isNew:true }
};
/* Ordre d’affichage par défaut : capacité, puis prix */
const GB_ORDER = Object.keys(GB_CARDS);
for(const id in GB_CARDS){ const c = GB_CARDS[id]; c.order = `${c.name} — ${c.spec} (à partir de ${gbPrice(c.price)})`; }
const GB_FAMILY_PAGE = { phone:'powerbanks.html', laptop:'greenlaptop.html', wifi:'greenwifi.html', storage:'lifepo4.html' };
const GB_FAMILY_LABEL = { phone:'Powerbanks', laptop:'GreenLaptop', wifi:'GreenWifi', storage:'LiFePO₄' };

function gbPrice(n){ return n.toLocaleString('fr-FR').replace(/\s/g, '\u202F') + '\u00A0FCFA'; }
function gbFicheUrl(id){ return 'fiche.html?p=' + encodeURIComponent(id); }

function escapeHTML(value){
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function gbImagesFor(id){ return (GB_IMAGES[id] || []).slice(); }

/* Image robuste : essaie chaque photo disponible, puis affiche un visuel neutre. */
function gbAttachImageFallback(img, candidates){
  let attempt = 0;
  img.addEventListener('error', function onErr(){
    attempt++;
    if(attempt < candidates.length){ img.src = candidates[attempt]; return; }
    img.removeEventListener('error', onErr);
    const ph = document.createElement('span');
    ph.className = 'media-empty';
    ph.innerHTML = '<i class="fa-solid fa-bolt" aria-hidden="true"></i><span>Visuel bientôt disponible</span>';
    img.replaceWith(ph);
  });
}

function gbCapGroup(c){
  if(c.family !== 'phone') return c.family;
  return c.mah <= 6000 ? 'cap-s' : c.mah <= 10000 ? 'cap-m' : c.mah <= 12000 ? 'cap-l' : 'cap-xl';
}

function gbCardHTML(id){
  const c = GB_CARDS[id];
  if(!c) return '';
  const imgs = gbImagesFor(id);
  const name = escapeHTML(c.name);
  const badge = c.soldOut ? '<span class="p-card__badge p-card__badge--out">Rupture de stock</span>'
              : c.isNew ? '<span class="p-card__badge">Nouveauté</span>' : '';
  const chips = [c.tags.includes('fast') ? 'Charge rapide' : '', c.tags.includes('led') ? 'Lampe LED' : '', c.tags.includes('wireless') ? 'Sans fil' : '']
    .filter(Boolean).map(t => `<li>${t}</li>`).join('');
  return `
  <article class="p-card" data-family="${c.family}" data-cap="${gbCapGroup(c)}" data-mah="${c.mah}" data-price="${c.price}" data-rank="${GB_ORDER.indexOf(id)}" data-id="${id}">
    <button class="p-card__media" type="button" data-open="${id}" aria-label="Aperçu rapide de ${name}">
      <img src="${escapeHTML(imgs[0] || '')}" alt="${name}" loading="lazy" decoding="async">
      ${badge}
    </button>
    <div class="p-card__body">
      <h3 class="p-card__name"><a href="${gbFicheUrl(id)}">${name}</a></h3>
      <p class="p-card__spec">${escapeHTML(c.spec)}</p>
      <p class="p-card__use">${escapeHTML(c.use)}</p>
      ${chips ? `<ul class="p-card__chips">${chips}</ul>` : ''}
      <p class="p-card__price"><small>À partir de</small> ${gbPrice(c.price)}</p>
    </div>
    <div class="p-card__actions">
      <button class="btn btn--wa btn--block btn--sm" type="button" data-order="${escapeHTML(c.soldOut ? c.name + ' — en rupture : je souhaite être informé du réassort' : c.order)}">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>${c.soldOut ? 'Être informé' : 'Commander'}
      </button>
      <a class="p-card__more" href="${gbFicheUrl(id)}">Fiche technique <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </div>
  </article>`;
}

function gbRenderGrids(){
  document.querySelectorAll('[data-gb-grid]').forEach(grid => {
    let ids = grid.dataset.gbGrid.split(',').map(s => s.trim()).filter(Boolean);
    if(grid.dataset.gbSort === 'default') ids = ids.sort((a, b) => GB_ORDER.indexOf(a) - GB_ORDER.indexOf(b));
    grid.innerHTML = ids.map(gbCardHTML).join('');
    grid.querySelectorAll('.p-card').forEach(card => {
      const img = card.querySelector('img');
      if(img) gbAttachImageFallback(img, gbImagesFor(card.dataset.id));
    });
  });
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    const list = [img.getAttribute('src'), ...img.dataset.fallback.split('|')].filter(Boolean);
    gbAttachImageFallback(img, list);
  });
}

/* ---------- Filtres et tri du catalogue ---------- */
function gbInitFilters(){
  document.querySelectorAll('[data-gb-tools]').forEach(tools => {
    const grid = document.getElementById(tools.dataset.gbTools);
    if(!grid) return;
    const counter = tools.querySelector('[data-count]');
    const select = tools.querySelector('select');
    const attr = tools.dataset.filterBy || 'family';
    let value = 'all';
    const apply = () => {
      const cards = Array.from(grid.querySelectorAll('.p-card'));
      let n = 0;
      cards.forEach(card => {
        const show = value === 'all' || card.dataset[attr] === value;
        card.hidden = !show; if(show) n++;
      });
      const mode = select ? select.value : 'default';
      const key = { default:c => [+c.dataset.rank], 'price-asc':c => [+c.dataset.price, +c.dataset.mah], 'price-desc':c => [-c.dataset.price, -c.dataset.mah], 'cap-desc':c => [-c.dataset.mah, +c.dataset.price] }[mode];
      cards.sort((a, b) => { const ka = key(a), kb = key(b); return ka[0] - kb[0] || (ka[1] || 0) - (kb[1] || 0); }).forEach(c => grid.appendChild(c));
      if(counter) counter.textContent = n + (n > 1 ? ' produits' : ' produit');
      tools.querySelectorAll('button[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === value)));
    };
    tools.addEventListener('click', e => {
      const b = e.target.closest('button[data-filter]');
      if(b){ value = b.dataset.filter; apply(); }
    });
    if(select) select.addEventListener('change', apply);
    apply();
  });
}

/* ---------- Guide « Quel modèle pour vous ? » ---------- */
function gbInitGuide(){
  const box = document.querySelector('[data-gb-guide]');
  if(!box) return;
  const state = {};
  const out = box.querySelector('.guide__result');
  const steps = Array.from(box.querySelectorAll('.guide__step'));
  const show = name => steps.forEach(s => s.hidden = s.dataset.step !== name);
  const result = () => {
    let ids = [], note = '';
    if(state.device === 'laptop') ids = ['m12', 'm11'];
    else if(state.device === 'wifi') ids = ['m13'];
    else if(state.device === 'home') ids = ['lifepo4'];
    else {
      const range = { one:[0, 6000], two:[10000, 12000], four:[20000, 20000] }[state.amount] || [0, 1e9];
      let list = GB_ORDER.filter(id => GB_CARDS[id].family === 'phone' && !GB_CARDS[id].soldOut && GB_CARDS[id].mah >= range[0] && GB_CARDS[id].mah <= range[1]);
      if(state.extra && state.extra !== 'any'){
        const filtered = list.filter(id => GB_CARDS[id].tags.includes(state.extra));
        if(filtered.length) list = filtered;
        else note = 'Aucun modèle de cette capacité n’a cette option : voici les plus proches.';
      }
      ids = list.sort((a, b) => GB_CARDS[a].price - GB_CARDS[b].price).slice(0, 3);
    }
    out.innerHTML = `<p class="guide__note">${note || 'Notre sélection pour vous, du moins cher au plus complet.'}</p><div class="p-grid p-grid--3">${ids.map(gbCardHTML).join('')}</div>
      <button class="guide__restart" type="button" data-guide-restart><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Recommencer</button>`;
    out.querySelectorAll('.p-card').forEach(card => { const img = card.querySelector('img'); if(img) gbAttachImageFallback(img, gbImagesFor(card.dataset.id)); });
    show('result');
  };
  box.addEventListener('click', e => {
    const opt = e.target.closest('[data-set]');
    if(opt){
      const [k, v] = opt.dataset.set.split(':');
      state[k] = v;
      if(k === 'device') v === 'phone' ? show('amount') : result();
      else if(k === 'amount') show('extra');
      else result();
      return;
    }
    if(e.target.closest('[data-guide-restart]')){ for(const k in state) delete state[k]; show('device'); }
    const back = e.target.closest('[data-guide-back]');
    if(back) show(back.dataset.guideBack);
  });
  show('device');
}

/* ---------- Calculateur d’autonomie (LiFePO₄) ---------- */
function gbInitCalculator(){
  const calc = document.querySelector('[data-gb-calc]');
  if(!calc) return;
  const usable = Number(calc.dataset.wh) * 0.85; /* énergie utile après onduleur et réserve */
  const total = calc.querySelector('[data-total]'), hours = calc.querySelector('[data-hours]');
  const update = () => {
    let w = 0;
    calc.querySelectorAll('[data-watt]').forEach(row => { w += Number(row.dataset.watt) * Number(row.querySelector('output').value); });
    total.textContent = w + ' W';
    if(!w){ hours.textContent = '—'; return; }
    const h = usable / w;
    hours.textContent = h >= 1 ? '≈ ' + (h >= 10 ? Math.round(h) : h.toFixed(1).replace('.', ',')) + ' h' : '≈ ' + Math.round(h * 60) + ' min';
  };
  calc.addEventListener('click', e => {
    const b = e.target.closest('button[data-step]');
    if(!b) return;
    const o = b.closest('[data-watt]').querySelector('output');
    o.value = Math.max(0, Math.min(20, Number(o.value) + Number(b.dataset.step)));
    update();
  });
  update();
}

/* ---------- Fenêtre modale ---------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
let gbLastFocus = null;
let modalCarouselImages = [];
let modalCarouselIndex = 0;
let modalCarouselTimer = null;
let pendingOrderProduct = '';

function openModal(html){
  gbLastFocus = document.activeElement;
  modalContent.innerHTML = html;
  modalOverlay.style.display = 'flex';
  modalOverlay.setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => modalOverlay.classList.add('is-open'));
  const closeBtn = modalOverlay.querySelector('.modal__close');
  if(closeBtn) closeBtn.focus({preventScroll:true});
  modalOverlay.querySelector('.modal').scrollTop = 0;
}

function closeModal(){
  modalOverlay.classList.remove('is-open');
  modalOverlay.style.display = 'none';
  modalOverlay.setAttribute('aria-hidden','true');
  document.body.classList.remove('no-scroll');
  stopModalCarousel();
  if(gbLastFocus && gbLastFocus.focus) gbLastFocus.focus({preventScroll:true});
}

function stopModalCarousel(){
  if(modalCarouselTimer){ clearInterval(modalCarouselTimer); modalCarouselTimer = null; }
}

function updateModalCarousel(){
  const img = document.getElementById('modalCarouselImage');
  const dots = document.getElementById('modalCarouselDots');
  const fallback = document.getElementById('modalCarouselFallback');
  const controls = document.getElementById('modalCarouselControls');
  if(!img) return;
  if(!modalCarouselImages.length){
    img.style.display = 'none';
    if(fallback) fallback.style.display = 'flex';
    if(controls) controls.style.display = 'none';
    if(dots) dots.innerHTML = '';
    stopModalCarousel();
    return;
  }
  const idx = ((modalCarouselIndex % modalCarouselImages.length) + modalCarouselImages.length) % modalCarouselImages.length;
  modalCarouselIndex = idx;
  const current = modalCarouselImages[idx];
  img.onerror = () => {
    /* Photo absente du dépôt : on la retire de la galerie et on passe à la suivante. */
    modalCarouselImages.splice(idx, 1);
    updateModalCarousel();
  };
  img.onload = () => { img.style.display = 'block'; if(fallback) fallback.style.display = 'none'; };
  img.alt = current.alt;
  img.src = current.src;
  if(controls) controls.style.display = modalCarouselImages.length > 1 ? '' : 'none';
  if(dots){
    dots.innerHTML = modalCarouselImages.length > 1 ? modalCarouselImages.map((_, i) =>
      `<button class="carousel-dot${i === idx ? ' active' : ''}" type="button" aria-label="Photo ${i + 1}" onclick="goModalCarousel(${i})"></button>`).join('') : '';
  }
}
function goModalCarousel(i){ modalCarouselIndex = i; updateModalCarousel(); gbRestartCarouselTimer(); }
function nextModalCarousel(){ modalCarouselIndex++; updateModalCarousel(); }
function prevModalCarousel(){ modalCarouselIndex--; updateModalCarousel(); gbRestartCarouselTimer(); }
function gbRestartCarouselTimer(){
  stopModalCarousel();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && modalCarouselImages.length > 1) modalCarouselTimer = setInterval(nextModalCarousel, 4500);
}
function startModalCarousel(images){
  modalCarouselImages = images.slice();
  modalCarouselIndex = 0;
  updateModalCarousel();
  gbRestartCarouselTimer();
}

function gbCarouselHTML(label){
  return `
    <div class="m-gallery" aria-label="Photos ${escapeHTML(label)}">
      <div class="m-gallery__stage">
        <img id="modalCarouselImage" alt="" loading="eager">
        <div class="media-empty" id="modalCarouselFallback" style="display:none"><i class="fa-solid fa-bolt" aria-hidden="true"></i><span>Photos bientôt disponibles</span></div>
        <div class="m-gallery__controls" id="modalCarouselControls">
          <button class="carousel-btn" type="button" aria-label="Photo précédente" onclick="prevModalCarousel()"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="carousel-btn" type="button" aria-label="Photo suivante" onclick="nextModalCarousel()"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="carousel-dots" id="modalCarouselDots"></div>
    </div>`;
}

function gbJsString(v){ return String(v).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/[\r\n]/g,' '); }

/* Données détaillées d’un produit, quelle que soit sa source */
function gbProduct(id){
  const c = GB_CARDS[id] || {};
  if(id.startsWith('m')){
    const i = Number(id.slice(1)), m = models[i] || {};
    return { id, card:c, title:c.name || m.title, subtitle:m.subtitle || '', details:(m.details || '').replace(/<strong>[\s\S]*?<\/strong>\s*<br>/i, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      specs:m.specs || [], guide:(typeof MODEL_NOTICE_GUIDES !== 'undefined' && MODEL_NOTICE_GUIDES[m.id]) || {}, pdf:() => downloadModelPdf(i) };
  }
  const info = NEW_PRODUCT_INFO[id] || {};
  const guide = (window.GB_NOVELTY_NOTICES || {})[id === 'lifepo4' ? 'battery104' : id] || {};
  return { id, card:c, title:c.name, subtitle:guide.subtitle || 'Conçu et assemblé par GreenBridge Technologies', details:info.description || '',
    specs:guide.specs || info.specs || [], guide, pdf:() => id === 'lifepo4' ? window.downloadLiFePO4TechnicalNotice() : window.downloadEmbeddedNotice(id) };
}

function openQuickView(id){
  const p = gbProduct(id), c = p.card;
  const images = gbImagesFor(id).map(src => ({src, alt:p.title}));
  const html = `
    <header class="m-head">
      <p class="m-kicker">${escapeHTML(GB_FAMILY_LABEL[c.family] || 'GreenBridge')}${c.isNew ? ' · Nouveauté' : ''}</p>
      <h2 id="modalTitle">${escapeHTML(p.title)}</h2>
      <p class="m-sub">${escapeHTML(c.pitch || p.subtitle)}</p>
    </header>
    ${gbCarouselHTML(p.title)}
    <div class="m-price"><span><small>À partir de</small> <b>${gbPrice(c.price)}</b></span><span class="m-use"><i class="fa-solid fa-bolt" aria-hidden="true"></i>${escapeHTML(c.use)}</span></div>
    <div class="m-body">
      <ul class="m-specs">${p.specs.slice(0, 6).map(x => `<li>${escapeHTML(x)}</li>`).join('')}</ul>
    </div>
    <div class="m-actions">
      <button class="btn btn--wa" type="button" data-order="${escapeHTML(c.soldOut ? c.name + ' — en rupture : je souhaite être informé du réassort' : c.order)}"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i>${c.soldOut ? 'Être informé du réassort' : 'Commander sur WhatsApp'}</button>
      <a class="btn btn--line" href="${gbFicheUrl(id)}">Fiche technique complète <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </div>`;
  openModal(html);
  startModalCarousel(images);
}
function openTechModal(i){ openQuickView('m' + i); }
function openNewProductModal(key){ openQuickView(key); }
window.openNewProductModal = openNewProductModal;

function openPackModal(){
  const packImages = [
    {src:GB_IMAGES.pack[0], alt:'Pack 2,5 kWh, vue 1'},
    {src:GB_IMAGES.pack[1], alt:'Pack 2,5 kWh, vue 2'},
    {src:GB_IMAGES.pack[2], alt:'Pack 2,5 kWh, vue 3'}
  ];
  const html = `
    <header class="m-head">
      <p class="m-kicker">Projet en développement</p>
      <h2 id="modalTitle">Pack modulaire 2,5 kWh</h2>
      <p class="m-sub">Stockage LiFePO₄ pour le médical, les PME et l’agriculture</p>
    </header>
    ${gbCarouselHTML('Pack 2,5 kWh')}
    <div class="m-body">
      <p>Le pack <strong>2,5 kWh</strong> est en cours de développement pour le Sénégal et l’Afrique de l’Ouest. Basé sur des cellules <strong>LiFePO₄ prismatiques</strong>, il est modulaire, réparable localement et adapté au stockage médical, aux PME, à l’agriculture et à l’élevage.</p>
      <h3>Usages visés</h3>
      <ul class="m-specs">
        <li>Recharge par prise secteur et par panneau solaire</li>
        <li>Alimente réfrigérateurs médicaux, pompes, éclairage et appareils essentiels</li>
        <li>Déploiement simple hors réseau</li>
        <li>Optimisé pour les usages agricoles et les petites industries</li>
      </ul>
    </div>
    <div class="m-actions">
      <button class="btn btn--wa" type="button" onclick="openProductWhatsApp('Projet pack modulaire 2,5 kWh')"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i>Suivre le projet</button>
      <a class="btn btn--line" href="notices/notice-projet-pack-modulaire-25kwh.pdf" download><i class="fa-regular fa-file-pdf" aria-hidden="true"></i>Notice PDF</a>
    </div>`;
  openModal(html);
  startModalCarousel(packImages);
}

/* ---------- WhatsApp ---------- */
function openProductWhatsApp(productName){
  pendingOrderProduct = productName || '';
  openCountryModal();
}
function openCountryModal(){
  const subject = pendingCustomMessage ? '<p class="m-sub">Votre demande de devis est prête : il ne reste qu’à l’envoyer.</p>' : pendingOrderProduct ? `<p class="m-sub">Demande : ${escapeHTML(pendingOrderProduct)}</p>` : '<p class="m-sub">Prix, disponibilité et conseil technique.</p>';
  const html = `
    <header class="m-head">
      <p class="m-kicker">WhatsApp</p>
      <h2 id="modalTitle">Où souhaitez-vous être servi ?</h2>
      ${subject}
    </header>
    <div class="wa-choice">
      <button class="wa-country" type="button" onclick="sendWhatsApp('coteivoire')">
        <img src="https://flagcdn.com/w80/ci.png" alt="" width="40" height="28">
        <span><strong>Côte d’Ivoire</strong><small>Commande et livraison en Côte d’Ivoire</small></span>
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
      </button>
      <button class="wa-country" type="button" onclick="sendWhatsApp('senegal')">
        <img src="https://flagcdn.com/w80/sn.png" alt="" width="40" height="28">
        <span><strong>Sénégal</strong><small>Commande et livraison au Sénégal</small></span>
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
      </button>
    </div>
    <p class="m-note">Votre message est préparé automatiquement, il ne reste qu’à l’envoyer.</p>`;
  openModal(html);
}
let pendingCustomMessage = '';
function sendWhatsApp(country){
  const number = GB_WHATSAPP[country] || GB_WHATSAPP.senegal;
  const countryLabel = country === 'coteivoire' ? 'la Côte d’Ivoire' : 'le Sénégal';
  const productText = pendingOrderProduct ? ` concernant ${pendingOrderProduct}` : '';
  const message = pendingCustomMessage
    ? pendingCustomMessage.replace('{PAYS}', countryLabel)
    : `Bonjour, je souhaite obtenir des informations${productText} pour ${countryLabel}. Merci de me communiquer le prix et les disponibilités.`;
  pendingOrderProduct = ''; pendingCustomMessage = '';
  closeModal();
  window.open(`https://wa.me/${number}?text=` + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
}

/* Compatibilité avec d’anciens liens */
function selectModel(i){ openTechModal(i); }
function openSurveyLink(){ window.open(SURVEY_URL, '_blank', 'noopener,noreferrer'); return false; }

/* ---------- Délégation des clics ---------- */
document.addEventListener('click', e => {
  const open = e.target.closest('[data-open]');
  if(open){
    e.preventDefault();
    openQuickView(open.dataset.open);
    return;
  }
  const pdf = e.target.closest('[data-pdf]');
  if(pdf){
    e.preventDefault();
    gbProduct(pdf.dataset.pdf).pdf();
    return;
  }
  const order = e.target.closest('[data-order]');
  if(order){ e.preventDefault(); openProductWhatsApp(order.dataset.order); return; }
  if(e.target.closest('[data-pack]')){ e.preventDefault(); openPackModal(); }
});

modalOverlay.addEventListener('click', e => { if(e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && modalOverlay.getAttribute('aria-hidden') === 'false') closeModal();
});

/* ---------- Menu mobile ---------- */
(function(){
  const menu = document.getElementById('gbMobileMenu');
  const openBtn = document.getElementById('gbMenuToggle');
  const closeBtn = document.getElementById('gbMobileClose');
  if(!menu || !openBtn) return;
  const setOpen = open => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
    if(open && closeBtn) closeBtn.focus({preventScroll:true});
  };
  openBtn.addEventListener('click', () => setOpen(true));
  if(closeBtn) closeBtn.addEventListener('click', () => { setOpen(false); openBtn.focus(); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false); });
})();

/* ---------- En-tête au défilement ---------- */
(function(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

/* ---------- Vitrine d’accueil : la jauge de charge fait défiler les gammes ---------- */
(function(){
  const stage = document.querySelector('[data-gb-stage]');
  if(!stage) return;
  const slides = Array.from(stage.querySelectorAll('.stage__slide'));
  const tabs = Array.from(stage.querySelectorAll('.stage__tab'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  const show = i => {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, n) => { s.classList.toggle('is-active', n === current); s.setAttribute('aria-hidden', String(n !== current)); s.querySelectorAll('a').forEach(a => a.tabIndex = n === current ? 0 : -1); });
    tabs.forEach((t, n) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', String(n === current)); });
    void stage.offsetWidth; /* relance l’animation de la jauge */
    tabs[current].classList.add('is-active');
  };
  tabs.forEach((t, n) => {
    t.addEventListener('click', () => show(n));
    const bar = t.querySelector('.stage__gauge');
    if(bar) bar.addEventListener('animationend', () => { if(n === current) show(current + 1); });
  });
  if(reduce) stage.classList.add('is-static');
  stage.addEventListener('mouseenter', () => stage.classList.add('is-paused'));
  stage.addEventListener('mouseleave', () => stage.classList.remove('is-paused'));
  stage.addEventListener('focusin', () => stage.classList.add('is-paused'));
  stage.addEventListener('focusout', () => stage.classList.remove('is-paused'));
  document.addEventListener('visibilitychange', () => stage.classList.toggle('is-hidden-tab', document.hidden));
  show(0);
})();


/* Outils partagés du configurateur */
function gbHexMix(hex, target, t){
  const n = parseInt(hex.replace('#',''), 16);
  const c = [n >> 16 & 255, n >> 8 & 255, n & 255], tt = target === 'w' ? 255 : 0;
  return '#' + c.map(v => Math.round(v + (tt - v) * t).toString(16).padStart(2, '0')).join('');
}
function gbIsLight(hex){
  const n = parseInt(hex.replace('#',''), 16);
  return (0.299 * (n >> 16 & 255) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255)) > 150;
}
const gbProImgCache = {};
function gbProImg(src){
  if(!gbProImgCache[src]) gbProImgCache[src] = new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  return gbProImgCache[src];
}
function gbCanvas(w, h){ const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
function gbTint(src, color){
  const c = gbCanvas(src.width, src.height), x = c.getContext('2d');
  x.drawImage(src, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = color; x.fillRect(0, 0, c.width, c.height);
  return c;
}

/* Logo + nom + slogan, en une seule couleur, centrés dans la zone */
function gbBrandMask(cfg, logo, zw, zh){
  const c = gbCanvas(zw, zh), x = c.getContext('2d');
  const family = getComputedStyle(document.body).fontFamily || 'Arial, sans-serif';
  const name = (cfg.brand || 'VOTRE MARQUE').slice(0, 24), slogan = (cfg.slogan || '').slice(0, 40);
  let size = zh * (cfg.slogan ? 0.2 : 0.24);
  x.font = `800 ${size}px ${family}`;
  while(size > 12 && x.measureText(name).width > zw * 0.88){ size -= 1; x.font = `800 ${size}px ${family}`; }
  const sSize = Math.max(11, size * 0.36);
  let lw = 0, lh = 0;
  if(logo){ const k = Math.min(zw * 0.5 / logo.width, zh * 0.38 / logo.height); lw = logo.width * k; lh = logo.height * k; }
  const gap = size * 0.35, total = lh + (lh ? gap : 0) + size + (slogan ? sSize * 0.6 + sSize : 0);
  let y = (zh - total) / 2;
  if(logo){
    const t = gbCanvas(lw, lh); const tx = t.getContext('2d'); tx.drawImage(logo, 0, 0, lw, lh);
    tx.globalCompositeOperation = 'source-in'; tx.fillStyle = '#000'; tx.fillRect(0, 0, lw, lh);
    x.drawImage(t, (zw - lw) / 2, y); y += lh + gap;
  }
  x.fillStyle = '#000'; x.textAlign = 'center'; x.textBaseline = 'top';
  if('letterSpacing' in x) x.letterSpacing = (size * 0.03).toFixed(1) + 'px';
  x.font = `800 ${size}px ${family}`; x.fillText(name, zw / 2, y);
  if(slogan){
    if('letterSpacing' in x) x.letterSpacing = '0.5px';
    x.font = `600 ${sSize}px ${family}`; x.fillText(slogan, zw / 2, y + size + sSize * 0.6);
  }
  return c;
}

/* Composition finale de la maquette */
/* Logo : lecture locale + fond blanc rendu transparent */
function gbReadLogo(file){
  return new Promise((resolve, reject) => {
    if(!file || !/^image\//.test(file.type)) return reject(new Error('format'));
    if(file.size > 6 * 1024 * 1024) return reject(new Error('taille'));
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('lecture'));
    fr.onload = () => {
      if(file.type === 'image/svg+xml') return resolve(fr.result);
      const img = new Image();
      img.onload = () => {
        const max = 600, k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        const g = c.getContext('2d'); g.drawImage(img, 0, 0, c.width, c.height);
        try{
          const d = g.getImageData(0, 0, c.width, c.height), p = d.data;
          const corner = i => p[i] > 235 && p[i + 1] > 235 && p[i + 2] > 235 && p[i + 3] > 240;
          const w = c.width, h = c.height;
          const opaqueWhiteBg = corner(0) && corner((w - 1) * 4) && corner(((h - 1) * w) * 4) && corner(((h - 1) * w + w - 1) * 4);
          if(opaqueWhiteBg){
            for(let i = 0; i < p.length; i += 4){
              const m = Math.min(p[i], p[i + 1], p[i + 2]);
              if(m > 238) p[i + 3] = 0; else if(m > 215) p[i + 3] = Math.round(p[i + 3] * (238 - m) / 23);
            }
            g.putImageData(d, 0, 0);
          }
        }catch(e){ /* image protégée : on garde telle quelle */ }
        resolve(c.toDataURL('image/png'));
      };
      img.onerror = () => reject(new Error('image'));
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}

/* Logos d’exemple (fictifs) */
function gbMonogram(letters, color, shape){
  const s = shape === 'leaf'
    ? `<path d="M60 8C30 18 12 40 14 70c2 26 22 42 46 42s44-16 46-42C108 40 90 18 60 8z" fill="${color}"/><path d="M60 26v80" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`
    : shape === 'sun'
    ? `<circle cx="60" cy="60" r="30" fill="${color}"/>${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<line x1="${60+Math.cos(a)*40}" y1="${60+Math.sin(a)*40}" x2="${60+Math.cos(a)*54}" y2="${60+Math.sin(a)*54}" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`}).join('')}`
    : shape === 'ring'
    ? `<circle cx="60" cy="60" r="42" fill="none" stroke="${color}" stroke-width="12"/><circle cx="60" cy="60" r="14" fill="${color}"/>`
    : shape === 'cross'
    ? `<path d="M46 12h28v34h34v28H74v34H46V74H12V46h34z" fill="${color}"/>`
    : shape === 'letter'
    ? `<text x="60" y="88" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="96" fill="${color}">${letters}</text>`
    : `<rect x="10" y="10" width="100" height="100" rx="26" fill="${color}"/><text x="60" y="76" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="46" fill="#fff">${letters}</text>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${s}</svg>`);
}

/* =====================================================================
   OFFRE ENTREPRISES : configurateur 3D de coques personnalisées
   4 types de produit x 4 formes. Rendu WebGL (three.js), rotation
   au doigt ou à la souris, logo appliqué sur la face avant.
   Dimensions en millimètres (largeur w, hauteur h, épaisseur d).
   ===================================================================== */
const GB_SHAPES = {
  powerbank:{ label:'Powerbank', icon:'fa-mobile-screen-button', models:[
    { id:'galet',   name:'Galet',   desc:'Formes douces, tient dans la main', w:72,  h:118, d:24, r:24, bevel:7,   screen:'round' },
    { id:'carre',   name:'Carré',   desc:'Compact et généreux',               w:92,  h:92,  d:26, r:16, bevel:4,   screen:'round' },
    { id:'slim',    name:'Slim',    desc:'Très fin, se glisse partout',        w:70,  h:142, d:15, r:11, bevel:3,   screen:'bar' },
    { id:'capsule', name:'Capsule', desc:'Silhouette arrondie et moderne',     w:62,  h:132, d:28, r:31, bevel:6,   screen:'round' }
  ]},
  laptop:{ label:'Powerbank ordinateur', icon:'fa-laptop', models:[
    { id:'plate',    name:'Plate',    desc:'Format fin, se glisse dans la sacoche', w:112, h:166, d:19, r:11, bevel:3, screen:'bar' },
    { id:'compacte', name:'Compacte', desc:'Format bloc, écran de puissance',        w:156, h:62,  d:54, r:13, bevel:5, screen:'side' }
  ]},
  ups:{ label:'Mini-UPS Wi-Fi', icon:'fa-wifi', models:[
    { id:'plat',  name:'Plat',  desc:'Se pose sous la box',       w:161, h:105, d:34, r:9,  bevel:3, screen:'leds', lay:true },
    { id:'cube',  name:'Cube',  desc:'Compact et original',       w:104, h:104, d:104,r:16, bevel:5, screen:'leds' },
    { id:'mural', name:'Mural', desc:'Se fixe au mur',             w:150, h:112, d:26, r:8,  bevel:3, screen:'leds' }
  ]},
  battery:{ label:'Batterie LiFePO₄', icon:'fa-car-battery', models:[
    { id:'bloc',   name:'Bloc',             desc:'Format standard 12 V',        w:330, h:215, d:172, r:10, bevel:4, screen:'battery' },
    { id:'bas',    name:'Bas profil',       desc:'Se glisse sous un meuble',    w:400, h:150, d:180, r:10, bevel:4, screen:'battery' },
    { id:'coffre', name:'Coffre à poignée', desc:'Transportable',               w:300, h:230, d:200, r:22, bevel:6, screen:'battery', handle:true }
  ]}
};
const GB_PRO = {
  colors:{
    noir:  { name:'Noir',             hex:'#232625' },
    blanc: { name:'Blanc',            hex:'#ECEBE6' },
    vert:  { name:'Vert GreenBridge', hex:'#145A3C' },
    nuit:  { name:'Bleu nuit',        hex:'#22365F' },
    rouge: { name:'Rouge',            hex:'#A2232C' },
    sable: { name:'Sable',            hex:'#CDB98F' }
  },
  finishes:{ mat:{ name:'Mat', rough:0.74, coat:0 }, satin:{ name:'Satiné', rough:0.5, coat:0.12 } },
  markings:{
    relief:  { name:'Logo en relief', hint:'Il ressort de la coque, on le sent au toucher.' },
    bicolore:{ name:'Logo bicolore',  hint:'Intégré à la coque, dans une seconde couleur.' },
    creux:   { name:'Logo en creux',  hint:'Gravé dans la matière, discret et élégant.' }
  },
  inks:{ blanc:'#F4F4F0', noir:'#161616', or:'#C9A646', vert:'#1E9E5A', rouge:'#C0303A' }
};
function gbShape(cfg){
  const t = GB_SHAPES[cfg.type] || GB_SHAPES.powerbank;
  return t.models.find(m => m.id === cfg.shape) || t.models[0];
}

/* ---------- textures ---------- */
function gbScreenTexture(kind, text){
  const c = gbCanvas(512, kind === 'round' ? 512 : 256), x = c.getContext('2d');
  x.fillStyle = '#07090B'; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = '#5FD4FF'; x.shadowColor = '#3CC8FF'; x.shadowBlur = 18;
  x.font = `700 ${kind === 'round' ? 150 : 120}px Archivo, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text || (kind === 'panel' ? '100W' : '100%'), c.width / 2, c.height / 2 + 6);
  return c;
}
function gbLogoTexture(cfg, logo, bodyHex, aspect){
  const W = 1024, H = Math.round(W / aspect);
  const mask = gbBrandMask(cfg, logo, W, H);
  const c = gbCanvas(W, H), x = c.getContext('2d');
  const light = gbIsLight(bodyHex), d = Math.max(3, H * 0.012);
  let ink;
  if(cfg.marking === 'relief') ink = gbHexMix(bodyHex, light ? 'b' : 'w', light ? 0.1 : 0.3);
  else if(cfg.marking === 'creux') ink = light ? gbHexMix(bodyHex, 'b', 0.34) : gbHexMix(bodyHex, 'w', 0.1);
  else ink = GB_PRO.inks[cfg.ink] || (light ? GB_PRO.inks.noir : GB_PRO.inks.blanc);
  const put = (img, dx, dy, a, blur) => { x.save(); x.globalAlpha = a; if(blur && 'filter' in x) x.filter = `blur(${blur}px)`; x.drawImage(img, dx, dy); x.restore(); };
  const black = gbTint(mask, '#000'), white = gbTint(mask, '#fff'), main = gbTint(mask, ink);
  if(cfg.marking === 'relief'){ put(black, d, d * 1.4, light ? 0.35 : 0.7, d); put(white, -d * 0.6, -d * 0.6, light ? 0.8 : 0.5, 1); put(main, 0, 0, 1, 0); }
  else if(cfg.marking === 'creux'){ put(white, d * 0.5, d * 0.7, light ? 0.8 : 0.45, 1); put(main, 0, 0, 1, 0); put(black, -d * 0.4, -d * 0.5, light ? 0.35 : 0.6, d * 0.6); }
  else { put(black, d * 0.4, d * 0.5, 0.3, d * 0.6); put(main, 0, 0, 1, 0); }
  return c;
}


/* Puissance et connectique proposées pour chaque type de produit */
const GB_CONNECT = {
  powerbank:{
    power:{ label:'Puissance', def:'rapide', options:{
      standard:{ name:'Standard 10 W', hint:'Ports à languette noire' },
      rapide:  { name:'Rapide 22,5 W', hint:'Ports à languette orange' } } },
    ports:{ label:'Connectique', face:'top', def:['usbc','usba'], options:{ usbc:'USB-C', usba:'USB-A', micro:'Micro-USB', lightning:'Lightning (iPhone)' } }
  },
  laptop:{
    power:{ label:'Puissance', def:'p100', options:{
      p65: { name:'65 W',  hint:'Ultrabooks et tablettes' },
      p100:{ name:'100 W', hint:'Ordinateurs jusqu’à 16 pouces' } } },
    ports:{ label:'Connectique', face:'top', def:['usbc','usbc2','usba'], options:{ usbc:'USB-C PD', usbc2:'2ᵉ USB-C PD', usba:'USB-A', dc:'Sortie DC ordinateur' } }
  },
  ups:{
    power:null,
    ports:{ label:'Sorties', face:'side', def:['dc12','dc9','usb5'], options:{ dc12:'DC 12 V', dc9:'DC 9 V', usb5:'USB 5 V', poe:'PoE 24 V', lan:'Port LAN' } }
  },
  battery:{
    power:null,
    ports:{ label:'Connectique', face:'side', def:['bornes','usbc'], options:{ bornes:'Bornes M8', anderson:'Prise Anderson', usbc:'USB-C', usba:'USB-A', cig:'Allume-cigare 12 V' } }
  }
};
const GB_ORANGE = 0xF27A1A;

/* Un port, face vers +Z, dimensions réelles en mm */
function gbPort(kind, fast){
  const g = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color:0xB7BCC2, metalness:0.85, roughness:0.32 });
  const hole = new THREE.MeshBasicMaterial({ color:0x050505 });
  const tongueMat = new THREE.MeshBasicMaterial({ color:new THREE.Color(fast ? GB_ORANGE : 0x1a1a1a).convertSRGBToLinear() });
  const flat = (w, h, r, mat, z) => {
    const geo = new THREE.ShapeGeometry(gbRoundedShape(w, h, r), 8); const m = new THREE.Mesh(geo, mat);
    m.position.z = z || 0; return m;
  };
  const circ = (r, mat, z) => { const m = new THREE.Mesh(new THREE.CircleGeometry(r, 32), mat); m.position.z = z || 0; return m; };
  let w = 10, h = 5, label = '';
  if(kind === 'usbc' || kind === 'usbc2'){ w = 9; h = 3.3; g.add(flat(9, 3.3, 1.6, metal, 0), flat(8.1, 2.5, 1.2, hole, 0.05), flat(5.8, 0.75, 0.3, tongueMat, 0.1)); label = 'USB-C'; }
  else if(kind === 'usba' || kind === 'usb5'){ w = 12.6; h = 5; g.add(flat(12.6, 5, 0.5, metal, 0), flat(11.8, 4.3, 0.3, hole, 0.05)); const t = flat(10.2, 1.9, 0.2, tongueMat, 0.1); t.position.y = 0.9; g.add(t); label = kind === 'usb5' ? 'USB 5V' : 'USB-A'; }
  else if(kind === 'micro'){ w = 7.6; h = 2.8; g.add(flat(7.6, 2.8, 0.9, metal, 0), flat(6.9, 2.1, 0.7, hole, 0.05)); label = 'Micro'; }
  else if(kind === 'lightning'){ w = 8; h = 2.6; g.add(flat(8, 2.6, 1.3, hole, 0), flat(6.4, 0.9, 0.4, new THREE.MeshStandardMaterial({ color:0xd8d8d8, metalness:0.6, roughness:0.3 }), 0.06)); label = 'Lightning'; }
  else if(kind === 'dc' || kind === 'dc12' || kind === 'dc9'){ w = 8; h = 8; g.add(circ(4, metal, 0), circ(3.2, hole, 0.05), circ(0.9, metal, 0.1)); label = kind === 'dc12' ? '12V' : kind === 'dc9' ? '9V' : 'DC'; }
  else if(kind === 'lan' || kind === 'poe'){ w = 13; h = 11; g.add(flat(13, 11, 0.6, hole, 0)); const tab = flat(5, 2, 0.2, hole, 0.02); tab.position.y = -6; g.add(tab);
    const gold = new THREE.MeshStandardMaterial({ color:0xC9A646, metalness:0.9, roughness:0.3 });
    for(let i = 0; i < 8; i++){ const c = flat(0.6, 2.2, 0.1, gold, 0.05); c.position.set(-3.5 + i, 3.4, 0); g.add(c); }
    label = kind === 'poe' ? 'PoE' : 'LAN'; }
  else if(kind === 'anderson'){ w = 20; h = 10; const red = new THREE.MeshStandardMaterial({ color:new THREE.Color(0xB3121C).convertSRGBToLinear(), roughness:0.55 }), blk = new THREE.MeshStandardMaterial({ color:0x111111, roughness:0.45 });
    const a = new THREE.Mesh(new THREE.BoxGeometry(9.6, 10, 5), red); a.position.set(-5, 0, 2.5); const b = new THREE.Mesh(new THREE.BoxGeometry(9.6, 10, 5), blk); b.position.set(5, 0, 2.5);
    g.add(a, b); [-5, 5].forEach(x => { const s = flat(4, 3, 0.4, hole, 5.05); s.position.x = x; g.add(s); }); label = 'Anderson'; }
  else if(kind === 'cig'){ w = 26; h = 26; g.add(circ(13, metal, 0), circ(11.4, hole, 0.05), circ(2.6, metal, 0.1)); label = '12V'; }
  g.userData = { w, h, label };
  return g;
}
function gbLabelMesh(text, colorHex, mmH){
  const c = gbCanvas(256, 64), x = c.getContext('2d');
  x.fillStyle = colorHex; x.font = '700 40px Archivo, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, 128, 34);
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding;
  return new THREE.Mesh(new THREE.PlaneGeometry(mmH * 4, mmH), new THREE.MeshBasicMaterial({ map:t, transparent:true, polygonOffset:true, polygonOffsetFactor:-2 }));
}

/* ---------- géométrie ---------- */
function gbRoundedShape(w, h, r){
  r = Math.min(r, w / 2, h / 2);
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
function gbSmoothNormals(geo){
  const pos = geo.attributes.position, n = pos.count, acc = new Map(), keys = new Array(n);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), cb = new THREE.Vector3(), ab = new THREE.Vector3();
  for(let i = 0; i < n; i++) keys[i] = `${Math.round(pos.getX(i) * 100)},${Math.round(pos.getY(i) * 100)},${Math.round(pos.getZ(i) * 100)}`;
  for(let i = 0; i < n; i += 3){
    a.fromBufferAttribute(pos, i); b.fromBufferAttribute(pos, i + 1); c.fromBufferAttribute(pos, i + 2);
    cb.subVectors(c, b); ab.subVectors(a, b); cb.cross(ab);              /* normale pondérée par l’aire */
    for(let k = 0; k < 3; k++){ const key = keys[i + k]; const v = acc.get(key); if(v) v.add(cb); else acc.set(key, cb.clone()); }
  }
  const nrm = new Float32Array(n * 3);
  for(let i = 0; i < n; i++){ const v = acc.get(keys[i]).clone().normalize(); nrm[i * 3] = v.x; nrm[i * 3 + 1] = v.y; nrm[i * 3 + 2] = v.z; }
  geo.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
}
function gbBody(def, mat){
  const b = def.bevel;
  const geo = new THREE.ExtrudeGeometry(gbRoundedShape(def.w - 2 * b, def.h - 2 * b, Math.max(1, def.r - b)), {
    depth: def.d - 2 * b, bevelEnabled:true, bevelThickness:b, bevelSize:b, bevelSegments:14, curveSegments:32
  });
  geo.translate(0, 0, -(def.d - 2 * b) / 2);
  gbSmoothNormals(geo);
  const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true;
  return m;
}
function gbTexMat(canvas, opts){
  const t = new THREE.CanvasTexture(canvas); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
  return new THREE.MeshStandardMaterial(Object.assign({ map:t, transparent:true, roughness:0.6, polygonOffset:true, polygonOffsetFactor:-2 }, opts || {}));
}

function gbScreenMat(kind, text){
  const t = new THREE.CanvasTexture(gbScreenTexture(kind, text)); t.encoding = THREE.sRGBEncoding;
  return new THREE.MeshBasicMaterial({ map:t, polygonOffset:true, polygonOffsetFactor:-2 });
}
/* Construit le produit complet. Face avant = +Z. */
function gbBuildProduct(cfg, logo){
  const def = gbShape(cfg), g = new THREE.Group();
  const bodyHex = (GB_PRO.colors[cfg.color] || GB_PRO.colors.noir).hex;
  const fin = GB_PRO.finishes[cfg.finish] || GB_PRO.finishes.mat;
  const bodyMat = new THREE.MeshPhongMaterial({ color:new THREE.Color(bodyHex).convertSRGBToLinear(), specular:new THREE.Color(cfg.finish === 'satin' ? 0x3a3a3a : 0x141414), shininess:cfg.finish === 'satin' ? 38 : 10 });
  g.add(gbBody(def, bodyMat));
  const fz = def.d / 2 + 0.05, dark = new THREE.MeshStandardMaterial({ color:0x0d0f10, roughness:0.45 });
  const W = def.w, H = def.h;
  const conn = GB_CONNECT[cfg.type] || GB_CONNECT.powerbank;
  const ports = (cfg.ports && cfg.ports.length ? cfg.ports : conn.ports.def).filter(p => conn.ports.options[p]);
  const fast = cfg.type === 'powerbank' ? cfg.power !== 'standard' : cfg.type === 'laptop';
  const screenText = cfg.type === 'laptop' ? (cfg.power === 'p65' ? '65W' : '100W') : (cfg.type === 'powerbank' && cfg.power === 'standard' ? '10W' : '100%');
  let logoTop = H * 0.18, logoBottom = -H * 0.4, logoX = 0, logoW = null;   /* zone du logo sur la face avant (en Y) */

  /* écran / indicateurs */
  if(def.screen === 'round'){
    const r = Math.min(W, H) * 0.15, cy = H * 0.27;
    const disc = new THREE.Mesh(new THREE.CircleGeometry(r, 48), gbScreenMat('round', cfg.type === 'powerbank' && cfg.power === 'standard' ? '10W' : '100%'));
    disc.position.set(0, cy, fz); g.add(disc); logoTop = cy - r - H * 0.06;
  } else if(def.screen === 'bar' || def.screen === 'panel'){
    const sw = W * (def.screen === 'panel' ? 0.66 : 0.5), sh = def.screen === 'panel' ? H * 0.2 : H * 0.075, cy = H * (def.screen === 'panel' ? 0.26 : 0.32);
    const geo = new THREE.ShapeGeometry(gbRoundedShape(sw, sh, Math.min(sw, sh) * 0.25));
    const mat = gbScreenMat(def.screen, screenText);
    const uv = geo.attributes.uv; for(let i = 0; i < uv.count; i++){ uv.setXY(i, uv.getX(i) / sw + 0.5, uv.getY(i) / sh + 0.5); }
    const m = new THREE.Mesh(geo, mat); m.position.set(0, cy, fz); g.add(m); logoTop = cy - sh / 2 - H * 0.06;
  } else if(def.screen === 'side'){
    const sw = W * 0.28, sh = H * 0.56, cx = -W * 0.3;
    const geo = new THREE.ShapeGeometry(gbRoundedShape(sw, sh, sh * 0.18));
    const uv = geo.attributes.uv; for(let i = 0; i < uv.count; i++){ uv.setXY(i, uv.getX(i) / sw + 0.5, uv.getY(i) / sh + 0.5); }
    const m = new THREE.Mesh(geo, gbScreenMat('bar', screenText)); m.position.set(cx, 0, fz); g.add(m);
    logoTop = H * 0.36; logoBottom = -H * 0.36; logoX = W * 0.17; logoW = W * 0.56;
  } else if(def.screen === 'leds'){
    const y = H * 0.33, sp = Math.min(W, 110) * 0.06;
    for(let i = 0; i < 4; i++){
      const led = new THREE.Mesh(new THREE.CircleGeometry(Math.max(1.3, W * 0.009), 16), new THREE.MeshBasicMaterial({ color:i === 0 ? 0x45E07A : 0x2C9B55 }));
      led.position.set(-W * 0.3 + i * sp, y, fz); g.add(led);
    }
    const ring = new THREE.Mesh(new THREE.RingGeometry(W * 0.028, W * 0.04, 32), new THREE.MeshBasicMaterial({ color:0xE0303A }));
    ring.position.set(W * 0.32, y, fz); g.add(ring);
    logoTop = y - H * 0.1;
  } else if(def.screen === 'battery' || def.screen === 'rack'){
    /* bornes sur le dessus, petit afficheur */
    const gold = new THREE.MeshStandardMaterial({ color:0xC79A3B, metalness:0.9, roughness:0.3 });
    if(def.screen === 'battery'){
      if(ports.includes('bornes')) [-1, 1].forEach(sx => {
        const base = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.045, W * 0.05, 8, 6), gold);
        base.position.set(sx * W * 0.34, H / 2 + 4, def.d * 0.12); base.castShadow = true; g.add(base);
        const stud = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.016, W * 0.016, 16, 16), gold);
        stud.position.set(sx * W * 0.34, H / 2 + 14, def.d * 0.12); g.add(stud);
      });
      const red = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.05, W * 0.016), new THREE.MeshBasicMaterial({ color:0xD62B2B }));
      red.rotation.x = -Math.PI / 2; red.position.set(-W * 0.45, H / 2 + 0.3, def.d * 0.12); g.add(red);
      const disp = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.26, def.d * 0.22), gbScreenMat('bar'));
      disp.rotation.x = -Math.PI / 2; disp.position.set(0, H / 2 + 0.4, -def.d * 0.1); g.add(disp);
      logoTop = H * 0.32; logoBottom = -H * 0.36;
    } else {
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.2, H * 0.24), gbScreenMat('bar'));
      panel.position.set(W * 0.33, H * 0.18, fz); g.add(panel);
      [-1, 1].forEach(sx => {
        const ear = new THREE.Mesh(new THREE.BoxGeometry(18, H * 0.9, 4), bodyMat);
        ear.position.set(sx * (W / 2 + 9), 0, def.d / 2 - 2); ear.castShadow = true; g.add(ear);
        [-1, 1].forEach(sy => { const hole = new THREE.Mesh(new THREE.CircleGeometry(3.2, 16), dark); hole.position.set(sx * (W / 2 + 9), sy * H * 0.3, def.d / 2 + 0.2); g.add(hole); });
      });
      const gp = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 7, 24), gold); gp.rotation.x = Math.PI / 2; gp.position.set(W * 0.33, -H * 0.2, fz + 3); g.add(gp);
      const gm = gp.clone(); gm.position.x = W * 0.22; g.add(gm);
      logoTop = H * 0.32; logoBottom = -H * 0.36; logoX = -W * 0.12; logoW = W * 0.55;
    }
  }
  if(def.handle){
    const h = new THREE.Mesh(new THREE.TorusGeometry(W * 0.2, 7, 14, 40, Math.PI), new THREE.MeshPhysicalMaterial({ color:0x1b1d1c, roughness:0.5 }));
    h.position.set(0, H / 2, 0); h.castShadow = true; g.add(h);
  }
  /* connectique : ports réels, sur la tranche du haut ou sur le côté */
  const list = ports.filter(p => p !== 'bornes').map(p => gbPort(p, fast && !['micro','lightning','dc'].includes(p)));
  const portsGroup = new THREE.Group();
  if(list.length){
    const gap = cfg.type === 'battery' ? 14 : cfg.type === 'ups' ? 7 : 4.5;
    const total = list.reduce((t, p) => t + p.userData.w, 0) + gap * (list.length - 1);
    let x = -total / 2;
    const labelColor = gbIsLight(bodyHex) ? '#2b2b2b' : '#e9e9e4';
    list.forEach(p => {
      p.position.x = x + p.userData.w / 2; x += p.userData.w + gap; portsGroup.add(p);
      if(conn.ports.face === 'side'){
        const lb = gbLabelMesh(p.userData.label, labelColor, cfg.type === 'battery' ? 6 : 3.4);
        lb.position.set(p.position.x, -p.userData.h / 2 - (cfg.type === 'battery' ? 6 : 3.6), 0.1); portsGroup.add(lb);
      }
    });
    if(conn.ports.face === 'top'){
      /* tranche supérieure : les ports regardent vers le haut */
      const fit = Math.min(1, (W - 2 * def.bevel - 6) / total);
      portsGroup.scale.setScalar(fit);
      portsGroup.rotation.x = -Math.PI / 2; portsGroup.position.set(0, H / 2 + 0.12, 0);
    } else {
      /* côté droit : les ports regardent vers la droite */
      const fit = Math.min(1, (def.d - 2 * def.bevel - 6) / (total + 6));
      portsGroup.scale.setScalar(fit);
      portsGroup.rotation.y = Math.PI / 2; portsGroup.position.set(W / 2 + 0.12, cfg.type === 'battery' ? -H * 0.05 : -H * 0.08, 0);
    }
    g.add(portsGroup);
  }
  /* logo + nom */
  const zoneW = logoW || (cfg.type === 'battery' ? W * 0.82 : W * 0.8), zoneH = Math.max(10, logoTop - logoBottom);
  const tex = gbLogoTexture(cfg, logo, bodyHex, zoneW / zoneH);
  const lm = new THREE.Mesh(new THREE.PlaneGeometry(zoneW, zoneH), gbTexMat(tex, { roughness:fin.rough }));
  lm.position.set(logoX, (logoTop + logoBottom) / 2, fz + 0.06); g.add(lm);
  g.userData = { def, logoY:(logoTop + logoBottom) / 2, logoX:lm.position.x, zoneW, zoneH, logoMesh:lm, portsGroup:list.length ? portsGroup : null, portsFace:conn.ports.face };
  /* orientation de présentation */
  if(def.lay){ g.rotation.x = -1.05; }
  return g;
}

/* ---------- moteur de rendu ---------- */
function gbCreateStage(canvas, opts){
  opts = opts || {};
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, preserveDrawingBuffer:!!opts.snapshot });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.84;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(28, 1, 1, 6000);
  scene.add(new THREE.HemisphereLight(0xDDE6E0, 0x9aa59d, 0.38));
  const key = new THREE.DirectionalLight(0xffffff, 1.55); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.radius = 6; scene.add(key, key.target);
  const fill = new THREE.DirectionalLight(0xEAF2FF, 0.85); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.9); scene.add(rim);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), new THREE.ShadowMaterial({ opacity:0.15 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  const pivot = new THREE.Group(); scene.add(pivot);
  let product = null, yaw = -0.42, pitch = 0.12, view = 'all';

  const fit = () => {
    if(!product) return;
    const box = new THREE.Box3().setFromObject(product), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    product.position.sub(c); product.position.y += size.y / 2;           /* posé sur le sol */
    const R = size.length() / 2;
    ground.position.y = 0;
    if(view === 'ports' && product.userData.portsGroup){
      /* cadrage sur la connectique, légèrement de biais */
      pivot.rotation.set(0, 0, 0); pivot.updateMatrixWorld(true);
      const pg = product.userData.portsGroup, box2 = new THREE.Box3().setFromObject(pg);
      const pos = box2.getCenter(new THREE.Vector3()), sz = box2.getSize(new THREE.Vector3());
      const nrm = product.userData.portsFace === 'top' ? new THREE.Vector3(0, 1, 0.55) : new THREE.Vector3(1, 0.25, 0.5);
      nrm.applyQuaternion(product.getWorldQuaternion(new THREE.Quaternion())).normalize();
      const span = Math.max(sz.x, sz.y, sz.z) * 1.35 + 6;
      const dist = span / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)));
      cam.up.set(0, 1, 0).applyQuaternion(product.getWorldQuaternion(new THREE.Quaternion())).normalize();
      cam.position.copy(pos).addScaledVector(nrm, dist); cam.lookAt(pos);
    } else if(view === 'logo'){
      /* cadrage sur la zone du logo, face à elle */
      cam.up.set(0, 1, 0);
      pivot.rotation.set(0, 0, 0); pivot.updateMatrixWorld(true);
      const lm = product.userData.logoMesh, pos = lm.getWorldPosition(new THREE.Vector3());
      const nrm = new THREE.Vector3(0, 0, 1).applyQuaternion(lm.getWorldQuaternion(new THREE.Quaternion())).normalize();
      const span = Math.max(product.userData.zoneW, product.userData.zoneH * cam.aspect) * 1.25;
      const dist = span / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)));
      cam.position.copy(pos).addScaledVector(nrm, dist); cam.position.y += dist * 0.04; cam.lookAt(pos);
    } else {
      cam.up.set(0, 1, 0);
      const d = R / Math.sin(THREE.MathUtils.degToRad(cam.fov / 2)) * (opts.tight ? 1.12 : 1.42);
      cam.position.set(0, size.y * 0.5 + d * 0.18, d); cam.lookAt(0, size.y * 0.5, 0);
    }
    key.position.set(R * 1.6, R * 1.7, R * 4.2); key.target.position.set(0, 0, 0);
    const s = R * 2.2; Object.assign(key.shadow.camera, { left:-s, right:s, top:s, bottom:-s, near:1, far:R * 12 }); key.shadow.camera.updateProjectionMatrix();
    fill.position.set(-R * 3, R * 1.5, R * 2); rim.position.set(0, R * 2.5, -R * 4);
  };
  const render = () => { if(view !== 'all') pivot.rotation.set(0, 0, 0); else pivot.rotation.set(pitch * 0.4, yaw, 0); renderer.render(scene, cam); };
  const resize = () => {
    const w = canvas.clientWidth || opts.size || 600, h = canvas.clientHeight || opts.size || 600;
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); render();
  };
  const set = async (cfg, keepAngle) => {
    const logo = cfg.logo ? await gbProImg(cfg.logo).catch(() => null) : null;
    try{ await document.fonts.ready; }catch(e){}
    if(product){ pivot.remove(product); product.traverse(o => { if(o.geometry) o.geometry.dispose(); if(o.material){ if(o.material.map) o.material.map.dispose(); o.material.dispose(); } }); }
    product = gbBuildProduct(cfg, logo); pivot.add(product);
    if(!keepAngle){ yaw = product.userData.def.lay ? -0.3 : -0.42; pitch = 0.12; }
    fit(); render();
  };
  /* rotation au doigt / à la souris */
  if(opts.interactive){
    let drag = null;
    canvas.addEventListener('pointerdown', e => { if(view !== 'all') return; drag = { x:e.clientX, y:e.clientY, yaw, pitch }; canvas.setPointerCapture(e.pointerId); canvas.classList.add('is-grabbing'); });
    canvas.addEventListener('pointermove', e => { if(!drag) return; yaw = drag.yaw + (e.clientX - drag.x) * 0.01; pitch = Math.max(-0.6, Math.min(0.9, drag.pitch + (e.clientY - drag.y) * 0.006)); render(); });
    const end = () => { drag = null; canvas.classList.remove('is-grabbing'); };
    canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('dblclick', () => { yaw = product && product.userData.def.lay ? -0.3 : -0.42; pitch = 0.12; render(); });
    if('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  }
  return {
    set, render, resize,
    setView(v){ view = v; if(v === 'all'){ yaw = product && product.userData.def.lay ? -0.3 : -0.42; pitch = 0.12; } fit(); render(); },
    hasPorts(){ return !!(product && product.userData.portsGroup); },
    snapshot(w){
      const prev = renderer.getSize(new THREE.Vector2()); renderer.setPixelRatio(1); renderer.setSize(w, w, false); cam.aspect = 1; cam.updateProjectionMatrix(); render();
      const url = canvas.toDataURL('image/png');
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(prev.x, prev.y, false); cam.aspect = prev.x / prev.y; cam.updateProjectionMatrix(); render();
      return url;
    }
  };
}

/* Un seul moteur caché sert à produire les vignettes et visuels fixes */
let gbStudio = null;
async function gbProSnapshot(cfg, size){
  if(!gbStudio){ const c = gbCanvas(size, size); gbStudio = gbCreateStage(c, { snapshot:true, size, tight:true }); gbStudio._c = c; }
  await gbStudio.set(cfg);
  return gbStudio.snapshot(size);
}

const GB_PRO_EXAMPLES = [
  { title:'Cabinet de conseil', sector:'Entreprise', desc:'Powerbank Slim bleu nuit, logo en creux.', cfg:{ type:'powerbank', shape:'slim', brand:'KORA CONSEIL', slogan:'Stratégie et finance', color:'nuit', finish:'satin', marking:'creux', ink:'blanc', logo:gbMonogram('K','#2F6FD6','letter') } },
  { title:'Festival', sector:'Événementiel', desc:'Powerbank Galet noire, logo bicolore or.', cfg:{ type:'powerbank', shape:'galet', brand:'FESTIVAL LUMIÈRES', slogan:'Édition 2027', color:'noir', finish:'mat', marking:'bicolore', ink:'or', logo:gbMonogram('','#F2B705','sun') } },
  { title:'Installateur solaire', sector:'Énergie', desc:'Batterie Bloc verte, logo en relief.', cfg:{ type:'battery', shape:'bloc', brand:'SOLAIRE PLUS', slogan:'Installateur agréé', color:'vert', finish:'mat', marking:'relief', ink:'or', logo:gbMonogram('','#C9A646','ring') } },
  { title:'Opérateur internet', sector:'Télécoms', desc:'Mini-UPS Cube blanc, logo bicolore vert.', cfg:{ type:'ups', shape:'cube', brand:'NET EXPRESS', slogan:'Toujours connecté', color:'blanc', finish:'satin', marking:'bicolore', ink:'vert', logo:gbMonogram('','#1E9E5A','cross') } }
];
const GB_PRO_HERO = { type:'powerbank', shape:'capsule', brand:'VOTRE MARQUE', slogan:'Votre slogan ici', color:'nuit', finish:'satin', marking:'bicolore', ink:'or', logo:gbMonogram('','#C9A646','ring') };


/* Référence unique de la demande (reprise dans la fiche et dans WhatsApp) */
function gbProRef(){
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `GB-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
function gbProSpecs(cfg){
  const t = GB_SHAPES[cfg.type], sh = gbShape(cfg), c = GB_CONNECT[cfg.type];
  return [
    ['Produit', t.label],
    ['Forme', `${sh.name} : ${sh.desc.toLowerCase()}`],
    ['Dimensions indicatives', `${sh.w} × ${sh.h} × ${sh.d} mm`],
    c.power ? ['Puissance', c.power.options[cfg.power].name] : null,
    [c.ports.label, cfg.ports.map(p => c.ports.options[p]).join(', ') || 'à préciser'],
    ['Couleur de la coque', GB_PRO.colors[cfg.color].name],
    ['Aspect', GB_PRO.finishes[cfg.finish].name],
    ['Logo', GB_PRO.markings[cfg.marking].name + (cfg.marking === 'bicolore' ? `, couleur ${cfg.ink}` : '')],
    ['Marque', cfg.brand || 'à préciser'],
    cfg.slogan ? ['Slogan', cfg.slogan] : null,
    ['Quantité', cfg.qty],
    cfg.deadline ? ['Échéance souhaitée', new Date(cfg.deadline).toLocaleDateString('fr-FR')] : null,
    cfg.city ? ['Ville', cfg.city] : null
  ].filter(Boolean);
}
async function gbProSheet(cfg, ref){
  const W = 1800, H = 1100, c = gbCanvas(W, H), x = c.getContext('2d');
  try{ await document.fonts.ready; }catch(e){}
  const F = getComputedStyle(document.body).fontFamily || 'Arial, sans-serif';
  x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
  /* visuel */
  const gr = x.createRadialGradient(470, 520, 0, 470, 560, 620); gr.addColorStop(0, '#FAFBF9'); gr.addColorStop(1, '#DCE4DB');
  x.fillStyle = gr; x.fillRect(0, 0, 940, H);
  const img = await gbProImg(await gbProSnapshot(cfg, 900));
  x.drawImage(img, 20, 140, 900, 900);
  /* bandeau */
  x.fillStyle = '#052417'; x.fillRect(0, 0, W, 104);
  x.fillStyle = '#C9A646'; x.fillRect(0, 104, W, 5);
  x.fillStyle = '#FFFFFF'; x.font = `800 34px ${F}`; x.textBaseline = 'middle'; x.fillText('GREENBRIDGE TECHNOLOGIES', 48, 52);
  x.fillStyle = '#E9D79B'; x.font = `600 24px ${F}`; x.textAlign = 'right'; x.fillText('Fiche de personnalisation', W - 48, 40);
  x.fillStyle = '#A9C2B2'; x.font = `500 20px ${F}`; x.fillText(`Réf. ${ref}  ·  ${new Date().toLocaleDateString('fr-FR')}`, W - 48, 72);
  x.textAlign = 'left';
  /* caractéristiques */
  const X = 1000, specs = gbProSpecs(cfg);
  x.fillStyle = '#0F1D16'; x.font = `800 44px ${F}`; x.fillText(cfg.brand || 'Votre marque', X, 180);
  x.fillStyle = '#56665D'; x.font = `500 24px ${F}`; x.fillText(`${GB_SHAPES[cfg.type].label}, forme ${gbShape(cfg).name}`, X, 226);
  let y = 290; const rowH = Math.min(54, (H - 250 - 290) / specs.length);
  specs.forEach(([k, v], i) => {
    if(i % 2 === 0){ x.fillStyle = '#F2F4EF'; x.fillRect(X - 16, y - rowH * 0.56, W - X - 32, rowH); }
    x.fillStyle = '#56665D'; x.font = `500 21px ${F}`; x.fillText(k, X, y);
    x.fillStyle = '#0F1D16'; x.font = `700 22px ${F}`;
    let val = String(v); while(x.measureText(val).width > 470 - (cfg.logo && y < 330 ? 0 : 0) && val.length > 4) val = val.slice(0, -2);
    if(val !== String(v)) val = val.slice(0, -1) + '…';
    x.fillText(val, X + 280, y); y += rowH;
  });
  /* logo fourni : en haut à droite, à côté du nom */
  if(cfg.logo){
    const lg = await gbProImg(cfg.logo).catch(() => null);
    if(lg){ const k = Math.min(130 / lg.width, 80 / lg.height); x.drawImage(lg, W - 48 - lg.width * k, 150, lg.width * k, lg.height * k); }
  }
  /* engagement et contact */
  x.fillStyle = '#0A3A26'; x.fillRect(X - 16, H - 210, W - X - 32, 150);
  x.fillStyle = '#FFFFFF'; x.font = `700 22px ${F}`; x.fillText('Conception et fabrication GreenBridge, du début à la fin.', X + 8, H - 168);
  x.fillStyle = '#C9D9CE'; x.font = `500 19px ${F}`;
  x.fillText('Maquette indicative. Le rendu final est validé avec vous sur un bon à tirer.', X + 8, H - 132);
  x.fillText('WhatsApp : +225 01 72 61 15 37 (CI)  ·  +221 77 401 50 04 (SN)', X + 8, H - 98);
  x.fillStyle = '#A9C2B2'; x.font = `500 18px ${F}`; x.fillText('greenbridge-technologies.com', 48, H - 34);
  return c;
}

function gbInitPro(){
  const has3D = typeof THREE !== 'undefined';
  /* visuels fixes (haut de page) */
  document.querySelectorAll('[data-pro-art]').forEach(async el => {
    if(!has3D) return;
    const k = el.dataset.proArt, cfg = k === 'hero' ? GB_PRO_HERO : GB_PRO_EXAMPLES[+k].cfg;
    const img = new Image(); img.alt = 'Exemple de produit personnalisé'; img.className = 'pro-art-img';
    try{ img.src = await gbProSnapshot(cfg, 900); el.prepend(img); }catch(e){}
  });
  const root = document.querySelector('[data-gb-pro]');
  if(!root) return;
  const $ = s => root.querySelector(s);
  const cfg = { type:'powerbank', shape:'galet', power:'rapide', ports:['usbc','usba'], brand:'', slogan:'', color:'noir', finish:'satin', marking:'bicolore', ink:'or', logo:'', qty:'100 à 249', deadline:'', sector:'', city:'', note:'' };
  const caption = $('[data-pro-caption]'), summary = $('[data-pro-summary]');

  /* aperçu 3D interactif */
  let stage = null;
  const holder = $('[data-pro-stage]');
  if(has3D){
    try{
      const cv = document.createElement('canvas'); cv.className = 'pro-3d'; cv.setAttribute('aria-label', 'Aperçu 3D de votre produit : faites-le pivoter');
      holder.appendChild(cv); stage = gbCreateStage(cv, { interactive:true }); stage.resize();
    }catch(e){ stage = null; }
  }
  if(!stage) holder.innerHTML = '<p class="pro-no3d">L’aperçu 3D n’est pas disponible sur cet appareil. Votre demande peut quand même être envoyée : nous vous préparons une maquette.</p>';

  /* types et formes */
  const typesEl = $('[data-pro-types]'), shapesEl = $('[data-pro-shapes]');
  typesEl.innerHTML = Object.entries(GB_SHAPES).map(([id, t]) => `
    <label class="type"><input type="radio" name="ptype" value="${id}" ${id === cfg.type ? 'checked' : ''}><span><i class="fa-solid ${t.icon}" aria-hidden="true"></i>${t.label}</span></label>`).join('');
  const thumbs = {};
  const renderShapes = () => {
    const t = GB_SHAPES[cfg.type];
    shapesEl.innerHTML = t.models.map(m => `
      <label class="pick"><input type="radio" name="pshape" value="${m.id}" ${m.id === cfg.shape ? 'checked' : ''}>
        <span class="pick__img" data-thumb="${cfg.type}-${m.id}">${thumbs[cfg.type + '-' + m.id] ? `<img src="${thumbs[cfg.type + '-' + m.id]}" alt="">` : '<span class="pick__load"></span>'}</span>
        <span class="pick__txt"><b>${m.name}</b><small>${m.desc}</small></span></label>`).join('');
    if(!has3D) return;
    (async () => {
      for(const m of t.models){
        const key = cfg.type + '-' + m.id; if(thumbs[key]) continue;
        try{
          thumbs[key] = await gbProSnapshot({ type:cfg.type, shape:m.id, brand:' ', slogan:'', color:'noir', finish:'satin', marking:'bicolore', ink:'blanc', logo:'' }, 320);
          const box = shapesEl.querySelector(`[data-thumb="${key}"]`); if(box) box.innerHTML = `<img src="${thumbs[key]}" alt="">`;
        }catch(e){}
      }
    })();
  };
  const powerEl = $('[data-pro-power]'), portsEl = $('[data-pro-ports]');
  const renderConn = () => {
    const c = GB_CONNECT[cfg.type];
    powerEl.closest('.field').hidden = !c.power;
    if(c.power) powerEl.innerHTML = Object.entries(c.power.options).map(([id, o]) => `
      <label class="seg"><input type="radio" name="ppower" value="${id}" ${id === cfg.power ? 'checked' : ''}><span><b>${o.name}</b><small>${o.hint}</small></span></label>`).join('');
    $('[data-pro-ports-label]').textContent = c.ports.label;
    portsEl.innerHTML = Object.entries(c.ports.options).map(([id, name]) => `
      <label class="chip"><input type="checkbox" name="pport" value="${id}" ${cfg.ports.includes(id) ? 'checked' : ''}><span><i class="fa-solid fa-check" aria-hidden="true"></i>${name}</span></label>`).join('');
  };
  const setTypeDefaults = () => {
    const c = GB_CONNECT[cfg.type];
    if(!c.power || !c.power.options[cfg.power]) cfg.power = c.power ? c.power.def : '';
    cfg.ports = (cfg.ports || []).filter(p => c.ports.options[p]);
    if(!cfg.ports.length) cfg.ports = c.ports.def.slice();
  };
  $('[data-pro-colors]').innerHTML = Object.entries(GB_PRO.colors).map(([id, c]) => `
    <label class="swatch" title="${c.name}"><input type="radio" name="pcolor" value="${id}" ${id === cfg.color ? 'checked' : ''}><span style="--c:${c.hex}"></span><small>${c.name}</small></label>`).join('');
  $('[data-pro-finishes]').innerHTML = Object.entries(GB_PRO.finishes).map(([id, f]) => `
    <label class="seg"><input type="radio" name="pfinish" value="${id}" ${id === cfg.finish ? 'checked' : ''}><span><b>${f.name}</b></span></label>`).join('');
  $('[data-pro-markings]').innerHTML = Object.entries(GB_PRO.markings).map(([id, m]) => `
    <label class="seg"><input type="radio" name="pmark" value="${id}" ${id === cfg.marking ? 'checked' : ''}><span><b>${m.name}</b><small>${m.hint}</small></span></label>`).join('');

  let pending = 0, structural = true;
  const draw = async () => {
    if(!stage) return;
    const t = ++pending;
    await new Promise(r => requestAnimationFrame(r));
    if(t !== pending) return;
    await stage.set(cfg, !structural); structural = false;
    if(view !== 'all') stage.setView(view);
  };
  const render = () => {
    draw();
    const sh = gbShape(cfg), t = GB_SHAPES[cfg.type];
    const c = GB_CONNECT[cfg.type], pw = c.power ? c.power.options[cfg.power].name : '';
    if(caption) caption.innerHTML = [`${t.label} ${sh.name}`, pw, GB_PRO.colors[cfg.color].name, GB_PRO.markings[cfg.marking].name + (cfg.marking === 'bicolore' ? ' ' + cfg.ink : '')].filter(Boolean)
      .map(x => `<span>${escapeHTML(x)}</span>`).join('');
    summary.innerHTML = [
      ['Produit', `${t.label}, ${sh.name}`], ['Puissance', pw || '—'], ['Connectique', cfg.ports.map(p => c.ports.options[p]).join(', ') || '—'], ['Marque', cfg.brand || '—'],
      ['Coque', `${GB_PRO.colors[cfg.color].name}, ${GB_PRO.finishes[cfg.finish].name.toLowerCase()}`],
      ['Logo', GB_PRO.markings[cfg.marking].name + (cfg.marking === 'bicolore' ? `, ${cfg.ink}` : '')], ['Quantité', cfg.qty]
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`).join('');
    $('[data-pro-ink]').hidden = cfg.marking !== 'bicolore';
  };
  const sync = () => {
    $('#proBrand').value = cfg.brand; $('#proSlogan').value = cfg.slogan;
    root.querySelectorAll('input[name=ptype]').forEach(i => i.checked = i.value === cfg.type);
    setTypeDefaults(); renderShapes(); renderConn();
    root.querySelectorAll('input[name=pcolor]').forEach(i => i.checked = i.value === cfg.color);
    root.querySelectorAll('input[name=pfinish]').forEach(i => i.checked = i.value === cfg.finish);
    root.querySelectorAll('input[name=pmark]').forEach(i => i.checked = i.value === cfg.marking);
    root.querySelectorAll('input[name=pink]').forEach(i => i.checked = i.value === cfg.ink);
    $('[data-pro-logo-name]').textContent = cfg.logo ? 'Logo chargé' : 'Aucun logo';
    structural = true; render();
  };

  root.addEventListener('input', e => {
    const t = e.target;
    if(t.name === 'ptype'){ cfg.type = t.value; cfg.shape = GB_SHAPES[t.value].models[0].id; cfg.ports = []; setTypeDefaults(); renderShapes(); renderConn(); structural = true; }
    else if(t.name === 'ppower'){ cfg.power = t.value; structural = true; }
    else if(t.name === 'pport'){ cfg.ports = Array.from(root.querySelectorAll('input[name=pport]:checked')).map(i => i.value); structural = true; }
    else if(t.name === 'pshape'){ cfg.shape = t.value; structural = true; }
    else if(t.id === 'proBrand') cfg.brand = t.value;
    else if(t.id === 'proSlogan') cfg.slogan = t.value;
    else if(t.name === 'pcolor') cfg.color = t.value;
    else if(t.name === 'pfinish') cfg.finish = t.value;
    else if(t.name === 'pmark') cfg.marking = t.value;
    else if(t.name === 'pink') cfg.ink = t.value;
    else if(t.id === 'proQty') cfg.qty = t.value;
    else if(t.id === 'proDeadline') cfg.deadline = t.value;
    else if(t.id === 'proSector') cfg.sector = t.value;
    else if(t.id === 'proCity') cfg.city = t.value;
    else if(t.id === 'proNote') cfg.note = t.value;
    else return;
    render();
  });
  $('#proLogo').addEventListener('change', async e => {
    const msg = $('[data-pro-logo-name]');
    try{ cfg.logo = await gbReadLogo(e.target.files[0]); msg.textContent = e.target.files[0].name; }
    catch(err){ msg.textContent = err.message === 'taille' ? 'Fichier trop lourd (6 Mo maximum)' : 'Format non reconnu : PNG, JPG ou SVG'; }
    render();
  });
  $('[data-pro-logo-clear]').addEventListener('click', () => { cfg.logo = ''; $('#proLogo').value = ''; $('[data-pro-logo-name]').textContent = 'Aucun logo'; render(); });
  /* vues : ensemble, logo, connectique */
  let view = 'all';
  const viewBtns = root.querySelectorAll('[data-pro-view]');
  const setView = v => {
    view = view === v ? 'all' : v;
    viewBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.proView === view)));
    if(stage) stage.setView(view);
  };
  viewBtns.forEach(b => b.addEventListener('click', () => setView(b.dataset.proView)));
  /* exemples */
  const ex = document.querySelector('[data-pro-examples]');
  if(ex){
    ex.innerHTML = GB_PRO_EXAMPLES.map((e, i) => `
      <article class="ex-card">
        <div class="ex-card__art" data-ex="${i}"><span class="pick__load"></span></div>
        <div class="ex-card__body"><small>${e.sector}</small><h3>${e.title}</h3><p>${e.desc}</p>
          <button class="btn btn--line btn--sm" type="button" data-pro-example="${i}">Partir de cet exemple</button></div>
      </article>`).join('');
    if(has3D) (async () => {
      for(const el of ex.querySelectorAll('[data-ex]')){
        try{ const url = await gbProSnapshot(GB_PRO_EXAMPLES[+el.dataset.ex].cfg, 640); el.innerHTML = `<img src="${url}" alt="">`; }catch(e){}
      }
    })();
    ex.addEventListener('click', e => {
      const b = e.target.closest('[data-pro-example]'); if(!b) return;
      Object.assign(cfg, GB_PRO_EXAMPLES[+b.dataset.proExample].cfg);
      sync(); document.getElementById('simulateur').scrollIntoView({ behavior:'smooth' });
    });
  }

  /* téléchargement */
  let ref = gbProRef();
  root.querySelectorAll('[data-pro-download]').forEach(btn => btn.addEventListener('click', async () => {
    if(!has3D) return;
    const old = btn.innerHTML; btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>Préparation…';
    try{
      const sheet = await gbProSheet(cfg, ref);
      const name = `fiche-${(cfg.brand || 'greenbridge').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'greenbridge'}-${ref}.png`;
      sheet.toBlob(blob => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }, 'image/png');
    }finally{ btn.disabled = false; btn.innerHTML = old; }
  }));;

  /* demande sur WhatsApp */
  root.querySelectorAll('[data-pro-send]').forEach(btn => btn.addEventListener('click', () => {
    const sh = gbShape(cfg), t = GB_SHAPES[cfg.type];
    pendingCustomMessage = [
      'Bonjour GreenBridge, je souhaite un devis pour un produit conçu à notre marque, pour {PAYS}.',
      `Référence de ma fiche : ${ref}`,
      '',
      `• Produit : ${t.label}, forme ${sh.name} (${sh.w} × ${sh.h} × ${sh.d} mm)`,
      GB_CONNECT[cfg.type].power ? `• Puissance : ${GB_CONNECT[cfg.type].power.options[cfg.power].name}` : null,
      `• ${GB_CONNECT[cfg.type].ports.label} : ${cfg.ports.map(p => GB_CONNECT[cfg.type].ports.options[p]).join(', ') || 'à préciser'}`,
      `• Marque : ${cfg.brand || 'à préciser'}${cfg.slogan ? ` (slogan : ${cfg.slogan})` : ''}`,
      `• Secteur : ${cfg.sector || 'à préciser'}`,
      `• Coque : ${GB_PRO.colors[cfg.color].name}, finition ${GB_PRO.finishes[cfg.finish].name.toLowerCase()}`,
      `• Logo : ${GB_PRO.markings[cfg.marking].name}${cfg.marking === 'bicolore' ? `, couleur ${cfg.ink}` : ''}`,
      `• Quantité : ${cfg.qty}`,
      `• Échéance souhaitée : ${cfg.deadline ? new Date(cfg.deadline).toLocaleDateString('fr-FR') : 'à préciser'}`,
      `• Ville : ${cfg.city || 'à préciser'}`,
      cfg.note ? `• Précisions : ${cfg.note}` : '',
      '',
      cfg.logo ? 'Je vous envoie mon logo dans cette conversation.' : 'Je vous enverrai mon logo.'
    ].filter(l => l !== null).filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
    openCountryModal();
  }));

  sync();
}

/* ---------- Démarrage ---------- */
/* =====================================================================
   FICHE TECHNIQUE EN LIGNE  (fiche.html?p=identifiant)
   ===================================================================== */
const GB_SAFETY = {
  battery:[
    'Ne pas exposer au soleil direct, à une forte chaleur (voiture fermée, tableau de bord) ni à l’humidité.',
    'Ne pas percer, écraser, démonter ni ouvrir le boîtier.',
    'Utiliser des câbles et un adaptateur secteur en bon état.',
    'Recharger sur une surface dure et dégagée, jamais sous un oreiller ou sur un lit.',
    'Tenir hors de portée des jeunes enfants.',
    'Arrêter immédiatement l’utilisation si le produit gonfle, chauffe anormalement ou dégage une odeur.'
  ],
  storage:[
    'Le raccordement d’un pack batterie doit être effectué ou contrôlé par un technicien compétent.',
    'Respecter la polarité : positif sur positif, négatif sur négatif. Ne jamais mettre les bornes en court-circuit.',
    'Utiliser uniquement un chargeur ou un onduleur compatible avec la technologie LiFePO₄ et la tension du pack.',
    'Installer la batterie dans un endroit ventilé, sec, à l’abri du soleil et de la pluie.',
    'Protéger l’installation par un fusible ou un disjoncteur dimensionné par un professionnel.'
  ]
};
const GB_TROUBLE = [
  ['La powerbank ne se recharge pas', 'Vérifiez que le câble est branché sur l’entrée (IN) et non sur une sortie, puis essayez un autre câble ou un autre adaptateur.'],
  ['Mon téléphone ne se recharge pas', 'Vérifiez le niveau de la powerbank, la sortie utilisée et l’état du câble.'],
  ['La recharge est lente', 'La charge rapide demande un téléphone, un câble et une sortie compatibles. Avec un câble ordinaire, la recharge reste standard.']
];

function gbRenderFiche(){
  const root = document.querySelector('[data-gb-fiche]');
  if(!root) return;
  const id = new URLSearchParams(location.search).get('p');
  if(!id || !GB_CARDS[id]){
    root.innerHTML = `<div class="wrap fiche-missing"><h1>Choisissez un produit</h1><p>Cette fiche n’existe pas ou le lien est incomplet. Retrouvez tous nos produits ci-dessous.</p><div class="p-grid" data-gb-grid="${GB_ORDER.join(',')}"></div></div>`;
    gbRenderGrids();
    return;
  }
  const P = gbProduct(id), c = P.card, g = P.guide || {};
  const imgs = gbImagesFor(id);
  const fam = c.family, famPage = GB_FAMILY_PAGE[fam], famLabel = GB_FAMILY_LABEL[fam];
  const url = location.origin + location.pathname + '?p=' + id;

  document.title = `${c.name} : fiche technique et prix | GreenBridge Technologies`;
  const md = document.querySelector('meta[name="description"]');
  if(md) md.setAttribute('content', `${c.name}, ${c.spec}. ${c.pitch} À partir de ${c.price.toLocaleString('fr-FR')} FCFA, commande sur WhatsApp en Côte d’Ivoire et au Sénégal.`);
  const ld = document.createElement('script'); ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({'@context':'https://schema.org','@type':'Product', name:c.name, description:c.pitch, image:imgs.map(i => location.origin + '/' + i), brand:{'@type':'Brand', name:'GreenBridge'},
    offers:{'@type':'Offer', priceCurrency:'XOF', price:String(c.price), availability:c.soldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock', url}});
  document.head.appendChild(ld);

  const keyFigs = [
    [c.spec.split(',')[0], 'Capacité'],
    [g.power || (c.spec.split(',')[1] || '').trim() || '—', 'Puissance'],
    [c.use.replace(/^≈\s*/, '≈ '), 'En pratique']
  ];
  const ports = (list, empty) => list && list.length ? `<ul class="port-list">${list.map(x => `<li><i class="fa-solid fa-plug" aria-hidden="true"></i>${escapeHTML(x)}</li>`).join('')}</ul>` : `<p class="fiche-muted">${escapeHTML(empty)}</p>`;
  const variants = (g.variants || []).map(v => `<div class="variant"><h4>${escapeHTML(v.name)}${v.name.includes(v.power) ? '' : ' · ' + escapeHTML(v.power)}</h4>${ports(v.outputs, '')}<p class="fiche-muted">${escapeHTML(v.detail || '')}</p></div>`).join('');
  const steps = (g.steps || []).map(st => `<li><h4>${escapeHTML(st.title)}</h4><p>${escapeHTML(st.text)}</p></li>`).join('');
  const internal = /renseign|confirmer|à vérifier|selon la carte|catalogue actuel|disponibles/i;
  const notes = [...(g.notes || []), ...(g.extraPrecautions || [])].filter(n => !internal.test(n));
  const inputNote = g.inputNote && !internal.test(g.inputNote) ? g.inputNote : 'Repérez l’entrée marquée IN ou INPUT sur le boîtier.';
  const safety = fam === 'storage' ? GB_SAFETY.storage : GB_SAFETY.battery;
  const similar = GB_ORDER.filter(x => x !== id && GB_CARDS[x].family === fam && !GB_CARDS[x].soldOut)
    .sort((a, b) => Math.abs(GB_CARDS[a].mah - c.mah) - Math.abs(GB_CARDS[b].mah - c.mah)).slice(0, 3);
  const shareText = encodeURIComponent(`${c.name} (${c.spec}) chez GreenBridge, à partir de ${c.price.toLocaleString('fr-FR')} FCFA : ${url}`);

  root.innerHTML = `
  <section class="fiche-top">
    <div class="wrap">
      <nav class="crumbs crumbs--light" aria-label="Fil d’Ariane"><a href="index.html">Accueil</a><i class="fa-solid fa-chevron-right" aria-hidden="true"></i><a href="${famPage}">${famLabel}</a><i class="fa-solid fa-chevron-right" aria-hidden="true"></i><span aria-current="page">${escapeHTML(c.name)}</span></nav>
      <div class="fiche-grid">
        <div class="fiche-gallery">
          <div class="fiche-gallery__main">${c.isNew ? '<span class="p-card__badge">Nouveauté</span>' : ''}${c.soldOut ? '<span class="p-card__badge p-card__badge--out">Rupture de stock</span>' : ''}<img id="ficheMain" src="${escapeHTML(imgs[0] || '')}" alt="${escapeHTML(c.name)}" fetchpriority="high"></div>
          <div class="fiche-gallery__thumbs" role="list">${imgs.map((src, n) => `<button type="button" role="listitem" class="${n ? '' : 'is-active'}" data-thumb="${escapeHTML(src)}" aria-label="Photo ${n + 1}"><img src="${escapeHTML(src)}" alt="" loading="lazy"></button>`).join('')}</div>
        </div>
        <div class="fiche-info">
          <p class="m-kicker">${famLabel}${c.isNew ? ' · Nouveauté' : ''}</p>
          <h1>${escapeHTML(c.name)}</h1>
          <p class="fiche-pitch">${escapeHTML(c.pitch)}</p>
          <p class="fiche-price"><small>À partir de</small> ${gbPrice(c.price)}</p>
          <dl class="fiche-figs">${keyFigs.map(([v, l]) => `<div><dt>${escapeHTML(l)}</dt><dd>${escapeHTML(v)}</dd></div>`).join('')}</dl>
          <div class="btn-row">
            <button class="btn btn--wa" type="button" data-order="${escapeHTML(c.soldOut ? c.name + ' — en rupture : je souhaite être informé du réassort' : c.order)}"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i>${c.soldOut ? 'Être informé du réassort' : 'Commander sur WhatsApp'}</button>
          </div>
          <div class="fiche-tools">
            <button type="button" data-share><i class="fa-solid fa-share-nodes" aria-hidden="true"></i>Partager</button>
            <a href="https://wa.me/?text=${shareText}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i>Envoyer à un proche</a>
            <button type="button" data-print><i class="fa-solid fa-print" aria-hidden="true"></i>Imprimer ou PDF</button>
            <button type="button" data-pdf="${id}"><i class="fa-regular fa-file-pdf" aria-hidden="true"></i>Notice PDF</button>
          </div>
          <p class="fiche-toast" role="status" aria-live="polite"></p>
        </div>
      </div>
    </div>
  </section>

  <nav class="fiche-tabs" aria-label="Sections de la fiche"><div class="wrap">
    <a href="#caracteristiques">Caractéristiques</a>${(g.inputPorts || g.outputPorts || g.variants) ? '<a href="#connectique">Connectique</a>' : ''}${steps ? '<a href="#utilisation">Utilisation</a>' : ''}<a href="#securite">Sécurité</a>
  </div></nav>

  <div class="wrap fiche-body">
    <section id="caracteristiques" class="fiche-sec">
      <h2>Caractéristiques</h2>
      ${P.details ? `<p class="fiche-lead">${escapeHTML(P.details)}</p>` : ''}
      <table class="spec-table"><tbody>
        ${P.specs.map(x => x.replace(/ (indiquée sur le catalogue actuel|annoncée)( :)/i, '$2').replace(/ \(à confirmer[^)]*\)/i, '')).map(x => { const k = x.indexOf(' : '); return k > 0 ? `<tr><th scope="row">${escapeHTML(x.slice(0, k))}</th><td>${escapeHTML(x.slice(k + 3))}</td></tr>` : `<tr><td colspan="2">${escapeHTML(x)}</td></tr>`; }).join('')}
        <tr><th scope="row">Prix</th><td>À partir de ${gbPrice(c.price)}</td></tr>
        <tr><th scope="row">Marque</th><td>GreenBridge Technologies</td></tr>
      </tbody></table>
    </section>

    ${(g.inputPorts || g.outputPorts || g.variants) ? `
    <section id="connectique" class="fiche-sec">
      <h2>Connectique</h2>
      <div class="ports">
        <div class="port-card"><h3><i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i> Pour recharger la ${fam === 'storage' ? 'batterie' : 'powerbank'}</h3>${ports(g.inputPorts, inputNote)}</div>
        ${g.variants ? `<div class="port-card port-card--wide"><h3><i class="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i> Pour recharger vos appareils</h3><div class="variants">${variants}</div></div>`
          : `<div class="port-card"><h3><i class="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i> Pour recharger vos appareils</h3>${ports(g.outputPorts, 'Sorties précisées sur le boîtier.')}</div>`}
      </div>
    </section>` : ''}

    ${steps ? `
    <section id="utilisation" class="fiche-sec">
      <h2>Mode d’emploi</h2>
      <ol class="howto">${steps}</ol>
      ${notes.length ? `<div class="fiche-notes"><h3>Bon à savoir</h3><ul>${notes.map(n => `<li>${escapeHTML(n)}</li>`).join('')}</ul></div>` : ''}
    </section>` : ''}

    <section id="securite" class="fiche-sec">
      <h2>Sécurité</h2>
      <ul class="safety-list">${safety.map(x => `<li><i class="fa-solid fa-shield-halved" aria-hidden="true"></i>${escapeHTML(x)}</li>`).join('')}</ul>
      ${fam !== 'storage' ? `<h3 class="fiche-h3">En cas de problème</h3><div class="faq">${GB_TROUBLE.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>` : ''}
      <p class="fiche-muted fiche-foot">Valeurs constructeur. L’autonomie et la vitesse de recharge réelles dépendent de l’appareil, du câble et de l’adaptateur utilisés. Un doute sur la compatibilité ? Écrivez-nous sur WhatsApp avant d’acheter.</p>
    </section>

    ${similar.length ? `
    <section class="fiche-sec no-print">
      <h2>Vous aimerez aussi</h2>
      <div class="p-grid p-grid--3" data-gb-grid="${similar.join(',')}"></div>
    </section>` : ''}
  </div>`;

  /* galerie */
  const main = document.getElementById('ficheMain');
  gbAttachImageFallback(main, imgs);
  root.querySelectorAll('[data-thumb]').forEach(b => {
    const im = b.querySelector('img');
    im.addEventListener('error', () => b.remove());
    b.addEventListener('click', () => {
      main.src = b.dataset.thumb;
      root.querySelectorAll('[data-thumb]').forEach(x => x.classList.toggle('is-active', x === b));
    });
  });
  /* partager / imprimer */
  const toast = root.querySelector('.fiche-toast');
  root.querySelector('[data-share]').addEventListener('click', async () => {
    try{
      if(navigator.share){ await navigator.share({title:c.name + ' | GreenBridge', text:c.pitch, url}); return; }
      await navigator.clipboard.writeText(url);
      toast.textContent = 'Lien copié. Vous pouvez le coller dans un message.';
    }catch(err){ toast.textContent = 'Copiez le lien dans la barre d’adresse pour le partager.'; }
  });
  root.querySelector('[data-print]').addEventListener('click', () => window.print());
  /* page active dans le menu */
  document.querySelectorAll('.main-nav a, .mobile-menu nav a').forEach(a => { if(a.getAttribute('href') === famPage) a.setAttribute('aria-current', 'page'); });
  document.body.setAttribute('data-gb-page', { phone:'powerbanks', laptop:'laptop', wifi:'wifi', storage:'lifepo4' }[fam]);
  gbRenderGrids();
}

if(document.querySelector('[data-gb-fiche]')) gbRenderFiche(); else gbRenderGrids();
gbInitFilters();
gbInitGuide();
gbInitCalculator();
gbInitPro();
(function(){ const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear(); })();

/* =====================================================================
   ÉNERGIE GREENBRIDGE
   - Bande collée sous le menu avec des boules de plasma
   - Courant électrique autour des grandes photos
   Une couleur par page : modifiez GB_ENERGY_THEMES pour changer.
   Couleurs en [Rouge, Vert, Bleu].
   ===================================================================== */
const GB_ENERGY_THEMES = {
  home:      { name:'Jaune soleil',   halo:[255,196,0],   shell:[255,226,90],  bolt:[255,250,215], core:[255,255,255], nebula:[255,120,0]   },
  laptop:    { name:'Bleu électrique',halo:[30,150,255],  shell:[90,220,255],  bolt:[215,248,255], core:[255,255,255], nebula:[150,70,255]  },
  wifi:      { name:'Violet signal',  halo:[150,80,255],  shell:[200,150,255], bolt:[245,230,255], core:[255,255,255], nebula:[255,70,200]  },
  powerbanks:{ name:'Vert énergie',   halo:[60,220,90],   shell:[150,255,120], bolt:[235,255,215], core:[255,255,255], nebula:[0,200,170]   },
  lifepo4:   { name:'Orange batterie',halo:[255,110,20],  shell:[255,170,70],  bolt:[255,238,205], core:[255,255,255], nebula:[255,40,60]   },
  pro:       { name:'Turquoise pro',  halo:[0,200,190],   shell:[110,240,225], bolt:[225,255,250], core:[255,255,255], nebula:[60,110,255]  },
  about:     { name:'Rose électrique',halo:[255,60,170],  shell:[255,140,215], bolt:[255,232,248], core:[255,255,255], nebula:[160,80,255]  }
};

(function(){
  'use strict';
  const page = document.body.getAttribute('data-gb-page') || 'home';
  const T = GB_ENERGY_THEMES[page] || GB_ENERGY_THEMES.home;
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for(const k in attrs) n.setAttribute(k, attrs[k]);
    if(parent) parent.appendChild(n);
    return n;
  };
  document.documentElement.style.setProperty('--energy', `rgb(${T.shell.join(',')})`);

  /* ---------- Fils de la bande (SVG statique, très léger) ---------- */
  function drawWires(band){
    let svg = band.querySelector('svg.energy-wires');
    const w = band.clientWidth, h = band.clientHeight;
    if(!w || !h) return;
    if(svg && svg._w === w && svg._h === h) return;
    if(svg) svg.remove();
    svg = el('svg', {class:'energy-wires', viewBox:`0 0 ${w} ${h}`, 'aria-hidden':'true'});
    svg._w = w; svg._h = h;
    band.prepend(svg);
    [[.2, 420, 0, .30], [.14, 300, 1.9, .22], [.24, 560, 3.6, .12]].forEach(([amp, len, ph, op]) => {
      let d = '';
      for(let x = -10; x <= w + 10; x += 14){
        const y = h / 2 + h * amp * Math.sin((x / len) * Math.PI * 2 + ph);
        d += (x === -10 ? 'M' : 'L') + x + ',' + y.toFixed(1);
      }
      el('path', {d, fill:'none', stroke:rgba(T.shell, op), 'stroke-width':'1'}, svg);
    });
  }

  /* ---------- Courant autour d’un cadre photo ---------- */
  function buildFrame(box){
    const w = box.clientWidth, h = box.clientHeight;
    if(!w || !h) return;
    const old = box.querySelector(':scope > .energy-frame');
    if(old && old._w === w && old._h === h) return;
    if(old) old.remove();
    const r = parseFloat(getComputedStyle(box).borderTopLeftRadius) || 24;
    const svg = el('svg', {class:'energy-frame', viewBox:`0 0 ${w} ${h}`, 'aria-hidden':'true'});
    svg._w = w; svg._h = h;
    box.appendChild(svg);
    const i = 1.5, rr = Math.max(0, r - i);
    const d = `M${i + rr},${i} H${w - i - rr} A${rr},${rr} 0 0 1 ${w - i},${i + rr} V${h - i - rr} A${rr},${rr} 0 0 1 ${w - i - rr},${h - i} H${i + rr} A${rr},${rr} 0 0 1 ${i},${h - i - rr} V${i + rr} A${rr},${rr} 0 0 1 ${i + rr},${i} Z`;
    el('path', {d, fill:'none', stroke:rgba(T.shell, .3), 'stroke-width':'1.2'}, svg);
    if(reduce) return;
    const dur = ((w + h) * 2 / 120).toFixed(2);
    [[0, rgba(T.shell, 1), 90], [dur / 2, rgba(T.bolt, 1), 70]].forEach(([delay, color, trail]) => {
      const tail = el('path', {d, fill:'none', stroke:color, 'stroke-width':'2.4', 'stroke-linecap':'round', pathLength:'1000',
        'stroke-dasharray':`${trail} ${1000 - trail}`, class:'energy-trail'}, svg);
      el('animate', {attributeName:'stroke-dashoffset', from:'0', to:'-1000', dur:dur + 's', begin:'-' + delay + 's', repeatCount:'indefinite'}, tail);
    });
  }

  /* ---------- Boules de plasma (canvas) ---------- */
  function jagged(x1, y1, x2, y2, rough, depth){
    let pts = [[x1, y1], [x2, y2]];
    for(let d = 0; d < depth; d++){
      const next = [pts[0]];
      for(let k = 0; k < pts.length - 1; k++){
        const [ax, ay] = pts[k], [bx, by] = pts[k + 1];
        const len = Math.hypot(bx - ax, by - ay) || 1, off = (Math.random() - .5) * rough * len;
        next.push([(ax + bx) / 2 - (by - ay) / len * off, (ay + by) / 2 + (bx - ax) / len * off], pts[k + 1]);
      }
      pts = next;
    }
    return pts;
  }
  function line(ctx, pts){
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for(let k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
    ctx.stroke();
  }

  /* Le halo, le corps et les reflets sont dessinés UNE fois dans une image
     réutilisée : c’est ce qui rend l’animation légère. */
  function makeSprite(R, dpr){
    const S = Math.ceil(R * 3 * 2), c = document.createElement('canvas');
    c.width = c.height = Math.round(S * dpr);
    const g = c.getContext('2d'); g.scale(dpr, dpr);
    const x = S / 2, y = S / 2;
    g.globalCompositeOperation = 'lighter';
    let gr = g.createRadialGradient(x, y, R * .5, x, y, R * 2.6);
    gr.addColorStop(0, rgba(T.halo, .42)); gr.addColorStop(.45, rgba(T.halo, .12)); gr.addColorStop(1, rgba(T.halo, 0));
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, R * 2.6, 0, 7); g.fill();
    gr = g.createRadialGradient(x, y, 0, x, y, R);
    gr.addColorStop(0, rgba(T.halo, .32)); gr.addColorStop(.7, rgba(T.halo, .14)); gr.addColorStop(.93, rgba(T.shell, .5)); gr.addColorStop(1, rgba(T.shell, 0));
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, R, 0, 7); g.fill();
    [[.38, 0], [.32, 2.6]].forEach(([d, a]) => {
      const nx = x + Math.cos(a) * R * d, ny = y + Math.sin(a) * R * d;
      gr = g.createRadialGradient(nx, ny, 0, nx, ny, R * .55);
      gr.addColorStop(0, rgba(T.nebula, .34)); gr.addColorStop(1, rgba(T.nebula, 0));
      g.fillStyle = gr; g.beginPath(); g.arc(nx, ny, R * .55, 0, 7); g.fill();
    });
    gr = g.createRadialGradient(x, y, 0, x, y, R * .34);
    gr.addColorStop(0, rgba(T.core, 1)); gr.addColorStop(.35, rgba(T.bolt, .75)); gr.addColorStop(1, rgba(T.halo, 0));
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, R * .34, 0, 7); g.fill();
    return {canvas:c, size:S};
  }

  function mountPlasma(host){
    if(host._plasma) return;
    host._plasma = true;
    const canvas = document.createElement('canvas');
    canvas.className = 'plasma-layer';
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const orbs = [0, 1, 2].map(i => ({
      rx:[.46, .3, .4][i], ry:[.2, .12, .24][i], speed:[.045, .07, .035][i] * (i % 2 ? -1 : 1), phase:[0, 2.1, 4.2][i],
      bolts:Array.from({length:8}, () => ({a:rand(0, 6.28), drift:rand(-.9, .9), pts:null, br:null, next:0}))
    }));
    let w = 0, h = 0, dpr = 1, R = 12, sprite = null, last = 0, arcUntil = 0, arcPair = null;
    const t0 = performance.now();

    function size(){
      const nw = host.clientWidth, nh = host.clientHeight;
      if(!nw || !nh) return false;
      if(nw === w && nh === h && sprite) return true;
      w = nw; h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      R = Math.max(8, Math.min(h * .3, 13));
      sprite = makeSprite(R, dpr);
      drawWires(host);
      return true;
    }

    function frame(now){
      if(!size()) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const t = (now - t0) / 1000;
      const pos = orbs.map(o => {
        const ang = t * o.speed * Math.PI * 2 + o.phase, depth = (Math.sin(ang) + 1) / 2;
        const r = R * (.8 + depth * .28);
        return {o, r, depth,
          x:w / 2 + Math.cos(ang) * Math.max(90, w * o.rx),
          y:h / 2 + Math.sin(ang) * Math.min(h * o.ry, Math.max(0, h / 2 - r * 1.1))};
      }).sort((a, b) => a.depth - b.depth);

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';

      /* éclair entre deux boules qui se croisent */
      if(now > arcUntil){
        arcPair = null;
        for(let i = 0; i < pos.length; i++) for(let j = i + 1; j < pos.length; j++)
          if(Math.abs(pos[i].x - pos[j].x) < Math.max(120, w * .1) && Math.random() < .05){ arcPair = [pos[i], pos[j]]; arcUntil = now + rand(90, 200); }
      }
      if(arcPair){
        const pts = jagged(arcPair[0].x, arcPair[0].y, arcPair[1].x, arcPair[1].y, .35, 5);
        ctx.strokeStyle = rgba(T.shell, .3); ctx.lineWidth = 3.5; line(ctx, pts);
        ctx.strokeStyle = rgba(T.bolt, .95); ctx.lineWidth = 1; line(ctx, pts);
      }

      pos.forEach(({o, x, y, r}) => {
        /* image pré-rendue, qui tourne doucement */
        const sz = sprite.size * (r / R);
        ctx.save(); ctx.translate(x, y); ctx.rotate(t * .5 + o.phase);
        ctx.drawImage(sprite.canvas, -sz / 2, -sz / 2, sz, sz);
        ctx.restore();
        /* éclairs vivants */
        ctx.save(); ctx.translate(x, y);
        o.bolts.forEach(b => {
          b.a += b.drift * .015;
          if(!b.pts || now > b.next){
            b.pts = jagged(rand(-r * .06, r * .06), rand(-r * .06, r * .06), Math.cos(b.a) * r * .95, Math.sin(b.a) * r * .95, .55, 3);
            const m = b.pts[Math.floor(b.pts.length / 2)], ba = b.a + rand(-.9, .9);
            b.br = jagged(m[0], m[1], Math.cos(ba) * r * .9, Math.sin(ba) * r * .9, .6, 2);
            b.next = now + rand(70, 150);
          }
          ctx.strokeStyle = rgba(T.shell, .3); ctx.lineWidth = Math.max(1.6, r * .13); line(ctx, b.pts);
          ctx.strokeStyle = rgba(T.bolt, .95); ctx.lineWidth = Math.max(.6, r * .045); line(ctx, b.pts);
          ctx.strokeStyle = rgba(T.bolt, .5); ctx.lineWidth = .5; line(ctx, b.br);
        });
        /* paroi qui crépite */
        ctx.beginPath();
        for(let k = 0; k <= 36; k++){
          const a = k / 36 * Math.PI * 2, rr = r * (.965 + Math.random() * .06);
          k ? ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : ctx.moveTo(rr, 0);
        }
        ctx.strokeStyle = rgba(T.shell, .25); ctx.lineWidth = Math.max(1.6, r * .12); ctx.stroke();
        ctx.strokeStyle = rgba(T.bolt, .75); ctx.lineWidth = Math.max(.5, r * .035); ctx.stroke();
        ctx.restore();
      });
      ctx.globalCompositeOperation = 'source-over';
    }

    /* 30 images par seconde : fluide pour l’œil, deux fois moins de travail */
    function loop(now){
      if(!document.hidden && now - last >= 33){ last = now; frame(now); }
      requestAnimationFrame(loop);
    }
    if('ResizeObserver' in window) new ResizeObserver(() => { if(reduce) frame(performance.now()); }).observe(host);
    if(reduce){ frame(performance.now()); }
    else requestAnimationFrame(loop);
    /* au retour sur la page (bouton précédent, rafraîchissement depuis le cache) */
    window.addEventListener('pageshow', () => { w = 0; frame(performance.now()); });
  }

  function start(){
    document.querySelectorAll('.energy-band').forEach(band => { drawWires(band); mountPlasma(band); });
    const frames = Array.from(document.querySelectorAll('[data-energy-frame]'));
    const run = () => frames.forEach(buildFrame);
    run();
    /* reconstruit seulement si la taille change vraiment (pas au défilement mobile) */
    if('ResizeObserver' in window){
      let t; const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(run, 150); });
      frames.forEach(f => ro.observe(f));
    }
    window.addEventListener('load', run);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
