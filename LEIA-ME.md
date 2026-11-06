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
