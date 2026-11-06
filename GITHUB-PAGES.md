# Publicar no GitHub Pages (grátis, sem limite de deploys)

1. Crie uma conta em github.com (se ainda não tiver). Anote o nome de usuário, ex.: `fulano`.
2. Novo repositório (botão **New**): nome **fulano.github.io** (exatamente seu usuário + `.github.io`), visibilidade **Public**, marque "Add a README".
   - O nome precisa ser esse para o app ficar na raiz do endereço; o app usa caminhos que só funcionam na raiz.
3. No repositório: **Add file → Upload files**, arraste **todos os arquivos desta pasta** (inclusive `.nojekyll`, se o Windows mostrar; se não aparecer, não tem problema) e clique **Commit changes**.
4. **Settings → Pages**: em "Build and deployment" escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e salve. Em 1–2 minutos o site abre em `https://fulano.github.io`.
5. **Google Cloud** (mesmo projeto do Client ID): APIs e serviços → Credenciais → seu ID do cliente OAuth → **Origens JavaScript autorizadas** → adicionar `https://fulano.github.io` → Salvar (pode levar alguns minutos).
6. Abra o endereço novo, entre com o Google e instale o app de novo (o endereço mudou, então o PWA antigo não é o mesmo).

Para atualizar depois: no repositório, **Add file → Upload files** com os arquivos novos (substitui os antigos) e Commit. Cada atualização leva ~1 min para valer; aparelhos pegam a versão nova ao reabrir o app.

Observação: o repositório é público, então o código do app e o Client ID ficam visíveis. O Client ID não é segredo (só funciona nas origens autorizadas) e o catálogo continua no seu Drive.
