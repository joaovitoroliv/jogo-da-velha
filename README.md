Tutorial React Realizado no dia 10/01/2021 por João Vitor Oliveira Souza
https://pt-br.reactjs.org/tutorial/tutorial.html

Seções:

1) Configuração para o Tutorial
2) Visão Geral
3) Completando o jogo
4) Adicionando Time Travel (viagem no tempo)

------------------------------------------------------------------------------------------

O que está sendo construído? Um jogo-da-velha interativo com React
O que é preciso saber ? HTML e Javascript (funções, objetos, matrizes em menor escala e classes) e ES6 (arrow function, classes, let, e declarações const).

-----------------------------------------------------------------------------------------

1) Configuração para o Tutorial:

i) Certifique-se de ter uma versão recente do Node.js instalada.
https://nodejs.org/pt-br/

ii) Siga as instruções de instalação do create-react-app para criar um novo projeto:
https://pt-br.reactjs.org/docs/create-a-new-react-app.html#create-react-app

Create React App: Create React App é um ambiente confortável para aprender React, e é a melhor maneira de começar um single-page application em React.
Além de configurar seu ambiente de desenvolvimento para utilizar as funcionalidades mais recentes do JavaScript, ele fornece uma experiência de desenvolvimento agradável, e otimiza o seu app para produção. Será necessário ter Node >= 14.0.0 and npm >= 5.6 na sua máquina. Para criar um novo projeto, rode:

npx create-react-app my-app
cd my-app
npm start

Começar um projeto novo (Apagar tudo da pasta src/):

cd my-app
cd src
del * (Windows) ou rm -f * (Linux) 

Crie os arquivos index.css e index.js na pasta src/ e adicione o seguinte comando ao index.js:

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


------------------------------------------------------------------------------------

2) Visão geral: 

i) O que é React? O React é uma biblioteca JavaScript declarativa, eficiente e flexível para criar interfaces com o usuário. Ele permite compor UIs complexas a partir de pequenos e isolados códigos chamados “componentes”.

ii) ShoppingList: 

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Lista de compras para {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

Aqui, o ShoppingList é um componente React de classe ou component React do tipo classe. Um componente recebe parâmetros, chamados props (abreviação de propriedades), e retorna uma hierarquia de elementos para exibir através do método render.

O método render retorna uma descrição do que você deseja ver na tela. React recebe a descrição e exibe o resultado. Em particular, render retorna um elemento React, que é uma descrição simplificada do que renderizar. A maioria dos desenvolvedores do React usa uma sintaxe especial chamada “JSX”, que facilita a escrita desses elementos. A sintaxe <div /> é transformada em tempo de compilação para React.createElement ('div'). O exemplo acima é equivalente a:

return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... filhos de h1 ... */),
  React.createElement('ul', /* ... filhos de ul ... */)
);

iii) JSX: O JSX vem com todo o poder do JavaScript. Você pode colocar quaisquer expressões JavaScript dentro de chaves no JSX. Cada elemento React é um objeto JavaScript que você pode armazenar em uma variável ou passar em seu código.

O componente ShoppingList acima apenas renderiza componentes internos do DOM como <div /> e <li />. Mas você também pode compor e renderizar componentes React personalizados. Por exemplo, agora podemos nos referir a toda a lista de compras escrevendo <ShoppingList />. Cada componente React é encapsulado e pode operar de forma independente; Isso permite que você construa interfaces complexas a partir de componentes simples.

iv) Inspecionando o Código Inicial

Este Código Inicial é a base do que estamos construindo. Fornecemos o estilo CSS para que você só precise se concentrar no aprendizado do React e na programação do jogo da velha. 

Ao inspecionar o código index.js, você notará que temos três componentes React:

Quadrado(Square)
Tabuleiro(Board)
Jogo(Game)

O componente Square renderiza um único <button> e o Board renderiza 9 squares. O componente Game renderiza um Board com valores que modificaremos mais tarde. Atualmente não há componentes interativos.

v) Passando dados através de props:

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

Parabéns! Você acabou de passar um “prop” de um componente pai Board para um componente filho Square. Passar props é a forma como os dados fluem em aplicações React, de pais para filhos.

vi) Fazendo um componente interativo:

Vamos preencher o componente Square com um “X” quando clicamos nele. Primeiro, altere a tag button que é retornada na função render() do componente Square para isto:

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { console.log('click'); }}>
        {this.props.value}
      </button>
    );
  }
}

Se você clicar em um quadrado agora, deverá ver ‘clique’ no console do devtools do seu navegador

OBS:  Para salvar a digitação e evitar o comportamento confuso de this,vamos usar a sintaxe arrow function para manipuladores de eventos:

class Square extends React.Component {
 render() {
   return (
     <button className="square" onClick={() => console.log('click')}>
       {this.props.value}
     </button>
   );
 }
}

Como próximo passo, queremos que o componente Square “lembre” que foi clicado e preencha com um “X”. Para “lembrar” as coisas, os componentes usam o estado (state).

Os componentes React podem ter estado (state) configurando this.state em seus construtores. this.state deve ser considerado como privado para o componente React que o definiu. Vamos armazenar o valor atual do Square em this.state e alterá-lo quando o Square for clicado.

Primeiro, adicionaremos um construtor à classe para inicializar o estado:

constructor(props){
        super(props);
        this.state = {
            value: null,
        };
    }

Em classes JavaScript, você sempre precisa chamar super ao definir o construtor de uma subclasse. Todas os componentes de classe React que possuem um método constructor devem iniciá-lo com uma chamada super (props).

Agora vamos mudar o método render do componente Square para exibir o valor do estado (state) atual quando clicado:

- Substitua this.props.value por this.state.value dentro da tag <button>.
- Substitua o onClick={...} event handler por onClick={() => this.setState({value: 'X'})}.
- Coloque className e onClick props em linhas separadas para melhor legibilidade.

 render() {
      return ( // Renderiza um botão
        <button 
        className="square" 
        onClick={() => this.setState({value: 'X'})}
        >
          {this.state.value}
        </button>
      );
    }

Ao chamar this.setState a partir de um manipulador onClick no método render do componente Square, nós dizemos ao React para renderizar novamente aquele Square sempre que seu<button> for clicado. Após a atualização, o this.state.value do Square será 'X', então vamos ver o X no tabuleiro do jogo. Se você clicar em qualquer quadrado, um X deve aparecer.

Quando você chama setState em um componente, o React atualiza automaticamente os componentes filhos dentro dele também.

vi) Developer Tools:

A extensão React Devtools para Chrome e Firefox permite inspecionar uma árvore de componentes React com as ferramentas de desenvolvedor do seu navegador.

O React DevTools permite que você verifique as props e o estado (state) de seus componentes React.

Depois de instalar o React DevTools, você pode clicar com o botão direito do mouse em qualquer elemento da página, clicar em “Inspecionar” para abrir as ferramentas de desenvolvedor, e as guias React (“⚛️ Components” e “⚛️ Profiler”) aparecerá como a última guia à direita. Use “⚛️ Components” para inspecionar a árvore de componentes.

No entanto, observe que há algumas etapas extras para a extensão funcionar com o CodePen:

Faça o login ou registre-se e confirme seu e-mail (necessário para evitar spam).
Clique no botão “Fork”.
Clique em “Change View” e escolha “Debug mode”.
Na nova aba que se abre, o devtools deve agora ter uma aba React.

3) Completando o jogo:

i) Movendo o state para cima: 
Atualmente, cada componente Quadrado (Square) mantém o estado do jogo. Para verificar o vencedor, nós vamos manter o valor de cada um dos 9 quadrados em uma posição.

Podemos pensar que o Tabuleiro (Board) poderia apenas perguntar para cada Quadrado pelo seu estado. Apesar desse modelo ser possível no React, nós o desencorajamos, pois, o código se torna difícil de ser compreendido, suscetível à erros e difícil de refatorar. Ao invés disso, a melhor opção é guardar o estado do jogo no componente pai (Tabuleiro) ao invés de cada Quadrado. O componente do tabuleiro pode dizer para cada Quadrado o que pode ser exibido via prop, assim como fizemos quando passamos o número de cada Quadrado.

Para coletar dados de múltiplos filhos (children), ou para fazer dois filhos se comunicarem entre si, você precisa declarar um estado compartilhado em seu componente pai. O componente pai pode passar o estado de volta para os filhos através do uso de propriedades (props); isso mantém os componentes filhos em sincronia com os seus irmãos e também com o pai.

Criar estado em um componente Pai é bem comum quando componentes React são refatorados — Vamos aproveitar essa oportunidade para tentar o conceito, na prática.

Vamos adicionar um construtor no Tabuleiro e definir que seu estado inicial irá ter um array com 9 posições preenchidas por nulo (null). Esses 9 nulls corresponderão aos 9 quadrados:

constructor(props){
      super(props);
      this.state = { //estado inicial com array com 9 posicoes preenchidos por null (9 quadrados)
        squares: Array(9).fill(null),
      }
    }

Quando preenchermos o tabuleiro mais tarde, ele ficará parecido com isto:

[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]

O método renderSquare do Tabuleiro atualmente está definido como:

  renderSquare(i) {
    return <Square value={i} />;
  }

No começo, nós passamos o seu valor (value) como prop para o Tabuleiro mostrar números de 0 a 8 em cada Quadrado. Em outro passo anterior, nós trocamos os números pela letra “X” determinado no próprio estado do Quadrado. Isso porque atualmente o Quadrado ignora o valor (value) recebido do Tabuleiro.

Iremos agora utilizar novamente o mesmo mecanismo de propriedades. Vamos modificar o Tabuleiro para instruir cada Quadrado individualmente qual é o valor correto ('X', 'O' ou null). Nós já temos definidos o array de quadrados no construtor do Tabuleiro e iremos modificar o método renderSquare para definir o valor a partir do estado:

Preencher com os estados

  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }

  Cade square vai receber a propriedade value que vai ser 'X', 'O' ou null para quadrados vazios.

Agora, precisamos mudar o que acontece quando um Quadrado é clicado. O componente Tabuleiro agora mantém quais quadrados são preenchidos. Precisamos criar uma maneira para cada Quadrado atualizar o state do Tabuleiro. O state é considerado privado ao componente em que é definido, ou seja, nós não podemos atualizar o state do Tabuleiro diretamente do Quadrado.

Para manter a privacidade do state do Tabuleiro, nós vamos passar a função responsável do Tabuleiro para o Quadrado. Essa função irá ser chamada assim que o Quadrado for clicado. Nós então mudaremos o método renderSquare no Tabuleiro para:

  renderSquare(i) {
    return ( 
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

Agora nós iremos passar duas props do Tabuleiro para o Quadrado: value e onClick. A propriedade onClick é uma função que será chamada quando o Quadrado for clicado. Nós manteremos as seguintes mudanças no componente Quadrado:

- Substituir this.state.value por this.props.value no método render;
- Substituir this.setState() por this.props.onClick() no método render;
- Deletar o constructor do Quadrado, já que não manteremos mais o state do jogo nele;
Após essas mudanças, o componente Quadrado se parecerá com isto:

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

Quando um Quadrado for clicado, a função onClick provida pelo Tabuleiro será chamada. Aqui está uma revisão de como isso acontece:

- A propriedade onClick do DOM embutida no componente <button> diz ao React para criar um evento de escuta (event listener).
- Quando o botão é clicado, o React irá chamar a função o manipulador de eventos onClick definido no método render() do Quadrado.
- Esse manipulador de eventos chamará a função recebida através da propriedade onClick que foi criada no Tabuleiro (this.props.onClick()).
- Como o Tabuleiro passou onClick={() => this.handleClick(i)} para o Quadrado, a função handleClick(i) será chamada quando o Quadrado for clicado.
- Como nós não definimos a função handleClick() ainda, nosso código quebrará.

OBS: 
O atributo onClick dos elementos <button> no DOM possuem um significado especial para o React, pois ele é um componente nativo. Para componentes customizados como o Square, o nome é por sua conta. Nós poderíamos renomear a propriedade onClick do componente Square para handleClick. Em React, no entanto, a convenção é usar nomes on[Event] para propriedades que representam eventos e handle[Event] para metodos que manipulam os eventos.

Quando tentamos clicar em um Square, um erro ocorrerá, pois, não definimos a função handleClick ainda. O adicionaremos agora na classe Board:

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

Após essas mudanças, seremos capazes novamente de clicar nos Squares para preenche-los. Entretanto, agora o state é guardado no componente Board ao invés de em cada Square. Quando o state do Board for alterado, os componentes Square serão re-renderizados automaticamente. Manter o state de todos os quadrados no componente Board nos permitirá determinar o vencedor no futuro.

Como o componente Square não mantém mais state, os componentes Square receberão os valores do Board e o informarão quando forem clicados. Em “termos React”, os Squares são agora componentes controlados (controlled components). O Board terá controle total sobre eles.

Note como na função handleClick, nós chamamos .slice() para criar uma cópia do array de quadrados para o modificar ao invés de faze-lo no array existente. Explicaremos o motivo quando criarmos uma copia do array de quadrados na próxima sessão.

ii) Por que imutabilidade é importante

No exemplo de código anterior, sugerimos que você crie uma cópia do array squares usando o método slice () em vez de modificar o array existente. Agora discutiremos a imutabilidade e por que a imutabilidade é importante aprender.

Geralmente existem duas maneiras de se alterar dados. A primeira é mutar o dado alterando diretamente seu valor. A segunda maneira é substituir o dado antigo por uma nova cópia com as alterações desejadas.

Mudando dados com mutação:

var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Agora o player é {score: 2, name: 'Jeff'}

Mudando dados sem mutação:
var player = {score: 1, name: 'Jeff'};
var newPlayer = Object.assign({}, player, {score: 2});
// Agora o player não sofreu alteração, mas o newPlayer é {score: 2, name: 'Jeff'}
// Ou então se você estiver usando a sintaxe "object spread", você pode escrever:
// var newPlayer = {...player, score: 2};

O resultado final será o mesmo, mas por não mutar (ou alterar os dados subjacentes) diretamente, nós ganhamos vários benefícios descritos abaixo

Complexidade das features se tornam mais simples
Imutabilidades faz a complexidade das features se tornarem bem mais simples de serem implementadas. Mais tarde neste tutorial, implementaremos uma feature de “máquina do tempo” que nos permitirá revisar o histórico do jogo da velha e “voltar” as jogadas anteriores. Essa funcionalidade não está ligada somente ao jogo — uma habilidade de desfazer e refazer certas ações é um requisito comum em aplicações. Evitar mutação nos permite manter o histórico das versões anteriores do jogo intacta e reutiliza-las mais tarde.

Detectar Mudanças
Detectar mudanças e objetos mutados é difícil, pois, eles são modificados diretamente. Essa detecção requer um objeto mutado para ser comparado com as cópias das suas próprias versões anteriores e a árvore inteira do object para ser cruzada.

Detectar mudanças em objetos imutáveis é consideravelmente fácil. Se ele for imutável que está sendo referenciado for diferente do anterior, concluímos que o objeto foi alterado.

Determinar Quando Re-renderizar no React
O principal benefício da imutabilidade é que ela ajuda a construir componentes puros em React. Dados imutáveis podem facilmente determinar se foram feitas mudanças, que ajudarão a decidir quando um componente precisa ser re-renderizado.

Você pode aprender mais sobre shouldComponentUpdate e como construir componentes puros lendo o artigo Otimizando Performance.

iii) Componentes de Função:

Nós vamos agora mudar o Square para ser um componente de função.

Em React, componentes de função são os mais simples de serem escritos, contém apenas um método render e não possuem seu próprio state. Ao invés de definir uma classe que extende de React.Component, nós podemos escrever uma função que recebe props como entrada e retorna o que deverá ser renderizado. Esse tipo de componente é menos tedioso de escrever do que classes e muitos componentes podem ser expressados desta maneira.

Troque a classe Square por esta função:

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

Nos modificamos this.props para props nas duas vezes que ela aparece.

OBS: 
Quando modificamos Square para ser um componente funcional, também modificamos onClick={() => this.props.onClick()} para uma versão mais curta: onClick={props.onClick} (note a ausência dos parentêses em ambos os lados).

iv) Trocando Turnos:

Agora precisamos consertar um defeito óbvio em nosso Jogo da Velha: os “O”s não podem ser marcados no tabuleiro.

Vamos definir a primeira jogadas para ser “X” por padrão. Podemos definir esse padrão modificando o state inicial no construtor do nosso tabuleiro (Board)

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
}

Sempre que um jogador fizer uma jogada, xIsNext (um boolean) será trocado para determinar qual jogador será o próximo e o state do jogo será salvo. Nós atualizaremos a função handleClick do Board para trocar o valor de xIsNext:

handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

Com esse mudança,“X”s e “O”s podem trocar os turnos. Tente!

Também vamos modificar o texto de “status” na função render do Board para que ela passe a exibir quem jogará o próximo turno.

render() {
const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
}
Depois de fazer essas mudanças, você deverá ter esse componente do Board:

v) Declarando um Vencedor:

Agora que mostramos quem jogará o próximo turno, também deveríamos mostrar quando o jogo foi vencido e que não há mais turnos a serem jogados. Copie essa função auxiliar e cole-a no final do arquivo:

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

Dado um array de 9 quadrados, esta função irá verificar se há um vencedor e retornará 'X', 'O' ou null conforme apropriado

Chamaremos calculateWinner(squares) na função render do Board para checar se um jogador venceu. Caso tenha vencido, podemos mostrar um texto como “Winner: X” ou “Winner: O”. Vamos substituir a declaração de status na função render com esse código:

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

Agora podemos modificar a função handleClick do Board para retornar antes, ignorando o click, caso alguém tenha vencido o jogo ou se o quadrado (square) já esteja ocupado:

 handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

# 4) Adicionando a Viagem no Tempo (Time Travel): PROXIMO COMMIT

Como um último exercício, vamos tornar possível fazer uma “volta no tempo” até as jogadas anteriores que aconteceram no jogo.

## i) Armazenando um Histórico de Jogadas
Se nós tivéssemos modificado o array ``squares``, a implementação da volta no tempo seria muito difícil.

No entanto, nós utilizamos ``slice()`` para criar uma nova cópia do array ``squares`` após cada jogada e tratamos ele como imutável. Isso nos permitirá o armazenamento de cada versão anterior do array ``squares`` e que possamos navegar entre os turnos que já tenham acontecido.

Vamos armazenar os arrays ``squares`` anteriores em um outro array chamado ``history``. O array ``history`` representa todos os estados do tabuleiro, da primeira à última jogada, e tem uma forma parecida com essa:

````
history = [
  // Antes da primeira jogada
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // Depois da primeira jogada
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // Depois da segunda jogada
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
````

Agora precisamos decidir a qual componente pertencerá o state do ``history``.

## ii) Trazendo o State pra Cima, Novamente

Queremos que o componente Game, o de mais alto nível, mostre uma lista com as jogadas anteriores. Para poder fazer isso, ele precisará acessar o ``history``, então, temos que trazer o state ``history`` para cima, colocando-o no componente de mais alto nível, o componente ``Game``.

Colocar o state ``history`` no componente Game, nos permite remover o state ``squares`` de seu componente filho, Board. Assim como “trouxemos para cima” o state do componente Square para o componente Board, agora estamos trazendo o state do componente Board para o componente de mais alto nível, Game. Isso dá ao componente Game total controle sobre os dados do Board e permite que instrua o Board a renderizar turnos anteriores a partir do ``history``.

Primeiro, iremos configurar o state inicial para o componente Game em seu construtor:
````
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }
````
Em seguida, faremos com que o componente Board receba as props ``squares`` e ``onClick`` do componente Game. Agora, uma vez que temos apenas um manipulador de clique no Board para vários Squares, vamos precisar passar a localização de cada Square para o manipulador ``onClick`` para indicar qual Square foi clicado. Aqui estão os passos necessários para transformar o componente Board:

- Deletar o contructor do Board.
- Substituir ``this.state.squares[i]`` por ``this.props.squares[i]`` na função ``renderSquare`` do Board.
- Substituir ``this.handleClick(i)`` por ``this.props.onClick(i)`` na função ``renderSquare`` do Board.

O componente Board agora ficou assim:
````
 renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
````
Vamos atualizar a função render do componente Game para utilizar a entrada mais recente do histórico (history) para determinar e exibir o status do jogo.
````
 render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
  ````
  Uma vez que o componente Game agora está renderizando o status do jogo, nós podemos remover o código correspondente do método ``render`` do componente Board. Depois de refatorar, a função ``render`` do Board fica assim:
````
 render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
  ````
  Finalmente, precisamos mover o método ``handleClick`` do componente Board para o componente Game. Nós também precisamos modificar ``handleClick`` pois o state do componente Game está estruturado de maneira diferente. No componente Game, dentro do método ``handleClick``, nós concatenamos novas entradas do histórico de jogadas em ``history``.

  ````
    handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  ````
OBS: Ao contrário do método de arrays ``push()``, que você talvez possa estar mais familiarizado, o método ``concat()`` não modifica o array original, por isso preferimos utilizá-lo.

Nesse ponto, o componente Board necessita apenas dos métodos ``renderSquare`` e ``render``. O state do jogo e o método ``handleClick`` devem estar no componente Game.

## iii) Mostrando as Jogadas Anteriores

Uma vez que estamos gravando o histórico do Jogo da Velha, agora podemos mostrá-lo para o jogador como uma lista de jogadas anteriores.

Aprendemos anterioremente que os elementos React são objetos JavaScript de primeira classe; podemos passá-los livremente por nossas aplicações. Para renderizar múltiplos itens em React, podemos utilizar um array de elementos React.

Em JavaScript, arrays possuem um método ``map()`` que é normalmente utilizado para mapear uma fonte de dados para outra fonte de dados, por exemplo:

````
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
````

Utilizando o método ``map``, nós podemos mapear nosso histórico de jogadas para elementos React, representando botões na tela, e mostrar uma lista de botões que “pulam” para os jogadas anteriores.

Vamos fazer um ``map`` sobre o ``history`` no método ``render`` do componente Game:

````
 render() {
    ...
    const moves = history.map((step, move) => { //New
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      ...
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  ````
<<<<<<< HEAD À medida que iteramos através do array ``history``, a variável ``step`` se refere ao valor do elemento ``history`` atual, e ``move`` se refere ao índice do elemento ``history`` atual. Estamos interessados em ``move`` aqui, portanto ``step`` não está sendo atribuído a nada. 

Para cada jogada no histórico do Jogo da Velha, nós criamos um item de lista ``<li>`` que contém um botão ``<button>``. O botão tem um manipulador ``onClick`` que chama um método chamado ``this.jumpTo()``. Nós ainda não implementamos o método ``jumpTo()``. Por agora, nós devemos ver uma lista das jogadas que já ocorreram no jogo e um aviso no console do developer tools que diz:

Warning: Each child in an array or iterator should have a unique “key” prop. Check the render method of “Game”.

em português:

Aviso: Cada filho de um array ou iterator deve ter uma prop “key” única. Confira o método render de “Game”

Vamos discutir sobre o que o aviso acima significa:

## iv) Definindo uma Key (Chave):

Quando renderizamos uma lista, o React armazena algumas informações sobre cada item da lista renderizada. Quando atualizamos uma lista, o React precisa determinar o que mudou. Nós poderiamos ter adicionado, removido, rearranjado ou atualizado os itens da lista.

Imagine uma transição de:

````
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
````

para:
````
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
````

Além das contagens atualizadas, um humano lendo isso provavelmente iria dizer que nós trocamos a ordem de Alexa e Ben e inserimos Claudia entre eles. No entanto, React é um programa de computador e não sabe qual foi nossa intenção. Pelo fato do React não ter como saber nossas intenções, precisamos especificar uma propriedade key (chave) para cada item da lista para diferenciá-los entre si. Uma opção poderia ser a utilização das strings ``alexa``, ``ben``, ``claudia``. Se tivéssemos mostrando dados a partir de um banco de dados, os ids de Alexa, Ben e Claudia no banco poderiam ser utilizados como as chaves.

````
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
````

Quando uma lista é re-renderizada, o React pega cada chave e busca nos itens da lista anterior por uma chave correspondente. Se a lista atual tiver uma chave que ainda não existia, React cria um componente. Se na lista atual tiver faltando uma chave que já existia na lista anterior, React destrói o componente anterior. Se as duas chaves combinarem, o componente correspondente é movido. As chaves informam ao React sobre a identidade de cada componente, o que permite que ele mantenha o estado entre re-renderizações. Se a chave de um componente mudar, o componente será destruído e recriado com um novo estado (state).

``key`` é uma propriedade especial e reservada do React (juntamente com ``ref``, uma funcionalidade mais avançada). Quando um elemento é criado, React extrai a propriedade ``key`` e armazena como uma chave diretamente no elemento retornado. Ainda que pareça que ``key`` pertença a ``props``, ``key`` não pode ser referenciado utilizando ``this.props.keys``. React automaticamente utiliza ``key`` para decidir quais componentes atualizar. Um componente não pode acessar sua ``key``.

É fortemente recomendado que você defina adequadamente suas chaves sempre que construir listas dinâmicas. Se não tiver uma chave apropriada, você talvez deva considerar restruturar seus dados para tê-la.

Se nenhuma chave for especificada, React vai mostrar um aviso e utilizar, por padrão, o índice do array como chave. Utilizar o índice do array como a chave é problemático quando se tenta reordenar os itens de uma lista ou inserir/remover itens. Passar ``key={i}`` explicitamente silencia o aviso, mas continua com os mesmos problemas dos índices do array e por isso não é recomendado na maioria dos casos.

Chaves não precisam ser globalmente únicas; elas precisam ser únicas apenas entre os componentes e seus irmãos (siblings).

## v) Implementando a Viagem no Tempo (Time Travel):

No histórico do Jogo da Velha, cada jogada anterior tem um único ID associado a ela: é o número sequencial da jogada. As jogadas nunca são reordenadas, apagadas, ou inseridas no meio, então é seguro utilizar o index da jogada como a chave.

No método ``render`` do componente Game, nós podemos adicionar a chave como ``<li key={move}>`` e o aviso do React sobre as chaves deve desaparecer.

````
const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
  ````
Clicar em quaisquer dos botões da lista vai causar um erro pois o método ``jumpTo`` não está definido. Antes de implementá-lo, vamos adicionar ``stepNumber`` ao state do componente Game para indicar qual passo estamos visualizando no momento.

Primeiro, adicione ``stepNumber: 0`` ao state inicial no contructor do componente Game.
````
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      // New
      stepNumber: 0,
````
Em seguida, definiremos o método ``jumpTo`` no componente Game para atualizar aquele ``stepNumber``. Também definimos ``xIsNext`` para ``true`` caso o número que estejamos atribuindo a ``stepNumber`` seja par:

````
jumpTo(step){
      this.stateState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
````

<<<<<<< HEAD Observe no método ``jumpTo``, não atualizamos a propriedade de histórico do estado. Isso ocorre porque as atualizações de estado são mescladas ou, em palavras mais simples, o react atualizará apenas as propriedades mencionadas no método ``setState``, deixando o estado restante como está. Para mais informações veja a documentação.

https://pt-br.reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged

Agora faremos algumas modificações no método ``handleClick`` do componente Game, que é disparado quando você clica em um quadradado do tabuleiro (square).

O state ``stepNumber`` que adicionamos reflete a jogada mostrada ao usuário nesse momento. Após fazermos uma nova jogada, precisamos atualizar ``stepNumber`` adicionando ``stepNumber: history.length`` como parte do argumento de ``this.setState``. Isso certifica que não ficaremos presos mostrando a mesma jogada após uma novo ter sido feita.

Também iremos substituir a leitura de ``this.state.history`` por ``this.state.history.slice(0, this.state.stepNumber + 1)``. Isso certifica que se nós “voltarmos no tempo”, e então fizermos uma nova jogada a partir daquele ponto, descartamos todo o histórico do “futuro” que agora se tornaria incorreto.

````
 handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    ...
    stepNumber: history.length,
````

Por fim, modificaremos o método ``render`` do componente Game para deixar de renderizar sempre a última jogada e passar a renderizar apenas a jogada selecionada atualmente, de acordo com ``stepNumber``:

````
render(){
  ...
  const current = history[this.state.stepNumber];
}
````

Se clicarmos em qualquer passo no histórico do jogo, o tabuleiro do Jogo da Velha deve atualizar imediatamente para mostrar como ficou depois que aquele passo ocorreu.

## vi) Recapitulando:

Parabéns! Você criou um jogo que:

- Te permite jogar o Jogo da Velha,
- Indica quando um dos jogadores ganhou o jogo,
- Armazena um histórico do jogo à medida que ele avança,
- Permite aos jogadores revisarem o histórico do jogo e verem versões anteriores do tabuleiro.

Belo trabalho! Esperamos que agora você esteja sentindo como se tivesse uma boa noção de como React funciona.

Dê uma olhada on resultado final aqui: Resultado Final. (https://codepen.io/gaearon/pen/gWWZgR?editors=0010)

Se você tiver algum tempo extra e quiser praticar suas habilidades no React, aqui estão algumas ideias de melhorias que você poderia adicionar a seu Jogo da Velha, listadas em ordem crescente de dificuldade.

- Mostrar a localização de cada jogada no formato (col,row), para cada jogada no histórico.
- Estilizar com negrito o item da lista de jogadas que está selecionado no momento.
- Reescrever o componente Board para utilizar 2 loops para fazer os quadrados, em vez de deixá-los hardcoded.
- Adicionar um botão de toggle que lhe permita ordenar os jogadas em ordem ascendente ou descendente.
- Quando alguém ganhar, destaque os 3 quadrados que causaram a vitória.
- Quando ninguém ganhar, exiba uma mensagem informando que o resultado foi um empate.

Ao longo dessa tutorial, abordamos conceitos de React incluindo elementos, componentes, props e state. Para uma explicação mais detalhada de cada um desses tópicos, confira o restante da documentação. Para aprender mais sobre definição de componentes, confira a API de Referência do React.Component.