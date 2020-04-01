
import React, { Component } from "react";
import "./App.css";
import logo from "./ufms.png"
import BinarySearchTree from "./classes/BinarySearchTree.js";
import BinarySearchTreeNode from "./components/BinarySearchTreeNode.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insertValue: "",
      deleteValue: "",
      searchValue: "",
      previewContent: "",
      tree: new BinarySearchTree()
    };
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
    this.resetActiveStatusOfNodes = this.resetActiveStatusOfNodes.bind(this);
    this.resetPreviewContent = this.resetPreviewContent.bind(this);


    this.search = this.search.bind(this);
    this.pause = this.pause.bind(this);

    this.onChangeInsertValue = this.onChangeInsertValue.bind(this);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.onChangeDeleteValue = this.onChangeDeleteValue.bind(this);
  }

  pause(milliseconds) {
    var date = new Date();
    while (new Date() - date <= milliseconds) {
      /* Do nothing */
    }
  }

  resetPreviewContent() {
    this.setState({
      previewContent: ""
    })
  }

  resetActiveStatusOfNodes() {
    this.state.tree.traverseInOrder(this.state.tree.root, function (node) {
      node.active = false;
    });
  }

  onChangeInsertValue(event) {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.setState({
      insertValue: parseInt(event.target.value)
    });
  }

  onChangeDeleteValue(event) {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.setState({
      deleteValue: parseInt(event.target.value)
    });
  }

  onChangeSearchValue(event) {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.setState({
      searchValue: parseInt(event.target.value)
    });
  }

  insert() {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.state.tree.insert(this.state.insertValue);
    this.setState({
      insertValue: ""
    });
  }

  delete() {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.state.tree.delete(this.state.deleteValue);
    this.setState({
      deleteValue: ""
    });
  }

  search() {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    let searchResult = this.state.tree.find(
      this.state.tree.root,
      this.state.searchValue
    );

    if (searchResult) {
      searchResult.active = true;
    } else {
      this.setState({
        previewContent: "Not Found!"
      });
    }

    this.setState({
      searchValue: ""
    });
  }

  render() {
    const hasRootNode = this.state.tree.root;
    return (
      <React.Fragment>
        <h4>Este aplicativo é uma implementação de Arvore Binária de Busca, com balanceamento AVL, remoção e busca</h4>
        <h4>Para começar a usar, basta adicionar o número desejado.</h4>
        <div id="app">
          <div id="tree" className="tree">
            {hasRootNode ? (
              <ul>
                <BinarySearchTreeNode
                  node={this.state.tree.root}
                  nodeType="root"
                />
              </ul>
            ) : (
                <h2> A árvore está vazia! Adicione números para preencher a árvore :D </h2>
              )}
          </div>

          <div id="basic-actions">
            <div className="action">
              <input
                value={this.state.insertValue}
                onChange={this.onChangeInsertValue}
                type="text"
              />
              <button
                onClick={this.insert}
                className="button"
              >
                Adicionar
              </button>
            </div>

            <div className="action">
              <input
                value={this.state.deleteValue}
                onChange={this.onChangeDeleteValue}
                type="text"
              />
              <button
                onClick={this.delete}
                className="button"
              >
                Remover
              </button>
              </div>
              <div className="action">
                <input
                  value={this.state.searchValue}
                  onChange={this.onChangeSearchValue}
                  type="text"
                />
                <button
                  onClick={this.search}
                  className="button"
                >
                  Procurar
                </button>
              </div>                    
          </div>
          <div><img src={logo} />
          <h3> Victor Augusto Fonseca Pinto</h3>
          <h5> Sistemas de Informação - UFMS CPan </h5>
          <h5> Professor Artur Oliveira Gomes </h5>
          
          </div>
          
        </div>
          


      </React.Fragment>
      
    );
  }
}

export default App;
