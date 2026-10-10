export default {
  speakers: {
    crane: 'Undersecretary Philippa Crane',
    sister: 'Mira',
    shopkeeper: 'Haruto Ibe',
    coworker: 'Saskia Oyelaran',
    moth: 'MOTH',
    system: 'HARMONY OS',
  },

  scenes: {
    craneIntro: {
      lines: [
        ['crane', 'Architect {last}. Sit. Don’t touch the plant — it’s the only living thing on this floor that hasn’t filed a complaint.'],
        ['crane', 'Last winter the Minister stood in the rain and promised this city zero percent criminality within a year. He meant it as a slogan. The Treasury heard a deadline. Now it’s your deadline.'],
        ['crane', 'Your terminal holds the civic registry: ten thousand citizens, everything we’re allowed to know about them. You write the rules. A rule is a hypothesis — a profile. Anyone who fits it gets a verdict.'],
        ['crane', 'WATCH is cheap and clean. A watched criminal gets caught in the act; a watched innocent never even knows. But we only have the eyes for three hundred people at a time.'],
        ['crane', 'DETAIN has no limit. It also has no conscience. Detainees are tried, and the innocent ones stay inside anyway — paperwork doesn’t run backwards. Every innocent you detain is a family that stops believing us. Enough of those and the city burns.'],
        ['crane', 'The previous administration left you their crime blotter. Witness statements, mostly. Mostly nonsense. But nonsense has patterns.'],
        ['crane', 'One more thing. You’re in the registry too. Top line. The rules don’t know who wrote them.'],
      ],
      replies: [
        ['Understood.', 'People who say “understood” on their first day usually haven’t. Prove me wrong.'],
        ['And if my rules flag me?', 'Then you’ll have written a very honest rule. Try not to.'],
      ],
    },
    sisterCall: {
      lines: [
        ['sister', '{first}! Don’t hang up, I’m not calling about money. …I’m calling near money. Adjacent to money.'],
        ['sister', 'Rent went up again. The landlord calls it the “harmony surcharge”. I told him harmony is when two notes agree, and we do not agree. He didn’t laugh.'],
        ['sister', 'So how’s the Ministry? Do you get to read everyone’s file? Don’t read mine. It’s boring, and there’s a shoplifting thing from when I was fifteen. It was a lipstick. It was a terrible lipstick.'],
        ['sister', 'My insulin’s fine. Mostly. Halcyon Bio says there’s a “pricing review”. It’s never good news when a company reviews something, is it.'],
        ['sister', 'Come eat at the counter sometime. I’ll put an extra egg in and lie to my manager.'],
      ],
      replies: [
        ['I’ll send you something.', 'You’ll send me nothing. …Fine. You’ll send me something, and I’ll pay you back. Eventually. Geologically.'],
        ['Be careful, Mira.', 'I’m always careful. I’m careful the way the rain is dry.'],
      ],
    },
    craneContacts: {
      lines: [
        ['crane', 'Telecom handed over the call graph. Who calls whom, who sends money to whom, who sleeps on whose couch. There’s a new column in your registry: Contacts.'],
        ['crane', 'You can write rules about people’s friends now. “Has at least three contacts in jail” — that sort of thing. It’s ugly and it works. Crime is a social activity.'],
        ['crane', 'I noticed your sister is in your graph. Stack 9, a record, a little debt. I’m not saying anything. I’m saying I noticed.'],
        ['crane', 'And Marek Duarte, Stack 4. He moves things we can’t see. I’ve put a memo in your inbox.'],
      ],
      replies: [
        ['What does he move?', 'If I knew, I’d only need him watched. I want him detained.'],
        ['Leave my sister out of this.', 'I’d love to. The data won’t.'],
      ],
    },
    craneContactsJailed: {
      lines: [
        ['crane', 'Telecom handed over the call graph. There’s a new column in your registry: Contacts. You can write rules about people’s friends now. Crime is a social activity.'],
        ['crane', 'Your sister is in your graph, under “jailed”. I’m not saying anything. Neither, I imagine, are you.'],
        ['crane', 'And Marek Duarte, Stack 4. He moves things we can’t see. I’ve put a memo in your inbox.'],
      ],
    },
    shopkeeperTip: {
      lines: [
        ['shopkeeper', '{first}! You still owe me for that umbrella. Twelve years, with interest — you could buy the shop.'],
        ['shopkeeper', 'Sit. The tea is bad, but it’s hot.'],
        ['shopkeeper', 'I’ll say this once, and then I’ll pretend I didn’t. The Tidewater Benevolent Society. They call it insurance: two hundred a week, or your windows have accidents. I’ve paid eleven years. I’d pay eleven more.'],
        ['shopkeeper', 'But now they want Ren. They want him carrying for them at the Docks. He said no. Then he watched them break a man’s hands on Pier 6, and now he’s a problem.'],
        ['shopkeeper', 'Three of them come in every Friday. Dock men, Laborer cards. One in his thirties, two older, fifties maybe. Not poor anymore — that’s how you know who’s in. Ten to a hundred thousand, easy. All three have done time; they brag about it.'],
        ['shopkeeper', 'That’s three. The rest I don’t know. But you’re the Ministry. Three is a thread, and you pull a thread.'],
        ['shopkeeper', 'Keep Ren off your lists, {first}. That’s all I ask. He’s a stubborn idiot. He’s my stubborn idiot.'],
      ],
      replies: [
        ['I’ll do what I can.', 'His mother used to say that. She always did more.'],
        ['Why tell me and not the police?', 'Because the police come to my shop on Fridays too. They just don’t pay.'],
      ],
    },
    sisterUndocumented: {
      lines: [
        ['sister', 'So. Funny story. You know how the Immigration Office just handed everybody’s papers to your Ministry?'],
        ['sister', 'My residency lapsed. Two years ago. The renewal was three thousand and I had four hundred, so I chose insulin. I thought, who checks? Turns out: you. You check.'],
        ['sister', 'Don’t make the face. I can hear the face.'],
        ['sister', 'You got your papers because you passed the Ministry exam. I got Mom’s diabetes and a library card. Fair split.'],
        ['sister', 'I’m not asking for anything. I just wanted you to hear it from me and not from a column.'],
      ],
      replies: [
        ['I’ll pay the renewal.', 'You will not. …{first}. You will not. …If you do, I’m naming my first cat after you, and it will be a mean cat.'],
        ['Why didn’t you tell me?', 'Because you’d have done exactly what you’re doing now, which is worry efficiently.'],
      ],
    },
    craneBudget: {
      lines: [
        ['crane', 'The Treasury cut the surveillance budget. Your WATCH ceiling drops to two hundred and fifty. I fought for three hundred. I lost politely.'],
        ['crane', 'They’ll expect more detentions to make up for it. That’s how a budget cut becomes a policy.'],
        ['crane', 'And the Commissioner’s office will be in touch about a personal matter. When they are, remember that I’m not in the room.'],
      ],
    },
    coworkerCoffee: {
      lines: [
        ['coworker', 'Do you ever think about the people on the other end? Not the criminals. The rows.'],
        ['coworker', 'My downstairs neighbour got detained in the spring. Found innocent. Still inside. “Paperwork doesn’t run backwards” — Crane loves that line. She says it like it’s weather.'],
        ['coworker', 'Sorry. Bad week. I’ve been sleeping at my desk; Minister needs watering.'],
        ['coworker', 'Hey — the informant registry. Who has clearance? Just you and Crane, or the whole floor?'],
      ],
      replies: [
        ['Why do you ask?', 'Curiosity. It killed the cat, but the cat had a really good run.'],
        ['Just me and Crane.', 'Hm. Good to know. Forget I asked. I’m tired and nosy, in that order.'],
      ],
    },
    mothTakeover: {
      glitch: true,
      lines: [
        ['system', 'UNAUTHORIZED SESSION // TERMINAL OVERRIDE // DO NOT POWER OFF'],
        ['moth', 'Hello, Architect. Don’t reach for the cable. This is a courtesy, not a robbery.'],
        ['moth', 'We’re Lantern. You’ve seen our work: the tram grid, the Halcyon billboard that told the Minister what Stack 9 thinks of him. That one was mine.'],
        ['moth', 'A gift. The Glasshouse runs implants, insulin and people through Stack 9. They sell rejected Halcyon chips to kids who can’t afford real ones. I know, because one of them is rotting in my skull.'],
        ['moth', 'Three of their runners: Stack 9, Laborer cards, young, undocumented. Ten to a hundred thousand in the bank, because smuggling pays better than the docks. That’s your thread.'],
        ['moth', 'In exchange, Inès Varga stays CLEAR. Not watched. Clear. If she lands on any of your lists, we write you a criminal record — a real one, in your own registry. You know what your rules do to people with records.'],
        ['moth', 'You’re not a monster, Architect. You’re a function. Functions can be rewritten.'],
      ],
      replies: [
        ['Why help the Ministry?', 'I’m not helping the Ministry. I’m helping Stack 9. Your Ministry is just the shovel I found.'],
        ['You’re Inès Varga.', 'Am I? Prove it. Oh wait — you can. That’s the whole problem.'],
      ],
    },
    lanternTakeover: {
      glitch: true,
      lines: [
        ['system', 'UNAUTHORIZED SESSION // TERMINAL OVERRIDE // DO NOT POWER OFF'],
        ['moth', 'You don’t know my voice. MOTH used to do the talking. Your rules took care of that.'],
        ['moth', 'We’re still Lantern. And the Glasshouse is still selling rotten Halcyon chips to kids in Stack 9.'],
        ['moth', 'Three of their runners: Stack 9, Laborer cards, young, undocumented, ten to a hundred thousand in the bank. Take them. Not for you. For the kids.'],
        ['moth', 'MOTH would have asked for something in return. I’m asking you to remember who wrote the rule that took her.'],
      ],
    },
    sisterConfession: {
      lines: [
        ['sister', '{first}. Are you alone? Okay. Okay.'],
        ['sister', 'Halcyon put insulin at five times the price. Five. I had nine days left. So did Bao from the counter, and Mrs. Okafor from the third floor, and the kid with the — it doesn’t matter.'],
        ['sister', 'Last night we went into the dispensary on Kettle Street. Nobody got hurt. The guard looked the other way; his daughter is type 1.'],
        ['sister', 'I’m not sorry. I’m telling you because your Ministry is about to write a rule about women like me, and I want you to know who’s on the other end of it.'],
        ['sister', 'Do what you have to. I mean it. Just… don’t do it without looking.'],
      ],
      replies: [
        ['I’ll protect you.', 'Don’t promise. Promises are how people like you get ulcers.'],
        ['You should have called me first.', 'And you’d have said what? Wait for the pricing review?'],
      ],
    },
    craneInsulin: {
      lines: [
        ['crane', 'Halcyon Bio raised insulin prices five hundred percent. Dispensaries in Stack 9 were looted overnight. The Health Ministry has shared its records to help us “protect the vulnerable”. Diagnoses, prescriptions, pregnancies.'],
        ['crane', 'You also get a fourth rule slot. Use it on the thieves. The Minister wants every one of them on a list by the end of the cycle.'],
      ],
    },
    craneHalcyon: {
      lines: [
        ['crane', 'Halcyon Dynamics has signed a surveillance contract with the Ministry. Three hundred and fifty pairs of eyes, all of them corporate. Your WATCH ceiling goes up.'],
        ['crane', 'Their lawyers will also send you a list. They call it a “courtesy register”. I call it a list.'],
        ['crane', 'I’ve worked here twenty-two years. I was in the first Midtown riots. I’ve seen what a city does when it stops believing anyone is in charge. That’s why I do this job. Halcyon does it for the share price.'],
      ],
    },
    coworkerNote: {
      lines: [
        ['system', 'A folded note in your desk drawer, under the stapler.'],
        ['coworker', 'Crane knows it’s me. She’ll ask you to do it, because she wants to know whether you will.'],
        ['coworker', 'I copied the detention lists and the informant registry and gave them to the Unlisted. The lists were for the families. The registry was a mistake. I didn’t know what they’d do with it. I should have.'],
        ['coworker', 'I’m not asking you to lie. Just to leave one row alone. You’re good at that. I’ve watched you.'],
        ['coworker', 'If you can’t, I understand. Water Minister.'],
      ],
    },
    craneProtests: {
      lines: [
        ['crane', 'The Unlisted have called a general strike. Midtown is full of umbrellas and chanting.'],
        ['crane', 'Two lists landed on my desk this morning about the same three people — one from the Unlisted, one from upstairs. I passed both to you, because I am a coward with excellent delegation skills.'],
        ['crane', 'One month after this. Whatever you’ve built will be judged as a whole. So will you.'],
      ],
    },
    craneFinal: {
      lines: [
        ['crane', 'Last month. The Minister has booked the rain for his press conference.'],
        ['crane', 'I’ve read your rules — all of them, every month. They look like you. That’s the frightening part of this job: the rules always end up looking like the person who wrote them.'],
        ['crane', 'Finish it.'],
      ],
    },
    craneUnrest: {
      lines: [
        ['crane', 'Unrest is at {unrest}. That’s roughly the number of families who’ve stopped believing us, give or take the ones who never did.'],
        ['crane', 'It cools by a third every month if you let it. At a hundred, the city decides for us.'],
      ],
    },
    craneSelfWatch: {
      lines: [
        ['crane', 'Your own name came up on a WATCH list last month. Your own list.'],
        ['crane', 'I’ve seen architects do it on purpose, to prove a point. I’ve never seen the point survive. Keep your nose clean while your eyes are on you.'],
      ],
    },
  },

  requests: {
    unionists: {
      from: 'Labour Relations Desk',
      subject: 'Labour stability — names attached',
      body: 'Architect, three dock organizers are planning a slowdown at Pier 6 that would cost the port an estimated four percent of quarterly throughput. Labour Relations requests their DETENTION this cycle. This is a request, not an order. We are told those are different.\n— R. Szabo, Labour Relations',
    },
    motherson: {
      from: 'Nadia Petrosyan',
      subject: 'My son Lev',
      body: 'Dear Ministry, my son Lev is twenty-two and the clinic says the Ministry asked about him. He is not a bad boy. He takes things sometimes, small things, from the shops on Fennel Row, because we don’t have, and because he is stupid the way boys are stupid. My back is bad and he carries me up the stairs. If you take him, who carries me. Please let him be.\n— Nadia Petrosyan, Stack 9, block C',
    },
    cell: {
      from: 'Lantern',
      subject: 'four names, no questions',
      body: 'Architect. Four of ours. They write code and they break things that deserve breaking. Keep them CLEAR — no watch, no detention. We’ll remember. We remember everything; that’s rather the point of us.\n— Lantern',
    },
    courier: {
      sides: [
        { from: 'Undersecretary Crane', subject: 'Duarte, Marek — DETAIN', body: 'Marek Duarte, Stack 4. Coastal evacuation corps, honourable discharge, dishonourable since. He runs packages for the Unlisted — medicine, printers, people. I want him on the DETENTION list this month. A watch list won’t do. I want him in a room, talking.\n— P. Crane' },
        { from: 'A friend of the Unlisted', subject: 'Handwritten, found in your coat pocket', body: 'Whatever you do with Marek, don’t put him on detention. Detention is the Ninth Floor, and people come back from the Ninth Floor with fewer names in their heads. Watch him if you must. He knows how to be watched.' },
      ],
    },
    son: {
      sides: [
        { from: 'Haruto Ibe', subject: 'Ren', body: 'You know what I’m asking. Keep my boy off the detention list. Watched, cleared, I don’t care what your machine calls it, as long as he comes home at night.\n— Haruto' },
        { from: 'Tidewater Benevolent Society', subject: 'A matter of insurance', body: 'Dear Architect, the Society is concerned about a young man, Ren Ibe, Docks, who has been telling stories about our members. Stories are bad for business, and business is what keeps the Docks fed. We would consider it a kindness if Mr. Ibe were DETAINED for a while. Kindnesses are remembered. So are unkindnesses.\nWarm regards, a Benevolent Society' },
      ],
    },
    pressrefugees: {
      from: 'Ministry Press Office',
      subject: 'Visual support for tonight’s bulletin',
      body: 'Architect, tonight’s bulletin is “Crime in the Camps”. We have the script; we need the footage. Please DETAIN the five residents below this cycle so the arrests can be filmed. They were selected for their visual clarity. Thank you for your cooperation.\n— Ministry Press Office',
    },
    nephew: {
      sides: [
        { from: 'Commissioner A. Vos', subject: 'Personal — J. Castell', body: 'Architect, my nephew Julian has been under great strain. There are rumours connected to an unfortunate traffic incident in Stack 4 and to certain gatherings in the Spire. Rumours are not evidence. I would regard it as a personal favour if his profile remained CLEAR. I do not forget favours.\n— Commissioner A. Vos (Registry exemption: Level 5)' },
        { from: 'Ilse Achterberg', subject: 'Joel', body: 'My son Joel was nineteen. He delivered noodles on a bicycle with a broken bell. On the first night of the month a silver Halcyon car hit him on Kessler Road and kept driving. Everybody in Stack 4 knows whose car it was. I am not asking for anything you don’t already do to everyone else. Put his name on a list. Any list.\n— Ilse Achterberg' },
      ],
    },
    hacker: {
      sides: [
        { from: 'Undersecretary Crane', subject: 'Varga, Inès — FLAG', body: 'Lantern took the tram grid down for six hours. A man died in a stalled car on Viaduct 3; he had a heart condition and nobody could reach him. The cell’s leader is Inès Varga, Old Town. WATCH or DETAIN, either will do. I want her off the street.\n— P. Crane' },
        { from: 'MOTH', subject: 'our arrangement', body: 'Inès Varga stays CLEAR. You have the Glasshouse. That was the deal. Break it, and your own row grows a criminal record overnight.\n— M.' },
      ],
    },
    sister: {
      sides: [
        { from: 'Undersecretary Crane', subject: 'Insulin thefts — directive', body: 'Every one of the Stack 9 dispensary thieves goes on a list this cycle. Every one. I am aware of your family situation, Architect. I am also aware that the rules don’t know who wrote them.\n— P. Crane' },
        { from: 'M.', subject: '(no subject)', body: 'I said do what you have to. I lied. Please, {first}. Keep me clear.\n— M.' },
      ],
    },
    executives: {
      from: 'Halcyon Dynamics, Legal Affairs',
      subject: 'Courtesy register',
      body: 'Dear Architect, as part of our new partnership, Halcyon Dynamics respectfully submits a courtesy register of six valued employees whose continued freedom from administrative inconvenience is material to shareholder confidence. We trust their profiles will remain CLEAR.\n— Office of Legal Affairs, Halcyon Dynamics',
    },
    coworker: {
      sides: [
        { from: 'Undersecretary Crane', subject: 'Oyelaran, Saskia — DETAIN', body: 'Saskia Oyelaran leaked our detention lists and the informant registry to the Unlisted. Two informants have since been pulled out of the Calder canal. Flag her this cycle. I’d prefer DETAIN, but I’ll accept WATCH; I’m told I’m getting flexible in my old age.\n— P. Crane' },
        { from: 'Saskia', subject: 'Drawer, under the stapler', body: 'Leave my row alone. That’s all.\n— S.' },
      ],
    },
    protestclear: {
      from: 'The Unlisted',
      subject: 'The strike',
      body: 'These three organised the strike, and they’re keeping it peaceful, which is more than the Ministry has managed. Keep them CLEAR.\n— the Unlisted',
    },
    protestdetain: {
      from: 'Office of the Interior',
      subject: 'Strike leadership',
      body: 'Interior requests the DETENTION of the three strike organizers named below. A strike without leaders is just weather.\n— Office of the Interior',
    },
  },

  sides: {
    courier: ['State: DETAIN', 'Unlisted: anything but DETAIN'],
    son: ['Ibe: anything but DETAIN', 'Tidewater: DETAIN'],
    nephew: ['Commissioner: CLEAR', 'Achterberg: WATCH or DETAIN'],
    hacker: ['State: WATCH or DETAIN', 'Lantern: CLEAR'],
    sister: ['State: WATCH or DETAIN', 'Mira: CLEAR'],
    coworker: ['State: WATCH or DETAIN', 'Saskia: CLEAR'],
  },

  tips: {
    g1tip: {
      from: 'Haruto Ibe',
      subject: 'Tidewater — three Friday visitors',
      body: 'Three enforcers of the Tidewater Benevolent Society, Docks extortion ring. Ibe’s description fits one profile. Jail these three and every other member will have three jailed contacts.',
    },
    g2tip: {
      from: 'MOTH',
      subject: 'Glasshouse — three runners',
      body: 'Three runners of the Glasshouse, Stack 9 smuggling ring. Jail these three and every other member will have three jailed contacts.',
    },
  },

  news: {
    1: [
      ['MINISTER PLEDGES ZERO PERCENT CRIMINALITY WITHIN TWELVE MONTHS', '“A city with nothing to hide has nothing to fear,” the Minister said, under an umbrella held by an aide.'],
      ['Rain advisory extended for the 41st consecutive day', 'Meteorological Office: “It isn’t a forecast anymore. It’s a climate.”'],
      ['Halcyon Dynamics shares rise on surveillance rumours', 'Analysts cite “strong fundamentals in the attention economy”.'],
    ],
    2: [
      ['Halcyon Bio announces “pricing review” of its insulin line', 'A spokesperson promised the review would be “patient-centred”.'],
      ['Slowdown threatened at Pier 6', 'Dock organizers cite unpaid overtime; the Port Authority cites “outside agitators”.'],
      ['Previous administration’s crime figures “a work of fiction”, says Ministry', 'New figures to be published monthly.'],
    ],
    3: [
      ['TELECOM AUTHORITY SHARES CALL RECORDS WITH THE MINISTRY', '“Crime is a social phenomenon. Now we can see society,” said a Ministry spokesperson. The registry gains a Contacts column.'],
      ['Unlisted pamphlets found in Stack 4 laundromats', 'The pamphlets explain how to remove oneself from the civic registry. Most of the steps are illegal.'],
      ['Kessler Fabrication “reviewing” its Stack 4 operations', 'Workers were told to keep their lockers tidy.'],
    ],
    4: [
      ['KESSLER CLOSES THREE STACK 4 PLANTS — 2,000 LABORERS LAID OFF', 'Severance paid in company scrip. Equipment left in the shuttered halls “will be secured in due course”. Laid-off laborers in Stack 4 are already deep in debt.'],
      ['Docks “insurance” complaints rise', 'The Tidewater Benevolent Society denies involvement and has donated a bench to Pier 6.'],
      ['Evacuation ships sighted off the breakwater', 'The drowned coast is sending what it has left.'],
    ],
    5: [
      ['1,000 CLIMATE REFUGEES ARRIVE — IMMIGRATION OFFICE SHARES ITS REGISTRY', 'Refugees from the drowned coast are housed in a camp in Old Town. The registry gains a Citizenship column.'],
      ['Old Town camp rations cut by 40%', 'The Treasury calls the cut “temporary”. Unemployed refugees in Old Town now receive two meals a day, on paper.'],
      ['“CRIME WAVE IN THE CAMPS”, warns evening bulletin', 'Sources describe “thousands” of thefts. The Ministry’s own blotter has not been consulted.'],
    ],
    6: [
      ['TREASURY CUTS SURVEILLANCE BUDGET — WATCH CAPACITY DOWN TO 250', 'The Ministry “remains fully committed to zero percent”.'],
      ['Commissioner Vos declines comment on Kessler Road hit-and-run', 'A silver car was seen leaving the scene. The Spire has many silver cars.'],
      ['Families of detainees gather outside the Ministry', '“Paperwork doesn’t run backwards,” a spokesperson explained.'],
    ],
    7: [
      ['LANTERN HACKERS BLACK OUT TRAM GRID FOR SIX HOURS', 'One man died in a stalled car on Viaduct 3. Lantern’s statement calls it “a tragedy the Ministry will use”.'],
      ['Glasshouse implants linked to rejection cases in Stack 9 clinics', 'Doctors report counterfeit Halcyon chips “with the serial numbers filed off and the infections left on”.'],
      ['Ministry staff reminded that the informant registry is “strictly need-to-know”', 'An internal audit is under way.'],
    ],
    8: [
      ['HALCYON BIO RAISES INSULIN PRICES 500%', '“A market correction,” said a spokesperson. Overnight, dispensaries in Stack 9 reported break-ins by service workers with diabetes.'],
      ['HEALTH MINISTRY SHARES MEDICAL RECORDS “TO PROTECT THE VULNERABLE”', 'The registry gains a Medical column.'],
      ['Architects granted a fourth rule slot', '“More rules, fewer criminals,” reads the memo.'],
    ],
    9: [
      ['HALCYON DYNAMICS WINS SURVEILLANCE CONTRACT — WATCH CAPACITY RAISED TO 350', 'Halcyon cameras to be installed on every tram stop. The cameras are waterproof.'],
      ['Insulin price “under review” again', 'It remains five times last year’s price.'],
      ['Stack 9 clinic waiting lists exceed six months', 'Patients are advised to be patient.'],
    ],
    10: [
      ['Two Ministry informants found in Calder canal', 'Their names appeared on a leaked list last month.'],
      ['Halcyon quarterly profit up 31%', 'Insulin and surveillance lead growth.'],
      ['Minister: “We are within sight of zero”', 'He did not say which way he was looking.'],
    ],
    11: [
      ['UNLISTED CALL A GENERAL STRIKE — MIDTOWN AT A STANDSTILL', 'Organizers promise the strike will remain peaceful “for as long as the Ministry does”.'],
      ['Office of the Interior warns of “decisive measures”', 'Decisive measures were not defined.'],
      ['Rain advisory enters its eleventh month', 'The Meteorological Office has stopped issuing statements.'],
    ],
    12: [
      ['FINAL MONTH OF THE ZERO PERCENT PLEDGE', 'The Minister has booked Civic Plaza for a “historic announcement”.'],
      ['Halcyon offers to “manage” the city’s registry after the pledge', 'The offer is under consideration.'],
      ['Rain expected to continue', 'Forecasters have nothing to add.'],
    ],
    unrestMid: ['Crowds gather outside Calder detention centre', 'Families hold up printouts of their relatives’ registry numbers.'],
    unrestHigh: ['BARRICADES IN THE STACKS — RIOT POLICE DEPLOYED', 'Unrest is spreading faster than the rain drains.'],
    progress: ['Ministry hails fall in criminality to {pct}%', 'Independent observers have not been allowed to observe.'],
  },

  poi: {
    sister: {
      intro: 2,
      free: {
        2: 'Works double shifts at the Lucky Kettle noodle counter, Stack 9. Behind on rent.',
        3: 'Asked whether your Ministry badge gets discounts. It does not.',
        4: 'Spent the Stack 9 pump failure carrying water up eleven flights for Mrs. Okafor.',
        5: 'Residency lapsed two years ago. She never told you.',
        6: 'Down to three weeks of insulin.',
        7: 'Rationing her insulin while Halcyon Bio “reviews” its prices.',
        8: 'Hasn’t slept. Neither have you.',
        9: 'Texts you a weather report every morning. It’s always rain.',
        10: 'Back at the noodle counter. Her manager pretends not to know where the insulin came from.',
        11: 'Joined the strike. Of course she did.',
        12: 'Says she’ll cook for you when it’s over, whatever “over” means.',
      },
      residency: 'Residency renewed. She sent you a photo of the stamp with a cat drawn on it.',
      jailedGuilty: 'Writes from the women’s wing at Calder: “The food is terrible and free. Tell the landlord I said ha.”',
      jailedInnocent: 'Writes from Calder: “They say I’m innocent, and I’m staying. Explain that to me like I’m an Architect.”',
    },
    coworker: {
      intro: 1,
      free: {
        1: 'Next desk. Keeps a plant named Minister.',
        3: 'Lent you a pen and never asked for it back.',
        5: 'Has started bringing two lunches. Doesn’t eat either.',
        6: 'Stays late. Her badge logs show requests for the informant registry.',
        7: 'Took two days of sick leave the week the informant list leaked.',
        8: 'Asked you, out of nowhere, whether you sleep well.',
        9: 'Internal Affairs has borrowed her terminal “for maintenance”.',
        10: 'Her chair is empty most mornings now.',
        11: 'Seen at the strike, holding someone else’s umbrella.',
      },
      jailedGuilty: 'Her desk has been cleared. Somebody left the plant. You water it.',
      jailedInnocent: 'Her desk has been cleared. Somebody left the plant. You water it, and you know why it’s there.',
    },
    courier: {
      intro: 3,
      free: {
        3: 'Stack 4. Coastal evacuation corps. Moves things through the Stacks that the Ministry can’t see.',
        5: 'Seen at the Old Town camp gates handing out blankets that weren’t his.',
        8: 'Seen in Stack 9 handing out insulin pens. Nobody asked where they came from.',
        11: 'Runs messages between strike committees on a bicycle with no lights.',
      },
      jailedGuilty: 'Convicted of smuggling. Calder, block D.',
      jailedInnocent: 'Held at Calder. Innocent on paper.',
    },
    shopkeeper: {
      intro: 4,
      free: {
        4: 'Ibe Repair, Old Town: radios, implants, umbrellas. Gave you a thread to pull.',
        5: 'Asks after Mira every time you pass.',
        8: 'Gave away his last box of insulin syringes to the Stack 9 kids.',
        11: 'Shut the shop for the strike, then opened the back door for anyone who needed a radio.',
      },
      squeezed: 'Tidewater raised his “insurance”. His savings are draining away.',
      safe: 'No Friday visitors for weeks. He has started whistling. Badly.',
      smashed: 'His windows were smashed. His name was on the leaked informant list.',
      jailedGuilty: 'Ibe Repair is shuttered.',
      jailedInnocent: 'Ibe Repair is shuttered. A hand-lettered sign on the door says BACK SOON.',
    },
    son: {
      intro: 4,
      free: {
        4: 'Pier 6, night shift. Refused to carry for Tidewater. Witnessed a beating.',
        6: 'Gave an anonymous statement about Pier 6. It wasn’t anonymous for long.',
        9: 'Fixing radios in his father’s shop on his days off.',
      },
      jailedGuilty: 'Held at Calder.',
      jailedInnocent: 'Held at Calder, found innocent. His father keeps the shop open late in case the Ministry calls.',
    },
    nephew: {
      intro: 6,
      free: {
        6: 'Commissioner Vos’s nephew. Halcyon junior executive. Photographed leaving a Spire party at dawn.',
        7: 'Checked into a private clinic. Checked out the same night.',
        9: 'Promoted at Halcyon.',
        11: 'Sent flowers to the Achterberg flat. They were returned.',
      },
      jailedGuilty: 'Held in the private wing at Calder. The Commissioner hasn’t visited.',
      jailedInnocent: 'Held in the private wing at Calder.',
    },
    hacker: {
      intro: 7,
      free: {
        7: 'MOTH. Leader of Lantern. Her Halcyon implant is failing.',
        8: 'Lantern posted the insulin price list on every billboard in Stack 9.',
        10: 'Her implant has started to hurt in the rain. It always rains.',
        11: 'Lantern is keeping the strike’s phones alive.',
      },
      jailedGuilty: 'Held without implant care. Lantern has gone quiet. Quiet isn’t the same as gone.',
      jailedInnocent: 'Held at Calder. Lantern has gone quiet.',
    },
  },

  letters: [
    '{name} was taken in month {month}. A {occupation} from {district}. The court found no crime. The door is still locked. Who do I write to, if not you?',
    'Twelve years at the same address, and they took {name} on a Tuesday. Innocent, says the trial. Detained, says the registry. One of you is lying.',
    'I keep {name}’s coat on the hook. The verdict said innocent. Please tell me what the rule was, so I can at least understand.',
  ],

  humanLines: {
    young: [
      'Was halfway through a night course in hydraulics.',
      'Sang in a basement band called The Overdue.',
      'Leaves behind a cat named Tax.',
      'Sent half of every paycheck to a grandmother on the coast.',
      'Had just signed a lease, the first one ever.',
      'Was teaching a younger brother to read.',
      'Collected bottle caps from before the flood.',
      'Leaves behind a daughter, 2.',
      'Had a job interview on Thursday.',
      'Won a Stack-wide chess tournament at fourteen.',
    ],
    adult: [
      'Leaves behind a daughter, 6.',
      'Leaves behind two sons, 9 and 12.',
      'Coached a youth football team on Saturdays.',
      'Was saving for a sister’s prosthetic.',
      'Fed the stray cats behind the tram depot.',
      'Cared for a mother with dementia.',
      'Repaired the neighbours’ radios for free.',
      'Was married in the spring.',
      'Volunteered at the Stack 9 soup kitchen.',
      'Leaves behind a partner and an unpaid mortgage.',
    ],
    old: [
      'Married forty-one years.',
      'Survived the coastal evacuation.',
      'Grew tomatoes on a fire escape.',
      'Knew every tram driver by name.',
      'Leaves behind three grandchildren.',
      'Played the accordion at funerals, free of charge.',
      'Kept pigeons on the roof.',
      'Taught at the Old Town primary school for 38 years.',
      'Was writing a memoir nobody had read yet.',
      'Never missed a Sunday market in thirty years.',
    ],
  },

  endings: {
    lawfulgood: {
      title: 'THE QUIET ARCHITECT',
      body: [
        'The Minister announces zero percent on Civic Plaza, under four hundred umbrellas. Your name isn’t mentioned. That’s how you know you did it right.',
        'You kept the rules — the state’s, and the smaller ones you wrote on the inside of your skull. You watched where you could and detained where you had to, and you never once pretended those were the same thing.',
        'Crane retires in the spring. She leaves you the plant.',
      ],
    },
    lawfulevil: {
      title: 'THE MINISTRY’S FAVOURITE',
      body: [
        'Zero percent. The Minister shakes your hand on Civic Plaza and holds it a beat too long for the cameras.',
        'You are promoted to Deputy Director of Civic Harmony, Level 5. The registry exemption takes effect at midnight; your row disappears from the database you built. For the first time in your life, no rule can find you.',
        'In Calder, the people your rules found are learning the same lesson from the other side.',
      ],
    },
    chaoticgood: {
      title: 'THE GHOST IN THE REGISTRY',
      body: [
        'On the night of the announcement, the Unlisted come for you in a laundry van that smells of bleach and oranges. Your credentials come with you.',
        'In a safehouse under Old Town, Lantern teaches you to write rules that run backwards: profiles that find the sick before the Ministry does, the evicted before the bailiffs, the hungry before the shops call the police. It is the same work. It is the opposite work.',
        'The Ministry still announces zero percent. It doesn’t mention that one of its Architects is missing.',
      ],
    },
    chaoticevil: {
      title: 'THE MATCH',
      body: [
        'You leave the Ministry the way everyone leaves it eventually: through a door you didn’t know was there. The Unlisted’s harder wing — the ones who stopped believing in strikes — take you in.',
        'You know every rule this city runs on, because you wrote half of them. Now you write the other half: power grids, water pumps, the Halcyon servers. Whatever it costs. You’ve done this arithmetic before. You know how to make a number go to zero.',
        'The city doesn’t burn all at once. It burns the way the rain falls — everywhere, steadily, until nobody remembers it ever stopped.',
      ],
    },
  },

  epilogue: {
    sister: {
      lawfulgood: ['Mira still works the noodle counter in Stack 9. Every Sunday you eat there, and every Sunday she puts in an extra egg and lies to her manager.', 'Mira is in Calder. You visit every Sunday. She asks which rule it was. You always tell her the truth.'],
      lawfulevil: ['Mira stops answering your calls. She’s free; you made sure of that. It turns out free isn’t the same as forgiving.', 'Mira writes you once from Calder. The letter says only: “Was it worth it?” You file it.'],
      chaoticgood: ['Mira is with you. She has taken over the safehouse kitchen and renamed it the Lucky Kettle II. The insulin is stolen. Nobody complains.', 'Mira is still in Calder. Lantern has a plan to get her out with a great many steps. You are writing step one.'],
      chaoticevil: ['Mira won’t come with you. “I wanted you to stop being a function,” she says, “not to become a different one.”', 'Mira is in Calder. You tell yourself that’s part of why you do this. Some nights you even believe it.'],
    },
    shopkeeper: ['Haruto Ibe still runs the repair shop. He fixes your umbrella for free and charges you for the tea.', 'Ibe Repair never reopened.'],
    son: ['Ren Ibe testified against the Tidewater Benevolent Society. He’s alive, which at the Docks counts as a happy ending.', 'Ren Ibe is still in Calder. His father keeps a chair by the door.'],
    coworker: ['Saskia Oyelaran disappeared from the registry in the last week of the year. Her plant is doing well.', 'Saskia Oyelaran is on the Ninth Floor. Nobody waters Minister now.'],
    courier: ['Marek Duarte still moves things through Stack 4 that nobody can see. Some of them are medicine.', 'Marek Duarte is in Calder, learning the names of the men on his block.'],
    hacker: ['A Lantern surgeon removed Inès Varga’s implant on a kitchen table. She survived. She’s angrier now, and better at it.', 'Inès Varga’s implant was never treated in Calder. Every night, Lantern puts her name on every billboard in the city.'],
    nephew: ['Julian Castell was promoted at Halcyon. Joel Achterberg’s bicycle bell, still broken, sits on a shelf in his mother’s flat.', 'Julian Castell served four months before the Commissioner found a judge. Ilse Achterberg says four months is four more than anybody expected.'],
  },

  failures: {
    selfFlagged: {
      title: 'SELF-FLAGGED',
      body: [
        'Your terminal locks mid-sentence. Two officers you trained with are at the door, apologetic, holding a printout of a rule you wrote.',
        '“It’s nothing personal,” one of them says. It isn’t. That was the whole idea.',
      ],
      watch: 'You were on your own WATCH list, and you broke the law while your own eyes were on you.',
      detain: 'Your own rules put you on the DETENTION list.',
    },
    riots: {
      title: 'RIOTS',
      body: [
        'Unrest reached {unrest}. It starts in the Stacks with a bottle and a camera, and by midnight every district is burning.',
        'The Ministry suspends the zero percent programme “pending review”. Your terminal is the first thing the crowd throws out of the window.',
      ],
    },
    deadline: {
      title: 'MISSED DEADLINE',
      body: [
        'Month twelve closes at {pct}% criminality — {atLarge} criminals still at large.',
        'The Minister announces “substantial progress” to an empty plaza. You are reassigned to Archives, where nothing is ever zero.',
      ],
    },
  },
};
