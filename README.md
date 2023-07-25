
## 🖥 Sobre o projeto:

<p align="justify"> Projeto realizado no final do módulo de backend do curso de desenvolvimento web da Trybe, realizado em junho de 2023. O projeto realizado é a criação de uma API que é consumida por um front-end já disponibilizado pela Trybe. A API fornece dados sobre partidas finalizadas e em andamento, bem como informações dos times e permite a autenticação de usuários. É possível adicionar uma partida, sendo necessário o uso de um token, portanto a pessoa deverá estar logada para fazer as alterações. o projeto está estruturado em containers, sendo os serviços de database e backend onde eu trabalhei, o frontend, como citado anteriormente, foi disponibilizado pela Trybe.</p>

## 🛠 Tecnologias e libs utilizadas:
<p>As seguintes ferramentas foram utilizadas na construção do projeto:</p>

- [Typescript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [Mysql](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [node.js](https://nodejs.org/en)
- [express](https://expressjs.com/pt-br/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)

## ↗️ Endpoints:
### Teams
```
/teams
```
- Utiliza o método do tipo GET.
- Retorna um json com todos os times armazenados no banco de dados. cada time possui um id e um teamName.

```
/teams/:id
```
- Utiliza o método do tipo GET.
- Retorna os dados do time especificado pelo id presente no parâmetro da URL.

### Users e Login (credenciais de acesso)
```
/login
```
- Utiliza o método do tipo POST.
- o enpoint não permite o acesso caso o email ou a senha não sejam informados, retornando um erro de código 400.
- Caso o login seja realizado com sucesso, é retornado um token que será requisitado ao tentar adicionar ou alterar partidas.

### Matches
```
/matches
```
- Utilizado o método do tipo GET:
  - Retorna um json com todas as partidas presentes no banco de dados
  - É possível filtrar as partidas, mostrando somente as em andamento ou finalizadas utilizado query strings: ex: ```matches?inProgress=true```
- Utilizando o método do tipo POST:
  - Deve inserir uma partida no banco de dados
  - É necessário um token válido para que a inserção ocorra, caso contrário, a requisição retornará um erro de código 401.
  - Não é possível inserir uma partida com dois times iguais ou com um time que não exista na tabela de times (/teams)
  - Em caso de sucesso, retorna a partida inserida no banco de dados.
```
/matches/:id
```
- Utiliza o método do tipo PATCH.
- Atualiza uma partida em andamento, sendo necessário um token válido para que a operação ocorra.
- Caso o token não esteja presente ou não seja válido, retorna um erro de código 401
```
/matches/:id/finish
```
- Utiliza o método do tipo PATCH.
- Finaliza uma partida em andamento, sendo necessário um token válido para que a operação ocorra.
- Caso o token não esteja presente ou não seja válido, retorna um erro de código 401.

### Leaderboards
```
/leaderboard/home
```
- Utilizado o método do tipo GET.
- Retorna um json com as informações do desempenho dos times da casa
- Partidas em andamento (não foram finalizadas) não são consideradas.
```
/leaderboard/away
```
- Utilizado o método do tipo GET.
- Retorna um json com as informações do desempenho dos times visitantes.
- Partidas em andamento (não foram finalizadas) não são consideradas.
```
/leaderboard
```
- Utilizado o método do tipo GET.
- Retorna um json com as informações do desempenho geral dos times.
- Partidas em andamento (não foram finalizadas) não são consideradas.

## 👾Autor

 <a href="https://github.com/Gui-lfm">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/72154970?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Guilherme Lucena</b></sub></a>
 
 ### ✉contato:
<div>
  <a href="mailto:guilherme.lucena17@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"/></a>
  <a href="https://www.linkedin.com/in/guilherme-lucena-fm94/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/></a>
</div>
