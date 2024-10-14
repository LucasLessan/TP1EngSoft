# Pointify/DCCheckout

## Membros da Equipe
- Álvaro Cândido de Oliveira Neto - 2019117198 (Full)
- Giulia Monteiro Silva Gomes Vieira - 2016006492 (Full)
- Larissa Oliveira Aguiar - 2020094295 (Full)
- Lucas Santos Teles - 2017014995 (Full)

## Objetivos e principais features:

O objetivo deste trabalho é a estruturação e implementação de um sistema simples de gerenciamento das operações de uma loja, com registro de vendas e manejo de estoque.

As principais features do trabalho são:
- Banco de dados do estoque da loja
- Página de operações do vendedor com registro de vendas
- Página de operações de gerente, com permissão para gerenciamento de estoque e vendas
- Geração de relatórios
- Registro das transações financeiras da loja
- Sysadmin para gerenciar usuários e permissões
 
## Backlog do Produto
Será desenvolvido um sistema de PDV com uma base comum que poderá ser adaptado para diferentes setores de mercado dependendo das intenções dos clientes:

1. Como vendedor, eu gostaria de criar e ler uma venda.
2. Como gerente, eu gostaria de criar, ler, atualizar e remover um produto no estoque.
3. Como gerente, eu gostaria de atualizar e remover uma venda.
4. Como admin, eu gostaria de criar, ler, atualizar e remover usuários.
5. Como vendedor, eu gostaria de criar e ler clientes.
6. Como gerente, eu gostaria de atualizar e remover clientes.
7. Como diretor, eu gostaria de ter um sistema de controle de fluxo de caixa.
8. Como diretor, eu gostaria de criar, ler e remover relatórios de vendas.
9. Como diretor, eu gostaria de criar, ler e remover relatórios de vendedores.
10. Como diretor, eu gostaria de aplicar, atualizar e remover descontos em produtos.

Obs.: Exite uma hierarquia dos tipos de usuários da seguinte forma admin > diretor > gerente > vendedor. Sendo assim, cada tipo de usuário pode fazer tudo que seu tipo e aqueles abaixo podem.

## Backlog do Sprint

**História #1**: Como admin, eu gostaria de criar, ler, atualizar e remover usuários.

**Tarefas e responsáveis**:
  <ol>
    <li><b>Estruturar o banco de dados.</b></li>
      <ol>
        <li>Definir as tabelas, relacionamentos e atributos necessários para o armazenamento de dados dos usuários (ID, nome, e-mail, senha, tipo de usuário etc.). [Álvaro]</li>
      </ol>
    <li><b>Criar sistema de login e autenticação de usuários.</b></li>
      <ol>
        <li>Implementar o formulário de login com validação de credenciais. [Lucas]</li>
      </ol>
    <li><b>Desenvolver sistema CRUD para gerenciamento de usuários.</b></li>
      <ol>
        <li>Implementar funcionalidades para criar, ler, atualizar e remover usuários via interface de administração. [Álvaro, Larissa] </li>
        <li>Integrar o sistema com o banco de dados para persistência das operações CRUD. [Giulia]</li>
      </ol>
    <li><b>Implementar a hierarquia dos tipos de usuários.</b></li>
      <ol>
        <li>Definir a hierarquia de usuários (ex: administrador, gerente, vendedor). [Giulia]</li>
        <li>Implementar controle de acesso baseado no tipo de usuário, garantindo que apenas usuários com permissões adequadas possam acessar determinadas funcionalidades. [Larissa]</li>
      </ol>
  </ol>

---

**História #2**: Como vendedor, eu gostaria de criar e ler uma venda.

**Tarefas e responsáveis**:
  <ol>
    <li><b>Estruturar o banco de dados.</b></li>
      <ol>
        <li>Criar as tabelas para armazenar informações das vendas (ID do vendedor, itens vendidos, valores, data etc.). [Giulia]</li>
      </ol>
    <li><b>Desenvolver interface para criação de vendas.</b></li>
      <ol>
        <li>Criar a interface onde o vendedor poderá registrar uma nova venda, com detalhes dos produtos e método de pagamento e validar entrada de dados e calcular valores totais. [Álvaro, Lucas]</li>
      </ol>
    <li><b>Criar sistema para visualização de vendas realizadas.</b></li>
      <ol>
        <li>Desenvolver a funcionalidade para listar vendas realizadas, com filtro por data e vendedor. [Larissa]</li>
        <li>Implementar a integração com o banco de dados para exibição dos dados de vendas. [Álvaro]</li>
      </ol>
  </ol>

---

**História #3**: Como gerente, eu gostaria de criar, ler, atualizar e remover um produto no estoque.

**Tarefas e responsáveis**:
  <ol>
    <li><b>Estruturar o banco de dados.</b></li>
      <ol>
        <li>Criar as tabelas para armazenar informações de produto (ID do produto, descrição, quantidade, preço etc.). [Lucas]</li>
        <li>Definir relacionamentos com produtos e vendedores. [Larissa]</li>
      </ol>
    <li><b>Desenvolver sistema CRUD para gerenciamento de produtos.</b></li>
      <ol>
        <li>Implementar funcionalidades para criar, ler, atualizar e remover produtos via interface de gerência. [Giulia]</li>
        <li>Integrar o sistema com o banco de dados para persistência das operações CRUD. [Álvaro]</li>
      </ol>
    <li><b>Desenvolver interface para manejo de estoque.</b></li>
      <ol>
        <li>Criar a interface onde o gerente poderá criar, ler,  atualizar,  remover um produto no estoque. [Lucas]</li>
      </ol>
  </ol>

---

**História #4**: Como gerente, eu gostaria de atualizar e remover uma venda.

**Tarefas e responsáveis**:
  <ol>
    <li><b>Estruturar o banco de dados.</b></li>
      <ol>
        <li>Adicionar funcionalidades de atualizar e remover venda no banco de dados. [Lucas, Larissa]</li>
      </ol>
    <li><b>Desenvolver interface.</b></li>
      <ol>
        <li>Adicionar funcionalidades de atualizar e remover venda na página do gerente. [Álvaro, Giulia]</li>
      </ol>
  </ol>

## Tecnologias
- React, Express, NodeJS, Python, MariaDB
