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
