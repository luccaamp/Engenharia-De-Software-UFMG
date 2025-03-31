# Trabalho Prático da Disciplina de Engenharia de Software
**Alunos:** **Layla Pereira, Leticia Ribeiro, Lucas Costa, Lucca Alvarenga**  
Departamento de Ciência da Computação – Universidade Federal de Minas Gerais (UFMG) Belo Horizonte – MG – Brazil 

## Objetivo e Principais Features

O objetivo deste projeto é desenvolver uma plataforma para a gestão de notas, tarefas e atividades das disciplinas da universidade. A plataforma permitirá que os alunos organizem seu desempenho acadêmico, acompanhem prazos das provas e entregáveis e visualizem suas notas graficamente.

As principais features estão destacadas abaixo.

**Gerenciamento de Disciplinas:** Adição, edição e remoção de disciplinas; Associação de notas, tarefas e atividades a cada disciplina; Organização por semestre ou período letivo.

**Gerenciamento de Notas:**  Registro e visualização de notas por disciplina; Cálculo automático das estatísticas. 

**Controle de Tarefas e Atividades:** Criação e organização de tarefas por disciplina; Definição de prazos e ordenação de acordo com o vencimento; Marcação de tarefas como concluídas.  

**Dashboard Personalizado:** Resumo do desempenho acadêmico; Destaque para tarefas e atividades pendentes; Interface intuitiva e responsiva.  

**Perfil dos Usuários:** Perfis individuais para estudantes; Possibilidade de personalização do design da plataforma.  

## Membros da Equipe e Responsabilidades
**Layla Raissa Silva Pereira:** Responsável pelo frontend da plataforma, garantindo uma experiência visual responsiva para os estudantes.

**Leticia Ribeiro Miranda:** Trabalha na implementação do backend do sistema e estrutura de dados. Também auxilia no UX design da plataforma e no gerenciamento dos entregáveis.

**Lucas Rafael Costa Santos:** Atua tanto no frontend quanto no backend, integrando a interface do usuário com a lógica do servidor e banco de dados.

**Lucca Alvarenga de Magalhães Pinto:** Responsável pelo backend da plataforma, testes e no gerenciamento dos entregáveis.

## Tecnologias Utilizadas  

Para o frontend da plataforma, será utilizado React.js combinando com **Tailwind CSS**. Ja no backend, optou-se pela linguagem **Python**, utilizando o framework **Django** ou **FastAPI**. Por fim, o banco de dados será estruturado com o MySQL. 

## Backlog do Produto

1. Como usuário, eu gostaria de me cadastrar na plataforma com login e senha. 
2. Como usuário, eu gostaria de adicionar disciplinas 
3. Como usuário, eu gostaria de editar e deletar disciplinas
4. Como usuário, eu gostaria de criar tarefas
5. Como usuário, eu gostaria de adicionar descrições para cada tarefa
6. Como usuário, eu gostaria de adicionar datas das tarefas
7. Como usuário, eu gostaria de editar e deletar tarefas
8. Como usuário, eu gostaria de adicionar notas
9. Como usuário, eu gostaria de editar e deletar notas
10. Como usuário, eu gostaria de acompanhar minhas notas graficamente
11. Como usuário, eu gostaria de visualizar as tarefas mais próximas do vencimento
12. Como usuário, eu gostaria de agrupar disciplinas por semestres
13. Como usuário, eu gostaria de alterar meu e-mail e minha senha
14. Como usuário, eu gostaria de configurar meu perfil
15. Como usuário, eu gostaria de personalizar o design da minha conta
16. Como usuário, eu gostaria de fazer simulações de notas
17. Como usuário, eu gostaria de visualizar estatísticas detalhadas sobre meu desempenho acadêmico
18. Como usuário, eu gostaria de definir metas acadêmicas e acompanhar meu progresso

## BackLog do Sprint

**História #1: Como usuário, eu gostaria de me cadastrar na plataforma com login e senha**

Tarefas e responsáveis:  
- Instalar banco de dados [Lucca]  
- Criar tabela de usuário [Leticia]  
- Integrar com banco de dados para cadastro do usuário [Leticia]  
- Criar o design da tela de cadastro de usuário [Layla]  
- Implementar o frontend de cadastro de usuário [Layla]  
- Implementar validação de dados (e-mail, senha) [Lucas]  
- Criar backend para registro de novos usuários [Lucas]  
- Integrar frontend com a API de cadastro de usuários [Lucca]  
- Criar o design tela principal [Leticia]  
- Implementar versão inicial da tela principal [Layla]  
- Implementar redirecionamento após cadastro bem-sucedido [Leticia]  
- Criar mensagens de erro e feedback para o usuário no cadastro [Lucca]  
- Testar fluxo de cadastro (sucesso e erro) [Lucca]   

**História #2: Como usuário, eu gostaria de adicionar disciplinas**

Tarefas e responsáveis:  
- Criar o design da tela de adição de disciplinas [Leticia]  
- Implementar o frontend de adição de disciplinas [Layla]  
- Criar tabela de disciplinas de cada usuário [Leticia]  
- Criar mecanismo para evitar duplicação de disciplinas  
- Implementar backend para criação de novas disciplinas [Lucas]  
- Integrar frontend com API para adicionar disciplinas [Lucca]   
- Testar criação de disciplinas [Layla]  

**História #3: Como usuário, eu gostaria de editar e deletar disciplinas**

Tarefas e responsáveis:
- Criar o design da tela para edição de disciplinas [Leticia]  
- Implementar o frontend de edição de disciplinas [Layla]  
- Implementar lógica de backend para edição e exclusão de disciplinas [Leticia]   
- Implementar confirmação antes de deletar disciplinas [Layla]  
- Implementar a lógica de atualizar lista de disciplinas após edição ou exclusão [Lucas]  
- Testar edição e deleção de disciplinas [Lucca]   

**História #4: Como usuário, eu gostaria de criar tarefas.**

Tarefas e responsáveis:
- Criar o design da tela de criação de tarefas [Leticia]
- Implementar o frontend de criação de tarefas [Layla]
- Criar tabela de tarefas de cada usuário [Leticia]
- Implementar backend para criação de tarefas [Lucca] 
- Integrar frontend com API para criar tarefas [Lucas]
- Testar criação de tarefas [Layla]

História #5: Como usuário, eu gostaria de adicionar descrições para cada tarefa.

Tarefas e responsáveis:
Adicionar campo de descrição na tela de criação de tarefas [Lucca] 
Implementar backend para salvar descrição da tarefa [Leticia]
Testar a adição e exibição de descrições de tarefas [Lucas]

**História #6: Como usuário, eu gostaria de adicionar datas das tarefas**

Tarefas e responsáveis:
- Criar campo para inserção de data de vencimento na tela de criação de tarefas [Lucca]   
- Implementar lógica de backend para salvar data da tarefa [Lucas]  
- Testar o processo de adição de datas nas tarefas [Lucca]  

História #7: Como usuário, eu gostaria de editar e deletar tarefas.

Tarefas e responsáveis:
Criar o design da tela de edição de tarefas [Leticia]
Implementar o frontend de edição de tarefas[Layla]
Implementar lógica de backend para edição e exclusão de tarefas [Leticia]
Implementar opção de marcar tarefa como concluída[Layla]
Implementar confirmação antes de deletar a tarefa [Lucca]
Implementar a lógica de atualizar lista de tarefas após edição ou exclusão [Lucas]
Testar edição e deleção de tarefas [Lucas]

**História #8: Como usuário, eu gostaria de adicionar notas.**

- Tarefas e responsáveis:
- Criar o design da tela de adição de notas [Leticia]
- Implementar o frontend de adição de notas [Layla]
- Criar tabela de notas de cada disciplina por usuário [Leticia]
- Implementar backend para adicionar e salvar notas [Lucca]
- Integrar frontend com API para adicionar notas [Lucas]
- Testar adição de notas [Layla]

História #9: Como usuário, eu gostaria de editar e deletar notas.

Tarefas e responsáveis:
Criar o design da tela de edição de notas [Lucas]
Implementar o frontend de edição de notas [Layla]
Implementar backend para edição e exclusão de notas [Leticia]
Implementar confirmação antes de deletar notas [Layla]
Implementar a lógica de atualizar as notas após edição ou exclusão [Lucca]
Testar edição e deleção de notas [Lucca]

**História #10: Como usuário, eu gostaria de acompanhar minhas notas graficamente**

Tarefas e responsáveis:
- Criar o design de exibição de notas na tela principal [Lucas]  
- Implementar o frontend de exibição de notas na tela principal [Layla]  
- Criar componente gráfico para exibir notas [Leticia]  
- Implementar lógica para calcular média e evolução de notas [Leticia]  
- Integrar gráfico com backend para exibir dados [Lucca]  
- Testar a exibição correta dos gráficos com base nas notas [Lucca]  

História #11: Como usuário, eu gostaria de visualizar as tarefas mais próximas do vencimento.

Tarefas e responsáveis:
Criar o design da tela de visualização das tarefas mais próximas do vencimento na tela principal [Leticia]
Implementar o frontend de visualização das tarefas mais próximas do vencimento na tela principal [Layla]
Criar opção de filtro de tarefas
Implementar backend para fornecer dados das datas [Lucca]
Testar a exibição correta das tarefas [Lucas]

História #12: Como usuário, eu gostaria de agrupar disciplinas por semestres.

Tarefas e responsáveis:
Implementar backend para fornecer disciplinas agrupadas por semestre [Lucca]
Atualizar o frontend para exibir disciplinas agrupadas [Leticia]
Testar a funcionalidade de agrupamento de disciplinas [Lucas]

História #13: Como usuário, eu gostaria de alterar meu e-mail e minha senha.

Tarefas e responsáveis:
Criar o design da tela de alteração de e-mail e senha [Leticia]
Implementar o frontend [Layla]
Implementar backend para atualizar e-mail e senha [Lucca]
Testar alteração de e-mail e senha [Lucas]


História #14: Como usuário, eu gostaria de configurar meu perfil.

Tarefas e responsáveis:
Criar o design da tela de configuração de perfil [Leticia]
Implementar o frontend [Layla]
Implementar backend para salvar configurações de perfil [Lucas]
Testar a atualização do perfil [Lucca]


História #15: Como usuário, eu gostaria de personalizar o design da minha conta.

Tarefas e responsáveis:
Criar o design da tela de personalização do perfil [Leticia]
Implementar o frontend [Layla]
Implementar backend para salvar configurações de design [Lucas] 
Integrar opções de personalização no frontend [Lucas]
Testar as alterações de design no perfil [Lucca]

História #16: Como usuário, eu gostaria de fazer simulações de notas.

Tarefas e responsáveis:
Criar o design da tela para simulação de notas [Leticia]
Implementar o frontend dessa simulação[Layla]
Implementar backend para cálculo de simulação de notas [Lucca]
Testar simulação de notas [Lucas]




História #17: Como usuário, eu gostaria de visualizar estatísticas detalhadas sobre meu desempenho acadêmico.

Tarefas e responsáveis:
Criar design da tela de estatísticas de desempenho [Leticia]
Implementar o frontend das estatísticas[Layla]
Implementar backend para cálculo e fornecimento de dados de desempenho [Lucas]
Testar visualização de desempenho acadêmico [Lucca]

História #18: Como usuário, eu gostaria de definir metas acadêmicas e acompanhar meu progresso.

Tarefas e responsáveis:
Criar design da tela de metas acadêmicas Lucas]
Implementar o frontend de metas [Layla]
Criar tabela de metas de cada disciplina e semestre por usuário [Leticia]
Implementar backend para salvar metas [Lucca]
Adicionar funcionalidade de atualizar e acompanhar o progresso das metas [Lucca]
Testar criação e acompanhamento de metas [Leticia]

