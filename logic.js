var VLA = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/logic.ts
  var logic_exports = {};
  __export(logic_exports, {
    EMAIL_COACH_TIPS_ES: () => EMAIL_COACH_TIPS_ES,
    EMAIL_PROMPTS: () => EMAIL_PROMPTS,
    EMAIL_WORD_OVER: () => EMAIL_WORD_OVER,
    EMAIL_WORD_TARGET: () => EMAIL_WORD_TARGET,
    ITEMS: () => ITEMS,
    METHOD_STEPS: () => METHOD_STEPS,
    PATTERNS: () => PATTERNS,
    WEAK_PATTERNS: () => WEAK_PATTERNS,
    WHY_OPENER_ES: () => WHY_OPENER_ES,
    capFirst: () => capFirst,
    drawPublicSet: () => drawPublicSet,
    emailById: () => emailById,
    estimateBand: () => estimateBand,
    gradeEmail: () => gradeEmail,
    itemById: () => itemById,
    itemsFromIds: () => itemsFromIds,
    joinSentence: () => joinSentence,
    parseBuild: () => parseBuild,
    patternById: () => patternById,
    presentItem: () => presentItem,
    shuffle: () => shuffle,
    wordCount: () => wordCount
  });

  // ../vla-app/lib/bas-coach/items.ts
  var ROWS = [
    // so-result
    ["so-01", "so-result", "medium", "Why was the concert moved to next month?", "The lead singer [caught] [a cold], [so] [they] [pushed] [the date] back.", "The lead singer caught a cold, so they pushed the date back.", "push", "Causa en pasado (\xABcaught a cold\xBB) + coma + \xABso\xBB + nuevo sujeto (\xABthey\xBB) + verbo en pasado (\xABpushed\xBB). \xABpush\xBB es el distractor: el resto de la historia est\xE1 en pasado."],
    ["so-02", "so-result", "easy", "Why did you study at the caf\xE9 yesterday?", "[the library] [was] [closed], so [we] [studied] there instead.", "The library was closed, so we studied there instead.", "because", "La causa (\xABthe library was closed\xBB) va antes de la coma; despu\xE9s de \xABso\xBB, el resultado con su propio sujeto. \xABbecause\xBB sobra: ya hay \xABso\xBB."],
    ["so-03", "so-result", "easy", "Did you see the start of the lecture?", "No, [my bus] [was] [late], [so] [I] [missed] the first part.", "No, my bus was late, so I missed the first part.", "miss", "Causa (bus late) \u2192 so \u2192 resultado en pasado (\xABmissed\xBB)."],
    ["so-04", "so-result", "medium", "Why is the lab so cold today?", "[the heater] [stopped] [working], [so] [the staff] [called] a technician.", "The heater stopped working, so the staff called a technician.", "because", "La causa es lo que le pas\xF3 al calentador; el resultado es lo que hizo el personal. Cada lado con sujeto + verbo."],
    ["so-05", "so-result", "hard", "What happened with the group project?", "[two members] [got] [sick], so [we] [asked] [for] [an extension].", "Two members got sick, so we asked for an extension.", "ask", "\xABask for\xBB + objeto. El pasado se mantiene en ambos lados de \xABso\xBB."],
    ["so-06", "so-result", "medium", "Why didn't Maya come to the party?", "She [had] [an exam] [the next morning], [so] [she] [stayed] home.", "She had an exam the next morning, so she stayed home.", "stay", "Causa completa con complemento de tiempo, coma, \xABso\xBB + \xABshe stayed\xBB."],
    // cleft-reason
    ["cl-01", "cleft-reason", "medium", "Why were you late this morning?", "The reason why [I was late] [is] [that] [the train] [broke down].", "The reason why I was late is that the train broke down.", "because", "Sujeto largo \xABThe reason why I was late\xBB + verbo \xABis\xBB + \xABthat\xBB + explicaci\xF3n. \xABbecause\xBB sobra (no se dice \xABis because\xBB)."],
    ["cl-02", "cleft-reason", "easy", "Why did you choose this course?", "The reason [why] [I] [chose] [it] [is] [that] it fits my schedule.", "The reason why I chose it is that it fits my schedule.", "because", "Despu\xE9s de \xABwhy\xBB va orden de afirmaci\xF3n: \xABI chose it\xBB. Luego \xABis that\xBB."],
    ["cl-03", "cleft-reason", "medium", "Why was the meeting moved?", "The reason why [we] [moved] [it] [is that] [the room] [was] booked.", "The reason why we moved it is that the room was booked.", "did", "No hay pregunta dentro de la frase, as\xED que \xABdid\xBB sobra: \xABwhy we moved it\xBB."],
    ["cl-04", "cleft-reason", "medium", "Why is the cafeteria closed?", "[the reason] [why] [it] [is closed] [is] [that] the kitchen is being cleaned.", "The reason why it is closed is that the kitchen is being cleaned.", "because", "Abre con \xABThe reason why\xBB; dos \xABis\xBB: uno dentro del sujeto (\xABit is closed\xBB) y el principal antes de \xABthat\xBB."],
    ["cl-05", "cleft-reason", "hard", "Why did Professor Kim cancel class?", "[the reason] [why] [she] [canceled] [class] [is that] she has a conference.", "The reason why she canceled class is that she has a conference.", "because", "Estructura completa: The reason why + she canceled class + is that + explicaci\xF3n."],
    ["cl-06", "cleft-reason", "hard", "Why do you always sit in the front row?", "The reason why [I] [sit] [there] [is] [that] [I can] see the board better.", "The reason why I sit there is that I can see the board better.", "because", "\xABI sit there\xBB es el sujeto interno; \xABis that\xBB introduce la raz\xF3n (\xABI can see\u2026\xBB)."],
    // phrasal-verb
    ["pv-01", "phrasal-verb", "easy", "Who is getting the visitors from the station?", "[I] [can] [pick] [them] [up] at the station.", "I can pick them up at the station.", "picks", "Con pronombre (\xABthem\xBB) la part\xEDcula va al final: \xABpick them up\xBB. Despu\xE9s de \xABcan\xBB, verbo base."],
    ["pv-02", "phrasal-verb", "medium", "What did the band do about the concert date?", "They [pushed] [it] [back] [to] [next month].", "They pushed it back to next month.", "push", "\xABpush it back\xBB = aplazarlo. Pronombre en medio, part\xEDcula despu\xE9s, y pasado (\xABpushed\xBB)."],
    ["pv-03", "phrasal-verb", "easy", "What should I do with the lights?", "Please [turn] [them] [off] [before] [you] leave.", "Please turn them off before you leave.", "turning", "Imperativo + phrasal: \xABturn them off\xBB. \xABturning\xBB no sirve despu\xE9s de \xABPlease\xBB."],
    ["pv-04", "phrasal-verb", "medium", "Did you finish the application form?", "Yes, [I] [filled] [it] [out] [last] night.", "Yes, I filled it out last night.", "fill", "\xABfill it out\xBB con pronombre en medio; pasado por \xABlast night\xBB."],
    ["pv-05", "phrasal-verb", "medium", "Where is your essay?", "[I] [already] [turned] [it] [in] to the professor.", "I already turned it in to the professor.", "turn", "\xABturn it in\xBB = entregarlo. \xABalready\xBB va antes del verbo en pasado."],
    ["pv-06", "phrasal-verb", "hard", "What happened to the soccer game?", "[the coach] [called] [it] [off] [because] [of] the storm.", "The coach called it off because of the storm.", "call", "\xABcall it off\xBB = cancelarlo. \xABbecause of\xBB + sustantivo (\xABthe storm\xBB)."],
    // going-to
    ["gt-01", "going-to", "easy", "When will you contact the professor?", "[I] [am] [going] [to] [email] [her] tonight.", "I am going to email her tonight.", "emailed", "am + going to + verbo base (\xABemail\xBB)."],
    ["gt-02", "going-to", "easy", "Where will we meet the group?", "We [are] [going to] [meet] [them] at the main entrance.", "We are going to meet them at the main entrance.", "will", "\xABwill\xBB sobra: ya tienes \xABare going to\xBB."],
    ["gt-03", "going-to", "medium", "How is Ana getting to the airport?", "[she] [is] [going to] [take] [the bus] this afternoon.", "She is going to take the bus this afternoon.", "takes", "Despu\xE9s de \xABto\xBB siempre forma base: \xABtake\xBB, no \xABtakes\xBB."],
    ["gt-04", "going-to", "medium", "What are your plans for the summer?", "[I'm] [going to] [work] [at] [my uncle's] restaurant.", "I'm going to work at my uncle's restaurant.", "working", "\xABI'm\xBB ya contiene el \xABbe\xBB; luego \xABgoing to work\xBB."],
    ["gt-05", "going-to", "hard", "Is the club doing anything for new students?", "Yes, [we] [are] [going to] [host] [a welcome event] [next] Friday.", "Yes, we are going to host a welcome event next Friday.", "hosting", "Plan decidido: are going to + host. El tiempo (\xABnext Friday\xBB) cierra."],
    ["gt-06", "going-to", "medium", "Are you going to the review session?", "No, [I] [am] [going to] [study] [alone] in my room.", "No, I am going to study alone in my room.", "studied", "Verbo base despu\xE9s de \xABgoing to\xBB."],
    // imperative
    ["im-01", "imperative", "easy", "I twisted my ankle. What should I do?", "[apply] [ice] [to] [the area] [for] fifteen minutes.", "Apply ice to the area for fifteen minutes.", "applying", "Consejo = imperativo: verbo base primero (\xABApply\xBB), luego qu\xE9 (ice), d\xF3nde (to the area) y cu\xE1nto (for fifteen minutes)."],
    ["im-02", "imperative", "easy", "What do I need for the front desk?", "[bring] [your] [student ID] [to] the front desk.", "Bring your student ID to the front desk.", "brings", "Instrucci\xF3n: verbo base sin -s."],
    ["im-03", "imperative", "medium", "Can I leave my bag in the hallway?", "No, [don't] [leave] [it] [in] the hallway.", "No, don't leave it in the hallway.", "not", "Imperativo negativo: \xABdon't\xBB + verbo base."],
    ["im-04", "imperative", "medium", "How do I get to the science building?", "[go] [past] [the library] [and] [turn] left.", "Go past the library and turn left.", "going", "Dos imperativos unidos con \xABand\xBB: \xABGo\u2026 and turn\u2026\xBB."],
    ["im-05", "imperative", "medium", "My laptop keeps freezing. Any advice?", "[restart] [it] [and] [close] [the extra] tabs.", "Restart it and close the extra tabs.", "restarting", "Instrucciones en secuencia: verbo base + objeto, \xABand\xBB, verbo base + objeto."],
    ["im-06", "imperative", "hard", "What should I do before the exam?", "[make sure] [to] [arrive] [at least] [ten minutes] early.", "Make sure to arrive at least ten minutes early.", "arriving", "\xABMake sure to\xBB + verbo base. \xABat least\xBB va antes de la cantidad."],
    // present-perfect
    ["pp-01", "present-perfect", "easy", "How is your essay going?", "[I] [have] [already] [finished] [the first] draft.", "I have already finished the first draft.", "finish", "have + already + participio (\xABfinished\xBB)."],
    ["pp-02", "present-perfect", "medium", "How long has Laura worked at the lab?", "She [has] [worked] [there] [since] January.", "She has worked there since January.", "for", "\xABsince\xBB + punto de inicio (January). \xABfor\xBB ser\xEDa para duraci\xF3n (for five months)."],
    ["pp-03", "present-perfect", "medium", "Do you know the science museum?", "No, [we] [have] [never] [visited] [it] before.", "No, we have never visited it before.", "visit", "\xABnever\xBB entre \xABhave\xBB y el participio."],
    ["pp-04", "present-perfect", "easy", "Is the package here yet?", "Yes, [it] [has] [just] [arrived] at the front desk.", "Yes, it has just arrived at the front desk.", "arrive", "has + just + participio: acaba de pasar."],
    ["pp-05", "present-perfect", "hard", "Have you been to the new gym?", "[I] [have] [gone] [there] [twice] [this] week.", "I have gone there twice this week.", "went", "Participio de \xABgo\xBB = \xABgone\xBB. \xABwent\xBB es pasado simple y no va con \xABhave\xBB."],
    ["pp-06", "present-perfect", "medium", "Can you send me the notes?", "[I] [have] [already] [sent] [them] to your email.", "I have already sent them to your email.", "send", "have + already + sent + objeto."],
    // causative
    ["ca-01", "causative", "medium", "Your jacket fits perfectly. Was it like that when you bought it?", "No, [I] [got] [it] [tailored] [after] I bought it.", "No, I got it tailored after I bought it.", "tailor", "Causativo: got + objeto (\xABit\xBB) + participio (\xABtailored\xBB). Otra persona hizo el arreglo."],
    ["ca-02", "causative", "easy", "Is your laptop working again?", "Yes, [I] [had] [it] [repaired] at the campus shop.", "Yes, I had it repaired at the campus shop.", "repair", "had + it + repaired: lo mand\xE9 a reparar."],
    ["ca-03", "causative", "easy", "Your hair looks different!", "[I] [got] [it] [cut] [yesterday] afternoon.", "I got it cut yesterday afternoon.", "cutting", "got + it + cut (participio de \xABcut\xBB es igual)."],
    ["ca-04", "causative", "hard", "Do the documents need to be in English?", "Yes, [you] [need] [to] [get] [them] [translated] first.", "Yes, you need to get them translated first.", "translate", "need to + get + them + translated."],
    ["ca-05", "causative", "hard", "Why does the car sound better?", "[we] [had] [the engine] [checked] [before] the trip.", "We had the engine checked before the trip.", "check", "had + the engine + checked: un mec\xE1nico lo revis\xF3."],
    ["ca-06", "causative", "medium", "Did you print the posters yourself?", "No, [I] [had] [them] [printed] [at] the copy center.", "No, I had them printed at the copy center.", "myself", "No los imprim\xED yo: \xABhad them printed\xBB. \xABmyself\xBB contradice la respuesta."],
    // must-should
    ["ms-01", "must-should", "hard", "Can I send my passport form by mail, or do I have to go there?", "No, you must [submit] [it] [in person], but [you] [should] [call] [ahead] to confirm the hours.", "No, you must submit it in person, but you should call ahead to confirm the hours.", "to", "Regla = \xABmust submit it in person\xBB; consejo = \xAByou should call ahead\xBB. Nunca \xABto\xBB despu\xE9s de un modal."],
    ["ms-02", "must-should", "easy", "What's the rule in the chemistry lab?", "[students] [must] [wear] [safety glasses] at all times.", "Students must wear safety glasses at all times.", "wearing", "Regla del laboratorio: must + verbo base."],
    ["ms-03", "must-should", "easy", "Any advice for the long exam?", "[you] [should] [bring] [a snack] [and] water.", "You should bring a snack and water.", "to", "Consejo: should + verbo base, sin \xABto\xBB."],
    ["ms-04", "must-should", "medium", "Do visitors need to do anything at the entrance?", "Yes, [all visitors] [must] [sign in] [at] the front desk.", "Yes, all visitors must sign in at the front desk.", "signs", "Obligaci\xF3n: must + sign in (base)."],
    ["ms-05", "must-should", "hard", "Do I have to buy the textbook?", "You [don't] [have to] [buy] [it], but you [should] [borrow] [a copy].", "You don't have to buy it, but you should borrow a copy.", "must", "\xABdon't have to\xBB = no es obligatorio; luego un consejo con \xABshould\xBB. \xABmust\xBB contradice el \xABbut\xBB."],
    ["ms-06", "must-should", "medium", "Can I use my phone during the test?", "No, [phones] [must] [stay] [in] [your bag] during the test.", "No, phones must stay in your bag during the test.", "staying", "Regla del examen: must + stay."],
    // whose
    ["wh-01", "whose", "medium", "Who can tell me about good coffee near campus?", "[talk] [to] [the woman] [whose] [caf\xE9] just opened downtown.", "Talk to the woman whose caf\xE9 just opened downtown.", "who", "Imperativo \xABTalk to the woman\xBB + \xABwhose caf\xE9\xBB (el caf\xE9 de ella). \xABwhose\xBB va pegado a \xABcaf\xE9\xBB."],
    ["wh-02", "whose", "easy", "Who did you meet at the orientation?", "I [met] [a student] [whose] [brother] [teaches] here.", "I met a student whose brother teaches here.", "who's", "\xABwhose brother\xBB = cuyo hermano. \xABwho's\xBB = who is."],
    ["wh-03", "whose", "hard", "Who is visiting campus this week?", "[the author] [whose] [book] [we] [read] is visiting campus.", "The author whose book we read is visiting campus.", "who", "Sujeto largo: The author whose book we read + is visiting campus."],
    ["wh-04", "whose", "medium", "Which professor do you recommend?", "[I] [recommend] [the one] [whose] [lectures] [are] recorded.", "I recommend the one whose lectures are recorded.", "who", "\xABthe one whose lectures\xBB = aquel cuyas clases."],
    ["wh-05", "whose", "hard", "Who won the photo contest?", "[the student] [whose] [photo] [showed] [the old bridge] won first prize.", "The student whose photo showed the old bridge won first prize.", "her", "No uses \xABher photo\xBB: \xABwhose\xBB ya expresa posesi\xF3n."],
    ["wh-06", "whose", "medium", "Who can sublet me a room?", "Ask [the guy] [whose] [lease] [ends] [in] June.", "Ask the guy whose lease ends in June.", "who's", "\xABwhose lease\xBB = cuyo contrato. \xABwho's\xBB no expresa posesi\xF3n."],
    // passive
    ["pa-01", "passive", "easy", "Why can't we use the gym today?", "[the equipment] [is] [being] [inspected] for safety.", "The equipment is being inspected for safety.", "been", "Pasiva progresiva: is being + participio."],
    ["pa-02", "passive", "easy", "When will we know our grades?", "[the results] [will] [be] [posted] on Friday.", "The results will be posted on Friday.", "post", "will be + participio (\xABposted\xBB)."],
    ["pa-03", "passive", "medium", "The library looks new!", "Yes, [it] [was] [renovated] [last] year.", "Yes, it was renovated last year.", "renovate", "Pasiva en pasado: was + participio (\xABrenovated\xBB). Lo renov\xF3 alguien, no la biblioteca."],
    ["pa-04", "passive", "hard", "Is the conference room free?", "No, [it] [has] [been] [reserved] [by] the dean's office.", "No, it has been reserved by the dean's office.", "being", "has been + participio + by (qui\xE9n lo hizo)."],
    // indirect-question
    ["iq-01", "indirect-question", "medium", "I'm new here and I can't find the group.", "[do] [you] [know] [where] [the meeting] [is]?", "Do you know where the meeting is?", "does", "Despu\xE9s de \xABwhere\xBB: sujeto + verbo (\xABthe meeting is\xBB)."],
    ["iq-02", "indirect-question", "medium", "The bookstore changed its hours.", "I wonder [when] [it] [opens] [on] Saturdays.", "I wonder when it opens on Saturdays.", "does", "Pregunta indirecta: sin \xABdoes\xBB, y termina en punto."],
    ["iq-03", "indirect-question", "easy", "I need to catch the shuttle.", "[can] [you] [tell me] [what time] [the shuttle] leaves?", "Can you tell me what time the shuttle leaves?", "does", "\xABwhat time the shuttle leaves\xBB: orden de afirmaci\xF3n."],
    ["iq-04", "indirect-question", "hard", "Did the professor explain the project?", "Not really. [I'm] [not sure] [what] [she] [wants] [us] to do.", "Not really. I'm not sure what she wants us to do.", "does", "\xABwhat she wants us to do\xBB: sin auxiliar."],
    // comparative
    ["co-01", "comparative", "easy", "How is the new dorm?", "[it] [is] [much] [quieter] [than] the old one.", "It is much quieter than the old one.", "more", "\xABquieter\xBB ya es comparativo; \xABmore\xBB sobra."],
    ["co-02", "comparative", "medium", "Should I take the highway?", "No, [this route] [is] [more] [convenient] [than] the highway.", "No, this route is more convenient than the highway.", "that", "Comparaci\xF3n con \xABthan\xBB, no \xABthat\xBB."],
    ["co-03", "comparative", "medium", "How was the workshop?", "[it] [was] [the most] [useful] [workshop] I have taken.", "It was the most useful workshop I have taken.", "more", "Superlativo: the most + adjetivo + sustantivo."],
    ["co-04", "comparative", "hard", "Which caf\xE9 is better?", "[the one] [on] [Main Street] [is] [cheaper] [than] this one.", "The one on Main Street is cheaper than this one.", "more", "Sujeto \xABThe one on Main Street\xBB + is + cheaper than."],
    // not-only
    ["no-01", "not-only", "easy", "Is the course worth it?", "Yes, [it] [is] [not only] [free] [but also] very practical.", "Yes, it is not only free but also very practical.", "and", "Paralelismo: dos adjetivos (free / practical)."],
    ["no-02", "not-only", "medium", "What does Ms. Ortiz do?", "She [not only] [teaches] [chemistry] [but also] [coaches] the team.", "She not only teaches chemistry but also coaches the team.", "too", "Dos verbos paralelos: teaches\u2026 / coaches\u2026."],
    ["no-03", "not-only", "medium", "Why do you like that app?", "[it] [helps] [me] [not only] [plan] [but also] track my study time.", "It helps me not only plan but also track my study time.", "and", "Paralelo: plan / track."],
    ["no-04", "not-only", "hard", "Did the internship help?", "[it] [gave] [me] [not only] [experience] [but also] a strong reference.", "It gave me not only experience but also a strong reference.", "as well", "Dos sustantivos paralelos: experience / a strong reference."],
    // inversion
    ["in-01", "inversion", "hard", "When did you finally understand the topic?", "Only after the lecture ended [did] [I] [understand] [the topic].", "Only after the lecture ended did I understand the topic.", "understood", "Tras \xABOnly after\u2026\xBB inversi\xF3n: did + I + verbo base."],
    ["in-02", "inversion", "hard", "Is the library always this crowded?", "No. [never] [have] [I] [seen] [it] this crowded.", "No. Never have I seen it this crowded.", "saw", "\xABNever\xBB al inicio \u2192 have I + participio."],
    ["in-03", "inversion", "medium", "Is the shuttle reliable?", "Not at all. [rarely] [does] [it] [arrive] on time.", "Not at all. Rarely does it arrive on time.", "arrives", "\xABRarely\xBB al inicio \u2192 does + it + verbo base."],
    ["in-04", "inversion", "hard", "When will they announce the winner?", "Only when [all the votes] [are] [counted] [will] [they] announce it.", "Only when all the votes are counted will they announce it.", "do", "Primero la condici\xF3n normal, luego la inversi\xF3n: will they announce."],
    // conditional
    ["cd-01", "conditional", "easy", "Can I leave after I finish?", "Yes, if you [finish] [early], [you can] [leave] [the room].", "Yes, if you finish early, you can leave the room.", "will finish", "Condici\xF3n en presente (finish), no \xABwill finish\xBB."],
    ["cd-02", "conditional", "medium", "Will you join the club?", "If [I] [had] [more time], [I would] [join] [it].", "If I had more time, I would join it.", "have", "Hip\xF3tesis: if + pasado (had), would + base."],
    ["cd-03", "conditional", "easy", "What if it rains tomorrow?", "If [it] [rains] [tomorrow], [we] [will] [meet] inside.", "If it rains tomorrow, we will meet inside.", "will rain", "Tipo 1: if + presente, will + base."],
    ["cd-04", "conditional", "hard", "Can I take the exam later?", "You can, [as long as] [you] [bring] [a note] [from] the clinic.", "You can, as long as you bring a note from the clinic.", "will bring", "\xABas long as\xBB funciona como \xABif\xBB: presente, no \xABwill\xBB."],
    // gerund-infinitive
    ["gi-01", "gerund-infinitive", "easy", "Where do you like to study?", "I [enjoy] [studying] [in] [the quiet] room.", "I enjoy studying in the quiet room.", "to study", "El verbo \xABenjoy\xBB siempre va seguido de -ing (\xABstudying\xBB), nunca de \xABto study\xBB."],
    ["gi-02", "gerund-infinitive", "easy", "Why is Sara in a different class?", "She [decided] [to] [change] [her] major.", "She decided to change her major.", "changing", "\xABdecide\xBB + to + base."],
    ["gi-03", "gerund-infinitive", "medium", "Is Tom joining any clubs?", "[he] [is] [interested] [in] [joining] the debate club.", "He is interested in joining the debate club.", "join", "Despu\xE9s de preposici\xF3n (\xABin\xBB) \u2192 -ing."],
    ["gi-04", "gerund-infinitive", "hard", "What did your advisor suggest?", "She [suggested] [taking] [a lighter] [schedule] [next] semester.", "She suggested taking a lighter schedule next semester.", "to take", "El verbo \xABsuggest\xBB va con -ing: \xABsuggested taking\xBB, no \xABsuggested to take\xBB."],
    // too-enough
    ["te-01", "too-enough", "easy", "Why did they move the talk?", "[the room] [was] [too] [small] [to hold] everyone.", "The room was too small to hold everyone.", "very", "too + adjetivo + to + verbo: consecuencia negativa."],
    ["te-02", "too-enough", "easy", "Is the hall OK for the event?", "Yes, [it] [is] [big] [enough] [for] the event.", "Yes, it is big enough for the event.", "too", "\xABenough\xBB va DESPU\xC9S del adjetivo: \xABbig enough\xBB, no \xABenough big\xBB."],
    ["te-03", "too-enough", "medium", "Can we start the workshop?", "Not yet. [we] [don't] [have] [enough] [chairs] for everyone.", "Not yet. We don't have enough chairs for everyone.", "too", "Con sustantivo, \xABenough\xBB va ANTES: \xABenough chairs\xBB. \xABtoo\xBB no funciona con un sustantivo."],
    ["te-04", "too-enough", "hard", "Did you finish the reading?", "No, [it] [was] [too] [long] [to finish] [in] one night.", "No, it was too long to finish in one night.", "enough", "too long to finish = demasiado largo para terminarlo."],
    // prep-time
    ["pt-01", "prep-time", "easy", "When is the essay due?", "[it] [is] [due] [by] [noon] [on] Friday.", "It is due by noon on Friday.", "in", "by = a m\xE1s tardar; on + d\xEDa."],
    ["pt-02", "prep-time", "medium", "How late is the lab open?", "[it] [is] [open] [until] [nine] [in] the evening.", "It is open until nine in the evening.", "at", "until = hasta; in the evening."],
    ["pt-03", "prep-time", "easy", "When does our next class start?", "[it] [starts] [at] [ten] [on] Monday.", "It starts at ten on Monday.", "in", "\xABat\xBB con la hora (\xABat ten\xBB) y \xABon\xBB con el d\xEDa (\xABon Monday\xBB). \xABin\xBB ser\xEDa para meses o a\xF1os."],
    ["pt-04", "prep-time", "hard", "When will the renovations be finished?", "[they] [should] [be] [done] [by] [the end] of May.", "They should be done by the end of May.", "until", "Fecha l\xEDmite \u2192 \xABby\xBB, no \xABuntil\xBB."]
  ];
  var ITEMS = ROWS.map(([id, pattern, difficulty, prompt, build, sentence, distractor, explainEs]) => ({
    id,
    pattern,
    difficulty,
    prompt,
    build,
    sentence,
    distractor,
    explainEs
  }));
  function parseBuild(build) {
    const segments = [];
    const chips = [];
    const re = /\[([^\]]+)\]/g;
    let last = 0;
    let m;
    while (m = re.exec(build)) {
      if (m.index > last) segments.push({ kind: "fixed", text: build.slice(last, m.index) });
      segments.push({ kind: "slot", index: chips.length });
      chips.push(m[1]);
      last = m.index + m[0].length;
    }
    if (last < build.length) segments.push({ kind: "fixed", text: build.slice(last) });
    return { segments, chips };
  }
  function capFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function joinSentence(segments, filled) {
    const raw = segments.map((s) => {
      var _a;
      return s.kind === "fixed" ? s.text : (_a = filled[s.index]) != null ? _a : "___";
    }).join("");
    return raw.replace(/\s+/g, " ").trim().replace(/(^|[.!?]\s+)([a-z])/g, (_m, pre, ch) => pre + ch.toUpperCase());
  }
  function itemById(id) {
    return ITEMS.find((i) => i.id === id);
  }

  // ../vla-app/lib/bas-coach/patterns.ts
  var PATTERNS = [
    {
      id: "so-result",
      name: "Result clause with so",
      titleEs: "Causa + so + resultado",
      weak: true,
      explainEs: "\xABSo\xBB une dos oraciones completas: primero la causa, despu\xE9s la consecuencia. Cada lado necesita su propio sujeto y su propio verbo. La coma va antes de \xABso\xBB.",
      formula: "Subject + verb (cause), so + subject + verb (result).",
      examples: [
        "The lead singer caught a cold, so the band pushed the concert back.",
        "The library was closed, so we studied at the caf\xE9.",
        "My bus was late, so I missed the first part of the lecture."
      ],
      mistakesEs: [
        "Poner \xABso\xBB al inicio de la causa (\xABSo the singer caught a cold\u2026\xBB): en ingl\xE9s \xABso\xBB introduce el resultado, no la causa.",
        "Olvidar el segundo sujeto: \xAB\u2026so pushed the date back\xBB est\xE1 mal; falta \xABthey\xBB.",
        "Confundir \xABso\xBB (por eso) con \xABbecause\xBB (porque): cambian el orden de causa y efecto."
      ],
      signals: ["so", "as a result", "that's why", "therefore", "because (orden inverso)"],
      distractorEs: "El verbo en forma base (\xABpush\xBB en vez de \xABpushed\xBB) o \xABbecause\xBB en lugar de \xABso\xBB.",
      opener: {
        ruleEs: "Empieza por la CAUSA con su sujeto real (qui\xE9n o qu\xE9 provoc\xF3 el problema). \xABSo\xBB nunca abre la oraci\xF3n en estas respuestas: va en el medio.",
        examples: [
          { good: "The lead singer caught a cold, so\u2026", bad: "So the lead singer\u2026", whyEs: "La pregunta pide qu\xE9 pas\xF3; primero va el hecho (la causa) y luego \xABso\xBB con la consecuencia." },
          { good: "It started raining, so\u2026", bad: "Because it started raining, so\u2026", whyEs: "En ingl\xE9s no se usan \xABbecause\xBB y \xABso\xBB juntos en la misma oraci\xF3n; elige uno." },
          { good: "The printer was broken, so I\u2026", bad: "The printer broken, so\u2026", whyEs: "La causa necesita verbo conjugado (\xABwas\xBB). Sin verbo no hay oraci\xF3n y el slot queda descuadrado." }
        ]
      }
    },
    {
      id: "cleft-reason",
      name: "Cleft: The reason why\u2026 is that\u2026",
      titleEs: "La raz\xF3n por la que\u2026 es que\u2026",
      weak: true,
      explainEs: "Es una oraci\xF3n \xABhendida\xBB: el sujeto completo es \xABThe reason why + sujeto + verbo\xBB y el verbo principal es \xABis\xBB. Despu\xE9s viene \xABthat\xBB + la explicaci\xF3n completa.",
      formula: "The reason why + subject + verb + is that + subject + verb.",
      examples: [
        "The reason why I was late is that the train broke down.",
        "The reason why she chose this course is that it fits her schedule.",
        "The reason why we moved the meeting is that the room was booked."
      ],
      mistakesEs: [
        "Traducir \xABla raz\xF3n es porque\xBB \u2192 \xABthe reason is because\xBB. En TOEFL lo correcto es \xABis that\xBB.",
        "Invertir sujeto y verbo despu\xE9s de \xABwhy\xBB como si fuera pregunta: \xABThe reason why was I late\xBB est\xE1 mal.",
        "Olvidar el \xABis\xBB principal: \xABThe reason why I was late that the train\u2026\xBB."
      ],
      signals: ["the reason why", "is that", "this is why", "that's because"],
      distractorEs: "\xABbecause\xBB (tentaci\xF3n de \xABis because\xBB) o un auxiliar de pregunta como \xABdid\xBB.",
      opener: {
        ruleEs: "Abre con \xABThe reason why\xBB y enseguida sujeto + verbo en orden de afirmaci\xF3n. Ese bloque completo es el sujeto; el verbo principal \xABis\xBB llega despu\xE9s.",
        examples: [
          { good: "The reason why I was late is that\u2026", bad: "The reason why was I late\u2026", whyEs: "Despu\xE9s de \xABwhy\xBB aqu\xED no hay pregunta: el orden es sujeto + verbo (\xABI was\xBB)." },
          { good: "The reason why they canceled it is that\u2026", bad: "The reason is because they\u2026", whyEs: "\xABis because\xBB es redundante; el TOEFL premia \xABis that\xBB." },
          { good: "The reason why she applied is that\u2026", bad: "Why she applied the reason is\u2026", whyEs: "La frase hendida siempre arranca con \xABThe reason\xBB; empezar por \xABWhy\xBB rompe la estructura." }
        ]
      }
    },
    {
      id: "phrasal-verb",
      name: "Phrasal verbs + object",
      titleEs: "Phrasal verbs con objeto",
      weak: true,
      explainEs: "En los phrasal verbs separables, si el objeto es un pronombre (it, them, her) va SIEMPRE entre el verbo y la part\xEDcula: \xABpick them up\xBB, nunca \xABpick up them\xBB. Si es un sustantivo, puede ir en medio o al final.",
      formula: "Subject + verb + object pronoun + particle (pick them up / push it back).",
      examples: [
        "I can pick them up at the station after class.",
        "The band pushed the date back to next month.",
        "Please turn it off before you leave the lab."
      ],
      mistakesEs: [
        "\xABpick up them\xBB o \xABturn off it\xBB: con pronombre la part\xEDcula va al final.",
        "Separar la part\xEDcula del verbo con muchas palabras (\xABpick at the station them up\xBB).",
        "Usar la preposici\xF3n equivocada (\xABpush the date after\xBB)."
      ],
      signals: ["up", "back", "off", "out", "down", "over"],
      distractorEs: "La forma base del verbo (\xABpush\xBB por \xABpushed\xBB) o una part\xEDcula falsa (\xABafter\xBB, \xABon\xBB).",
      opener: {
        ruleEs: "Empieza por el sujeto (I, she, the band) + el verbo conjugado. Luego el objeto y al final la part\xEDcula. Si ves un pronombre objeto entre las fichas, ya sabes que va en el medio.",
        examples: [
          { good: "I will pick them up\u2026", bad: "Them I will pick up\u2026", whyEs: "En ingl\xE9s el objeto no abre la oraci\xF3n; el orden fijo es sujeto + verbo + objeto." },
          { good: "They pushed the date back\u2026", bad: "Pushed they the date back\u2026", whyEs: "El verbo nunca va antes del sujeto en una afirmaci\xF3n." },
          { good: "She turned it off\u2026", bad: "She turned off it\u2026", whyEs: "Con pronombre (\xABit\xBB) la part\xEDcula \xABoff\xBB queda al final." }
        ]
      }
    },
    {
      id: "going-to",
      name: "be going to + infinitive",
      titleEs: "Futuro con going to",
      weak: true,
      explainEs: "Para planes ya decididos: sujeto + am/is/are + going to + verbo base. El verbo despu\xE9s de \xABto\xBB va en forma base, nunca con -s, -ed ni -ing.",
      formula: "Subject + am/is/are + going to + base verb.",
      examples: [
        "I am going to email the professor tonight.",
        "We are going to meet at the main entrance.",
        "She is going to take the bus to the airport."
      ],
      mistakesEs: [
        "Olvidar el verbo \xABbe\xBB: \xABI going to email\xBB.",
        "Poner el verbo conjugado: \xABgoing to emailed\xBB.",
        "Separar \xABgoing\xBB y \xABto\xBB con otras palabras."
      ],
      signals: ["tonight", "tomorrow", "next week", "this weekend", "plan"],
      distractorEs: "\xABwill\xBB (sobra con going to) o el verbo con -ing / -ed.",
      opener: {
        ruleEs: "Abre con el sujeto y pega inmediatamente el \xABbe\xBB (am/is/are). El bloque \xABgoing to\xBB va justo despu\xE9s, y despu\xE9s el verbo base.",
        examples: [
          { good: "I am going to\u2026", bad: "Going to I am\u2026", whyEs: "\xABGoing to\xBB no puede abrir una afirmaci\xF3n; el sujeto va primero." },
          { good: "We are going to\u2026", bad: "We going to are\u2026", whyEs: "El auxiliar \xABare\xBB va antes de \xABgoing\xBB." },
          { good: "She is going to take\u2026", bad: "She is going to takes\u2026", whyEs: "Despu\xE9s de \xABto\xBB siempre forma base." }
        ]
      }
    },
    {
      id: "imperative",
      name: "Imperative",
      titleEs: "Imperativo (instrucciones)",
      weak: true,
      explainEs: "Para dar instrucciones o consejos: la oraci\xF3n empieza con el verbo base, sin sujeto. El complemento (qu\xE9, d\xF3nde, cu\xE1nto tiempo) va despu\xE9s.",
      formula: "Base verb + object + place/time. (Don't + base verb\u2026)",
      examples: [
        "Apply ice to the area for fifteen minutes.",
        "Bring your student ID to the front desk.",
        "Don't leave your bag in the hallway."
      ],
      mistakesEs: [
        "Agregar \xAByou\xBB al inicio sin necesidad, o \xABto\xBB antes del verbo (\xABTo apply ice\u2026\xBB).",
        "Poner el tiempo antes del objeto (\xABApply for fifteen minutes ice\xBB).",
        "Usar el verbo con -s o -ing (\xABApplies\xBB, \xABApplying\xBB)."
      ],
      signals: ["please", "make sure", "don't", "remember to", "for + tiempo"],
      distractorEs: "El verbo con -ing o -s (\xABapplying\xBB, \xABapplies\xBB) o un sujeto que sobra.",
      opener: {
        ruleEs: "Si la pregunta pide un consejo o instrucci\xF3n (\xABWhat should I do?\xBB), la primera ficha es el VERBO base. Busca la ficha que es solo un verbo sin -s ni -ing.",
        examples: [
          { good: "Apply ice to the area\u2026", bad: "Applying ice to the area\u2026", whyEs: "Una instrucci\xF3n arranca con el verbo base; \xABapplying\xBB deja la oraci\xF3n sin verbo principal." },
          { good: "Bring your ID\u2026", bad: "You bring your ID\u2026", whyEs: "\xABYou bring\xBB suena a descripci\xF3n, no a instrucci\xF3n, y deja una ficha de m\xE1s." },
          { good: "Don't leave your bag\u2026", bad: "Not leave your bag\u2026", whyEs: "La negaci\xF3n del imperativo es \xABDon't\xBB + verbo base." }
        ]
      }
    },
    {
      id: "present-perfect",
      name: "Present perfect",
      titleEs: "Presente perfecto",
      weak: true,
      explainEs: "Have/has + participio pasado. Se usa para experiencias, acciones recientes o algo que empez\xF3 en el pasado y sigue (\xABfor\xBB, \xABsince\xBB). \xABAlready\xBB, \xABjust\xBB, \xABnever\xBB van entre have y el participio.",
      formula: "Subject + have/has (+ already/just/never) + past participle.",
      examples: [
        "I have already finished the first draft.",
        "She has worked at the lab since January.",
        "We have never visited the science museum."
      ],
      mistakesEs: [
        "Usar el pasado simple en vez del participio (\xABhave went\xBB \u2192 \xABhave gone\xBB).",
        "Poner \xABalready\xBB al final o antes de \xABhave\xBB cuando hay fichas para el medio.",
        "Confundir \xABfor\xBB (duraci\xF3n) con \xABsince\xBB (punto de inicio)."
      ],
      signals: ["already", "just", "yet", "ever", "never", "since", "for"],
      distractorEs: "El pasado simple (\xABwent\xBB, \xABwrote\xBB) en lugar del participio (\xABgone\xBB, \xABwritten\xBB), o \xABdid\xBB.",
      opener: {
        ruleEs: "Abre con el sujeto + have/has. Si hay \xABalready\xBB, \xABjust\xBB o \xABnever\xBB, van justo despu\xE9s de have/has y antes del participio.",
        examples: [
          { good: "I have already finished\u2026", bad: "Already I have finished\u2026", whyEs: "En la respuesta corta del TOEFL, \xABalready\xBB va dentro del verbo, no al inicio." },
          { good: "She has worked here since\u2026", bad: "She worked has here\u2026", whyEs: "\xABhas\xBB va antes del participio." },
          { good: "We have never seen\u2026", bad: "We have never saw\u2026", whyEs: "Despu\xE9s de have/has va participio (\xABseen\xBB), no pasado simple." }
        ]
      }
    },
    {
      id: "causative",
      name: "Causative get / have something done",
      titleEs: "Causativo: get/have + objeto + participio",
      weak: true,
      explainEs: "Para decir que OTRA persona hizo el trabajo por ti: get/have + el objeto + participio. \xABI got it tailored\xBB = lo mand\xE9 a arreglar (no lo cos\xED yo).",
      formula: "Subject + get/have + object + past participle.",
      examples: [
        "I got it tailored after I bought it.",
        "She had her laptop repaired at the campus shop.",
        "We need to get the documents translated."
      ],
      mistakesEs: [
        "Poner el participio antes del objeto (\xABI got tailored it\xBB).",
        "Usar el verbo base (\xABI got it tailor\xBB).",
        "Pensar que el sujeto hizo la acci\xF3n: el sujeto solo la encarg\xF3."
      ],
      signals: ["got", "had", "get", "repaired", "fixed", "cut", "tailored", "checked"],
      distractorEs: "El verbo base sin -ed (\xABtailor\xBB, \xABrepair\xBB) o \xABmyself\xBB.",
      opener: {
        ruleEs: "Abre con el sujeto + get/got/have/had. Luego el objeto (it, my car, the jacket) y al final el participio. Si una ficha es \xABit\xBB y otra termina en -ed, el pronombre va en el medio.",
        examples: [
          { good: "I got it tailored\u2026", bad: "I got tailored it\u2026", whyEs: "El objeto (\xABit\xBB) va entre \xABgot\xBB y el participio." },
          { good: "She had her phone fixed\u2026", bad: "She fixed had her phone\u2026", whyEs: "\xABhad\xBB va primero; el participio cierra el bloque." },
          { good: "We should get the car checked\u2026", bad: "We should get check the car\u2026", whyEs: "Despu\xE9s del objeto va participio (\xABchecked\xBB), no verbo base." }
        ]
      }
    },
    {
      id: "must-should",
      name: "must vs should",
      titleEs: "Must (obligaci\xF3n) vs should (consejo)",
      weak: true,
      explainEs: "\xABMust\xBB expresa una regla u obligaci\xF3n; \xABshould\xBB un consejo. Ambos van seguidos de verbo base. En una respuesta con \xABbut\xBB, la obligaci\xF3n suele ir primero y el consejo despu\xE9s.",
      formula: "Subject + must/should + base verb (\u2026, but + subject + should + base verb).",
      examples: [
        "You must submit it in person, but you should call ahead to confirm the hours.",
        "Students must wear a badge in the lab.",
        "You should bring a snack because the exam is long."
      ],
      mistakesEs: [
        "\xABmust to submit\xBB / \xABshould to call\xBB: nunca \xABto\xBB despu\xE9s del modal.",
        "Usar \xABmust\xBB para un simple consejo amable.",
        "Conjugar el verbo despu\xE9s del modal (\xABshould calls\xBB)."
      ],
      signals: ["required", "rule", "it's a good idea", "but", "in person", "ahead"],
      distractorEs: "\xABto\xBB extra o el verbo con -s despu\xE9s del modal.",
      opener: {
        ruleEs: "Abre con el sujeto + el modal (You must / You should). Lee la pregunta: si habla de un requisito, empieza con \xABmust\xBB; si pide consejo, con \xABshould\xBB.",
        examples: [
          { good: "You must submit it in person, but\u2026", bad: "You should submit it in person, but you must\u2026", whyEs: "La obligaci\xF3n (la regla de la oficina) va con \xABmust\xBB; el consejo (llamar antes) con \xABshould\xBB." },
          { good: "You should call ahead\u2026", bad: "You should to call ahead\u2026", whyEs: "Nunca \xABto\xBB despu\xE9s de un modal." },
          { good: "Visitors must sign in\u2026", bad: "Must visitors sign in\u2026", whyEs: "Modal antes del sujeto convierte la frase en pregunta." }
        ]
      }
    },
    {
      id: "whose",
      name: "Relative clause with whose",
      titleEs: "Relativo \xABwhose\xBB (cuyo/cuya)",
      weak: true,
      explainEs: "\xABWhose\xBB indica posesi\xF3n y SIEMPRE va pegado a un sustantivo: \xABthe woman whose caf\xE9\u2026\xBB. Luego viene el verbo de esa cl\xE1usula.",
      formula: "Noun + whose + noun + verb \u2026",
      examples: [
        "Talk to the woman whose caf\xE9 just opened downtown.",
        "I met a student whose brother teaches here.",
        "The author whose book we read is visiting campus."
      ],
      mistakesEs: [
        "Usar \xABwho's\xBB (who is) en lugar de \xABwhose\xBB.",
        "Usar \xABwho\xBB + \xABher\xBB (\xABthe woman who her caf\xE9\u2026\xBB), calco del espa\xF1ol.",
        "Separar \xABwhose\xBB de su sustantivo."
      ],
      signals: ["whose", "the person whose", "a company whose"],
      distractorEs: "\xABwho\xBB o \xABwho's\xBB en lugar de \xABwhose\xBB, o un posesivo extra (\xABher\xBB).",
      opener: {
        ruleEs: "Primero la oraci\xF3n principal (Talk to the woman / I met a student). \xABWhose\xBB nunca abre la respuesta: va justo despu\xE9s de la persona o cosa a la que pertenece algo.",
        examples: [
          { good: "Talk to the woman whose caf\xE9\u2026", bad: "Whose caf\xE9 talk to the woman\u2026", whyEs: "\xABWhose\xBB describe a \xABthe woman\xBB, as\xED que va inmediatamente despu\xE9s de ella." },
          { good: "I know a guy whose sister\u2026", bad: "I know a guy who his sister\u2026", whyEs: "\xABwho his\xBB es un calco del espa\xF1ol (\xABque su\xBB); en ingl\xE9s es \xABwhose\xBB." },
          { good: "The professor whose class I took\u2026", bad: "The professor who's class\u2026", whyEs: "\xABwho's\xBB = \xABwho is\xBB. Para posesi\xF3n, \xABwhose\xBB." }
        ]
      }
    },
    {
      id: "passive",
      name: "Passive voice",
      titleEs: "Voz pasiva",
      weak: false,
      explainEs: "Se usa cuando importa la acci\xF3n y no qui\xE9n la hace: be (en el tiempo correcto) + participio. \xABis being inspected\xBB = est\xE1 siendo inspeccionado ahora.",
      formula: "Subject + be (is/was/is being/has been) + past participle (+ by \u2026).",
      examples: [
        "The equipment is being inspected for safety.",
        "The results will be posted on Friday.",
        "The library was renovated last year."
      ],
      mistakesEs: [
        "Olvidar \xABbe\xBB: \xABThe equipment inspected for safety\xBB.",
        "Poner el verbo base (\xABis being inspect\xBB).",
        "Confundir \xABbeing\xBB y \xABbeen\xBB."
      ],
      signals: ["by", "is being", "has been", "will be", "was"],
      distractorEs: "\xABbeen\xBB por \xABbeing\xBB o el verbo base sin -ed.",
      opener: {
        ruleEs: "Abre con la cosa que RECIBE la acci\xF3n (the equipment, the results). Luego be + participio.",
        examples: [
          { good: "The equipment is being inspected\u2026", bad: "Is being the equipment inspected\u2026", whyEs: "En una afirmaci\xF3n el sujeto va primero." },
          { good: "The results will be posted\u2026", bad: "The results will posted\u2026", whyEs: "Falta \xABbe\xBB: el futuro pasivo es \xABwill be + participio\xBB." }
        ]
      }
    },
    {
      id: "indirect-question",
      name: "Indirect / embedded questions",
      titleEs: "Preguntas indirectas",
      weak: false,
      explainEs: "Dentro de otra frase (\xABDo you know\u2026\xBB, \xABI wonder\u2026\xBB, \xABCan you tell me\u2026\xBB) la pregunta pierde su orden de pregunta: va sujeto + verbo, sin do/does/did.",
      formula: "Do you know / I wonder + wh-word + subject + verb?",
      examples: [
        "Do you know where the meeting is?",
        "I wonder when the bookstore opens.",
        "Can you tell me what time the shuttle leaves?"
      ],
      mistakesEs: [
        "Mantener el orden de pregunta: \xABDo you know where is the meeting?\xBB.",
        "Agregar \xABdoes\xBB: \xABI wonder when does the bookstore open\xBB.",
        "Olvidar el signo: con \xABDo you know\xBB termina en \xAB?\xBB, con \xABI wonder\xBB termina en \xAB.\xBB."
      ],
      signals: ["Do you know", "Can you tell me", "I wonder", "I'm not sure", "Could you explain"],
      distractorEs: "\xABdoes\xBB o \xABdid\xBB extra, o el verbo antes del sujeto.",
      opener: {
        ruleEs: "La pregunta-marco abre la oraci\xF3n (Do you know / Can you tell me). Despu\xE9s de la palabra wh-, va el sujeto y AL FINAL el verbo.",
        examples: [
          { good: "Do you know where the meeting is?", bad: "Do you know where is the meeting?", whyEs: "Despu\xE9s de \xABwhere\xBB el orden es de afirmaci\xF3n: sujeto (\xABthe meeting\xBB) + verbo (\xABis\xBB)." },
          { good: "I wonder when it opens.", bad: "I wonder when does it open.", whyEs: "En la pregunta indirecta no se usa \xABdoes\xBB." }
        ]
      }
    },
    {
      id: "comparative",
      name: "Comparatives & superlatives",
      titleEs: "Comparativos y superlativos",
      weak: false,
      explainEs: "Adjetivo corto + -er + than; adjetivo largo: more + adjetivo + than. Superlativo: the + -est / the most. Nunca \xABmore bigger\xBB.",
      formula: "Subject + be + adj-er / more adj + than + \u2026",
      examples: [
        "The new dorm is much quieter than the old one.",
        "This route is more convenient than the highway.",
        "It was the most useful workshop I have taken."
      ],
      mistakesEs: ["\xABmore quieter\xBB (doble comparativo).", "\xABthan\xBB \u2192 \xABthat\xBB.", "Olvidar \xABthe\xBB en el superlativo."],
      signals: ["than", "much", "far", "the most", "the least"],
      distractorEs: "\xABmore\xBB sobrando con un adjetivo -er, o \xABthat\xBB por \xABthan\xBB.",
      opener: {
        ruleEs: "Abre con lo que est\xE1s comparando (The new dorm / This route) + el verbo. El \xABthan\xBB divide los dos elementos.",
        examples: [
          { good: "The new dorm is quieter than\u2026", bad: "Quieter the new dorm is than\u2026", whyEs: "El sujeto va primero; el adjetivo comparativo despu\xE9s del verbo." },
          { good: "This route is more convenient than\u2026", bad: "This route is more convenienter than\u2026", whyEs: "Adjetivo largo: solo \xABmore\xBB, sin -er." }
        ]
      }
    },
    {
      id: "not-only",
      name: "Not only\u2026 but also",
      titleEs: "Not only\u2026 but also",
      weak: false,
      explainEs: "Suma dos ideas con \xE9nfasis. En posici\xF3n normal (dentro de la oraci\xF3n) no hay inversi\xF3n: \xABShe not only teaches but also writes\xBB. Los dos elementos deben ser del mismo tipo (dos verbos, dos adjetivos).",
      formula: "Subject + not only + X + but also + Y (X e Y paralelos).",
      examples: [
        "The course is not only free but also very practical.",
        "She not only teaches chemistry but also coaches the team.",
        "The app helps you not only plan but also track your study time."
      ],
      mistakesEs: ["Romper el paralelismo (\xABnot only free but also it is practical\xBB).", "Olvidar \xABalso\xBB.", "Mezclar con \xABand\xBB."],
      signals: ["not only", "but also", "as well"],
      distractorEs: "\xABand\xBB o \xABtoo\xBB en lugar de \xABbut also\xBB.",
      opener: {
        ruleEs: "Abre con el sujeto + verbo normal; \xABnot only\xBB aparece justo antes del primer elemento que sumas.",
        examples: [
          { good: "The course is not only free\u2026", bad: "Not only the course is free\u2026", whyEs: "Si \xABNot only\xBB abre la oraci\xF3n exige inversi\xF3n (Not only is the course\u2026). En la respuesta corta, mejor sujeto primero." },
          { good: "She not only teaches\u2026", bad: "She not only teaches\u2026 and also coaches\u2026", whyEs: "La pareja fija es \xABnot only\u2026 but also\xBB; \xABand also\xBB rompe la estructura y deja una ficha sin lugar." }
        ]
      }
    },
    {
      id: "inversion",
      name: "Inversion after Only after / Never / Rarely",
      titleEs: "Inversi\xF3n (Only after\u2026, Never\u2026)",
      weak: false,
      explainEs: "Cuando una oraci\xF3n empieza con una expresi\xF3n negativa o restrictiva (Only after\u2026, Never\u2026, Rarely\u2026, Not until\u2026), la cl\xE1usula principal usa orden de pregunta: auxiliar + sujeto + verbo.",
      formula: "Only after + clause, + auxiliary + subject + base verb \u2026",
      examples: [
        "Only after the lecture ended did I understand the topic.",
        "Never have I seen such a crowded library.",
        "Rarely does the shuttle arrive on time."
      ],
      mistakesEs: ["No invertir: \xABOnly after the lecture ended I understood\xBB.", "Usar el verbo conjugado despu\xE9s de \xABdid\xBB (\xABdid I understood\xBB)."],
      signals: ["Only after", "Only when", "Never", "Rarely", "Not until", "Seldom"],
      distractorEs: "El verbo en pasado despu\xE9s de \xABdid\xBB (\xABunderstood\xBB por \xABunderstand\xBB).",
      opener: {
        ruleEs: "Aqu\xED S\xCD la expresi\xF3n restrictiva abre la oraci\xF3n (Only after\u2026, Never\u2026). Esa elecci\xF3n obliga a invertir: auxiliar antes del sujeto.",
        examples: [
          { good: "Only after the lecture ended did I\u2026", bad: "Only after the lecture ended I did\u2026", whyEs: "Tras \xABOnly after\u2026\xBB la principal va invertida: \xABdid I understand\xBB." },
          { good: "Never have I seen\u2026", bad: "Never I have seen\u2026", whyEs: "\xABNever\xBB al inicio exige \xABhave I\xBB." }
        ]
      }
    },
    {
      id: "conditional",
      name: "Conditionals",
      titleEs: "Condicionales",
      weak: false,
      explainEs: "Tipo 1 (real): If + presente, will + base. Tipo 2 (hipot\xE9tico): If + pasado, would + base. Nunca \xABwill\xBB dentro de la parte de \xABif\xBB.",
      formula: "If + subject + present, subject + will + base. / If + past, would + base.",
      examples: [
        "If you finish early, you can leave the room.",
        "If I had more time, I would join the club.",
        "If it rains tomorrow, we will meet inside."
      ],
      mistakesEs: ["\xABIf it will rain\u2026\xBB.", "Mezclar tipos: \xABIf I had time, I will\u2026\xBB.", "Olvidar la coma cuando \xABif\xBB va primero."],
      signals: ["if", "unless", "as long as", "would", "will"],
      distractorEs: "\xABwill\xBB dentro de la cl\xE1usula con \xABif\xBB, o \xABwould\xBB con presente.",
      opener: {
        ruleEs: "Si la frase empieza con \xABIf\xBB, primero va la condici\xF3n completa, coma, y luego el resultado con will/would. Si no hay \xABIf\xBB fijo al inicio, abre con el resultado.",
        examples: [
          { good: "If it rains tomorrow, we will\u2026", bad: "If it will rain tomorrow, we\u2026", whyEs: "En la condici\xF3n va presente simple, no \xABwill\xBB." },
          { good: "If I had more time, I would\u2026", bad: "If I would have more time\u2026", whyEs: "Hip\xF3tesis: pasado simple despu\xE9s de \xABif\xBB." }
        ]
      }
    },
    {
      id: "gerund-infinitive",
      name: "Gerund vs infinitive",
      titleEs: "Gerundio vs infinitivo",
      weak: false,
      explainEs: "Algunos verbos piden -ing (enjoy, avoid, finish, suggest, consider) y otros \xABto\xBB + base (decide, plan, hope, want, need). Despu\xE9s de preposici\xF3n siempre -ing.",
      formula: "enjoy/avoid/finish + -ing \xB7 decide/plan/hope + to + base \xB7 preposition + -ing",
      examples: [
        "I enjoy studying in the quiet room.",
        "She decided to change her major.",
        "He is interested in joining the debate club."
      ],
      mistakesEs: ["\xABI enjoy to study\xBB.", "\xABinterested in join\xBB.", "\xABdecided changing\xBB."],
      signals: ["enjoy", "avoid", "suggest", "decide", "plan", "interested in", "look forward to"],
      distractorEs: "La otra forma del verbo (\xABto study\xBB cuando va \xABstudying\xBB o al rev\xE9s).",
      opener: {
        ruleEs: "Abre con sujeto + el verbo principal; el verbo principal decide si la siguiente ficha es -ing o \xABto\xBB.",
        examples: [
          { good: "I enjoy studying\u2026", bad: "I enjoy to study\u2026", whyEs: "\xABenjoy\xBB siempre va con -ing." },
          { good: "She decided to change\u2026", bad: "She decided changing\u2026", whyEs: "\xABdecide\xBB va con \xABto\xBB + base." }
        ]
      }
    },
    {
      id: "too-enough",
      name: "too / enough",
      titleEs: "Too y enough",
      weak: false,
      explainEs: "\xABtoo\xBB + adjetivo (+ to + verbo) = demasiado; adjetivo + \xABenough\xBB = suficientemente; \xABenough\xBB + sustantivo = suficiente. \xABEnough\xBB va DESPU\xC9S del adjetivo.",
      formula: "too + adj + to + base \xB7 adj + enough + to + base \xB7 enough + noun",
      examples: [
        "The room was too small to hold everyone.",
        "Is the hall big enough for the event?",
        "We don't have enough chairs for the workshop."
      ],
      mistakesEs: ["\xABenough big\xBB (orden invertido).", "Usar \xABvery\xBB en vez de \xABtoo\xBB cuando hay consecuencia negativa.", "\xABtoo much small\xBB."],
      signals: ["too", "enough", "to + verb", "for + noun"],
      distractorEs: "\xABvery\xBB o \xABso\xBB en lugar de \xABtoo\xBB, o \xABenough\xBB antes del adjetivo.",
      opener: {
        ruleEs: "Abre con el sujeto + be; despu\xE9s decide: \xABtoo\xBB va antes del adjetivo, \xABenough\xBB despu\xE9s.",
        examples: [
          { good: "The room was too small to\u2026", bad: "The room was small too to\u2026", whyEs: "\xABtoo\xBB precede al adjetivo." },
          { good: "The hall is big enough for\u2026", bad: "The hall is enough big for\u2026", whyEs: "\xABenough\xBB va detr\xE1s del adjetivo." }
        ]
      }
    },
    {
      id: "prep-time",
      name: "Prepositions of time",
      titleEs: "Preposiciones de tiempo (in/on/at/by/until)",
      weak: false,
      explainEs: "at + hora (at 9 a.m.), on + d\xEDa o fecha (on Monday), in + mes/a\xF1o/parte del d\xEDa (in May, in the morning). \xABby\xBB = a m\xE1s tardar; \xABuntil\xBB = hasta (duraci\xF3n continua).",
      formula: "at + clock time \xB7 on + day/date \xB7 in + month/year \xB7 by = no later than \xB7 until = up to",
      examples: [
        "The essay is due by noon on Friday.",
        "The lab is open until nine in the evening.",
        "Our next class starts at ten on Monday."
      ],
      mistakesEs: ["\xABin Monday\xBB / \xABon May\xBB.", "Confundir \xABby\xBB (fecha l\xEDmite) con \xABuntil\xBB.", "\xABat the morning\xBB."],
      signals: ["at", "on", "in", "by", "until", "before", "after"],
      distractorEs: "La preposici\xF3n incorrecta (\xABin\xBB por \xABon\xBB).",
      opener: {
        ruleEs: "Abre con el sujeto + verbo (The essay is due / The lab is open). La expresi\xF3n de tiempo cierra la oraci\xF3n, de lo m\xE1s espec\xEDfico (hora) a lo m\xE1s general (d\xEDa).",
        examples: [
          { good: "The essay is due by noon on Friday.", bad: "On Friday by noon the essay is due.", whyEs: "En la respuesta corta, tiempo al final; hora antes que d\xEDa." },
          { good: "Class starts at ten on Monday.", bad: "Class starts on ten at Monday.", whyEs: "\xABat\xBB con la hora, \xABon\xBB con el d\xEDa." }
        ]
      }
    }
  ];
  var PATTERN_IDS = PATTERNS.map((p) => p.id);
  var WEAK_PATTERNS = PATTERNS.filter((p) => p.weak).map((p) => p.id);
  function patternById(id) {
    return PATTERNS.find((p) => p.id === id);
  }
  var METHOD_STEPS = [
    { titleEs: "1. Lee la pregunta", bodyEs: "La pregunta te dice el tiempo verbal y la intenci\xF3n: \xBFpide una raz\xF3n, un consejo, un plan, una descripci\xF3n? \xABWhat happened?\xBB \u2192 pasado. \xABWhat should I do?\xBB \u2192 imperativo o should. \xABWhy\u2026?\xBB \u2192 \xABThe reason why\u2026 is that\xBB o \xABbecause\xBB." },
    { titleEs: "2. Encuentra sujeto y verbo", bodyEs: "Busca entre las fichas qui\xE9n hace la acci\xF3n (I, she, the band, the equipment) y el verbo conjugado. Esa pareja casi siempre es el inicio de tu respuesta." },
    { titleEs: "3. Identifica la estructura", bodyEs: "Mira las fichas \xABpista\xBB: so, whose, the reason why, going to, got + -ed, must/should, have + participio, un pronombre (them, it) junto a una part\xEDcula (up, back). Cada una activa un patr\xF3n de las tarjetas de abajo." },
    { titleEs: "4. Ubica las palabras fijas", bodyEs: "Las palabras que ya est\xE1n impresas no se mueven. \xDAsalas como anclas: si \xABback.\xBB est\xE1 al final, el phrasal verb se cierra ah\xED; si \xAB, so\xBB est\xE1 en el medio, a la izquierda va la causa." },
    { titleEs: "5. Descarta el distractor", bodyEs: "Suele haber UNA ficha que sobra: un verbo en forma base (\xABpush\xBB vs \xABpushed\xBB), \xABwho\xBB vs \xABwhose\xBB, \xABbecause\xBB vs \xABso\xBB, \xABto\xBB despu\xE9s de un modal. Si te sobra una ficha que repite la funci\xF3n de otra, esa es el distractor." },
    { titleEs: "6. Revisa puntuaci\xF3n y lectura en voz baja", bodyEs: "Lee la oraci\xF3n completa en tu cabeza: \xBFtiene sujeto y verbo? \xBFla coma est\xE1 antes de \xABso\xBB? \xBFtermina en \xAB?\xBB si es pregunta directa o \xABDo you know\u2026\xBB? Si suena raro, revisa el patr\xF3n." }
  ];
  var WHY_OPENER_ES = [
    "En Build a Sentence la primera ficha decide todo lo dem\xE1s: fija qui\xE9n es el sujeto y qu\xE9 verbo lo acompa\xF1a. Si el inicio est\xE1 mal, ninguna de las fichas siguientes encaja y pierdes el \xEDtem completo (no hay puntaje parcial).",
    "Elegir bien el inicio elimina distractores de inmediato: si empiezas con \xABThe reason why\xBB, ya sabes que necesitas \xABis that\xBB y que \xABbecause\xBB sobra; si empiezas con un verbo base, es un imperativo y cualquier sujeto extra sobra.",
    "El inicio tambi\xE9n te dice el orden: en una afirmaci\xF3n el sujeto va antes del verbo; solo invierten las preguntas y las oraciones que abren con Only after / Never / Rarely.",
    "En Write an Email y Academic Discussion el inicio pesa en la r\xFAbrica: una apertura clara (saludo + prop\xF3sito) y una oraci\xF3n tem\xE1tica que responde directamente la pregunta muestran organizaci\xF3n y \xABrelevancia\xBB, dos criterios que los evaluadores revisan primero."
  ];

  // ../vla-app/lib/bas-coach/band.ts
  function estimateBand(results, seconds) {
    if (!results.length) return 1;
    const w = { easy: 0.8, medium: 1, hard: 1.3 };
    const max = results.reduce((s, r) => s + w[r.item.difficulty], 0);
    const got = results.reduce((s, r) => s + (r.correct ? w[r.item.difficulty] : 0), 0);
    let band = 1 + 5 * (got / max);
    const target = 420 * (results.length / 10);
    if (seconds > target * 1.3) band -= 0.5;
    return Math.max(1, Math.min(6, Math.round(band * 2) / 2));
  }

  // ../vla-app/lib/bas-coach/scoring.ts
  function shuffle(list) {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function presentItem(item) {
    const { segments, chips } = parseBuild(item.build);
    const bank = shuffle([...chips, ...item.distractor ? [item.distractor] : []]);
    return {
      id: item.id,
      pattern: item.pattern,
      difficulty: item.difficulty,
      prompt: item.prompt,
      segments,
      bank,
      answer: chips,
      sentence: item.sentence,
      distractor: item.distractor,
      explainEs: item.explainEs
    };
  }
  function drawPublicSet(size = 10) {
    var _a;
    const weight = (item) => WEAK_PATTERNS.includes(item.pattern) ? 3 : 1;
    const pool = [...ITEMS];
    const picked = [];
    const perPattern = /* @__PURE__ */ new Map();
    while (picked.length < size && pool.length) {
      const candidates = pool.filter((i) => {
        var _a2;
        return ((_a2 = perPattern.get(i.pattern)) != null ? _a2 : 0) < 2;
      });
      const list = candidates.length ? candidates : pool;
      const total = list.reduce((sum, i) => sum + weight(i), 0);
      let r = Math.random() * total;
      let choice = list[list.length - 1];
      for (const i of list) {
        r -= weight(i);
        if (r <= 0) {
          choice = i;
          break;
        }
      }
      picked.push(choice);
      perPattern.set(choice.pattern, ((_a = perPattern.get(choice.pattern)) != null ? _a : 0) + 1);
      pool.splice(pool.indexOf(choice), 1);
    }
    return picked;
  }
  function itemsFromIds(ids, limit = 10) {
    return ids.map((id) => itemById(id)).filter((i) => !!i).slice(0, limit);
  }

  // ../vla-app/lib/escritura/emails.ts
  var EMAIL_WORD_TARGET = 150;
  var EMAIL_WORD_OVER = 200;
  var EMAIL_COACH_TIPS_ES = [
    {
      titleEs: "Apunta a 150 palabras",
      bodyEs: "En este entrenamiento la meta es 150 palabras. Por debajo de eso el correo suele quedar corto en desarrollo (el problema, una propuesta concreta y una pregunta). Por encima de 200 corre el riesgo de no terminar en 7 minutos y de repetir la consigna."
    },
    {
      titleEs: "Saludo con coma, no con punto",
      bodyEs: "Escribe \xABDear Professor Okonkwo,\xBB o \xABHi everyone,\xBB. El saludo va en su propia l\xEDnea y termina en coma. \xABDear study group.\xBB con min\xFAsculas y punto es un error frecuente."
    },
    {
      titleEs: "Prop\xF3sito en las primeras l\xEDneas",
      bodyEs: "Despu\xE9s del saludo, di por qu\xE9 escribes: \xABI am writing to\u2026\xBB o \xABI would like to let you know that\u2026\xBB. No copies la consigna palabra por palabra; parafrasea y ve al punto."
    },
    {
      titleEs: "Un p\xE1rrafo por cada punto de la consigna",
      bodyEs: "Casi siempre hay tres vi\xF1etas. Dedica un p\xE1rrafo a cada una y no dejes ninguna. Un solo bloque de texto dificulta que el evaluador vea que completaste la tarea."
    },
    {
      titleEs: "S\xE9 concreto: hora, lugar, acci\xF3n",
      bodyEs: "No basta con \xABwe should change the time\xBB. Prop\xF3n un d\xEDa, una hora y un formato (sal\xF3n, videollamada, otra fecha). Esa especificidad sube Desarrollo y Cumplimiento de la tarea."
    },
    {
      titleEs: "Conectores y oraciones completas",
      bodyEs: "Usa However, In addition, First / Second / Finally, Therefore. Revisa concordancia (we do, no we does), infinitivos (need to meet, no need to meeting) y \xABI look forward to your response\xBB (no olvides el to)."
    },
    {
      titleEs: "Cierre educado y firma",
      bodyEs: "Termina con una acci\xF3n (pedir respuesta, agradecer) y una despedida con coma: Best regards, / Sincerely, / Kind regards, y tu nombre en la l\xEDnea siguiente."
    },
    {
      titleEs: "Tono seg\xFAn el destinatario",
      bodyEs: "A un profesor: Dear Professor + apellido, Could you please\u2026, I would appreciate\u2026. A un compa\xF1ero puedes usar Hi y un tono cercano, pero sigue siendo claro y educado. Evita slang o un \xABHey\xBB a personal administrativo."
    }
  ];
  var EMAIL_PROMPTS = [
    {
      id: "wae-library-workshop",
      to: "s.patel@northquad.edu",
      subject: "Citation workshop on Thursday",
      audience: "staff",
      titleEs: "Taller de citas en la biblioteca",
      scenarioEs: "Hay un taller de citas el jueves a la misma hora que tu examen parcial. Escribes a la bibliotecaria para pedir una alternativa.",
      scenario: "The library is offering a Thursday 3 p.m. workshop on citing sources. You want to attend, but you have a midterm at that exact time.",
      instruction: "Write an email to the librarian, Ms. Patel. In your email, do the following.",
      bullets: [
        "Explain why you cannot attend the Thursday workshop.",
        "Ask whether a makeup session or a recording will be available.",
        "Request that the handout be emailed to you if possible."
      ],
      required: [
        { id: "conflict", labelEs: "Explicas el choque con el examen del jueves", keywords: ["midterm", "exam", "thursday", "3 p.m", "3 pm", "cannot attend", "can't attend", "unable to attend", "conflict"] },
        { id: "makeup", labelEs: "Pides una sesi\xF3n de reposici\xF3n o una grabaci\xF3n", keywords: ["makeup", "make-up", "another session", "other session", "recording", "recorded", "repeat", "second session", "later session"] },
        { id: "handout", labelEs: "Pides que te env\xEDen el material / la gu\xEDa", keywords: ["handout", "slides", "materials", "packet", "guide", "email me", "send me", "notes"] }
      ],
      openings: [
        { en: "Dear Ms. Patel, I am writing because I cannot attend Thursday's citation workshop and I would like to ask about another way to get the material.", whyEs: "Saludo formal + prop\xF3sito claro en la primera oraci\xF3n. No repite toda la consigna." },
        { en: "Dear Ms. Patel, I had planned to come to the 3 p.m. workshop, but I now have a scheduling conflict and I hope you can help.", whyEs: "Abre con el plan original y el problema, que es exactamente lo que pide el primer punto." }
      ],
      modelAnswer: `Dear Ms. Patel,

I am writing because I will not be able to attend the citation workshop on Thursday at 3 p.m. I had reserved a seat as soon as the sign-up form opened, but my history midterm was just moved to that same hour, and the instructor is not offering another sitting this week.

I still want to learn the format the library recommends for our research papers. Would you happen to offer a makeup session later this week or next, or is a recording of the workshop available for students who have an official exam conflict? I am free Friday after 4 p.m. and most of Monday afternoon if a short repeat session is possible.

If a second session is not available, could you please email me the handout and any sample citations you plan to share? I will read them carefully and I am happy to come to the reference desk if I still have questions.

Thank you very much for your time and for organizing the workshop. I look forward to your response.

Sincerely,
Lucia Romero`,
      modelWhyEs: "Cumple las tres vi\xF1etas con detalles concretos (examen, horario libre, pedido del handout), usa saludo y despedida con coma, y supera las 150 palabras en p\xE1rrafos separados."
    },
    {
      id: "wae-club-venue",
      to: "j.chen@northquad.edu",
      subject: "New venue for the welcome event",
      audience: "staff",
      titleEs: "Cambio de lugar para el evento del club",
      scenarioEs: "El caf\xE9 que hab\xEDan reservado para la bienvenida del club cerr\xF3 por reparaciones. Escribes al asesor para proponer un plan B.",
      scenario: "Your student club booked the campus caf\xE9 for Friday's welcome event. This morning you learned the caf\xE9 will close for emergency repairs that day.",
      instruction: "Write an email to the club advisor, Mr. Chen. In your email, do the following.",
      bullets: [
        "Describe the problem with the original venue.",
        "Propose a new place and time for the event.",
        "Ask him to confirm that the budget can be moved to the new venue."
      ],
      required: [
        { id: "problem", labelEs: "Describes el problema del caf\xE9 / las reparaciones", keywords: ["cafe", "caf\xE9", "repair", "closed", "close", "venue", "original", "cannot use", "can't use"] },
        { id: "proposal", labelEs: "Propones un lugar y una hora nuevos", keywords: ["student center", "room", "hall", "lounge", "courtyard", "saturday", "friday", "sunday", "p.m", "pm", "a.m", "am", "afternoon", "evening", "propose", "suggest", "instead"] },
        { id: "budget", labelEs: "Pides confirmar que el presupuesto se puede mover", keywords: ["budget", "funds", "money", "payment", "deposit", "transfer", "move the", "reallocate"] }
      ],
      openings: [
        { en: "Dear Mr. Chen, I am writing to let you know that we can no longer use the campus caf\xE9 for Friday's welcome event, and I would like to propose an alternative.", whyEs: "El prop\xF3sito nombra el problema y anuncia la propuesta, que es lo que el asesor necesita leer primero." },
        { en: "Dear Mr. Chen, I have just received news about our venue and I need your confirmation on a new plan before we message the members.", whyEs: "Abre con urgencia educada y con una acci\xF3n (confirmar el plan)." }
      ],
      modelAnswer: `Dear Mr. Chen,

I am writing to let you know that we can no longer use the campus caf\xE9 for Friday's welcome event. The manager called this morning to say the water line will be repaired all day, so the space will be closed to groups.

I would like to propose that we move the event to Student Center Room 12 on Friday at 5 p.m., the same time we had planned. The room holds forty people, it has tables for the snacks, and I already checked that it is free. If Friday becomes impossible, Saturday at 11 a.m. in the same room is also available.

Could you please confirm that the refreshment budget and the small deposit we had set aside for the caf\xE9 can be moved to the Student Center? I can fill out the room form as soon as I have your approval, and I will then email the members so they are not surprised.

Thank you for your help with this change. I look forward to your confirmation.

Best regards,
Diego Alvarez`,
      modelWhyEs: "Explica el cierre del caf\xE9, propone sala y hora concretas (con alternativa) y pide confirmaci\xF3n del presupuesto. Tono de asesor: educado y directo."
    },
    {
      id: "wae-shuttle",
      to: "transport@northquad.edu",
      subject: "Later evening shuttle after the teaching labs",
      audience: "staff",
      titleEs: "Shuttle de la noche despu\xE9s del laboratorio",
      scenarioEs: "El \xFAltimo shuttle sale demasiado temprano para quienes salen del laboratorio de las 8 p.m. Escribes a Transporte con una propuesta.",
      scenario: "The last campus shuttle to the residence halls leaves at 8:15 p.m. Several students in the 7\u20139 p.m. teaching labs regularly miss it and have to walk in the dark.",
      instruction: "Write an email to the campus transportation office. In your email, do the following.",
      bullets: [
        "Explain the problem with the current last shuttle.",
        "Propose an extra late run and say which nights it is needed.",
        "Ask the office to consider a short rider survey or to reply with next steps."
      ],
      required: [
        { id: "problem", labelEs: "Explicas que el \xFAltimo shuttle se pierde por el laboratorio", keywords: ["shuttle", "8:15", "8.15", "last", "miss", "lab", "walk", "dark", "evening", "too early"] },
        { id: "proposal", labelEs: "Propones una carrera extra y los d\xEDas", keywords: ["9:30", "9.30", "extra", "additional", "later", "weeknight", "monday", "tuesday", "wednesday", "thursday", "friday", "propose", "suggest", "add a"] },
        { id: "ask", labelEs: "Pides una encuesta o los siguientes pasos", keywords: ["survey", "poll", "next steps", "reply", "consider", "let me know", "feedback"] }
      ],
      openings: [
        { en: "Hello, I am writing about the last evening shuttle to the residence halls, which leaves before many of us finish the late teaching labs.", whyEs: "El prop\xF3sito nombra el servicio y el problema sin copiar la consigna entera." },
        { en: "Hello, I would like to request a small change to the evening shuttle schedule so students in the 7\u20139 p.m. labs can get home safely.", whyEs: "Abre con una petici\xF3n concreta y con la raz\xF3n (seguridad), que es relevante para la oficina." }
      ],
      modelAnswer: `Hello,

I am writing about the last campus shuttle to the residence halls. It currently leaves at 8:15 p.m., but several of us are still in the teaching labs that run from 7 to 9 p.m. By the time we wash the glassware and lock the room, the shuttle has already gone, and we have to walk across the unlit path behind the science building.

I would like to propose one extra run at 9:30 p.m. on Monday through Thursday, which are the nights those labs are scheduled. A single late bus would be enough; we do not need a change to the weekend timetable.

Would you be willing to run a short rider survey this month, or could you let me know what the next steps would be if the office is open to a trial week? I am happy to collect names of students who would use the 9:30 run.

Thank you for considering this request. I look forward to your response.

Kind regards,
Mina Park`,
      modelWhyEs: "Describe el problema con hora y consecuencia, propone 9:30 p.m. de lunes a jueves y cierra pidiendo encuesta o siguientes pasos."
    },
    {
      id: "wae-garden-shift",
      to: "m.alvarez@northquad.edu",
      subject: "Saturday garden shift",
      audience: "staff",
      titleEs: "Turno perdido en el huerto comunitario",
      scenarioEs: "No pudiste ir al turno del s\xE1bado en el huerto. Escribes a la coordinadora para disculparte y ofrecer reposici\xF3n.",
      scenario: "You missed Saturday's volunteer shift at the community garden because you had to travel home for a family obligation. You still want to stay on the volunteer list.",
      instruction: "Write an email to the project coordinator, Ms. Alvarez. In your email, do the following.",
      bullets: [
        "Apologize for missing the Saturday shift and briefly explain why.",
        "Offer two specific dates when you can make up the hours.",
        "Ask what tools or clothing you should bring for the makeup shift."
      ],
      required: [
        { id: "apology", labelEs: "Te disculpas y das una raz\xF3n breve", keywords: ["sorry", "apolog", "missed", "saturday", "family", "home", "obligation", "could not", "couldn't", "unable"] },
        { id: "dates", labelEs: "Ofreces dos fechas concretas de reposici\xF3n", keywords: ["sunday", "wednesday", "thursday", "friday", "next saturday", "this saturday", "april", "may", "june", "monday", "tuesday"] },
        { id: "tools", labelEs: "Preguntas qu\xE9 herramientas o ropa llevar", keywords: ["tool", "glove", "boot", "bring", "wear", "clothing", "boots", "shovel", "what should i"] }
      ],
      openings: [
        { en: "Dear Ms. Alvarez, I am writing to apologize for missing Saturday's garden shift and to ask how I can make up the hours.", whyEs: "El prop\xF3sito junta la disculpa y la acci\xF3n (reponer), que son dos de los tres puntos." },
        { en: "Dear Ms. Alvarez, I am sorry I could not come on Saturday, and I would like to stay on the volunteer list if you still have space.", whyEs: "Empieza con la disculpa y muestra compromiso, sin una historia demasiado larga." }
      ],
      modelAnswer: `Dear Ms. Alvarez,

I am writing to apologize for missing Saturday's volunteer shift at the community garden. A family obligation required me to travel home early that morning, and I was not able to reach the plot by the start time. I should have written to you the day before, and I am sorry for the late notice.

I would still like to complete my hours. I can come this Wednesday from 3 to 6 p.m., or next Sunday from 9 a.m. to noon, whichever is more useful for the team. If both of those windows are already full, I am also free the following Saturday morning.

Could you please let me know what tools or clothing I should bring for the makeup shift? I have a pair of gloves, but I am not sure whether I should also bring boots or a trowel, or whether those are already at the shed.

Thank you for your patience, and I hope I can still be of help this season. I look forward to your response.

Sincerely,
Andres Molina`,
      modelWhyEs: "Disculpa breve (sin drama), dos horarios concretos m\xE1s una alternativa, y una pregunta precisa sobre herramientas. Buen cierre."
    },
    {
      id: "wae-office-hours",
      to: "n.okonkwo@northquad.edu",
      subject: "Short meeting about my draft",
      audience: "professor",
      titleEs: "Cita con la profesora para revisar un borrador",
      scenarioEs: "Necesitas comentarios sobre un borrador antes del martes. Escribes a la profesora para pedir una cita breve.",
      scenario: "Your research-methods paper is due on Tuesday. You have a complete draft and you would like brief comments from Professor Okonkwo before you revise it.",
      instruction: "Write an email to Professor Okonkwo. In your email, do the following.",
      bullets: [
        "Explain that you need feedback on your draft before Tuesday's deadline.",
        "Request a 15-minute appointment and propose two possible times.",
        "Ask whether you should send the draft in advance."
      ],
      required: [
        { id: "deadline", labelEs: "Mencionas el borrador y la fecha del martes", keywords: ["draft", "tuesday", "deadline", "due", "paper", "feedback", "comments", "revise"] },
        { id: "times", labelEs: "Pides 15 minutos y propones dos horarios", keywords: ["15", "fifteen", "appointment", "meeting", "office hours", "monday", "tomorrow", "a.m", "am", "p.m", "pm", "or"] },
        { id: "send", labelEs: "Preguntas si debes enviar el borrador antes", keywords: ["send", "attach", "in advance", "beforehand", "ahead", "email the draft", "share the draft"] }
      ],
      openings: [
        { en: "Dear Professor Okonkwo, I am writing to ask whether you would have fifteen minutes to look at my research-methods draft before Tuesday's deadline.", whyEs: "Saludo formal con t\xEDtulo y apellido, y el prop\xF3sito incluye el pedido y la fecha." },
        { en: "Dear Professor Okonkwo, I would like to request a short appointment this week so I can revise my paper with your comments in mind.", whyEs: "El inicio ya muestra cortes\xEDa (request, short appointment) adecuada para un profesor." }
      ],
      modelAnswer: `Dear Professor Okonkwo,

I am writing to ask whether you would have a short meeting to look at my research-methods draft. The paper is due on Tuesday, and I would like to revise the methods section and the limitations paragraph with your comments in mind rather than guess what still needs work.

Would you have fifteen minutes this week? I am free Monday from 10:30 to 11:30 a.m. and Tuesday from 8:00 to 9:00 a.m., before the deadline later that day. If neither of those times is convenient, I can also come during your posted office hours on Monday afternoon.

Should I send the draft in advance, perhaps as a PDF today, so you can skim it before we meet? I can also bring a printed copy and a list of two questions if you prefer not to read it ahead of time.

Thank you very much for considering this request. I would really appreciate your guidance, and I look forward to your response.

Sincerely,
Valeria Soto`,
      modelWhyEs: "Tono de profesor (Dear Professor, Could/Would, I would appreciate). Pide 15 minutos, da dos horarios y pregunta si enviar el borrador. M\xE1s de 150 palabras."
    },
    {
      id: "wae-leaky-window",
      to: "building@northquad.edu",
      subject: "Leaking window in room 318",
      audience: "staff",
      titleEs: "Ventana que filtra agua en la residencia",
      scenarioEs: "La ventana de tu habitaci\xF3n filtra agua sobre el escritorio. Escribes al administrador del edificio para pedir una reparaci\xF3n.",
      scenario: "The window in your residence room has been leaking during the rain, and the water has reached your desk and a stack of notes. You need a repair this week.",
      instruction: "Write an email to the building manager. In your email, do the following.",
      bullets: [
        "Describe the leaking window and how it is affecting your room.",
        "Request a repair appointment this week and mention when you are usually in the room.",
        "Ask whether you may temporarily move your desk to the study lounge while you wait."
      ],
      required: [
        { id: "leak", labelEs: "Describes la gotera y el da\xF1o en el escritorio o las notas", keywords: ["leak", "window", "rain", "water", "desk", "notes", "room", "wet", "damp"] },
        { id: "appointment", labelEs: "Pides una cita de reparaci\xF3n esta semana y das tu disponibilidad", keywords: ["repair", "appointment", "this week", "available", "morning", "afternoon", "evening", "monday", "tuesday", "wednesday", "thursday", "friday"] },
        { id: "lounge", labelEs: "Preguntas si puedes mover el escritorio a la sala de estudio", keywords: ["study lounge", "lounge", "move", "desk", "temporarily", "temporary", "relocate"] }
      ],
      openings: [
        { en: "Hello, I am writing to report a leaking window in room 318 and to ask for a repair appointment this week.", whyEs: "El prop\xF3sito ya cumple casi el primer punto y anuncia el pedido de cita." },
        { en: "Hello, I need to report a maintenance problem in my room and ask about a temporary place to work while it is fixed.", whyEs: "Abre con el reporte y con la pregunta del escritorio, que a veces se olvida." }
      ],
      modelAnswer: `Hello,

I am writing to report a leaking window in room 318. During the rain this week, water has been running down the glass and onto the desk under the sill. A stack of handwritten notes is already damp, and I have had to move my laptop to the bed so it does not get wet.

Could you please schedule a repair appointment this week? I am usually in the room after 4 p.m. on Monday, Wednesday, and Thursday, and I can also leave a key with the front desk on Tuesday morning if that is easier for the technician. I would be grateful if someone could come before the next storm.

While I wait, may I temporarily move my desk to the study lounge on the second floor so I have a dry place to work? I would bring it back as soon as the window is sealed. Please let me know if the lounge cannot be used for furniture, and I will find another option.

Thank you for your help. I look forward to hearing when the technician can come.

Kind regards,
Sofia Herrera`,
      modelWhyEs: "Hechos claros (habitaci\xF3n, lluvia, escritorio), cita con disponibilidad, y la pregunta del lounge. P\xE1rrafos separados y cierre correcto."
    }
  ];
  function emailById(id) {
    return EMAIL_PROMPTS.find((p) => p.id === id);
  }

  // src/utils.ts
  function wordCount(text) {
    const words = text.trim().match(/[A-Za-z0-9''-]+/g);
    return words ? words.length : 0;
  }

  // ../vla-app/lib/escritura/grade-email.ts
  var PURPOSE_RE = /\b(i am writing|i'm writing|i would like to|i'd like to|i am writing to|i wanted to|i hope this (message|email|note) finds|i need to (ask|report|request|let)|i would like to (ask|let|request|inform|propose)|i am sorry to write|i am contacting you)\b/i;
  var CLOSING_RE = /\b(best regards|kind regards|warm regards|sincerely|respectfully|best wishes|thank you for your (time|help|patience)|thanks for your (time|help)|see you soon)\b/i;
  var LOOK_FORWARD_RE = /\bi look forward to\b/i;
  var LOOK_FORWARD_MISSING_TO = /\bi look forward(?!\s+to\b)/i;
  var LINKING_RE = /\b(however|therefore|in addition|additionally|furthermore|first|second|finally|also|because|as a result|for example|although|in order to|that said|on the other hand)\b/i;
  var GREETING_RE = /^\s*(dear|hi|hello|good morning|good afternoon)\b[^\n]*/i;
  function hasKeyword(text, keywords) {
    const lower = text.toLowerCase();
    return keywords.some((k) => lower.includes(k.toLowerCase()));
  }
  function greetingLine(text) {
    var _a;
    const first = (_a = text.trim().split(/\n/)[0]) != null ? _a : "";
    return GREETING_RE.test(first) ? first.trim() : null;
  }
  function paragraphCount(text) {
    return text.trim().split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).length;
  }
  function scoreLabel(score) {
    if (score >= 5) return "Excelente \xB7 cubre la tarea con claridad y desarrollo";
    if (score >= 4) return "S\xF3lido \xB7 cumple la tarea, con detalles menores por pulir";
    if (score >= 3) return "Aceptable \xB7 la idea se entiende, pero faltan desarrollo o precisi\xF3n";
    if (score >= 2) return "Limitado \xB7 se omite parte de la tarea o el texto es demasiado breve";
    if (score >= 1) return "Insuficiente \xB7 falta estructura o casi no se responden los puntos";
    return "Sin evidencia suficiente para calificar";
  }
  function registerIssue(prompt, text) {
    const lower = text.toLowerCase();
    if (prompt.audience === "professor" && /^\s*hey\b/i.test(text)) {
      return "Un profesor no se saluda con \xABHey\xBB. Usa \xABDear Professor + apellido,\xBB.";
    }
    if (prompt.audience !== "peer" && /^\s*yo\b/i.test(text)) {
      return "El tono es demasiado informal para este destinatario.";
    }
    const polite = /\b(please|could you|would you|i would appreciate|thank you|thanks)\b/i.test(text);
    if (prompt.audience !== "peer" && !polite) {
      return "A\xF1ade una f\xF3rmula de cortes\xEDa (Could you please\u2026, I would appreciate\u2026).";
    }
    if (/\b(gonna|wanna|yeah|okkkk|lol|omg)\b/i.test(lower)) {
      return "Evita slang o abreviaturas de chat; el correo del TOEFL pide un registro educado.";
    }
    return null;
  }
  function gradeEmail(prompt, raw) {
    var _a, _b;
    const text = raw.replace(/\u00a0/g, " ").trim();
    const words = wordCount(text);
    const wordFlag = words < EMAIL_WORD_TARGET ? "under" : words > EMAIL_WORD_OVER ? "over" : "ok";
    const bullets = prompt.required.map((req) => ({
      id: req.id,
      labelEs: req.labelEs,
      ok: hasKeyword(text, req.keywords)
    }));
    const bulletsHit = bullets.filter((b) => b.ok).length;
    const greet = greetingLine(text);
    const greetComma = !!greet && /,\s*$/.test(greet);
    const greetPeriod = !!greet && /\.\s*$/.test(greet);
    const purpose = PURPOSE_RE.test(text);
    const closing = CLOSING_RE.test(text) || LOOK_FORWARD_RE.test(text);
    const lookForwardMissingTo = LOOK_FORWARD_MISSING_TO.test(text);
    const paras = paragraphCount(text);
    const linking = LINKING_RE.test(text);
    const registerMsg = text ? registerIssue(prompt, text) : "Escribe el correo antes de enviarlo.";
    const registerOk = !registerMsg;
    const signed = /\n[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñ.' -]{1,40}\s*$/.test(text);
    const checks = [
      {
        id: "words",
        labelEs: `Conteo de palabras (${words}/${EMAIL_WORD_TARGET})`,
        ok: wordFlag === "ok",
        detailEs: wordFlag === "under" ? `Te faltan ${EMAIL_WORD_TARGET - words} palabras para la meta de ${EMAIL_WORD_TARGET}. Ampl\xEDa cada vi\xF1eta con un detalle concreto (hora, lugar, raz\xF3n).` : wordFlag === "over" ? `Vas por encima de ${EMAIL_WORD_OVER} palabras. En 7 minutos es m\xE1s seguro quedarte cerca de ${EMAIL_WORD_TARGET} y no repetir la consigna.` : `Buen rango: ${words} palabras, en torno a la meta de ${EMAIL_WORD_TARGET}.`
      },
      {
        id: "greeting",
        labelEs: "Saludo (Dear / Hi / Hello) con coma",
        ok: !!greet && greetComma,
        detailEs: !greet ? "Empieza con un saludo en su propia l\xEDnea, por ejemplo \xABDear Ms. Patel,\xBB o \xABHello,\xBB." : greetPeriod ? "El saludo debe terminar en coma, no en punto: \xABDear Ms. Patel,\xBB." : greetComma ? "Saludo correcto y en su propia l\xEDnea." : "A\xF1ade una coma al final del saludo."
      },
      {
        id: "purpose",
        labelEs: "Declaraci\xF3n de prop\xF3sito al inicio",
        ok: purpose,
        detailEs: purpose ? "Queda claro por qu\xE9 escribes." : "En las primeras l\xEDneas di el prop\xF3sito: \xABI am writing to\u2026\xBB o \xABI would like to let you know that\u2026\xBB. No copies la consigna palabra por palabra."
      },
      {
        id: "bullets",
        labelEs: `Cubres las ${prompt.required.length} vi\xF1etas de la consigna`,
        ok: bulletsHit === prompt.required.length,
        detailEs: bulletsHit === prompt.required.length ? "Las tres peticiones de la consigna aparecen en tu correo." : `Cubre ${bulletsHit} de ${prompt.required.length}. Revisa las que faltan en la lista de abajo y a\xF1ade un detalle concreto.`
      },
      {
        id: "paragraphs",
        labelEs: "P\xE1rrafos separados (no un solo bloque)",
        ok: paras >= 3,
        detailEs: paras >= 3 ? `Hay ${paras} bloques, lo que ayuda a ver cada punto.` : "Separa saludo, un p\xE1rrafo por vi\xF1eta y el cierre con una l\xEDnea en blanco. Un solo bloque dificulta el cumplimiento de la tarea."
      },
      {
        id: "linking",
        labelEs: "Conectores (However, In addition, First\u2026)",
        ok: linking,
        detailEs: linking ? "Usas conectores que ordenan las ideas." : "A\xF1ade conectores como However, In addition, First / Second / Finally o Therefore para unir los p\xE1rrafos."
      },
      {
        id: "register",
        labelEs: "Registro y cortes\xEDa adecuados al destinatario",
        ok: registerOk,
        detailEs: registerOk ? "El tono es apropiado para quien recibe el correo." : registerMsg != null ? registerMsg : ""
      },
      {
        id: "closing",
        labelEs: "Cierre y despedida (y firma)",
        ok: closing && signed && !lookForwardMissingTo,
        detailEs: lookForwardMissingTo ? "Es \xABI look forward to your response\xBB, con la preposici\xF3n to." : !closing ? "Cierra con una acci\xF3n (I look forward to your response) y una despedida con coma: Best regards, / Sincerely, / Kind regards," : !signed ? "A\xF1ade tu nombre en la l\xEDnea siguiente a la despedida." : "Cierre y firma en su lugar."
      }
    ];
    let rawScore = 0;
    rawScore += bulletsHit / prompt.required.length * 1.6;
    if (wordFlag === "ok") rawScore += 1;
    else if (words >= 120) rawScore += 0.6;
    else if (words >= 80) rawScore += 0.3;
    else if (words >= 50) rawScore += 0.1;
    if ((_a = checks.find((c) => c.id === "greeting")) == null ? void 0 : _a.ok) rawScore += 0.5;
    if (purpose) rawScore += 0.5;
    if ((_b = checks.find((c) => c.id === "closing")) == null ? void 0 : _b.ok) rawScore += 0.5;
    if (paras >= 3) rawScore += 0.4;
    if (linking) rawScore += 0.3;
    if (registerOk && text) rawScore += 0.2;
    if (!text) rawScore = 0;
    const score = Math.max(0, Math.min(5, Math.round(rawScore * 2) / 2));
    const tipsEs = [];
    if (wordFlag === "under") tipsEs.push(`Escribe hasta llegar a ${EMAIL_WORD_TARGET} palabras: una raz\xF3n, una propuesta concreta (d\xEDa y hora) y una pregunta al final suelen bastar.`);
    if (wordFlag === "over") tipsEs.push("Recorta repeticiones. En 7 minutos es mejor un correo completo y claro que uno muy largo.");
    if (!greet || !greetComma) tipsEs.push("Saludo en su l\xEDnea, con may\xFAscula y coma: \xABDear Professor Okonkwo,\xBB.");
    if (!purpose) tipsEs.push("No repitas la consigna. Parafrasea y declara el prop\xF3sito en la segunda l\xEDnea.");
    for (const b of bullets.filter((x) => !x.ok)) tipsEs.push(`Falta este punto: ${b.labelEs}.`);
    if (paras < 3) tipsEs.push("Un p\xE1rrafo por vi\xF1eta. Deja una l\xEDnea en blanco entre ellos.");
    if (!linking) tipsEs.push("Usa However, In addition o Finally para que el correo no suene a lista suelta.");
    if (registerMsg) tipsEs.push(registerMsg);
    if (lookForwardMissingTo) tipsEs.push("Corrige: I look forward to your response.");
    else if (!closing || !signed) tipsEs.push("Despedida con coma y tu nombre debajo.");
    if (!tipsEs.length) tipsEs.push("Buen trabajo. Si quieres subir el puntaje, revisa ortograf\xEDa y a\xF1ade un detalle m\xE1s espec\xEDfico en cada p\xE1rrafo.");
    const missing = bullets.filter((b) => !b.ok).map((b) => b.labelEs);
    const explanationEs = [
      `Puntaje de pr\xE1ctica: ${score.toFixed(1)} / 5 (${scoreLabel(score)}).`,
      `Palabras: ${words} de ${EMAIL_WORD_TARGET} (${wordFlag === "under" ? "por debajo de la meta" : wordFlag === "over" ? "por encima del rango c\xF3modo" : "en el rango meta"}).`,
      missing.length ? `Vi\xF1etas pendientes: ${missing.join("; ")}.` : "Las tres vi\xF1etas est\xE1n cubiertas.",
      "Esta r\xFAbrica es una gu\xEDa de entrenamiento de VLA, no una puntuaci\xF3n oficial de ETS."
    ].join(" ");
    return {
      words,
      wordTarget: EMAIL_WORD_TARGET,
      wordFlag,
      score,
      scoreLabelEs: scoreLabel(score),
      checks,
      bullets,
      tipsEs,
      explanationEs
    };
  }
  return __toCommonJS(logic_exports);
})();
