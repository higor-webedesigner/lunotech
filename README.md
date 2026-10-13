# Luno Tech — publicação na Vercel

Pacote estático com HTML, CSS, JavaScript e imagens. Não exige build, dependências ou variáveis de ambiente.

## Publicar pelo GitHub

1. Extraia o ZIP.
2. Crie um repositório no GitHub (pode ser privado).
3. Envie o CONTEÚDO da pasta extraída para a raiz do repositório: vercel.json, dist/ e os demais arquivos. Preserve a pasta dist e confirme o envio em Commit changes. Não envie apenas o ZIP.
4. Entre em https://vercel.com/new e conecte sua conta do GitHub.
5. Importe o repositório criado.
6. Use Framework Preset: Other; Root Directory: raiz do repositório; Output Directory: dist; Build Command e Install Command: vazios. O arquivo vercel.json já define essas opções.
7. Clique em Deploy. A Vercel fornecerá o endereço publicado.

Atualizações enviadas à branch de produção do repositório serão publicadas automaticamente.

## Alternativa pelo terminal (com Node.js instalado)

Abra o terminal na pasta que contém vercel.json e execute:

    npx vercel --prod

Faça login quando solicitado, selecione sua conta/equipe e crie o projeto. Mantenha a pasta atual como diretório do projeto.

## Domínio próprio

Após publicar, abra Settings > Domains no projeto da Vercel. Adicione seu domínio e aplique no provedor de DNS os registros que a Vercel indicar. O endereço antigo do ChatGPT Sites não é transferido automaticamente.

## Conteúdo incluído

- Comparação interativa de site de energia solar antes/depois.
- Demonstração de computador e celular na tela inicial.
- Layout responsivo, animações e opção de pausar movimento.
- Botão fixo de WhatsApp: +55 41 98836-1393.
- Instagram: https://www.instagram.com/_lunotech/
- O formulário abre uma conversa no WhatsApp com os dados preenchidos; não há backend de envio.
- Fontes carregadas pelo Google Fonts exigem conexão com a internet.

Arquivos de hospedagem anterior, credenciais e histórico Git não fazem parte deste pacote. Os créditos das imagens estão em ASSET-CREDITS.md.

## Referências

https://vercel.com/docs/git
https://vercel.com/docs/builds/configure-a-build
https://vercel.com/docs/cli/deploy

Este pacote foi preparado para publicação; ele ainda não foi implantado em uma conta Vercel.
