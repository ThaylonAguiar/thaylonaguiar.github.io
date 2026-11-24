# Catálogo · Menor Preço Auto Peças (versão Google Drive)

Esta pasta é o app inteiro. Os dados e as fotos ficam no SEU Google Drive, na pasta
"Catalogo Menor Preco (app)" (criada pelo próprio app no primeiro login).
Esta pasta só contém o "programa" (arquivos estáticos), sem nenhum dado seu.

## Parte 1 · Chave de login do Google (uma vez, ~15 min)
Os nomes dos menus do Google mudam de vez em quando; siga pelo sentido.
1. Entre em https://console.cloud.google.com com a conta Google que guarda o catálogo.
2. Crie um projeto novo (nome: Catalogo).
3. Em "APIs e serviços" > "Biblioteca", procure "Google Drive API" e clique em Ativar.
4. Em "Tela de consentimento OAuth" (ou "Google Auth Platform"):
   - Tipo de usuário: Externo.
   - Nome do app: Catálogo. E-mail de suporte e de contato: o seu.
   - Em Acesso a dados / Escopos, adicione o escopo `.../auth/drive.file`
     ("Ver, editar, criar e excluir apenas os arquivos do Google Drive usados por este app").
   - Em Público / Usuários de teste, adicione o seu e-mail.
   - Depois clique em "Publicar app" (Em produção). Com esse escopo não precisa de verificação,
     e o login não expira a cada 7 dias como no modo de teste.
5. Em "Credenciais" > "Criar credenciais" > "ID do cliente OAuth" > Aplicativo da Web.
   - Em "Origens JavaScript autorizadas" coloque o endereço do app (Parte 2), por exemplo
     https://catalogo-menor-preco.netlify.app (sem barra no final).
   - Crie e copie o "ID do cliente" (termina com .apps.googleusercontent.com).

## Parte 2 · Colocar o app no ar (gratuito)
Qualquer hospedagem de arquivos estáticos serve. Duas opções simples:
- Netlify Drop: https://app.netlify.com/drop arraste esta pasta inteira para a página.
- Cloudflare Pages: Workers e Pages > Criar > Pages > Upload de ativos.
Confira nos termos do serviço escolhido se uso comercial é permitido no plano gratuito.
Anote o endereço gerado e volte à Parte 1 (passo 5) para cadastrá-lo como origem autorizada.

Dica: abra `config.js` no Bloco de Notas, cole o ID do cliente entre as aspas e salve ANTES de
subir a pasta. Se não fizer isso, o app pergunta o ID na primeira vez em cada aparelho.

## Parte 3 · Instalar
- PC (Chrome/Edge): abra o endereço, clique no ícone de instalar na barra de endereço.
- Android (Chrome): menu ⋮ > Instalar app.
- iPhone (Safari): Compartilhar > Adicionar à Tela de Início.
No topo do app, toque em "Entrar com o Google" na primeira vez.

## Parte 4 · Trazer os dados do app antigo
1. No app antigo (link do Claude, em aba normal, logado): botão "Exportar migração".
2. No app novo: botão "Importar migração" e escolha o arquivo.
3. Fotos: no PC, botão "Importar pastas de fotos" e escolha a pasta
   "Catálogo de Imagens - ORGANIZADO". O envio é feito 4 pastas ao mesmo tempo e pode
   ser repetido: pastas que já têm foto são puladas.

## Observações
- Backup: botões "Backup dados" e "Backup + fotos" continuam, e a pasta do Drive também é uma cópia.
- Atualizações do app: após subir arquivos novos, abra o app duas vezes para a versão nova valer.
- Sem internet: o app abre, mostra o que já foi baixado e guarda as alterações; elas sobem
  sozinhas quando a conexão volta ("pendente(s)" no topo).
- Se o aviso do topo pedir login, toque nele (o Google renova o acesso a cada hora, em geral sem pedir nada).

## v17: o app agora busca sempre a versão nova ao abrir (e ao voltar para a aba). Extras → "Atualizar app" limpa o cache do programa sem tocar nos dados.

## Novidades da v16
- **Versões por item**: cada item tem versão 001, 002… (criação, edição, importação que substitui). Na ficha, clique em "Versão 00N · histórico" para ver o conteúdo e **Restaurar** (a restauração vira uma nova versão).
- **Extras → Mesclar itens**: busque por referência, ID ou título, escolha o PRINCIPAL; aplicações, códigos, relacionados e fotos dos outros entram nele (a referência deles vira código DAYCO).
- Linhas `XXXX > 1991` (ATÉ) agora aparecem com "…" em De.
- Lotes aceitam `"substituir": true` por item (só aquele item é substituído).

## v19: botão × em cada campo de filtro (apaga só aquele campo); novo botão "Título: GERAL/DETALHADO" ao lado de limpar filtros (GERAL ignora o que está entre parênteses, ex.: TUBO DE REFRIGERACAO(P) entra em TUBO DE REFRIGERACAO).
## v18: importar lote agora envia as fotos também para itens que já existem e ainda não têm foto (antes ficavam "já existe, nada novo" e sem imagem).

## v34
- "marcar todos p/ etiqueta" agora alterna: marca e desmarca (vira "desmarcar todos").

## v33
- Busca em Aplicação: "+VERSÃO" agora também acha o nome colado (ex: "palioweekend", "fiat palio weekend").

## v35
- Tabela de aplicações agora aparece sempre em ordem alfabética: montadora e, dentro dela, modelo (com números em ordem natural, ex. AX 1.0 antes de AX 1.4). Vale para qualquer item, novo ou antigo; o texto cadastrado não é alterado.

## v36 · Importar lote com escolhas
Ao importar um lote, o app pergunta, para os itens que JÁ existem:
- Aplicações / Códigos / Imagens / Observações: SUBSTITUIR, MESCLAR ou NADA (há atalhos "Substituir tudo" e "Mesclar tudo").
- Imagens: SUBSTITUIR apaga as fotos antigas do item e coloca as do lote; MESCLAR só coloca foto se o item ainda não tiver nenhuma.
- "Conferir item a item antes de importar": lista com foto, referência e o que muda (NOVO / ATUALIZA: ...), com caixa para desmarcar o que não quer.
Itens novos são sempre criados completos.

## v37 · EAN e aplicações antigas
- Novo campo EAN: aparece em uma tabela própria entre "Códigos" e "Produtos relacionados" (também no PDF/compartilhar). No texto do item, o EAN fica em um bloco `EAN:` com linhas `MARCA: 7898474511381`. O app também reconhece o EAN que estava misturado nos códigos (ex.: linha `EAN:` seguida de `TECFIL 7891342004800`) e passa a mostrá-lo no campo certo.
- Novo filtro "EAN" ao lado de Código: digite ou passe o leitor de código de barras. O campo Código também acha pelo EAN.
- Importar lote: as opções de Códigos (substituir/mesclar) também valem para o EAN.
- Itens antigos sem `#` nos carros agora aparecem na tabela de aplicações: dentro de um bloco `MONTADORA:` o app lê linhas como `TIGGO 7 1.5 16V   22/...  (PRO HYBRID)` (anos com 2 dígitos `96/99` ou 4 dígitos, `22/...` = em diante). Linha sem ano entra como "…" nos dois lados. O texto cadastrado não é alterado.
- Bloco `OBSERVAÇÃO:` agora é mostrado como observação (não vira linha de código).

## v38 · Grupo e subgrupo nos filtros
- Com o grupo vazio, o filtro **Subgrupo** lista todos os subgrupos (sem repetir); ao escolher um grupo, lista só os dele. Escolher um subgrupo com grupo vazio filtra apenas por ele.
- Novos campos de texto **Buscar grupo** e **Buscar subgrupo** (procuram por parte do nome).

## v39 · Filtro e destaque em códigos e aplicações
- Tabela de **códigos** ganhou campo de filtro (preenchido automaticamente com o que foi digitado em "Código"): mostra só as marcas/códigos que batem (ex.: 808042 → só DPL). Aceita vários códigos separados por espaço ou vírgula.
- O trecho encontrado fica **destacado** nas tabelas de aplicações e de códigos (e no EAN, quando buscado pelo campo EAN).
- Link **mostrar tudo / mostrar só a busca** nas duas tabelas: exibe a tabela completa mantendo o destaque.
- No EAN, a coluna da esquerda agora é a **referência** (ex.: VC128: …, VC128.AL: …) em vez da marca. Lotes antigos continuam com a marca.

## v40
- Removidos os dois campos "Buscar grupo" / "Buscar subgrupo" (a v36 já tem o filtro por grupo e subgrupo; a regra de mostrar todos os subgrupos com o grupo vazio continua).
- O campo **EAN** passou para o último lugar entre os filtros de busca.

## v41
- Corrigido: o campo **EAN** aparecia em primeiro por causa da ordem definida no estilo (`#fe{order:8}`); agora fica realmente por último.

## v42
- Corrigido: o campo **Código** não procura mais dentro do EAN (EAN só pelo campo EAN).

## v43
- Corrigido no celular: o texto destacado na busca sumia (a classe do destaque colidia com uma classe que esconde um elemento em telas pequenas).

## v44 · Fotos por item quando a referência se repete
- Referência usada por **um só item**: nada muda (as fotos continuam guardadas pela referência).
- Referência usada por **vários itens** (ex.: 15W40 em óleos de marcas diferentes): cada item passa a ter as **suas próprias fotos** (guardadas pelo ID). Adicionar ou remover foto num item não afeta os outros.
- Fotos antigas que estavam compartilhadas pela referência não somem: no item aparece o aviso "Usar neste item", que copia essas fotos só para aquele item (faça isso no item certo, ex.: o ACDELCO).
- Remover uma foto só apaga o arquivo se nenhum outro item ainda usar a mesma imagem.

## v45 - Grupos de itens
- Extras > **Grupos de itens**: lista (ordem alfabetica) + **Criar grupo de itens** (nome, referencia, itens). Busca por titulo, referencia ou ID; "Adicionar todos os resultados" inclui todos de uma vez. Clique no grupo para renomear, adicionar/remover itens ou excluir (os itens nao sao apagados).
- Na lista principal o grupo aparece como UM registro (borda azul, "GRUPO DE ITENS - N itens"); clicar expande e mostra os itens (cada um abre normalmente).
- Link **"Grupos de itens: AGRUPADOS/SOLTOS (trocar)"** ao lado de "limpar filtros": SOLTOS volta ao comportamento antigo (todos os itens soltos).
- Buscando so por titulo/referencia, o grupo substitui seus itens se o nome/ref do grupo bater; com outros filtros (descricao, codigo, ano, EAN, tipo) aparecem os itens soltos.
- Cada item mostra na ficha o botao "Grupo de itens: NOME". Um item so pode estar em um grupo.

## v46 - Correcao da busca de aplicacao
- Antes a busca juntava marca+modelo sem espacos, entao "TORO" achava "RENAULT OROCH" (RENAUL**T OROC**H). Agora o texto buscado precisa COMECAR no inicio de uma palavra (pode atravessar palavras: "OROCH1.6" e "RENAULTOROCH" continuam funcionando; "TORO" so acha TORO). Vale para o filtro Aplicacao do topo e para o filtro dentro da ficha.
- Efeito colateral: busca que comeca no meio de uma palavra (ex.: "6V" dentro de "16V") nao encontra mais.

## v47 - Fim do spam de "Pop-up blocked" no celular
- A renovacao automatica do login (a cada ~1h) abria um popup do Google sem toque do usuario; o Chrome do celular bloqueava e avisava toda hora. Agora a renovacao e feita em um iframe invisivel (sem popup). Se o Google nao permitir renovar em silencio, o app mostra "Sem login (toque)" e voce toca uma vez (esse toque abre o login normalmente, sem bloqueio). Nao aparece mais o aviso de popup.
- Dica: no Chrome do celular, se o aviso aparecer uma ultima vez, toque em "Always show" para o site thaylonaguiar.github.io.

## v48 - Botao "Colunas" movido para o topo, ao lado de "+ Novo".

## v49 - Desfeita a regra da v46: a busca de aplicacao volta a achar pedacos no meio das palavras (ex.: "TORO" acha RENAULT OROCH).

## v50 - Corrigido: filtro de aplicacoes dentro da ficha nao mostrava nada (quebrado desde a v46). Voltou ao codigo original da v45.

## v51 - Busca de aplicacao por campo
- Cada palavra buscada precisa estar DENTRO de um unico campo (marca, modelo ou obs; ou o titulo). Nao junta mais marca+modelo: "FIATUNO" nao acha nada e "TORO" nao acha RENAULT OROCH. "FIAT UNO" (com espaco) continua achando, pois cada palavra esta em um campo. Vale para o filtro Aplicacao do topo e para o filtro dentro da ficha.

## v52 - Fotos acompanham a mudanca de referencia
- Ao editar um item e trocar a REFERENCIA, as fotos (e a chave de fotos) agora vao junto para a nova referencia; nada fica perdido na referencia antiga.
- Para fotos que JA ficaram perdidas (ex.: MTE4098 -> MTE4153): abra o item novo (sem fotos); aparece "Fotos sem item (referencia antiga?): MTE4098 (N)". Toque no nome e confirme para trazer as fotos para o item.

## v53 - Busca de aplicacao: cada palavra tem que estar na MESMA linha de aplicacao
- Antes, "207 1.4" achava itens com "207" em uma linha e "1.4" em outra (ex.: pastilha com 207 1.6 e 206 1.4). Agora o item so aparece se existir uma aplicacao (marca/modelo/obs) que tenha todas as palavras, igual ao filtro dentro da ficha.

## v54 - Etiquetas: mais opcoes
- Na tela Etiquetas: links "todos para P / todos para M / todos para G" (envia para o tamanho os itens ainda sem tamanho).
- **Edicao manual**: link "✎ edicao manual (todas)" em ITENS e "✎ Manual" em cada coluna (P, M, G). Abre uma etiqueta por vez com a LINHA 1 pronta (MARCA: codigo [MONTADORAS]), a TABELA de aplicacoes do item ao lado para consulta e as linhas 2 e 3 em branco para voce digitar (use *asteriscos* para negrito em motor e ano). Tem previa (linha 1 fonte 16, demais fonte 14), botoes Anterior / Proxima, "Preencher automatico" e, na ultima, "Concluir e gerar Word" (une todas em um unico Word). Da para trocar o tamanho P/M/G da etiqueta ali mesmo.
- **So codigos e montadoras (Word)**: gera um Word so com a linha 1 (marca em negrito + codigo + montadoras) em fonte 24, 2 colunas na mesma grade do seu modelo, para etiquetar caixas.
- Tamanho das etiquetas P = o do seu modelo (2 colunas, linhas de 1531 twips); fontes: linha 1 = 16, demais = 14.

## v55 - Etiquetas: editor manual preciso
- Previa no tamanho real do Word (P 10,9 cm / M 6,4 cm / G 21 cm de largura util), fonte Cambria/Caladea: a linha quebra onde quebrara no Word e mostra quantas linhas cada texto ocupa.
- Montadora [ ] da linha 1 preenchida sozinha conforme os carros digitados; CITROEN + PEUGEOT viram CIT./PEUG. (tambem no automatico). Editar o colchete manualmente pausa o automatico.
- Sugestoes de carros ao digitar nas linhas 2 e 3.
- Ao abrir Manual, campos vazios; etiquetas nao editadas voltam ao automatico ao sair.

## v56
- Editor manual de etiquetas: sugestoes de carros e montadora automatica usam so as aplicacoes do proprio item (nao mais o catalogo todo).

## v57
- Etiqueta manual: lista de sugestoes abaixo do campo (so carros do item), setas + Enter escolhem e ja inserem ", "; chips mantidos.
- Aba TITULO: setas + Enter tambem escolhem a sugestao.
- Tela manual nao fecha mais ao clicar fora nem com Esc; so em "Voltar a lista".

## v58
- Sugestoes de carro aceitam numeros (ex.: 206).
- Botao "Pre-visualizar" (lista) e "Previa do Word" (editor manual): mostra P/M/G nos tamanhos reais antes de baixar (previa aproximada, feita pelo app).
- Previa da linha no editor agora centralizada, como no Word.

## v59
- Campo OBSERVACOES na ficha do item (entre Codigos/EAN e Produtos relacionados) e no PDF/imagem: tudo que nao for MONTADORA/aplicacoes nem CODIGOS, na ordem em que foi escrito. Um titulo como "CODIGOS DOS COMPONENTES:" (com ":" e sem valores) e o que vem depois dele ate um novo "CODIGOS" passam a ser observacoes.
- Cadastro/edicao: sugestoes ao digitar no campo de descricao. Linha sem # -> montadoras (ex.: F -> FIAT), escolher insere "FIAT:" e quebra a linha; "#" -> carros da montadora da secao (ex.: FIAT: #p -> PALIO 1.0 8V...), insere com 3 espacos para os anos; depois de CODIGOS -> marcas de codigo (M -> MTE), insere "MTE: ". Setas + Enter escolhem; Esc fecha; Enter sem selecionar quebra a linha normalmente.

## v60
- Corrigido: sugestoes do campo de descricao agora ligadas ao formulario ativo (Novo item / Editar).

## v61
- Sugestoes de carros: so CARRO + MOTOR + VALVULAS (descarta anos, >, parenteses e o resto), sem repetir; ordem alfabetica e motor/valvulas do menor para o maior (1.0 8V, 1.0 12V, 1.0 16V).

## v62
- TITULOS A-Z: botoes "Mesclar titulos" e "Editar titulo". Alteram so o nome padrao (antes dos parenteses e do "-") de todos os itens do titulo, preservando (detalhes) e o restante; cada item ganha uma versao no historico. Nao fecha ao clicar fora enquanto o painel de edicao esta aberto.

## v63
- Etiqueta trancada: fica salva dentro do item (colecao "lab") e, ao reabrir Etiquetas, volta exatamente como foi salva (texto, tamanho e foto). Trancar/destrancar: no cartao da etiqueta, no editor manual, "Trancar todas/Destrancar todas", ou na ficha do item (gera com o texto automatico atual). Ao baixar o Word, todas as etiquetas dimensionadas sao trancadas automaticamente. Itens com etiqueta trancada mostram o cadeado na lista.
- Botoes de Baixar/Pre-visualizar/Fechar agora ficam no topo (fixos) da tela de etiquetas.

## v64
- Etiqueta criada/editada fica SALVA no item automaticamente (editor manual e cartoes), mesmo sem trancar; ao reabrir, volta como foi feita. "Trancar" protege: etiqueta trancada nao aceita edicao, troca de tamanho nem "preencher automatico" ate destrancar (continua salva). "voltar ao automatico" descarta a versao salva (so se destrancada). Baixar o Word tranca todas as dimensionadas.

## v65/v66
- Codigos: caixa "ordem alfabetica" (preferencia global do visualizador, vale para todos os itens).

## v67
- Codigos: em cada marca, dois icones (lupa = Google, foto = Google Imagens) que pesquisam TITULO (antes do "-") + MARCA + CODIGO, ex.: BATERIA ZETTA 48AH. Os botoes gerais de busca continuam como estavam.

## v68
- Codigos: clicar em um codigo pesquisa no Google "MARCA CODIGO" (para ORIGINAL, so o codigo). Fica so o icone de foto por marca (Google Imagens: titulo + marca + 1o codigo).

## v69
- Clicar no codigo: a busca inclui sempre a marca (inclusive ORIGINAL).

## v70
- Tabela de aplicacoes, coluna Obs.: tag @NOME (ex.: @TRENDLINE, @ADVENTURE) vira o botao VERSOES (fica sempre em primeiro); passar o mouse ou clicar mostra a lista.
- Combustivel: bolinha colorida (Alcool = branco, Gasolina = laranja, Flex = verde; Alcool+Gasolina = branco/laranja; Gasolina+Flex = laranja/verde; os tres = vermelho). Mouse/clique mostra os nomes. Detecta automaticamente [ALC.] [GAS.] [FLEX] [ALC./GAS.] etc. e tambem as tags !alcool !gasolina !flex.

## v71
- Versoes em lote: na tabela de aplicacoes, clique com o botao direito (ou segure o dedo) sobre uma palavra dentro dos parenteses da coluna Obs. > "Adicionar em VERSOES". Vale so a palavra tocada (separadores: virgula e /). Abre uma previa com quantos itens/aplicacoes serao alterados (texto editavel) e, ao confirmar, poe @ em todos os itens (fica no historico de versoes de cada item).
- Extras > Versoes: lista de todas as versoes (@) com contagem; "Remover" tira o @ de todos os itens.
- @ agora termina em virgula, / ou parenteses (ex.: @ELX MPI/@RST = duas versoes; "@ELX RT" continua inteiro).

## v72
- Versoes automaticas: toda palavra que esta em VERSOES (tem @ em algum item) aparece como VERSOES em qualquer outro item que a contenha entre parenteses, mesmo sem o @ (itens antigos e novos). Ao adicionar, o @ tambem e gravado em todos os itens.
- Funciona tambem nos itens antigos (linhas "MODELO 16/... (3C, TRENDLINE - MEC.)"); " - MEC./AUT." e tratado como separador.

## v73
- Janela de confirmar versoes (Adicionar/Remover em VERSOES) agora abre na frente do item.
- Lista de sugestoes do cadastro: ao escolher um carro, SUBSTITUI o carro/motor/valvulas da linha (anos e resto permanecem), em vez de acrescentar (T-CROSS nao vira T-CROSSCROSS). A busca considera o texto todo do carro, mesmo com o cursor no meio.
- A lista fecha ao clicar fora do campo de texto.

## v74
- Titulos: Editar/Mesclar titulo nao muda mais o filtro para GERAL. No modo DETALHADO o titulo editado/mesclado inclui o trecho entre ( ) (troca tudo antes do "-"); no GERAL continua mudando so o nome padrao.

## v76
- Titulos: volta ao comportamento da v74 (detalhado edita o trecho todo, com parenteses) e ganha o botao "Titulo: GERAL/DETALHADO (trocar)" dentro da propria janela de Titulos.

## v77 - edicao na propria tela
- Titulo: botao direito (ou segurar) no titulo do item = edita direto no campo; Enter salva, Esc cancela.
- Tabela de aplicacoes: icone de chave inglesa abre a tabela como texto no lugar da tabela; icone de disquete salva e volta a tabela normal (chave inglesa de novo cancela).
- Celulas Modelo / De / Ate / Obs.: botao direito (ou segurar) edita a celula; Enter salva na linha do item. Em Obs. o menu tem Editar e Adicionar em VERSOES. Linhas com varias faixas de ano: usar a chave inglesa.
- Codigos: botao + abre area para escrever MARCA: codigos (Enter = nova linha, varias marcas; Ctrl+Enter ou disquete salva) e adiciona ao fim da lista; chave inglesa edita a lista inteira em texto; botao direito na marca ou no codigo edita a celula.
- Todas as edicoes ficam no historico de versoes do item.

## v78
- Ao lado do titulo do item: lupa (pesquisa o titulo no Google), icone de imagem (Google Imagens com o titulo) e ! (avisos e mini guia do padrao: #, @, !, +, ~, MONTADORA:, CODIGOS:, EAN:, OBSERVACAO:). O guia tambem esta em Extras > Guia / avisos.

## v79
- O botao ! (avisos e guia do padrao) saiu da tela do item e ficou no topo de Novo item / Editar item, ao lado do titulo.

## v80
- Guia: texto quebra dentro da janela (sem sair da pagina), botao X no canto superior direito no lugar dos botoes Fechar. Corrigido o bloco branco no titulo de Novo item.

## v81
- Tela do item: Editar (chave inglesa), Desativar (bloqueio) / Ativar (check) e Fechar (X) agora ficam no topo, ao lado da lupa e do icone de imagem. Excluir fica sozinho no fim da pagina.

## v82
- Tabela de aplicacoes e Codigos: os links "mostrar tudo / mostrar so a busca" foram trocados por um botao de lupa na ponta direita do titulo. Cinza = sem filtrar (mostra tudo); vermelho = filtrando (so o que a busca achou). Clique alterna quando quiser; ao digitar na busca ele liga sozinho.

## v83
- Codigos: a caixa "ordem alfabetica" virou um botao de lista (☰) ao lado da lupa. Cinza = ordem do item; vermelho = ordem alfabetica ligada (preferencia global, como antes). Ao alternar, a tela mantem a posicao da rolagem.

## v84
- Alternar a ordem alfabetica (e salvar edicoes na tela) nao apaga mais os campos de busca de Aplicacoes e Codigos nem o estado da lupa.

## v85
- Na seção Códigos, a referência do item (ex.: MTE3041) aparece em destaque ao lado dos botões, para facilitar comparar com o código buscado.

## v86
- Itens desativados ganham o botão 📦 (entre ✅/🚫 e ✕): cinza = sem estoque, dourado = peça guardada em estoque fora da prateleira. O aviso do topo mostra "EM ESTOQUE". Ao reativar o item a marca é zerada.

## v87
- Item desativado EM ESTOQUE: na lista aparece 📦 ao lado do título e o título fica dourado (card sem o cinza); no detalhe o título também fica dourado.

## v88
- Itens desativados EM ESTOQUE ficam sem o risco no título (continuam no final da lista, com o ~).

## v89
- Extras > 🧾 Orçamento: janela com carro, adicionar item (produto, qtd, valor unitário, +), lista em ordem alfabética, total, observações.
- Botão direito (ou segurar) em item/quantidade/valor altera; ✕ vermelho exclui; o total é sempre calculado.
- Salvar (ID de 6 dígitos, coleção "orc" no Drive), WhatsApp (imagem), Imprimir (80 mm, TM-T20: escolha a impressora na janela de impressão). WhatsApp e Imprimir salvam antes.
- 📂 Orçamentos salvos: busca por carro, peça ou número; mais recente primeiro; clicar abre para editar (salvar mantém o mesmo ID).

## v90
- Orçamento: impressão 80 mm em retrato, com a folha ajustada ao tamanho real do conteúdo, letras menores, sem linhas tracejadas nem o título "ORÇAMENTO:", e com espaço antes de data e ID.
- Imagem do WhatsApp menor e sem sobrepor valores grandes (colunas se ajustam ao maior valor).

## v91
- Orçamento > Imprimir: abre uma prévia só com o recibo (80 mm, tamanho do conteúdo) e o botão Imprimir; a impressão sai desse mesmo recibo.
- Removidas as palavras CARRO e ORÇAMENTO (imagem e papel).

## v92
- Orçamento > Imprimir: o recibo agora imprime numa janela própria (80 mm x altura exata do conteúdo, 1 página, sem papel em branco, sem cabeçalho/rodapé do navegador). Permita pop-ups para o site na primeira vez.
- Quantidade do item: setinhas ▲▼ (e teclas ↑↓), mínimo 1.

## v93
- Corrigido o botão Versões no menu Extras (aparecia o código no lugar do botão).
- Impressão do orçamento: o tamanho da página (80 mm x altura do recibo, margem 0) vai fixo no HTML da janela de impressão.
- Se o navegador ainda imprimir cabeçalho/rodapé ou papel em branco: na janela de impressão, Mais definições > Margens: Nenhuma, desmarcar "Cabeçalhos e rodapés" e escolher o papel Receipt/RP80 do driver.

## v94
- Orçamento > Imprimir: volta a imprimir de dentro do app (sem abrir janela do navegador), com margem zero e sem forçar tamanho de página, para o recibo sair do topo do papel e sem cabeçalho/rodapé do navegador.
- O comprimento do papel é do driver: na janela de impressão escolha o papel de recibo (RP80/Receipt, comprimento variável).

## v95
- Extras > 📦 Encomenda: carro, itens (nome, quantidade, valor do distribuidor), lista alfabética com coluna "V. original" (botão direito altera e recalcula tudo), valores por forma de pagamento (distribuidor + %) e total geral.
- Botão % Porcentagens: edita nomes e % (padrão 50/55/60/70/80); "Salvar como padrão" vale para as próximas. Cada encomenda guarda as % usadas.
- Salvar (ID próprio, coleção "enc"), WhatsApp (imagem), Imprimir (80 mm, mesma prévia do orçamento), Encomendas salvas com busca. Campo Entrega (padrão "Em até 3 dias úteis").

## v96
- Encomenda: botão 💵 (cinza = desligado: cada item com todas as formas de pagamento e SEM total; verde = ligado: itens só no PIX/dinheiro e total no fim com todas as formas). A escolha fica salva em cada encomenda.
- Botões simplificados em Orçamento e Encomenda: 🖨 imprimir, 📂 salvos, ➕ novo, % porcentagens (os nomes aparecem ao passar o mouse).

## v97
- Encomenda: quantidade agora aparece como (01) em vez de (01 un.).
- Com o botão 💵 ligado, cada item sai numa linha só: "01) NOME (01)   valor unitário   valor total" (sem a linha PIX OU DINHEIRO). Desligado, continua com todas as formas de pagamento.

## v98
- Encomenda: removida a numeração "01)" dos itens (recibo e imagem). A ordem continua alfabética.

## v99
- Lupas de Aplicações e Códigos agora são só manuais: a busca nunca liga a lupa sozinha. Cinza (padrão) = mostra a lista inteira com o que bate destacado; vermelha = mostra só o que a busca achou. A escolha fica salva neste navegador.
- X dentro dos campos de busca de Aplicações e Códigos (aparece só com texto) para apagar a busca.

## v100
- Extras > 🤖 Códigos via GPT: (1) escolhe os itens (marcados p/ etiqueta ou lista atual), gera pedidos prontos de até N itens com as regras e o formato de resposta; copia e cola no ChatGPT. (2) cola a resposta do GPT, o app mostra o que é novo por item (ignora o que já existe e itens não encontrados), e aplica só os itens marcados. Cada alteração fica no histórico de versões do item.
- Formato de resposta: "ID: 000123 / REF: ABC123 / MARCA: COD1, COD2 / --- ". Marca existente recebe os códigos novos na mesma linha; marca nova entra no fim da lista, em ordem alfabética.

## v101
- Códigos via GPT: nova opção "Por título" (ex.: AXIAL DE DIRECAO): pega todos os itens ATIVOS cujo título começa com o texto (lista de tipos com contagem). Pedidos de até 100 itens (padrão 40).
- "Pular itens já consultados": depois de analisar/aplicar, cada item (com código novo ou sem novidade) fica marcado como consultado e não entra nos próximos pedidos. Dá para zerar a lista.

## v102
- Códigos via GPT: o pedido começa com "TAREFA (execute agora...)" e há o botão 💬 Copiar comando curto, para colar na caixa de mensagem junto com o pedido (o ChatGPT transforma texto longo em anexo "Pasted text" e, sem comando, não executa).

## v103 — Busca geral por motor/válvula (!)
- Ao buscar carro + motor (ex.: DOBLO 1.6 16V), itens cadastrados só com o carro (sem motor ou sem válvula informados) agora também aparecem, com um **!** vermelho ao lado do título.
- Se o cadastro tem motor/válvula e eles não batem com a busca, o item continua fora (ex.: cadastro DOBLO 1.8 não aparece na busca 1.6).
- Dentro do item, na tabela de aplicações, a linha "geral" também recebe o !. Toque/passe o mouse no ! para ver a explicação.
- Buscar só o motor (sem o nome do carro) não traz itens sem motor.

## v104 — GPT também pesquisa aplicações (motor/válvula)
- Extras > Códigos via GPT agora tem "O que pesquisar": códigos de outras marcas e/ou aplicações (só motor e válvula).
- Ao pesquisar aplicações, o pedido leva os carros já cadastrados e o GPT devolve linhas `APP: MONTADORA | MODELO | MOTOR | DE | ATE | CERTEZA | FONTE`.
- Na prévia da resposta, cada carro novo aparece com caixa própria, selo CONFIRMADO/PROVÁVEL, fonte e avisos ("já cadastrado", "carro não consta no cadastro deste item"). Só vêm marcados os CONFIRMADOS de carros já cadastrados no item.
- Ao aplicar, entra no cadastro uma linha nova `#🤖MODELO MOTOR DE > ATE` dentro do bloco da montadora. O 🤖 no início do nome identifica o que veio do GPT. A linha original do carro (sem motor) é mantida.
- Se o GPT não informar anos, a linha herda os anos do cadastro do carro.
- Com a linha 🤖, a busca "DOBLO 1.8 16V" acha o item sem o "!"; as demais buscas continuam achando pelo cadastro geral, com "!".
- "Consultados" agora é separado para códigos e para aplicações.

## v105 — GPT traz carros novos e info extra na tag CHAT-GPT
- O pedido de aplicações agora também pede CARROS/MODELOS NOVOS que usam a peça (ex.: lançamentos mais recentes que o catálogo), além de motores novos dos carros cadastrados, com anos DE > ATÉ.
- Na prévia, carros que não estão no item aparecem com o selo CARRO NOVO. Vêm marcados só os CONFIRMADOS; os PROVÁVEIS vêm desmarcados.
- Informação extra (versão, restrição, medida etc.) vem em campo separado (INFO) e NÃO entra no OBS: fica guardada à parte e aparece na tag azul **CHAT-GPT** (passe o mouse ou toque). Há tag na linha do carro (coluna Obs.) e, para info geral da peça, ao lado de "Versão · histórico".
- Item com dados do GPT mostra 🤖 no início do título (na lista e dentro do item). O título gravado não muda.
- Nomes como Volkswagen/Chevrolet vindos do GPT são convertidos para VW/GM e entram no bloco certo da montadora (ou criam um novo).

## v106
- Rótulo da caixa de aplicações no "Códigos via GPT" corrigido: "carros novos, motor/válvula e anos".

## v107
- (v106 saiu sem a correção) Rótulo da caixa de aplicações no "Códigos via GPT": "carros novos, motor/válvula e anos".

## v108 — GPT pesquisa EAN (código de barras) das marcas
- Nova caixa em Extras > Códigos via GPT: "EAN (código de barras) das marcas". Pode ser usada sozinha ou junto com códigos/aplicações.
- O GPT devolve `EAN: MARCA | CODIGO | NUMERO | CERTEZA | FONTE`, só se o número aparecer escrito numa página junto do código da peça (nunca calculado).
- O app confere o **dígito verificador** do EAN: número inválido aparece sem caixa e não pode ser aplicado.
- Avisos na prévia: já cadastrado, marca fora dos códigos do item, mesmo EAN em outro item, provável. Vêm marcados só os CONFIRMADOS, válidos, de marca do item e sem repetição em outros itens.
- Ao aplicar, entra no bloco EAN do item no formato `MARCA: CODIGO: NUMERO` (cria o bloco se não existir). Fica no histórico de versões.
- "Consultados" agora também é separado para EAN.

## v109 — EAN salvo pelo código
- O EAN do GPT agora entra no bloco `EAN:` no formato `CODIGO: NUMERO` (ex.: `MTE3030: 889038283823`), e não mais pela marca.
- Se o item não tem o bloco `EAN:`, ele é criado (duas linhas em branco depois de CÓDIGOS, como nos seus itens).
- Linha do GPT sem código é ignorada (aparece em "linhas ignoradas").

## v110
- Removido o 🤖 do título do item (lista e dentro do item). O 🤖 fica só no nome do carro adicionado pelo GPT, e a tag CHAT-GPT continua.

## v111
- (v110 saiu sem a correção) Removido o 🤖 do título do item (lista e dentro do item). O 🤖 fica só no nome do carro adicionado pelo GPT; a tag CHAT-GPT continua.

## v112
- O 🤖 das linhas adicionadas pelo GPT agora aparece na coluna Marca (depois do nome da montadora), e não mais na frente do modelo, para o Modelo/motor/válvula ficarem alinhados.

## v113
- O 🤖 agora fica pendurado na lateral esquerda do nome do carro (dentro da coluna Modelo, sem ocupar espaço). O texto do Modelo continua alinhado com as linhas sem robô; a coluna Marca volta a ficar limpa.

## v114
- Códigos via GPT: cada pedido ganhou o botão "☐ Marcar enviado" (vira "✅ Enviado" em verde e o pedido fica esmaecido). A marca fica salva neste navegador, ligada aos itens do pedido (continua marcada mesmo fechando a janela). "Zerar consultados" também limpa as marcas.

## v115
- Corrigido o "Itens por pedido" no Códigos via GPT: ao mudar o número e clicar direto em Copiar pedido, o clique se perdia (a janela era redesenhada no meio do clique) e ficava copiado o pedido anterior. Agora o botão sempre lê o número atual do campo antes de copiar, e o campo atualiza a lista sem perder o foco.
- O botão de copiar agora mostra "✅ Copiado (N itens)" para você conferir a quantidade.

## v116
- Tabela de aplicações: apagar o nome do modelo (clicar na célula, limpar e Enter) agora apaga a linha inteira da aplicação. Fica no histórico de versões do item.

## v117
- Digitar `!` na descrição (edição completa) ou na coluna Obs. da tabela (edição rápida) abre a lista de combustíveis: !alcool, !gasolina, !flex.
- Digitar `@` abre a lista das versões já cadastradas (mais usadas primeiro); `@tre` filtra. Se a palavra não existe, aparece "✚ nova versão" (cria como digitado) e, se parecer com uma existente (ex.: @trenldine), "parecida?" sugere a correta.
- Setas + Enter escolhem; Enter sem escolher mantém o que foi digitado. Esc fecha a lista.
- Versões (@) escritas fora de parênteses agora entram na lista Extras > Versões. Sem parênteses, separe as tags por vírgula (a versão vai até a próxima vírgula, !, + ou /).

## v118
- Removida a sugestão "parecida?" na lista do @ (continua "✚ nova versão").
- Edição rápida na tabela: clicar fora do campo agora SALVA (antes só Enter salvava). Esc continua cancelando.

## v119
- Edição rápida na tabela: o texto não fica mais todo selecionado ao clicar (cursor no fim). Só os anos (De / Até) continuam selecionados.

## v120 (interface mais limpa)
- "+ Novo item" virou só o ícone + (vermelho). "Extras" virou só um ícone de grade (verde); o número de itens marcados continua ao lado.
- Menu Extras: Backup (pergunta: DADOS, IMAGENS ou TUDO), Produtos (Grupos, Grupos de itens, Versões, Mesclar, Etiquetas, Importar lote/pastas de fotos/migração, Guia), Orçamento, Encomenda, Códigos via GPT, Modo TESTE, Atualizar, Sair. Todos com ícone.
- Abaixo da busca: botões quadrados com ícone — Limpar filtros (vassoura), Título (cinza = GERAL, vermelho = DETALHADO), Grupos de itens (cinza = SOLTOS, vermelho = AGRUPADOS), Marcar todos p/ etiqueta (vermelho quando marcados). As opções de Título e Grupos continuam salvas por navegador.
- Botão direito (ou segurar o dedo) em qualquer botão novo mostra o que ele faz.
- Importar migração: serve só para trazer dados exportados do app ANTIGO.

## v121
- Códigos via GPT: a tela lembra onde você parou (itens por título/marcados/lista, texto do título, itens por pedido, caixas "o que pesquisar", pular consultados, incluir desativados) mesmo fechando a tela ou recarregando o app, neste navegador.
- O texto colado em "Importar a resposta" também fica guardado até você aplicar (depois de aplicar, é limpo).

## v122
- "Filtros" virou só o ícone de funil. "Ordem: título/referência" virou um botão quadrado (setas): vermelho = ordem por TÍTULO, verde = ordem por REFERÊNCIA. Botão direito / segurar o dedo explica cada um.

## v123
- Removido o texto "Colunas" ao lado do seletor (fica só o quadrado dos números; botão direito/segurar explica).

## v124
- (v124 saiu sem esta mudança; ela entrou na v125.)

## v125
- Menu Produtos: removidos "Importar migração" e "Importar pastas de fotos". Ordem: Etiquetas, Importar lote, Mesclar itens, Grupos, Grupos de itens, Versões, Guia / avisos.

## v126
- Importar lote: envio de fotos com 8 envios simultaneos (antes 3) e fotos identicas enviadas uma vez so (itens reaproveitam o mesmo arquivo). So apaga arquivo de foto antigo/falho se nenhum outro item o usa.

## v127
- Corrigido: a tela de edição (🔧 da tabela de aplicações, 🔧 dos códigos, campos em edição) fechava sozinha. Causa: toda atualização de dados (sincronização com o Drive a cada 25 s, ou qualquer alteração salva) redesenhava o item aberto e destruía o que estava sendo digitado. Agora, enquanto você edita, o item não é redesenhado; ele atualiza quando você salvar ou cancelar.
- Novo botão 👁 (olho) nos filtros: cinza = mostra só os itens ativos; vermelho = mostra também os desativados. A escolha fica salva neste navegador.

## v128
- Cadastro mais rápido: motores separados por vírgula viram uma linha por motor ao salvar. Ex.: `#PALIO 1.0 8V, 1.4 8V, 1.6 16V   2015 > 2017 (FLEX)` vira três linhas, cada uma com os mesmos anos e observações. Funciona na edição rápida da célula Modelo, na chave inglesa (tabela de aplicações) e no formulário do item. Linhas de ano que vêm logo abaixo (`2018 > 2019`) são copiadas para cada motor.
- Só expande quando o texto antes das vírgulas é o nome do carro e todos os trechos depois são motores (começam com `1.0`, `2.0` etc.). Nomes com vírgula que não são motores, como `PALIO CELEBRATION, ECONOMY, FIRE`, não são mexidos.
- A lista de sugestões do `#` não mostra mais nomes com vírgula.

## v129
- Botão direito (ou segurar o dedo no celular) em qualquer lugar do item aberto mostra um menu com Desativar item / Ativar item, sem precisar subir até o topo. Não aparece sobre campos de texto, links e botões com dica, nem no modo visitante. Fecha ao clicar fora, rolar ou apertar Esc.

## v130
- Tecla F2 com um item aberto: desativa ou ativa o item (mesma ação do menu do botão direito, que agora mostra "(F2)").

## v131
- Removido o menu do botão direito no item (v129). Ficou só a tecla F2 (desativa/ativa o item aberto), pensada para o uso no computador.

## v132
- Edição manual da etiqueta: as fotos do produto aparecem em miniatura no canto direito do cartão do item (até 6). Clicar abre a foto grande com Anterior / Próxima e ✕ no canto superior direito (também funcionam as setas ← → e Esc; clicar fora fecha).

## v133
- Edição manual da etiqueta: tirei o "(para consulta)" do título. Ao lado do título há um botão de troca: vermelho = tabela de aplicações; verde = códigos do item (marca e códigos, mais EAN se houver). A escolha fica salva neste navegador.
- Logo abaixo da tabela aparece o quadro "Observações" quando o item tem observações; se não tem, nada aparece.

## v134
- Tela de etiquetas refeita: botões só com ícone. Salvar (disquete, vermelho) baixa em Word; botão direito (ou segurar no celular) abre "Salvar em PDF" e "Só códigos e montadoras (Word)". Lupa = pré-visualizar; cadeado fechado = trancar todas; cadeado aberto = destrancar todas; vassoura = limpar seleção; ✕ no canto superior direito = fechar.
- "✎ Manual" virou só uma caneta (nas colunas P/M/G e em "todas").
- Edição manual: ao sair (✕ ou Concluir), as etiquetas que você editou ficam trancadas (salvas). Ao abrir de novo o Manual, só aparecem as que ainda faltam (as trancadas são puladas). "Voltar à lista" virou o ✕ no canto superior direito.
- Salvar em PDF abre a janela de impressão do navegador com a prévia; escolha "Salvar como PDF". É a prévia aproximada, não o Word.

## v135
- Etiquetas: os links "todos para P / M / G" viraram botões P, M e G, com fundo cinza claro (cor de papel). Cada um envia todos os itens ainda sem tamanho para aquele tamanho.

## v136 — Modo lista nas etiquetas
- Novo botão (ícone de duas linhas) na barra das etiquetas: liga/desliga o **modo lista** (1 coluna, folha em retrato). Vermelho = lista ativa; fica salvo no navegador.
- Vale para Word (Salvar), pré-visualização e PDF. Assim só é preciso cortar as linhas horizontais entre as etiquetas.

## v137 — Login sem recarregar a página
- O botão de login (e o aviso "Sem login") agora abre uma **janela pop-up** do Google em vez de redirecionar a página inteira; você continua exatamente de onde parou (lista, busca, item aberto).
- Se o navegador bloquear o pop-up, usa o login em tela cheia como antes (plano B).

## v138 — Login volta a ser em tela cheia (sem pop-up), mas lembrando onde você estava
- Desfeita a v137 (pop-up causava spam no celular). O login volta a redirecionar a página.
- Antes de ir ao Google, o app guarda filtros, rolagem e item aberto; ao voltar, restaura tudo automaticamente.

## v139 — Meus carros (dentro de Títulos)
- Títulos → botão **Meus carros**: lista de carros por montadora (só a palavra do carro: PALIO, UNO, GOL; "GRAND SIENA", "NEW FIESTA", "SANTA FE" mantêm as duas palavras). Marque os que você trabalha; fica salvo no catálogo (cfg/meuscarros).
- Escolha um título: mostra quantos itens têm seus carros (ficam), quantos não têm nenhum (candidatos), quantos sem aplicação (não mexe) e quantos já desativados. Botão **Desativar os sem meus carros** (pede confirmação) e **Desfazer** (reativa só os que essa função desativou).

## v140 — Títulos com ícones, Meus carros com a lista do usuário, Orçamento com desconto/parcelas
- Títulos: Mesclar / Editar / Geral-Detalhado / Meus carros viram ícones. Mesclar e Editar **ficam ligados** após aplicar (botão "Desligar" para sair).
- Meus carros: vem pré-marcada a lista de carros e montadoras do usuário (LISTA_CARROS_E_MONTADORAS.txt); a seleção agora vale por montadora (147 da Alfa não conta como 147 da Fiat). VW/Audi/Seat, Hyundai/Kia agrupados. Botão "Usar minha lista" restaura.
- Orçamento: campos DESCONTO (% ou valor final) e PARCELAS abaixo do TOTAL. Impressão/imagem: TOTAL, A VISTA, PARCELAS N x de valor. Desconto não se aplica às parcelas (usam o valor cheio).

## v141 — Orçamento: A VISTA/PARCELADO junto do TOTAL
- TOTAL, A VISTA e PARCELADO ficam juntos; os campos DESCONTO e PARCELADO vêm logo abaixo. "PARCELAS" renomeado para "PARCELADO" (tela, imagem e impressão).

## v142 — Meus carros: montadoras recolhidas
- Ao abrir "Meus carros" todas as montadoras vêm fechadas (só abrem ao tocar no nome ou ao buscar). Mostra "marcados/total" em cada uma.

## v143 — Olho (só desativados), menu da etiqueta, FALTAS
- Olho dos desativados: botão direito = **só os desativados** (fundo verde); botão direito de novo volta ao normal. Clique normal alterna ativos / ativos+desativados (vermelho).
- Botão de etiqueta (tag): clique marca/desmarca todos da lista; contador na bolinha verde. Botão direito: **GERAR ETIQUETAS** e **LIMPAR ETIQUETAS** (apaga toda a seleção, não só a tela). "Etiquetas" saiu do menu Extra > Produtos.
- Extra > **Faltas**: nome da falta (vazio = "FALTA"; o que diferencia é o ID nº 000001…), busca do item por referência, código similar ou título, quantidade e observação. Toque no item abre a tabela dele só para consulta (sem editar). Botão direito na quantidade/observação edita. ✓ marca como já pedido (vai para o final); ✕ remove. Salvar, faltas salvas (📂), nova (➕), imagem (WhatsApp), impressão TM-T20 (80 mm, com prévia) e impressora comum (A4). Itens já pedidos saem no fim, em "JÁ PEDIDOS".

## v144 — Faltas: correção dos botões, setas, fora do catálogo, consulta simples
- **Correção**: depois de abrir um item, os botões ✓/✕ da Faltas paravam de funcionar (id duplicado com a tela do item). Ids da Faltas renomeados.
- Quantidade com setas ▲▼ (mínimo 1), na linha de adicionar e em cada item da lista.
- Ao buscar/escolher um item que já está na falta aparece "⚠ já está na falta (Q. n)" e a linha é destacada.
- Itens fora do catálogo: última sugestão "+ Adicionar “texto” (fora do catálogo)" (ou o botão + com o texto digitado). Ficam salvos; botão direito no nome renomeia.
- Imagem, TM-T20 e A4: referência + título curto (antes do "-") + montadora.
- Tocar no item abre tela simples só de consulta: fotos, tabela de carros, códigos, EAN e relacionados (navega entre relacionados, botão ← volta).

## v145 — Prévia do lote antes de salvar
- Após "Importar lote" → opções, abre a **Prévia do lote** (nada é gravado até confirmar).
- Abas: **Códigos coincidem** (códigos/EAN/carros batem com item existente: escolher "Juntar com…" ou "Criar como novo"), **Novos**, **Mesclar (mesma referência)**, **Avisos**.
- Sinais de correspondência: forte (código/EAN igual, mesmo tipo) e médio (mesmo tipo + aplicações parecidas). Padrão: junta só se "forte".
- Botão 🚫 desativar por item ou por título (grupo); itens entram com "~" no título.
- Desmarcar item = não importa. Confirmação final mostra os totais.

## v146 — Tela "Importar lote" persistente (F1)
- Botão "Importar lote" e a tecla **F1** abrem uma tela cheia. Esc/✕ fecha; ao voltar, continua de onde parou (aba, seleção). A lista fica guardada neste navegador (IndexedDB) até você importar ou descartar.
- **IMPORTAR (.ZIP)** (aceita vários arquivos): escolhe Substituir/Mesclar/Nada e os itens entram nas abas, somando com o que já estava na lista. **VER HISTÓRICO**: cada lote e o status de cada item (pendente, importado, mesclado, ignorado…), com "descartar pendentes".
- Abas: **Novos**, **Códigos coincidem**, **Mesclar** (mesma referência de item do cadastro), **Avisos** (repetidos/sem título ou referência/já na lista).
- Tela dividida: esquerda = itens do lote; direita = coincidências do item selecionado + busca no cadastro (ID/Ref, Título, Aplicação, Código, EAN). A seta ▸ abre a tabela (carros, códigos, EAN, observações e fotos do lote).
- 🔀 Mesclar: marca 1 item da esquerda e 1 da direita, escolhe o principal (lote ou cadastro) e Save. Na prática o item do lote é somado ao existente (principal = lote também troca o título; a referência/ID/fotos do cadastro permanecem).
- 🚫 entra desativado (vai para o fim da lista); ✕ tira da importação sem apagar da lista.
- "Importar para o sistema oficial" importa a aba atual; os importados saem da lista.

## v147 — Ajustes da tela Importar lote
- Fotos nas duas pontas: ao abrir a seta ▸ aparecem as fotos do item (lote à esquerda, cadastro à direita; clique para ampliar).
- Busca da direita no mesmo padrão da página inicial (Título, Aplicação, Ano, Código, ID/Referência, EAN), usando o mesmo filtro.
- Tabela do item dividida em seções com título e linha: Fotos, Aplicações, Códigos, EAN, Observações.
- Desfazer mesclagem: botão "↩ desfazer mesclagem" no item do lote; "Juntar"/"desfazer" também nos resultados da busca.

## v148 — Orçamento em andamento
- O orçamento fica guardado neste aparelho (rascunho): fechar, pesquisar um item, recarregar a página ou fechar o navegador não perde nada. Ao reabrir, volta com carro, itens, desconto, parcelas, observações e o que estava digitado em "Adicionar item".
- Fechar o orçamento (✕) não pergunta mais nada.
- Botão de atalho no topo (à esquerda dos botões da direita), só aparece quando há orçamento em andamento; mostra a quantidade de itens.
- **F2** na página inicial abre o orçamento de onde parou (F2 dentro do orçamento fecha).
- 🧹 Limpar tudo: apaga o orçamento atual (com confirmação) para começar do zero.

## v149
- Botão de atalho do orçamento: botão direito (ou segurar o dedo no celular) termina e limpa o orçamento, com confirmação, sem abrir a tela.

## v150
- Importar lote: coincidência agora só por **código** (e EAN); aplicações/carros parecidos não geram mais "coincidem".
- **Importações de lote** (Produtos › Importações de lote, ou botão na tela F1): lista as importações, com **Desfazer importação** (apaga os itens novos e restaura os mesclados; itens editados depois são preservados). Recupera importações dos últimos 3 dias pelo histórico de versões.
- Itens novos criados por lote ganham a etiqueta **NOVO** na lista (até "Marcar como vistos") e há filtro "Ver itens novos".

## v151
- Botão direito no olho (itens desativados) agora abre um menu: **NOVOS** (dourado: só itens novos importados por lote) ou **DESATIVADOS** (verde: só os desativados). Clicar de novo na opção marcada desliga.
- A etiqueta NOVO some sozinha 15 dias depois do cadastro do item.

## v152
- Itens cadastrados manualmente (Cadastro do item) também ganham a etiqueta NOVO e aparecem no filtro NOVOS, por 15 dias.

## v153
- Botão do olho com 4 modos no clique esquerdo: cinza = só ativos; vermelho = ativos + desativados; verde = só desativados; dourado = só itens NOVOS. Removido o menu do botão direito.

## v154
- Menu: "Códigos via GPT" agora se chama **CHAT-GPT**. Logo abaixo, novo botão **Tabela do distribuidor** (escolhe o item e cola a APLICAÇÃO COMPLETA + EQUIVALÊNCIA do site do distribuidor; também há o botão no item, ao lado de "Versão … histórico"). Gera aplicações por montadora com motor, anos e versões `@`, códigos por marca (ORIGINAL agrupado) e o motor na OBSERVAÇÃO; prévia antes de aplicar, juntar/substituir/não mexer. Anos finais ≥ ano atual viram XXXX.
- Importar lote (F1): novo botão **CHAT-GPT** que gera pedidos para os itens do lote (códigos, aplicações 🤖, EAN), recebe a resposta pela REF e aplica nos itens do lote (pendentes) para que eles passem a coincidir com o cadastro. Guarda o original: "ver original" e "voltar ao original" (por item ou todos). Info do GPT pode entrar na OBSERVAÇÃO (opcional).

## v155
- "CHAT-GPT" agora se chama **ASSISTENTE AI** (menu, tela e botão no importar lote); textos aceitam Gemini ou ChatGPT.
- **Tabela do distribuidor** removida das telas (menu e botão no item). O código da função continua guardado no arquivo, sem acesso pela interface.
- Cabeçalho do Importar lote só com ícones: + (importar .zip), lista (histórico), seta (importações/desfazer), robô (assistente AI) e X (fechar). Passe o mouse para ver a dica.

## v156
- Assistente AI no importar lote: o pedido agora traz "BUSCAR POR: <marca> <código>" (ex.: SABO 77911) mais os outros códigos do item, e instrui o assistente a pesquisar também cada código novo que achar (original, Cofap, Nakata etc.) em outros sites, cruzando as informações. CONFIRMADO só com 2 fontes independentes ou catálogo do fabricante; divergências vão em INFO; a peça tem de ser a mesma do título (tipo e lado).

## v157
- Assistente AI no lote: pedidos de até 10 itens (antes 30; aviso se passar de 15) e dica na tela: um chat novo para cada pedido.
- O pedido agora exige pesquisa item por item e proíbe "SEM NOVOS" sem pesquisar: cada item sem novidade precisa de uma linha `INFO: PESQUISADO: ...` com o que buscou e onde; itens não pesquisados vão em `NAO PESQUISADOS: REFs`.
- Ao colar a resposta, o app mostra a linha PESQUISADO de cada item "sem novos", avisa quando ela não existe (talvez não pesquisou) e lista os "não pesquisados".
- Comando curto do lote reescrito (pesquisar de verdade, item por item).

## v158
- Assistente AI no lote: **um só botão** "Copiar próximo pedido" (comando + itens no mesmo texto) e a caixa de **colar a resposta fica no topo**. A lista com todos os pedidos ficou recolhida ("Ver todos os pedidos").
- Itens que a resposta pesquisou (com PESQUISADO: ou com dados) são marcados como consultados ao aplicar; o próximo pedido é sempre o botão de cima. Itens "SEM NOVOS" sem a linha PESQUISADO continuam pendentes e voltam no próximo pedido.
- A caixa de resposta mantém o texto ao mudar as opções.

## v159
- Assistente AI no lote: o app agora decide a certeza pelas **fontes**: o pedido manda listar os sites de cada aplicação (FONTE) e 2 ou mais sites diferentes (www/subdomínios contam como o mesmo) viram CONFIRMADO e vêm marcados. A prévia mostra o número de fontes e os sites de cada aplicação.
- O pedido pede aplicações por modelo e período, com MOTOR só quando a fonte disser (traço `-` se não disser); a leitura aceita linha APP sem motor (também na tela ASSISTENTE AI do menu).
- Nova linha `INFO: VALIDACAO:` (códigos novos pesquisados na 2ª etapa e sites); a prévia mostra e avisa quando falta.
- Botões "marcar apps / desmarcar" por item e "marcar/desmarcar todas as aplicações" para todos.

## v160
- Importar lote: cada item da esquerda (abas Novos, Códigos coincidem e Mesclar) ganha um botão verde de **importar agora** (ícone de envio, ao lado do 🚫/✕). Envia só aquele item ao catálogo oficial: novo, juntando com o item marcado ("JUNTAR →") ou atualizando o de mesma referência, e ele sai da lista. Em "Códigos coincidem" sem item marcado para juntar, pergunta antes de criar como novo.
- As importações rápidas feitas em até 30 min são agrupadas num único registro em "Importações / desfazer" (dá para desfazer o grupo todo).

## v161
- Importar lote: no **Histórico** cada lote tem o botão "abrir só este lote". A tela passa a mostrar só aquele zip (abas, contadores, avisos, importar para o oficial e assistente AI valem só para ele). Faixa "LOTE: nome · trocar · ver todos". As edições ficam salvas em cada lote e a aba em que você parou é lembrada por lote. Ao importar um zip novo, ele já abre.
- Produtos relacionados: abrir um item a partir de outro empilha a navegação; ✕ ou Esc volta para o item anterior (só fecha tudo quando não há anterior).

## v162
- **Fotos por ID do item** (não mais pela referência). Migração automática única: ao abrir, as fotos de cada item são copiadas para `img/id_<ID>`; as antigas ficam guardadas (nada é apagado). Trocar a referência não mexe mais nas fotos. Itens que dividiam a mesma referência passam a ter fotos próprias.
- **Títulos › ícone de etiqueta: trocar referência por marca.** Digite o título (COXIM = todos; COXIM DO MOTOR = só o do motor) e a marca; a referência vira o código dessa marca em CÓDIGOS. Mostra prévia (trocam / já estão / de fora). Depois abre a tela **De fora**: tabela de códigos do item, toque no código para usá-lo ou digite a referência. Fica no histórico de versões.

## v163
- Assistente AI (lote): clicar no **título** do item abre uma **janela** só de consulta com a tabela atual do item (aplicações, códigos, EAN, observações). ✕, Fechar, clique fora ou Esc fecham só essa janela.

## v164
- Assistente AI: "Itens alterados pelo assistente" agora tem **setinha** para recolher/abrir a lista (lembra o estado enquanto a janela está aberta).

## v165
- **Assistente AI › Pesquisar › "imagens 🖼"**: o pedido passa a pedir linhas `IMAGEM: <link direto> | <página>` (até 3 por item, sem inventar link). Ao colar a resposta, cada item mostra as miniaturas com caixinha e os links da imagem/página.
- Ao aplicar, o app baixa as fotos marcadas e guarda no item do lote (entram na importação, vão para o item pelo ID). Se o site não permitir o download, a foto vai para a lista **"Fotos que o site não deixou baixar"**, com "abrir imagem", "📋 colar foto" (copie a imagem e cole) e "📁 escolher arquivo".
- "↩ voltar ao original" também remove as fotos adicionadas pelo assistente.
